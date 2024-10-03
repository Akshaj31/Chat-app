import express from 'express'

import { registerUser, loginUser, getUsername, logout} from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/generateUsername', authenticateToken, getUsername);
router.post("/logout", logout)


export default router;