import React from "react";

export default function Sidebar({ selected, setSelected }) {
  const menu = ["Dashboard", "Live Map", "Alerts", "Tourists", "Restricted Zones"];

  return (
    <aside style={styles.sidebar}>
      <h2>Menu</h2>
      <ul style={styles.ul}>
        {menu.map((item) => (
          <li
            key={item}
            style={{ ...styles.li, ...(selected === item ? styles.liActive : {}) }}
            onClick={() => setSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    backgroundColor: "#1f2937",
    color: "white",
    minHeight: "650px",
    padding: "16px",
  },
  ul: { listStyle: "none", padding: 0 },
  li: {
    padding: "10px",
    marginBottom: "5px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
  liActive: { backgroundColor: "#2563eb" },
};
