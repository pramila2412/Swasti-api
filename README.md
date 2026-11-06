# Swasti PET/CT & Nuclear Medicine - Backend REST API

Production-ready backend API service for **Swasti PET/CT Imaging & Nuclear Medicine** (Flagship of Nucleuz Healthcare Pvt. Ltd.).

## Tech Stack
- **Runtime:** Node.js & TypeScript
- **Framework:** Express.js
- **Database & ORM:** SQLite with Prisma ORM
- **Authentication:** JWT & bcrypt
- **Security:** Helmet, CORS, Rate-Limiting

## Features
- **Site Settings & CMS Management:** Control hero banners, announcements, clinic timings, and contact hotlines in real-time.
- **Appointments API:** Lead capture and status management (Pending, Confirmed, Completed, Cancelled).
- **Services Catalog:** High-definition PET/CT, 32-slice CT, Gamma Camera Scans, Theranostics, Specialty Clinics, and Pathology.
- **Doctors Directory:** Physician bios, qualifications, and OPD visiting hours.
- **Pathology Laboratory & ECG:** Automated blood tests, tumor markers, and 12-lead ECG.
- **Articles & CME Events:** Blog guides and academic medical symposium announcements.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Database Migration & Seeding:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   API runs on `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```
