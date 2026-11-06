import { Router } from 'express';
import { login, logout, getMe } from '../controllers/auth.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, getMe);

export default router;
