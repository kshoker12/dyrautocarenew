# DYR Autocare - Next.js

1:1 migration from Laravel + Inertia + React. All functionality preserved.

## Setup

1. Copy `.env.example` to `.env` and set:
   - `DATABASE_URL` – SQLite: `file:./prisma/dev.db`
   - `NEXTAUTH_SECRET` – random string for NextAuth
   - `NEXTAUTH_URL` – e.g. `http://localhost:3000`
   - `SMTP_*` or `MAIL_*` – for booking emails
   - `SERPAPI_KEY` – for review sync at `/api/update/[passcode]`

2. Create DB and run migrations:
   ```bash
   npx prisma migrate dev
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

## Routes (1:1 with Laravel)

- `/` → redirects to `/home`
- `/home` – Home (reviews from DB)
- `/coating`, `/enhance_and_seal`, `/paint_correction`, `/interior`, `/exterior`, `/full_packages` – Package pages
- `/FAQs`, `/gallery`, `/booking`, `/booking/[id]` – FAQ, Gallery, Booking
- `/login`, `/register`, `/forgot-password`, `/reset-password` – Auth
- `/dashboard`, `/profile` – Protected (auth required)
- `GET /api/update/{passcode}` – SerpAPI review sync (passcode-protected)
- `POST /api/booking` – Booking form (sends admin + customer emails)

## Tech

- Next.js 14 (App Router), React 18, Tailwind, DaisyUI, Material Tailwind
- NextAuth (Credentials + JWT), Prisma (SQLite), Nodemailer (SMTP)
- `next/image` and a reusable `Video` component for media
# dyrautocarenew
