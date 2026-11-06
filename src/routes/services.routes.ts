import { Router } from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/services.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);
router.post('/', authenticateAdmin, createService);
router.put('/:id', authenticateAdmin, updateService);
router.delete('/:id', authenticateAdmin, deleteService);

export default router;
