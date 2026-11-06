import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticateAdmin, updateSettings);
router.post('/', authenticateAdmin, updateSettings);

export default router;
