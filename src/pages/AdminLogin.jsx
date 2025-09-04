import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Default admin credentials (in a real app, this would be handled by a backend)
  const ADMIN_CREDENTIALS = {
    adminId: "admin123",
    password: "password123"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // For developer testing - accept any credentials as long as fields are not empty
    setTimeout(() => {
      if (adminId.trim() && password.trim()) {
        // Store login state in localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminId", adminId);
        onLogin(true);
      } else {
        setError("Please enter both Admin ID and Password");
      }
      setIsLoading(false);
    }, 500); // Reduced delay for faster testing
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>Tourist Dashboard</h1>
          <h2 style={styles.subtitle}>Admin Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="adminId" style={styles.label}>
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              style={styles.input}
              placeholder="Enter your Admin ID"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.loginButton,
              ...(isLoading ? styles.loginButtonDisabled : {})
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p style={styles.demoTitle}>Developer Testing Mode:</p>
          <p style={styles.demoText}>Enter any Admin ID and Password to login</p>
          <p style={styles.demoText}>Both fields must be filled</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px"
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "normal"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151"
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none"
  },
  error: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center"
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px"
  },
  loginButtonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed"
  },
  demoCredentials: {
    marginTop: "30px",
    padding: "16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    textAlign: "center"
  },
  demoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px"
  },
  demoText: {
    fontSize: "12px",
    color: "#6b7280",
    margin: "2px 0"
  }
};
