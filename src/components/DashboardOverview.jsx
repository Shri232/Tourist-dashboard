import React, { useState, useEffect } from "react";
import KPICards from "./KPICards";
import AlertStatusWidget from "./AlertStatusWidget";
import QuickStatisticsPanel from "./QuickStatisticsPanel";

export default function DashboardOverview() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(null);

  // Show welcome message for first-time users
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('dashboardVisited');
    if (isFirstVisit) {
      setShowWelcome(true);
      localStorage.setItem('dashboardVisited', 'true');
    }
  }, []);

  // Simplified navigation function
  const handleMapNavigation = () => {
    try {
      // Simple approach that works in most cases
      window.location.href = window.location.origin + "/map";
    } catch (err) {
      console.error("Navigation error:", err);
      // Provide friendly error message to user
      alert("We're having trouble opening the map. Please try again.");
    }
  };

  // Navigation function for map screen (like dashboard button)
  const navigateToMap = () => {
    if (window.navigateTo) {
      window.navigateTo("/map");
    } else {
      window.location.href = window.location.origin + "/map";
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative elements */}
      <div style={styles.decorCircle}></div>
      <div style={styles.decorSquare}></div>
      
      {/* Welcome overlay for first-time users */}
      {showWelcome && (
        <div style={styles.welcomeOverlay}>
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>Welcome to Tourist Dashboard</h2>
            <p style={styles.welcomeText}>
              This dashboard helps you monitor tourist activity and safety in real-time.
              Use the map button in the bottom right to explore high-risk areas.
            </p>
            <div style={styles.welcomeFeatures}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📊</span>
                <span>View key statistics</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🚨</span>
                <span>Monitor alerts</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🗺️</span>
                <span>Explore risk zones</span>
              </div>
            </div>
            <button 
              style={styles.welcomeButton} 
              onClick={() => setShowWelcome(false)}
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      
      <div style={styles.header}>
        <h1 style={styles.title}>
          Dashboard Overview
          <span className="highlight-dot" style={{
            position: 'absolute',
            right: '-12px',
            top: '12px',
            width: '8px',
            height: '8px',
            backgroundColor: '#10b981',
            borderRadius: '50%'
          }}></span>
        </h1>
        <div style={styles.headerActions}>
          <button 
            style={styles.actionButton} 
            aria-label="Export Report"
            onMouseEnter={() => setTooltipVisible('export')}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <span style={styles.buttonIcon}>📊</span>
            <span style={styles.buttonText}>Export</span>
            {tooltipVisible === 'export' && (
              <div style={styles.tooltip}>Download dashboard as PDF report</div>
            )}
          </button>
          <button 
            style={styles.actionButton}
            aria-label="Help Guide" 
            onMouseEnter={() => setTooltipVisible('help')}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <span style={styles.buttonIcon}>❓</span>
            <span style={styles.buttonText}>Help</span>
            {tooltipVisible === 'help' && (
              <div style={styles.tooltip}>View dashboard usage guide</div>
            )}
          </button>
          <button 
            style={styles.actionButton}
            aria-label="Settings" 
            onMouseEnter={() => setTooltipVisible('settings')}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <span style={styles.buttonIcon}>⚙️</span>
            <span style={styles.buttonText}>Settings</span>
            {tooltipVisible === 'settings' && (
              <div style={styles.tooltip}>Configure dashboard preferences</div>
            )}
          </button>
        </div>
      </div>
      
      {/* KPI Status Cards with heading */}
      <div style={styles.sectionHeading}>
        <h2 style={styles.sectionTitle}>Key Performance Indicators</h2>
        <p style={styles.sectionDescription}>
          Real-time metrics of tourist activity and safety status
        </p>
      </div>
      <KPICards />
      
      {/* Two Column Layout for Alert and Statistics */}
      <div style={styles.twoColumnLayout}>
        <div style={styles.leftColumn}>
          <AlertStatusWidget />
        </div>
        <div style={styles.rightColumn}>
          <QuickStatisticsPanel />
        </div>
      </div>
      
      {/* Footer navigation hints */}
      <div style={styles.navigationHints}>
        <p>Use the map button to explore high-risk areas in Tamil Nadu and other regions</p>
      </div>
      
      {/* Enhanced Map Navigation Button */}
      {/* <button
        type="button"
        onClick={navigateToMap}
        style={styles.mapNavButton}
        aria-label="Go to Risk Map View"
        id="mapNavigationButton"
        onMouseEnter={() => setTooltipVisible('map')}
        onMouseLeave={() => setTooltipVisible(null)}
      >
        <div style={styles.mapNavButtonInner}>
          <span style={styles.mapIcon}>🗺️</span>
          <span style={styles.mapText}>Risk Map</span>
        </div>
        {tooltipVisible === 'map' && (
          <div style={styles.mapTooltip}>
            Explore high-risk areas and tourist hotspots
          </div>
        )}
      </button> */}
    </div>
  );
}

const styles = {
  container: {
    padding: "28px 32px",
    backgroundColor: "#f5f7fa", // lighter neutral
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to bottom, #e5e9f2, #f5f7fa 80%)",
    boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.03)",
    position: "relative",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "18px",
    borderBottom: "2px solid #1e3a8a", // deep blue
    position: "relative"
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1e3a8a", // deep blue
    margin: 0,
    position: "relative",
    display: "inline-block",
    letterSpacing: "0.5px"
  },
  headerActions: {
    display: "flex",
    gap: "10px"
  },
  actionButton: {
    padding: "10px 16px",
    backgroundColor: "#fff",
    color: "#1e3a8a",
    border: "1.5px solid #eab308", // gold/yellow
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(30, 58, 138, 0.08)",
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  buttonIcon: {
    fontSize: '20px',
    marginRight: '8px'
  },
  buttonText: {
    fontSize: '16px'
  },
  tooltip: {
    position: "absolute",
    bottom: "-35px",
    right: "0",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    zIndex: 100,
    boxShadow: "0 4px 6px rgba(30, 58, 138, 0.12)"
  },
  sectionHeading: {
    marginBottom: "20px"
  },
  sectionTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e3a8a", // deep blue
    margin: "0 0 8px 0",
    letterSpacing: "0.5px"
  },
  sectionDescription: {
    fontSize: "18px",
    color: "#334155",
    margin: 0
  },
  twoColumnLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "24px",
    position: "relative"
  },
  leftColumn: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(30, 58, 138, 0.08), 0 1px 2px rgba(30, 58, 138, 0.04)",
    overflow: "hidden",
    transition: "all 0.3s ease"
  },
  rightColumn: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(30, 58, 138, 0.08), 0 1px 2px rgba(30, 58, 138, 0.04)",
    overflow: "hidden",
    transition: "all 0.3s ease"
  },
  decorCircle: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(30, 58, 138, 0.07) 0%, rgba(234, 179, 8, 0.03) 70%, transparent 100%)",
    top: "-100px",
    right: "-50px",
    zIndex: 0
  },
  decorSquare: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "linear-gradient(45deg, rgba(234, 179, 8, 0.07) 0%, rgba(30, 58, 138, 0.01) 100%)",
    transform: "rotate(30deg)",
    bottom: "50px",
    left: "-50px",
    zIndex: 0
  },
  mapNavButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "170px",
    height: "60px",
    borderRadius: "30px",
    backgroundColor: "#1e3a8a", // deep blue
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 14px rgba(30, 58, 138, 0.18), 0 2px 6px rgba(234, 179, 8, 0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    zIndex: 9999,
    border: "2px solid #eab308", // gold/yellow
    padding: 0,
    outline: "none",
    overflow: "hidden",
    textDecoration: "none",
    color: "white",
    transform: "translateZ(0)",
    willChange: "transform",
    animation: "pulse 2s infinite"
  },
  mapNavButtonInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  mapIcon: {
    fontSize: "28px",
    color: "#eab308", // gold/yellow
    marginRight: "12px"
  },
  mapText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "22px",
    opacity: "1"
  },
  mapTooltip: {
    position: "absolute",
    top: "-40px",
    right: "0",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "6px",
    fontSize: "16px",
    whiteSpace: "nowrap",
    zIndex: 10000,
    boxShadow: "0 4px 6px rgba(30, 58, 138, 0.12)"
  },
  navigationHints: {
    textAlign: "center",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#eab30822", // subtle gold/yellow
    color: "#1e3a8a",
    fontSize: "18px",
    fontWeight: "500"
  },
  welcomeOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(30, 58, 138, 0.85)",
    zIndex: 10000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(30, 58, 138, 0.10), 0 10px 10px -5px rgba(234, 179, 8, 0.04)"
  },
  welcomeTitle: {
    color: "#1e3a8a",
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "24px"
  },
  welcomeText: {
    color: "#334155",
    fontSize: "20px",
    lineHeight: "1.7",
    marginBottom: "32px"
  },
  welcomeButton: {
    backgroundColor: "#eab308", // gold/yellow
    color: "#1e3a8a",
    border: "none",
    borderRadius: "8px",
    padding: "16px 32px",
    fontSize: "20px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "20px"
  },
  welcomeFeatures: {
    display: "flex",
    justifyContent: "space-around",
    margin: "32px 0"
  },
  featureItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  },
  featureIcon: {
    fontSize: "32px",
    backgroundColor: "#eab30822",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  
  // Responsive design with improved breakpoints
  "@media (max-width: 1280px)": {
    container: {
      padding: "24px 24px"
    },
    twoColumnLayout: {
      gridTemplateColumns: "1fr 1fr",
      gap: "28px"
    }
  },
  "@media (max-width: 1024px)": {
    twoColumnLayout: {
      gridTemplateColumns: "1fr",
      gap: "24px"
    },
    title: {
      fontSize: "32px"
    },
    sectionTitle: {
      fontSize: "22px"
    }
  },
  "@media (max-width: 640px)": {
    container: {
      padding: "16px"
    },
    header: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "20px"
    },
    headerActions: {
      width: "100%",
      justifyContent: "flex-start",
      overflowX: "auto",
      padding: "6px 0"
    },
    title: {
      fontSize: "26px"
    },
    sectionTitle: {
      fontSize: "18px"
    },
    sectionDescription: {
      fontSize: "14px"
    },
    twoColumnLayout: {
      gridTemplateColumns: "1fr",
      gap: "16px"
    },
    mapNavButton: {
      bottom: "20px",
      right: "20px",
      width: "140px",
      height: "50px",
      fontSize: "18px"
    },
    mapIcon: {
      fontSize: "22px"
    },
    mapText: {
      fontSize: "18px"
    },
    mapTooltip: {
      fontSize: "13px",
      padding: "8px 12px"
    },
    welcomeCard: {
      padding: "24px"
    },
    welcomeTitle: {
      fontSize: "22px"
    },
    welcomeText: {
      fontSize: "14px"
    },
    welcomeButton: {
      fontSize: "16px",
      padding: "12px 20px"
    },
    featureIcon: {
      fontSize: "20px",
      width: "40px",
      height: "40px"
    },
    welcomeFeatures: {
      flexDirection: "column",
      gap: "16px"
    }
  }
};
