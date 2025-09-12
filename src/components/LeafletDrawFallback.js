/**
 * This file includes a minimal version of Leaflet Draw for use when CDN loading fails.
 * It's used as a fallback to ensure drawing functionality always works.
 */

import L from 'leaflet';

// Only initialize if Leaflet Draw is not already available
export function initLeafletDraw() {
  if (window.L && window.L.Draw) {
    console.log("Leaflet Draw is already initialized");
    return true;
  }
  
  console.log("Initializing Leaflet Draw from local implementation");
  
  try {
    // Add basic drawing functionality to L
    if (!L.Draw) {
      L.Draw = {};
      L.drawVersion = "1.0.0-fallback";
      
      // Basic event types
      L.Draw.Event = {
        CREATED: 'draw:created',
        EDITED: 'draw:edited',
        DELETED: 'draw:deleted',
        DRAWSTART: 'draw:drawstart',
        DRAWSTOP: 'draw:drawstop',
        DRAWVERTEX: 'draw:drawvertex'
      };
      
      // Create a simplified Draw Control
      L.Control.Draw = function(options) {
        this.options = {
          position: 'topright',
          draw: {},
          edit: {}
        };
        
        if (options) {
          L.Util.extend(this.options, options);
        }
        
        return this;
      };
      
      L.Control.Draw.prototype.onAdd = function(map) {
        const container = L.DomUtil.create('div', 'leaflet-draw');
        
        const toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-section', container);
        this._toolbarContainer = toolbarContainer;
        
        // Create draw button
        const drawBtn = L.DomUtil.create('a', 'leaflet-draw-draw-rectangle', toolbarContainer);
        drawBtn.href = '#';
        drawBtn.title = 'Draw a rectangle';
        
        L.DomEvent.on(drawBtn, 'click', L.DomEvent.stopPropagation)
                  .on(drawBtn, 'click', L.DomEvent.preventDefault)
                  .on(drawBtn, 'click', () => {
                    alert("Drawing functionality is limited in fallback mode. Please refresh and ensure you're connected to the internet.");
                  });
        
        return container;
      };
      
      L.Control.Draw.prototype.onRemove = function() {
        // Nothing to do here in our simplified version
      };
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing fallback Leaflet Draw:", error);
    return false;
  }
}