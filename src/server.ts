import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes';
import settingsRoutes from './routes/settings.routes';
import servicesRoutes from './routes/services.routes';
import doctorsRoutes from './routes/doctors.routes';
import labRoutes from './routes/lab.routes';
import articlesRoutes from './routes/articles.routes';
import appointmentsRoutes from './routes/appointments.routes';

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');

// Dynamic resilient CORS allowing all Vercel previews, production domains, and local dev
const corsOptions = {
  origin: true, // Echoes the request origin so all *.vercel.app and custom domains are allowed
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Root & Health Checks (works on /, /health, and /api/health)
const healthHandler = (req: express.Request, res: express.Response) => {
  res.json({
    status: 'online',
    service: 'Swasti PET/CT & Nuclear Medicine API Server',
    version: '1.0.0',
    database: process.env.DATABASE_URL ? 'configured' : 'missing',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
  });
};

app.get('/', healthHandler);
app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// Mount Routes (supporting both /api/* and direct subpaths on Vercel)
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/settings', '/settings'], settingsRoutes);
app.use(['/api/services', '/services'], servicesRoutes);
app.use(['/api/doctors', '/doctors'], doctorsRoutes);
app.use(['/api/lab-tests', '/lab-tests'], labRoutes);
app.use(['/api/articles', '/articles'], articlesRoutes);
app.use(['/api/appointments', '/appointments'], appointmentsRoutes);

// Error Handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start Server (only listen when running as standalone server, not on Vercel serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Swasti Backend API running on port ${PORT}`);
    console.log(`📡 CORS enabled for all origins`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}

export default app;
