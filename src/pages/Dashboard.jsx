import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import DashboardOverview from "../components/DashboardOverview";
import AnalyticsReportingDashboard from "../components/AnalyticsReportingDashboard";
import TouristRegistryManagement from "../components/TouristRegistryManagement";
import AlertsNotificationCenter from "../components/AlertsNotificationCenter";
import ActiveIncidentsEmergency from "../components/ActiveIncidentsEmergency";
import ResourceManagement from "../components/ResourceManagement";
import RestrictedZones from "../components/RestrictedZones";
import Settings from "../components/Settings";
import HelpSupport from "../components/HelpSupport";

export default function Dashboard({ onLogout }) {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  // tourists state (so we can update dynamically)
  const [tourists, setTourists] = useState([
    { id: 1, name: "Tourist 1", latitude: 28.6139, longitude: 77.209, safetyScore: 85 },
    { id: 2, name: "Tourist 2", latitude: 19.076, longitude: 72.8777, safetyScore: 70 },
  ]);

  // simulate movement every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTourists((prevTourists) =>
        prevTourists.map((t) => ({
          ...t,
          latitude: t.latitude + (Math.random() - 0.5) * 0.01, // small random shift
          longitude: t.longitude + (Math.random() - 0.5) * 0.01,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <Navbar onLogout={onLogout} />
      <div style={styles.mainWrapper}>
        <Sidebar selected={selectedMenu} setSelected={setSelectedMenu} />
        <main style={styles.main}>
          {selectedMenu === "Dashboard" && <DashboardOverview />}
          {selectedMenu === "Live Map" && <MapView tourists={tourists} />}
          {selectedMenu === "Tourist Registry" && <TouristRegistryManagement />}
          {selectedMenu === "Active Incidents" && <ActiveIncidentsEmergency />}
          {selectedMenu === "Alerts" && <AlertsNotificationCenter />}
          {selectedMenu === "Resource Management" && <ResourceManagement />}
          {selectedMenu === "Restricted Zones" && <RestrictedZones />}
          {selectedMenu === "Reports & Analytics" && <AnalyticsReportingDashboard />}
          {selectedMenu === "Settings" && <Settings />}
          {selectedMenu === "Help & Support" && <HelpSupport />}
          {!["Dashboard", "Live Map", "Tourist Registry", "Active Incidents", "Alerts", "Resource Management", "Restricted Zones", "Reports & Analytics", "Settings", "Help & Support"].includes(selectedMenu) && <h2>{selectedMenu} Page</h2>}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  mainWrapper: { display: "flex", flex: 1 },
  main: { 
    flex: 1, 
    padding: "0", 
    backgroundColor: "#f9fafb",
    overflowY: "auto",
    maxHeight: "calc(100vh - 64px)" // Assuming navbar is ~64px
  },
};
