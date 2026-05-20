# A Squared Studio — Web Services Portfolio

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=fff)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=fff)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=fff)

Modern portfolio website for a web services studio, built with a React frontend and a secure Express backend.

The project includes a dynamic blog, contact form with email delivery, PostgreSQL database, privacy-friendly analytics, cookie consent flow and production-ready backend structure.

---

## Preview

```txt
Frontend: React + Vite
Backend: Express + Prisma
Database: PostgreSQL
Email: Brevo SMTP
Analytics: Custom privacy-first tracking
Features
Frontend
Responsive landing page
Modern animated UI
Portfolio sections
Dynamic blog pages
Contact drawer
Success page after form submission
Cookie consent banner
Privacy policy page
SEO components
Mobile-first structure
Backend
Express REST API
PostgreSQL database
Prisma ORM
Blog API
Contact form API
Email sending through SMTP
Custom analytics API
Rate limiting
Input validation with Zod
Security headers with Helmet
CORS configuration
Centralized error handling
Analytics
Anonymous session tracking
Page views
Blog views
CTA clicks
Pricing clicks
Contact form events
Outbound link tracking
UTM tracking
Conversion tracking
Consent-based advanced analytics
Tech Stack
Layer	Technology
Frontend	React, Vite, Tailwind CSS
Animations	Framer Motion
Backend	Node.js, Express
Database	PostgreSQL
ORM	Prisma
Validation	Zod
Email	Nodemailer + Brevo SMTP
Security	Helmet, CORS, Rate Limit, HPP
Analytics	Custom event tracking
Project Structure
web-services-portfolio/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── data/
│
├── server/
│   ├── prisma/
│   └── src/
│       ├── config/
│       ├── lib/
│       ├── middleware/
│       ├── routes/
│       └── validators/
Environment Variables
Frontend .env
VITE_API_BASE_URL=http://localhost:5000/api
Backend server/.env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5174

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/webservices_db"

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_user
SMTP_PASS=your_brevo_smtp_key
SMTP_FROM="A Squared Studio <your@email.com>"
COMPANY_EMAIL=your@email.com
Installation
Frontend
npm install
npm run dev
Backend
cd server
npm install
npm run dev
Database

Run Prisma migrations:

cd server
npx prisma migrate dev
npx prisma generate

Open Prisma Studio:

npx prisma studio
API Overview
GET    /api/health
GET    /api/blog
GET    /api/blog/:slug
POST   /api/contact
POST   /api/analytics/event
Production Notes

Before deployment, update:

CLIENT_URL
VITE_API_BASE_URL
DATABASE_URL
SMTP credentials
CORS origins
production environment variables

Use Prisma deploy migrations in production:

npx prisma migrate deploy
Privacy & Security

The project uses a privacy-first analytics structure:

no personal data stored inside analytics events
contact form data is stored separately
advanced tracking is consent-based
essential cookies remain always active
analytics and marketing tracking can be disabled by the user

Security measures include:

request validation
rate limiting
HTTP security headers
CORS restrictions
honeypot anti-spam field
centralized error handling
Status
Frontend        ✅ Ready
Backend         ✅ Ready
Blog API        ✅ Ready
Contact Form    ✅ Ready
Email Delivery  ✅ Ready
Analytics       ✅ Ready
Cookie Consent  ✅ Ready
Production Prep ⏳ In progress