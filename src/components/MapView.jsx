import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import RestrictedForestLayer from "./RestrictedForestLayer";
import { initLeafletDraw } from "./LeafletDrawFallback";

// Fix Leaflet default marker in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const API_BASE = "http://localhost:5000/api";

// HeatmapLayer component - Modified to show high-risk areas
function HeatmapLayer({ data }) {
  const map = useMap();
  const heatmapLayerRef = useRef(null);
  
  useEffect(() => {
    // Define high-risk areas in Tamil Nadu and other regions
    const highRiskAreas = [
      // Very High Risk Areas (Red) - Value 90-100
      { lat: 13.0827, lng: 80.2707, value: 95, emergency: "High Risk Area", note: "Chennai - Crowded areas, pickpocketing risk" },
      { lat: 9.9252, lng: 78.1198, value: 92, emergency: "High Risk Area", note: "Madurai Temple - Extremely crowded, stampede risk" },
      { lat: 11.1085, lng: 78.6569, value: 94, emergency: "High Risk Area", note: "Erode - Flash flood prone area" },
      { lat: 9.2647, lng: 79.3035, value: 96, emergency: "High Risk Area", note: "Rameswaram - Strong currents, drowning incidents" },
      { lat: 8.7642, lng: 77.6941, value: 93, emergency: "High Risk Area", note: "Kanyakumari - Rough seas, high waves" },
      { lat: 13.0499, lng: 80.2824, value: 98, emergency: "High Risk Area", note: "North Chennai - Crime hotspot" },
      { lat: 10.0783, lng: 77.0685, value: 97, emergency: "High Risk Area", note: "Munnar hillsides - Landslide prone" },
      { lat: 10.3148, lng: 77.9714, value: 98, emergency: "High Risk Area", note: "Kodaikanal cliff areas - Fall hazard" },
      
      // Medium Risk Areas (Orange) - Value 70-89
      { lat: 11.4882, lng: 79.7133, value: 85, emergency: "Medium Risk Area", note: "Pondicherry beaches - Rip currents" },
      { lat: 10.7905, lng: 79.1378, value: 82, emergency: "Medium Risk Area", note: "Thanjavur - Moderate crime rate" },
      { lat: 12.6195, lng: 79.4192, value: 78, emergency: "Medium Risk Area", note: "Kanchipuram - Crowded during festivals" },
      { lat: 11.2342, lng: 78.1694, value: 75, emergency: "Medium Risk Area", note: "Namakkal - Road accident prone" },
      { lat: 11.9316, lng: 79.8352, value: 80, emergency: "Medium Risk Area", note: "Auroville - Isolated areas, theft risk" },
      { lat: 12.9249, lng: 80.1000, value: 76, emergency: "Medium Risk Area", note: "Mahabalipuram - Strong sea currents" },
      { lat: 10.9559, lng: 78.0766, value: 72, emergency: "Medium Risk Area", note: "Karur - Industrial hazards" },
      
      // Lower Risk Areas (Yellow) - Value 50-69
      { lat: 11.6643, lng: 78.1460, value: 65, emergency: "Low Risk Area", note: "Salem - Moderate risk" },
      { lat: 8.0883, lng: 77.5385, value: 60, emergency: "Low Risk Area", note: "Tirunelveli - Some incidents reported" },
      { lat: 10.7672, lng: 78.7139, value: 55, emergency: "Low Risk Area", note: "Trichy - Low-moderate risk" },
      { lat: 12.2253, lng: 79.0747, value: 58, emergency: "Low Risk Area", note: "Tiruvannamalai - Crowd management issues during festivals" },
      { lat: 12.9165, lng: 79.1325, value: 62, emergency: "Low Risk Area", note: "Vellore - Minor incidents" },
      
      // Other high-risk locations in India (for context)
      { lat: 28.6139, lng: 77.2090, value: 90, emergency: "High Risk Area", note: "Delhi - Crowded tourist areas" },
      { lat: 19.0760, lng: 72.8777, value: 88, emergency: "High Risk Area", note: "Mumbai - Crime hotspots" },
      { lat: 26.9124, lng: 75.7873, value: 85, emergency: "Medium Risk Area", note: "Jaipur - Tourist scams" }
    ];

    // Load required scripts
    const loadScript = (url, callback) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        if (callback) callback();
        return;
      }
      
      console.log(`Attempting to load script: ${url}`);
      const script = document.createElement("script");
      script.src = url;
      
      // Set up proper error handling
      script.onload = () => {
        console.log(`Successfully loaded: ${url}`);
        callback && callback();
      };
      script.onerror = (error) => {
        console.error(`Failed to load script: ${url}`, error);
        // Continue even if script fails to load
        callback && callback();
      };
      
      // Add timeout to prevent hanging if a script never loads
      const timeout = setTimeout(() => {
        console.warn(`Script loading timed out: ${url}`);
        callback && callback();
      }, 5000); // 5 second timeout
      
      script.onload = script.onerror = () => {
        clearTimeout(timeout);
        callback && callback();
      };
      
      document.head.appendChild(script);
    };

    const setupHeatmap = () => {
      try {
        // Fallback to simpler implementation if HeatmapOverlay not available
        if (!window.HeatmapOverlay) {
          console.log("Using L.heatLayer fallback implementation");
          
          // Remove existing heatmap if it exists
          if (heatmapLayerRef.current) {
            map.removeLayer(heatmapLayerRef.current);
          }
          
          // Check if L.heatLayer exists (Leaflet.heat)
          if (typeof L.heatLayer === 'undefined') {
            console.warn("L.heatLayer not available - skipping heatmap");
            return;
          }
          
          // Use high-risk areas for the heatmap
          const heatPoints = [];
          
          if (highRiskAreas && highRiskAreas.length > 0) {
            highRiskAreas.forEach(point => {
              // Higher weight for higher risk areas
              const weight = (point.value / 14) + 1; // Scale from 1-8
              heatPoints.push([point.lat, point.lng, weight]);
            });
          }
          
          // Create the heatmap layer with risk-focused color gradient
          const heatmap = L.heatLayer(heatPoints, {
            radius: 35,
            blur: 25,
            maxZoom: 15,
            max: 8,
            gradient: {
              0.4: 'yellow',   // Low risk
              0.6: 'orange',   // Medium risk
              0.8: 'red',      // High risk
              1.0: 'darkred'   // Extreme risk
            }
          });
          
          heatmapLayerRef.current = heatmap;
          map.addLayer(heatmap);
          return;
        }
        
        // Continue with preferred implementation if available
        // Remove existing heatmap if it exists
        if (heatmapLayerRef.current) {
          map.removeLayer(heatmapLayerRef.current);
        }
        
        // Configure heatmap with risk-focused colors
        const gradient = {
          0.1: 'rgba(255, 255, 0, 0.5)',     // Yellow for low risk
          0.3: 'rgba(255, 200, 0, 0.6)',     // Yellow-Orange
          0.5: 'rgba(255, 150, 0, 0.7)',     // Orange for medium risk
          0.7: 'rgba(255, 100, 0, 0.8)',     // Dark Orange 
          0.9: 'rgba(255, 0, 0, 0.85)',      // Red for high risk
          1.0: 'rgba(180, 0, 0, 0.9)'        // Dark Red for extreme risk
        };
        
        const heatmapConfig = {
          radius: 0.9,         // Larger radius for risk areas
          maxOpacity: 0.8,     // Higher opacity
          scaleRadius: true,
          useLocalExtrema: true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'value',
          gradient: gradient,
          blur: 0.95,
          minOpacity: 0.35
        };
        
        // Create and add heatmap layer
        const heatmapLayer = new window.HeatmapOverlay(heatmapConfig);
        heatmapLayerRef.current = heatmapLayer;
        map.addLayer(heatmapLayer);
        
        // Use high-risk areas data for the heatmap
        if (highRiskAreas && highRiskAreas.length > 0) {
          // Process data for better visualization
          const processedData = highRiskAreas.map(point => {
            // Identify Tamil Nadu locations by latitude/longitude
            const isTamilNaduLocation = 
              (point.lat >= 8.0 && point.lat <= 13.5) && 
              (point.lng >= 76.0 && point.lng <= 80.5);
            
            let adjustedValue = point.value;
            
            // Enhance Tamil Nadu high-risk areas visualization
            if (isTamilNaduLocation) {
              // Slightly boost values for Tamil Nadu locations for better visibility
              adjustedValue = Math.min(100, point.value * 1.1);
            }
            
            return {
              lat: point.lat,
              lng: point.lng,
              value: adjustedValue,
              count: Math.ceil(adjustedValue / 16),
              radius: Math.max(22, adjustedValue / 2.5 + 12), // Larger radius for risk areas
              emergencyType: point.emergency,
              note: point.note
            };
          });
          
          heatmapLayer.setData({
            max: 100,
            data: processedData
          });
        }
      } catch (error) {
        console.error("Failed to create heatmap:", error);
      }
    };
    
    // Load first the simpler library, fallback to nothing if needed
    loadScript('https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js', () => {
      setupHeatmap();
    });
    
    return () => {
      try {
        if (heatmapLayerRef.current) {
          map.removeLayer(heatmapLayerRef.current);
        }
      } catch (error) {
        console.error("Error cleaning up heatmap:", error);
      }
    };
  }, [map, data]);

  return null;
}

