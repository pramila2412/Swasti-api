import { Request, Response } from 'express';
import { prisma } from '../prisma';

export async function getAllArticles(req: Request, res: Response): Promise<void> {
  try {
    const { type } = req.query;
    const where: { type?: string; published?: boolean } = { published: true };
    if (type) where.type = String(type).toUpperCase();

    const articles = await prisma.article.findMany({
      where,
      orderBy: type === 'EVENT' ? { eventDate: 'asc' } : { createdAt: 'desc' },
    });
    res.json(articles);
  } catch (error) {
    console.error('getAllArticles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}

export async function getArticleBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    res.json(article);
  } catch (error) {
    console.error('getArticleBySlug error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
}

export async function createArticle(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (!data.title || !data.excerpt || !data.content) {
      res.status(400).json({ error: 'Title, excerpt, and content are required' });
      return;
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const article = await prisma.article.create({
      data: {
        type: data.type ? data.type.toUpperCase() : 'BLOG',
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        author: data.author || 'Swasti Medical Editorial Team',
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        location: data.location || null,
        published: data.published !== undefined ? Boolean(data.published) : true,
      },
    });

    res.status(201).json({ success: true, article });
  } catch (error) {
    console.error('createArticle error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
}
