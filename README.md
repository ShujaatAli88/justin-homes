# Cadenhead Realty Group Website

Next.js (App Router) + TypeScript + Tailwind CSS site for Cadenhead Realty Group
(Justin Cadenhead, Keller Williams — Brownwood, TX).

## Status

**Built so far:** project foundation (design tokens, fonts, motion helpers),
the integration seam `/lib/crm.ts`, the Home page
(animated hero, strategic-approach cards, meet-the-agent, trust-strip logo
marquee, testimonials carousel, and a live IDX active-listings embed), a
dedicated `/home-valuation` page for the "What's My Home Worth?" lead-capture
flow, a global "Get In Touch" contact modal (triggered from the nav, footer,
and other CTAs across the site), an `/about` "Meet the Team" page for Abby &
Justin (real copy supplied by the client — see `data/team.ts`), a Portfolio
page (`/properties`) and a map-based `/home-search/listings` page — both
embedding the client's live NTREIS Matrix IDX feeds (see "MLS / IDX
Integration" below) — and a `/reviews` "Share Your Experience" form that
writes to Supabase and shows up on the homepage Testimonials carousel
instantly via Supabase Realtime (see "Customer Reviews (Supabase)" below).

At the client's request, the home page no longer includes teaser sections for
Neighborhoods, Buyer's/Seller's Guides, Video Gallery, Blog, or Instagram —
those were pulled until there's real content for them. The underlying data
files (`data/neighborhoods.ts`, `data/videos.ts`, `data/blog.ts`) are still
here, ready for whenever dedicated pages for those get built.

**Not yet built:** Neighborhoods detail pages, Testimonials (dedicated page),
Video Gallery, Buyer's/Seller's Guides, Blog. These follow the same patterns
already established (data in `/data`, integration seams in `/lib`, section
components in `/components/sections`).

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- `app/` — routes (App Router)
- `components/IDXEmbed.tsx` — reusable wrapper around the client's live
  NTREIS Matrix IDX iframes (see "MLS / IDX Integration" below)
- `components/layout/` — Navbar, Footer, MobileMenu, smooth-scroll provider,
  and the global contact modal (`ContactModal.tsx` + `ContactModalProvider.tsx`)
- `components/sections/` — one component per home-page section
- `components/ui/` — reusable primitives (Button, Card, ValuationForm,
  ContactTriggerButton, SearchBar, SmartImage, SocialIcons)
- `data/` — typed content (agent, neighborhoods, testimonials, videos, blog).
  `testimonials.ts` holds real client-supplied content (plus live Supabase
  reviews merged in, see below); the rest are still placeholder/mock
- `lib/` — integration seams:
  - `crm.ts` — lead submission via FormSubmit (formsubmit.co), a free-forever
    form-to-email service that needs no API key/account — just the
    destination email in the request URL. `submitLead()` is called directly
    from client components (`ContactModal.tsx`, `ValuationForm.tsx`,
    `Newsletter.tsx`) rather than through one of our own API routes — see
    "Lead Delivery (FormSubmit)" below for why that matters. Logs to console
    instead of actually posting whenever `NODE_ENV !== "production"`, so
    local dev never spams the real inbox. The "What's My Home Worth?" flow
    deliberately does not generate an automated online estimate — Justin
    follows up personally
  - `reviews.ts` — customer review submission, backed by Supabase
  - `motion.ts` — shared Framer Motion variants

Property search/listings are no longer a data-driven integration seam —
`/properties` and `/home-search/listings` embed the client's live MLS feed
directly (see below), so there's no `lib/idx.ts` or `data/listings.ts`
anymore.

Any `{{TOKEN_LIKE_THIS}}` string in the codebase is a placeholder — search for
`{{` to find every spot still waiting on real content or assets. The
`SmartImage` component automatically renders a labeled placeholder box instead
of a broken image for any image path that hasn't been supplied yet.

## TODO — Content & Access to Collect From the Client

