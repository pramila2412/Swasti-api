import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'swasti_petct_super_secret_jwt_key_2026_nucleuz';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const token =
    req.cookies?.swasti_admin_token ||
    req.headers.authorization?.replace(/^Bearer\s+/, '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
      name: string;
    };

    if (decoded.role !== 'SUPER_ADMIN') {
      res.status(403).json({ error: 'Forbidden. Super admin privileges required.' });
      return;
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
}
