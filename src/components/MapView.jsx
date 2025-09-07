import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";

// Fix Leaflet default marker in React
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
    // 1️⃣ Load initial locations from backend
    axios
      .get(`${API_BASE}/locations/v1/locations`)
      .then((res) => {
        if (Array.isArray(res.data)) setLocations(res.data);
      })
      .catch((err) => console.error("Failed to load initial locations:", err));

    // 2️⃣ Connect to WebSocket for live updates
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket.id);
    });

    // 3️⃣ Handle live location updates
 socket.on("locationUpdate", (update) => {
  setLocations((prev) => {
    const idx = prev.findIndex((loc) => loc.touristId === update.touristId);
    if (idx !== -1) {
      const newArr = [...prev];
      newArr[idx] = update; // replace the old location
      return newArr;
    } else {
      return [update, ...prev]; // new tourist
    }
  });
});


    socket.on("disconnect", () => console.log("❌ Disconnected from WebSocket"));

    return () => socket.disconnect();
  }, []);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {locations.map((loc) => (
        <Marker key={loc.touristId} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <strong>Tourist ID:</strong> {loc.tourist.touristId} <br />
            <strong>Lat:</strong> {loc.latitude} <br />
            <strong>Lng:</strong> {loc.longitude} <br />
            <strong>Time:</strong>{" "}
            {new Date(loc.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
