import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

export default function RestrictedForestLayer({ customZones = [] }) {
  const map = useMap();
  const [forests, setForests] = useState([]);
  const forestLayerRef = React.useRef(null);

  // Helper to normalize coordinates format
  const normalizeCoordinates = (forest) => {
    try {
      return (forest.coordinates || forest.boundaries || []).map(coord => ({
        lat: Number(coord.lat),
        lng: Number(coord.lng)
      }));
    } catch (err) {
      console.error("Error normalizing coordinates for forest:", forest, err);
      return [];
    }
  };

  useEffect(() => {
    // Fetch the restricted forest data from the static file
    axios.get("/restricted-forests.json")
      .then(res => {
        if (Array.isArray(res.data)) {
          setForests(res.data);
        }
      })
      .catch(err => {
        console.error("Failed to load restricted forests data:", err);
      });

    return () => {
      // Clean up the layer on unmount
      if (forestLayerRef.current) {
        map.removeLayer(forestLayerRef.current);
        forestLayerRef.current = null;
      }
    };
  }, [map]);

  useEffect(() => {
    console.log("Rendering RestrictedForestLayer with:", { 
      predefinedZones: forests.length,
      customZones: customZones.length
    });
    
    // Remove existing forest layer if it exists
    if (forestLayerRef.current) {
      map.removeLayer(forestLayerRef.current);
      forestLayerRef.current = null;
    }

    // Create a new feature group for all restricted zones
    const forestFeatureGroup = new L.FeatureGroup();
    forestLayerRef.current = forestFeatureGroup;
    map.addLayer(forestFeatureGroup);

    // Combine predefined forests with custom zones
    const allZones = [...forests, ...customZones];
    
    // Add all restricted zones to the map
    allZones.forEach(forest => {
      try {
        // Skip invalid zones
        if (!forest || (!forest.coordinates && !forest.boundaries)) {
          return;
        }
        
        // Get normalized coordinates
        const normalizedCoords = normalizeCoordinates(forest);
        if (normalizedCoords.length === 0) return;
        
        // Determine if this zone should be visible
        const isVisible = true; // We can add visibility filters here later if needed
        
        if (isVisible) {
          try {
            // Create polygon for the restricted zone
            const coordinates = normalizedCoords.map(coord => [coord.lat, coord.lng]);
            const polygonOptions = {
              color: '#ff0000',
              fillColor: 'rgba(255, 0, 0, 0.25)',
              fillOpacity: 0.25,
              weight: 2,
              dashArray: '5, 5',
              className: 'restricted-forest-zone'
            };
            
            const polygon = L.polygon(coordinates, polygonOptions);
            
            // Add popup with information
            const restrictionLevelText = forest.restrictionLevel ? 
              forest.restrictionLevel.charAt(0).toUpperCase() + forest.restrictionLevel.slice(1) : 
              'Unknown';
              
            const popupContent = `
              <div>
                <h4 style="margin:0 0 5px;color:#ff0000;font-size:16px;">${forest.name || 'Unnamed Zone'}</h4>
                <p style="margin:0 0 8px;font-style:italic;">${forest.description || 'No description available'}</p>
                <div style="display:flex;align-items:center;margin-top:5px;">
                  <strong>Restriction Level:</strong>
                  <span style="margin-left:5px;padding:2px 6px;background:${
                    forest.restrictionLevel === 'high' ? '#ff0000' : 
                    forest.restrictionLevel === 'medium' ? '#ff9900' : '#ffcc00'
                  };color:white;border-radius:3px;font-size:12px;">
                    ${restrictionLevelText}
                  </span>
                </div>
                ${forest.notes ? `<p style="margin:5px 0 0;font-size:12px;color:#555;">${forest.notes}</p>` : ''}
              </div>
            `;
            
            polygon.bindPopup(popupContent);
            forestFeatureGroup.addLayer(polygon);
            
            // Create warning markers at the vertices for high-restriction areas
            if (forest.restrictionLevel === "high") {
              // For high restriction areas, add warning dots at each vertex
              coordinates.forEach(point => {
                if (isVisible) {
                  try {
                    const warningIcon = L.divIcon({
                      html: `<div class="pulsating-dot"></div>`,
                      className: "warning-icon static-warning-icon",
                      iconSize: [10, 10],
                      iconAnchor: [5, 5]
                    });
                    const warningMarker = L.marker(point, {
                      icon: warningIcon,
                      interactive: false // Don't allow clicks on these markers
                    });
                    forestFeatureGroup.addLayer(warningMarker);
                  } catch (err) {
                    console.error("Error creating warning marker:", err);
                  }
                }
              });
            }
          } catch (err) {
            console.error("Error creating restricted forest zone:", forest, err);
          }
        }
      } catch (error) {
        console.error("Error processing zone:", forest, error);
      }
    });

  }, [map, forests, customZones]); // Re-run when forests or customZones change

  return null;
}
