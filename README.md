# Cadenhead Realty Group Website

Next.js (App Router) + TypeScript + Tailwind CSS site for Cadenhead Realty Group
(Justin Cadenhead, Keller Williams — Brownwood, TX).

## Status

**Built so far:** project foundation (design tokens, fonts, motion helpers),
integration stubs (`/lib/idx.ts`, `/lib/valuation.ts`, `/lib/crm.ts`), the Home
page (animated hero, strategic-approach cards, meet-the-agent, trust-strip
logo marquee, testimonials carousel, and featured listings), a dedicated
`/home-valuation` page for the "What's My Home Worth?" lead-capture flow, a
global "Get In Touch" contact modal (triggered from the nav, footer, and
other CTAs across the site), an `/about` "Meet the Team" page for Abby &
Justin (real copy supplied by the client — see `data/team.ts`), and
Portfolio (`/properties` grid + `/properties/[slug]` detail pages) backed by
10 real, currently-active Brownwood/Early listings supplied by the client
(see `data/listings.ts`), and a `/reviews` "Share Your Experience" form that
writes to Supabase and shows up on the homepage Testimonials carousel
instantly via Supabase Realtime (see "Customer Reviews (Supabase)" below).

At the client's request, the home page no longer includes teaser sections for
Neighborhoods, Buyer's/Seller's Guides, Video Gallery, Blog, or Instagram —
those were pulled until there's real content for them. The underlying data
files (`data/neighborhoods.ts`, `data/videos.ts`, `data/blog.ts`) are still
here, ready for whenever dedicated pages for those get built.

**Not yet built:** Home Search results, Neighborhoods detail pages,
Testimonials (dedicated page), Video Gallery, Buyer's/Seller's Guides, Blog.
These follow the same patterns already established (data in `/data`,
integration seams in `/lib`, section components in `/components/sections`).

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- `app/` — routes (App Router)
- `components/layout/` — Navbar, Footer, MobileMenu, smooth-scroll provider,
  and the global contact modal (`ContactModal.tsx` + `ContactModalProvider.tsx`)
- `components/sections/` — one component per home-page section
- `components/ui/` — reusable primitives (Button, Card, ListingCard,
  ValuationForm, ContactTriggerButton, SearchBar, SmartImage, StatIcons,
  SocialIcons)
- `data/` — typed content (agent, listings, neighborhoods, testimonials,
  videos, blog). `listings.ts` and `testimonials.ts` hold real client-supplied
  content; the rest are still placeholder/mock, see below
- `lib/` — integration seams:
  - `idx.ts` — property search/listings, currently backed by the real (but
    hand-maintained) listings in `data/listings.ts` — swap for a live IDX/MLS
    feed so it updates automatically instead
  - `valuation.ts` — home value estimate (AVM), currently a deterministic mock
  - `crm.ts` — lead submission; logs to console until `CRM_WEBHOOK_URL` is set
  - `motion.ts` — shared Framer Motion variants

Any `{{TOKEN_LIKE_THIS}}` string in the codebase is a placeholder — search for
`{{` to find every spot still waiting on real content or assets. The
`SmartImage` component automatically renders a labeled placeholder box instead
of a broken image for any image path that hasn't been supplied yet.

## TODO — Content & Access to Collect From the Client

- [x] Business email — `Justincadenhead@gmail.com` in place (personal Gmail; replace with a business email if/when the client sets one up)
- [x] Phone number — `(325) 642-7644`
- [x] Office address — `208 E Anderson St, Brownwood, TX 76801`
- [x] Keller Williams license number — `0813676`
- [x] Headshot — `public/images/agent/justin.jpg` in place
- [ ] Additional property/lifestyle photos
- [ ] Agent bio copy
- [x] Real client testimonials — 4 reviews in place (see `data/testimonials.ts`)
- [ ] Confirmed list of neighborhoods/areas served (starter list in `data/neighborhoods.ts` is a suggestion, not confirmed)
- [ ] IDX/MLS feed access (KW Command, IDX Broker, Realtyna, or Showcase IDX) — see `lib/idx.ts`
- [ ] AVM provider for home valuation — see `lib/valuation.ts`
- [ ] CRM destination (KW Command webhook or other CRM API) — set `CRM_WEBHOOK_URL` env var, see `lib/crm.ts`
- [x] Instagram handle — `https://www.instagram.com/cadenheadrealtygroup` in place (linked in the footer). Still need an API token (Graph API) or a widget provider (SnapWidget/Elfsight) whenever a dedicated Instagram feed section gets built back in
- [ ] Blog content
- [x] Keller Williams logo — `public/images/kw-logo.png` in place (used in `TrustStrip.tsx` and `Footer.tsx`)
- [x] KW brand red — sampled from the official logo asset (`#CE011F`), see `app/globals.css`. Still worth a final check against KW's official brand guidelines/style guide if the client has one.
- [x] EHO/REALTOR® logo — official combined logo in place at `public/images/badges/realtor-eho-logo.png` (used in `Footer.tsx` and `TrustStrip.tsx`)
- [x] Hero background video — `public/video/hero.mp4` in place
- [ ] Hero poster frame (static fallback image shown before/if the video can't play) — see `components/sections/Hero.tsx`
- [ ] Abby's headshot — currently a placeholder on `/about`, see `data/team.ts`

## Environment Variables

- `CRM_WEBHOOK_URL` — lead-submission destination. Without it, leads are only
  logged server-side (safe for development/demo).
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — customer reviews (see below). Without these,
  the review form still works end-to-end but just logs submissions
  server-side instead of persisting them, and the homepage testimonials
  carousel shows only the static seed reviews in `data/testimonials.ts`.

## Customer Reviews (Supabase)

`/reviews` is a "Share Your Experience" form (linked from a CTA on the
homepage Testimonials section and from the footer) that lets site visitors
submit a review. Once submitted, it's written to a Supabase `reviews` table
and appears **immediately** in the homepage Testimonials carousel for
everyone currently on the page — no refresh, no redeploy — via a Supabase
Realtime subscription (see `components/sections/Testimonials.tsx`).

To connect it to a real Supabase project:

1. Create a project at supabase.com, then in the SQL Editor run:

   ```sql
   create table public.reviews (
     id uuid primary key default gen_random_uuid(),
     author text not null,
     role text,
     location text,
     rating smallint not null check (rating between 1 and 5),
     quote text not null,
     is_approved boolean not null default true,
     created_at timestamptz not null default now()
   );

   alter table public.reviews enable row level security;

   create policy "Public can read approved reviews"
     on public.reviews for select
     using (is_approved = true);

   alter publication supabase_realtime add table public.reviews;
   ```

   There is intentionally no public insert policy — writes go through
   `app/api/reviews/route.ts` using the service-role key, which bypasses RLS.
   That keeps the anon key (shipped to the browser) read-only.

2. In Project Settings → API, copy the Project URL, the `anon` public key,
   and the `service_role` secret key into the environment as
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` respectively (never expose the service-role
   key to the client — it's only read in `lib/supabase/server.ts`, which
   runs server-side).

3. Restart `npm run dev` / redeploy. Reviews submitted from `/reviews` will
   start showing up on the homepage instantly.

Reviews publish with no moderation step (`is_approved` defaults to `true`),
matching the "instantly show" requirement this was built for. If moderation
is wanted later, flip that default to `false` and build an admin view that
updates `is_approved` — the public read policy and the realtime filter
(`is_approved=eq.true`) already only surface approved rows.
