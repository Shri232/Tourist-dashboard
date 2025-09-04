import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1>Tourist Safety Dashboard</h1>
      <div>
        <select style={styles.select}>
          <option>English</option>
          <option>Hindi</option>
          <option>Gujarati</option>
        </select>
        <button style={styles.button}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#1e40af",
    color: "white",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: { marginLeft: "10px", padding: "6px 12px", borderRadius: "4px" },
  button: {
    marginLeft: "10px",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
};
