// messageRoutes.js
import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Use your authentication middleware

const router = express.Router();

// Route to send a message
router.post('/send', authenticateToken, sendMessage);

// Route to get messages for a specific user or chat
router.get('/:userId', authenticateToken, getMessages); // userId can be the ID of the chat partner

export default router;
