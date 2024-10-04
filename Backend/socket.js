// socket.js
import { Server } from 'socket.io';
import http from 'http';
import { addSocketHandlers } from './middleware/socketHandler.js'; // Import your handler file

const createSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Replace with your frontend URL
            methods: ["GET", "POST"],
        },
    });
    addSocketHandlers(io); // Add your socket handlers

    return io;
};

export default createSocketServer;
