# Blueview2 Frontend - Product Requirements Document

## Project Overview
Blueview is a construction site operations management application with a "cool tech futuristic" glassmorphism aesthetic.

## Original Problem Statement
Transform entire Blueview2 frontend UI/UX to a sophisticated futuristic aesthetic with:
- Deep dark gradient backgrounds (#050a12 to #0A1929)
- Glassmorphism cards with gradient fills and backdrop blur
- Grid overlay, scanlines, floating white orbs
- SF Pro Display typography with extralight weights
- Consistent dark theme with white/transparent white color palette
- Interactive hover effects with glows and shimmer

## Design System Implemented

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

### Components
- **Glass Cards**: rounded-[32px], glassmorphism, shadow on hover
- **Stat Cards**: rounded-3xl, nested glass effect
- **Icon Pods**: 52px circular with border
- **Buttons**: btn-glass with shadow
- **Inputs**: input-glass with backdrop blur
- **Floating Nav**: pill-shaped with active indicator

## Pages Implemented

### 1. Login (`/login`)
- Large "Blueview" title in extralight
- Glass card with email/password inputs
- Demo credentials display

### 2. Dashboard (`/`)
- Large user name (extralight)
- Date and email display
- 3 stat cards nested in main glass container
- Quick actions grid

### 3. Projects (`/projects`)
- Search bar
- Project list with NFC badges, codes
- Add project modal

### 4. Workers (`/workers`)
- Date selector with TODAY badge
- Summary stats (Workers, Projects, Companies)
- Check-in list with ON-SITE/DONE status

### 5. Daily Log (`/daily-log`)
- Project selector dropdown
- Weather picker (8 options)
- Expandable subcontractor cards
- Work description with voice input
- Inspection toggles

### 6. Reports (`/reports`)
- System status grid
- Sample report generator
- Create sample data option
- Admin credentials display

## Tech Stack
- React.js 19
- Tailwind CSS + Custom CSS
- Framer Motion (spring animations)
- Lucide React icons
- React Router DOM

## What's Implemented ✅
- [x] Complete glassmorphism design system
- [x] All 6 pages with consistent styling
- [x] Animated backgrounds (grid, scanlines, orbs)
- [x] SF Pro Display typography
- [x] Interactive hover effects
- [x] Floating navigation with active indicator
- [x] Session persistence via localStorage

## Data Status
- **MOCKED**: All data is frontend-only mock data
- No backend API integration

## Next Action Items (P0)
1. Backend API integration
2. MongoDB connection
3. Real authentication
4. PDF report generation

## Future Enhancements (P1)
- Photo upload for daily logs
- Voice-to-text integration
- NFC tag scanning
- Real-time updates
- Push notifications

---
*Last Updated: January 28, 2026*
