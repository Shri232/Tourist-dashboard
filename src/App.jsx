import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import "leaflet/dist/leaflet.css";
import NavigationDebugger from "./components/NavigationDebugger";

// Improved global navigation helper with better path handling
window.navigateTo = (path) => {
  // Handle different route patterns
  const baseUrl = window.location.origin;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If we're using hash routing
  if (window.location.href.includes("#/")) {
    window.location.href = `${baseUrl}/#${cleanPath}`;
    return;
  }

  // Standard routing
  window.location.href = `${baseUrl}${cleanPath}`;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsAuthenticated(isLoggedIn);
    setIsLoading(false);
  }, []);

  const handleLogin = (loginStatus) => {
    setIsAuthenticated(loginStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminId");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Add debugging component */}
      <NavigationDebugger />

      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },
  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#6b7280",
    fontSize: "16px",
  },
};
