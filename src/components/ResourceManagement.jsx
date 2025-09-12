import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

export default function ResourceManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResources, setSelectedResources] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    status: "all",
    location: "all",
    priority: "all"
  });

  // Resource management data
  const [resourcesData, setResourcesData] = useState([
    {
      id: "RES-2025-001",
      name: "Search & Rescue Helicopter",
      category: "Emergency Vehicle",
      type: "Aircraft",
      status: "Active",
      location: "Base Station Alpha",
      coordinates: { lat: 28.6139, lng: 77.209 },
      availability: "Available",
      capacity: "8 persons",
      operator: "SAR Team Alpha",
      lastMaintenance: "2025-09-01",
      nextMaintenance: "2025-10-01",
      utilizationRate: 85,
      costPerHour: "$2,500",
      totalOperatingHours: 1250,
      fuel: "85%",
      condition: "Excellent",
      certifications: ["Air Rescue", "Medical Transport", "Night Operations"],
      equipment: ["Winch System", "Medical Kit", "GPS Navigation", "Communication Radio"],
      assignedIncidents: ["INC-2025-0234"],
      maintenanceHistory: [
        { date: "2025-09-01", type: "Routine", description: "Monthly inspection and service" },
        { date: "2025-08-15", type: "Repair", description: "Navigation system update" }
      ],
      priority: "High",
      emergencyContact: "+1-555-RESCUE",
      insurancePolicy: "AIR-INS-2025-001"
    },
    {
      id: "RES-2025-002",
      name: "Medical Ambulance Unit 3",
      category: "Emergency Vehicle",
      type: "Ground Vehicle",
      status: "In Use",
      location: "Zone B-3 Hospital",
      coordinates: { lat: 19.076, lng: 72.8777 },
      availability: "In Transit",
      capacity: "4 persons + crew",
      operator: "Paramedic Team Beta",
      lastMaintenance: "2025-08-28",
      nextMaintenance: "2025-09-28",
      utilizationRate: 92,
      costPerHour: "$150",
      totalOperatingHours: 8450,
      fuel: "70%",
      condition: "Good",
      certifications: ["Emergency Medical", "Cardiac Life Support", "Trauma Response"],
      equipment: ["Defibrillator", "Oxygen Tanks", "Trauma Kit", "Stretcher"],
      assignedIncidents: ["INC-2025-0235"],
      maintenanceHistory: [
        { date: "2025-08-28", type: "Routine", description: "Engine service and equipment check" },
        { date: "2025-08-10", type: "Repair", description: "Defibrillator calibration" }
      ],
      priority: "Critical",
      emergencyContact: "+1-555-MEDIC",
      insurancePolicy: "VEH-INS-2025-002"
    },
    {
      id: "RES-2025-003",
      name: "Emergency Shelter A",
      category: "Infrastructure",
      type: "Emergency Facility",
      status: "Active",
      location: "Valley Emergency Center",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      availability: "75% Capacity",
      capacity: "200 persons",
      operator: "Emergency Management Team",
      lastMaintenance: "2025-09-05",
      nextMaintenance: "2025-12-05",
      utilizationRate: 45,
      costPerHour: "$50",
      totalOperatingHours: 2190,
      fuel: "Generator: 90%",
      condition: "Excellent",
      certifications: ["Emergency Shelter", "Food Service", "Medical Station"],
      equipment: ["Beds", "Kitchen Facility", "First Aid Station", "Communication Center"],
      assignedIncidents: ["INC-2025-0236"],
      maintenanceHistory: [
        { date: "2025-09-05", type: "Routine", description: "Facility inspection and cleaning" },
        { date: "2025-08-20", type: "Upgrade", description: "Kitchen equipment upgrade" }
      ],
      priority: "Medium",
      emergencyContact: "+1-555-SHELTER",
      insurancePolicy: "FAC-INS-2025-003"
    },
    {
      id: "RES-2025-004",
      name: "K9 Search Team Unit 2",
      category: "Specialized Team",
      type: "Search & Rescue",
      status: "Available",
      location: "Training Facility",
      coordinates: { lat: 28.5355, lng: 77.3910 },
      availability: "Ready",
      capacity: "3 dogs + 2 handlers",
      operator: "K9 Handler Team",
      lastMaintenance: "2025-09-03",
      nextMaintenance: "2025-09-17",
      utilizationRate: 68,
      costPerHour: "$200",
      totalOperatingHours: 950,
      fuel: "N/A",
      condition: "Excellent",
      certifications: ["Search & Rescue", "Avalanche Rescue", "Wilderness Tracking"],
      equipment: ["GPS Collars", "First Aid Kit", "Communication Radio", "Tracking Gear"],
      assignedIncidents: [],
      maintenanceHistory: [
        { date: "2025-09-03", type: "Training", description: "Weekly training and health check" },
        { date: "2025-08-27", type: "Medical", description: "Veterinary checkup for all dogs" }
      ],
      priority: "High",
      emergencyContact: "+1-555-K9TEAM",
      insurancePolicy: "TEAM-INS-2025-004"
    },
    {
      id: "RES-2025-005",
      name: "Communication Tower North",
      category: "Infrastructure",
      type: "Communication Equipment",
      status: "Active",
      location: "North Ridge Communication Site",
      coordinates: { lat: 28.8041, lng: 77.2025 },
      availability: "Operational",
      capacity: "50 simultaneous channels",
      operator: "Communication Team",
      lastMaintenance: "2025-08-30",
      nextMaintenance: "2025-11-30",
      utilizationRate: 75,
      costPerHour: "$25",
      totalOperatingHours: 65000,
      fuel: "Backup Power: 95%",
      condition: "Good",
      certifications: ["Emergency Communication", "Weather Monitoring", "GPS Relay"],
      equipment: ["Radio Repeater", "Weather Station", "Backup Generator", "Satellite Link"],
      assignedIncidents: ["INC-2025-0234", "INC-2025-0236"],
      maintenanceHistory: [
        { date: "2025-08-30", type: "Routine", description: "Antenna alignment and signal check" },
        { date: "2025-08-15", type: "Upgrade", description: "Software update for weather monitoring" }
      ],
      priority: "High",
      emergencyContact: "+1-555-COMMS",
      insurancePolicy: "INF-INS-2025-005"
    },
    {
      id: "RES-2025-006",
      name: "Emergency Supply Cache Delta",
      category: "Equipment",
      type: "Supply Storage",
      status: "Stocked",
      location: "Mountain Trail Cache Point",
      coordinates: { lat: 28.6500, lng: 77.1800 },
      availability: "Full Stock",
      capacity: "500 emergency kits",
      operator: "Supply Management Team",
      lastMaintenance: "2025-09-04",
      nextMaintenance: "2025-12-04",
      utilizationRate: 30,
      costPerHour: "$10",
      totalOperatingHours: 8760,
      fuel: "N/A",
      condition: "Good",
      certifications: ["Emergency Supplies", "First Aid", "Survival Equipment"],
      equipment: ["First Aid Kits", "Emergency Blankets", "Water Purification", "Emergency Food"],
      assignedIncidents: [],
      maintenanceHistory: [
        { date: "2025-09-04", type: "Inventory", description: "Quarterly inventory and restocking" },
        { date: "2025-06-04", type: "Routine", description: "Cache inspection and organization" }
      ],
      priority: "Medium",
      emergencyContact: "+1-555-SUPPLY",
      insurancePolicy: "SUP-INS-2025-006"
    }
  ]);

  // Filter data
  const filteredData = resourcesData.filter(resource => {
    if (selectedTab === "vehicles" && resource.category !== "Emergency Vehicle") return false;
    if (selectedTab === "equipment" && resource.category !== "Equipment") return false;
    if (selectedTab === "infrastructure" && resource.category !== "Infrastructure") return false;
    if (selectedTab === "teams" && resource.category !== "Specialized Team") return false;
    
    if (filterOptions.category !== "all" && resource.category !== filterOptions.category) return false;
    if (filterOptions.status !== "all" && resource.status !== filterOptions.status) return false;
    if (filterOptions.priority !== "all" && resource.priority !== filterOptions.priority) return false;
    
    return true;
  });

  // Statistics
  const stats = {
    total: resourcesData.length,
    active: resourcesData.filter(r => r.status === "Active").length,
    inUse: resourcesData.filter(r => r.status === "In Use").length,
    maintenance: resourcesData.filter(r => r.status === "Maintenance").length,
    avgUtilization: Math.round(resourcesData.reduce((sum, r) => sum + r.utilizationRate, 0) / resourcesData.length),
    totalCost: resourcesData.reduce((sum, r) => sum + parseInt(r.costPerHour.replace(/[$,]/g, '')), 0)
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
          checked={selectedResources.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedResources([...selectedResources, row.id]);
            } else {
              setSelectedResources(selectedResources.filter(id => id !== row.id));
            }
          }}
        />
      )
    },
    { key: "id", label: "Resource ID", sortable: true },
    { 
      key: "name", 
      label: "Resource Name", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.nameCell}>
          <div style={styles.resourceIcon}>
            {row.category === "Emergency Vehicle" ? "🚗" : 
             row.category === "Infrastructure" ? "🏢" :
             row.category === "Equipment" ? "📦" : "👥"}
          </div>
          <div>
            <div style={styles.resourceName}>{value}</div>
            <div style={styles.resourceInfo}>{row.type} • {row.category}</div>
          </div>
        </div>
      )
    },
    { key: "category", label: "Category", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value) => (
        <span style={{
          ...styles.statusBadge,
          backgroundColor: 
            value === "Active" ? "#dcfce7" :
            value === "In Use" ? "#dbeafe" :
            value === "Maintenance" ? "#fef3c7" : "#f3f4f6",
          color:
            value === "Active" ? "#166534" :
            value === "In Use" ? "#1e40af" :
            value === "Maintenance" ? "#d97706" : "#6b7280"
        }}>
          {value}
        </span>
      )
    },
    { key: "location", label: "Location", sortable: true },
    { key: "availability", label: "Availability", sortable: true },
    { 
      key: "utilizationRate", 
      label: "Utilization", 
      sortable: true,
      render: (value) => (
        <div style={styles.utilizationCell}>
          <div style={styles.utilizationBar}>
            <div style={{
              ...styles.utilizationProgress,
              width: `${value}%`,
              backgroundColor: value >= 80 ? "#ef4444" : value >= 60 ? "#f59e0b" : "#10b981"
            }}></div>
          </div>
          <span style={styles.utilizationText}>{value}%</span>
        </div>
      )
    },
    { key: "costPerHour", label: "Cost/Hour", sortable: true },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (value, row) => (
        <div style={styles.actionButtons}>
          <button
            style={styles.viewButton}
            onClick={() => {
              setSelectedResource(row);
              setShowDetailsModal(true);
            }}
          >
            👁️ View
          </button>
          <button style={styles.editButton}>✏️ Edit</button>
          <button style={styles.deployButton}>🚀 Deploy</button>
        </div>
      )
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>🏪 Resource Management</h1>
          <p style={styles.subtitle}>Asset tracking and resource allocation system</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add Resource
          </button>
          <button style={styles.maintenanceButton}>🔧 Schedule Maintenance</button>
          <button style={styles.reportButton}>📊 Generate Report</button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🏪</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Resources</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.active}</div>
            <div style={styles.statLabel}>Active</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🔄</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.inUse}</div>
            <div style={styles.statLabel}>In Use</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🔧</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.maintenance}</div>
            <div style={styles.statLabel}>Maintenance</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.avgUtilization}%</div>
            <div style={styles.statLabel}>Avg Utilization</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>${stats.totalCost.toLocaleString()}</div>
            <div style={styles.statLabel}>Total Cost/Hour</div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div style={styles.controlsSection}>
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { key: "all", label: "All Resources", count: stats.total },
            { key: "vehicles", label: "Vehicles", count: resourcesData.filter(r => r.category === "Emergency Vehicle").length },
            { key: "equipment", label: "Equipment", count: resourcesData.filter(r => r.category === "Equipment").length },
            { key: "infrastructure", label: "Infrastructure", count: resourcesData.filter(r => r.category === "Infrastructure").length },
            { key: "teams", label: "Teams", count: resourcesData.filter(r => r.category === "Specialized Team").length }
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
            value={filterOptions.category}
            onChange={(e) => setFilterOptions({...filterOptions, category: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            <option value="Emergency Vehicle">Emergency Vehicle</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Equipment">Equipment</option>
            <option value="Specialized Team">Specialized Team</option>
          </select>

          <select
            value={filterOptions.status}
            onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Available">Available</option>
          </select>

          <select
            value={filterOptions.priority}
            onChange={(e) => setFilterOptions({...filterOptions, priority: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedResources.length > 0 && (
          <div style={styles.bulkActionsContainer}>
            <span style={styles.bulkActionsLabel}>
              {selectedResources.length} resources selected
            </span>
            <button style={styles.bulkActionButton}>🔧 Schedule Maintenance</button>
            <button style={styles.bulkActionButton}>🚀 Deploy All</button>
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
          title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Resources`}
          showSearch={true}
          showExport={true}
          showDateRange={true}
          itemsPerPage={10}
        />
      </div>

      {/* Resource Details Modal */}
      {showDetailsModal && selectedResource && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Resource Details</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.resourceDetailsGrid}>
                <div style={styles.detailsColumn}>
                  <h3>Basic Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Resource ID:</span>
                    <span style={styles.detailValue}>{selectedResource.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Name:</span>
                    <span style={styles.detailValue}>{selectedResource.name}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Category:</span>
                    <span style={styles.detailValue}>{selectedResource.category}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Type:</span>
                    <span style={styles.detailValue}>{selectedResource.type}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Status:</span>
                    <span style={styles.detailValue}>{selectedResource.status}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Priority:</span>
                    <span style={styles.detailValue}>{selectedResource.priority}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Operational Details</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Location:</span>
                    <span style={styles.detailValue}>{selectedResource.location}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Availability:</span>
                    <span style={styles.detailValue}>{selectedResource.availability}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Capacity:</span>
                    <span style={styles.detailValue}>{selectedResource.capacity}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Operator:</span>
                    <span style={styles.detailValue}>{selectedResource.operator}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Utilization Rate:</span>
                    <span style={styles.detailValue}>{selectedResource.utilizationRate}%</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Cost per Hour:</span>
                    <span style={styles.detailValue}>{selectedResource.costPerHour}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Maintenance & Condition</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Condition:</span>
                    <span style={styles.detailValue}>{selectedResource.condition}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Last Maintenance:</span>
                    <span style={styles.detailValue}>{selectedResource.lastMaintenance}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Next Maintenance:</span>
                    <span style={styles.detailValue}>{selectedResource.nextMaintenance}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Operating Hours:</span>
                    <span style={styles.detailValue}>{selectedResource.totalOperatingHours.toLocaleString()}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Fuel/Power:</span>
                    <span style={styles.detailValue}>{selectedResource.fuel}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Equipment & Certifications</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Certifications:</span>
                    <div style={styles.certificationsList}>
                      {selectedResource.certifications.map((cert, index) => (
                        <span key={index} style={styles.certificationBadge}>{cert}</span>
                      ))}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Equipment:</span>
                    <div style={styles.equipmentList}>
                      {selectedResource.equipment.map((item, index) => (
                        <span key={index} style={styles.equipmentItem}>• {item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.actionButton}>🚀 Deploy Resource</button>
              <button style={styles.actionButton}>🔧 Schedule Maintenance</button>
              <button style={styles.actionButton}>📊 View Analytics</button>
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
  addButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  maintenanceButton: {
    padding: "12px 24px",
    backgroundColor: "#f59e0b",
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
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6"
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
    backgroundColor: "#dbeafe",
    borderRadius: "8px",
    border: "1px solid #93c5fd",
    flexWrap: "wrap"
  },
  bulkActionsLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e40af"
  },
  bulkActionButton: {
    padding: "6px 12px",
    backgroundColor: "#3b82f6",
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
  resourceIcon: {
    fontSize: "20px",
    backgroundColor: "#f3f4f6",
    padding: "8px",
    borderRadius: "50%",
    minWidth: "36px",
    textAlign: "center"
  },
  resourceName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  resourceInfo: {
    fontSize: "12px",
    color: "#6b7280"
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  },
  utilizationCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  utilizationBar: {
    width: "60px",
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden"
  },
  utilizationProgress: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  utilizationText: {
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
  deployButton: {
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
    maxHeight: "60vh",
    overflowY: "auto"
  },
  resourceDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  detailsColumn: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "8px"
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb"
  },
  detailLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#6b7280",
    minWidth: "120px"
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "right"
  },
  certificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  certificationBadge: {
    fontSize: "11px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "2px 8px",
    borderRadius: "12px",
    fontWeight: "500"
  },
  equipmentList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  equipmentItem: {
    fontSize: "12px",
    color: "#374151"
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
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  }
};
