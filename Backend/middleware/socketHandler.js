// socketHandler.js
export const addSocketHandlers = (io) => {
    const users = {}; // Store username to socket ID mappings

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Store the connected user's socket ID
        socket.on('register', (username) => {
            users[username] = socket.id; // Map username to socket ID
            console.log(`${username} connected with socket ID: ${socket.id}`);
        });

        // Handle sending messages
        socket.on('sendMessage', ({ receiverUsername, content, messageType }) => {
            const receiverSocketId = users[receiverUsername];
            if (receiverSocketId) {
                const message = {
                    senderId: socket.id, // Store sender's ID or username
                    content,
                    messageType,
                    timestamp: new Date(),
                };
                // Emit the message to the receiver
                io.to(receiverSocketId).emit('receiveMessage', message);
                console.log(`Message sent from ${socket.id} to ${receiverSocketId}:`, message);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            // Optionally remove the user from the users object
            for (const [username, socketId] of Object.entries(users)) {
                if (socketId === socket.id) {
                    delete users[username];
                    console.log(`${username} disconnected`);
                    break;
                }
            }
        });
    });
};
