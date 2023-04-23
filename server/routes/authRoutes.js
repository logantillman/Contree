import express from 'express';
import { registerUser, loginUser, logoutUser, refresh } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/refresh', refresh);

export default router;