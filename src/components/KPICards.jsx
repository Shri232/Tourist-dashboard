import React from "react";

export default function KPICards() {
  const kpiData = [
    {
      title: "Total Tourists",
      value: "1,247",
      trend: "+12%",
      trendDirection: "up",
      icon: "👥",
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)"
    },
    {
      title: "Active Alerts",
      value: "3",
      trend: "-2",
      trendDirection: "down",
      icon: "🚨",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)"
    },
    {
      title: "Response Teams Available",
      value: "8/12",
      trend: "67%",
      trendDirection: "neutral",
      icon: "🚑",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)"
    },
    {
      title: "Average Response Time",
      value: "3.2 min",
      trend: "Target: 5 min",
      trendDirection: "up",
      icon: "⏱️",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)"
    }
  ];

  const getTrendIcon = (direction) => {
    switch (direction) {
      case "up": return "📈";
      case "down": return "📉";
      default: return "📊";
    }
  };

  const getTrendColor = (direction) => {
    switch (direction) {
      case "up": return "#10b981";
      case "down": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Key Performance Indicators</h2>
      <div style={styles.grid}>
        {kpiData.map((kpi, index) => (
          <div key={index} style={{...styles.card, backgroundColor: kpi.bgColor}}>
            <div style={styles.cardHeader}>
              <div style={styles.iconContainer}>
                <span style={{...styles.icon, color: kpi.color}}>{kpi.icon}</span>
              </div>
              <h3 style={styles.cardTitle}>{kpi.title}</h3>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.valueContainer}>
                <span style={{...styles.value, color: kpi.color}}>{kpi.value}</span>
                <div style={styles.trendContainer}>
                  <span style={styles.trendIcon}>{getTrendIcon(kpi.trendDirection)}</span>
                  <span style={{...styles.trend, color: getTrendColor(kpi.trendDirection)}}>
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </div>
            
            <div style={styles.cardFooter}>
              <div style={{...styles.progressBar, backgroundColor: kpi.color}}>
                <div style={{...styles.progress, width: kpi.trendDirection === "up" ? "75%" : "60%"}}></div>
              </div>
            </div>
          </div>
        ))}
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
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px"
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  icon: {
    fontSize: "24px"
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
    margin: 0
  },
  cardBody: {
    marginBottom: "16px"
  },
  valueContainer: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  value: {
    fontSize: "36px",
    fontWeight: "800",
    lineHeight: "1"
  },
  trendContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  trendIcon: {
    fontSize: "16px"
  },
  trend: {
    fontSize: "14px",
    fontWeight: "600"
  },
  cardFooter: {
    marginTop: "16px"
  },
  progressBar: {
    height: "4px",
    borderRadius: "2px",
    opacity: 0.2,
    position: "relative"
  },
  progress: {
    height: "100%",
    borderRadius: "2px",
    backgroundColor: "currentColor",
    opacity: 1
  }
};
