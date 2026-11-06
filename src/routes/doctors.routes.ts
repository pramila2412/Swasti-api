import { Router } from 'express';
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctors.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllDoctors);
router.post('/', authenticateAdmin, createDoctor);
router.put('/:id', authenticateAdmin, updateDoctor);
router.delete('/:id', authenticateAdmin, deleteDoctor);

export default router;
