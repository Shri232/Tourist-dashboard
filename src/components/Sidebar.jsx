import React from "react";

export default function Sidebar({ selected, setSelected }) {
  const menuSections = [
    {
      title: "Main Navigation",
      items: [
        { name: "Dashboard", icon: "📊", description: "Overview & Analytics" },
        { name: "Live Map", icon: "🗺️", description: "Real-time Location Tracking" },
        { name: "Tourist Registry", icon: "👥", description: "Visitor Management" },
        { name: "Active Incidents", icon: "🚨", description: "Emergency Response" }
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Reports & Analytics", icon: "📈", description: "Data Insights" },
        { name: "Resource Management", icon: "🏪", description: "Asset Tracking" },
        { name: "Restricted Zones", icon: "⛔", description: "Area Management" },
        { name: "Alerts", icon: "🔔", description: "Notification Center" }
      ]
    },
    {
      title: "System",
      items: [
        { name: "Settings", icon: "⚙️", description: "System Configuration" },
        { name: "Help & Support", icon: "❓", description: "Documentation & Help" }
      ]
    }
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.title}>Control Panel</h2>
        <div style={styles.subtitle}>Navigation Menu</div>
      </div>
      
      {menuSections.map((section, sectionIndex) => (
        <div key={section.title} style={styles.section}>
          <h3 style={styles.sectionTitle}>{section.title}</h3>
          <ul style={styles.ul}>
            {section.items.map((item) => (
              <li
                key={item.name}
                style={{
                  ...styles.li,
                  ...(selected === item.name ? styles.liActive : {})
                }}
                onClick={() => setSelected(item.name)}
                title={item.description}
              >
                <span style={styles.icon}>{item.icon}</span>
                <div style={styles.itemContent}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemDescription}>{item.description}</span>
                </div>
                {selected === item.name && (
                  <span style={styles.activeIndicator}>▶</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {/* Quick Stats Section */}
      <div style={styles.statsSection}>
        <h3 style={styles.sectionTitle}>Quick Stats</h3>
        <div style={styles.statItem}>
          <span style={styles.statIcon}>👥</span>
          <div>
            <div style={styles.statNumber}>247</div>
            <div style={styles.statLabel}>Active Tourists</div>
          </div>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statIcon}>🚨</span>
          <div>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>Active Alerts</div>
          </div>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statIcon}>🗺️</span>
          <div>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>Zones Monitored</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    backgroundColor: "#1f2937",
    color: "white",
    minHeight: "calc(100vh - 80px)",
    padding: "0",
    overflowY: "auto",
    borderRight: "1px solid #374151"
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #374151",
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 4px 0",
    color: "#f9fafb"
  },
  subtitle: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0
  },
  section: {
    marginBottom: "8px"
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "16px 20px 8px 20px",
    margin: 0
  },
  ul: {
    listStyle: "none",
    margin: 0,
    padding: "0 8px"
  },
  li: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    margin: "2px 0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
    gap: "12px"
  },
  liActive: {
    backgroundColor: "#3b82f6",
    color: "white",
    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
    transform: "translateX(4px)"
  },
  icon: {
    fontSize: "18px",
    minWidth: "20px",
    textAlign: "center"
  },
  itemContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  itemName: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.2"
  },
  itemDescription: {
    fontSize: "11px",
    color: "#9ca3af",
    lineHeight: "1.2"
  },
  activeIndicator: {
    fontSize: "12px",
    color: "white"
  },
  statsSection: {
    margin: "24px 0 0 0",
    padding: "20px",
    borderTop: "1px solid #374151",
    backgroundColor: "#111827"
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(75, 85, 99, 0.3)"
  },
  statIcon: {
    fontSize: "16px",
    minWidth: "20px"
  },
  statNumber: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#f9fafb",
    lineHeight: "1"
  },
  statLabel: {
    fontSize: "11px",
    color: "#9ca3af",
    lineHeight: "1"
  }
};
