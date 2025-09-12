import React, { useState } from "react";

export default function AlertStatusWidget() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const alerts = [
    {
      id: 1,
      type: "Restricted Zone",
      location: "Bandipur Tiger Reserve",
      tourists: 3,
      severity: "high",
      time: "12 min ago"
    },
    {
      id: 2,
      type: "Medical",
      location: "Goa Beach Area 4",
      tourists: 1,
      severity: "medium",
      time: "34 min ago"
    },
    {
      id: 3,
      type: "Weather",
      location: "Manali Ridge Pass",
      tourists: 8,
      severity: "high",
      time: "52 min ago"
    },
    {
      id: 4,
      type: "Transportation",
      location: "Darjeeling Railway",
      tourists: 12,
      severity: "low",
      time: "1h 17m ago"
    }
  ];

  // Helper to get severity color
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case "high":
        return {
          color: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.3)"
        };
      case "medium":
        return {
          color: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          border: "1px solid rgba(245, 158, 11, 0.3)"
        };
      case "low":
        return {
          color: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.12)",
          border: "1px solid rgba(59, 130, 246, 0.3)"
        };
      default:
        return {
          color: "#6b7280",
          backgroundColor: "rgba(107, 114, 128, 0.12)",
          border: "1px solid rgba(107, 114, 128, 0.3)"
        };
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "Restricted Zone":
        return "🚫";
      case "Medical":
        return "🏥";
      case "Weather":
        return "⛈️";
      case "Transportation":
        return "🚌";
      default:
        return "⚠️";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          Recent Alerts 
          <span className="alert-badge" style={styles.alertBadge}>
            {alerts.length}
          </span>
        </h2>
        <div style={styles.actions}>
          <button style={styles.actionButton}>
            View All
          </button>
          <button style={styles.iconButton}>
            <span style={{ fontSize: "20px" }}>⚙️</span>
          </button>
        </div>
      </div>

      <div style={styles.alertsList}>
        {alerts.map((alert) => (
          <div key={alert.id} style={styles.alertItem}>
            <div style={styles.alertIconContainer}>
              <div style={{
                ...styles.alertIcon,
                ...getSeverityStyles(alert.severity)
              }}>
                {getAlertIcon(alert.type)}
              </div>
            </div>
            <div style={styles.alertContent}>
              <div style={styles.alertHeader}>
                <h4 style={styles.alertType}>{alert.type}</h4>
                <span style={{
                  ...styles.severityBadge,
                  ...getSeverityStyles(alert.severity)
                }}>
                  {alert.severity}
                </span>
              </div>
              <p style={styles.alertLocation}>{alert.location}</p>
              <div style={styles.alertFooter}>
                <span style={styles.touristCount}>
                  <span style={{ marginRight: "4px" }}>👥</span>
                  {alert.tourists} tourist{alert.tourists !== 1 ? 's' : ''}
                </span>
                <span style={styles.timestamp}>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <div style={styles.allClearStatus}>
          <div style={styles.statusIndicator}></div>
          All systems operational
        </div>
        <button style={styles.refreshButton}>
          <span style={{ marginRight: "6px", fontSize: "12px" }}>🔄</span>
          Refresh
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "24px",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)"
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  alertBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    marginLeft: "8px"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  actionButton: {
    padding: "8px 12px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e2e8f0",
      color: "#334155"
    }
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "#f1f5f9",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e2e8f0"
    }
  },
  alertsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    overflowY: "auto",
    paddingRight: "6px",
    marginBottom: "20px"
  },
  alertItem: {
    display: "flex",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f1f5f9",
      transform: "translateY(-2px)"
    }
  },
  alertIconContainer: {
    padding: "16px 0 16px 16px",
    display: "flex",
    alignItems: "flex-start"
  },
  alertIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    fontSize: "18px"
  },
  alertContent: {
    flex: 1,
    padding: "16px"
  },
  alertHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  alertType: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f172a",
    margin: 0
  },
  severityBadge: {
    fontSize: "12px",
    fontWeight: "500",
    padding: "2px 8px",
    borderRadius: "20px"
  },
  alertLocation: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 8px 0"
  },
  alertFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px"
  },
  touristCount: {
    fontSize: "13px",
    color: "#64748b",
    display: "flex",
    alignItems: "center"
  },
  timestamp: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "500"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid rgba(226, 232, 240, 0.8)"
  },
  allClearStatus: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#10b981",
    fontWeight: "500"
  },
  statusIndicator: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    marginRight: "8px"
  },
  refreshButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#e2e8f0",
      color: "#334155"
    }
  }
};
