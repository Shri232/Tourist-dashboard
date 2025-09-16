/**
 * Tourist Cluster Management Utility
 * Manages real-time tourist cluster data and provides helper functions
 */

// Base tourist cluster data
export const touristClusterData = [
  // Major Tourist Hotspots (high density)
  { lat: 13.0827, lng: 80.2707, count: 450, type: "Tourist Cluster", category: "High Density", note: "Chennai Central Area", details: "Major transport hub with continuous tourist flow", crowdStrength: "Very High" },
  { lat: 9.9252, lng: 78.1198, count: 380, type: "Tourist Cluster", category: "High Density", note: "Meenakshi Amman Temple", details: "Major religious site attracting 15,000+ visitors daily", crowdStrength: "High" },
  { lat: 12.9249, lng: 80.1000, count: 320, type: "Tourist Cluster", category: "High Density", note: "Mahabalipuram Shore Temple", details: "UNESCO site with high international visitor count", crowdStrength: "High" },
  { lat: 11.4144, lng: 76.7067, count: 400, type: "Tourist Cluster", category: "High Density", note: "Ooty Central", details: "Hill station with heavy seasonal tourism", crowdStrength: "High" },
  { lat: 8.7642, lng: 77.6941, count: 350, type: "Tourist Cluster", category: "High Density", note: "Kanyakumari Viewpoint", details: "Popular sunset viewing area with concentrated crowds", crowdStrength: "High" },
  
  // Medium density clusters
  { lat: 10.3623, lng: 77.9695, count: 280, type: "Tourist Cluster", category: "Medium Density", note: "Kodaikanal Lake", details: "Popular recreational area with boat rides", crowdStrength: "Medium" },
  { lat: 11.4882, lng: 79.7133, count: 260, type: "Tourist Cluster", category: "Medium Density", note: "Pondicherry Beach Road", details: "Colonial architecture attracting moderate crowds", crowdStrength: "Medium" },
  { lat: 10.0839, lng: 77.0595, count: 250, type: "Tourist Cluster", category: "Medium Density", note: "Munnar Tea Gardens", details: "Popular photography spots spread over larger area", crowdStrength: "Medium" },
  { lat: 10.0764, lng: 79.2173, count: 180, type: "Tourist Cluster", category: "Medium Density", note: "Dhanushkodi Ghost Town", details: "Abandoned town with steady visitor flow", crowdStrength: "Medium" },
  
  // Lower density areas
  { lat: 12.2253, lng: 79.0747, count: 120, type: "Tourist Cluster", category: "Low Density", note: "Tiruvannamalai Temple", details: "Spiritual site with distributed visitor patterns", crowdStrength: "Low" },
  { lat: 10.7905, lng: 79.1378, count: 100, type: "Tourist Cluster", category: "Low Density", note: "Thanjavur Palace", details: "Historical site with manageable visitor numbers", crowdStrength: "Low" },
  { lat: 11.2342, lng: 78.1694, count: 90, type: "Tourist Cluster", category: "Low Density", note: "Namakkal Fort", details: "Off-beat destination with lower footfall", crowdStrength: "Low" },
  
  // Additional high-density tourist clusters
  { lat: 12.8057, lng: 80.2181, count: 510, type: "Tourist Cluster", category: "High Density", note: "Chennai Airport Area", details: "Major international entry point with constant flow", crowdStrength: "Very High" },
  { lat: 10.7870, lng: 79.1378, count: 360, type: "Tourist Cluster", category: "High Density", note: "Thanjavur Big Temple", details: "UNESCO World Heritage site with heavy visitation", crowdStrength: "High" },
  { lat: 13.0587, lng: 80.2650, count: 420, type: "Tourist Cluster", category: "High Density", note: "Chennai Marina Beach", details: "One of world's longest beaches, extremely crowded", crowdStrength: "Very High" },
  { lat: 10.2176, lng: 77.4895, count: 290, type: "Tourist Cluster", category: "Medium Density", note: "Top Station Viewpoint", details: "Famous mountain viewpoint with seasonal crowds", crowdStrength: "Medium" },
  
  // Weekend getaway clusters
  { lat: 12.4214, lng: 75.7389, count: 340, type: "Tourist Cluster", category: "High Density", note: "Coorg Valley", details: "Popular weekend destination for nature lovers", crowdStrength: "High" },
  { lat: 10.8004, lng: 77.0508, count: 270, type: "Tourist Cluster", category: "Medium Density", note: "Palani Temple", details: "Important pilgrimage center with moderate crowds", crowdStrength: "Medium" },
  { lat: 9.7487, lng: 77.3888, count: 320, type: "Tourist Cluster", category: "High Density", note: "Thekkady Wildlife Area", details: "Periyar wildlife sanctuary, very popular", crowdStrength: "High" },
  { lat: 10.0889, lng: 77.0595, count: 480, type: "Tourist Cluster", category: "High Density", note: "Munnar Town Center", details: "Hill station main bazaar area, very crowded", crowdStrength: "Very High" }
];

/**
 * Get tourist clusters with formatted data for map visualization
 */
export const getFormattedTouristClusters = () => {
  return touristClusterData;
};

/**
 * Get only clusters above a certain threshold
 * @param {number} threshold - Minimum tourist count to include
 */
export const getClustersByThreshold = (threshold = 100) => {
  return touristClusterData.filter(cluster => cluster.count >= threshold);
};

/**
 * Get clusters by category
 * @param {string} category - Category to filter by (High Density, Medium Density, Low Density)
 */
export const getClustersByCategory = (category) => {
  return touristClusterData.filter(cluster => 
    cluster.category.toLowerCase() === category.toLowerCase());
};

/**
 * Get crowd density classification from raw count
 * @param {number} count - Visitor count
 * @returns {string} Density classification
 */
export const getClusterDensity = (count) => {
  if (count >= 400) return "very-high";
  if (count >= 300) return "high";
  if (count >= 180) return "medium";
  return "low";
};

/**
 * Format visitor count for display
 * For larger numbers, it adds a "k" suffix and rounds
 */
export const formatVisitorCount = (count) => {
  if (count >= 1000) {
    return `${(count/1000).toFixed(1)}k`;
  }
  return count.toString();
};

/**
 * Simulate real-time fluctuation in visitor counts
 * Used for dynamic updates to tourist clusters
 */
export const getUpdatedClusters = () => {
  // Create a copy to avoid mutating original
  const updatedClusters = [...touristClusterData];
  
  // Apply random fluctuations (±15% maximum)
  return updatedClusters.map(cluster => {
    const fluctuation = Math.floor(cluster.count * (Math.random() * 0.3 - 0.15));
    return {
      ...cluster,
      count: Math.max(0, cluster.count + fluctuation),
      crowdStrength: getClusterDensity(cluster.count + fluctuation)
    };
  });
};
