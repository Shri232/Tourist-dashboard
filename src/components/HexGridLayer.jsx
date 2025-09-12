import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function HexGridLayer({ data, resolution = 50 }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    // Skip if no data or turf is not loaded
    if (!data || data.length === 0 || !window.turf) return;
    
    // Clean up previous layer
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    const createHexGrid = () => {
      // Get current map bounds
      const bounds = map.getBounds();
      
      // Format bounds for Turf.js
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ];
      
      try {
        // Create hex grid using Turf.js
        const hexGrid = window.turf.hexGrid(bbox, resolution, { units: 'kilometers' });
        
        // Convert data points to GeoJSON format
        const points = {
          type: 'FeatureCollection',
          features: data.map(point => ({
            type: 'Feature',
            properties: { 
              value: point.value,
              emergency: point.emergency
            },
            geometry: {
              type: 'Point',
              coordinates: [point.lng, point.lat]
            }
          }))
        };
        
        let maxCount = 0;
        let maxIntensity = 0;
        
        // Calculate statistics for each hexagon
        hexGrid.features.forEach(feature => {
          const pointsInCell = window.turf.pointsWithinPolygon(points, feature);
          const count = pointsInCell.features.length;
          
          // Sum up emergency intensity values
          const intensity = pointsInCell.features.reduce((sum, point) => {
            return sum + (point.properties.value || 0);
          }, 0);
          
          feature.properties.count = count;
          feature.properties.intensity = intensity;
          
          if (count > maxCount) maxCount = count;
          if (intensity > maxIntensity) maxIntensity = intensity;
        });
        
        // Only show cells with data
        const filteredGrid = {
          ...hexGrid,
          features: hexGrid.features.filter(feature => feature.properties.count > 0)
        };
        
        // Create colormap function if available
        const colormap = window.color_interpolate 
          ? window.color_interpolate(['rgba(0,0,255,0.1)', 'rgba(0,255,255,0.5)', 'rgba(0,255,0,0.6)', 'rgba(255,255,0,0.7)', 'rgba(255,165,0,0.8)', 'rgba(255,0,0,0.9)'])
          : null;
          
        // Add GeoJSON layer to map
        const layer = L.geoJSON(filteredGrid, {
          style: (feature) => {
            const intensity = feature.properties.intensity;
            const normalizedIntensity = maxIntensity > 0 ? intensity / maxIntensity : 0;
            
            let color = 'red';
            let opacity = 0.2 + (normalizedIntensity * 0.6); // Vary opacity by intensity
            
            if (colormap) {
              color = colormap(normalizedIntensity);
            }
            
            return {
              fillColor: color,
              weight: 1,
              opacity: 0.5,
              color: 'white',
              fillOpacity: opacity
            };
          },
          onEachFeature: (feature, layer) => {
            const count = feature.properties.count;
            const intensity = Math.round(feature.properties.intensity);
            
            layer.bindTooltip(
              `<strong>Emergency count:</strong> ${count}<br>` +
              `<strong>Total intensity:</strong> ${intensity}`,
              { sticky: true }
            );
          }
        }).addTo(map);
        
        layerRef.current = layer;
      } catch (error) {
        console.error("Error creating hex grid:", error);
      }
    };

    // Load Turf.js if it's not already loaded
    if (!window.turf) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@turf/turf@6/turf.min.js';
      script.onload = createHexGrid;
      document.head.appendChild(script);
    } else {
      createHexGrid();
    }

    // Recreate grid when map is moved
    map.on('moveend', createHexGrid);

    return () => {
      map.off('moveend', createHexGrid);
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, data, resolution]);

  return null;
}

export default HexGridLayer;
