import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";

// Function to generate large dataset of tourists
const generateMockTouristData = (count = 1000) => {
  const nationalities = ["USA", "UK", "France", "Germany", "Japan", "Canada", "Australia", 
    "China", "India", "Brazil", "Mexico", "Spain", "Italy", "Russia", "South Korea"];
  const maleFirstNames = ["John", "Michael", "Robert", "David", "James", "William", "Richard", 
    "Thomas", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", 
    "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Jason"];
  const femaleFirstNames = ["Mary", "Jennifer", "Linda", "Patricia", "Elizabeth", "Susan", 
    "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Sandra", "Margaret", "Ashley", 
    "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Dorothy", "Melissa", "Deborah"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", 
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", 
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White"];
  const locations = ["Zone A-1", "Zone A-2", "Zone A-3", "Zone B-1", "Zone B-2", "Zone B-3", 
    "Zone C-1", "Zone C-2", "Zone C-3", "Zone D-1", "Zone D-2", "Zone D-3", "Zone E-1", "Zone E-2"];
  const accommodations = ["Hotel Grand Palace", "Resort Paradise", "Budget Inn", "Luxury Resort", 
    "Traditional Inn", "Mountain View Lodge", "Seaside Resort", "City Center Hotel", 
    "Traveler's Lodge", "Heritage Stay", "Backpacker's Hostel", "Executive Suites"];
  const purposes = ["Tourism", "Business", "Cultural Exchange", "Education", "Medical", 
    "Adventure Sports", "Religious Pilgrimage", "Family Visit", "Conference", "Research"];
  const statuses = ["Active", "Active", "Active", "Active", "Check-in Pending", "Alert", "Checked Out"]; // Weighted for more active entries
  const riskLevels = ["Low", "Low", "Low", "Medium", "Medium", "High"];
  const insurances = ["Travel Guard Plus", "Global Health Cover", "EU Travel Insurance", 
    "Premium Travel Cover", "Asia Travel Protection", "World Traveler Insurance", "SafeJourney Plan"];
  const devices = ["GPS Tracker", "Emergency Button", "Medical Alert", "Satellite Phone", "Personal Locator"];
  const specialNeeds = ["None", "None", "None", "Vegetarian meals", "Mobility assistance", 
    "Language assistance", "Medical requirements", "Religious accommodation", "Allergy considerations"];

  const generateID = (index) => `TR-2025-${(1000 + index).toString().padStart(4, '0')}`;
  
  const generatePassport = (nationality) => {
    const countryCode = nationality.substring(0, 2).toUpperCase();
    const numbers = Math.floor(Math.random() * 90000000) + 10000000;
    return `${countryCode}${numbers}`;
  };
  
  const generateSafetyScore = (riskLevel) => {
    if (riskLevel === "Low") return Math.floor(Math.random() * 15) + 85; // 85-99
    if (riskLevel === "Medium") return Math.floor(Math.random() * 15) + 70; // 70-84
    return Math.floor(Math.random() * 20) + 50; // 50-69 for High
  };
  
  const generateDate = () => {
    const start = new Date(2025, 8, 1); // Sept 1, 2025
    const end = new Date(2025, 9, 15);  // Oct 15, 2025
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };
  
  const generateCheckOutDate = (checkInDate) => {
    const checkIn = new Date(checkInDate);
    const stayDuration = Math.floor(Math.random() * 14) + 3; // 3-16 days stay
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + stayDuration);
    return checkOut.toISOString().split('T')[0];
  };

  const generateEmail = (firstName, lastName) => {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  };
  
  const generatePhoneNumber = (nationality) => {
    const countryPrefixes = {
      "USA": "+1",
      "UK": "+44",
      "France": "+33",
      "Germany": "+49",
      "Japan": "+81",
      "Canada": "+1",
      "Australia": "+61",
      "China": "+86",
      "India": "+91",
      "Brazil": "+55",
      "Mexico": "+52",
      "Spain": "+34",
      "Italy": "+39",
      "Russia": "+7",
      "South Korea": "+82"
    };
    const prefix = countryPrefixes[nationality] || "+1";
    const number = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `${prefix}-${number.toString().substring(0, 3)}-${number.toString().substring(3, 6)}-${number.toString().substring(6)}`;
  };
  
  const randomDeviceArray = () => {
    const numDevices = Math.floor(Math.random() * 3) + 1;
    const selectedDevices = [];
    for (let i = 0; i < numDevices; i++) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      if (!selectedDevices.includes(device)) selectedDevices.push(device);
    }
    return selectedDevices;
  };

  const tourists = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? "Male" : "Female";
    const firstName = gender === "Male" 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const checkIn = generateDate();
    const checkOut = generateCheckOutDate(checkIn);
    const age = Math.floor(Math.random() * 50) + 18; // 18-67 years old
    
    tourists.push({
      id: generateID(i),
      name: `${firstName} ${lastName}`,
      nationality: nationality,
      passport: generatePassport(nationality),
      checkIn: checkIn,
      checkOut: checkOut,
      location: locations[Math.floor(Math.random() * locations.length)],
      safetyScore: generateSafetyScore(riskLevel),
      contact: generatePhoneNumber(nationality),
      email: generateEmail(firstName, lastName),
      status: status,
      emergencyContact: `${lastNames[Math.floor(Math.random() * lastNames.length)]} - ${generatePhoneNumber(nationality)}`,
      accommodation: accommodations[Math.floor(Math.random() * accommodations.length)],
      groupSize: Math.floor(Math.random() * 5) + 1,
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      lastSeen: `2025-09-${Math.floor(Math.random() * 14) + 1} ${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
      riskLevel: riskLevel,
      violations: riskLevel === "Low" ? 0 : riskLevel === "Medium" ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3) + 1,
      age: age,
      gender: gender,
      specialNeeds: specialNeeds[Math.floor(Math.random() * specialNeeds.length)],
      insurance: insurances[Math.floor(Math.random() * insurances.length)],
      guidedTour: Math.random() > 0.6 ? "Yes" : "No",
      devices: randomDeviceArray()
    });
  }
  
  // Add original sample tourists to ensure they're included
  const originalTourists = [
    {
      id: "TR-2024-0891",
      name: "John Smith",
      nationality: "USA",
      passport: "US123456789",
      checkIn: "2025-09-01",
      checkOut: "2025-09-10",
      location: "Zone A-7",
      safetyScore: 85,
      contact: "+1-555-0123",
      email: "john.smith@email.com",
      status: "Active",
      emergencyContact: "Jane Smith - +1-555-0124",
      accommodation: "Hotel Grand Palace",
      groupSize: 2,
      purpose: "Tourism",
      lastSeen: "2025-09-04 14:30",
      riskLevel: "Low",
      violations: 0,
      age: 35,
      gender: "Male",
      specialNeeds: "None",
      insurance: "Travel Guard Plus",
      guidedTour: "Yes",
      devices: ["GPS Tracker", "Emergency Button"]
    },
    {
      id: "TR-2024-0892",
      name: "Emma Johnson",
      nationality: "UK",
      passport: "UK987654321",
      checkIn: "2025-09-02",
      checkOut: "2025-09-12",
      location: "Zone B-3",
      safetyScore: 92,
      contact: "+44-20-7946-0958",
      email: "emma.j@email.com",
      status: "Active",
      emergencyContact: "Michael Johnson - +44-20-7946-0959",
      accommodation: "Resort Paradise",
      groupSize: 1,
      purpose: "Business",
      lastSeen: "2025-09-04 15:45",
      riskLevel: "Low",
      violations: 0,
      age: 28,
      gender: "Female",
      specialNeeds: "Vegetarian meals",
      insurance: "Global Health Cover",
      guidedTour: "No",
      devices: ["GPS Tracker"]
    },
    {
      id: "TR-2024-0893",
      name: "Pierre Dubois",
      nationality: "France",
      passport: "FR456789123",
      checkIn: "2025-09-02",
      checkOut: "2025-09-08",
      location: "Zone C-1",
      safetyScore: 78,
      contact: "+33-1-42-86-83-26",
      email: "pierre.d@email.com",
      status: "Alert",
      emergencyContact: "Marie Dubois - +33-1-42-86-83-27",
      accommodation: "Budget Inn",
      groupSize: 4,
      purpose: "Tourism",
      lastSeen: "2025-09-04 12:15",
      riskLevel: "Medium",
      violations: 1,
      age: 42,
      gender: "Male",
      specialNeeds: "Mobility assistance",
      insurance: "EU Travel Insurance",
      guidedTour: "Yes",
      devices: ["GPS Tracker", "Emergency Button", "Medical Alert"]
    },
    {
      id: "TR-2024-0894",
      name: "Anna Mueller",
      nationality: "Germany",
      passport: "DE789123456",
      checkIn: "2025-09-03",
      checkOut: "2025-09-15",
      location: "Zone A-2",
      safetyScore: 95,
      contact: "+49-30-12345678",
      email: "anna.m@email.com",
      status: "Active",
      emergencyContact: "Hans Mueller - +49-30-12345679",
      accommodation: "Luxury Resort",
      groupSize: 2,
      purpose: "Tourism",
      lastSeen: "2025-09-04 16:00",
      riskLevel: "Low",
      violations: 0,
      age: 31,
      gender: "Female",
      specialNeeds: "None",
      insurance: "Premium Travel Cover",
      guidedTour: "Yes",
      devices: ["GPS Tracker", "Emergency Button"]
    },
    {
      id: "TR-2024-0895",
      name: "Yuki Tanaka",
      nationality: "Japan",
      passport: "JP321654987",
      checkIn: "2025-09-04",
      checkOut: "2025-09-11",
      location: "Zone D-5",
      safetyScore: 88,
      contact: "+81-3-1234-5678",
      email: "yuki.t@email.com",
      status: "Check-in Pending",
      emergencyContact: "Hiroshi Tanaka - +81-3-1234-5679",
      accommodation: "Traditional Inn",
      groupSize: 1,
      purpose: "Cultural Exchange",
      lastSeen: "2025-09-04 09:30",
      riskLevel: "Low",
      violations: 0,
      age: 26,
      gender: "Female",
      specialNeeds: "Language assistance",
      insurance: "Asia Travel Protection",
      guidedTour: "No",
      devices: ["GPS Tracker"]
    }
  ];
  
  return [...originalTourists, ...tourists];
};

export default function TouristRegistryManagement() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedTourists, setSelectedTourists] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    nationality: "all",
    safetyLevel: "all",
    status: "all",
    zone: "all"
  });

  // Generate 1000+ tourists with many active ones
  const [touristsData, setTouristsData] = useState(generateMockTouristData(1200));

  // Filter data based on selected tab and filters
  const filteredData = touristsData.filter(tourist => {
    // Tab filtering
    if (selectedTab === "active" && tourist.status !== "Active") return false;
    if (selectedTab === "checkin" && tourist.status !== "Check-in Pending") return false;
    if (selectedTab === "alert" && tourist.status !== "Alert") return false;
    if (selectedTab === "checkout" && tourist.status !== "Checked Out") return false;
    
    // Additional filters
    if (filterOptions.nationality !== "all" && tourist.nationality !== filterOptions.nationality) return false;
    if (filterOptions.safetyLevel !== "all") {
      if (filterOptions.safetyLevel === "high" && tourist.safetyScore < 90) return false;
      if (filterOptions.safetyLevel === "medium" && (tourist.safetyScore < 70 || tourist.safetyScore >= 90)) return false;
      if (filterOptions.safetyLevel === "low" && tourist.safetyScore >= 70) return false;
    }
    if (filterOptions.status !== "all" && tourist.status !== filterOptions.status) return false;
    
    return true;
  });

  // Statistics
  const stats = {
    total: touristsData.length,
    active: touristsData.filter(t => t.status === "Active").length,
    checkIn: touristsData.filter(t => t.status === "Check-in Pending").length,
    alert: touristsData.filter(t => t.status === "Alert").length,
    checkOut: touristsData.filter(t => t.status === "Checked Out").length,
    avgSafetyScore: Math.round(touristsData.reduce((sum, t) => sum + t.safetyScore, 0) / touristsData.length)
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
          checked={selectedTourists.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedTourists([...selectedTourists, row.id]);
            } else {
              setSelectedTourists(selectedTourists.filter(id => id !== row.id));
            }
          }}
        />
      )
    },
    { key: "id", label: "Tourist ID", sortable: true },
    { 
      key: "name", 
      label: "Name", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.nameCell}>
          <div style={styles.avatar}>
            {row.gender === "Male" ? "👨" : "👩"}
          </div>
          <div>
            <div style={styles.touristName}>{value}</div>
            <div style={styles.touristInfo}>{row.age} years • {row.nationality}</div>
          </div>
        </div>
      )
    },
    { key: "nationality", label: "Nationality", sortable: true },
    { key: "checkIn", label: "Check-in", sortable: true },
    { key: "checkOut", label: "Check-out", sortable: true },
    { key: "location", label: "Current Location", sortable: true },
    { 
      key: "safetyScore", 
      label: "Safety Score", 
      sortable: true,
      render: (value, row) => (
        <div style={styles.safetyScoreCell}>
          <div style={styles.scoreBar}>
            <div style={{
              ...styles.scoreProgress,
              width: `${value}%`,
              backgroundColor: value >= 90 ? "#10b981" : value >= 70 ? "#f59e0b" : "#ef4444"
            }}></div>
          </div>
          <span style={{
            ...styles.scoreText,
            color: value >= 90 ? "#10b981" : value >= 70 ? "#f59e0b" : "#ef4444"
          }}>
            {value}%
          </span>
        </div>
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
            value === "Alert" ? "#fef2f2" :
            value === "Check-in Pending" ? "#fef3c7" : "#f3f4f6",
          color:
            value === "Active" ? "#166534" :
            value === "Alert" ? "#dc2626" :
            value === "Check-in Pending" ? "#d97706" : "#6b7280"
        }}>
          {value}
        </span>
      )
    },
    { 
      key: "riskLevel", 
      label: "Risk Level", 
      sortable: true,
      render: (value) => (
        <span style={{
          ...styles.riskBadge,
          backgroundColor: 
            value === "Low" ? "#dcfce7" :
            value === "Medium" ? "#fef3c7" : "#fef2f2",
          color:
            value === "Low" ? "#166534" :
            value === "Medium" ? "#d97706" : "#dc2626"
        }}>
          {value === "Low" ? "🟢 " : value === "Medium" ? "🟡 " : "🔴 "}
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
              setSelectedTourist(row);
              setShowDetailsModal(true);
            }}
          >
            👁️ View
          </button>
          <button style={styles.editButton}>✏️ Edit</button>
          <button style={styles.trackButton}>📍 Track</button>
        </div>
      )
    }
  ];

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on selected tourists:`, selectedTourists);
    setSelectedTourists([]);
    setShowBulkActions(false);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>👥 Tourist Registry & Visitor Management</h1>
          <p style={styles.subtitle}>Comprehensive visitor tracking and management system</p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add New Tourist
          </button>
          <button style={styles.importButton}>📤 Import Data</button>
          <button style={styles.exportButton}>📥 Export Registry</button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total Tourists</div>
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
          <div style={styles.statIcon}>🚨</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.alert}</div>
            <div style={styles.statLabel}>Alerts</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📋</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.checkIn}</div>
            <div style={styles.statLabel}>Pending Check-in</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.avgSafetyScore}%</div>
            <div style={styles.statLabel}>Avg Safety Score</div>
          </div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div style={styles.controlsSection}>
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { key: "active", label: "Active Tourists", count: stats.active },
            { key: "checkin", label: "Check-in Pending", count: stats.checkIn },
            { key: "alert", label: "Alert Status", count: stats.alert },
            { key: "all", label: "All Visitors", count: stats.total }
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

        {/* Advanced Filters */}
        <div style={styles.filtersContainer}>
          <select
            value={filterOptions.nationality}
            onChange={(e) => setFilterOptions({...filterOptions, nationality: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Nationalities</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
          </select>

          <select
            value={filterOptions.safetyLevel}
            onChange={(e) => setFilterOptions({...filterOptions, safetyLevel: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Safety Levels</option>
            <option value="high">High (90%+)</option>
            <option value="medium">Medium (70-89%)</option>
            <option value="low">Low (&lt;70%)</option>
          </select>

          <select
            value={filterOptions.status}
            onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
            style={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Alert">Alert</option>
            <option value="Check-in Pending">Check-in Pending</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedTourists.length > 0 && (
          <div style={styles.bulkActionsContainer}>
            <span style={styles.bulkActionsLabel}>
              {selectedTourists.length} tourists selected
            </span>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('send-alert')}
            >
              📢 Send Alert
            </button>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('update-location')}
            >
              📍 Update Location
            </button>
            <button 
              style={styles.bulkActionButton}
              onClick={() => handleBulkAction('export-selected')}
            >
              📥 Export Selected
            </button>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div style={styles.tableSection}>
        <DataTable
          data={filteredData}
          columns={columns}
          title={`${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Tourists Registry`}
          showSearch={true}
          showExport={true}
          showDateRange={true}
          itemsPerPage={10}
        />
      </div>

      {/* Tourist Details Modal */}
      {showDetailsModal && selectedTourist && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailsModal(false)}>
          <div style={styles.detailsModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Tourist Details</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowDetailsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.detailsGrid}>
                <div style={styles.detailsColumn}>
                  <h3>Personal Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Full Name:</span>
                    <span style={styles.detailValue}>{selectedTourist.name}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Tourist ID:</span>
                    <span style={styles.detailValue}>{selectedTourist.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Nationality:</span>
                    <span style={styles.detailValue}>{selectedTourist.nationality}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Passport:</span>
                    <span style={styles.detailValue}>{selectedTourist.passport}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Age:</span>
                    <span style={styles.detailValue}>{selectedTourist.age} years</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Gender:</span>
                    <span style={styles.detailValue}>{selectedTourist.gender}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Contact & Emergency</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Phone:</span>
                    <span style={styles.detailValue}>{selectedTourist.contact}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Email:</span>
                    <span style={styles.detailValue}>{selectedTourist.email}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Emergency Contact:</span>
                    <span style={styles.detailValue}>{selectedTourist.emergencyContact}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Insurance:</span>
                    <span style={styles.detailValue}>{selectedTourist.insurance}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Visit Information</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Check-in:</span>
                    <span style={styles.detailValue}>{selectedTourist.checkIn}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Check-out:</span>
                    <span style={styles.detailValue}>{selectedTourist.checkOut}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Purpose:</span>
                    <span style={styles.detailValue}>{selectedTourist.purpose}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Group Size:</span>
                    <span style={styles.detailValue}>{selectedTourist.groupSize} people</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Accommodation:</span>
                    <span style={styles.detailValue}>{selectedTourist.accommodation}</span>
                  </div>
                </div>

                <div style={styles.detailsColumn}>
                  <h3>Safety & Tracking</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Current Location:</span>
                    <span style={styles.detailValue}>{selectedTourist.location}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Last Seen:</span>
                    <span style={styles.detailValue}>{selectedTourist.lastSeen}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Safety Score:</span>
                    <span style={{
                      ...styles.detailValue,
                      color: selectedTourist.safetyScore >= 90 ? "#10b981" : 
                             selectedTourist.safetyScore >= 70 ? "#f59e0b" : "#ef4444"
                    }}>
                      {selectedTourist.safetyScore}%
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Risk Level:</span>
                    <span style={styles.detailValue}>{selectedTourist.riskLevel}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Violations:</span>
                    <span style={styles.detailValue}>{selectedTourist.violations}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Devices:</span>
                    <span style={styles.detailValue}>{selectedTourist.devices.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.actionButton}>📍 Track Location</button>
              <button style={styles.actionButton}>📞 Contact Tourist</button>
              <button style={styles.actionButton}>🚨 Send Alert</button>
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
  importButton: {
    padding: "12px 24px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  exportButton: {
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
    paddingBottom: "16px"
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
    border: "1px solid #93c5fd"
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
  avatar: {
    fontSize: "20px",
    backgroundColor: "#f3f4f6",
    padding: "8px",
    borderRadius: "50%",
    minWidth: "36px",
    textAlign: "center"
  },
  touristName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937"
  },
  touristInfo: {
    fontSize: "12px",
    color: "#6b7280"
  },
  safetyScoreCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  scoreBar: {
    width: "60px",
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden"
  },
  scoreProgress: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  scoreText: {
    fontSize: "12px",
    fontWeight: "600"
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  },
  riskBadge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px"
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
  trackButton: {
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
    maxWidth: "1000px",
    width: "90%",
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
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px"
  },
  detailsColumn: {
    // Column styling handled by grid
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f3f4f6"
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
  modalActions: {
    display: "flex",
    gap: "12px",
    padding: "20px 24px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb"
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
