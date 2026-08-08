import type { CSSProperties } from "react";

/* Shared stroke/fill declarations for the drawn background art.
   Everything resolves to a design token. Colours are passed through the
   `style` prop rather than SVG presentation attributes because `var()` is
   only reliable in CSS, not in attribute values.

   Only two inks exist on this board: the divider hairline (structure, grids,
   registration marks) and the steel accent (routes, nodes, stars). */

export const HAIRLINE: CSSProperties = {
  fill: "none",
  stroke: "var(--color-divider)",
  strokeWidth: 1,
};

export const ACCENT_LINE: CSSProperties = {
  fill: "none",
  stroke: "var(--color-accent)",
  strokeWidth: 1,
};

export const ACCENT_FILL: CSSProperties = {
  fill: "var(--color-accent)",
  stroke: "none",
};
