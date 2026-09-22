# Wanderly — Tourism & Travel Booking Portal (Frontend)

A premium, fully responsive travel booking portal built with React (Vite), Tailwind CSS, Framer Motion, React Router DOM, Lucide React, and Recharts. **Now connected to the Wanderly backend API** — all destinations, packages, hotels, reviews, bookings, and auth flow through real HTTP calls, no local dummy data (except FAQs, which are intentionally static).

## Getting Started

1. Get the backend running first (see the `wanderly-backend` project's own README) — `npm install && npm run seed && npm run dev` there.
2. In this project:

```bash
npm install
cp .env.example .env   # defaults to http://localhost:5000/api, matching the backend's default port
npm run dev             # http://localhost:5173
```

Demo accounts (created by the backend's seed script):
- Admin: `admin@wanderly.travel` / `admin123`
- Customer: `demo@wanderly.travel` / `demo1234`

Admin access code (default `change_me_admin_access_code`, set via the backend's `ADMIN_SECRET`): after logging in as the admin account, you'll be sent to `/admin-access` to enter this code once before the dashboard unlocks. Change it in the backend's `.env` before this is anything but a local demo.

## Admin CRUD

Manage Destinations / Packages / Hotels now have real Add and Edit forms (not placeholders) that call the backend's `POST`/`PUT` endpoints. Delete already worked. The one field you can't edit after creation is the slug/`id` (it's how the frontend links things like a package to its destination), so it's locked in Edit mode.

## What changed from the standalone version

- `src/utils/api.js` — a small fetch wrapper that talks to the backend, attaches the JWT automatically on authenticated requests, and normalizes error messages.
- `src/context/AuthContext.jsx` — real login/register/logout backed by the API, with the JWT persisted in `localStorage` and the user's profile re-fetched from `/api/auth/me` on load (so a stale/expired token gets cleared automatically).
- `src/routes/ProtectedRoute.jsx` — the 3 access levels are now actually enforced client-side: `/booking` and `/profile` require login, `/admin/*` requires the `admin` role. Combined with the backend's own middleware, both layers now agree.
- `src/hooks/useApi.js` — a small reusable hook wrapping GET requests with loading/error state, used across every listing and detail page.
- `src/components/common/ApiErrorState.jsx` — a consistent "can't reach the server" UI, shown instead of crashing if the backend is down or unreachable.
- Every page that used to import from `src/data/*.js` (Destinations, DestinationDetails, Packages, PackageDetails, Hotels, Booking, Profile, the Home page sections, and all 7 admin pages) now fetches live from the backend instead.
- `src/data/*.js` files are no longer imported anywhere in the app except by the backend's seed script (`wanderly-backend/seed/source/`, copied from here) — they're kept as the seed source of truth, not runtime data.

## If the backend isn't running

Every page that fetches data will show a clear "Couldn't load data" card with a retry button, instead of a blank screen or crash — this is the `ApiErrorState` component. That's expected behavior when testing the frontend in isolation.

## Verified in this environment

Since this sandbox can't reach a real MongoDB, this integration was verified by running the actual frontend dev server against a lightweight mock server that reproduces the real backend's exact response shapes (using the same seed data). Confirmed working end-to-end: register → login (customer + admin) → browse/filter destinations, packages, hotels → view details → save a destination → create a booking → see it under Profile → admin dashboard shows real counts → admin-only routes correctly block a customer token (403) and correctly allow an admin token → guest routes stay open without a token → protected routes correctly redirect to `/login` when logged out.

Run it against your real backend + MongoDB and the same flows apply — the only difference is real persistence instead of the mock's in-memory store.
