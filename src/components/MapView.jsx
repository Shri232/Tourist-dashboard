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

// HeatmapLayer component - Enhanced with MapTiler inspired implementation
function HeatmapLayer({ data }) {
  const map = useMap();
  const heatmapLayerRef = useRef(null);
  
  useEffect(() => {
    // Add known tourist hotspots in India
    const knownTouristHotspots = [
      // Major Metropolitan Cities
      { lat: 28.6139, lng: 77.2090, value: 95, emergency: "Tourist Density" }, // Delhi
      { lat: 19.0760, lng: 72.8777, value: 90, emergency: "Tourist Density" }, // Mumbai
      { lat: 12.9716, lng: 77.5946, value: 85, emergency: "Tourist Density" }, // Bangalore
      { lat: 22.5726, lng: 88.3639, value: 80, emergency: "Tourist Density" }, // Kolkata
      { lat: 13.0827, lng: 80.2707, value: 85, emergency: "Tourist Density" }, // Chennai
      { lat: 17.3850, lng: 78.4867, value: 75, emergency: "Tourist Density" }, // Hyderabad
      
      // Popular Tourist Destinations
      { lat: 27.1751, lng: 78.0421, value: 98, emergency: "Tourist Density" }, // Agra (Taj Mahal)
      { lat: 26.9124, lng: 75.7873, value: 92, emergency: "Tourist Density" }, // Jaipur
      { lat: 15.4989, lng: 73.8278, value: 90, emergency: "Tourist Density" }, // Goa
      { lat: 34.0837, lng: 74.7973, value: 85, emergency: "Tourist Density" }, // Srinagar
      { lat: 32.2396, lng: 77.1887, value: 88, emergency: "Tourist Density" }, // Manali
      { lat: 34.1526, lng: 77.5770, value: 80, emergency: "Tourist Density" }, // Leh
      { lat: 30.7333, lng: 79.0667, value: 82, emergency: "Tourist Density" }, // Kedarnath
      { lat: 16.5062, lng: 80.6480, value: 75, emergency: "Tourist Density" }, // Vijayawada
      
      // Religious Sites
      { lat: 25.3176, lng: 82.9739, value: 95, emergency: "Tourist Density" }, // Varanasi
      { lat: 13.0499, lng: 75.7672, value: 85, emergency: "Tourist Density" }, // Udupi
      { lat: 21.8555, lng: 73.7375, value: 90, emergency: "Tourist Density" }, // Statue of Unity (Kevadia)
      { lat: 20.0269, lng: 75.1786, value: 87, emergency: "Tourist Density" }, // Ajanta Caves
      { lat: 23.2836, lng: 77.3209, value: 75, emergency: "Tourist Density" }, // Sanchi Stupa
      
      // Hill Stations
      { lat: 31.1048, lng: 77.1734, value: 88, emergency: "Tourist Density" }, // Shimla
      { lat: 30.9084, lng: 77.0947, value: 82, emergency: "Tourist Density" }, // Kasauli
      { lat: 27.0380, lng: 88.2627, value: 80, emergency: "Tourist Density" }, // Darjeeling
      { lat: 11.4102, lng: 76.6950, value: 85, emergency: "Tourist Density" }, // Ooty
      { lat: 10.0889, lng: 77.0595, value: 80, emergency: "Tourist Density" }, // Munnar
      { lat: 19.9975, lng: 73.7898, value: 78, emergency: "Tourist Density" }, // Nashik

      // Tamil Nadu Hotspots
      { lat: 11.0168, lng: 76.9558, value: 88, emergency: "Tourist Density" }, // Coimbatore
      { lat: 9.9252, lng: 78.1198, value: 90, emergency: "Tourist Density" }, // Madurai
      { lat: 10.7905, lng: 79.1378, value: 85, emergency: "Tourist Density" }, // Thanjavur
      { lat: 11.6643, lng: 78.1460, value: 75, emergency: "Tourist Density" }, // Salem
      { lat: 10.3624, lng: 77.9695, value: 95, emergency: "Tourist Density" }, // Kodaikanal
      { lat: 10.0756, lng: 76.2711, value: 90, emergency: "Tourist Density" }, // Palakkad
      { lat: 8.7642, lng: 77.6941, value: 85, emergency: "Tourist Density" }, // Kanyakumari
      { lat: 9.9174, lng: 78.1356, value: 90, emergency: "Tourist Density" }, // Meenakshi Temple area
      { lat: 11.4882, lng: 79.7133, value: 87, emergency: "Tourist Density" }, // Pondicherry
      { lat: 12.6195, lng: 79.4192, value: 82, emergency: "Tourist Density" }, // Kanchipuram
      
      // Madhya Pradesh Hotspots
      { lat: 23.1815, lng: 79.9864, value: 85, emergency: "Tourist Density" }, // Jabalpur
      { lat: 22.5726, lng: 75.9174, value: 80, emergency: "Tourist Density" }, // Indore
      { lat: 23.1765, lng: 75.7885, value: 88, emergency: "Tourist Density" }, // Ujjain
      { lat: 26.7605, lng: 77.9926, value: 90, emergency: "Tourist Density" }, // Gwalior Fort
      { lat: 23.2599, lng: 77.4126, value: 85, emergency: "Tourist Density" }, // Bhopal
      { lat: 25.2791, lng: 82.9902, value: 83, emergency: "Tourist Density" }, // Varanasi outskirts
      { lat: 22.9734, lng: 78.6569, value: 75, emergency: "Tourist Density" }, // Pachmarhi
      { lat: 22.5726, lng: 78.2232, value: 85, emergency: "Tourist Density" }, // Kanha National Park
      { lat: 22.0119, lng: 79.0136, value: 78, emergency: "Tourist Density" }, // Pench Tiger Reserve
      { lat: 21.8283, lng: 80.9346, value: 76, emergency: "Tourist Density" }  // Bandhavgarh
    ];

    // Load required scripts
    const loadScript = (url, callback) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        if (callback) callback();
        return;
      }
      
      const script = document.createElement("script");
      script.src = url;
      
      // Set up proper error handling
      script.onload = () => callback && callback();
      script.onerror = (error) => {
        console.error(`Failed to load script: ${url}`, error);
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
      if (!window.HeatmapOverlay) {
        console.error("HeatmapOverlay not available, loading alternative implementation");
        
        try {
          // Remove existing heatmap if it exists
          if (heatmapLayerRef.current) {
            map.removeLayer(heatmapLayerRef.current);
          }
          
          // Combine existing data with known hotspots
          const combinedPoints = [...data, ...knownTouristHotspots];
          const heatPoints = [];
          
          if (combinedPoints && combinedPoints.length > 0) {
            combinedPoints.forEach(point => {
              // Higher weight for popular tourist spots
              const weight = (point.value / 16) + 1; // Scale from 1-7
              heatPoints.push([point.lat, point.lng, weight]);
            });
          }
          
          // Create the heatmap layer with more vibrant colors
          const heatmap = L.heatLayer(heatPoints, {
            radius: 35,          // Larger radius for better visibility of clusters
            blur: 25,            // Increased blur for smoother appearance
            maxZoom: 15,         // Don't cluster points beyond this zoom
            max: 6,              // Adjusted for better contrast
            gradient: {          // More vibrant color scheme
              0.0: 'rgba(0, 0, 255, 0.5)',        // Transparent blue
              0.2: 'rgba(0, 255, 255, 0.5)',      // Cyan
              0.4: 'rgba(0, 255, 0, 0.5)',        // Green
              0.6: 'rgba(255, 255, 0, 0.7)',      // Yellow
              0.8: 'rgba(255, 128, 0, 0.8)',      // Orange
              1.0: 'rgba(255, 0, 0, 0.9)'         // Red
            }
          });
          
          heatmapLayerRef.current = heatmap;
          map.addLayer(heatmap);
          
          console.log("Heatmap created with known tourist hotspots");
        } catch (error) {
          console.error("Failed to create heatmap:", error);
        }
        return;
      }
      
      // Remove existing heatmap if it exists
      if (heatmapLayerRef.current) {
        map.removeLayer(heatmapLayerRef.current);
      }
      
      // Configure heatmap with vibrant colors
      let gradient = {};
      
      // If color-interpolate is loaded, create a more detailed gradient
      if (window.color_interpolate) {
        // Using more vibrant colors in the gradient
        const colorScale = window.color_interpolate([
          'rgba(0, 0, 255, 0.5)',        // Transparent blue
          'rgba(0, 255, 255, 0.5)',      // Cyan
          'rgba(0, 255, 0, 0.5)',        // Green
          'rgba(255, 255, 0, 0.7)',      // Yellow
          'rgba(255, 128, 0, 0.8)',      // Orange
          'rgba(255, 0, 0, 0.9)'         // Red
        ]);
        for (let i = 0; i <= 10; i++) {
          const key = i / 10;
          gradient[key] = colorScale(key);
        }
      } else {
        // Fallback gradient with more vibrant colors
        gradient = {
          0.1: 'rgba(0, 0, 255, 0.5)',     // Transparent blue
          0.3: 'rgba(0, 255, 255, 0.5)',   // Cyan
          0.5: 'rgba(0, 255, 0, 0.5)',     // Green
          0.7: 'rgba(255, 255, 0, 0.7)',   // Yellow
          0.9: 'rgba(255, 128, 0, 0.8)',   // Orange
          1.0: 'rgba(255, 0, 0, 0.9)'      // Red
        };
      }
      
      const heatmapConfig = {
        radius: 0.8,        // Increased radius
        maxOpacity: 0.8,    // Higher opacity
        scaleRadius: true,
        useLocalExtrema: true, // Better for highlighting hotspots
        latField: 'lat',
        lngField: 'lng',
        valueField: 'value',
        gradient: gradient,
        blur: 0.9,
        minOpacity: 0.3
      };
      
      // Create and add heatmap layer
      const heatmapLayer = new window.HeatmapOverlay(heatmapConfig);
      heatmapLayerRef.current = heatmapLayer;
      map.addLayer(heatmapLayer);
      
      // Set heatmap data combining existing data with known hotspots
      const combinedData = [...data, ...knownTouristHotspots];
      
      if (combinedData && combinedData.length > 0) {
        // Process data for better visualization
        const processedData = combinedData.map(point => {
          return {
            lat: point.lat,
            lng: point.lng,
            value: Math.min(100, point.value * 1.1), // Slightly amplify values
            count: Math.ceil(point.value / 16), // Convert to 0-6 scale for count
            radius: Math.max(18, point.value / 3 + 12),
            emergencyType: point.emergency
          };
        });
        
        heatmapLayer.setData({
          max: 100,
          data: processedData
        });
      }
    };
    
    // Load both libraries: Leaflet.heat and HeatmapJS
    loadScript('https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js', () => {
      loadScript('/js/color-interpolate.min.js', () => {
        loadScript('/js/heatmap.min.js', () => {
          loadScript('/js/leaflet-heatmap.js', () => {
            setupHeatmap();
          });
        });
      });
    });
    
    return () => {
      if (heatmapLayerRef.current) {
        map.removeLayer(heatmapLayerRef.current);
      }
    };
  }, [map, data]);

  return null;
}