// Debug component to check if Leaflet Draw is loaded properly
function LeafletDrawStatus() {
  const [status, setStatus] = useState({
    checked: false,
    loaded: false,
    version: null,
    error: null
  });

  useEffect(() => {
    try {
      // Check if L.Draw exists
      const isLoaded = !!window.L && !!window.L.Draw;
      const version = isLoaded && window.L.drawVersion;
      
      setStatus({
        checked: true,
        loaded: isLoaded,
        version: version || "unknown",
        error: null
      });
    } catch (err) {
      setStatus({
        checked: true,
        loaded: false,
        version: null,
        error: err.message
      });
    }
  }, []);

  return (
    <div className="leaflet-draw-status" style={{
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'white',
      padding: '5px',
      zIndex: 1000,
      borderRadius: '3px',
      boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
      fontSize: '12px',
      display: 'none' // Set to 'block' to show for debugging
    }}>
      <div>Leaflet Draw Status: {status.loaded ? '✅ Loaded' : '❌ Not Loaded'}</div>
      {status.version && <div>Version: {status.version}</div>}
      {status.error && <div style={{color: 'red'}}>Error: {status.error}</div>}
    </div>
  );
}

export default function MapView() {
  // State for map data
  const [locations, setLocations] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);
  const [customRestrictedZones, setCustomRestrictedZones] = useState([]);
  const [touristDensityData, setTouristDensityData] = useState([]);
  
  // UI state
  const [showInfoTooltip, setShowInfoTooltip] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [mapError, setMapError] = useState(null);
  
  // Layer toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRestrictedForests, setShowRestrictedForests] = useState(true);
  
  // Force controls visibility when component mounts
  useEffect(() => {
    setShowControls(true);
    
    // Add a class to the body to ensure visibility
    document.body.classList.add('controls-enabled');
    
    return () => {
      document.body.classList.remove('controls-enabled');
    };
  }, []);

  // Connect to WebSocket with better error handling
  useEffect(() => {
    try {
      // Load initial locations from backend
      axios
        .get(`${API_BASE}/locations/v1/locations`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setLocations(res.data);
            
            // Generate tourist density data for heatmap based on locations
            const densityPoints = res.data.map(loc => ({
              lat: loc.latitude,
              lng: loc.longitude,
              value: 60 + Math.floor(Math.random() * 40),
              emergency: "Tourist Density"
            }));
            
            setTouristDensityData(densityPoints);
          }
        })
        .catch((err) => {
          console.error("Failed to load initial locations:", err);
          // Continue even if this fails
        });

      // Load emergency data with a more robust approach
      axios
        .get('/emergency-data.json')
        .catch(() => {
          console.warn("Failed to load emergency data, using fallback data");
          // Return some fallback data
          return {
            data: [
              { lat: 28.6139, lng: 77.2090, value: 80, emergency: "Medical Assistance" },
              { lat: 19.0760, lng: 72.8777, value: 70, emergency: "Police Assistance" }
            ]
          };
        })
        .then((res) => {
          if (res && Array.isArray(res.data)) {
            setEmergencyData(res.data);
          }
        });
        
      // Load custom restricted zones from localStorage
      try {
        const savedZones = localStorage.getItem('customRestrictedZones');
        if (savedZones) {
          setCustomRestrictedZones(JSON.parse(savedZones));
        }
      } catch (err) {
        console.error("Failed to load custom zones from localStorage:", err);
      }

      // Connect to WebSocket for live updates - with error handling
      let socket;
      try {
        socket = io("http://localhost:5000", {
          reconnectionAttempts: 3,
          timeout: 5000,
          transports: ['websocket', 'polling']
        });

        socket.on("connect", () => {
          console.log("✅ Connected to WebSocket:", socket.id);
        });

        socket.on("connect_error", (err) => {
          console.warn("WebSocket connection error:", err);
          // Socket.io will automatically try to reconnect
        });

        // Handle live location updates
        socket.on("locationUpdate", (update) => {
          setLocations((prev) => {
            const idx = prev.findIndex((loc) => loc.touristId === update.touristId);
            if (idx !== -1) {
              const newArr = [...prev];
              newArr[idx] = update; // replace the old location
              return newArr;
            } else {
              return [update, ...prev]; // new tourist
            }
          });
          
          // Also update the tourist density heatmap data
          setTouristDensityData(prev => {
            // Add the new location as a heat point
            return [...prev, {
              lat: update.latitude,
              lng: update.longitude,
              value: 80, // High value for recent updates
              emergency: "Tourist Density"
            }];
          });
        });

        // Handle emergency updates
        socket.on("emergencyUpdate", (update) => {
          if (update && update.lat && update.lng && update.value) {
            setEmergencyData(prev => {
              // Check if we already have this location
              const idx = prev.findIndex(item => 
                Math.abs(item.lat - update.lat) < 0.001 && 
                Math.abs(item.lng - update.lng) < 0.001
              );
              
              if (idx !== -1) {
                const newData = [...prev];
                newData[idx] = update;
                return newData;
              } else {
                return [...prev, update];
              }
            });
          }
        });

        socket.on("disconnect", () => console.log("❌ Disconnected from WebSocket"));
      } catch (err) {
        console.error("Failed to initialize WebSocket:", err);
        // Continue without socket functionality
      }

      return () => {
        if (socket && socket.connected) {
          socket.disconnect();
        }
      };
    } catch (error) {
      console.error("Error in main useEffect:", error);
      setMapError("Failed to initialize map components");
    }
  }, []);

  // Calculate color based on emergency value
  const getMarkerColor = (emergencyType) => {
    switch (emergencyType) {
      case 'Medical Assistance': return 'blue';
      case 'Police Assistance': return 'green';
      case 'Fire Emergency': return 'red';
      case 'Natural Disaster': return 'purple';
      case 'Tourist Density': return 'orange';
      default: return 'gray';
    }
  };

  // Custom marker icon based on emergency type
  const createCustomIcon = (emergencyType) => {
    const color = getMarkerColor(emergencyType);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  };

  // Handle custom zone creation
  const handleZoneCreated = (zoneData) => {
    if (zoneData.deleted) {
      // Remove the zone
      setCustomRestrictedZones(prev => {
        const newZones = prev.filter(zone => zone.id !== zoneData.id);
        // Save to localStorage
        localStorage.setItem('customRestrictedZones', JSON.stringify(newZones));
        return newZones;
      });
    } else {
      // Add or update the zone
      setCustomRestrictedZones(prev => {
        const existingIndex = prev.findIndex(zone => zone.id === zoneData.id);
        let newZones;
        
        if (existingIndex !== -1) {
          // Update existing zone
          newZones = [...prev];
          newZones[existingIndex] = zoneData;
        } else {
          // Add new zone
          newZones = [...prev, zoneData];
        }
        
        // Save to localStorage
        localStorage.setItem('customRestrictedZones', JSON.stringify(newZones));
        return newZones;
      });
    }
  };

  // Combine emergency data and tourist density data for the heatmap
  const combinedHeatmapData = [...emergencyData, ...touristDensityData];

  // Add a function to focus on Tamil Nadu
  const focusOnTamilNadu = () => {
    if (mapRef.current) {
      mapRef.current.setView([10.8, 78.6], 7);
    }
  };
  
  // Add a ref to access the map
  const mapRef = useRef(null);
  
  // Add additional Tamil Nadu risk spots with markers
  const riskMarkers = [
    { lat: 13.0827, lng: 80.2707, risk: "high", type: "Crime", description: "Chennai Central - Pickpocketing hotspot" },
    { lat: 9.9252, lng: 78.1198, risk: "high", type: "Crowd", description: "Madurai Temple - Stampede risk during festivals" },
    { lat: 10.3148, lng: 77.9714, risk: "high", type: "Nature", description: "Kodaikanal cliff paths - Fall hazard" },
    { lat: 9.2647, lng: 79.3035, risk: "high", type: "Water", description: "Rameswaram sea - Strong undercurrents" },
    { lat: 8.7642, lng: 77.6941, risk: "medium", type: "Water", description: "Kanyakumari point - High waves" }
  ];

  // Custom icon for risk markers
  const getRiskIcon = (risk) => {
    const color = risk === "high" ? "#ff0000" : risk === "medium" ? "#ff7700" : "#ffcc00";
    return L.divIcon({
      className: 'risk-marker',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  return (
    <div className="map-container">
      {!showControls && (
        <button 
          className="show-controls-btn"
          onClick={() => setShowControls(true)}
          title="Show Map Controls"
        >
          <span className="controls-icon">⚙️</span>
          <span className="controls-text">Controls</span>
        </button>
      )}
      
      {mapError && (
        <div className="map-error-overlay">
          <div className="map-error-content">
            <h3>Map Error</h3>
            <p>{mapError}</p>
            <p>Please refresh the page or try again later.</p>
          </div>
        </div>
      )}
      
      <div className={`map-controls ${showControls ? 'visible' : 'hidden'}`}>
        <div className="map-controls-header">
          <h3>Map Controls</h3>
          <button 
            className="btn-close" 
            onClick={() => setShowControls(false)} 
            aria-label="Close controls"
          >×</button>
        </div>
        
        <div className="form-check form-switch">
          <input 
            className="form-check-input important-toggle" 
            type="checkbox" 
            id="heatmapToggle" 
            checked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="heatmapToggle">
            <strong>Tourist Risk Heatmap</strong>
          </label>
          <div className="form-text small-text">
            Shows high-risk areas for tourists
          </div>
        </div>
        
        <div className="form-check form-switch">
          <input 
            className="form-check-input important-toggle" 
            type="checkbox" 
            id="restrictedForestToggle" 
            checked={showRestrictedForests}
            onChange={(e) => setShowRestrictedForests(e.target.checked)}
            title="Important: Shows areas where tourist access is restricted or prohibited"
          />
          <label className="form-check-label" htmlFor="restrictedForestToggle">
            Restricted Forest Zones
          </label>
          <div className="form-text small-text">
            Shows protected forest areas marked as red zones
          </div>
        </div>
        
        <div className="intensity-scale-container">
          <h3>Tourist Risk Levels</h3>
          <div className="intensity-scale-with-ticks"></div>
          <div className="scale-labels" style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "5px"}}>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
        
        <div className="emergency-legend">
          <h3>Risk Categories</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff0000' }}></div>
            <span>High Risk Area</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff7700' }}></div>
            <span>Medium Risk Area</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffcc00' }}></div>
            <span>Low Risk Area</span>
          </div>
          
          {showRestrictedForests && (
            <div className="legend-item">
              <div className="legend-color restricted-legend-zone"></div>
              <span>Restricted Forest Zone</span>
            </div>
          )}
        </div>
        
        {/* Add a Tamil Nadu focus button */}
        <div className="region-focus-container" style={{ marginTop: "15px", borderTop: "1px solid rgba(0, 0, 0, 0.1)", paddingTop: "15px" }}>
          <h3>Region Focus</h3>
          <button 
            onClick={focusOnTamilNadu}
            style={{
              padding: "8px 12px",
              backgroundColor: "#ff7700",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "600",
              fontSize: "14px",
              marginTop: "5px"
            }}
          >
            Focus on Tamil Nadu
          </button>
        </div>
      </div>
      
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        doubleClickZoom={false}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        {/* Heatmap Layer */}
        {showHeatmap && <HeatmapLayer data={[]} />}
        
        {/* Restricted Forest Zones layer */}
        {showRestrictedForests && (
          <RestrictedForestLayer 
            key={`forest-layer-${customRestrictedZones.length}`}
            customZones={customRestrictedZones} 
          />
        )}
        
        {/* Debug component */}
        <LeafletDrawStatus />
        
        {/* Tourist markers */}
        {locations.map((loc) => (
          <Marker 
            key={loc.touristId} 
            position={[loc.latitude, loc.longitude]}
          >
            <Popup>
              <strong>Tourist ID:</strong> {loc.tourist.touristId} <br />
              <strong>Lat:</strong> {loc.latitude} <br />
              <strong>Lng:</strong> {loc.longitude} <br />
              <strong>Time:</strong>{" "}
              {new Date(loc.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
        
        {/* Emergency markers */}
        {emergencyData.map((emergency, index) => (
          <Marker 
            key={`emergency-${index}`} 
            position={[emergency.lat, emergency.lng]}
            icon={createCustomIcon(emergency.emergency)}
          >
            <Popup>
              <strong>Emergency Type:</strong> {emergency.emergency} <br />
              <strong>Intensity:</strong> {emergency.value}/100 <br />
              <strong>Lat:</strong> {emergency.lat} <br />
              <strong>Lng:</strong> {emergency.lng}
            </Popup>
          </Marker>
        ))}
        
        {/* Risk marker points */}
        {showHeatmap && riskMarkers.map((marker, index) => (
          <Marker 
            key={`risk-${index}`} 
            position={[marker.lat, marker.lng]}
            icon={getRiskIcon(marker.risk)}
          >
            <Popup>
              <strong>Risk Level:</strong> {marker.risk.toUpperCase()} <br />
              <strong>Type:</strong> {marker.type} <br />
              <strong>Details:</strong> {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
           