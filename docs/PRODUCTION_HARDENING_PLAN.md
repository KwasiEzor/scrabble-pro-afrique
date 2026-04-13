## Production Hardening Plan

### Goal
Bring `scrabble-pro-afrique` from polished prototype status to a deployable, maintainable release candidate.

### Phase 1: Release Gate
- Make `npm run build` pass.
- Make `npm run lint` pass.
- Remove unsafe defaults that can crash the app at startup.
- Replace placeholder project metadata and add deploy documentation.

### Phase 2: Security Boundary
- Replace fake `/admin` login with real Supabase Auth session handling.
- Restrict admin UI access to authenticated users only.
- Stop trusting browser state for authorization.
- Keep privileged database access behind RLS-compatible authenticated flows.

### Phase 3: Data Consistency
- Centralize content loading so pages and search use the same source of truth.
- Keep static demo data only as a controlled fallback when Supabase is unavailable.
- Remove stale-data behavior across detail pages and search.

### Phase 4: Content Safety
- Remove unsafe article HTML rendering or reduce it to a sanitized safe subset.
- Improve form validation and error handling for public submissions.
- Prepare write paths for later migration to Edge Functions if spam protection is required.

### Phase 5: Deployment Readiness
- Add environment examples and ignore real local secrets.
- Add SPA routing support for common static hosts.
- Add CI for install, lint, and build.
- Document required environment variables and deployment steps.

### Immediate Implementation Scope
- Add deployment and environment hygiene files.
- Introduce safe Supabase client initialization.
- Implement real Supabase session-based admin auth.
- Unify site search with live/fallback content data.
- Remove the main build/lint failures and verify the release gate.

### Next Steps After This Pass
- Move public writes like contact/contribution forms behind Supabase Edge Functions with CAPTCHA/rate limiting.
- Add automated tests for routes, forms, and auth state.
- Replace demo admin analytics with real backend metrics.
