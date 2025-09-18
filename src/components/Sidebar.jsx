import React, { useState } from "react";

export default function Sidebar({ selected, setSelected }) {
  const [showTooltip, setShowTooltip] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  
  const menuSections = [
    {
      title: "Main Navigation",
      items: [
        { name: "Dashboard", icon: "📊", description: "Overview & Analytics" },
        { name: "Live Map", icon: "🗺️", description: "Risk zones & tourist locations" },
        { name: "Alerts", icon: "🚨", description: "Emergency notifications" },
        // { name: "Reports", icon: "📈", description: "Data & insights" }
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Tourist Registry", icon: "👥", description: "Visitor management" },
        // { name: "Risk Zones", icon: "⛔", description: "Restricted areas" },
        { name: "Settings", icon: "⚙️", description: "System preferences" }
      ]
    }
  ];

  return (
    <aside style={{
      ...styles.sidebar,
      width: collapsed ? "60px" : "280px"
    }}>
      {/* Toggle button */}
      <button 
        style={styles.collapseToggle}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "→" : "←"}
      </button>
      
      <div style={styles.header}>
        <h2 style={{
          ...styles.title,
          display: collapsed ? "none" : "block"
        }}>Tourist Dashboard</h2>
        <div style={{
          ...styles.subtitle,
          display: collapsed ? "none" : "block"
        }}>Safety & Management</div>
      </div>
      
      {menuSections.map((section, sectionIndex) => (
        <div key={section.title} style={styles.section}>
          {!collapsed && (
            <h3 style={styles.sectionTitle}>{section.title}</h3>
          )}
          <ul style={styles.ul}>
            {section.items.map((item) => (
              <li
                key={item.name}
                style={{
                  ...styles.li,
                  ...(selected === item.name ? styles.liActive : {}),
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "12px 0" : "12px 16px"
                }}
                onClick={() => setSelected(item.name)}
                title={collapsed ? `${item.name}: ${item.description}` : ""}
                onMouseEnter={() => collapsed && setShowTooltip(item.name)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <span style={{
                  ...styles.icon,
                  margin: collapsed ? "0" : "0 12px 0 0",
                  fontSize: collapsed ? "20px" : "18px"
                }}>{item.icon}</span>
                
                {!collapsed && (
                  <div style={styles.itemContent}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemDescription}>{item.description}</span>
                  </div>
                )}
                
                {/* Show tooltip for collapsed mode */}
                {collapsed && showTooltip === item.name && (
                  <div style={styles.tooltip}>
                    <div style={styles.tooltipName}>{item.name}</div>
                    <div style={styles.tooltipDescription}>{item.description}</div>
                  </div>
                )}
                
                {/* Active indicator */}
                {selected === item.name && !collapsed && (
                  <span style={styles.activeIndicator}>▶</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {/* Quick Stats - only in expanded mode */}
      {!collapsed && (
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
        </div>
      )}
      
      {/* Help section */}
      <div
        style={{
          ...styles.helpSection,
          padding: collapsed ? "15px 0" : "15px 20px",
          justifyContent: collapsed ? "center" : "flex-start"
        }}
        onClick={() => setSelected("Help & Support")}
      >
        <span style={styles.helpIcon}>❓</span>
        {!collapsed && <span style={styles.helpText}>Help & Support</span>}
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
    textAlign: "center",
    display: "flex",         // Better emoji alignment
    alignItems: "center",
    justifyContent: "center"
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
  },
  collapseToggle: {
    position: "absolute",
    top: "20px",
    right: "-12px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#1f2937",
    border: "2px solid #374151",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    zIndex: 10
  },
  tooltip: {
    position: "absolute",
    left: "60px",
    backgroundColor: "white",
    border: "1px solid #374151",
    borderRadius: "4px",
    padding: "8px",
    zIndex: 100,
    minWidth: "150px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  tooltipName: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "2px"
  },
  tooltipDescription: {
    fontSize: "12px",
    color: "#6b7280"
  },
  helpSection: {
    marginTop: "auto",
    padding: "15px 20px",
    borderTop: "1px solid #374151",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    color: "#d1d5db",
    backgroundColor: "#111827"
  },
  helpIcon: {
    fontSize: "18px"
  },
  helpText: {
    fontSize: "14px"
  },
  "@media (max-width: 768px)": {
    icon: {
      fontSize: "16px"       // Slightly smaller on smaller screens
    },
    statIcon: {
      fontSize: "14px"       // Smaller stat icons on mobile
    }
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)"
    },
    "50%": {
      transform: "scale(1.1)"
    },
    "100%": {
      transform: "scale(1)"
    }
  },
  "alert-emoji": {
    animation: "pulse 2s infinite"
  }
};
