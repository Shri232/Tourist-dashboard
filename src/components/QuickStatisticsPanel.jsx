import React from "react";

export default function QuickStatisticsPanel() {
  const todayStats = [
    {
      title: "Today's Registrations",
      value: "145",
      icon: "📝",
      trend: "+23",
      trendType: "positive",
      color: "#3b82f6"
    },
    {
      title: "Panic Button Activations",
      value: "3",
      icon: "🆘",
      trend: "-2",
      trendType: "positive",
      color: "#ef4444"
    },
    {
      title: "Incidents Resolved",
      value: "12",
      icon: "✅",
      trend: "+5",
      trendType: "positive",
      color: "#10b981"
    },
    {
      title: "Tourist Satisfaction Score",
      value: "4.2/5",
      icon: "⭐",
      trend: "+0.3",
      trendType: "positive",
      color: "#f59e0b"
    }
  ];

  const detailedStats = [
    {
      category: "Tourist Activity",
      stats: [
        { label: "Check-ins Today", value: "287", change: "+15%" },
        { label: "Active Tours", value: "24", change: "+2" },
        { label: "Guided Groups", value: "18", change: "stable" },
        { label: "Solo Travelers", value: "169", change: "+12%" }
      ]
    },
    {
      category: "Safety Metrics",
      stats: [
        { label: "Safety Score", value: "94%", change: "+2%" },
        { label: "Response Rate", value: "97%", change: "stable" },
        { label: "Incident Prevention", value: "89%", change: "+5%" },
        { label: "Equipment Status", value: "92%", change: "-1%" }
      ]
    },
    {
      category: "Resource Utilization",
      stats: [
        { label: "Staff Deployment", value: "85%", change: "+8%" },
        { label: "Vehicle Usage", value: "67%", change: "+3%" },
        { label: "Communication Channels", value: "98%", change: "stable" },
        { label: "Emergency Readiness", value: "100%", change: "stable" }
      ]
    }
  ];

  const getChangeColor = (change) => {
    if (change.includes("+")) return "#10b981";
    if (change.includes("-")) return "#ef4444";
    return "#6b7280";
  };

  const getChangeIcon = (change) => {
    if (change.includes("+")) return "📈";
    if (change.includes("-")) return "📉";
    return "➡️";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Quick Statistics Overview</h2>
      
      {/* Main Stats Cards */}
      <div style={styles.mainStatsGrid}>
        {todayStats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <span style={{...styles.statIcon, color: stat.color}}>{stat.icon}</span>
              <div style={styles.trendBadge}>
                <span style={{color: getChangeColor(stat.trend)}}>{stat.trend}</span>
              </div>
            </div>
            <div style={styles.statValue}>
              <span style={{color: stat.color}}>{stat.value}</span>
            </div>
            <div style={styles.statTitle}>{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Detailed Statistics Grid */}
      <div style={styles.detailedGrid}>
        {detailedStats.map((category, categoryIndex) => (
          <div key={categoryIndex} style={styles.categoryCard}>
            <h3 style={styles.categoryTitle}>{category.category}</h3>
            <div style={styles.categoryStats}>
              {category.stats.map((stat, statIndex) => (
                <div key={statIndex} style={styles.detailStatRow}>
                  <div style={styles.statLabelContainer}>
                    <span style={styles.statLabel}>{stat.label}</span>
                    <div style={styles.changeContainer}>
                      <span style={styles.changeIcon}>{getChangeIcon(stat.change)}</span>
                      <span style={{...styles.changeValue, color: getChangeColor(stat.change)}}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div style={styles.statValueContainer}>
                    <span style={styles.detailStatValue}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Updates Footer */}
      <div style={styles.footer}>
        <div style={styles.updateInfo}>
          <span style={styles.liveIndicator}>🟢</span>
          <span>Live data - Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <button style={styles.refreshButton}>
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: "32px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "24px"
  },
  mainStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px"
  },
  statCard: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  statHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  statIcon: {
    fontSize: "32px"
  },
  trendBadge: {
    backgroundColor: "#f3f4f6",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600"
  },
  statValue: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "8px"
  },
  statTitle: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500"
  },
  detailedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "24px"
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb"
  },
  categoryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid #e5e7eb"
  },
  categoryStats: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  detailStatRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0"
  },
  statLabelContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  statLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500"
  },
  changeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  changeIcon: {
    fontSize: "12px"
  },
  changeValue: {
    fontSize: "12px",
    fontWeight: "600"
  },
  statValueContainer: {
    textAlign: "right"
  },
  detailStatValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  },
  updateInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#6b7280"
  },
  liveIndicator: {
    fontSize: "12px",
    animation: "pulse 2s infinite"
  },
  refreshButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  }
};
