import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { id: 'default' },
    });
    res.json(setting);
  } catch (error) {
    console.error('getSettings error:', error);
    res.status(500).json({ error: 'Failed to retrieve site settings' });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;

    const updated = await prisma.siteSetting.upsert({
      where: { id: 'default' },
      update: {
        siteName: data.siteName,
        tagline: data.tagline,
        announcementBar: data.announcementBar,
        showAnnouncement: data.showAnnouncement,
        phone1: data.phone1,
        phone2: data.phone2,
        whatsappNumber: data.whatsappNumber,
        email: data.email,
        address: data.address,
        timingHours: data.timingHours,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroBadge: data.heroBadge,
      },
      create: {
        id: 'default',
        siteName: data.siteName || 'Swasti PET/CT & Nuclear Medicine',
        tagline: data.tagline || 'Precision Imaging, Personalized Care',
        announcementBar: data.announcementBar || '',
        showAnnouncement: data.showAnnouncement ?? true,
        phone1: data.phone1 || '+91 471 244 4455',
        phone2: data.phone2 || '+91 9400 00 4455',
        whatsappNumber: data.whatsappNumber || '+919400004455',
        email: data.email || 'info@swastipetct.com',
        address: data.address || 'Medical College P.O. Junction, Ulloor, Trivandrum',
        timingHours: data.timingHours || 'Mon - Sat: 8:00 AM - 8:00 PM',
        heroTitle: data.heroTitle || 'Precision Imaging & Advanced Theranostics',
        heroSubtitle: data.heroSubtitle || 'Premier Nuclear Medicine & PET/CT in Trivandrum',
        heroBadge: data.heroBadge || 'AERB & NABL Compliant',
      },
    });

    res.json({ success: true, setting: updated });
  } catch (error) {
    console.error('updateSettings error:', error);
    res.status(500).json({ error: 'Failed to update site settings' });
  }
}
