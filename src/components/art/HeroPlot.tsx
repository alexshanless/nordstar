import { ACCENT_FILL, ACCENT_LINE, HAIRLINE } from "./strokes";
import { Crosshair, Terminal } from "./Marks";
import { Star } from "./Star";

/* Hero background: a dispatch plot on a drafting board.

   Four layers, back to front:
     1. two blueprint grids, a 40px working grid under a 200px major grid,
        both hairlines in the divider token
     2. a graticule, four shallow latitude arcs crossed by four meridians,
        so the flat grid reads as a plotted region rather than graph paper
     3. one dashed route running lower-left to upper-right through six
        bends, each bend marked with an open node ring, the two ends closed
        with open squares like a survey traverse
     4. a four-point NordStar-family star at the mid waypoint, plus corner
        registration crosshairs and a ticked scale bar at bottom left

   Everything is decorative: aria-hidden, no focusable content, and the
   whole plot is masked to fade out before the section below it. The grids sit
   at roughly 8 to 15 percent effective contrast against the ink ground and
   the accent route peaks near 25 percent, so nothing competes with the
   headline sitting on top of it. */

/* The viewBox is kept close to the rendered band height so `slice` crops as
   little as possible on a wide screen, and everything stays inside y 20..320
   so nothing important is lost when it does crop. */

const ROUTE = [
  [46, 272],
  [214, 230],
  [402, 246],
  [578, 168],
  [790, 140],
  [1000, 84],
  [1158, 62],
] as const;

const ROUTE_PATH = ROUTE.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join("");

const LATITUDES = [
  "M-40 292C300 232 900 232 1240 292",
  "M-40 232C300 168 900 168 1240 232",
  "M-40 172C300 100 900 100 1240 172",
  "M-40 112C300 32 900 32 1240 112",
];

const MERIDIANS = [
  "M200 -20C158 100 158 240 200 360",
  "M480 -20C452 100 452 240 480 360",
  "M760 -20C788 100 788 240 760 360",
  "M1040 -20C1082 100 1082 240 1040 360",
];

const SCALE_TICKS = [0, 32, 64, 96, 128, 160];

export default function HeroPlot() {
  return (
    <svg
      className="ns-art-svg"
      viewBox="0 0 1200 340"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="ns-plot-fine" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0V40M0 40H40"
            style={HAIRLINE}
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
        <pattern id="ns-plot-major" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            d="M200 0V200M0 200H200"
            style={HAIRLINE}
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>

      {/* 1. working grid and major grid */}
      <rect width="1200" height="340" fill="url(#ns-plot-fine)" opacity="0.5" />
      <rect width="1200" height="340" fill="url(#ns-plot-major)" opacity="0.85" />

      {/* 2. graticule */}
      <g style={ACCENT_LINE} opacity="0.26">
        {LATITUDES.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
        {MERIDIANS.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* 3. plotted route */}
      <path
        d={ROUTE_PATH}
        style={ACCENT_LINE}
        strokeDasharray="7 6"
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
      <g style={ACCENT_LINE} opacity="0.55">
        {ROUTE.slice(1, -1).map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" vectorEffect="non-scaling-stroke" />
        ))}
        <Terminal x={ROUTE[0][0]} y={ROUTE[0][1]} />
        <Terminal x={ROUTE[ROUTE.length - 1][0]} y={ROUTE[ROUTE.length - 1][1]} />
        <Crosshair x={ROUTE[0][0]} y={ROUTE[0][1]} arm={16} />
        <Crosshair x={ROUTE[ROUTE.length - 1][0]} y={ROUTE[ROUTE.length - 1][1]} arm={16} />
      </g>

      {/* 4. waypoint star, corner marks, scale bar */}
      <g style={ACCENT_FILL} opacity="0.6">
        <Star x={578} y={168} size={26} />
        <Star x={1000} y={84} size={13} />
      </g>
      <g style={HAIRLINE} opacity="0.9">
        <Crosshair x={30} y={26} />
        <Crosshair x={1170} y={26} />
        <Crosshair x={30} y={314} />
        <Crosshair x={1170} y={314} />
      </g>
      <g style={HAIRLINE} opacity="0.7">
        <path d="M60 310H220" vectorEffect="non-scaling-stroke" />
        {SCALE_TICKS.map((offset, i) => (
          <path
            key={offset}
            d={`M${60 + offset} 310V${310 - (i % 2 === 0 ? 9 : 5)}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
