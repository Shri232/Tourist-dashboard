/**
 * Data management for map visualizations
 * Contains risk zones and tourist cluster data
 */

// Risk zones data with detailed categorization
export const riskZonesData = [
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

// Tourist clusters data
export const touristClusterData = [
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

// Function to get gradient colors based on visualization type
export const getGradientForMode = (mode) => {
  if (mode === 'risk') {
    return {
      0.1: 'rgba(255, 255, 0, 0.5)',     // Yellow for low risk
      0.3: 'rgba(255, 200, 0, 0.6)',     // Yellow-Orange
      0.5: 'rgba(255, 150, 0, 0.7)',     // Orange for medium risk
      0.7: 'rgba(255, 100, 0, 0.8)',     // Dark Orange 
      0.9: 'rgba(255, 0, 0, 0.85)',      // Red for high risk
      1.0: 'rgba(180, 0, 0, 0.9)'        // Dark Red for extreme risk
    };
  } else {
    return {
      0.1: 'rgba(0, 200, 255, 0.5)',    // Light blue for low density
      0.3: 'rgba(30, 144, 255, 0.6)',   // Dodger blue
      0.5: 'rgba(0, 0, 255, 0.7)',      // Blue for medium density
      0.7: 'rgba(138, 43, 226, 0.8)',   // Purple
      0.9: 'rgba(75, 0, 130, 0.85)',    // Indigo for high density
      1.0: 'rgba(60, 0, 110, 0.9)'      // Dark purple for extreme density
    };
  }
};

// Function to get marker style based on data point type and value
export const getMarkerStyle = (point, mode) => {
  if (mode === 'risk') {
    // Risk markers styling
    if (point.value >= 90) {
      return {
        color: '#ff0000',
        radius: 12,
        weight: 2
      };
    } else if (point.value >= 75) {
      return {
        color: '#ff7700',
        radius: 10,
        weight: 1.5
      };
    } else {
      return {
        color: '#ffcc00',
        radius: 8,
        weight: 1
      };
    }
  } else {
    // Tourist cluster styling
    if (point.count >= 300) {
      return {
        color: '#4B0082',
        radius: 14,
        weight: 2
      };
    } else if (point.count >= 180) {
      return {
        color: '#0000FF',
        radius: 12,
        weight: 1.5
      };
    } else {
      return {
        color: '#00BFFF',
        radius: 10,
        weight: 1
      };
    }
  }
};

// Function to determine if a point is in Tamil Nadu
export const isInTamilNadu = (lat, lng) => {
  return (lat >= 8.0 && lat <= 13.5) && (lng >= 76.0 && lng <= 80.5);
};
