# Supabase Setup Instructions

## Database Setup

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/aelzyeweqbkwqhjyqfty

2. Navigate to the **SQL Editor** (in the left sidebar)

3. Copy and paste the contents of `supabase-setup.sql` file into the editor

4. Click **Run** to execute the SQL and create your database table

## Environment Variables

### Local Development
Your `.env.local` file is already configured with:
```
NEXT_PUBLIC_SUPABASE_URL=https://aelzyeweqbkwqhjyqfty.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vercel Deployment
Add these environment variables to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://aelzyeweqbkwqhjyqfty.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key (from .env.local)

## Features

- ✅ **Automatic Sync**: Data saves automatically to Supabase after changes
- ✅ **Offline Support**: Works offline with localStorage fallback
- ✅ **Real-time Status**: Shows sync status (saving, saved, offline)
- ✅ **User Persistence**: Each browser gets a unique user ID
- ✅ **Optimistic Updates**: UI updates immediately while syncing in background

## How It Works

1. **First Visit**: A unique user ID is generated and stored in localStorage
2. **Data Loading**: Attempts to load from Supabase, falls back to localStorage
3. **Auto-Save**: Changes are saved after 500ms of inactivity
4. **Offline Mode**: If Supabase is unavailable, data is stored locally
5. **Sync Indicator**: Bottom-right corner shows current sync status

## Testing

1. Open your app at http://localhost:3000
2. Make changes to your gym routine
3. Watch the sync indicator (bottom-right) show "Saving..." then "Saved"
4. Refresh the page - your data should persist
5. Open in another browser/incognito - you'll get a fresh routine

## Troubleshooting

- **"Offline mode"**: Check your Supabase credentials in .env.local
- **Data not saving**: Check the browser console for errors
- **Data not loading**: Ensure the database table was created correctly