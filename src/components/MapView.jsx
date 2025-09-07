import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const API_BASE = "http://localhost:5000/api";

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // 1️⃣ Load initial latest locations from backend
    axios.get(`${API_BASE}/locations/v1/latest`) // assuming you created getLatestLocations endpoint
      .then((res) => {
        setLocations(res.data || []);
      })
      .catch((err) => console.error("Error fetching initial locations:", err));

    // 2️⃣ Connect to WebSocket
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket.id);
    });

    // 3️⃣ Listen for live updates
    socket.on("locationUpdate", (data) => {
      setLocations((prev) => {
        const exists = prev.find((loc) => loc.touristId === data.touristId);
        if (exists) {
          // Replace existing tourist location
          return prev.map((loc) =>
            loc.touristId === data.touristId ? data : loc
          );
        } else {
          // Add new tourist location
          return [...prev, data];
        }
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India center
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {locations.map((loc) =>
        loc.latitude && loc.longitude ? (
          <Marker
            key={loc.touristId} // ensures React reuses marker
            position={[loc.latitude, loc.longitude]}
          >
            <Popup>
              <strong>Tourist ID:</strong> {loc.touristId} <br />
              <strong>Lat:</strong> {loc.latitude} <br />
              <strong>Lng:</strong> {loc.longitude} <br />
              <strong>Time:</strong> {new Date(loc.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
