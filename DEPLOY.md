# Deployment Instructions for Vercel

## Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Steps to Deploy

### 1. Push to Git Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin feature/rutina-gym-webapp
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### 3. Set Environment Variables

In Vercel project settings, add:
- Name: `NEXT_PUBLIC_APP_PASSWORD`
- Value: `fede` (or your preferred password)

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Features

✅ **Password Protection**: Access with password "fede"
✅ **LocalStorage Persistence**: Data saved in browser
✅ **Mobile Responsive**: Works on all devices
✅ **No Database Required**: Everything runs in the browser

## Post-Deployment

- Your app will be available at: `https://your-project.vercel.app`
- Data is stored locally in each browser (not synced between devices)
- To change password, update the environment variable in Vercel

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_APP_PASSWORD=fede" > .env.local

# Run development server
npm run dev
```

## Notes

- Data persistence uses localStorage (browser storage)
- Each device/browser has its own data
- Password is checked client-side for simplicity
- For production use, consider adding:
  - Server-side authentication
  - Database for data sync
  - User accounts