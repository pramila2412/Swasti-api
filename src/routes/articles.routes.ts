import { Router } from 'express';
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
} from '../controllers/articles.controller';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', authenticateAdmin, createArticle);

export default router;
