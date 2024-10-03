import express from 'express'

import { registerUser, loginUser, getUsername} from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/generateUsername', authenticateToken, getUsername);


export default router;