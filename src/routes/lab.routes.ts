import { Router } from 'express';
import { getAllLabTests, createLabTest } from '../controllers/lab.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllLabTests);
router.post('/', authenticateAdmin, createLabTest);

export default router;
