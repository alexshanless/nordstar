# NordStar Freight — website plan

Marketing site for NordStar Freight. This file is the working plan: an agent
or developer picking up the repo (Cursor, Claude Code, plain editor) should
read this, `design/readme.md`, and `src/styles/industry.css` before building.
Check items off as they land.

## Current state (done, verified 2026-08-07)

- Next.js 16.3.0 (App Router, Turbopack), React 19.2.8, TypeScript strict,
  Tailwind v4. Static prerender, `npm run build` green.
- Design system: "Industry" (steel-blue blueprint wireframe) imported at
  `src/styles/industry.css`, brand and dark-band overrides at
  `src/styles/nordstar.css`. One steel accent `#5980a6` on either ground.
  The site follows the visitor's OS colour preference, no toggle: light is
  the Industry board as imported (ground `#f2f2f3`, text `#1d1f20`), dark is
  the band scoped to `@media (prefers-color-scheme: dark)` (ground `#1d1f20`,
  text `#f2f2f3`).
- Brand: NordStar Freight one-colour logo system in `public/brand/`
  (production SVGs) and `src/components/Logo.tsx` (`Logo` = header variant,
  `LogoLockup` = primary lockup). Favicon at `src/app/icon.svg`.
- Fonts: Barlow 400/500/700 and Barlow Condensed 400/600/800 via `next/font`,
  exposed as `--font-barlow` / `--font-barlow-condensed`.
- One placeholder landing page at `src/app/page.tsx` with header, hero,
  three service cards, footer.

## Non-negotiable conventions

- Every color, font, space, radius, shadow comes from the CSS variables in
  `industry.css`. Never hard-code values the tokens carry.
- Blueprint grammar: cards, figures and primary buttons are square-cornered,
  hairline-bordered, with four `<i className="corner tl/tr/bl/br" />`
  registration marks inside a `.blueprint` element. Cards and figures stay
  transparent line drawings; the solid steel primary button is the only
  filled object.
- Dark ground rules: interactive states step LIGHTER (accent-400/500), small
  accent text uses `--color-accent-400`.
- Logo rules: never scale the two-line lockup below a 40px mark, swap
  variants instead (thresholds in `design/readme.md` source bundle README).
  No animation on the mark, ever. Never screen the logo back with opacity.
- Photography, when it arrives, goes through `.duotone` (steel screen-print
  wash). Icons are Lucide at stroke-width 1.5.
