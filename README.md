# Rutina - Gym Workout Tracker

> Modern workout routine tracker with automatic sync, exercise images, and offline support

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.53.0-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)](https://tailwindcss.com/)

## 🎯 Overview

Rutina is a modern, full-featured gym workout routine tracker built with Next.js 15 and Supabase. It helps you organize your weekly workout routines, track exercises with proper form guidance, and automatically syncs your data across devices. The app works offline and provides visual exercise guides with 800+ exercise images.

## ✨ Features

### 💪 Workout Management
- **Weekly Routine Planning**: Organize workouts by day of the week
- **Exercise Tracking**: Track sets, reps, and weights for each exercise
- **Custom Exercises**: Add your own exercises with custom parameters
- **Rest Days**: Mark days as rest days in your routine

### 📸 Exercise Image Viewer
- **800+ Exercise Images**: Access high-quality images from public domain API
- **Intelligent Search**: Automatically translates Spanish exercise names to English
- **Multiple Angles**: View 2-3 different photos for many exercises
- **Step-by-Step Instructions**: See detailed instructions and muscle groups
- **Modal Navigation**: Browse through exercise images with arrow navigation

### 🔄 Data Persistence
- **Automatic Sync**: Data saves to Supabase automatically after changes
- **Offline Support**: Works offline with localStorage fallback
- **Real-time Status**: Visual sync indicator (saving, saved, offline)
- **User Persistence**: Unique user ID per browser for data isolation
- **Optimistic Updates**: UI updates immediately while syncing in background

### 🎨 Modern UI
- **Radix UI Components**: Accessible, unstyled components
- **Tailwind CSS**: Beautiful, responsive design
- **Dark Mode Ready**: Modern color scheme
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and interactions

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.4.5 (App Router) |
| **React** | 19.1.0 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4.0 |
| **UI Components** | Radix UI (Dialog, Select, Tabs, etc.) |
| **Database** | Supabase (PostgreSQL) |
| **State Management** | React Hooks |
| **Icons** | Lucide React |
| **Build Tool** | Turbopack |

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account ([Sign up free](https://supabase.com/))
- npm, yarn, or pnpm

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/figlesias221/rutina.git
cd rutina
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

#### Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Wait for the database to be provisioned

#### Run Database Migration
1. Navigate to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase-setup.sql`
3. Paste and run the SQL to create the `workouts` table

**See detailed instructions:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 4. Configure Environment Variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **API**.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
rutina/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   └── test-images/       # Exercise image test page
│   ├── components/            # React components
│   │   ├── ui/                # Radix UI base components
│   │   ├── WeeklyRoutine.tsx  # Main routine component
│   │   ├── DayTab.tsx         # Day workout view
│   │   ├── ExerciseCard.tsx   # Exercise display card
│   │   ├── ExerciseImageViewer.tsx  # Image modal
│   │   └── SyncIndicator.tsx  # Sync status indicator
│   ├── hooks/                 # Custom React hooks
│   │   ├── useRoutineData.ts  # Routine state management
│   │   └── useSupabaseSync.ts # Supabase sync logic
│   ├── services/              # External services
│   │   └── ExerciseImageService.ts  # Exercise API client
│   ├── types/                 # TypeScript types
│   │   └── routine.ts         # Data type definitions
│   └── lib/                   # Utility functions
│       └── supabase.ts        # Supabase client
├── public/                    # Static assets
├── docs/                      # Documentation
│   └── implementation-plan/   # Development plans
├── EJERCICIOS-API.md          # Exercise API documentation
├── SUPABASE_SETUP.md          # Supabase setup guide
├── DEPLOY.md                  # Deployment instructions
├── supabase-setup.sql         # Database schema
└── package.json
```

## 💡 How to Use

### Creating Your Workout Routine

1. **Select a Day**: Click on the day tabs (Lun, Mar, Mie, etc.)
2. **Add Exercises**: Click "Agregar ejercicio" button
3. **Fill Details**:
   - Exercise name (e.g., "Sentadillas", "Press de banca")
   - Number of sets
   - Reps per set
   - Weight (optional)
4. **Save**: Exercise is automatically added and synced

### Viewing Exercise Images

1. **Hover over an exercise** card
2. **Click the camera icon** 📷
3. **Browse images** with arrow navigation
4. **Read instructions** and muscle group information
5. **Close modal** when done

### Exercise Translation

The app intelligently translates Spanish exercise names to English for API lookup:
- "Sentadilla" → "Squat"
- "Peso muerto" → "Deadlift"
- "Press de banca" → "Bench press"
- "Dominadas" → "Pull up"
- "Flexiones" → "Push up"

**See full list:** [EJERCICIOS-API.md](./EJERCICIOS-API.md)

### Editing and Deleting

- **Edit**: Click the edit icon on any exercise card
- **Delete**: Click the trash icon to remove an exercise
- **Rest Day**: Toggle the "Día de descanso" checkbox for rest days

## 🔧 Configuration

### Exercise Image API

The app uses a free, public domain API with 800+ exercises:
- **Cache Duration**: 24 hours for performance
- **Fallback**: Placeholder image if exercise not found
- **Search**: Supports both Spanish and English terms

**Configuration in:** `src/services/ExerciseImageService.ts`

### Supabase Sync

Sync behavior can be customized in `src/hooks/useSupabaseSync.ts`:
```typescript
const DEBOUNCE_DELAY = 500; // ms to wait before saving
```

### UI Components

Customize Radix UI components in `src/components/ui/`:
- Button variants
- Dialog styling
- Select options
- Tab appearance

## 📊 Database Schema

```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_workouts_user_id ON workouts(user_id);
```

**Full schema:** `supabase-setup.sql`

## 🧪 Testing

### Exercise Image Test Page

Visit `/test-images` to test the exercise image functionality:
```bash
http://localhost:3000/test-images
```

Features:
- Search exercises by name
- View example results
- Test API connectivity
- Preview image quality

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/figlesias221/rutina)

1. Click the deploy button or go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**

**Detailed guide:** [DEPLOY.md](./DEPLOY.md)

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- **Netlify**: Follow Next.js deployment guide
- **Railway**: Connect GitHub and deploy
- **Self-hosted**: Build and run with `npm run build && npm start`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features Roadmap

### Completed ✅
- ✅ Weekly routine planning
- ✅ Exercise CRUD operations
- ✅ Exercise image viewer (800+ images)
- ✅ Automatic Supabase sync
- ✅ Offline support with localStorage
- ✅ Spanish/English exercise translation
- ✅ Responsive UI with Radix components

### Planned 🔮
- 🎬 Video/GIF support for exercises
- 📚 Exercise library browser
- 🏷️ Custom tags for exercises
- 📊 Workout statistics and progress tracking
- 💾 Offline mode with service workers
- 🔔 Workout reminders
- 📱 Progressive Web App (PWA)
- 👥 Workout sharing and templates

## 🐛 Troubleshooting

### Sync Issues
- **"Offline mode"**: Check Supabase credentials in `.env.local`
- **Data not saving**: Open browser console for error messages
- **Data not loading**: Verify database table was created

### Exercise Images
- **Images not loading**: Check internet connection
- **Wrong exercise**: Try more specific names or English terms
- **No images found**: Not all exercises have images in the API

### Development
- **Build errors**: Clear `.next` folder and rebuild
- **Type errors**: Run `npm run lint` to check TypeScript
- **Port in use**: Change port with `npm run dev -- -p 3001`

## 📚 Documentation

- [Exercise API Documentation](./EJERCICIOS-API.md) - Exercise image system
- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Database configuration
- [Deployment Guide](./DEPLOY.md) - Production deployment
- [Persistence Documentation](./PERSISTENCIA.md) - Data sync details

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and not licensed for public distribution.

## 🙏 Acknowledgments

- **Exercise Images**: [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) - Public domain exercise images
- **Radix UI**: Accessible, unstyled UI components
- **Supabase**: Open-source Firebase alternative
- **Vercel**: Next.js deployment platform
- **Tailwind CSS**: Utility-first CSS framework

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation files
- Review the troubleshooting section

---

**Built with Next.js 15, React 19, and modern web technologies for the best workout tracking experience** 💪

**Start tracking your gains today!** 🏋️‍♂️✨
