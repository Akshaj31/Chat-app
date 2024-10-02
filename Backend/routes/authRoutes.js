import express from 'express'

import { registerUser, loginUser, getUsername} from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/generateUsername', getUsername);


export default router;