# Campus & Hostel Essential Services Finder

**Tagline:** Find. Access. Feel at Home.

A complete, modern, responsive web application that helps students discover
essential services and facilities available inside or around their college campus
and hostel — the mess, library, medical room, stationery shop, transport, Wi-Fi
support, laundry, administration office, sports facilities and more.

---

## ✨ Features

- **Homepage** — hero with live search, quick category cards, popular services,
  important contacts, "How It Works" and an about section.
- **Explore Services** — live search by name/keyword, filter by category and by
  campus/hostel location, with a friendly "No services found" state and clear filters.
- **Service Details** — each service has its own page with description, location,
  timings, contact, facilities, availability status and a "Get Directions" link.
- **Campus Map** — an illustrative campus layout with clickable markers and a
  service list; "Get Directions" opens OpenStreetMap (demo map, clearly labelled).
- **Admin Dashboard** — secure login, add/edit/delete services, activate/deactivate,
  and live stats (total services, categories, active, inactive).
- **Contact / Help** — validated form in demonstration mode (no real email is sent).
- Fully responsive, clean white + light-blue design with navy headings, rounded
  cards, soft shadows and lucide-react icons.

## 🧱 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Next.js 14 (App Router), React 18 |
| Backend    | Next.js API routes (Node.js) |
| Database   | Supabase (PostgreSQL) when configured; local JSON fallback for instant demo |
| Auth       | bcryptjs password hashing + signed httpOnly session cookie |
| Icons      | lucide-react |
| Maps       | Illustrative SVG layout + OpenStreetMap links |
| Styling    | Plain CSS (no framework) |

## 🚀 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) copy env example — not required for a quick demo
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000.

### Default admin login (demo)

- Username: `admin`
- Password: `admin123`

> Change these via `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local` before
> deploying. The password is hashed at runtime with bcrypt and is never stored in
> plain text in the database.

## 🗄️ Database

The app works **out of the box** using a local JSON file (`data/services.json`) so
you can demonstrate it immediately with no setup.

For production persistence (so admin changes survive restarts and deploys), connect
a free Supabase project:

1. Create a project at https://supabase.com.
2. Run the SQL in `supabase/schema.sql` in the SQL editor.
3. Copy your project URL and anon key into `.env.local`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

The app automatically switches to Supabase when these are set.

## 📁 Project Structure

```
app/
  page.js                 Homepage
  services/page.js        Explore + search/filter
  services/[id]/page.js   Service details
  map/page.js             Campus map
  about/page.js           About project
  contact/page.js         Contact form
  admin/page.js           Admin login
  admin/dashboard/page.js Admin dashboard
  api/                    Backend API routes
components/               Reusable UI components
lib/                      db.js, auth.js, constants.js
data/services.json        Sample service data (local fallback)
supabase/schema.sql       PostgreSQL schema
docs/project-summary.pdf  Presentation summary
```

## 🔌 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/services` | List services (supports `q`, `category`, `area`) |
| POST | `/api/services` | Create a service (admin only) |
| GET | `/api/services/[id]` | Get one service |
| PUT | `/api/services/[id]` | Update a service (admin only) |
| DELETE | `/api/services/[id]` | Delete a service (admin only) |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/stats` | Dashboard stats (admin only) |
| POST | `/api/contact` | Contact form (demo mode) |

## 🚢 Deploy

The app is ready for Vercel:

1. Push this repository to GitHub.
2. In Vercel, import the repo (framework: Next.js, build `npm run build`, start `npm start`).
3. Add the environment variables from `.env.example` (Supabase URL/key, admin
   credentials, `AUTH_SECRET`).
4. Deploy.

## 📝 Assumptions

- Sample timings, locations, phone numbers and map links are **demonstration data**
  only and are clearly labelled as such; the administrator can update them.
- The campus map is an illustrative demo layout because real campus coordinates
  were not provided.
- The contact form runs in demonstration mode and does not send a real email.
- The local JSON fallback is used when Supabase is not configured, so the project
  runs instantly for a college demonstration.

## 📄 Documentation

See `docs/project-summary.pdf` for a presentation-friendly summary of the features,
tech stack, architecture and setup steps.