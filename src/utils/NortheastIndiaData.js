/**
 * Northeast India Tourist Safety Data
 * Data processed from northeast_india_tourist_safety_heatmap.csv
 */

export const northeastIndiaRiskData = [
  { name: "Shi Yomi District China Border", state: "Arunachal Pradesh", lat: 28.1333, lng: 94.7333, risk_level: 9, type: "border_area", reason: "Chinese village construction in disputed area", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Upper Subansiri China Border", state: "Arunachal Pradesh", lat: 27.8833, lng: 94.0, risk_level: 9, type: "border_area", reason: "Chinese occupation since 1959, new settlements", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Moreh Border Town", state: "Manipur", lat: 24.4844, lng: 94.0108, risk_level: 9, type: "border_crossing", reason: "Myanmar conflict spillover, ethnic tensions, arms trafficking", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Tengnoupal District Border", state: "Manipur", lat: 24.6167, lng: 94.2833, risk_level: 9, type: "border_area", reason: "Porous Myanmar border, insurgent activities", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Kamjong District Myanmar Border", state: "Manipur", lat: 24.8833, lng: 94.3333, risk_level: 9, type: "border_area", reason: "Cross-border gunfights, insurgent bases", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Tawang China Border", state: "Arunachal Pradesh", lat: 27.5864, lng: 91.8569, risk_level: 8, type: "border_area", reason: "Disputed LAC area, military tensions", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Anjaw District China Border", state: "Arunachal Pradesh", lat: 28.0833, lng: 96.75, risk_level: 8, type: "border_area", reason: "Remote LAC disputes", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Kokrajhar District Night Areas", state: "Assam", lat: 26.4019, lng: 90.2719, risk_level: 8, type: "ethnic_tension", reason: "Bodo-Muslim communal tensions, night travel unsafe", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Chirang District Remote Areas", state: "Assam", lat: 26.4333, lng: 90.6833, risk_level: 8, type: "ethnic_tension", reason: "BTAD ethnic conflicts, isolated areas", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Assam-Mizoram Border Lailapur", state: "Assam", lat: 24.7167, lng: 92.9333, risk_level: 8, type: "interstate_conflict", reason: "Violent border clashes, deaths reported", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Assam-Meghalaya Border West Karbi Anglong", state: "Assam", lat: 25.7333, lng: 92.1833, risk_level: 8, type: "interstate_conflict", reason: "Land disputes, violent confrontations", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Churachandpur Hills", state: "Manipur", lat: 24.3333, lng: 93.6833, risk_level: 8, type: "hill_area", reason: "Kuki-Meitei ethnic conflict zone", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Mon District Myanmar Border", state: "Nagaland", lat: 26.7167, lng: 95.2333, risk_level: 8, type: "border_area", reason: "NSCN factions, cross-border activities", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Longleng Myanmar Border", state: "Nagaland", lat: 26.6167, lng: 94.8667, risk_level: 8, type: "border_area", reason: "Remote border, limited security presence", color_code: "#FF0000", risk_category: "High Risk" },
  { name: "Baksa District Forest Areas", state: "Assam", lat: 26.7167, lng: 91.1167, risk_level: 7, type: "forest_area", reason: "Insurgent hideouts, wildlife conflicts", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "Jiribam", state: "Manipur", lat: 24.8167, lng: 93.1333, risk_level: 7, type: "conflict_zone", reason: "Recent ethnic violence, displacement camps", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "Silchar Bangladesh Border", state: "Assam", lat: 24.8333, lng: 92.7789, risk_level: 6, type: "border_area", reason: "Infiltration concerns, smuggling", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "Imphal Valley Central", state: "Manipur", lat: 24.817, lng: 93.9368, risk_level: 6, type: "urban_tension", reason: "Curfews, ethnic tensions, but relatively safer in daylight", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "North Sikkim Restricted Areas", state: "Sikkim", lat: 27.7333, lng: 88.6167, risk_level: 6, type: "restricted_zone", reason: "Permit required areas, China border sensitivity", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "Agartala Border Areas", state: "Tripura", lat: 23.8315, lng: 91.2868, risk_level: 6, type: "border_area", reason: "Bangladesh border tensions, smuggling", color_code: "#FF6600", risk_category: "Medium-High Risk" },
  { name: "Guwahati Night Areas", state: "Assam", lat: 26.1445, lng: 91.7362, risk_level: 5, type: "urban_crime", reason: "Petty crime after dark, traffic issues", color_code: "#FFFF00", risk_category: "Medium Risk" },
  { name: "Tura Hills Meghalaya", state: "Meghalaya", lat: 25.5198, lng: 90.2201, risk_level: 5, type: "remote_area", reason: "Limited connectivity, occasional tribal issues", color_code: "#FFFF00", risk_category: "Medium Risk" },
  { name: "Aizawl Hill Roads", state: "Mizoram", lat: 23.7367, lng: 92.7173, risk_level: 5, type: "infrastructure", reason: "Landslides, narrow roads, weather issues", color_code: "#FFFF00", risk_category: "Medium Risk" },
  { name: "Dimapur Commercial Areas", state: "Nagaland", lat: 25.9044, lng: 93.7267, risk_level: 5, type: "urban_issues", reason: "Petty crime, occasional protests", color_code: "#FFFF00", risk_category: "Medium Risk" },
  { name: "Kohima City Outskirts", state: "Nagaland", lat: 25.6751, lng: 94.1086, risk_level: 5, type: "urban_issues", reason: "Tribal politics, bandh calls", color_code: "#FFFF00", risk_category: "Medium Risk" },
  { name: "Loktak Lake Main Areas", state: "Manipur", lat: 24.55, lng: 93.7833, risk_level: 3, type: "lake_tourism", reason: "Floating islands, supervised tourism, daylight safe", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Champhai Mizoram Hills", state: "Mizoram", lat: 23.45, lng: 93.3333, risk_level: 3, type: "hill_station", reason: "Myanmar border views, peaceful Christian state", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Ziro Valley Main Town", state: "Arunachal Pradesh", lat: 27.55, lng: 93.8333, risk_level: 2, type: "valley_tourism", reason: "Apatani culture, music festival venue, peaceful", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Bomdila Monastery Town", state: "Arunachal Pradesh", lat: 27.2667, lng: 92.4167, risk_level: 2, type: "monastery", reason: "Buddhist circuit, scenic location, tourist-friendly", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Kaziranga National Park", state: "Assam", lat: 26.5775, lng: 93.1712, risk_level: 2, type: "national_park", reason: "Well-protected UNESCO site, good security", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Majuli River Island", state: "Assam", lat: 26.951, lng: 94.2037, risk_level: 2, type: "cultural_site", reason: "World's largest river island, cultural tourism, safe", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Tezpur Historical Sites", state: "Assam", lat: 26.6333, lng: 92.8, risk_level: 2, type: "historical", reason: "Ancient sites, good connectivity, peaceful", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Jorhat Tea Gardens", state: "Assam", lat: 26.7509, lng: 94.2037, risk_level: 2, type: "tea_tourism", reason: "Tea estate tourism, safe environment, guided tours", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Sivasagar Historical Town", state: "Assam", lat: 26.9833, lng: 94.6333, risk_level: 2, type: "historical", reason: "Ahom monuments, peaceful town, good for tourists", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Shillong City Center", state: "Meghalaya", lat: 25.5788, lng: 91.8933, risk_level: 2, type: "hill_station", reason: "Tourist-friendly, good infrastructure, safe for all", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Cherrapunji Tourist Areas", state: "Meghalaya", lat: 25.3, lng: 91.7, risk_level: 2, type: "tourist_spot", reason: "Popular destination, well-managed tourism", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Dawki Indo-Bangladesh Border", state: "Meghalaya", lat: 25.1333, lng: 91.9833, risk_level: 2, type: "border_tourism", reason: "Crystal clear river, regulated tourism, safe border", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Aizawl City Main Areas", state: "Mizoram", lat: 23.7367, lng: 92.7173, risk_level: 2, type: "state_capital", reason: "Safest northeastern state, very peaceful, Christian majority", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Hornbill Festival Ground Kisama", state: "Nagaland", lat: 25.6, lng: 94.0667, risk_level: 2, type: "festival_ground", reason: "International festival venue, well-secured during events", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Tsomgo Lake", state: "Sikkim", lat: 27.3833, lng: 88.7833, risk_level: 2, type: "high_altitude_lake", reason: "Popular tourist spot, army protection, well-managed", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Udaipur Tripura Palace", state: "Tripura", lat: 23.5333, lng: 91.4833, risk_level: 2, type: "heritage", reason: "Royal heritage site, well-maintained, safe for visitors", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Unakoti Archaeological Site", state: "Tripura", lat: 24.3167, lng: 92.0167, risk_level: 2, type: "archaeological", reason: "Ancient rock carvings, guided tourism, peaceful area", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Mawlynnong Clean Village", state: "Meghalaya", lat: 25.2167, lng: 91.8833, risk_level: 1, type: "eco_tourism", reason: "Asia's cleanest village, very safe, community tourism", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Gangtok Main City", state: "Sikkim", lat: 27.3389, lng: 88.6065, risk_level: 1, type: "hill_station", reason: "Extremely safe, organic state, tourist-friendly", color_code: "#00FF00", risk_category: "Low Risk" },
  { name: "Pelling Tourist Circuit", state: "Sikkim", lat: 27.2167, lng: 88.2167, risk_level: 1, type: "hill_station", reason: "Monastery circuit, very peaceful, safe for families", color_code: "#00FF00", risk_category: "Low Risk" }
];

// Add tourist cluster data for Northeast India
export const northeastIndiaTouristClusters = [
  // High Density Tourist Clusters
  { name: "Kaziranga National Park", state: "Assam", lat: 26.5775, lng: 93.1712, count: 420, category: "High Density", type: "national_park", details: "UNESCO site with high international visitor count, especially during safari season" },
  { name: "Shillong City Center", state: "Meghalaya", lat: 25.5788, lng: 91.8933, count: 380, category: "High Density", type: "hill_station", details: "Major northeastern tourism hub with high domestic and international visitors" },
  { name: "Gangtok Main City", state: "Sikkim", lat: 27.3389, lng: 88.6065, count: 410, category: "High Density", type: "hill_station", details: "Popular capital city with high concentration of tourists year-round" },
  { name: "Tsomgo Lake", state: "Sikkim", lat: 27.3833, lng: 88.7833, count: 350, category: "High Density", type: "high_altitude_lake", details: "Day-trip destination for most tourists visiting Gangtok" },
  { name: "Tawang Monastery", state: "Arunachal Pradesh", lat: 27.5864, lng: 91.8569, count: 310, category: "High Density", type: "monastery", details: "Major Buddhist pilgrimage site with concentrated tourism" },
  { name: "Cherrapunji Tourist Areas", state: "Meghalaya", lat: 25.3, lng: 91.7, count: 360, category: "High Density", type: "tourist_spot", details: "Famous for being one of the wettest places on earth, popular for waterfalls" },
  { name: "Hornbill Festival Ground", state: "Nagaland", lat: 25.6, lng: 94.0667, count: 480, category: "High Density", type: "festival_ground", details: "Extremely high density during December festival, 60,000+ visitors" },
  
  // Medium Density Tourist Clusters
  { name: "Majuli River Island", state: "Assam", lat: 26.951, lng: 94.2037, count: 240, category: "Medium Density", type: "cultural_site", details: "Cultural tourism destination with moderate visitor flow" },
  { name: "Pelling", state: "Sikkim", lat: 27.2167, lng: 88.2167, count: 220, category: "Medium Density", type: "hill_station", details: "Scenic viewpoint for Kanchenjunga, popular secondary destination" },
  { name: "Mawlynnong Village", state: "Meghalaya", lat: 25.2167, lng: 91.8833, count: 190, category: "Medium Density", type: "eco_tourism", details: "Asia's cleanest village, growing as a tourist attraction" },
  { name: "Dawki", state: "Meghalaya", lat: 25.1833, lng: 92.0167, count: 210, category: "Medium Density", type: "border_tourism", details: "Famous for crystal clear river water and boating activities" },
  { name: "Jorhat Tea Gardens", state: "Assam", lat: 26.7509, lng: 94.2037, count: 180, category: "Medium Density", type: "tea_tourism", details: "Tea tourism destination with spread-out visitor pattern" },
  { name: "Loktak Lake", state: "Manipur", lat: 24.55, lng: 93.7833, count: 160, category: "Medium Density", type: "lake_tourism", details: "Floating islands attract moderate tourism despite regional tensions" },
  { name: "Ziro Valley Festival Site", state: "Arunachal Pradesh", lat: 27.55, lng: 93.8333, count: 280, category: "Medium Density", type: "festival_site", details: "High concentration during annual music festival, otherwise moderate" },
  { name: "Dimapur City Center", state: "Nagaland", lat: 25.9044, lng: 93.7267, count: 170, category: "Medium Density", type: "urban_center", details: "Main commercial hub and gateway to Nagaland" },
  
  // Low Density Tourist Clusters
  { name: "Bomdila", state: "Arunachal Pradesh", lat: 27.2667, lng: 92.4167, count: 110, category: "Low Density", type: "monastery", details: "Buddhist circuit transit point with lower stay duration" },
  { name: "Sivasagar", state: "Assam", lat: 26.9833, lng: 94.6333, count: 90, category: "Low Density", type: "historical", details: "Historical sites with niche tourism interest" },
  { name: "Tezpur", state: "Assam", lat: 26.6333, lng: 92.8, count: 120, category: "Low Density", type: "historical", details: "Transit town with some historical attractions" },
  { name: "Champhai", state: "Mizoram", lat: 23.45, lng: 93.3333, count: 70, category: "Low Density", type: "hill_station", details: "Remote location with limited but growing tourism" },
  { name: "Aizawl City", state: "Mizoram", lat: 23.7367, lng: 92.7173, count: 130, category: "Low Density", type: "state_capital", details: "Capital city with moderate visitor numbers" },
  { name: "Kohima War Cemetery", state: "Nagaland", lat: 25.6751, lng: 94.1086, count: 100, category: "Low Density", type: "historical", details: "WWII historical site with niche tourism interest" },
  { name: "Tura", state: "Meghalaya", lat: 25.5198, lng: 90.2201, count: 80, category: "Low Density", type: "remote_area", details: "Gateway to western Meghalaya, fewer visitors than eastern parts" },
  { name: "Unakoti", state: "Tripura", lat: 24.3167, lng: 92.0167, count: 70, category: "Low Density", type: "archaeological", details: "Archaeological site with limited visitor infrastructure" },
  { name: "Udaipur", state: "Tripura", lat: 23.5333, lng: 91.4833, count: 85, category: "Low Density", type: "heritage", details: "Secondary destination in Tripura with royal heritage" },
  { name: "Imphal City Center", state: "Manipur", lat: 24.817, lng: 93.9368, count: 120, category: "Low Density", type: "urban_center", details: "Capital with visitors despite security concerns" },
  { name: "Yumthang Valley", state: "Sikkim", lat: 27.7231, lng: 88.6991, count: 140, category: "Low Density", type: "valley", details: "Seasonal tourism with permit restrictions" }
];

// Convert risk level to appropriate data format for visualization
export const getNortheastIndiaRiskDataForHeatmap = () => {
  return northeastIndiaRiskData.map(location => ({
    lat: location.lat,
    lng: location.lng,
    value: location.risk_level * 10, // Scale to 0-100
    type: location.risk_level >= 7 ? "High Risk" : 
          location.risk_level >= 4 ? "Medium Risk" : "Low Risk",
    category: location.type,
    note: location.name,
    details: location.reason
  }));
};

// Get risk markers with more detail for popup display
export const getNortheastIndiaRiskMarkers = () => {
  return northeastIndiaRiskData.map(location => ({
    lat: location.lat,
    lng: location.lng,
    risk: location.risk_level >= 7 ? "high" : 
          location.risk_level >= 4 ? "medium" : "low",
    type: location.type.replace('_', ' '),
    description: location.name,
    reason: location.reason,
    state: location.state
  }));
};

// Get tourist cluster data for heatmap visualization
export const getNortheastIndiaTouristClustersForHeatmap = () => {
  return northeastIndiaTouristClusters.map(location => ({
    lat: location.lat,
    lng: location.lng,
    count: location.count,
    type: "Tourist Cluster",
    category: location.category,
    note: location.name,
    details: location.details,
    state: location.state
  }));
};

// Get tourist cluster markers with more detail for popup display
export const getNortheastIndiaTouristClusterMarkers = () => {
  return northeastIndiaTouristClusters.map(location => ({
    lat: location.lat,
    lng: location.lng,
    density: location.count >= 300 ? "high" : 
             location.count >= 150 ? "medium" : "low",
    type: location.type.replace('_', ' '),
    description: location.name,
    details: location.details,
    state: location.state,
    count: location.count
  }));
};

// Get seasonal tourist pattern data
export const getSeasonalTouristPatterns = () => {
  return {
    winter: ['Hornbill Festival Ground', 'Gangtok Main City', 'Kaziranga National Park'],
    summer: ['Shillong City Center', 'Cherrapunji Tourist Areas', 'Tawang Monastery'],
    monsoon: ['Cherrapunji Tourist Areas', 'Mawlynnong Village', 'Dawki'],
    autumn: ['Kaziranga National Park', 'Ziro Valley Festival Site', 'Majuli River Island']
  };
};

// Group locations by state for filtering
export const getStatesList = () => {
  const states = [...new Set(northeastIndiaRiskData.map(item => item.state))];
  return states.sort();
};

// Group locations by risk type for filtering
export const getRiskTypesList = () => {
  const types = [...new Set(northeastIndiaRiskData.map(item => item.type))];
  return types.map(type => ({
    value: type,
    label: type.replace('_', ' ').split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }));
};

// Group tourist clusters by type for filtering
export const getTouristClusterTypesList = () => {
  const types = [...new Set(northeastIndiaTouristClusters.map(item => item.type))];
  return types.map(type => ({
    value: type,
    label: type.replace('_', ' ').split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }));
};

// Quick function to focus map on Northeast India
export const getNortheastIndiaBounds = () => {
  return [
    [22.5, 88.0], // Southwest corner
    [29.5, 97.5]  // Northeast corner
  ];
};
