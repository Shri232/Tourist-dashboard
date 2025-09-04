import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState("Live Map");

  // tourists state (so we can update dynamically)
  const [tourists, setTourists] = useState([
    { id: 1, name: "Tourist 1", latitude: 28.6139, longitude: 77.209, safetyScore: 85 },
    { id: 2, name: "Tourist 2", latitude: 19.076, longitude: 72.8777, safetyScore: 70 },
  ]);

  // simulate movement every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTourists((prevTourists) =>
        prevTourists.map((t) => ({
          ...t,
          latitude: t.latitude + (Math.random() - 0.5) * 0.01, // small random shift
          longitude: t.longitude + (Math.random() - 0.5) * 0.01,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainWrapper}>
        <Sidebar selected={selectedMenu} setSelected={setSelectedMenu} />
        <main style={styles.main}>
          {selectedMenu === "Live Map" && <MapView tourists={tourists} />}
          {selectedMenu !== "Live Map" && <h2>{selectedMenu} Page</h2>}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100vh" },
  mainWrapper: { display: "flex", flex: 1 },
  main: { flex: 1, padding: "16px" },
};
