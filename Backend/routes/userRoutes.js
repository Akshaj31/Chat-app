import express from 'express';
import { checkUsername, updateUsername, updatePassword, getUserByUsername } from '../controllers/userController.js';

const router = express.Router();

// Route for checking username availability
router.post('/check-username', checkUsername);

// Route for updating username
router.post('/username', updateUsername);

// Route for updating password
router.post('/password', updatePassword);

router.get('/:username', getUserByUsername);
export default router;
