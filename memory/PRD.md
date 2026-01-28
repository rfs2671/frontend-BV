# Blueview2 Frontend - Product Requirements Document

## Project Overview
Blueview is a construction site operations management application with a "cool tech futuristic" glassmorphism aesthetic (Base44 design system).

## Original Problem Statement
Transform the Blueview2 frontend UI/UX to a sophisticated futuristic aesthetic and connect it to the production backend API at `https://blueview2-production.up.railway.app`.

## Design System Implemented (Base44 Aesthetic)

### Color Palette
- **Background**: Linear gradient #050a12 → #0A1929 → #050a12
- **Glass Cards**: gradient from-white/[0.1] via-white/[0.05] to-white/[0.02]
- **Borders**: white/[0.15], hover: white/[0.3]
- **Text**: white/90, white/60, white/40, white/30

### Typography
- Font: SF Pro Display (system fonts)
- Hero text: text-5xl/6xl font-extralight tracking-tight
- Stats: text-3xl/4xl font-extralight
- Labels: text-label (11px, tracking-[0.2em], uppercase)

### Visual Effects
- Animated grid overlay (opacity 0.02)
- Moving scanline animation (8s duration)
- Floating white glow orbs with pulsing opacity
- Hover effects: white glow, holographic shimmer, scale
- Glassmorphism skeleton loaders for loading states

## Tech Stack
- **Frontend**: React.js 19, Tailwind CSS, Framer Motion
- **Backend**: External FastAPI API (production at Railway)
- **Database**: MongoDB (managed by backend)
- **Authentication**: JWT-based authentication

## API Integration Details

### Base URL
`https://blueview2-production.up.railway.app`

### Authentication
- POST `/api/auth/login` - Login with email/password, returns JWT token
- GET `/api/auth/me` - Get current user profile
- JWT token stored in localStorage and attached to all API requests via Authorization header

### Endpoints Used
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `DELETE /api/projects/{project_id}` - Delete project
- `GET /api/workers` - Fetch all workers
- `GET /api/checkins` - Fetch check-ins
- `GET /api/checkins/project/{project_id}/today` - Today's check-ins
- `GET /api/daily-logs` - Fetch daily logs
- `POST /api/daily-logs` - Create daily log
- `GET /api/daily-logs/{log_id}/pdf` - Generate PDF report

## Pages Implemented

### 1. Login (`/login`)
- Glass card login form
- Email/password inputs
- JWT authentication with production API
- Error handling with toast notifications
- Loading states during submission

### 2. Dashboard (`/`)
- User greeting with name from `/api/auth/me`
- Dynamic stats (Total Workers, Active Projects, On Site Now)
- Stats fetched from `/api/workers` and `/api/projects`
- Quick actions grid to other pages
- Skeleton loaders during data fetch

### 3. Projects (`/projects`)
- List of projects from `/api/projects`
- Search functionality
- Create new project modal (POST to API)
- Delete project functionality
- Skeleton loaders during fetch

### 4. Workers (`/workers`)
- Date selector for viewing different days
- Worker check-in list from `/api/checkins`
- Stats: Workers count, Projects, Companies
- ON-SITE/DONE status indicators
- Skeleton loaders during fetch

### 5. Daily Log (`/daily-log`)
- Project selector from `/api/projects`
- Weather picker (8 options)
- Subcontractor cards with:
  - Company name (editable)
  - Worker count (editable)
  - Work description
  - Inspection toggles (Cleanliness, Safety)
- Submit daily log to `/api/daily-logs`

### 6. Reports (`/reports`)
- System status showing database connection
- Project/Worker counts from API
- Project selector for report generation
- Recent daily logs display
- PDF download functionality

## Custom Components Created

### UI Components
- `GlassSkeleton.jsx` - Shimmer skeleton loaders matching Base44 aesthetic
- `Toast.jsx` - Toast notification system with glassmorphism styling
- `AnimatedBackground.jsx` - Grid, scanlines, floating orbs
- `FloatingNav.jsx` - Pill-shaped navigation bar
- `GlassCard.jsx` - Glassmorphism card component
- `StatCard.jsx` - Statistics display cards

### Utilities
- `utils/api.js` - Centralized API utility with:
  - Automatic JWT token attachment
  - 401 error handling with redirect
  - Token management (get/set/remove)
  - All API endpoint wrappers

## What's Implemented ✅
- [x] Complete Base44 glassmorphism design system
- [x] All 6 pages with consistent styling
- [x] Animated backgrounds (grid, scanlines, orbs)
- [x] SF Pro Display typography
- [x] Interactive hover effects
- [x] Floating navigation with active indicator
- [x] JWT authentication flow
- [x] API utility with token management
- [x] All pages connected to production API
- [x] Skeleton loaders for loading states
- [x] Toast notifications for success/error
- [x] 401 error handling with redirect to login
- [x] Session persistence via localStorage

## Important Notes

### API Credentials Required
The production backend requires valid credentials to access protected routes. The application is fully integrated but requires working credentials to test authenticated flows.

### Environment Variables
- `REACT_APP_API_URL` - Optional override for API base URL (defaults to Railway production)
- `REACT_APP_BACKEND_URL` - Frontend preview URL

## Next Action Items (Requires User Input)
1. **Valid production credentials** needed to fully test authenticated flows
2. Verify all CRUD operations work with actual data

## Future Enhancements (P1)
- Photo upload for daily logs (Camera button implemented, upload pending)
- Voice-to-text for work descriptions (Mic button implemented, integration pending)
- Dark/Light theme toggle
- Real-time updates via WebSocket
- Push notifications
- NFC tag scanning integration

## File Structure
```
/app/frontend/src/
├── components/ui/
│   ├── AnimatedBackground.jsx
│   ├── FloatingNav.jsx
│   ├── GlassCard.jsx
│   ├── GlassSkeleton.jsx  ← NEW
│   ├── Toast.jsx          ← NEW
│   └── ...shadcn components
├── pages/
│   ├── LoginPage.jsx      (API integrated)
│   ├── Dashboard.jsx      (API integrated)
│   ├── ProjectsPage.jsx   (API integrated)
│   ├── WorkersPage.jsx    (API integrated)
│   ├── DailyLogPage.jsx   (API integrated)
│   └── ReportsPage.jsx    (API integrated)
├── utils/
│   └── api.js             ← NEW (centralized API utility)
├── App.js                 (ToastProvider, session validation)
└── index.js
```

---
*Last Updated: January 28, 2026*
