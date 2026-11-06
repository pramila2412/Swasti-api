import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getAllLabTests(req: Request, res: Response): Promise<void> {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category).toUpperCase() } : {};
    const tests = await prisma.labTest.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    res.json(tests);
  } catch (error) {
    console.error('getAllLabTests error:', error);
    res.status(500).json({ error: 'Failed to fetch lab tests' });
  }
}

export async function createLabTest(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (!data.name || !data.category) {
      res.status(400).json({ error: 'Test name and category are required' });
      return;
    }

    const test = await prisma.labTest.create({
      data: {
        code: data.code || null,
        name: data.name,
        category: data.category.toUpperCase(),
        sampleType: data.sampleType || 'Blood (Serum)',
        fastingRequired: Boolean(data.fastingRequired),
        reportTime: data.reportTime || 'Same Day',
        price: data.price ? Number(data.price) : null,
        description: data.description || null,
        order: Number(data.order) || 0,
      },
    });

    res.status(201).json({ success: true, test });
  } catch (error) {
    console.error('createLabTest error:', error);
    res.status(500).json({ error: 'Failed to create lab test' });
  }
}
