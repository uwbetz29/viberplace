# Viberplace

Marketplace for vibe-coded apps. Domain: viberplace.com

## Stack
- Next.js 16.1.7 (App Router, Turbopack)
- NextAuth v5 beta 30 (GitHub + Google OAuth)
- Neon Postgres via Vercel Storage
- Tailwind CSS v4 with `@theme inline` block
- Deployed on Vercel (`vercel --prod`)

## Build & Deploy
```bash
npm run build && vercel --prod
```

## Key Files
- `src/app/layout.tsx` — Root layout, Navbar + Providers wrapper
- `src/app/page.tsx` — Homepage: 3 equal CTAs (Browse/Submit/Get Started) + "Ridiculously easy" steps
- `src/app/get-started/page.tsx` — 5-step pizza tracker guide (client component, uses useSession)
- `src/app/apps/page.tsx` — Browse page with category tabs, featured hero, app grid
- `src/app/apps/[id]/page.tsx` — App detail with live iframe preview
- `src/app/submit/page.tsx` — Submit form
- `src/app/profile/[username]/page.tsx` — User profile showing their apps
- `src/components/navbar.tsx` — Sticky nav (server component, uses auth())
- `src/components/app-card.tsx` — Card with hover iframe preview
- `src/components/app-preview.tsx` — Full iframe preview with device toggles
- `src/components/category-tabs.tsx` — Horizontal scrolling category filter
- `src/components/providers.tsx` — SessionProvider wrapper
- `src/components/submit-form.tsx` — Client-side submission form
- `src/lib/auth.ts` — NextAuth config, signIn callback upserts users
- `src/lib/db.ts` — Neon connection + schema (users, apps tables)
- `src/app/globals.css` — CSS vars, glow-pulse animation, scrollbar-hide
- `src/app/api/auth/[...nextauth]/route.ts` — Auth route handler
- `src/app/api/init/route.ts` — DB migration endpoint

## Design Rules
- NO emojis anywhere — use flat monotone SVG icons only
- Dark theme: bg #0a0a0a, accent #7c3aed (purple)
- Apple App Store-inspired UI
- Navbar: sticky top-0 z-40
- Get Started tracker: sticky top-16 z-30 (stacks below navbar)
- Custom `animate-glow-pulse` for current step (box-shadow only, NOT opacity)

## Auth Setup
- GitHub OAuth: standard setup
- Google OAuth: Project "viberplace", client ending in `lo26`
- Env vars: AUTH_SECRET, AUTH_URL, NEXTAUTH_URL (both = https://viberplace.com)
- CRITICAL: Use `printf '%s' 'value' | vercel env add` (NOT echo) to avoid trailing newlines

## Database
- Tables: `users` (github_id, google_id, username, avatar_url, email) and `apps` (name, slug, tagline, url, image_url, description, github_url, tags[], status, user_id)
- Users upserted on sign-in via auth callback

## Known Issues
- Google Safe Browsing may flag new domain — submit review at safebrowsing.google.com
- GoDaddy DNS: A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