- [x] Business email — `justin.cadenhead@kw.com` in place (real KW Synergy email, replacing the earlier personal-Gmail placeholder)
- [x] Phone number — `(325) 642-7644`
- [x] Office address — `208 E Anderson St, Brownwood, TX 76801`
- [x] Keller Williams license number — `0813676`
- [x] Headshot — `public/images/agent/justin.jpg` in place
- [ ] Additional property/lifestyle photos
- [ ] Agent bio copy
- [x] Real client testimonials — 4 reviews in place (see `data/testimonials.ts`)
- [ ] Confirmed list of neighborhoods/areas served (starter list in `data/neighborhoods.ts` is a suggestion, not confirmed)
- [x] IDX/MLS feed access — live NTREIS Matrix embeds in place (Active Listings + Map Search), see "MLS / IDX Integration" below
- [x] Lead destination — leads (contact form + home valuation requests) email to `Justin.cadenhead@kw.com` via FormSubmit, no env var/API key needed, see `lib/crm.ts`. **Justin must click the one-time "Activate Form" link** FormSubmit emails to that address after the very first real lead comes in on production — until then, submissions won't actually be delivered
- [x] Instagram handle — `https://www.instagram.com/cadenheadrealtygroup` in place (linked in the footer). Still need an API token (Graph API) or a widget provider (SnapWidget/Elfsight) whenever a dedicated Instagram feed section gets built back in
- [ ] Blog content
- [x] Keller Williams logo — `public/images/kw-logo.png` in place (used in `TrustStrip.tsx` and `Footer.tsx`)
- [x] KW brand red — sampled from the official logo asset (`#CE011F`), see `app/globals.css`. Still worth a final check against KW's official brand guidelines/style guide if the client has one.
- [x] EHO/REALTOR® logo — official combined logo in place at `public/images/badges/realtor-eho-logo.png` (used in `Footer.tsx` and `TrustStrip.tsx`)
- [x] Hero background video — `public/video/hero.mp4` in place
- [ ] Hero poster frame (static fallback image shown before/if the video can't play) — see `components/sections/Hero.tsx`
- [x] Abby's headshot — `public/images/agent/abby.jpg` in place, see `data/team.ts`

## Environment Variables

Lead delivery (contact form + home valuation requests) needs **no environment
variable at all** — see "Lead Delivery (FormSubmit)" below.

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — customer reviews (see below). Without these,
  the review form still works end-to-end but just logs submissions
  server-side instead of persisting them, and the homepage testimonials
  carousel shows only the static seed reviews in `data/testimonials.ts`.

## Lead Delivery (FormSubmit)

The Contact modal, the "What's My Home Worth?" form, and the newsletter
signup all call `submitLead()` from `lib/crm.ts`, which POSTs to FormSubmit
(formsubmit.co) — a free-forever form-to-email service that needs no
account, no API key, and has no volume cap at this site's scale. The
destination email (`agent.email` — `Justin.cadenhead@kw.com`) is just part
of the request URL (`https://formsubmit.co/ajax/<email>`), nothing to
configure.

**Important: `submitLead()` is called directly from the client components,
not through one of our own `/api/*` routes.** That wasn't the original
design — leads used to POST to `/api/leads` / `/api/valuation`, which then
relayed the request to FormSubmit server-side. That relay is what broke:
FormSubmit sits behind Cloudflare, and Cloudflare's bot protection flagged
the server-to-server request from Vercel's serverless function as bot
traffic and blocked it with a JS challenge page ("Just a moment...") instead
of processing it — a plain backend `fetch()` can never solve that challenge.
The fix was to remove the server hop entirely and call FormSubmit straight
from the visitor's own browser, which is also how FormSubmit is actually
meant to be used (its whole model assumes it's embedded directly in a page
with no backend at all). **Don't reintroduce a server-side proxy for this
— it will silently start failing behind Cloudflare's bot check again.**

**One-time activation step:** the first submission ever sent to a given
destination email triggers a confirmation email from FormSubmit with an
"Activate Form" link. Justin needs to click that once — after that, every
future submission delivers immediately with no further action needed. This
will happen automatically the first time a real visitor submits any of the
three forms on the live production site.

Local development never triggers this: `submitLead()` only logs to the
console when `NODE_ENV !== "production"` (i.e. `npm run dev`), so testing
locally can't spam the inbox or re-trigger the activation flow. To actually
exercise the real FormSubmit call locally, run a production build
(`npm run build && npm run start`) — that really does deliver, so use
obviously-fake test data.

The home valuation form deliberately does not compute or show an automated
online estimate — it never did anything more than generate a fake
deterministic number from the address, which would have been actively
misleading to show a visitor. Submitting it just sends the property and
contact details to Justin, who follows up personally by email.

## MLS / IDX Integration (NTREIS Matrix)

Property search is powered by two live NTREIS Matrix IDX widgets, embedded
as cross-domain iframes via `components/IDXEmbed.tsx`:

- **Active Listings** (`idx=6fd645a0`) — used on the homepage "Active
  Listings" section (`components/sections/ActiveListings.tsx`) and on
  `/properties` (`components/sections/PortfolioHero.tsx`).
- **Map Search** (`idx=23e645a1`) — used on `/home-search/listings`
  (`app/home-search/listings/page.tsx`).

Both feeds are live and update automatically on the MLS side — there is no
mock data, caching layer, or scraping involved; the iframe just renders
whatever NTREIS serves. Per MLS compliance, the embedded content is never
modified, proxied, or scraped — it's framed as-is.

**History — why these display IDs changed twice:** the original two IDs
(`idx=44844573` / `idx=64914572`) turned out to belong to nobody's own
Matrix account (Justin's login showed "0 active, 0 inactive" IDX pages), so
there was no way to ever edit them. A second pair (`idx=92674587` /
`idx=eddb4588`) had the same problem. The current pair
(`idx=6fd645a0` / `idx=23e645a1`, created 2026-08) was created directly
under Justin's own Matrix account ("My Matrix" → IDX Configuration), so
**it's fully self-manageable now** — he can edit the Search Form template,
Referring Page, and theme colors himself going forward. Widget colors are
set to match the brand: page background `#ffffff`, header background
`#0a0a0a`, header font `#e42d2d`.

For "Map Search," the Search Form was deliberately set to **"IDX Search"**
rather than the default **"Portal Search"** template — Portal Search
auto-opens a Filters modal on load, which wasn't wanted; IDX Search doesn't.
If a future edit resets this back to Portal Search, that's most likely why
the filters start auto-opening again.

**Sizing:** NTREIS doesn't send a resize handshake, so the iframe can't
auto-fit its content height. `IDXEmbed` instead pins a `minHeight` (taller on
mobile, since the widget's controls stack vertically there) and lets the
iframe's own internal scrollbar handle any overflow — deliberately not a
fixed aspect-ratio box, which would clip the search/listing UI.

**Domain restriction — read before "fixing" a 403 in the embed:** NTREIS
Matrix locks these widgets to a whitelisted Referring Page domain (set to
`https://cadenheadrealty.com` on both widgets above). On `localhost` or any
preview/staging domain, the iframe loads a real `403 Forbidden` response
from NTREIS (not a blank frame) — that's expected, not a bug in this app.

Since there's no structured per-listing data (just the embed), there is no
`/properties/[slug]` detail page with its own shareable URL — clicking into
a specific listing happens inside the NTREIS widget itself, and its address
bar never changes. Getting real, individually-shareable property URLs on
our own domain would require either (a) NTREIS RESO Web API/RETS access — a
different, larger grant than the IDX display widgets above, typically
requiring a separate vendor/data-license agreement — so real per-listing
data can be pulled and rendered as actual pages, or (b) a manually-maintained
"Featured Listings" set (client supplies each listing's info by hand,
similar to how `data/listings.ts` worked earlier in this project, before it
was replaced by these live embeds) with real detail pages and a working
"Copy Property Link" button, at the cost of needing manual upkeep instead of
auto-syncing with the MLS.

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
