import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

export default function AlertsNotificationCenter() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    severity: "all",
    type: "all",
    status: "all",
    zone: "all"
  });

  // Extended mock data for alerts and notifications
  const [alertsData, setAlertsData] = useState([
    {
      id: "ALT-2025-0891",
      title: "Tourist Missing in Zone A-7",
      type: "Emergency",
      severity: "Critical",
      status: "Active",
      priority: "High",
      createdAt: "2025-09-04 14:30:00",
      updatedAt: "2025-09-04 15:45:00",
      zone: "Zone A-7",
      affectedTourists: ["TR-2024-0891", "TR-2024-0892"],
      description: "Tourist John Smith has not been seen for over 2 hours. Last known location: Zone A-7 near the hiking trail.",
      assignedTo: "Emergency Response Team Alpha",
      estimatedResolution: "2025-09-04 17:00:00",
      escalationLevel: 2,
      notificationsSent: 15,
      responseTime: "00:05:30",
      category: "Missing Person",
      coordinates: { lat: 28.6139, lng: 77.209 },
      attachments: ["photo1.jpg", "map_location.png"],
      relatedIncidents: ["INC-2025-0234"],
      communicationLog: [
        { time: "14:35", user: "Operator 1", message: "Alert created and sent to emergency team" },
        { time: "14:40", user: "Team Alpha", message: "Team dispatched to last known location" },
        { time: "15:45", user: "Team Alpha", message: "Search area expanded, requesting backup" }
      ]
    },
    {
      id: "ALT-2025-0892",
      title: "Weather Warning - Storm Approaching",
      type: "Weather",
      severity: "High",
      status: "Active",
      priority: "High",
      createdAt: "2025-09-04 13:15:00",
      updatedAt: "2025-09-04 15:30:00",
      zone: "All Zones",
      affectedTourists: ["TR-2024-0891", "TR-2024-0892", "TR-2024-0893", "TR-2024-0894"],
      description: "Severe thunderstorm warning issued. All tourists advised to seek immediate shelter.",
      assignedTo: "Weather Monitoring Team",
      estimatedResolution: "2025-09-04 18:00:00",
      escalationLevel: 1,
      notificationsSent: 247,
      responseTime: "00:02:15",
      category: "Weather Alert",
      coordinates: null,
      attachments: ["weather_radar.png", "forecast_data.pdf"],
      relatedIncidents: [],
      communicationLog: [
        { time: "13:15", user: "Weather System", message: "Automated weather alert triggered" },
        { time: "13:20", user: "Operator 2", message: "Mass notification sent to all tourists" },
        { time: "15:30", user: "Weather Team", message: "Storm intensity updated - remains severe" }
      ]
    },
    {
      id: "ALT-2025-0893",
      title: "Medical Emergency - Zone B-3",
      type: "Medical",
      severity: "Critical",
      status: "Resolved",
      priority: "Critical",
      createdAt: "2025-09-04 11:20:00",
      updatedAt: "2025-09-04 12:45:00",
      zone: "Zone B-3",
      affectedTourists: ["TR-2024-0892"],
      description: "Tourist Emma Johnson reported chest pain and difficulty breathing. Immediate medical attention required.",
      assignedTo: "Medical Response Team Beta",
      estimatedResolution: "2025-09-04 12:00:00",
      escalationLevel: 3,
      notificationsSent: 8,
      responseTime: "00:03:45",
      category: "Medical Emergency",
      coordinates: { lat: 19.076, lng: 72.8777 },
      attachments: ["medical_report.pdf"],
      relatedIncidents: ["INC-2025-0235"],
      communicationLog: [
        { time: "11:20", user: "Tourist", message: "Emergency button pressed" },
        { time: "11:23", user: "Operator 3", message: "Medical team dispatched" },
        { time: "11:35", user: "Medical Team", message: "Patient stabilized, transporting to hospital" },
        { time: "12:45", user: "Medical Team", message: "Patient stable, incident resolved" }
      ]
    },
    {
      id: "ALT-2025-0894",
      title: "Security Breach - Restricted Zone",
      type: "Security",
      severity: "Medium",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2025-09-04 10:45:00",
      updatedAt: "2025-09-04 15:20:00",
      zone: "Zone C-1",
      affectedTourists: ["TR-2024-0893"],
      description: "Tourist detected in restricted area. Security personnel notified for immediate response.",
      assignedTo: "Security Team Gamma",
      estimatedResolution: "2025-09-04 16:30:00",
      escalationLevel: 1,
      notificationsSent: 5,
      responseTime: "00:01:30",
      category: "Security Violation",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      attachments: ["cctv_footage.mp4", "violation_report.pdf"],
      relatedIncidents: [],
      communicationLog: [
        { time: "10:45", user: "Security System", message: "Unauthorized access detected" },
        { time: "10:47", user: "Security Team", message: "Team en route to location" },
        { time: "15:20", user: "Security Team", message: "Tourist contacted, explaining restrictions" }
      ]
    },
    {
      id: "ALT-2025-0895",
      title: "Equipment Malfunction - GPS Tracker",
      type: "Technical",
      severity: "Low",
      status: "Pending",
      priority: "Low",
      createdAt: "2025-09-04 09:30:00",
      updatedAt: "2025-09-04 14:15:00",
      zone: "Zone D-5",
      affectedTourists: ["TR-2024-0895"],
      description: "GPS tracker device showing intermittent signal. Tourist Yuki Tanaka may need device replacement.",
      assignedTo: "Technical Support Team",
      estimatedResolution: "2025-09-04 17:30:00",
      escalationLevel: 0,
      notificationsSent: 3,
      responseTime: "00:15:00",
      category: "Equipment Issue",
      coordinates: { lat: 28.5355, lng: 77.3910 },
      attachments: ["diagnostic_report.pdf"],
      relatedIncidents: [],
      communicationLog: [
        { time: "09:30", user: "Monitoring System", message: "GPS signal quality degraded" },
        { time: "09:45", user: "Tech Support", message: "Diagnostic initiated" },
        { time: "14:15", user: "Tech Support", message: "Replacement device prepared" }
      ]
    }
  ]);

  // Filter data based on selected tab and filters
  const filteredData = alertsData.filter(alert => {
    // Tab filtering
    if (selectedTab === "active" && alert.status !== "Active") return false;
    if (selectedTab === "critical" && alert.severity !== "Critical") return false;
    if (selectedTab === "resolved" && alert.status !== "Resolved") return false;
    if (selectedTab === "pending" && alert.status !== "Pending") return false;
    
    // Additional filters
    if (filterOptions.severity !== "all" && alert.severity !== filterOptions.severity) return false;
    if (filterOptions.type !== "all" && alert.type !== filterOptions.type) return false;
    if (filterOptions.status !== "all" && alert.status !== filterOptions.status) return false;
    if (filterOptions.zone !== "all" && alert.zone !== filterOptions.zone) return false;
    
    return true;
  });

  // Statistics
  const stats = {
    total: alertsData.length,
    active: alertsData.filter(a => a.status === "Active").length,
    critical: alertsData.filter(a => a.severity === "Critical").length,
    resolved: alertsData.filter(a => a.status === "Resolved").length,
    pending: alertsData.filter(a => a.status === "Pending").length,
    avgResponseTime: "00:05:32",
    totalNotificationsSent: alertsData.reduce((sum, a) => sum + a.notificationsSent, 0)
  };

  // Table columns configuration
  const columns = [
    {
      key: "select",
      label: "Select",
      sortable: false,
      render: (value, row) => (
        <input
          type="checkbox"
          checked={selectedAlerts.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedAlerts([...selectedAlerts, row.id]);
            } else {
              setSelectedAlerts(selectedAlerts.filter(id => id !== row.id));
            }
          }}
        />
      )
    },
    { key: "id", label: "Alert ID", sortable: true },
    { 
      key: "title", 
      label: "Alert Title", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.titleCell}>
          <div style={styles.alertIcon}>
            {row.type === "Emergency" ? "🚨" : 
             row.type === "Weather" ? "🌩️" :
             row.type === "Medical" ? "🏥" :
             row.type === "Security" ? "🔒" : "⚙️"}
          </div>
          <div>
            <div style={styles.alertTitle}>{value}</div>
            <div style={styles.alertInfo}>{row.type} • {row.zone}</div>
          </div>
        </div>
      )
    },
    { 
      key: "severity", 
      label: "Severity", 
      sortable: true,
      render: (value) => (
        <span style={{
          ...styles.severityBadge,
          backgroundColor: 
            value === "Critical" ? "#fef2f2" :
            value === "High" ? "#fef3c7" :
            value === "Medium" ? "#f0f9ff" : "#f3f4f6",
          color:
            value === "Critical" ? "#dc2626" :
            value === "High" ? "#d97706" :
            value === "Medium" ? "#2563eb" : "#6b7280"
        }}>
          {value === "Critical" ? "🔴" : 
           value === "High" ? "🟠" :
           value === "Medium" ? "🟡" : "🟢"} {value}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value) => (
        <span style={{
          ...styles.statusBadge,
          backgroundColor: 
            value === "Active" ? "#dcfce7" :
            value === "Resolved" ? "#f3f4f6" :
            value === "In Progress" ? "#dbeafe" : "#fef3c7",
          color:
            value === "Active" ? "#166534" :
            value === "Resolved" ? "#6b7280" :
            value === "In Progress" ? "#1e40af" : "#d97706"
        }}>
          {value}
        </span>
      )
    },
    { 
      key: "createdAt", 
      label: "Created", 
      sortable: true,
      sortFunction: (a, b) => {
        // Accepts both string or row object
        const dateA = new Date(typeof a === "object" ? a.createdAt : a);
        const dateB = new Date(typeof b === "object" ? b.createdAt : b);
        return dateB - dateA; // Descending: latest first
      }
    },
    { key: "assignedTo", label: "Assigned To", sortable: true },
    { 
      key: "affectedTourists", 
      label: "Affected", 
      sortable: true,
      render: (value) => (
        <span style={styles.affectedCount}>
          👥 {value.length} tourists
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (value, row) => (
        <div style={styles.actionButtons}>
          <button
            style={styles.viewButton}
            onClick={() => {
              setSelectedAlert(row);
              setShowDetailsModal(true);
            }}
          >
            👁️ View
          </button>
          <button style={styles.editButton}>✏️ Edit</button>
          <button style={styles.resolveButton}>✅ Resolve</button>
        </div>
      )
    }
  ];

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on selected alerts:`, selectedAlerts);
    setSelectedAlerts([]);
  };

  const handleCreateAlert = () => {
    setShowCreateModal(true);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>🚨 Alerts & Notification Center</h1>
          <p style={styles.subtitle}>Emergency response and communication management system</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.createButton}
            onClick={handleCreateAlert}
          >
            ➕ Create Alert
          </button>
          <button style={styles.broadcastButton}>📢 Mass Broadcast</button>
          <button style={styles.settingsButton}>⚙️ Settings</button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🚨</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Alerts</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚡</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.active}</div>
            <div style={styles.statLabel}>Active Alerts</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🔴</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.critical}</div>
            <div style={styles.statLabel}>Critical</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.resolved}</div>
            <div style={styles.statLabel}>Resolved</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏱️</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.avgResponseTime}</div>
            <div style={styles.statLabel}>Avg Response Time</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📱</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalNotificationsSent}</div>
            <div style={styles.statLabel}>Notifications Sent</div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div style={styles.controlsSection}>
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { key: "active", label: "Active Alerts", count: stats.active, color: "#ef4444" },
            { key: "critical", label: "Critical", count: stats.critical, color: "#dc2626" },
            { key: "resolved", label: "Resolved", count: stats.resolved, color: "#10b981" },
            { key: "pending", label: "Pending", count: stats.pending, color: "#f59e0b" },
            { key: "all", label: "All Alerts", count: stats.total, color: "#6b7280" }
          ].map(tab => (
            <button
              key={tab.key}
              style={{
                ...styles.tab,
                ...(selectedTab === tab.key ? { ...styles.activeTab, borderColor: tab.color } : {})
              }}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
              <span style={{...styles.tabCount, backgroundColor: tab.color}}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div style={styles.filtersContainer}>
          <select
            value={filterOptions.severity}
            onChange={(e) => setFilterOptions({...filterOptions, severity: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={filterOptions.type}
            onChange={(e) => setFilterOptions({...filterOptions, type: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="Emergency">Emergency</option>
            <option value="Weather">Weather</option>
            <option value="Medical">Medical</option>
            <option value="Security">Security</option>
            <option value="Technical">Technical</option>
          </select>

          <select
            value={filterOptions.status}
            onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={filterOptions.zone}
            onChange={(e) => setFilterOptions({...filterOptions, zone: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Zones</option>
            <option value="Zone A-7">Zone A-7</option>
            <option value="Zone B-3">Zone B-3</option>
            <option value="Zone C-1">Zone C-1</option>
            <option value="Zone D-5">Zone D-5</option>
            <option value="All Zones">All Zones</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedAlerts.length > 0 && (
          <div style={styles.bulkActions}>
            <button 
              style={styles.bulkActionButtonPrimary} 
              onClick={handleResolveSelected}
            >
              Resolve Selected ({selectedAlerts.length})
            </button>
            <button 
              style={{...styles.bulkActionButtonPrimary, backgroundColor: "#dc2626", marginLeft: "8px"}} 
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div style={styles.tableSection}>
        <DataTable
          data={filteredData}
          columns={columns}
          title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Alerts & Notifications`}
          showSearch={true}
          showExport={true}
          showDateRange={true}
          itemsPerPage={10}
        />
      </div>

      {/* Alert Details Modal */}
      {showDetailsModal && selectedAlert && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Alert Details</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.alertDetailsGrid}>
                {/* Alert Information */}
                <div style={styles.detailsSection}>
                  <h3>Alert Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Alert ID:</span>
                    <span style={styles.detailValue}>{selectedAlert.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Title:</span>
                    <span style={styles.detailValue}>{selectedAlert.title}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{selectedAlert.type}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Severity:</span>
                    <span style={{
                      ...styles.detailValue,
                      color: selectedAlert.severity === "Critical" ? "#dc2626" : 
                             selectedAlert.severity === "High" ? "#d97706" : 
                             selectedAlert.severity === "Medium" ? "#2563eb" : "#6b7280"
                    }}>
                      {selectedAlert.severity}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span>
                    <span style={styles.detailValue}>{selectedAlert.status}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Priority:</span>
                    <span style={styles.detailValue}>{selectedAlert.priority}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Zone:</span>
                    <span style={styles.detailValue}>{selectedAlert.zone}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div style={styles.detailsSection}>
                  <h3>Timeline</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Created:</span>
                    <span style={styles.detailValue}>{selectedAlert.createdAt}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Last Updated:</span>
                    <span style={styles.detailValue}>{selectedAlert.updatedAt}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Response Time:</span>
                    <span style={styles.detailValue}>{selectedAlert.responseTime}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Est. Resolution:</span>
                    <span style={styles.detailValue}>{selectedAlert.estimatedResolution}</span>
                  </div>
                </div>

                {/* Assignment & Impact */}
                <div style={styles.detailsSection}>
                  <h3>Assignment & Impact</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Assigned To:</span>
                    <span style={styles.detailValue}>{selectedAlert.assignedTo}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Escalation Level:</span>
                    <span style={styles.detailValue}>Level {selectedAlert.escalationLevel}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Affected Tourists:</span>
                    <span style={styles.detailValue}>{selectedAlert.affectedTourists.length} tourists</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Notifications Sent:</span>
                    <span style={styles.detailValue}>{selectedAlert.notificationsSent}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={styles.descriptionSection}>
                <h3>Description</h3>
                <p style={styles.description}>{selectedAlert.description}</p>
              </div>

              {/* Communication Log */}
              <div style={styles.communicationSection}>
                <h3>Communication Log</h3>
                <div style={styles.communicationLog}>
                  {selectedAlert.communicationLog.map((log, index) => (
                    <div key={index} style={styles.logEntry}>
                      <div style={styles.logTime}>{log.time}</div>
                      <div style={styles.logUser}>{log.user}</div>
                      <div style={styles.logMessage}>{log.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.actionButton}>✅ Resolve Alert</button>
              <button style={styles.actionButton}>🔺 Escalate</button>
              <button style={styles.actionButton}>👤 Reassign</button>
              <button style={styles.actionButton}>📢 Send Update</button>
              <button style={styles.actionButton}>✏️ Edit Details</button>
            </div>
          </div>
        </div>
      )}
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
    alignItems: "flex-start",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e5e7eb"
  },
  headerLeft: {
    flex: 1
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1f2937",
    margin: "0 0 8px 0"
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: 0
  },
  headerActions: {
    display: "flex",
    gap: "12px"
  },
  createButton: {
    padding: "12px 24px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  broadcastButton: {
    padding: "12px 24px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  settingsButton: {
    padding: "12px 24px",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  statIcon: {
    fontSize: "32px",
    backgroundColor: "#f3f4f6",
    padding: "12px",
    borderRadius: "12px"
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1f2937",
    lineHeight: "1"
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px"
  },
  controlsSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb"
  },
  tabContainer: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "16px",
    flexWrap: "wrap"
  },
  tab: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s"
  },
  activeTab: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    borderColor: "#fecaca"
  },
  tabCount: {
    backgroundColor: "white",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white"
  },
  filtersContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap"
  },
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  },
  bulkActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    border: "1px solid #fecaca",
    flexWrap: "wrap"
  },
  bulkActionButtonPrimary: {
    padding: "10px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "500",
    cursor: "pointer"
  },
  tableSection: {
    marginBottom: "24px"
  },
  titleCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  alertIcon: {
    fontSize: "20px",
    backgroundColor: "#f3f4f6",
    padding: "8px",
    borderRadius: "50%",
    minWidth: "36px",
    textAlign: "center"
  },
  alertTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  alertInfo: {
    fontSize: "12px",
    color: "#6b7280"
  },
  severityBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  },
  affectedCount: {
    fontSize: "12px",
    color: "#6b7280"
  },
  actionButtons: {
    display: "flex",
    gap: "4px"
  },
  viewButton: {
    padding: "4px 8px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "11px",
    cursor: "pointer"
  },
  editButton: {
    padding: "4px 8px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "11px",
    cursor: "pointer"
  },
  resolveButton: {
    padding: "4px 8px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "11px",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  detailsModal: {
    backgroundColor: "white",
    borderRadius: "12px",
    maxWidth: "1200px",
    width: "95%",
    maxHeight: "90vh",
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px"
  },
  modalContent: {
    padding: "24px",
    maxHeight: "65vh",
    overflowY: "auto"
  },
  alertDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "24px"
  },
  detailsSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px"
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb"
  },
  detailLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280"
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  descriptionSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px"
  },
  description: {
    margin: 0,
    color: "#374151",
    lineHeight: "1.6"
  },
  communicationSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px"
  },
  communicationLog: {
    maxHeight: "200px",
    overflowY: "auto"
  },
  logEntry: {
    display: "flex",
    gap: "12px",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb"
  },
  logTime: {
    fontSize: "12px",
    color: "#6b7280",
    minWidth: "60px"
  },
  logUser: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
    minWidth: "120px"
  },
  logMessage: {
    fontSize: "12px",
    color: "#374151",
    flex: 1
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    padding: "20px 24px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    flexWrap: "wrap"
  },
  actionButton: {
    padding: "8px 12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer"
  }
};