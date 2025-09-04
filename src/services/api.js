import axios from "axios";

const API_BASE = "http://localhost:3000"; // replace with your backend

export const getTourists = () => axios.get(`${API_BASE}/tourists`);
export const getLocations = () => axios.get(`${API_BASE}/locations`);
export const getAlerts = () => axios.get(`${API_BASE}/alerts`);
export const getZones = () => axios.get(`${API_BASE}/zones`);
