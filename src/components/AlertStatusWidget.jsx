import React, { useState } from "react";

export default function AlertStatusWidget() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Tourist Missing in Restricted Zone",
      location: "Zone A-7",
      timestamp: "2 min ago",
      description: "Tourist ID: TR-2024-0891 last seen near cliff area"
    },
    {
      id: 2,
      type: "warning",
      title: "Weather Alert - Heavy Rain Expected",
      location: "All Zones",
      timestamp: "15 min ago",
      description: "Monsoon warning issued for next 3 hours"
    },
    {
      id: 3,
      type: "info",
      title: "High Tourist Density Detected",
      location: "Zone B-3",
      timestamp: "32 min ago",
      description: "Crowd management may be required"
    },
    {
      id: 4,
      type: "warning",
      title: "Equipment Malfunction",
      location: "Checkpoint 5",
      timestamp: "1 hour ago",
      description: "Security camera #12 offline"
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case "critical": return "#ef4444";
      case "warning": return "#f59e0b";
      case "info": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case "critical": return "rgba(239, 68, 68, 0.1)";
      case "warning": return "rgba(245, 158, 11, 0.1)";
      case "info": return "rgba(59, 130, 246, 0.1)";
      default: return "rgba(107, 114, 128, 0.1)";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical": return "🚨";
      case "warning": return "⚠️";
      case "info": return "ℹ️";
      default: return "📋";
    }
  };

  const handleAction = (alertId, action) => {
    console.log(`${action} action taken for alert ${alertId}`);
    // In a real app, this would make API calls
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Emergency Alert Panel</h2>
        <div style={styles.controls}>
          <button 
            style={{...styles.soundButton, backgroundColor: soundEnabled ? "#10b981" : "#6b7280"}}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? "🔊" : "🔇"} Sound {soundEnabled ? "ON" : "OFF"}
          </button>
          <div style={styles.alertCount}>
            <span style={styles.countBadge}>{alerts.filter(a => a.type === "critical").length}</span>
            Critical
          </div>
        </div>
      </div>

      <div style={styles.alertList}>
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            style={{
              ...styles.alertCard,
              backgroundColor: getAlertBgColor(alert.type),
              borderLeftColor: getAlertColor(alert.type)
            }}
          >
            <div style={styles.alertHeader}>
              <div style={styles.alertInfo}>
                <span style={styles.alertIcon}>{getAlertIcon(alert.type)}</span>
                <div>
                  <h4 style={styles.alertTitle}>{alert.title}</h4>
                  <div style={styles.alertMeta}>
                    <span style={styles.location}>📍 {alert.location}</span>
                    <span style={styles.timestamp}>🕒 {alert.timestamp}</span>
                  </div>
                </div>
              </div>
              <div style={{...styles.alertPriority, color: getAlertColor(alert.type)}}>
                {alert.type.toUpperCase()}
              </div>
            </div>
            
            <p style={styles.alertDescription}>{alert.description}</p>
            
            <div style={styles.actionButtons}>
              <button 
                style={{...styles.actionBtn, ...styles.respondBtn}}
                onClick={() => handleAction(alert.id, "respond")}
              >
                🚑 Respond
              </button>
              <button 
                style={{...styles.actionBtn, ...styles.escalateBtn}}
                onClick={() => handleAction(alert.id, "escalate")}
              >
                📢 Escalate
              </button>
              <button 
                style={{...styles.actionBtn, ...styles.dismissBtn}}
                onClick={() => handleAction(alert.id, "dismiss")}
              >
                ✅ Dismiss
              </button>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  soundButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  alertCount: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },
  countBadge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700"
  },
  alertList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  alertCard: {
    padding: "20px",
    borderRadius: "12px",
    borderLeft: "4px solid",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  alertHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  alertInfo: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px"
  },
  alertIcon: {
    fontSize: "24px"
  },
  alertTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 8px 0"
  },
  alertMeta: {
    display: "flex",
    gap: "16px",
    fontSize: "12px",
    color: "#6b7280"
  },
  location: {
    fontWeight: "500"
  },
  timestamp: {
    fontWeight: "500"
  },
  alertPriority: {
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  alertDescription: {
    fontSize: "14px",
    color: "#4b5563",
    marginBottom: "16px",
    lineHeight: "1.5"
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  actionBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  respondBtn: {
    backgroundColor: "#10b981",
    color: "white"
  },
  escalateBtn: {
    backgroundColor: "#f59e0b",
    color: "white"
  },
  dismissBtn: {
    backgroundColor: "#6b7280",
    color: "white"
  }
};
