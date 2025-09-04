import React, { useState } from "react";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  HeatMap, 
  GaugeChart, 
  AreaChart 
} from "./ChartComponents";
import DataTable from "./DataTable";

export default function AnalyticsReportingDashboard() {
  // Mock data for charts
  const touristTrafficData = [
    { label: "Mon", value: 145 },
    { label: "Tue", value: 178 },
    { label: "Wed", value: 162 },
    { label: "Thu", value: 195 },
    { label: "Fri", value: 234 },
    { label: "Sat", value: 287 },
    { label: "Sun", value: 298 }
  ];

  const incidentsByLocationData = [
    { label: "Zone A", value: 12 },
    { label: "Zone B", value: 8 },
    { label: "Zone C", value: 15 },
    { label: "Zone D", value: 6 },
    { label: "Zone E", value: 9 }
  ];

  const alertTypesData = [
    { label: "Medical Emergency", value: 25 },
    { label: "Safety Alert", value: 18 },
    { label: "Weather Warning", value: 12 },
    { label: "Equipment Failure", value: 8 },
    { label: "Security Breach", value: 5 }
  ];

  const riskZoneHeatMapData = [
    [1, 3, 5, 2, 4],
    [2, 8, 9, 6, 3],
    [4, 6, 7, 8, 5],
    [3, 2, 4, 9, 7],
    [1, 4, 6, 3, 2]
  ];

  const resourceUtilizationData = [
    { label: "Week 1", value: 65 },
    { label: "Week 2", value: 78 },
    { label: "Week 3", value: 85 },
    { label: "Week 4", value: 92 },
    { label: "Week 5", value: 88 },
    { label: "Week 6", value: 95 }
  ];

  // Mock data for tables
  const incidentReportsData = [
    {
      id: "INC-001",
      date: "2025-09-04",
      time: "14:30",
      location: "Zone A-7",
      type: "Medical Emergency",
      severity: "High",
      status: "Resolved",
      responseTime: "3.2 min",
      reportedBy: "Tourist TR-2024-0891"
    },
    {
      id: "INC-002",
      date: "2025-09-04",
      time: "12:15",
      location: "Zone B-3",
      type: "Safety Alert",
      severity: "Medium",
      status: "Investigating",
      responseTime: "5.1 min",
      reportedBy: "Security Cam #12"
    },
    {
      id: "INC-003",
      date: "2025-09-03",
      time: "16:45",
      location: "Zone C-1",
      type: "Equipment Failure",
      severity: "Low",
      status: "Resolved",
      responseTime: "8.3 min",
      reportedBy: "Maintenance Team"
    },
    {
      id: "INC-004",
      date: "2025-09-03",
      time: "10:20",
      location: "Zone A-2",
      type: "Weather Warning",
      severity: "Medium",
      status: "Monitoring",
      responseTime: "2.1 min",
      reportedBy: "Weather Station"
    },
    {
      id: "INC-005",
      date: "2025-09-02",
      time: "18:30",
      location: "Zone D-5",
      type: "Security Breach",
      severity: "High",
      status: "Resolved",
      responseTime: "4.7 min",
      reportedBy: "Security Guard"
    }
  ];

  const touristRegistryData = [
    {
      id: "TR-2024-0891",
      name: "John Smith",
      nationality: "USA",
      checkIn: "2025-09-01",
      location: "Zone A-7",
      safetyScore: 85,
      contact: "+1-555-0123",
      status: "Active"
    },
    {
      id: "TR-2024-0892",
      name: "Emma Johnson",
      nationality: "UK",
      checkIn: "2025-09-02",
      location: "Zone B-3",
      safetyScore: 92,
      contact: "+44-20-7946-0958",
      status: "Active"
    },
    {
      id: "TR-2024-0893",
      name: "Pierre Dubois",
      nationality: "France",
      checkIn: "2025-09-02",
      location: "Zone C-1",
      safetyScore: 78,
      contact: "+33-1-42-86-83-26",
      status: "Alert"
    },
    {
      id: "TR-2024-0894",
      name: "Anna Mueller",
      nationality: "Germany",
      checkIn: "2025-09-03",
      location: "Zone A-2",
      safetyScore: 95,
      contact: "+49-30-12345678",
      status: "Active"
    },
    {
      id: "TR-2024-0895",
      name: "Yuki Tanaka",
      nationality: "Japan",
      checkIn: "2025-09-04",
      location: "Zone D-5",
      safetyScore: 88,
      contact: "+81-3-1234-5678",
      status: "Active"
    }
  ];

  // Table column configurations
  const incidentColumns = [
    { key: "id", label: "Incident ID", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "time", label: "Time", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { 
      key: "severity", 
      label: "Severity", 
      sortable: true,
      render: (value) => (
        <span style={{
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: value === "High" ? "#fef2f2" : value === "Medium" ? "#fef3c7" : "#f0fdf4",
          color: value === "High" ? "#dc2626" : value === "Medium" ? "#d97706" : "#16a34a"
        }}>
          {value}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value) => (
        <span style={{
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: value === "Resolved" ? "#f0fdf4" : value === "Investigating" ? "#fef3c7" : "#e0f2fe",
          color: value === "Resolved" ? "#16a34a" : value === "Investigating" ? "#d97706" : "#0284c7"
        }}>
          {value}
        </span>
      )
    },
    { key: "responseTime", label: "Response Time", sortable: true },
    { key: "reportedBy", label: "Reported By", sortable: true }
  ];

  const touristColumns = [
    { key: "id", label: "Tourist ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "nationality", label: "Nationality", sortable: true },
    { key: "checkIn", label: "Check-in Date", sortable: true },
    { key: "location", label: "Current Location", sortable: true },
    { 
      key: "safetyScore", 
      label: "Safety Score", 
      sortable: true,
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "40px",
            height: "8px",
            backgroundColor: "#e5e7eb",
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${value}%`,
              height: "100%",
              backgroundColor: value >= 90 ? "#10b981" : value >= 70 ? "#f59e0b" : "#ef4444",
              borderRadius: "4px"
            }}></div>
          </div>
          <span style={{
            fontWeight: "600",
            color: value >= 90 ? "#10b981" : value >= 70 ? "#f59e0b" : "#ef4444"
          }}>
            {value}%
          </span>
        </div>
      )
    },
    { key: "contact", label: "Contact", sortable: false },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value) => (
        <span style={{
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: value === "Active" ? "#f0fdf4" : "#fef2f2",
          color: value === "Active" ? "#16a34a" : "#dc2626"
        }}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Analytics & Reporting Dashboard</h1>
        <div style={styles.headerActions}>
          <button style={styles.dashboardBtn}>📊 Dashboard View</button>
          <button style={styles.reportBtn}>📋 Generate Report</button>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsSection}>
        <h2 style={styles.sectionTitle}>📈 Data Visualization</h2>
        
        {/* First Row - KPI Charts */}
        <div style={styles.chartRow}>
          <div style={styles.chartColumn}>
            <LineChart 
              data={touristTrafficData} 
              title="Tourist Traffic Over Time"
              color="#3b82f6"
            />
          </div>
          <div style={styles.chartColumn}>
            <BarChart 
              data={incidentsByLocationData} 
              title="Incidents by Location"
              color="#ef4444"
            />
          </div>
        </div>

        {/* Second Row - Analysis Charts */}
        <div style={styles.chartRow}>
          <div style={styles.chartColumn}>
            <PieChart 
              data={alertTypesData} 
              title="Alert Types Distribution"
            />
          </div>
          <div style={styles.chartColumn}>
            <HeatMap 
              data={riskZoneHeatMapData} 
              title="Risk Zone Analysis"
            />
          </div>
        </div>

        {/* Third Row - Performance Charts */}
        <div style={styles.chartRow}>
          <div style={styles.chartColumn}>
            <GaugeChart 
              value={94} 
              max={100} 
              title="System Performance"
              color="#10b981"
            />
          </div>
          <div style={styles.chartColumn}>
            <AreaChart 
              data={resourceUtilizationData} 
              title="Resource Utilization"
              color="#8b5cf6"
            />
          </div>
        </div>
      </div>

      {/* Data Tables Section */}
      <div style={styles.tablesSection}>
        <h2 style={styles.sectionTitle}>📋 Reporting Tables</h2>
        
        {/* Incident Reports Table */}
        <div style={styles.tableContainer}>
          <DataTable
            data={incidentReportsData}
            columns={incidentColumns}
            title="🚨 Incident Reports"
            showSearch={true}
            showExport={true}
            showDateRange={true}
            itemsPerPage={10}
          />
        </div>

        {/* Tourist Registry Table */}
        <div style={styles.tableContainer}>
          <DataTable
            data={touristRegistryData}
            columns={touristColumns}
            title="👥 Tourist Registry"
            showSearch={true}
            showExport={true}
            showDateRange={true}
            itemsPerPage={10}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div style={styles.summarySection}>
        <h2 style={styles.sectionTitle}>📊 Summary Statistics</h2>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>📈</div>
            <div style={styles.summaryContent}>
              <div style={styles.summaryValue}>1,247</div>
              <div style={styles.summaryLabel}>Total Tourists</div>
              <div style={styles.summaryTrend}>+12% this week</div>
            </div>
          </div>
          
          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>🚨</div>
            <div style={styles.summaryContent}>
              <div style={styles.summaryValue}>3</div>
              <div style={styles.summaryLabel}>Active Incidents</div>
              <div style={styles.summaryTrend}>-2 from yesterday</div>
            </div>
          </div>
          
          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>⏱️</div>
            <div style={styles.summaryContent}>
              <div style={styles.summaryValue}>3.2 min</div>
              <div style={styles.summaryLabel}>Avg Response Time</div>
              <div style={styles.summaryTrend}>Target: 5 min</div>
            </div>
          </div>
          
          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>⭐</div>
            <div style={styles.summaryContent}>
              <div style={styles.summaryValue}>94%</div>
              <div style={styles.summaryLabel}>System Performance</div>
              <div style={styles.summaryTrend}>+2% improvement</div>
            </div>
          </div>
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
  dashboardBtn: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  },
  reportBtn: {
    padding: "10px 20px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  },
  chartsSection: {
    marginBottom: "48px"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "24px"
  },
  chartRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "24px"
  },
  chartColumn: {
    // Individual chart container
  },
  tablesSection: {
    marginBottom: "48px"
  },
  tableContainer: {
    marginBottom: "32px"
  },
  summarySection: {
    marginBottom: "24px"
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  summaryIcon: {
    fontSize: "32px",
    backgroundColor: "#f3f4f6",
    padding: "12px",
    borderRadius: "12px"
  },
  summaryContent: {
    flex: 1
  },
  summaryValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1f2937",
    lineHeight: "1"
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "4px 0"
  },
  summaryTrend: {
    fontSize: "12px",
    color: "#10b981",
    fontWeight: "600"
  }
};