// Component to add drawing controls to the map
function DrawingTools({ onZoneCreated }) {
  const map = useMap();
  const drawnItemsRef = React.useRef(null);
  const drawControlRef = React.useRef(null);
  
  useEffect(() => {
    console.log("Initializing drawing tools...");
    
    // Make sure Leaflet Draw is loaded
    if (!L.Draw) {
      console.error("Leaflet Draw not loaded yet");
      return;
    }

    // Initialize the draw control
    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    // Configure draw controls
    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: {
          shapeOptions: {
            color: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            dashArray: '5, 5',
            weight: 2
          },
          showArea: true,
          metric: true
        },
        polygon: {
          shapeOptions: {
            color: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 0.3,
            dashArray: '5, 5',
            weight: 2
          },
          allowIntersection: false,
          showArea: true,
          metric: true,
          showLength: true
        }
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      }
    });
    map.addControl(drawControl);

    // Handle created zones
    map.on(L.Draw.Event.CREATED, (event) => {
      try {
        const layer = event.layer;
        drawnItems.addLayer(layer);
      
        // Extract coordinates
        let coordinates = [];
        if (layer instanceof L.Rectangle) {
          // For rectangles, get the bounds
          const bounds = layer.getBounds();
          const northEast = bounds.getNorthEast();
          const southWest = bounds.getSouthWest();
          coordinates = [
            { lat: northEast.lat, lng: northEast.lng },
            { lat: northEast.lat, lng: southWest.lng },
            { lat: southWest.lat, lng: southWest.lng },
            { lat: southWest.lat, lng: northEast.lng }
          ];
        } else if (layer instanceof L.Polygon) {
          // For polygons, get each point
          const latLngs = layer.getLatLngs()[0];
          coordinates = latLngs.map(point => ({ lat: point.lat, lng: point.lng }));
        }
        
        // Generate a unique ID
        const zoneId = Date.now().toString();
        
        // Call the callback with the new zone
        onZoneCreated({
          id: zoneId,
          name: `Custom Zone ${zoneId.slice(-4)}`,
          description: "User-defined restricted zone",
          restrictionLevel: "medium",
          coordinates: coordinates
        });
        
        // Add a popup to the layer
        layer.bindPopup(`
          <strong>Custom Zone ${zoneId.slice(-4)}</strong><br>
          <em>User-defined restricted zone</em><br>
          <button class="edit-zone-btn" data-zone-id="${zoneId}">Edit Details</button>
        `).openPopup();
      } catch (error) {
        console.error("Error creating custom zone:", error);
      }
      
      // Store zoneId in a variable that can be captured by the closure
      const currentZoneId = zoneId;
      
      // Add click handler for the edit button
      setTimeout(() => {
        const editBtn = document.querySelector(`.edit-zone-btn[data-zone-id="${currentZoneId}"]`);
        if (editBtn) {
          editBtn.addEventListener('click', () => {
            // Show a form to edit zone details
            const newName = prompt("Enter zone name:", `Custom Zone ${zoneId.slice(-4)}`);
            const newDesc = prompt("Enter zone description:", "User-defined restricted zone");
            const levelOptions = ["low", "medium", "high"];
            const newLevel = prompt(`Enter restriction level (${levelOptions.join('/')}):`, "medium");
            
            if (newName && newDesc && levelOptions.includes(newLevel)) {
              onZoneCreated({
                id: zoneId,
                name: newName,
                description: newDesc,
                restrictionLevel: newLevel,
                coordinates: coordinates
              });
              
              layer.setPopupContent(`
                <strong>${newName}</strong><br>
                <em>${newDesc}</em><br>
                <strong>Level:</strong> ${newLevel}<br>
                <button class="edit-zone-btn" data-zone-id="${zoneId}">Edit Details</button>
              `);
            }
          });
        }
      }, 100);
    });

    // Handle edited zones
    map.on(L.Draw.Event.EDITED, (event) => {
      const layers = event.layers;
      layers.eachLayer((layer) => {
        // Get the zone ID from the popup content
        const popupContent = layer.getPopup().getContent();
        const match = popupContent.match(/data-zone-id="([^"]+)"/);
        if (match && match[1]) {
          const zoneId = match[1];
          
          // Get updated coordinates
          let coordinates = [];
          if (layer instanceof L.Rectangle) {
            const bounds = layer.getBounds();
            const northEast = bounds.getNorthEast();
            const southWest = bounds.getSouthWest();
            coordinates = [
              { lat: northEast.lat, lng: northEast.lng },
              { lat: northEast.lat, lng: southWest.lng },
              { lat: southWest.lat, lng: southWest.lng },
              { lat: southWest.lat, lng: northEast.lng }
            ];
          } else if (layer instanceof L.Polygon) {
            const latLngs = layer.getLatLngs()[0];
            coordinates = latLngs.map(point => ({ lat: point.lat, lng: point.lng }));
          }
          
          // Extract current zone name and description from popup
          const name = popupContent.match(/<strong>(.*?)<\/strong>/)[1];
          const description = popupContent.match(/<em>(.*?)<\/em>/)[1];
          const levelMatch = popupContent.match(/<strong>Level:<\/strong> (.*?)<br>/);
          const restrictionLevel = levelMatch ? levelMatch[1] : "medium";
          
          // Update the zone
          onZoneCreated({
            id: zoneId,
            name,
            description,
            restrictionLevel,
            coordinates
          });
        }
      });
    });

    // Handle deleted zones
    map.on(L.Draw.Event.DELETED, (event) => {
      const layers = event.layers;
      layers.eachLayer((layer) => {
        // Get the zone ID from the popup content
        const popupContent = layer.getPopup().getContent();
        const match = popupContent.match(/data-zone-id="([^"]+)"/);
        if (match && match[1]) {
          const zoneId = match[1];
          // Call the callback with the deleted zone ID
          onZoneCreated({
            id: zoneId,
            deleted: true
          });
        }
      });
    });

    // Store references for cleanup
    drawControlRef.current = drawControl;

    return () => {
      // Clean up
      console.log("Cleaning up drawing tools...");
      try {
        map.off(L.Draw.Event.CREATED);
        map.off(L.Draw.Event.EDITED);
        map.off(L.Draw.Event.DELETED);
        
        if (drawControlRef.current) {
          map.removeControl(drawControlRef.current);
        }
        
        if (drawnItemsRef.current) {
          map.removeLayer(drawnItemsRef.current);
        }
      } catch (error) {
        console.error("Error cleaning up drawing tools:", error);
      }
    };
  }, [map, onZoneCreated]);

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
  const [leafletDrawLoaded, setLeafletDrawLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // Layer toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRestrictedForests, setShowRestrictedForests] = useState(true);
  const [showDrawingTools, setShowDrawingTools] = useState(false);
  
  // Force controls visibility when component mounts
  useEffect(() => {
    setShowControls(true);
    
    // Add a class to the body to ensure visibility
    document.body.classList.add('controls-enabled');
    
    return () => {
      document.body.classList.remove('controls-enabled');
    };
  }, []);

  // Load Leaflet Draw scripts dynamically
  useEffect(() => {
    // Check if Leaflet Draw is already available
    if (L.Draw && L.drawVersion) {
      console.log("Leaflet Draw already loaded:", L.drawVersion);
      setLeafletDrawLoaded(true);
      return;
    }
    
    console.log("Loading Leaflet Draw from CDN...");
    
    // Add Leaflet Draw CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css';
    document.head.appendChild(linkElement);

    // Add Leaflet Draw JS
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js';
    scriptElement.onload = () => {
      console.log("Leaflet Draw loaded successfully");
      setLeafletDrawLoaded(true);
    };
    scriptElement.onerror = (err) => {
      console.error("Failed to load Leaflet Draw from CDN:", err);
      // Try to use fallback implementation
      if (initLeafletDraw()) {
        console.log("Using fallback Leaflet Draw implementation");
        setLeafletDrawLoaded(true);
      } else {
        console.error("Failed to initialize fallback Leaflet Draw");
      }
    };
    document.head.appendChild(scriptElement);

    return () => {
      // Clean up on unmount
      try {
        if (linkElement.parentNode) {
          linkElement.parentNode.removeChild(linkElement);
        }
        if (scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }
      } catch (err) {
        console.warn("Error during cleanup of Leaflet Draw resources:", err);
      }
    };
  }, []);

  useEffect(() => {
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
            value: 60 + Math.floor(Math.random() * 40), // Random intensity between 60-100 for tourists
            emergency: "Tourist Density"
          }));
          
          setTouristDensityData(densityPoints);
        }
      })
      .catch((err) => console.error("Failed to load initial locations:", err));

    // Load emergency data for heatmap
    axios
      .get('/emergency-data.json')
      .then((res) => {
        if (Array.isArray(res.data)) {
          // Add emergency data to heatmap
          setEmergencyData(res.data);
        }
      })
      .catch((err) => console.error("Failed to load emergency data:", err));
      
    // Load custom restricted zones from localStorage
    try {
      const savedZones = localStorage.getItem('customRestrictedZones');
      if (savedZones) {
        setCustomRestrictedZones(JSON.parse(savedZones));
      }
    } catch (err) {
      console.error("Failed to load custom zones from localStorage:", err);
    }

    // Connect to WebSocket for live updates
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket.id);
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

    return () => socket.disconnect();
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
      
      {showInfoTooltip && (
        <div className="info-tooltip">
          <div className="info-tooltip-content">
            <h4>Tourist Dashboard Visualization Tools</h4>
            <p>This dashboard provides multiple visualization methods:</p>
            <ul>
              <li><strong>Tourist Density Heatmap:</strong> Shows areas with high concentration of tourists.</li>
              <li><strong>Restricted Forest Zones:</strong> Displays protected forest areas as red zones where tourist access is limited or prohibited.</li>
              <li><strong>Draw Custom Zones:</strong> Enable this option to create your own restricted zones by drawing on the map.</li>
            </ul>
            <p>Toggle between these visualizations using the controls in the top-right corner.</p>
            <button 
              className="btn btn-sm btn-primary" 
              onClick={() => setShowInfoTooltip(false)}
            >
              Got it!
            </button>
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
            <strong>Tourist Density Heatmap</strong>
          </label>
          <div className="form-text small-text">
            Shows areas with high concentration of tourists
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
        
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="drawingToolsToggle" 
            checked={showDrawingTools}
            onChange={(e) => setShowDrawingTools(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="drawingToolsToggle">
            <strong>Draw Custom Zones</strong>
            {showDrawingTools && !leafletDrawLoaded && (
              <span className="ms-2 text-muted small">(Loading tools...)</span>
            )}
          </label>
          <div className="form-text small-text">
            Enable to create your own restricted zones on the map
          </div>
        </div>
        
        <div className="intensity-scale-container">
          <h3>Tourist Activity Visualization</h3>
          <div className="intensity-scale-with-ticks"></div>
        </div>
        
        <div className="emergency-legend">
          <h3>Emergency Calls</h3>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'blue' }}></div>
            <span>Medical Assistance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'green' }}></div>
            <span>Police Assistance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'red' }}></div>
            <span>Fire Emergency</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'purple' }}></div>
            <span>Natural Disaster</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'orange' }}></div>
            <span>Tourist Density</span>
          </div>
          
          {showRestrictedForests && (
            <div className="legend-item">
              <div className="legend-color restricted-legend-zone"></div>
              <span>Restricted Forest Zone</span>
            </div>
          )}
        </div>
      </div>
      
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        {/* Heatmap Layer */}
        {showHeatmap && <HeatmapLayer data={combinedHeatmapData} />}
        
        {/* Restricted Forest Zones layer */}
        {showRestrictedForests && (
          <RestrictedForestLayer 
            key={`forest-layer-${customRestrictedZones.length}`}
            customZones={customRestrictedZones} 
          />
        )}
        
        {/* Drawing tools */}
        {showDrawingTools && leafletDrawLoaded && <DrawingTools onZoneCreated={handleZoneCreated} />}
        
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
      </MapContainer>
    </div>
  );
}
