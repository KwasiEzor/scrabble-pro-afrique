# Scrabble Pro Afrique

Frontend React/Vite for a Scrabble portal focused on francophone Africa, backed by Supabase for content, contact messages, and admin authentication.

## Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Supabase Auth + Database
- Zustand
- Framer Motion

## Environment

Create a local `.env` from `.env.example`.

Required variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_TURNSTILE_SITE_KEY`

Legacy fallback:

- `VITE_SUPABASE_ANON_KEY`

Optional brand links:

- `VITE_SOCIAL_FACEBOOK_URL`
- `VITE_SOCIAL_TWITTER_URL`
- `VITE_SOCIAL_INSTAGRAM_URL`
- `VITE_SOCIAL_YOUTUBE_URL`
- `VITE_SOCIAL_GITHUB_URL`
- `VITE_SOCIAL_LINKEDIN_URL`

The app now initializes Supabase defensively. If env vars are missing, public pages still render with static fallback content and `/admin` shows a configuration error instead of crashing the app.

## Development

```bash
npm ci
npm run dev
```

## Quality Gate

```bash
npm run lint
npm run test:run
npm run build
npm run check
```

## Supabase Setup

Schema files live in `supabase/`.

- Main migration: `supabase/migrations/20260412000000_initial_schema.sql`
- Seed data: `supabase/seed.sql`
- One-shot bootstrap: `supabase/one_click_setup.sql`

Admin access is expected to come from either:

- `app_metadata.role = 'admin'`
- or an authenticated email ending in `@scrabblepro.africa`

The role-based path is preferred.

## Deployment

This repo is prepared for SPA deployment:

- `vercel.json` rewrites all routes to `index.html`
- `public/_redirects` supports Netlify-style redirects
- `.github/workflows/ci.yml` runs lint and build on push/PR

Recommended deployment checklist:

1. Set `VITE_SUPABASE_URL`
2. Set `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Create at least one Supabase Auth admin user
4. Assign `app_metadata.role = 'admin'` for that user if possible
5. Run the SQL migrations and seed scripts in Supabase
6. Set the Edge Function secret `TURNSTILE_SECRET_KEY`
7. Deploy the Edge Function in `supabase/functions/submit-message`
8. Verify `npm run check` passes before shipping

## Remaining Work

This pass makes the app buildable, lint-clean, deployable, and materially safer, but there is still production work left:

- add broader route and admin workflow tests
- add observability and error reporting
