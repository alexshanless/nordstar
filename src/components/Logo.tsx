import Link from "next/link";

/* NordStar Freight brand lockups, ported from the logo handoff
   (design/logo-handoff notes; production artwork in public/brand/).

   The shipped SVGs draw the N/S monogram with live <text> in Barlow
   Condensed 800, which an <img> can't font-load — so the marks are inlined
   here and take the face from the next/font variable, per the handoff's
   "recreate in the target codebase's conventions" instruction.

   Geometry is verbatim from the handoff (0 0 120 120 viewBox):
   - etched mark (≥40px): outer stroke 6, inner machined rule 1.5
   - small mark (28–40px): inner rule dropped, outer stroke 8
   The star's longer lower point is deliberate — do not "correct" it. */

const STAR_PATH = "M50 2 Q52.6 40 92 44 Q52.6 48 50 98 Q47.4 48 8 44 Q47.4 40 50 2 Z";
const INK = "#1D1F20";
const PAPER = "#FFFFFF";
const MONOGRAM_FONT =
  'var(--font-barlow-condensed), "Barlow Condensed", "Arial Narrow", Arial, sans-serif';

type Tone = "black" | "white";
const c = (tone: Tone) => (tone === "white" ? PAPER : INK);

function EtchedMark({ size, tone }: { size: number; tone: Tone }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <polygon points="60,4 111,32 111,88 60,116 9,88 9,32" fill="none" stroke={c(tone)} strokeWidth="6" />
      <polygon points="60,17 100,39 100,81 60,103 20,81 20,39" fill="none" stroke={c(tone)} strokeWidth="1.5" />
      <text x="45" y="76" textAnchor="middle" fontFamily={MONOGRAM_FONT} fontWeight="800" fontSize="44" fill={c(tone)}>N</text>
      <text x="75" y="76" textAnchor="middle" fontFamily={MONOGRAM_FONT} fontWeight="800" fontSize="44" fill={c(tone)}>S</text>
      <g transform="translate(60 61) scale(0.13) translate(-50 -48)">
        <path d={STAR_PATH} fill={c(tone)} />
      </g>
    </svg>
  );
}

function EtchedMarkSmall({ size, tone }: { size: number; tone: Tone }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <polygon points="60,4 111,32 111,88 60,116 9,88 9,32" fill="none" stroke={c(tone)} strokeWidth="8" />
      <text x="44" y="78" textAnchor="middle" fontFamily={MONOGRAM_FONT} fontWeight="800" fontSize="46" fill={c(tone)}>N</text>
      <text x="76" y="78" textAnchor="middle" fontFamily={MONOGRAM_FONT} fontWeight="800" fontSize="46" fill={c(tone)}>S</text>
    </svg>
  );
}

/* Primary lockup — marketing pages, footers. 66px etched mark, two-line
   NORDSTAR / FREIGHT wordmark. Never below a 40px mark. */
export function LogoLockup({ tone = "white" }: { tone?: Tone }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
      <EtchedMark size={66} tone={tone} />
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: MONOGRAM_FONT, fontWeight: 800, fontSize: 34,
            lineHeight: 0.94, letterSpacing: "0.01em", color: c(tone),
          }}
        >
          NORDSTAR
        </span>
        <span
          style={{
            fontFamily: MONOGRAM_FONT, fontWeight: 600, fontSize: 12,
            letterSpacing: "0.40em", color: c(tone),
          }}
        >
          FREIGHT
        </span>
      </span>
    </span>
  );
}

/* Site header logo — 30px small mark + NORDSTAR only, links to root.
   Hover opacity 0.85; no animation on the mark, ever. */
export default function Logo({ tone = "white" }: { tone?: Tone }) {
  return (
    <Link
      href="/"
      aria-label="NordStar Freight — home"
      className="ns-logo"
      style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }}
    >
      <EtchedMarkSmall size={30} tone={tone} />
      {/* Dropped under 640px by .ns-logo-wordmark in nordstar.css — the 30px
          mark carries the header on its own at that width. */}
      <span
        className="ns-logo-wordmark"
        style={{
          fontFamily: MONOGRAM_FONT, fontWeight: 800, fontSize: 19,
          lineHeight: 1, color: c(tone),
        }}
      >
        NORDSTAR
      </span>
    </Link>
  );
}
