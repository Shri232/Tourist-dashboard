import React from "react";
import KPICards from "./KPICards";
import AlertStatusWidget from "./AlertStatusWidget";
import QuickStatisticsPanel from "./QuickStatisticsPanel";

export default function DashboardOverview() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard Overview</h1>
        <div style={styles.headerActions}>
          <button style={styles.exportBtn}>📊 Export Report</button>
          <button style={styles.settingsBtn}>⚙️ Settings</button>
        </div>
      </div>
      
      {/* KPI Status Cards */}
      <KPICards />
      
      {/* Two Column Layout for Alert and Statistics */}
      <div style={styles.twoColumnLayout}>
        <div style={styles.leftColumn}>
          <AlertStatusWidget />
        </div>
        <div style={styles.rightColumn}>
          <QuickStatisticsPanel />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e5e7eb"
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1f2937",
    margin: 0
  },
  headerActions: {
    display: "flex",
    gap: "12px"
  },
  exportBtn: {
    padding: "10px 20px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  settingsBtn: {
    padding: "10px 20px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  twoColumnLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    marginTop: "32px"
  },
  leftColumn: {
    // Alert Widget will take left column
  },
  rightColumn: {
    // Statistics Panel will take right column
  },
  
  // Responsive design
  "@media (max-width: 1200px)": {
    twoColumnLayout: {
      gridTemplateColumns: "1fr",
      gap: "24px"
    }
  }
};
