import React from "react";
import KPICards from "./KPICards";
import AlertStatusWidget from "./AlertStatusWidget";
import QuickStatisticsPanel from "./QuickStatisticsPanel";

export default function DashboardOverview() {
  return (
    <div style={styles.container}>
      {/* Decorative elements */}
      <div style={styles.decorCircle}></div>
      <div style={styles.decorSquare}></div>
      
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
          <button style={styles.exportBtn}>
            <span style={{fontSize: '16px', marginRight: '2px'}}>📊</span> Export Report
          </button>
          <button style={styles.settingsBtn}>
            <span style={{fontSize: '16px', marginRight: '2px'}}>⚙️</span> Settings
          </button>
        </div>
      </div>
      
      {/* KPI Status Cards */}
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
    </div>
  );
}

const styles = {
  container: {
    padding: "28px 32px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
    boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.03)",
    position: "relative",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "36px",
    paddingBottom: "18px",
    borderBottom: "2px solid rgba(203, 213, 225, 0.8)",
    position: "relative"
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px",
    textShadow: "0px 1px 1px rgba(255, 255, 255, 1)",
    position: "relative",
    display: "inline-block"
  },
  headerActions: {
    display: "flex",
    gap: "14px"
  },
  exportBtn: {
    padding: "11px 22px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 10px rgba(16, 185, 129, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    ":active": {
      transform: "translateY(0)",
      boxShadow: "0 1px 5px rgba(16, 185, 129, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1)"
    }
  },
  settingsBtn: {
    padding: "11px 22px",
    background: "linear-gradient(135deg, #64748b, #475569)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 10px rgba(100, 116, 139, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(100, 116, 139, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    ":active": {
      transform: "translateY(0)",
      boxShadow: "0 1px 5px rgba(100, 116, 139, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1)"
    }
  },
  twoColumnLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "36px",
    marginTop: "36px",
    position: "relative"
  },
  leftColumn: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.03)"
    }
  },
  rightColumn: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.03)"
    }
  },
  // Decorative elements
  decorCircle: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, rgba(59, 130, 246, 0.01) 70%, transparent 100%)",
    top: "-100px",
    right: "-50px",
    zIndex: 0
  },
  decorSquare: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "linear-gradient(45deg, rgba(249, 115, 22, 0.03) 0%, rgba(234, 88, 12, 0.01) 100%)",
    transform: "rotate(30deg)",
    bottom: "50px",
    left: "-50px",
    zIndex: 0
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
      fontSize: "30px"
    }
  },
  "@media (max-width: 640px)": {
    container: {
      padding: "20px 16px"
    },
    header: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "16px"
    },
    headerActions: {
      width: "100%",
      justifyContent: "space-between"
    },
    title: {
      fontSize: "26px",
      marginBottom: "10px"
    }
  }
};
