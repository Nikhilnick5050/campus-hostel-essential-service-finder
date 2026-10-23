# Build Plan — Campus & Hostel Essential Services Finder

## Goal
A complete, modern, responsive Next.js web app that helps students discover
essential campus and hostel services (mess, library, medical, transport, Wi-Fi,
admin, laundry, stationery, sports, hostel facilities).

## Stack (chosen)
- Frontend + backend: Next.js 14 (App Router) with API routes
- Database: Supabase (PostgreSQL) when env vars are set; local JSON fallback for instant demo
- Icons: lucide-react
- Auth: bcryptjs password hashing + signed httpOnly session cookie
- Map: illustrative SVG campus layout + OpenStreetMap "Get Directions" links

## Pages
- Home (hero, search, category cards, popular services, contacts, how-it-works, about, footer)
- Explore Services (live search + category/location filters)
- Service Details (per-service page)
- Campus Map (illustrative layout with clickable markers)
- About Project
- Contact / Help (demo-mode form)
- Admin Login + Admin Dashboard (CRUD, activate/deactivate, stats)

## API routes
- GET/POST /api/services (list with search/filter, create)
- GET/PUT/DELETE /api/services/[id]
- POST /api/auth/login, POST /api/auth/logout
- POST /api/contact (demo mode)

## Deliverables
- Working source in the project
- GitHub repo + push
- README with setup/run steps
- docs/project-summary.pdf (presentation summary)
- WhatsApp summary with repo link, PDF, run steps, assumptions