import React from "react";

const KPICards = () => {
  const cards = [
    {
      id: 1,
      title: "Active Tourists",
      value: "2,847",
      change: "+12.5%",
      positive: true,
      icon: "👥",
      color: "#10b981",
      secondaryColor: "#dcfce7"
    },
    {
      id: 2,
      title: "Restricted Zone Alerts",
      value: "37",
      change: "-5.2%",
      positive: true,
      icon: "⚠️",
      color: "#f59e0b",
      secondaryColor: "#fef3c7"
    },
    {
      id: 3,
      title: "Emergency Responses",
      value: "18",
      change: "+3.1%",
      positive: false,
      icon: "🚨",
      color: "#ef4444",
      secondaryColor: "#fee2e2"
    },
    {
      id: 4,
      title: "Satisfaction Score",
      value: "96%",
      change: "+2.4%",
      positive: true,
      icon: "⭐",
      color: "#8b5cf6",
      secondaryColor: "#f3e8ff"
    }
  ];

  return (
    <div style={styles.container}>
      {cards.map((card) => (
        <div key={card.id} style={styles.card}>
          <div style={styles.cardContent}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <div 
                style={{
                  ...styles.iconBadge,
                  backgroundColor: card.secondaryColor,
                  color: card.color
                }}
              >
                <span style={styles.icon}>{card.icon}</span>
              </div>
            </div>
            
            <div style={styles.valueContainer}>
              <h2 style={styles.cardValue}>{card.value}</h2>
              <span 
                style={{
                  ...styles.changeIndicator,
                  color: card.positive ? "#10b981" : "#ef4444",
                  backgroundColor: card.positive ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)"
                }}
              >
                {card.positive ? "↑" : "↓"} {card.change}
              </span>
            </div>
            
            <div 
              style={{
                ...styles.progressBar,
                backgroundColor: card.secondaryColor
              }}
            >
              <div 
                style={{
                  ...styles.progressFill,
                  backgroundColor: card.color,
                  width: `${Math.min(Math.abs(parseFloat(card.change)) * 3, 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "12px",
    position: "relative",
    zIndex: 1
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    padding: "24px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)"
    }
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px"
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#64748b",
    margin: "0",
    letterSpacing: "0.3px"
  },
  iconBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    padding: "8px"
  },
  icon: {
    fontSize: "16px",
    lineHeight: "1"
  },
  valueContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginBottom: "16px"
  },
  cardValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0",
    letterSpacing: "-0.5px"
  },
  changeIndicator: {
    fontSize: "13px",
    fontWeight: "600",
    padding: "3px 8px",
    borderRadius: "6px",
    display: "inline-block"
  },
  progressBar: {
    height: "6px",
    borderRadius: "3px",
    overflow: "hidden",
    marginTop: "auto"
  },
  progressFill: {
    height: "100%",
    borderRadius: "3px"
  },
  
  // Responsive design
  "@media (max-width: 1280px)": {
    container: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px"
    }
  },
  "@media (max-width: 640px)": {
    container: {
      gridTemplateColumns: "1fr",
      gap: "16px"
    },
    card: {
      padding: "20px"
    }
  }
};

export default KPICards;
