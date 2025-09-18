import React, { useState, useEffect } from "react";

export default function Navbar({ onLogout }) {
  const [adminId, setAdminId] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    // Get admin ID from localStorage
    const storedAdminId = localStorage.getItem("adminId");
    if (storedAdminId) {
      setAdminId(storedAdminId);
    }

    // Update clock every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Google Translate integration
  useEffect(() => {
    // Only add script if not already present
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        /* 
          If you have an API key for Google Translate, 
          you can add it in the script src as a query param: 
          ...element.js?cb=googleTranslateElementInit&key=YOUR_API_KEY 
        */
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu,ta,te,ml,kn,pa,or,bn,mr,ur", // English + 10+ Indian languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <nav style={styles.navbar}>
      {/* Left Section - Logo and System Status */}
      <div style={styles.leftSection}>
        <div style={styles.logoSection}>
          <div style={styles.badge}>🛡️</div>
          <div>
            <h1 style={styles.title}>Tourist Safety Dashboard</h1>
            <p style={styles.subtitle}>Emergency Management System</p>
          </div>
        </div>
        <div style={styles.systemStatus}>
          <div style={styles.statusDot}></div>
          <span style={styles.statusText}>System Online</span>
        </div>
      </div>

      {/* Right Section - Controls and Info */}
      <div style={styles.rightSection}>
        {/* Real-time Clock */}
        <div className="clock-container">
          <div style={styles.time}>{formatTime(currentTime)}</div>
          <div style={styles.date}>{formatDate(currentTime)}</div>
        </div>

        {/* Notification Bell */}
        <div 
          style={styles.iconContainer} 
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
          role="button"
        >
          <span style={styles.icon} aria-hidden="true">🔔</span>
          {notificationCount > 0 && (
            <span style={styles.notificationBadge}>{notificationCount}</span>
          )}
          {showNotifications && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>New incident reported</div>
              <div style={styles.dropdownItem}>Tourist entered restricted zone</div>
              <div style={styles.dropdownItem}>System maintenance scheduled</div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div style={styles.iconContainer}>
          <span style={styles.icon}>⚙️</span>
        </div>

        {/* Google Translate Widget */}
        <div id="google_translate_element" style={{ minWidth: 120, marginRight: 10 }}></div>

        {/* User Profile Dropdown */}
        <div style={styles.profileContainer}>
          <div 
            style={styles.profileButton}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div style={styles.avatar}>👤</div>
            <div style={styles.profileInfo}>
              <span style={styles.adminName}>{adminId}</span>
              <span style={styles.role}>Administrator</span>
            </div>
            <span style={styles.dropdownArrow}>▼</span>
          </div>
          
          {showProfileDropdown && (
            <div style={styles.profileDropdown}>
              <div style={styles.dropdownItem}>👤 Profile</div>
              <div style={styles.dropdownItem}>🔧 Settings</div>
              <div style={styles.dropdownItem}>📊 Activity Log</div>
              <div style={styles.dropdownDivider}></div>
              <div style={styles.dropdownItem} onClick={handleLogout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1000
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  badge: {
    fontSize: "28px", // Slightly smaller for better proportions
    background: "rgba(255, 255, 255, 0.15)", // Better contrast
    padding: "8px",
    borderRadius: "8px",
    display: "flex",        // Ensures proper emoji centering
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    lineHeight: "1.2"
  },
  subtitle: {
    fontSize: "12px",
    color: "#cbd5e1",
    margin: 0,
    fontWeight: "400"
  },
  systemStatus: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(16, 185, 129, 0.1)",
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid rgba(16, 185, 129, 0.3)"
  },
  statusDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    animation: "pulse 2s infinite"
  },
  statusText: {
    fontSize: "12px",
    color: "#10b981",
    fontWeight: "500"
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  clockContainer: {
    textAlign: "right",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "8px 12px",
    borderRadius: "8px"
  },
  time: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1"
  },
  date: {
    fontSize: "11px",
    color: "#cbd5e1",
    lineHeight: "1"
  },
  iconContainer: {
    position: "relative",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "6px",
    transition: "background-color 0.2s"
  },
  icon: {
    fontSize: "20px",
    display: "flex",       // Better emoji alignment
    alignItems: "center",
    justifyContent: "center"
  },
  notificationBadge: {
    position: "absolute",
    top: "2px",
    right: "2px",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600"
  },
  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "14px",
    cursor: "pointer"
  },
  profileContainer: {
    position: "relative"
  },
  profileButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "background-color 0.2s"
  },
  avatar: {
    width: "32px",
    height: "32px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px"
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  adminName: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "1"
  },
  role: {
    fontSize: "11px",
    color: "#cbd5e1",
    lineHeight: "1"
  },
  dropdownArrow: {
    fontSize: "10px",
    color: "#cbd5e1"
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    minWidth: "200px",
    marginTop: "8px",
    overflow: "hidden",
    zIndex: 1000
  },
  profileDropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    minWidth: "220px",
    marginTop: "8px",
    overflow: "hidden",
    zIndex: 1000
  },
  dropdownItem: {
    padding: "12px 16px",
    color: "#374151",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  },
  dropdownDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "4px 0"
  },
  // Add responsive adjustments for small screens
  "@media (max-width: 768px)": {
    badge: {
      fontSize: "24px",    // Smaller on mobile
      padding: "6px"
    },
    icon: {
      fontSize: "18px"     // Smaller icons on mobile
    }
  }
};
