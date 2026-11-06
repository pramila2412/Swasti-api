import { Router } from 'express';
import {
  getAllAppointments,
  createAppointment,
  updateAppointmentStatus,
} from '../controllers/appointments.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticateAdmin, getAllAppointments);
router.post('/', createAppointment);
router.patch('/:id/status', authenticateAdmin, updateAppointmentStatus);

export default router;
