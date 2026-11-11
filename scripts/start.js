const { execSync } = require('child_process');
const path = require('path');
const rootDir = path.join(__dirname, '..');

// Ensure DATABASE_URL is set; default to SQLite dev.db if not provided
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
  console.log('ℹ️ DATABASE_URL not set in environment, defaulting to file:./dev.db');
}

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'swasti_petct_super_secret_jwt_key_2026_nucleuz';
}

console.log('🔄 Syncing database schema with Prisma...');
try {
  execSync('npx prisma db push --accept-data-loss', {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  });
  console.log('✅ Database schema in sync.');
} catch (err) {
  console.error('⚠️ prisma db push notice:', err.message);
}

console.log('🌱 Seeding database with initial data...');
try {
  execSync('node prisma/seed.js', {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  });
  console.log('✅ Database seed complete.');
} catch (err) {
  console.error('⚠️ Database seed notice:', err.message);
}

console.log('🚀 Starting Swasti API Server...');
require(path.join(rootDir, 'dist', 'server.js'));
