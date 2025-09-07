import { io } from "socket.io-client";

// Change URL if backend is deployed elsewhere
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export default socket;
