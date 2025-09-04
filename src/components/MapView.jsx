import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView({ tourists }) {
  const mapCenter = useRef([20.5937, 78.9629]); // India

  return (
    <MapContainer
      center={mapCenter.current}
      zoom={5}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
      />

      {tourists.map((tourist) => (
        <Marker
          key={tourist.id}
          position={[tourist.latitude, tourist.longitude]}
        >
          <Popup>
            <b>{tourist.name}</b> <br />
            Safety Score: {tourist.safetyScore}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
