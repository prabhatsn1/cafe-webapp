# Cafe Web App

A modern cafe website built with [Next.js](https://nextjs.org), featuring animated UI, 3D hero scenes, online reservations, and an admin bookings panel.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **3D**: React Three Fiber + Three.js
- **Validation**: Zod
- **Analytics**: Vercel Analytics

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/menu` | Menu |
| `/reservations` | Book a table |
| `/events` | Upcoming events |
| `/gallery` | Photo gallery |
| `/reviews` | Customer reviews |
| `/locations` | Locations |
| `/about` | About us |
| `/careers` | Careers |
| `/contact` | Contact |
| `/faq` | FAQ |
| `/admin/bookings` | Admin — manage bookings |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
app/             # Next.js App Router pages & API routes
src/
  components/    # UI components
  content/       # Mock JSON data
  lib/           # Utilities and schemas
  themes/        # Theme definitions
  types/         # TypeScript types
public/          # Static assets
```

## Deployment

Deploy on [Vercel](https://vercel.com/new) for the best experience. Vercel Analytics is already integrated and will activate automatically on deployment.
