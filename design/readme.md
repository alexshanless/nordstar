# Industry design system — handoff notes for Nordstar

Imported from the "Industry" Claude Design project (design-system handoff).
The live stylesheet is `src/styles/industry.css`, loaded globally in
`src/app/layout.tsx`. `theme.json` here is the machine-readable record of the
theme the system was derived from — keep the two in step.

Industry is a wireframe: steel-blue on a light technical ground, Barlow
Condensed headings over Barlow, a modular grid, and cards, figures and buttons
framed as blueprint objects — square-cornered, hairline-bordered, with "+"
registration marks at the corners. Cards and figures stay transparent line
drawings; the primary button is the one solid object on the board, an accent
fill that keeps the square corners and the marks. Photography is duotoned into
the steel accent and icons are thin-stroke (Lucide at stroke-width 1.5).

## How to use it here

- Take every color, font, spacing, radius and shadow from the CSS variables
  (`var(--color-*)`, `var(--font-*)`, `var(--space-*)`, `var(--radius-*)`,
  `var(--shadow-*)`). Never hard-code a hex, a font name or a px value the
  tokens already carry.
- Fonts load via `next/font` in `src/app/layout.tsx` (Barlow 400/500/700,
  Barlow Condensed 400/600) and feed `--font-body` / `--font-heading` through
  the `--font-barlow` / `--font-barlow-condensed` variables. This replaces the
  Google Fonts `@import` the original stylesheet shipped with.
- Frame cards, figures and primary buttons as blueprint objects: the
  `.blueprint` class plus four `<i className="corner tl/tr/bl/br" />` children.
- Wrap content photographs in `.duotone` so they take the steel accent.
- The brand comes from a separate logo handoff (NordStar Freight, one-colour
  black/white, source bundle: `~/Downloads/design_handoff_website_logo/`).
  Production artwork is in `public/brand/`; the header logo and primary
  lockup are inline React components in `src/components/Logo.tsx` (inlined so
  the monogram's live `<text>` can use the next/font Barlow Condensed);
  the favicon is `src/app/icon.svg` (theme-adaptive star). The site runs the
  dark band — token overrides live in `src/styles/nordstar.css`.

## Don't

- Do not round cards, figures or buttons, and do not give cards or figures a
  surface fill — they are line drawings (the solid accent primary button is
  the one deliberate exception).
- Do not drop the registration marks from a framed element.
- Do not use thick icon strokes; the set is Lucide at 1.5.
- Do not add decorative color beyond the steel accent.
