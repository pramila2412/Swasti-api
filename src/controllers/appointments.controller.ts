import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getAllAppointments(req: Request, res: Response): Promise<void> {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(appointments);
  } catch (error) {
    console.error('getAllAppointments error:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
}

export async function createAppointment(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;

    if (!data.patientName || !data.phone || !data.serviceName) {
      res.status(400).json({ error: 'Patient name, phone number, and service name are required' });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientName: data.patientName,
        phone: data.phone,
        email: data.email || null,
        serviceName: data.serviceName,
        category: data.category || 'SCANS',
        preferredDate: data.preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: data.preferredTime || 'Morning (8:00 AM - 12:00 PM)',
        notes: data.notes || null,
        status: 'PENDING',
      },
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    console.error('createAppointment error:', error);
    res.status(500).json({ error: 'Failed to submit appointment' });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    res.json({ success: true, appointment: updated });
  } catch (error) {
    console.error('updateAppointmentStatus error:', error);
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
}