- Content copy: plain, concrete, no hype. The voice is an engineering
  document (see the Industry readme's "Holdfast" landing for tone).

## Site structure (target)

```
/                  Home — hero, services overview, proof strip, quote CTA
/services          Services index (or anchor sections on home at first)
/services/ftl      Full truckload
/services/ltl      Less than truckload
/services/expedited Expedited
/about             Company, coverage map, safety/compliance numbers
/careers           Driver recruiting first (CDL), office roles second
/careers/[slug]    Individual openings (phase 3, only if roles are real)
/contact           Contact + quote request form
```

Start flat: Home, About, Contact ship first; service detail pages only when
there is real copy for them (until then `/services/*` sections live on Home).

## File layout (target)

```
src/
  app/
    layout.tsx            shell: fonts, metadata, Header, Footer
    page.tsx              Home
    about/page.tsx
    careers/page.tsx
    contact/page.tsx
    services/[slug]/page.tsx   phase 3, generateStaticParams
  components/
    Logo.tsx              done
    Header.tsx            extract from page.tsx
    Footer.tsx            extract from page.tsx
    Blueprint.tsx         wrapper emitting .blueprint + 4 corner marks
    QuoteForm.tsx         phase 2
  styles/
    industry.css          design system (do not fork casually)
    nordstar.css          brand overrides + the dark-preference band
  content/                phase 3: services as typed data or MDX
```

## Phases

### Phase 1 — real shell and pages

- [x] Extract `Header` and `Footer` from `page.tsx` into components; render
      them in `layout.tsx` so all routes share them.
- [x] Add `Blueprint` wrapper component (children + the four corner marks) to
      kill the repeated `corners` fragment.
- [x] Sticky header per handoff: same logo past 80px scroll (no shrink swap),
      add `box-shadow: 0 1px 0 rgba(29,31,32,0.10)`; under 640px drop the
      header wordmark, keep the 30px mark.
- [x] `/about`, `/careers` and `/contact` pages with real routes,
      placeholder copy.
- [x] Per-page `metadata` (title template `%s · NordStar Freight`,
      description, Open Graph image using the lockup).
- [ ] Replace placeholder copy on Home with approved marketing copy (ASK —
      copy is a product input, not something to invent).

Acceptance: `npm run build` green, all routes static, header/footer identical
on every page, no repeated corner-mark JSX in pages.

### Phase 2 — quote / contact form

- [x] `QuoteForm` with the system's `.field/.input/.btn` classes: name,
      company, email, phone, origin, destination, freight description.
- [x] Delivery: mailto, zero backend (Alex's decision, 2026-08-07). Valid
      submit composes a prefilled mailto to the inbox; server actions and
      the log seam removed. Addresses (quotes@ / careers@nordstarfreightmn.com)
      are placeholders pending confirmation.
- [x] Zod validation client-side from the shared schemas; error and success
      states styled from the tokens (no browser defaults).

Acceptance: invalid input shows themed errors without navigating, valid
submit opens the visitor's mail client prefilled, each form has a visible
plain mailto fallback link (the no-JS path).

### Phase 2b — careers (driver recruiting)

For a carrier, `/careers` is a recruiting page before it is an HR page:
CDL drivers are the primary audience and often the highest-intent traffic.

- [x] `/careers` page: driver-first pitch (pay structure, home time, lanes,
      equipment age, safety record), then office/ops roles below.
- [x] Openings as typed data (`src/content/jobs.ts`: title, type
      driver/office, location, summary, requirements) rendered as blueprint
      cards; empty state reads "no open roles, send a resume" with a mailto.
- [x] Driver application form: reuse the Phase 2 form plumbing (server
      action + Zod) with driver fields — CDL class, endorsements, years of
      experience, phone. Keep it short; recruiters call, forms don't hire.
- [ ] `/careers/[slug]` detail pages only when real openings exist
      (`generateStaticParams` from `jobs.ts`).

Acceptance: careers route in the header nav, jobs render from data alone
(adding a job = one array entry), application submits through the same
delivery path as the quote form.

### Phase 3 — content depth

- [ ] Service detail pages from typed content (start with a `services.ts`
      array; move to MDX only if copy gets long).
- [x] Numbers/stat section on Home in the Industry "spec sheet plate" grammar
      (see the design project's landing template for the pattern).
- [ ] Real photography through `.duotone`, framed `.blueprint`.
- [x] `sitemap.ts` and `robots.ts`. Plus canonical URLs on every page and
      Organization JSON-LD in the layout (facts already public only).

### Phase 4 — ship

- [x] Deploy to Vercel: live at https://nordstar-tau.vercel.app on the
      alexshanless account (2026-08-08), GitHub repo connected for
      auto-deploys. Earlier deploys on bwx and alexbilba-9241 scopes were
      wrong accounts and are deleted. Custom domain nordstarfreightmn.com
      (apex + www) attached to the project 2026-08-08; DNS records at
      Porkbun (A 76.76.21.21 for apex and www) pending Alex.
- [ ] Lighthouse pass: static pages should be ~100 perf; fix anything under
      90 accessibility (contrast on dark is the likely offender — check
      accent-on-ink text sizes).
- [ ] 32/16px PNG favicon fallbacks + 180px apple-touch-icon from
      `public/brand/` marks (handoff §3 requires them).

## Open questions (need Alex, do not guess)

1. Real copy: services offered, coverage area, differentiators, compliance
   numbers (MC/USDOT lines are placeholders in the handoff).
2. Delivery mechanism decided: mailto, zero backend (2026-08-07). Still
   need the real inboxes — quotes@ and careers@nordstarfreightmn.com are
   invented placeholders.
3. Resolved 2026-08-08: Vercel account alexshanless, domain
   nordstarfreightmn.com (registered at Porkbun, DNS pending).
4. Photography: is there real imagery, or ship type-only until there is?
5. Careers: real open roles and driver pay/home-time facts, and where
   applications should deliver (same inbox as quotes, or a recruiting one?).
