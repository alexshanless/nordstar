import { ACCENT_FILL, ACCENT_LINE, HAIRLINE } from "./strokes";
import { Crosshair, Terminal } from "./Marks";
import { Star } from "./Star";

/* Coverage figure: an abstract plot of the operating region, drawn rather
   than traced. Nothing here is survey accurate and it is not meant to be,
   the point is line art in the blueprint grammar:

     - a 24px drafting grid behind everything
     - one boxy region outline with a notch at the top and an angled edge at
       the lower left, the shape language of the Upper Midwest without being
       any particular set of borders
     - dashed orthogonal hairlines inside it reading as internal boundaries
     - two nested contour curves in the accent, terrain rather than roads
     - eight dashed route spokes radiating from a single hub node, each
       closed with an open square terminal, four of them running past the
       region edge for the scheduled long lanes
     - the hub itself: crosshair, ring, and a four-point star
     - a north arrow at top right, tipped with a small star

   Decorative only: aria-hidden, unfocusable, no text in the graphic. */

const REGION =
  "M96 66H268V52H402L430 74H552V208L528 236V336H372V358H208L176 330H96V214L78 190Z";

const BOUNDARIES = ["M96 214H552", "M268 66V358", "M430 74V336", "M176 140H268"];

const CONTOURS = [
  "M170 150C240 118 380 122 470 158C520 178 508 258 452 288C380 326 250 320 190 286C142 258 130 176 170 150Z",
  "M212 172C268 148 372 152 442 180C480 196 470 254 428 276C370 304 268 298 224 272C188 250 182 190 212 172Z",
];

const HUB = [306, 208] as const;

const SPOKES = [
  [64, 118],
  [200, 44],
  [364, 38],
  [520, 70],
  [600, 178],
  [556, 318],
  [372, 384],
  [172, 352],
] as const;

export default function CoverageFigure() {
  return (
    <svg
      className="ns-art-figure"
      viewBox="0 0 640 420"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="ns-cov-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0V24M0 24H24" style={HAIRLINE} vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>

      <rect width="640" height="420" fill="url(#ns-cov-grid)" opacity="0.4" />

      <g style={HAIRLINE}>
        <path d={REGION} vectorEffect="non-scaling-stroke" />
        <g strokeDasharray="4 5" opacity="0.75">
          {BOUNDARIES.map((d) => (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </g>

      <g style={ACCENT_LINE} strokeDasharray="2 6" opacity="0.28">
        {CONTOURS.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g style={ACCENT_LINE} opacity="0.5">
        {SPOKES.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${HUB[0]} ${HUB[1]}L${x} ${y}`}
            strokeDasharray="6 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {SPOKES.map(([x, y]) => (
          <Terminal key={`t-${x}-${y}`} x={x} y={y} size={7} />
        ))}
      </g>

      <g style={ACCENT_LINE} opacity="0.8">
        <circle cx={HUB[0]} cy={HUB[1]} r="10" vectorEffect="non-scaling-stroke" />
        <Crosshair x={HUB[0]} y={HUB[1]} arm={22} />
      </g>
      <g style={ACCENT_FILL} opacity="0.9">
        <Star x={HUB[0]} y={HUB[1]} size={22} />
      </g>

      <g style={HAIRLINE} opacity="0.8">
        <path d="M596 96V48M588 58L596 48L604 58" vectorEffect="non-scaling-stroke" />
      </g>
      <g style={ACCENT_FILL} opacity="0.7">
        <Star x={596} y={34} size={11} />
      </g>
    </svg>
  );
}
