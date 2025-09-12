import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

export default function ActiveIncidentsEmergency() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    severity: "all",
    type: "all",
    status: "all",
    zone: "all",
    responseTeam: "all"
  });

  // Extended mock data for incidents
  const [incidentsData, setIncidentsData] = useState([
    {
      id: "INC-2025-0234",
      title: "Tourist Missing - Hiking Trail",
      type: "Missing Person",
      severity: "Critical",
      status: "Active",
      priority: "Critical",
      createdAt: "2025-09-07 08:30:00",
      updatedAt: "2025-09-07 11:45:00",
      resolvedAt: null,
      location: "Zone A-7 - Mountain Trail Section 3",
      coordinates: { lat: 28.6139, lng: 77.209 },
      reportedBy: "Tour Guide - Sarah Chen",
      contactNumber: "+1-555-0198",
      involvedTourists: [
        { id: "TR-2024-0891", name: "John Smith", age: 35, nationality: "USA", status: "Missing" }
      ],
      description: "Tourist John Smith separated from hiking group approximately 3 hours ago. Last seen at trail marker 15. Weather conditions deteriorating with fog rolling in.",
      responseTeams: [
        { name: "Search & Rescue Alpha", status: "Deployed", eta: "On Site", members: 8 },
        { name: "Medical Response Unit", status: "Standby", eta: "15 mins", members: 4 },
        { name: "Park Rangers", status: "Active", eta: "On Site", members: 3 }
      ],
      resources: [
        { type: "Helicopter", unit: "SAR-01", status: "Deployed", eta: "10 mins" },
        { type: "Search Dogs", unit: "K9-Team-2", status: "En Route", eta: "20 mins" },
        { type: "Drone Unit", unit: "DRONE-05", status: "Active", eta: "On Site" }
      ],
      timeline: [
        { time: "08:30", event: "Incident reported by tour guide", severity: "info" },
        { time: "08:35", event: "Emergency services notified", severity: "info" },
        { time: "08:45", event: "Search & Rescue team dispatched", severity: "warning" },
        { time: "09:15", event: "Search area established - 2km radius", severity: "info" },
        { time: "10:30", event: "Helicopter search initiated", severity: "info" },
        { time: "11:45", event: "Search expanded to secondary trail system", severity: "warning" }
      ],
      weather: {
        condition: "Fog with light rain",
        temperature: "12°C",
        visibility: "50m",
        windSpeed: "15 km/h"
      },
      estimatedResolution: "2025-09-07 16:00:00",
      escalationLevel: 3,
      mediaAttention: "Low",
      familyNotified: true,
      insuranceClaim: "Pending",
      riskAssessment: "High - Weather deteriorating, terrain challenging",
      communicationLog: [
        { time: "08:30", user: "Tour Guide", message: "Tourist missing from group, initiating search protocol" },
        { time: "08:35", user: "Control Center", message: "Emergency services alerted, deploying SAR team" },
        { time: "09:15", user: "SAR Alpha", message: "Team on site, establishing search perimeter" },
        { time: "11:45", user: "SAR Alpha", message: "No contact yet, expanding search area due to weather" }
      ]
    },
    {
      id: "INC-2025-0235",
      title: "Medical Emergency - Heart Attack",
      type: "Medical Emergency",
      severity: "Critical",
      status: "Resolved",
      priority: "Critical",
      createdAt: "2025-09-07 10:20:00",
      updatedAt: "2025-09-07 12:15:00",
      resolvedAt: "2025-09-07 12:15:00",
      location: "Zone B-3 - Resort Beach Area",
      coordinates: { lat: 19.076, lng: 72.8777 },
      reportedBy: "Lifeguard - Michael Torres",
      contactNumber: "+44-20-7946-0958",
      involvedTourists: [
        { id: "TR-2024-0892", name: "Emma Johnson", age: 28, nationality: "UK", status: "Hospitalized - Stable" }
      ],
      description: "Tourist Emma Johnson collapsed on beach with chest pain and shortness of breath. Immediate CPR administered by lifeguard.",
      responseTeams: [
        { name: "Paramedic Unit Beta", status: "Completed", eta: "Arrived", members: 3 },
        { name: "Beach Medical Station", status: "Completed", eta: "On Site", members: 2 },
        { name: "Hospital Transport", status: "Completed", eta: "Completed", members: 2 }
      ],
      resources: [
        { type: "Ambulance", unit: "AMB-03", status: "Completed", eta: "Transported" },
        { type: "AED Unit", unit: "BEACH-AED-1", status: "Used", eta: "On Site" },
        { type: "Oxygen Supply", unit: "OXY-02", status: "Used", eta: "On Site" }
      ],
      timeline: [
        { time: "10:20", event: "Tourist collapsed, CPR initiated", severity: "critical" },
        { time: "10:22", event: "Emergency services called", severity: "critical" },
        { time: "10:25", event: "AED applied, pulse restored", severity: "warning" },
        { time: "10:30", event: "Paramedics arrived on scene", severity: "info" },
        { time: "10:45", event: "Patient stabilized, preparing transport", severity: "info" },
        { time: "12:15", event: "Patient admitted to hospital - stable condition", severity: "success" }
      ],
      weather: {
        condition: "Sunny and clear",
        temperature: "28°C",
        visibility: "Excellent",
        windSpeed: "8 km/h"
      },
      estimatedResolution: "2025-09-07 12:00:00",
      escalationLevel: 2,
      mediaAttention: "None",
      familyNotified: true,
      insuranceClaim: "Filed",
      riskAssessment: "Resolved - Patient stable in hospital care",
      communicationLog: [
        { time: "10:20", user: "Lifeguard", message: "Tourist down, starting CPR immediately" },
        { time: "10:22", user: "Control Center", message: "Paramedics dispatched, ETA 8 minutes" },
        { time: "10:30", user: "Paramedic Beta", message: "On scene, patient conscious and stable" },
        { time: "12:15", user: "Hospital", message: "Patient admitted, diagnosis: mild heart episode, stable" }
      ]
    },
    {
      id: "INC-2025-0236",
      title: "Flash Flood Warning - Valley Area",
      type: "Natural Disaster",
      severity: "High",
      status: "Active",
      priority: "High",
      createdAt: "2025-09-07 06:15:00",
      updatedAt: "2025-09-07 11:30:00",
      resolvedAt: null,
      location: "Zone C-1 - River Valley Camping Area",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      reportedBy: "Weather Monitoring System",
      contactNumber: "Automated System",
      involvedTourists: [
        { id: "TR-2024-0893", name: "Pierre Dubois", age: 42, nationality: "France", status: "Evacuated" },
        { id: "TR-2024-0896", name: "Maria Rodriguez", age: 29, nationality: "Spain", status: "Evacuated" },
        { id: "TR-2024-0897", name: "Hans Mueller", age: 38, nationality: "Germany", status: "Evacuated" }
      ],
      description: "Heavy rainfall upstream causing rapid water level rise. Immediate evacuation of camping area required. 24 tourists affected.",
      responseTeams: [
        { name: "Flood Response Team", status: "Active", eta: "On Site", members: 12 },
        { name: "Evacuation Coordination", status: "Active", eta: "On Site", members: 8 },
        { name: "Emergency Shelter Team", status: "Standby", eta: "Ready", members: 6 }
      ],
      resources: [
        { type: "Evacuation Buses", unit: "BUS-01, BUS-02", status: "Active", eta: "On Site" },
        { type: "Emergency Shelter", unit: "SHELTER-A", status: "Prepared", eta: "Ready" },
        { type: "Water Monitoring", unit: "GAUGE-05", status: "Active", eta: "Monitoring" }
      ],
      timeline: [
        { time: "06:15", event: "Flood warning issued by weather service", severity: "warning" },
        { time: "06:30", event: "Evacuation order issued for valley area", severity: "warning" },
        { time: "07:00", event: "First evacuation bus deployed", severity: "info" },
        { time: "08:30", event: "All tourists evacuated to emergency shelter", severity: "success" },
        { time: "10:15", event: "Water levels continue to rise", severity: "warning" },
        { time: "11:30", event: "Peak water level reached, monitoring continues", severity: "info" }
      ],
      weather: {
        condition: "Heavy rain",
        temperature: "18°C",
        visibility: "Poor",
        windSpeed: "25 km/h"
      },
      estimatedResolution: "2025-09-07 18:00:00",
      escalationLevel: 2,
      mediaAttention: "Medium",
      familyNotified: true,
      insuranceClaim: "Multiple pending",
      riskAssessment: "Medium - Evacuation successful, monitoring water levels",
      communicationLog: [
        { time: "06:15", user: "Weather System", message: "Flash flood warning issued - immediate action required" },
        { time: "06:30", user: "Emergency Coordinator", message: "Evacuation order issued, teams mobilizing" },
        { time: "08:30", user: "Evacuation Team", message: "All 24 tourists safely evacuated to shelter" },
        { time: "11:30", user: "Flood Response", message: "Water levels stabilizing, continuing to monitor" }
      ]
    },
    {
      id: "INC-2025-0237",
      title: "Wildlife Encounter - Bear Sighting",
      type: "Wildlife Incident",
      severity: "Medium",
      status: "In Progress",
      priority: "Medium",
      createdAt: "2025-09-07 09:45:00",
      updatedAt: "2025-09-07 11:20:00",
      resolvedAt: null,
      location: "Zone D-5 - Forest Trail Network",
      coordinates: { lat: 28.5355, lng: 77.3910 },
      reportedBy: "Tourist - Yuki Tanaka",
      contactNumber: "+81-3-1234-5678",
      involvedTourists: [
        { id: "TR-2024-0895", name: "Yuki Tanaka", age: 26, nationality: "Japan", status: "Safe - Relocated" }
      ],
      description: "Black bear spotted 50 meters from hiking trail. Tourist safely withdrew to previous checkpoint. Wildlife control team notified.",
      responseTeams: [
        { name: "Wildlife Control Unit", status: "En Route", eta: "30 mins", members: 4 },
        { name: "Trail Safety Team", status: "Active", eta: "On Site", members: 2 },
        { name: "Tourist Relocation", status: "Completed", eta: "Completed", members: 3 }
      ],
      resources: [
        { type: "Wildlife Deterrent", unit: "BEAR-SPRAY-01", status: "Ready", eta: "Available" },
        { type: "Trail Closure Signs", unit: "SIGNS-SET-3", status: "Deployed", eta: "In Place" },
        { type: "Emergency Flares", unit: "FLARE-KIT-2", status: "Ready", eta: "Available" }
      ],
      timeline: [
        { time: "09:45", event: "Bear sighting reported by tourist", severity: "warning" },
        { time: "09:50", event: "Tourist safely relocated to checkpoint", severity: "success" },
        { time: "10:00", event: "Trail closed and warning signs posted", severity: "info" },
        { time: "10:15", event: "Wildlife control team notified", severity: "info" },
        { time: "11:20", event: "Alternative route provided to tourists", severity: "info" }
      ],
      weather: {
        condition: "Partly cloudy",
        temperature: "22°C",
        visibility: "Good",
        windSpeed: "12 km/h"
      },
      estimatedResolution: "2025-09-07 15:00:00",
      escalationLevel: 1,
      mediaAttention: "None",
      familyNotified: false,
      insuranceClaim: "Not applicable",
      riskAssessment: "Low - Tourist safe, wildlife control handling situation",
      communicationLog: [
        { time: "09:45", user: "Tourist", message: "Bear spotted on trail, withdrawing to safe distance" },
        { time: "09:50", user: "Trail Safety", message: "Tourist relocated safely, trail being secured" },
        { time: "10:15", user: "Control Center", message: "Wildlife team dispatched, ETA 30 minutes" },
        { time: "11:20", user: "Trail Safety", message: "Alternative route established, tourists redirected" }
      ]
    },
    {
      id: "INC-2025-0238",
      title: "Equipment Failure - Cable Car",
      type: "Technical Emergency",
      severity: "High",
      status: "In Progress",
      priority: "High",
      createdAt: "2025-09-07 07:30:00",
      updatedAt: "2025-09-07 11:15:00",
      resolvedAt: null,
      location: "Zone E-2 - Mountain Cable Car Station",
      coordinates: { lat: 28.6429, lng: 77.1200 },
      reportedBy: "Cable Car Operator - David Kim",
      contactNumber: "+82-2-1234-5678",
      involvedTourists: [
        { id: "TR-2024-0898", name: "Lisa Anderson", age: 31, nationality: "Sweden", status: "Stranded - Rescue in Progress" },
        { id: "TR-2024-0899", name: "Roberto Silva", age: 45, nationality: "Brazil", status: "Stranded - Rescue in Progress" }
      ],
      description: "Cable car stopped mid-route due to motor failure. 12 passengers stranded 150 meters above ground. Technical rescue team deployed.",
      responseTeams: [
        { name: "Technical Rescue Team", status: "Active", eta: "On Site", members: 10 },
        { name: "Cable Car Engineers", status: "Active", eta: "On Site", members: 4 },
        { name: "Medical Support Team", status: "Standby", eta: "Ready", members: 3 }
      ],
      resources: [
        { type: "Helicopter Rescue", unit: "RESCUE-02", status: "En Route", eta: "20 mins" },
        { type: "Rope Access Team", unit: "ROPE-TEAM-1", status: "Active", eta: "On Site" },
        { type: "Backup Generator", unit: "GEN-05", status: "Deployed", eta: "On Site" }
      ],
      timeline: [
        { time: "07:30", event: "Cable car stopped due to motor failure", severity: "critical" },
        { time: "07:35", event: "Emergency services notified", severity: "critical" },
        { time: "08:00", event: "Technical rescue team deployed", severity: "warning" },
        { time: "09:30", event: "Helicopter rescue team dispatched", severity: "info" },
        { time: "10:45", event: "Rope access established to cable car", severity: "info" },
        { time: "11:15", event: "Passengers being evacuated one by one", severity: "success" }
      ],
      weather: {
        condition: "Clear skies",
        temperature: "16°C",
        visibility: "Excellent",
        windSpeed: "5 km/h"
      },
      estimatedResolution: "2025-09-07 14:00:00",
      escalationLevel: 2,
      mediaAttention: "High",
      familyNotified: true,
      insuranceClaim: "Multiple pending",
      riskAssessment: "Medium - Rescue operation proceeding safely",
      communicationLog: [
        { time: "07:30", user: "Cable Car Operator", message: "Motor failure, cable car stopped mid-route" },
        { time: "07:35", user: "Control Center", message: "Emergency teams notified, rescue operation initiated" },
        { time: "09:30", user: "Rescue Coordinator", message: "Helicopter backup requested due to height" },
        { time: "11:15", user: "Rescue Team", message: "Evacuation in progress, passengers calm and cooperative" }
      ]
    }
  ]);

  // Filter data based on selected tab and filters
  const filteredData = incidentsData.filter(incident => {
    // Tab filtering
    if (selectedTab === "active" && incident.status !== "Active") return false;
    if (selectedTab === "critical" && incident.severity !== "Critical") return false;
    if (selectedTab === "inprogress" && incident.status !== "In Progress") return false;
    if (selectedTab === "resolved" && incident.status !== "Resolved") return false;
    
    // Additional filters
    if (filterOptions.severity !== "all" && incident.severity !== filterOptions.severity) return false;
    if (filterOptions.type !== "all" && incident.type !== filterOptions.type) return false;
    if (filterOptions.status !== "all" && incident.status !== filterOptions.status) return false;
    
    return true;
  });

  // Statistics
  const stats = {
    total: incidentsData.length,
    active: incidentsData.filter(i => i.status === "Active").length,
    critical: incidentsData.filter(i => i.severity === "Critical").length,
    inProgress: incidentsData.filter(i => i.status === "In Progress").length,
    resolved: incidentsData.filter(i => i.status === "Resolved").length,
    avgResponseTime: "00:08:45",
    totalTouristsAffected: incidentsData.reduce((sum, i) => sum + i.involvedTourists.length, 0)
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
          checked={selectedIncidents.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedIncidents([...selectedIncidents, row.id]);
            } else {
              setSelectedIncidents(selectedIncidents.filter(id => id !== row.id));
            }
          }}
        />
      )
    },
    { key: "id", label: "Incident ID", sortable: true },
    { 
      key: "title", 
      label: "Incident Title", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.titleCell}>
          <div style={styles.incidentIcon}>
            {row.type === "Missing Person" ? "👤" : 
             row.type === "Medical Emergency" ? "🏥" :
             row.type === "Natural Disaster" ? "🌊" :
             row.type === "Wildlife Incident" ? "🐻" : "⚙️"}
          </div>
          <div>
            <div style={styles.incidentTitle}>{value}</div>
            <div style={styles.incidentInfo}>{row.type} • {row.location.split(' - ')[0]}</div>
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
            value === "Active" ? "#fef2f2" :
            value === "In Progress" ? "#dbeafe" :
            value === "Resolved" ? "#dcfce7" : "#f3f4f6",
          color:
            value === "Active" ? "#dc2626" :
            value === "In Progress" ? "#1e40af" :
            value === "Resolved" ? "#166534" : "#6b7280"
        }}>
          {value}
        </span>
      )
    },
    { key: "createdAt", label: "Reported", sortable: true },
    { key: "reportedBy", label: "Reported By", sortable: true },
    { 
      key: "involvedTourists", 
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
              setSelectedIncident(row);
              setShowDetailsModal(true);
            }}
          >
            👁️ View
          </button>
          <button 
            style={styles.responseButton}
            onClick={() => {
              setSelectedIncident(row);
              setShowResponseModal(true);
            }}
          >
            🚨 Respond
          </button>
          <button style={styles.editButton}>✏️ Update</button>
        </div>
      )
    }
  ];

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on selected incidents:`, selectedIncidents);
    setSelectedIncidents([]);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>🚨 Active Incidents & Emergency Response</h1>
          <p style={styles.subtitle}>Real-time incident management and emergency coordination system</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Report Incident
          </button>
          <button style={styles.emergencyButton}>🆘 Emergency Protocol</button>
          <button style={styles.coordinationButton}>📡 Coordination Center</button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🚨</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Incidents</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚡</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.active}</div>
            <div style={styles.statLabel}>Active</div>
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
          <div style={styles.statIcon}>🔄</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.inProgress}</div>
            <div style={styles.statLabel}>In Progress</div>
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
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalTouristsAffected}</div>
            <div style={styles.statLabel}>Tourists Affected</div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div style={styles.controlsSection}>
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { key: "active", label: "Active Incidents", count: stats.active, color: "#ef4444" },
            { key: "critical", label: "Critical", count: stats.critical, color: "#dc2626" },
            { key: "inprogress", label: "In Progress", count: stats.inProgress, color: "#3b82f6" },
            { key: "resolved", label: "Resolved", count: stats.resolved, color: "#10b981" },
            { key: "all", label: "All Incidents", count: stats.total, color: "#6b7280" }
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
            <option value="Missing Person">Missing Person</option>
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="Natural Disaster">Natural Disaster</option>
            <option value="Wildlife Incident">Wildlife Incident</option>
            <option value="Technical Emergency">Technical Emergency</option>
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
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedIncidents.length > 0 && (
          <div style={styles.bulkActionsContainer}>
            <span style={styles.bulkActionsLabel}>
              {selectedIncidents.length} incidents selected
            </span>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('escalate-all')}
            >
              🔺 Escalate All
            </button>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('assign-team')}
            >
              👥 Assign Teams
            </button>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('update-status')}
            >
              📊 Update Status
            </button>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('export')}
            >
              📥 Export Report
            </button>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div style={styles.tableSection}>
        <DataTable
          data={filteredData}
          columns={columns}
          title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Emergency Incidents`}
          showSearch={true}
          showExport={true}
          showDateRange={true}
          itemsPerPage={10}
        />
      </div>

      {/* Incident Details Modal */}
      {showDetailsModal && selectedIncident && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Incident Details</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.incidentDetailsGrid}>
                {/* Basic Information */}
                <div style={styles.detailsSection}>
                  <h3>Incident Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Incident ID:</span>
                    <span style={styles.detailValue}>{selectedIncident.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Title:</span>
                    <span style={styles.detailValue}>{selectedIncident.title}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{selectedIncident.type}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Severity:</span>
                    <span style={{
                      ...styles.detailValue,
                      color: selectedIncident.severity === "Critical" ? "#dc2626" : 
                             selectedIncident.severity === "High" ? "#d97706" : 
                             selectedIncident.severity === "Medium" ? "#2563eb" : "#6b7280"
                    }}>
                      {selectedIncident.severity}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span>
                    <span style={styles.detailValue}>{selectedIncident.status}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Location:</span>
                    <span style={styles.detailValue}>{selectedIncident.location}</span>
                  </div>
                </div>

                {/* Response Teams */}
                <div style={styles.detailsSection}>
                  <h3>Response Teams</h3>
                  {selectedIncident.responseTeams.map((team, index) => (
                    <div key={index} style={styles.teamItem}>
                      <div style={styles.teamName}>{team.name}</div>
                      <div style={styles.teamStatus}>Status: {team.status}</div>
                      <div style={styles.teamEta}>ETA: {team.eta}</div>
                      <div style={styles.teamMembers}>Members: {team.members}</div>
                    </div>
                  ))}
                </div>

                {/* Affected Tourists */}
                <div style={styles.detailsSection}>
                  <h3>Affected Tourists</h3>
                  {selectedIncident.involvedTourists.map((tourist, index) => (
                    <div key={index} style={styles.touristItem}>
                      <div style={styles.touristName}>{tourist.name}</div>
                      <div style={styles.touristDetails}>
                        {tourist.age} years • {tourist.nationality}
                      </div>
                      <div style={styles.touristStatus}>Status: {tourist.status}</div>
                    </div>
                  ))}
                </div>

                {/* Weather Conditions */}
                <div style={styles.detailsSection}>
                  <h3>Weather Conditions</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Condition:</span>
                    <span style={styles.detailValue}>{selectedIncident.weather.condition}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Temperature:</span>
                    <span style={styles.detailValue}>{selectedIncident.weather.temperature}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Visibility:</span>
                    <span style={styles.detailValue}>{selectedIncident.weather.visibility}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Wind Speed:</span>
                    <span style={styles.detailValue}>{selectedIncident.weather.windSpeed}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={styles.descriptionSection}>
                <h3>Incident Description</h3>
                <p style={styles.description}>{selectedIncident.description}</p>
              </div>

              {/* Timeline */}
              <div style={styles.timelineSection}>
                <h3>Incident Timeline</h3>
                <div style={styles.timeline}>
                  {selectedIncident.timeline.map((event, index) => (
                    <div key={index} style={styles.timelineItem}>
                      <div style={styles.timelineTime}>{event.time}</div>
                      <div style={{
                        ...styles.timelineEvent,
                        color: event.severity === "critical" ? "#dc2626" :
                               event.severity === "warning" ? "#d97706" :
                               event.severity === "success" ? "#16a34a" : "#374151"
                      }}>
                        {event.event}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Log */}
              <div style={styles.communicationSection}>
                <h3>Communication Log</h3>
                <div style={styles.communicationLog}>
                  {selectedIncident.communicationLog.map((log, index) => (
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
              <button style={styles.actionButton}>🚨 Emergency Response</button>
              <button style={styles.actionButton}>👥 Assign Team</button>
              <button style={styles.actionButton}>📊 Update Status</button>
              <button style={styles.actionButton}>📞 Contact Authorities</button>
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
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  emergencyButton: {
    padding: "12px 24px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    animation: "pulse 2s infinite"
  },
  coordinationButton: {
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
  bulkActionsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    border: "1px solid #fecaca",
    flexWrap: "wrap"
  },
  bulkActionsLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#dc2626"
  },
  bulkActionButton: {
    padding: "6px 12px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
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
  incidentIcon: {
    fontSize: "20px",
    backgroundColor: "#f3f4f6",
    padding: "8px",
    borderRadius: "50%",
    minWidth: "36px",
    textAlign: "center"
  },
  incidentTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  incidentInfo: {
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
  responseButton: {
    padding: "4px 8px",
    backgroundColor: "#dc2626",
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
    maxWidth: "1400px",
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
  incidentDetailsGrid: {
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
  teamItem: {
    backgroundColor: "white",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb"
  },
  teamName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  teamStatus: {
    fontSize: "12px",
    color: "#6b7280"
  },
  teamEta: {
    fontSize: "12px",
    color: "#6b7280"
  },
  teamMembers: {
    fontSize: "12px",
    color: "#6b7280"
  },
  touristItem: {
    backgroundColor: "white",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb"
  },
  touristName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  touristDetails: {
    fontSize: "12px",
    color: "#6b7280"
  },
  touristStatus: {
    fontSize: "12px",
    color: "#dc2626",
    fontWeight: "500"
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
  timelineSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px"
  },
  timeline: {
    maxHeight: "200px",
    overflowY: "auto"
  },
  timelineItem: {
    display: "flex",
    gap: "12px",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb"
  },
  timelineTime: {
    fontSize: "12px",
    color: "#6b7280",
    minWidth: "60px",
    fontWeight: "600"
  },
  timelineEvent: {
    fontSize: "12px",
    flex: 1
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
    padding: "10px 16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  }
};
