# Blueview2 Frontend - Product Requirements Document

## Project Overview
Blueview is a construction site operations management application with a futuristic, monochromatic, professional tech aesthetic.

## Original Problem Statement
Transform the entire Blueview2 frontend UI/UX to a "cool tech futuristic" vibe with:
- Dark and light games, fun effects, less colorful
- Monochromatic palette (white/gray on dark)
- Professional techy vibes - high-end "management" style
- NOT construction-site orange aesthetic

## Design System Implemented

### Color Palette
- **Background Primary**: #070710 (ultra dark)
- **Background Secondary**: #0c0c18
- **Text Primary**: rgba(255,255,255,0.9)
- **Text Secondary**: rgba(255,255,255,0.5)
- **Text Muted**: rgba(255,255,255,0.3)
- **Borders**: rgba(255,255,255,0.08)
- **Glass Effects**: rgba(255,255,255,0.03-0.05)

### Typography
- Font: Inter (Google Fonts)
- Large headings: font-extralight (200 weight)
- Labels: uppercase, tracking-wider, 10-11px
- Clean, minimal styling throughout

### Components Built
1. **AnimatedBackground** - Subtle grid pattern, scanline, muted gradient orbs
2. **GlassCard** - Glassmorphism with backdrop-blur, subtle borders
3. **StatCard** - Large extralight numbers, muted icons
4. **GlowButton** - Primary/secondary variants, clean hover states
5. **FloatingNav** - Bottom navigation bar with active indicators
6. **QuickActionCard** - Action items with chevron arrows
7. **LiveIndicator** - Pulsing dot with LIVE label

## Pages Implemented

### 1. Login Page (`/login`)
- Logo with building icon
- Email/password fields
- Demo credentials display
- Glass morphism card

### 2. Dashboard (`/`)
- Welcome message with user name (extralight font)
- 3 stat cards: Workers (24), Projects (5), On-Site (18)
- Quick Actions grid
- Recent Projects list
- Floating navigation

### 3. Projects Page (`/projects`)
- Project list with glass cards
- Search functionality
- Add new project modal
- NFC tag badges
- Delete functionality

### 4. Workers Page (`/workers`)
- Date selector with TODAY badge
- Summary stats (Workers, Projects, Companies)
- Check-in list with time, worker info, status
- ON-SITE/DONE status badges

### 5. Daily Log Page (`/daily-log`)
- Project selector dropdown
- Weather picker (8 options)
- Subcontractor cards (expandable)
- Work description with voice input placeholder
- Site inspection toggles (Cleanliness/Safety)
- Additional notes
- Submit button

### 6. Reports Page (`/reports`)
- System status (Database, Admin, Projects, Workers)
- Sample Daily Report generator
- Create Sample Data option
- Admin credentials display

## Tech Stack
- **Frontend**: React.js 19
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion (spring physics)
- **Icons**: Lucide React (strokeWidth 1.5)
- **Routing**: React Router DOM
- **State**: React useState/useEffect + localStorage

## What's Implemented ✅
- [x] Complete UI/UX transformation to monochromatic tech aesthetic
- [x] All 6 core pages with full functionality
- [x] Floating navigation with active state
- [x] Glassmorphism design system
- [x] Session persistence via localStorage
- [x] Responsive layout (mobile-friendly nav)
- [x] Smooth animations and transitions

## Data Status
- **MOCKED**: All data is currently frontend-only mock data
- No backend API integration yet
- Login uses hardcoded demo credentials

## Next Action Items (P0)
1. Backend API integration for real data persistence
2. MongoDB connection for projects, workers, check-ins
3. PDF report generation
4. Photo upload for daily logs
5. Voice-to-text for work descriptions

## Future Enhancements (P1)
- NFC tag scanning integration
- Real-time worker check-in updates
- Weather API integration
- Push notifications
- Role-based access control

---
*Last Updated: January 28, 2026*
