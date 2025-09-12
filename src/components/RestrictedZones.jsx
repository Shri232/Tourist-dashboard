import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

export default function RestrictedZones() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedZones, setSelectedZones] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    severity: "all",
    status: "all",
    reason: "all"
  });

  // Restricted zones data
  const [zonesData, setZonesData] = useState([
    {
      id: "RZ-2025-001",
      name: "North Ridge Construction Zone",
      type: "Construction",
      status: "Active",
      severity: "High",
      coordinates: {
        center: { lat: 28.7041, lng: 77.1025 },
        radius: 500
      },
      reason: "Bridge construction and heavy machinery operation",
      description: "Major bridge construction project with heavy machinery and potential falling debris hazards. Access restricted to authorized personnel only.",
      startDate: "2025-08-15",
      endDate: "2025-12-15",
      createdBy: "Safety Manager - David Park",
      lastUpdated: "2025-09-05",
      affectedArea: "2.5 km²",
      alternativeRoutes: ["Trail Route B-2", "Scenic Path C-1"],
      permittedPersonnel: ["Construction Crew", "Safety Inspectors", "Emergency Services"],
      restrictions: {
        tourists: "Completely prohibited",
        vehicles: "Construction vehicles only",
        aircraft: "Restricted below 500ft",
        timeRestrictions: "24/7 during construction"
      },
      safetyMeasures: [
        "Warning signs posted at all entry points",
        "Security patrol every 2 hours",
        "Emergency contact posted",
        "Alternative route guidance"
      ],
      incidentHistory: [
        { date: "2025-09-02", incident: "Tourist attempted entry", action: "Redirected safely" }
      ],
      emergencyContact: "+1-555-CONSTRUCT",
      complianceStatus: "Full Compliance",
      violations: 0,
      monitoringEquipment: ["CCTV Camera", "Motion Sensors", "Warning Speakers"],
      weatherImpact: "Low - Indoor construction",
      riskLevel: "Medium"
    },
    {
      id: "RZ-2025-002",
      name: "Avalanche Risk Area - West Slope",
      type: "Natural Hazard",
      status: "Active",
      severity: "Critical",
      coordinates: {
        center: { lat: 28.6500, lng: 77.1800 },
        radius: 800
      },
      reason: "High avalanche risk due to unstable snow conditions",
      description: "Extremely dangerous avalanche zone with unstable snowpack conditions. Multiple avalanche paths converge in this area.",
      startDate: "2025-01-15",
      endDate: "2025-03-31",
      createdBy: "Avalanche Safety Team",
      lastUpdated: "2025-09-06",
      affectedArea: "15.2 km²",
      alternativeRoutes: ["East Ridge Trail", "Valley Bottom Path"],
      permittedPersonnel: ["Avalanche Control Team", "Emergency Rescue"],
      restrictions: {
        tourists: "Absolutely forbidden",
        vehicles: "No access",
        aircraft: "Emergency only",
        timeRestrictions: "Complete closure"
      },
      safetyMeasures: [
        "Avalanche control explosives deployment",
        "Weather station monitoring",
        "Daily snowpack assessment",
        "Emergency beacon network"
      ],
      incidentHistory: [
        { date: "2025-02-14", incident: "Controlled avalanche triggered", action: "Area cleared successfully" },
        { date: "2025-01-28", incident: "Tourist violation detected", action: "Immediate evacuation" }
      ],
      emergencyContact: "+1-555-AVALANCHE",
      complianceStatus: "Full Compliance",
      violations: 2,
      monitoringEquipment: ["Weather Station", "Snow Depth Sensors", "Avalanche Detection System"],
      weatherImpact: "Critical - Snow conditions monitoring",
      riskLevel: "Extreme"
    },
    {
      id: "RZ-2025-003",
      name: "Wildlife Sanctuary Buffer",
      type: "Wildlife Protection",
      status: "Active",
      severity: "Medium",
      coordinates: {
        center: { lat: 28.5355, lng: 77.3910 },
        radius: 1200
      },
      reason: "Endangered species breeding season protection",
      description: "Protected buffer zone around critical wildlife habitat during sensitive breeding and nesting season.",
      startDate: "2025-04-01",
      endDate: "2025-08-31",
      createdBy: "Wildlife Conservation Officer",
      lastUpdated: "2025-09-04",
      affectedArea: "45.2 km²",
      alternativeRoutes: ["Nature Trail Loop", "Observation Deck Path"],
      permittedPersonnel: ["Wildlife Researchers", "Park Rangers", "Veterinarians"],
      restrictions: {
        tourists: "Limited access with guide only",
        vehicles: "Electric vehicles only",
        aircraft: "Prohibited during daylight",
        timeRestrictions: "Dawn to dusk restrictions"
      },
      safetyMeasures: [
        "Guided tour groups only",
        "Wildlife cameras monitoring",
        "Noise level restrictions",
        "Educational signage posted"
      ],
      incidentHistory: [
        { date: "2025-06-15", incident: "Unauthorized camping detected", action: "Campers relocated" }
      ],
      emergencyContact: "+1-555-WILDLIFE",
      complianceStatus: "Good Compliance",
      violations: 1,
      monitoringEquipment: ["Wildlife Cameras", "Audio Sensors", "Motion Detectors"],
      weatherImpact: "Medium - Weather affects animal behavior",
      riskLevel: "Low"
    },
    {
      id: "RZ-2025-004",
      name: "Geological Survey Zone",
      type: "Scientific Research",
      status: "Temporary",
      severity: "Medium",
      coordinates: {
        center: { lat: 28.6200, lng: 77.2100 },
        radius: 300
      },
      reason: "Active geological survey and soil stability testing",
      description: "Temporary restriction for geological survey operations including drilling and seismic testing equipment.",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      createdBy: "Geological Survey Team",
      lastUpdated: "2025-09-07",
      affectedArea: "0.8 km²",
      alternativeRoutes: ["Main Trail", "Service Road Access"],
      permittedPersonnel: ["Geological Team", "Survey Equipment Operators"],
      restrictions: {
        tourists: "Daytime access with safety briefing",
        vehicles: "Research vehicles only",
        aircraft: "No restrictions",
        timeRestrictions: "Equipment operation hours only"
      },
      safetyMeasures: [
        "Safety briefing required",
        "Hard hat zones marked",
        "Equipment operation warnings",
        "Temporary fencing around drilling sites"
      ],
      incidentHistory: [],
      emergencyContact: "+1-555-GEOLOGY",
      complianceStatus: "Full Compliance",
      violations: 0,
      monitoringEquipment: ["Seismic Monitors", "Safety Barriers"],
      weatherImpact: "High - Weather affects drilling operations",
      riskLevel: "Low"
    },
    {
      id: "RZ-2025-005",
      name: "Fire Damage Recovery Zone",
      type: "Environmental",
      status: "Active",
      severity: "High",
      coordinates: {
        center: { lat: 28.5800, lng: 77.1500 },
        radius: 2000
      },
      reason: "Forest fire damage rehabilitation and erosion control",
      description: "Area severely damaged by recent forest fire, undergoing rehabilitation with unstable soil and falling tree hazards.",
      startDate: "2025-07-20",
      endDate: "2026-07-20",
      createdBy: "Forest Management Team",
      lastUpdated: "2025-09-06",
      affectedArea: "125.6 km²",
      alternativeRoutes: ["Northern Bypass Trail", "Lake Shore Path"],
      permittedPersonnel: ["Restoration Crew", "Environmental Scientists", "Safety Inspectors"],
      restrictions: {
        tourists: "Prohibited due to safety hazards",
        vehicles: "Emergency and work vehicles only",
        aircraft: "Firefighting and survey aircraft only",
        timeRestrictions: "Complete closure"
      },
      safetyMeasures: [
        "Perimeter fencing installed",
        "Regular hazard tree assessment",
        "Erosion control measures",
        "Air quality monitoring"
      ],
      incidentHistory: [
        { date: "2025-08-15", incident: "Hazardous tree fell across perimeter", action: "Immediate removal and area secured" }
      ],
      emergencyContact: "+1-555-FOREST",
      complianceStatus: "Full Compliance",
      violations: 0,
      monitoringEquipment: ["Air Quality Sensors", "Soil Stability Monitors", "Security Cameras"],
      weatherImpact: "Critical - Rain affects soil stability",
      riskLevel: "High"
    },
    {
      id: "RZ-2025-006",
      name: "Military Exercise Area",
      type: "Security",
      status: "Scheduled",
      severity: "Critical",
      coordinates: {
        center: { lat: 28.7200, lng: 77.2500 },
        radius: 1500
      },
      reason: "Scheduled military training exercises with live ammunition",
      description: "Temporary military training area with live fire exercises and explosive ordnance training.",
      startDate: "2025-09-15",
      endDate: "2025-09-25",
      createdBy: "Military Liaison Officer",
      lastUpdated: "2025-09-05",
      affectedArea: "70.7 km²",
      alternativeRoutes: ["Civilian Bypass Route", "Eastern Alternative Path"],
      permittedPersonnel: ["Military Personnel", "Authorized Observers"],
      restrictions: {
        tourists: "Complete prohibition",
        vehicles: "Military vehicles only",
        aircraft: "Military aircraft only",
        timeRestrictions: "Exercise periods only"
      },
      safetyMeasures: [
        "Multiple warning perimeters",
        "Radio communication monitoring",
        "Explosive ordnance disposal team on standby",
        "Medical team stationed nearby"
      ],
      incidentHistory: [],
      emergencyContact: "+1-555-MILITARY",
      complianceStatus: "Not Yet Active",
      violations: 0,
      monitoringEquipment: ["Radar Systems", "Communication Jammers", "Perimeter Sensors"],
      weatherImpact: "Medium - Weather affects visibility",
      riskLevel: "Extreme"
    }
  ]);

  // Filter data
  const filteredData = zonesData.filter(zone => {
    if (selectedTab === "active" && zone.status !== "Active") return false;
    if (selectedTab === "temporary" && zone.status !== "Temporary") return false;
    if (selectedTab === "scheduled" && zone.status !== "Scheduled") return false;
    if (selectedTab === "critical" && zone.severity !== "Critical") return false;
    
    if (filterOptions.type !== "all" && zone.type !== filterOptions.type) return false;
    if (filterOptions.severity !== "all" && zone.severity !== filterOptions.severity) return false;
    if (filterOptions.status !== "all" && zone.status !== filterOptions.status) return false;
    
    return true;
  });

  // Statistics
  const stats = {
    total: zonesData.length,
    active: zonesData.filter(z => z.status === "Active").length,
    critical: zonesData.filter(z => z.severity === "Critical").length,
    temporary: zonesData.filter(z => z.status === "Temporary").length,
    violations: zonesData.reduce((sum, z) => sum + z.violations, 0),
    totalArea: zonesData.reduce((sum, z) => sum + parseFloat(z.affectedArea.replace(/[^\d.]/g, '')), 0).toFixed(1)
  };

  // Table columns
  const columns = [
    {
      key: "select",
      label: "Select",
      sortable: false,
      render: (value, row) => (
        <input
          type="checkbox"
          checked={selectedZones.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedZones([...selectedZones, row.id]);
            } else {
              setSelectedZones(selectedZones.filter(id => id !== row.id));
            }
          }}
        />
      )
    },
    { key: "id", label: "Zone ID", sortable: true },
    { 
      key: "name", 
      label: "Zone Name", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.nameCell}>
          <div style={styles.zoneIcon}>
            {row.type === "Construction" ? "🚧" : 
             row.type === "Natural Hazard" ? "⚠️" :
             row.type === "Wildlife Protection" ? "🦌" :
             row.type === "Scientific Research" ? "🔬" :
             row.type === "Environmental" ? "🌲" : "🛡️"}
          </div>
          <div>
            <div style={styles.zoneName}>{value}</div>
            <div style={styles.zoneInfo}>{row.type} • {row.affectedArea}</div>
          </div>
        </div>
      )
    },
    { key: "type", label: "Type", sortable: true },
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
            value === "Temporary" ? "#fef3c7" :
            value === "Scheduled" ? "#f0f9ff" : "#f3f4f6",
          color:
            value === "Active" ? "#dc2626" :
            value === "Temporary" ? "#d97706" :
            value === "Scheduled" ? "#2563eb" : "#6b7280"
        }}>
          {value}
        </span>
      )
    },
    { key: "startDate", label: "Start Date", sortable: true },
    { key: "endDate", label: "End Date", sortable: true },
    { 
      key: "violations", 
      label: "Violations", 
      sortable: true,
      render: (value) => (
        <span style={{
          color: value > 0 ? "#dc2626" : "#16a34a",
          fontWeight: "600"
        }}>
          {value}
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
              setSelectedZone(row);
              setShowDetailsModal(true);
            }}
          >
            👁️ View
          </button>
          <button style={styles.editButton}>✏️ Edit</button>
          <button style={styles.mapButton}>🗺️ Map</button>
        </div>
      )
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>⛔ Restricted Zones Management</h1>
          <p style={styles.subtitle}>Area access control and safety zone management system</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Create Zone
          </button>
          <button style={styles.mapViewButton}>🗺️ Map View</button>
          <button style={styles.reportButton}>📊 Zone Report</button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⛔</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Zones</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🚫</div>
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
          <div style={styles.statIcon}>⏱️</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.temporary}</div>
            <div style={styles.statLabel}>Temporary</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⚠️</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.violations}</div>
            <div style={styles.statLabel}>Violations</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📏</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalArea} km²</div>
            <div style={styles.statLabel}>Total Area</div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div style={styles.controlsSection}>
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { key: "active", label: "Active Zones", count: stats.active },
            { key: "critical", label: "Critical", count: stats.critical },
            { key: "temporary", label: "Temporary", count: stats.temporary },
            { key: "scheduled", label: "Scheduled", count: zonesData.filter(z => z.status === "Scheduled").length },
            { key: "all", label: "All Zones", count: stats.total }
          ].map(tab => (
            <button
              key={tab.key}
              style={{
                ...styles.tab,
                ...(selectedTab === tab.key ? styles.activeTab : {})
              }}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
              <span style={styles.tabCount}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={styles.filtersContainer}>
          <select
            value={filterOptions.type}
            onChange={(e) => setFilterOptions({...filterOptions, type: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="Construction">Construction</option>
            <option value="Natural Hazard">Natural Hazard</option>
            <option value="Wildlife Protection">Wildlife Protection</option>
            <option value="Scientific Research">Scientific Research</option>
            <option value="Environmental">Environmental</option>
            <option value="Security">Security</option>
          </select>

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
            value={filterOptions.status}
            onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Temporary">Temporary</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedZones.length > 0 && (
          <div style={styles.bulkActionsContainer}>
            <span style={styles.bulkActionsLabel}>
              {selectedZones.length} zones selected
            </span>
            <button style={styles.bulkActionButton}>📢 Send Alerts</button>
            <button style={styles.bulkActionButton}>🗺️ Show on Map</button>
            <button style={styles.bulkActionButton}>📊 Generate Report</button>
            <button style={styles.bulkActionButton}>📥 Export Data</button>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div style={styles.tableSection}>
        <DataTable
          data={filteredData}
          columns={columns}
          title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Restricted Zones`}
          showSearch={true}
          showExport={true}
          showDateRange={true}
          itemsPerPage={10}
        />
      </div>

      {/* Zone Details Modal */}
      {showDetailsModal && selectedZone && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Restricted Zone Details</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.zoneDetailsGrid}>
                <div style={styles.detailsColumn}>
                  <h3>Zone Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Zone ID:</span>
                    <span style={styles.detailValue}>{selectedZone.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Name:</span>
                    <span style={styles.detailValue}>{selectedZone.name}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{selectedZone.type}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Severity:</span>
                    <span style={styles.detailValue}>{selectedZone.severity}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span>
                    <span style={styles.detailValue}>{selectedZone.status}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Affected Area:</span>
                    <span style={styles.detailValue}>{selectedZone.affectedArea}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Timeline & Management</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Start Date:</span>
                    <span style={styles.detailValue}>{selectedZone.startDate}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>End Date:</span>
                    <span style={styles.detailValue}>{selectedZone.endDate}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Created By:</span>
                    <span style={styles.detailValue}>{selectedZone.createdBy}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Last Updated:</span>
                    <span style={styles.detailValue}>{selectedZone.lastUpdated}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Violations:</span>
                    <span style={styles.detailValue}>{selectedZone.violations}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Risk Level:</span>
                    <span style={styles.detailValue}>{selectedZone.riskLevel}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Access Restrictions</h3>
                  <div style={styles.restrictionItem}>
                    <span style={styles.restrictionLabel}>Tourists:</span>
                    <span style={styles.restrictionValue}>{selectedZone.restrictions.tourists}</span>
                  </div>
                  <div style={styles.restrictionItem}>
                    <span style={styles.restrictionLabel}>Vehicles:</span>
                    <span style={styles.restrictionValue}>{selectedZone.restrictions.vehicles}</span>
                  </div>
                  <div style={styles.restrictionItem}>
                    <span style={styles.restrictionLabel}>Aircraft:</span>
                    <span style={styles.restrictionValue}>{selectedZone.restrictions.aircraft}</span>
                  </div>
                  <div style={styles.restrictionItem}>
                    <span style={styles.restrictionLabel}>Time Restrictions:</span>
                    <span style={styles.restrictionValue}>{selectedZone.restrictions.timeRestrictions}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Safety & Monitoring</h3>
                  <div style={styles.safetyList}>
                    <span style={styles.detailLabel}>Safety Measures:</span>
                    {selectedZone.safetyMeasures.map((measure, index) => (
                      <div key={index} style={styles.safetyItem}>• {measure}</div>
                    ))}
                  </div>
                  <div style={styles.equipmentList}>
                    <span style={styles.detailLabel}>Monitoring Equipment:</span>
                    {selectedZone.monitoringEquipment.map((equipment, index) => (
                      <div key={index} style={styles.equipmentItem}>• {equipment}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.descriptionSection}>
                <h3>Description & Reason</h3>
                <p style={styles.description}>{selectedZone.description}</p>
                <div style={styles.reasonBox}>
                  <strong>Restriction Reason:</strong> {selectedZone.reason}
                </div>
              </div>

              {selectedZone.alternativeRoutes && selectedZone.alternativeRoutes.length > 0 && (
                <div style={styles.alternativeSection}>
                  <h3>Alternative Routes</h3>
                  <div style={styles.alternativeList}>
                    {selectedZone.alternativeRoutes.map((route, index) => (
                      <div key={index} style={styles.alternativeItem}>🛤️ {route}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={styles.modalActions}>
              <button style={styles.actionButton}>🗺️ View on Map</button>
              <button style={styles.actionButton}>📢 Send Alert</button>
              <button style={styles.actionButton}>📊 Generate Report</button>
              <button style={styles.actionButton}>✏️ Edit Zone</button>
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
  mapViewButton: {
    padding: "12px 24px",
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  reportButton: {
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
    backgroundColor: "#dc2626",
    color: "white",
    borderColor: "#dc2626"
  },
  tabCount: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
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
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  zoneIcon: {
    fontSize: "20px",
    backgroundColor: "#f3f4f6",
    padding: "8px",
    borderRadius: "50%",
    minWidth: "36px",
    textAlign: "center"
  },
  zoneName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  zoneInfo: {
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
  mapButton: {
    padding: "4px 8px",
    backgroundColor: "#059669",
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
  zoneDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "24px"
  },
  detailsColumn: {
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
  restrictionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb"
  },
  restrictionLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    minWidth: "80px"
  },
  restrictionValue: {
    fontSize: "13px",
    color: "#dc2626",
    fontWeight: "600",
    textAlign: "right",
    flex: 1
  },
  safetyList: {
    marginBottom: "16px"
  },
  safetyItem: {
    fontSize: "12px",
    color: "#374151",
    marginBottom: "4px"
  },
  equipmentList: {
    marginBottom: "16px"
  },
  equipmentItem: {
    fontSize: "12px",
    color: "#374151",
    marginBottom: "4px"
  },
  descriptionSection: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px"
  },
  description: {
    margin: "0 0 16px 0",
    color: "#374151",
    lineHeight: "1.6"
  },
  reasonBox: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    border: "1px solid #fecaca"
  },
  alternativeSection: {
    backgroundColor: "#f0fdf4",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #bbf7d0"
  },
  alternativeList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  alternativeItem: {
    fontSize: "14px",
    color: "#166534",
    fontWeight: "500"
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
