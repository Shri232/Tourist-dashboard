import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import RestrictedForestLayer from "./RestrictedForestLayer";
import { initLeafletDraw } from "./LeafletDrawFallback";
// Import Northeast India data
import { 
  getNortheastIndiaRiskDataForHeatmap, 
  getNortheastIndiaRiskMarkers,
  getNortheastIndiaTouristClustersForHeatmap,
  getNortheastIndiaTouristClusterMarkers,
  getStatesList,
  getRiskTypesList,
  getTouristClusterTypesList,
  getNortheastIndiaBounds
} from "../utils/NortheastIndiaData";

// Fix Leaflet default marker in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const API_BASE = "http://localhost:5000/api";

// Enhanced HeatmapLayer component with both risk and tourist clusters
function EnhancedHeatmapLayer({ data, mapMode, intensityFactor = 1, regionFilter = 'all' }) {
  const map = useMap();
  const heatmapLayerRef = useRef(null);
  const clusterLayerRef = useRef(null);
  
  useEffect(() => {
    // Define detailed high-risk areas in Tamil Nadu and other regions
    const highRiskAreas = [
      // Very High Risk Areas (Red) - Value 90-100
      { lat: 13.0827, lng: 80.2707, value: 95, type: "High Risk", category: "Crime", note: "Chennai Central - Pickpocketing hotspot", details: "High tourist crowding leads to pickpocketing incidents." },
      { lat: 9.9252, lng: 78.1198, value: 92, type: "High Risk", category: "Crowd", note: "Madurai Temple - Extremely crowded during festivals", details: "Risk of stampede during major festivals with 50,000+ visitors." },
      { lat: 11.1085, lng: 78.6569, value: 94, type: "High Risk", category: "Flood", note: "Erode - Flash flood prone area during monsoon", details: "Heavy rainfall causes sudden flooding in lower areas." },
      { lat: 9.2647, lng: 79.3035, value: 96, type: "High Risk", category: "Water", note: "Rameswaram - Strong currents near Dhanushkodi", details: "Dangerous sea currents have caused multiple drowning incidents." },
      { lat: 8.7642, lng: 77.6941, value: 93, type: "High Risk", category: "Water", note: "Kanyakumari Point - Dangerous high waves", details: "Unpredictable high waves during evening high tide." },
      { lat: 13.0499, lng: 80.2824, value: 98, type: "High Risk", category: "Crime", note: "North Chennai - Crime hotspot after dark", details: "Highest crime rates recorded between 10PM-2AM." },
      { lat: 10.0783, lng: 77.0685, value: 97, type: "High Risk", category: "Landslide", note: "Munnar hillsides - Landslide prone during rain", details: "Loose soil structure makes hillsides unstable after heavy rainfall." },
      { lat: 10.3148, lng: 77.9714, value: 98, type: "High Risk", category: "Fall", note: "Kodaikanal cliff areas - Fall hazard", details: "Steep drops with inadequate safety barriers." },
      
      // Additional high risk areas with detailed information
      { lat: 12.9200, lng: 80.2372, value: 94, type: "High Risk", category: "Water", note: "Marina Beach - Strong rip currents", details: "Swimming prohibited due to strong undertow currents." },
      { lat: 11.5624, lng: 78.2583, value: 93, type: "High Risk", category: "Road", note: "Yercaud Ghat Road - 20 hairpin bends", details: "Sharp turns with poor visibility in fog, high accident rate." },
      { lat: 10.0764, lng: 79.2173, value: 95, type: "High Risk", category: "Isolation", note: "Dhanushkodi - Remote area with sudden tides", details: "Limited phone connectivity and emergency services." },
      
      // Medium Risk Areas (Orange) - Value 70-89
      { lat: 11.4882, lng: 79.7133, value: 85, type: "Medium Risk", category: "Water", note: "Pondicherry beaches - Rip currents", details: "Moderate strength currents, swimming advisories common." },
      { lat: 10.7905, lng: 79.1378, value: 82, type: "Medium Risk", category: "Theft", note: "Thanjavur - Moderate theft rate", details: "Camera and bag theft reported at popular temple sites." },
      { lat: 12.6195, lng: 79.4192, value: 78, type: "Medium Risk", category: "Crowd", note: "Kanchipuram - Crowded during festivals", details: "Limited emergency exits in temple complexes." },
      { lat: 11.2342, lng: 78.1694, value: 75, type: "Medium Risk", category: "Road", note: "Namakkal - Accident prone highways", details: "High-speed traffic mixing with pedestrians near tourist spots." },
      { lat: 11.9316, lng: 79.8352, value: 80, type: "Medium Risk", category: "Theft", note: "Auroville - Isolated areas with theft risk", details: "Limited security in outer visitor areas after sunset." },
      { lat: 12.9249, lng: 80.1000, value: 76, type: "Medium Risk", category: "Water", note: "Mahabalipuram - Strong sea currents", details: "Seasonal strong currents during monsoon months." },
      { lat: 10.9559, lng: 78.0766, value: 72, type: "Medium Risk", category: "Industrial", note: "Karur - Industrial hazards", details: "Chemical exposure risk from nearby industrial facilities." },
      
      // Lower Risk Areas (Yellow) - Value 50-69
      { lat: 11.6643, lng: 78.1460, value: 65, type: "Low Risk", category: "General", note: "Salem - Moderate risk areas", details: "General urban risks with adequate safety measures in place." },
      { lat: 8.0883, lng: 77.5385, value: 60, type: "Low Risk", category: "General", note: "Tirunelveli - Some incidents reported", details: "Minor theft incidents, good police presence." },
      { lat: 10.7672, lng: 78.7139, value: 55, type: "Low Risk", category: "General", note: "Trichy - Low-moderate risk", details: "Well-monitored tourist areas with emergency services." },
      { lat: 12.2253, lng: 79.0747, value: 58, type: "Low Risk", category: "Crowd", note: "Tiruvannamalai - Minor crowd issues", details: "Occasionally crowded during full moon days." },
      { lat: 12.9165, lng: 79.1325, value: 62, type: "Low Risk", category: "General", note: "Vellore - Minor incidents", details: "Occasional petty crime reported near bus stations." }
    ];

    // Define tourist clusters - separate from risk zones
    const touristClusters = [
      // Major Tourist Hotspots (high density)
      { lat: 13.0827, lng: 80.2707, count: 450, type: "Tourist Cluster", category: "High Density", note: "Chennai Central Area", details: "Major transport hub with continuous tourist flow" },
      { lat: 9.9252, lng: 78.1198, count: 380, type: "Tourist Cluster", category: "High Density", note: "Meenakshi Amman Temple", details: "Major religious site attracting 15,000+ visitors daily" },
      { lat: 12.9249, lng: 80.1000, count: 320, type: "Tourist Cluster", category: "High Density", note: "Mahabalipuram Shore Temple", details: "UNESCO site with high international visitor count" },
      { lat: 11.4144, lng: 76.7067, count: 400, type: "Tourist Cluster", category: "High Density", note: "Ooty Central", details: "Hill station with heavy seasonal tourism" },
      { lat: 8.7642, lng: 77.6941, count: 350, type: "Tourist Cluster", category: "High Density", note: "Kanyakumari Viewpoint", details: "Popular sunset viewing area with concentrated crowds" },
      
      // Medium density clusters
      { lat: 10.3623, lng: 77.9695, count: 280, type: "Tourist Cluster", category: "Medium Density", note: "Kodaikanal Lake", details: "Popular recreational area with boat rides" },
      { lat: 11.4882, lng: 79.7133, count: 260, type: "Tourist Cluster", category: "Medium Density", note: "Pondicherry Beach Road", details: "Colonial architecture attracting moderate crowds" },
      { lat: 10.0839, lng: 77.0595, count: 250, type: "Tourist Cluster", category: "Medium Density", note: "Munnar Tea Gardens", details: "Popular photography spots spread over larger area" },
      { lat: 10.0764, lng: 79.2173, count: 180, type: "Tourist Cluster", category: "Medium Density", note: "Dhanushkodi Ghost Town", details: "Abandoned town with steady visitor flow" },
      
      // Lower density areas
      { lat: 12.2253, lng: 79.0747, count: 120, type: "Tourist Cluster", category: "Low Density", note: "Tiruvannamalai Temple", details: "Spiritual site with distributed visitor patterns" },
      { lat: 10.7905, lng: 79.1378, count: 100, type: "Tourist Cluster", category: "Low Density", note: "Thanjavur Palace", details: "Historical site with manageable visitor numbers" },
      { lat: 11.2342, lng: 78.1694, count: 90, type: "Tourist Cluster", category: "Low Density", note: "Namakkal Fort", details: "Off-beat destination with lower footfall" }
    ];

    // Get Northeast India data
    const northeastIndiaRiskData = getNortheastIndiaRiskDataForHeatmap();
    const northeastIndiaTouristClusters = getNortheastIndiaTouristClustersForHeatmap();

    // Setup function for creating the heatmap layer
    const setupHeatmap = () => {
      try {
        // First remove any existing layers
        if (heatmapLayerRef.current) {
          map.removeLayer(heatmapLayerRef.current);
          heatmapLayerRef.current = null;
        }

        // Get appropriate data based on mode and region
        let pointsData = [];
        let gradient = {};
        let radius = 25;
        
        if (mapMode === 'risk') {
          // Red -> Yellow -> Green gradient for risk visualization
          gradient = {
            0.0: 'rgb(0, 255, 0)',   // Green (low risk)
            0.5: 'rgb(255, 255, 0)',  // Yellow (medium risk)
            1.0: 'rgb(255, 0, 0)'     // Red (high risk)
          };
          
          radius = 30 * intensityFactor;
          
          // Get appropriate risk data based on region filter
          if (regionFilter === 'northeast') {
            pointsData = northeastIndiaRiskData.map(point => [
              point.lat, 
              point.lng, 
              point.risk_level * 10 // Scale to 0-100
            ]);
          } else if (regionFilter === 'tamil') {
            // Tamil Nadu risk data
            pointsData = highRiskAreas.map(point => [
              point.lat, 
              point.lng, 
              point.value
            ]);
          } else {
            // All regions - combine data
            pointsData = [
              ...highRiskAreas.map(point => [point.lat, point.lng, point.value]),
              ...northeastIndiaRiskData.map(point => [point.lat, point.lng, point.risk_level * 10])
            ];
          }
        } else {
          // Tourist mode uses blue/purple gradient (keep this unchanged)
          gradient = {
            0.0: 'rgb(0, 191, 255)',   // Light blue (low)
            0.5: 'rgb(0, 0, 255)',      // Blue (medium)
            1.0: 'rgb(75, 0, 130)'      // Indigo (high)
          };
          
          radius = 35 * intensityFactor;
          
          // Tourist clusters for each region
          if (regionFilter === 'northeast') {
            pointsData = northeastIndiaTouristClusters.map(point => [
              point.lat,
              point.lng,
              point.count
            ]);
          } else if (regionFilter === 'tamil') {
            pointsData = touristClusters.map(point => [
              point.lat,
              point.lng,
              point.count
            ]);
          } else {
            // All regions - combine both
            pointsData = [
              ...touristClusters.map(point => [point.lat, point.lng, point.count]),
              ...northeastIndiaTouristClusters.map(point => [point.lat, point.lng, point.count])
            ];
          }
        }

        // Create the heatmap layer with the enhanced configuration
        heatmapLayerRef.current = L.heatLayer(pointsData, {
          radius: radius,
          blur: radius * 1.2,
          maxZoom: 10,
          gradient: gradient,
          minOpacity: 0.4,
          max: mapMode === 'risk' ? 100 : 500  // Maximum value for intensity scaling
        }).addTo(map);
        
        // Rest of your function...
      } catch (error) {
        console.error("Error setting up heatmap:", error);
      }
    };
    
    // Load Leaflet.heat library
    const loadLeafletHeat = () => {
      if (typeof L.heatLayer !== 'undefined') {
        setupHeatmap();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
      script.onload = () => setupHeatmap();
      script.onerror = () => console.error("Failed to load heatmap library");
      document.head.appendChild(script);
    };
    
    loadLeafletHeat();
    
    return () => {
      // Clean up on unmount
      try {
        if (heatmapLayerRef.current) {
          map.removeLayer(heatmapLayerRef.current);
        }
        if (clusterLayerRef.current) {
          map.removeLayer(clusterLayerRef.current);
        }
      } catch (error) {
        console.error("Error cleaning up visualization layers:", error);
      }
    };
  }, [map, mapMode, intensityFactor, data, regionFilter]);

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
  
  // Add state for first-time user guidance
  const [showGuide, setShowGuide] = useState(true);
  
  // Visualization controls
  const [mapMode, setMapMode] = useState('risk');  // 'risk' or 'tourist'
  const [intensityFactor, setIntensityFactor] = useState(1.0);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Region filter for multiple datasets
  const [regionFilter, setRegionFilter] = useState('all'); // 'all', 'tamil', 'northeast'

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

  // Add functions to focus on specific regions
  const focusOnTamilNadu = () => {
    if (mapRef.current) {
      mapRef.current.setView([10.8, 78.6], 7);
      setRegionFilter('tamil');
    }
  };
  
  const focusOnNortheastIndia = () => {
    if (mapRef.current) {
      mapRef.current.setView([26.2006, 94.5], 6);
      setRegionFilter('northeast');
    }
  };
  
  const focusOnAllIndia = () => {
    if (mapRef.current) {
      mapRef.current.setView([20.5937, 78.9629], 5);
      setRegionFilter('all');
    }
  };
  
  // Add a ref to access the map
  const mapRef = useRef(null);
  
  // Add additional Tamil Nadu risk spots with markers
  const tamilRiskMarkers = [
    { lat: 13.0827, lng: 80.2707, risk: "high", type: "Crime", description: "Chennai Central - Pickpocketing hotspot" },
    { lat: 9.9252, lng: 78.1198, risk: "high", type: "Crowd", description: "Madurai Temple - Stampede risk during festivals" },
    { lat: 10.3148, lng: 77.9714, risk: "high", type: "Nature", description: "Kodaikanal cliff paths - Fall hazard" },
    { lat: 9.2647, lng: 79.3035, risk: "high", type: "Water", description: "Rameswaram sea - Strong undercurrents" },
    { lat: 8.7642, lng: 77.6941, risk: "medium", type: "Water", description: "Kanyakumari point - High waves" }
  ];
  
  // Get Northeast India risk markers
  const northeastRiskMarkers = getNortheastIndiaRiskMarkers();
  // Get Northeast India tourist cluster markers
  const northeastTouristMarkers = getNortheastIndiaTouristClusterMarkers();

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

  // Add home navigation function
  const navigateToHome = () => {
    window.location.href = window.location.origin;
  };
  
  return (
    <div className="map-container">
      {/* Back to dashboard button */}
      <button 
        className="back-to-dashboard-btn"
        onClick={navigateToHome}
        title="Return to Dashboard"
      >
        <span className="back-icon">←</span>
        <span className="back-text">Dashboard</span>
      </button>

      {/* First-time user guide overlay */}
      {/* {showGuide && (
        <div className="guide-overlay">
          <div className="guide-content">
            <h3>Tourist & Risk Map Guide</h3>
            <ul className="guide-steps">
              <li><span className="step-number">1</span> Toggle between <strong>Risk Zones</strong> and <strong>Tourist Clusters</strong> to see different data</li>
              <li><span className="step-number">2</span> Use <strong>Region Filter</strong> to focus on Tamil Nadu or Northeast India</li>
              <li><span className="step-number">3</span> Click on highlighted areas to see detailed information</li>
            </ul>
            <button className="guide-button" onClick={() => setShowGuide(false)}>
              Got it!
            </button>
          </div>
        </div>
      )} */}
      
      {/* Loading indicator */}
      {!showControls && !showGuide && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>Loading map data...</p>
        </div>
      )}
      
      {/* Error overlay */}
      {mapError && (
        <div className="map-error-overlay">
          <div className="map-error-content">
            <h3>Map Error</h3>
            <p>{mapError}</p>
            <button className="error-retry-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Enhanced controls with visualization options */}
      <div className={`map-controls ${showControls ? 'visible' : 'hidden'}`}>
        <div className="map-controls-header">
          <h3>Visualization Controls</h3>
          <button 
            className="btn-close" 
            onClick={() => setShowControls(false)} 
            aria-label="Close controls"
          >×</button>
        </div>
        
        {/* Simple instructions */}
        <div className="map-instructions">
          <p>Select regions and visualization modes to explore tourist risk zones across India.</p>
        </div>
        
        {/* Region selector */}
        <div className="controls-section">
          <h4>Region Focus</h4>
          <div className="region-toggle">
            <button 
              className={`region-btn ${regionFilter === 'all' ? 'active' : ''}`}
              onClick={() => {
                setRegionFilter('all');
                focusOnAllIndia();
              }}
            >
              <span className="region-icon">🇮🇳</span>
              <span>All India</span>
            </button>
            <button 
              className={`region-btn ${regionFilter === 'tamil' ? 'active' : ''}`}
              onClick={() => {
                setRegionFilter('tamil');
                focusOnTamilNadu();
              }}
            >
              <span className="region-icon">🏞️</span>
              <span>Tamil Nadu</span>
            </button>
            <button 
              className={`region-btn ${regionFilter === 'northeast' ? 'active' : ''}`}
              onClick={() => {
                setRegionFilter('northeast');
                focusOnNortheastIndia();
              }}
            >
              <span className="region-icon">🏔️</span>
              <span>Northeast</span>
            </button>
          </div>
        </div>
        
        {/* Visualization mode toggle */}
        <div className="controls-section">
          <h4>Visualization Mode</h4>
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${mapMode === 'risk' ? 'active' : ''}`}
              onClick={() => setMapMode('risk')}
            >
              <span className="mode-icon">⚠️</span>
              <span>Risk Zones</span>
            </button>
            <button 
              className={`mode-btn ${mapMode === 'tourist' ? 'active' : ''}`}
              onClick={() => setMapMode('tourist')}
            >
              <span className="mode-icon">👥</span>
              <span>Tourist Clusters</span>
            </button>
          </div>
        </div>
        
        {/* Intensity control */}
        <div className="controls-section">
          <h4>Visualization Intensity</h4>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.1" 
            value={intensityFactor}
            onChange={(e) => setIntensityFactor(parseFloat(e.target.value))}
            className="intensity-slider"
          />
          <div className="slider-labels">
            <span>Subtle</span>
            <span>Normal</span>
            <span>Intense</span>
          </div>
        </div>
        
        {/* Legend for current mode */}
        <div className="controls-section">
          <h4>{mapMode === 'risk' ? 'Risk Levels Legend' : 'Tourist Density Legend'}</h4>
          <div className="legend-container">
            {mapMode === 'risk' ? (
              <>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "red" }}></div>
                  <span>High Risk (75-100%)</span>
                </div>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "yellow" }}></div>
                  <span>Medium Risk (50-74%)</span>
                </div>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "green" }}></div>
                  <span>Low Risk (0-49%)</span>
                </div>
                
                {regionFilter === 'northeast' && (
                  <div className="northeast-legend">
                    <h5>Northeast India Risk Types</h5>
                    <div className="legend-row">
                      <div className="legend-dot border-risk"></div>
                      <span>Border Area Tensions</span>
                    </div>
                    <div className="legend-row">
                      <div className="legend-dot ethnic-risk"></div>
                      <span>Ethnic Conflicts</span>
                    </div>
                    <div className="legend-row">
                      <div className="legend-dot infra-risk"></div>
                      <span>Infrastructure Issues</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "#4B0082" }}></div>
                  <span>High Density (300+ tourists)</span>
                </div>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "#0000FF" }}></div>
                  <span>Medium Density (150-299)</span>
                </div>
                <div className="legend-row">
                  <div className="legend-color" style={{ background: "#00BFFF" }}></div>
                  <span>Low Density (50-149)</span>
                </div>
                
                {regionFilter === 'northeast' && mapMode === 'tourist' && (
                  <div className="northeast-legend">
                    <h5>Northeast India Attraction Types</h5>
                    <div className="legend-row">
                      <div className="legend-dot nature-spot"></div>
                      <span>Nature & Parks</span>
                    </div>
                    <div className="legend-row">
                      <div className="legend-dot culture-spot"></div>
                      <span>Cultural Sites</span>
                    </div>
                    <div className="legend-row">
                      <div className="legend-dot festival-spot"></div>
                      <span>Festival Venues</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Focus buttons based on region */}
        <div className="controls-section">
          <h4>Quick Navigation</h4>
          <div className="focus-buttons">
            {regionFilter === 'tamil' && (
              <>
                <button onClick={() => mapRef.current?.setView([13.0827, 80.2707], 12)} className="focus-button secondary">
                  Chennai Hotspots
                </button>
                <button onClick={() => mapRef.current?.setView([9.9252, 78.1198], 12)} className="focus-button secondary">
                  Madurai Temple Area
                </button>
              </>
            )}
            
            {regionFilter === 'northeast' && (
              <>
                {mapMode === 'risk' ? (
                  <>
                    <button onClick={() => mapRef.current?.setView([27.5864, 91.8569], 10)} className="focus-button secondary">
                      Arunachal Pradesh Border
                    </button>
                    <button onClick={() => mapRef.current?.setView([24.817, 93.9368], 10)} className="focus-button secondary">
                      Manipur Conflict Zone
                    </button>
                    <button onClick={() => mapRef.current?.setView([25.5788, 91.8933], 11)} className="focus-button secondary">
                      Shillong (Safe Zone)
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => mapRef.current?.setView([25.6, 94.0667], 10)} className="focus-button secondary festival-button">
                      Hornbill Festival (Highest Traffic)
                    </button>
                    <button onClick={() => mapRef.current?.setView([26.5775, 93.1712], 10)} className="focus-button secondary nature-button">
                      Kaziranga National Park
                    </button>
                    <button onClick={() => mapRef.current?.setView([27.3389, 88.6065], 11)} className="focus-button secondary culture-button">
                      Gangtok Tourism Hub
                    </button>
                  </>
                )}
              </>
            )}
            
            {regionFilter === 'all' && (
              <>
                <button onClick={focusOnTamilNadu} className="focus-button secondary">
                  Tamil Nadu
                </button>
                <button onClick={focusOnNortheastIndia} className="focus-button secondary">
                  Northeast India
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Northeast India specific info when selected */}
        {regionFilter === 'northeast' && (
          <div className="controls-section no-border">
            <div className="region-info-box">
              <h4>Northeast India {mapMode === 'risk' ? 'Risk Profile' : 'Tourism Profile'}</h4>
              <p className="region-info-text">
                {mapMode === 'risk' 
                  ? 'Higher risks near international borders with China, Myanmar and Bangladesh. Interior areas of Sikkim and Meghalaya are generally safer.' 
                  : 'Highest tourist concentration in Sikkim, followed by Meghalaya and Assam. Seasonal variations with peak tourism during Oct-Feb.'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Show controls button - improved visibility */}
      {!showControls && (
        <button 
          className="show-controls-btn"
          onClick={() => setShowControls(true)}
        >
          <span className="controls-icon">⚙️</span>
          <span>Show Controls</span>
        </button>
      )}
      
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
        
        {/* Enhanced visualization layer with both risk and tourist cluster modes */}
        <EnhancedHeatmapLayer 
          data={combinedHeatmapData} 
          mapMode={mapMode} 
          intensityFactor={intensityFactor}
          regionFilter={regionFilter}
        />
        
        {/* Restricted Forest Zones layer */}
        {showRestrictedForests && (
          <RestrictedForestLayer 
            key={`forest-layer-${customRestrictedZones.length}`}
            customZones={customRestrictedZones} 
          />
        )}
        
        {/* Tourist markers (simplified when in heatmap mode) */}
        {mapMode === 'tourist' && locations.map((loc) => (
          <Marker 
            key={loc.touristId} 
            position={[loc.latitude, loc.longitude]}
            opacity={0.7} // Reduce opacity to not interfere with heatmap
          >
            <Popup>
              <div className="tourist-popup">
                <h4>Tourist Information</h4>
                <p><strong>ID:</strong> {loc.tourist?.touristId || 'Unknown'}</p>
                <p><strong>Location:</strong> {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}</p>
                <p><strong>Last Updated:</strong> {new Date(loc.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Map attribution overlay */}
        <div className="map-attribution">
          <div className="map-mode-indicator">
            <span className="mode-icon">{mapMode === 'risk' ? '⚠️' : '👥'}</span>
            <span className="mode-text">
              {mapMode === 'risk' ? 'Risk Zones' : 'Tourist Clusters'}
              {regionFilter !== 'all' && ` - ${regionFilter === 'tamil' ? 'Tamil Nadu' : 'Northeast India'}`}
            </span>
          </div>
        </div>
        
        {/* Region label overlay */}
        {regionFilter === 'northeast' && (
          <div className="region-label">
            <span>Northeast India</span>
          </div>
        )}
      </MapContainer>
    </div>
  );
}


