# Wanderly Backend API

An attachable Node.js / Express / MongoDB backend for the Wanderly Travel Booking Portal frontend. Built to match the frontend's existing data shapes exactly (see `seed/source/`), so it can be wired in without changing the frontend's component structure — only the data-fetching layer.

## Stack
Express, Mongoose (MongoDB), JWT auth (jsonwebtoken), bcryptjs for password hashing, CORS, morgan for request logging.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — a local MongoDB (`mongodb://127.0.0.1:27017/wanderly`) or a free MongoDB Atlas cluster connection string
- `JWT_SECRET` — any long random string
- `CLIENT_ORIGIN` — your frontend's dev URL (defaults to Vite's `http://localhost:5173`)

You need a real MongoDB to connect to — either install MongoDB Community locally, or create a free cluster at mongodb.com/atlas and paste its connection string into `MONGO_URI`.

```bash
npm run seed   # populates destinations, packages, hotels, reviews + 2 demo users
npm run dev    # starts the API on http://localhost:5000 with auto-reload
```

Demo accounts created by the seed script:
- Admin: `admin@wanderly.travel` / `admin123`
- Customer: `demo@wanderly.travel` / `demo1234`

## Testing with Postman

Import `postman/Wanderly_API.postman_collection.json` into Postman. It's pre-wired with a `{{baseUrl}}` variable (defaults to `http://localhost:5000/api`) and auto-captures your JWT into `{{token}}` / `{{adminToken}}` collection variables when you run the two Login requests — so every protected request after that just works, no manual copy-pasting of tokens.

Suggested run order: Health Check → Register → Login (customer) → Login (admin) → then anything else, in any order.

## API Reference

| Method | Route | Access Level | Description |
|---|---|---|---|
| GET | `/api/health` | Guest | Server heartbeat |
| POST | `/api/auth/register` | Guest | Create account, returns JWT |
| POST | `/api/auth/login` | Guest | Returns JWT |
| GET | `/api/auth/me` | Customer/Admin | Current user profile |
| PUT | `/api/auth/me` | Customer/Admin | Update name/phone |
| POST | `/api/auth/me/saved/:destinationId` | Customer/Admin | Toggle a saved destination |
| POST | `/api/auth/verify-admin-secret` | Admin only | Second gate for the admin dashboard — checks `code` against `ADMIN_SECRET` |
| GET | `/api/destinations` | Guest | List, with `?q= &category= &minRating= &maxPrice= &sort=` |
| GET | `/api/destinations/:id` | Guest | One destination by slug |
| POST/PUT/DELETE | `/api/destinations(/:id)` | **Admin only** | Manage destinations |
| GET | `/api/packages` `/api/packages/:id` | Guest | Same pattern as destinations |
| POST/PUT/DELETE | `/api/packages(/:id)` | **Admin only** | Manage packages |
| GET | `/api/hotels` `/api/hotels/:id` | Guest | Same pattern |
| POST/PUT/DELETE | `/api/hotels(/:id)` | **Admin only** | Manage hotels |
| POST | `/api/bookings` | Customer/Admin | Create a booking |
| GET | `/api/bookings/mine` | Customer/Admin | Your own bookings |
| GET | `/api/bookings` | **Admin only** | All bookings platform-wide |
| PUT | `/api/bookings/:id/status` | **Admin only** | Change booking status |
| DELETE | `/api/bookings/:id` | **Admin only** | Remove a booking |
| GET | `/api/users` | **Admin only** | List all users |
| DELETE | `/api/users/:id` | **Admin only** | Remove a user |
| GET | `/api/reviews` | Guest | List, optional `?targetType= &targetId=` |
| POST | `/api/reviews` | Guest/Customer | Submit a review |
| DELETE | `/api/reviews/:id` | **Admin only** | Moderate/remove a review |

This maps directly onto the 3 access levels from the seminar prep: **Guest** routes need no header at all, **Customer** routes need `Authorization: Bearer <token>` from any logged-in user, and **Admin only** routes additionally check `role === "admin"` via the `adminOnly` middleware — a 403 comes back otherwise.

## Admin access code (second gate)

Having `role: "admin"` on your JWT is not, by itself, enough to use the admin dashboard on the frontend. There's a second layer: `ADMIN_SECRET` in `.env`. After logging in as an admin, the frontend calls `POST /api/auth/verify-admin-secret` with a `code` — only once this matches `ADMIN_SECRET` does the frontend unlock `/admin`. This is checked once per browser session (stored in `sessionStorage`, not `localStorage`), so closing the tab and coming back requires the code again even though the login itself persists longer. Change `ADMIN_SECRET` from its default before treating this as a real deployment.

## What was verified in this environment

This sandbox's network can't reach MongoDB's binary download servers, so a live database connection couldn't be tested here. What *was* verified end-to-end before handing this off:
- Every file passes a Node.js syntax check
- The full Express app boots cleanly with all 7 route groups mounted
- `/api/health` returns 200 with the expected JSON
- Unknown routes correctly hit the 404 handler
- CORS preflight responds with the right headers for the configured frontend origin
- Hitting a protected route (`/api/users`) without a token correctly returns 401 rather than crashing, proving the `protect` middleware is wired in before the controller runs

Run `npm run seed && npm run dev` on your machine (or wherever you have a MongoDB URI) and the Postman collection above will exercise the full CRUD + auth + role-guard logic against real data.

## Connecting the existing frontend later

The frontend currently imports static arrays from `src/data/*.js`. To switch a page over to the API:
1. Add a small `src/utils/api.js` with a `fetch` wrapper pointed at `VITE_API_URL` (e.g. `http://localhost:5000/api`)
2. Replace the static import in that page/component with a `useEffect` + `fetch` call
3. Keep the JSON shape identical — since the Mongoose schemas mirror `src/data/*.js` field-for-field, no component prop-drilling needs to change

Do this one page at a time — Destinations first is usually easiest since it has the least cross-page dependency.
