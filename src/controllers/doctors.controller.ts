import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getAllDoctors(req: Request, res: Response): Promise<void> {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(doctors);
  } catch (error) {
    console.error('getAllDoctors error:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
}

export async function createDoctor(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (!data.name || !data.department || !data.designation) {
      res.status(400).json({ error: 'Name, department, and designation are required' });
      return;
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        qualification: data.qualification || '',
        department: data.department,
        designation: data.designation,
        experience: data.experience || '',
        consultationHours: data.consultationHours || 'Monday - Saturday: 9:00 AM - 2:00 PM',
        photo: data.photo || null,
        bio: data.bio || '',
        active: data.active !== undefined ? Boolean(data.active) : true,
        order: Number(data.order) || 0,
      },
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.error('createDoctor error:', error);
    res.status(500).json({ error: 'Failed to create doctor' });
  }
}

export async function updateDoctor(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.doctor.update({
      where: { id },
      data: {
        name: data.name,
        qualification: data.qualification,
        department: data.department,
        designation: data.designation,
        experience: data.experience,
        consultationHours: data.consultationHours,
        photo: data.photo,
        bio: data.bio,
        active: data.active !== undefined ? Boolean(data.active) : undefined,
        order: data.order !== undefined ? Number(data.order) : undefined,
      },
    });

    res.json({ success: true, doctor: updated });
  } catch (error) {
    console.error('updateDoctor error:', error);
    res.status(500).json({ error: 'Failed to update doctor' });
  }
}

export async function deleteDoctor(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await prisma.doctor.delete({ where: { id } });
    res.json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('deleteDoctor error:', error);
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
}
