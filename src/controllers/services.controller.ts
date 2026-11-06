import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getAllServices(req: Request, res: Response): Promise<void> {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category).toUpperCase() } : {};
    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    res.json(services);
  } catch (error) {
    console.error('getAllServices error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}

export async function getServiceBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error('getServiceBySlug error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}

export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (!data.title || !data.category || !data.shortDesc) {
      res.status(400).json({ error: 'Title, category, and short description are required' });
      return;
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const service = await prisma.service.create({
      data: {
        slug,
        title: data.title,
        category: data.category.toUpperCase(),
        shortDesc: data.shortDesc,
        fullDesc: data.fullDesc || data.shortDesc,
        machineDetails: data.machineDetails || null,
        prepTips: data.prepTips || null,
        badge: data.badge || null,
        featured: Boolean(data.featured),
        order: Number(data.order) || 0,
      },
    });

    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error('createService error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
}

export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category ? data.category.toUpperCase() : undefined,
        shortDesc: data.shortDesc,
        fullDesc: data.fullDesc,
        machineDetails: data.machineDetails,
        prepTips: data.prepTips,
        badge: data.badge,
        featured: data.featured !== undefined ? Boolean(data.featured) : undefined,
        order: data.order !== undefined ? Number(data.order) : undefined,
      },
    });

    res.json({ success: true, service: updated });
  } catch (error) {
    console.error('updateService error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
}

export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('deleteService error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
}
