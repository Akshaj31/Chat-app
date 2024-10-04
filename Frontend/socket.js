// src/socket.js
import { io } from 'socket.io-client';

const SERVER_URL = "http://localhost:3000/";
 // Use HTTP instead of WS
// Adjust this if your server runs on a different port

const socket = io(SERVER_URL, {
    transports: ["websocket"], // Specify transport if needed
    withCredentials: true, // Include credentials if you're using them
});

export default socket;
