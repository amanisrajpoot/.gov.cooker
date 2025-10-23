# .gov.cooker - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account
- Neon database account
- GitHub repository

### 1. Database Setup (Neon)

1. Create a new project in [Neon Console](https://console.neon.tech/)
2. Copy your connection string
3. Run the database initialization script:

```bash
# Install dependencies
npm install

# Initialize database
node scripts/init-neon-db.js
```

### 2. Environment Variables

Set these in Vercel dashboard:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
ENCRYPTION_KEY=your-encryption-key
NODE_ENV=production
```

### 3. Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `cd apps/web && npm run build`
3. Set output directory: `apps/web/.next`
4. Deploy!

### 4. Post-Deployment

1. Verify database connection
2. Test all API endpoints
3. Check responsive design
4. Test campaign creation and viewing

## 📁 Project Structure

```
├── apps/web/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities
│   │   └── contexts/        # React contexts
│   ├── package.json
│   └── next.config.js
├── database/                 # Database schemas
├── vercel.json              # Vercel configuration
└── package.json             # Root package.json
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Campaign creation and management
- ✅ RTI request system
- ✅ Issue reporting
- ✅ Secure authentication
- ✅ Database integration
- ✅ API routes
- ✅ Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS, Heroicons
- **Authentication**: NextAuth.js (ready for integration)
