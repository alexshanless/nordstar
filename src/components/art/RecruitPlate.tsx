import { ACCENT_FILL, ACCENT_LINE, HAIRLINE } from "./strokes";
import { Crosshair } from "./Marks";
import { Star } from "./Star";

/* Recruiting band background: the densest plate on the page, because this
   band carries the highest-intent traffic on a carrier site and should read
   as a different surface from the sections above it.

   The band itself takes the surface token and hairline top and bottom
   borders (see .ns-band-plate), and this art sits on top of that:

     - a 16px diagonal hatch, hairline, filling the whole plate
     - a lane in perspective, two accent edges converging to the right with
       a long-dash centre line between them
     - a mile-marker ruler along the bottom, short ticks every 40 units and
       tall ticks every 200
     - two waypoint stars sitting on the lane, corner registration marks

   Decorative only: aria-hidden and unfocusable. No animation. */

const TICKS = Array.from({ length: 30 }, (_, i) => 20 + i * 40);

export default function RecruitPlate() {
  return (
    <svg
      className="ns-art-svg"
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="ns-plate-hatch"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <path d="M0 0V16" style={HAIRLINE} vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>

      <rect width="1200" height="320" fill="url(#ns-plate-hatch)" opacity="0.55" />

      <g style={ACCENT_LINE} opacity="0.22">
        <path d="M-20 44L1220 132" vectorEffect="non-scaling-stroke" />
        <path d="M-20 302L1220 192" vectorEffect="non-scaling-stroke" />
        <path
          d="M-20 176L1220 162"
          strokeDasharray="46 34"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g style={HAIRLINE} opacity="0.8">
        <path d="M0 292H1200" vectorEffect="non-scaling-stroke" />
        {TICKS.map((x, i) => (
          <path
            key={x}
            d={`M${x} 292V${292 - (i % 5 === 0 ? 14 : 6)}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      <g style={ACCENT_FILL} opacity="0.4">
        <Star x={188} y={112} size={20} />
        <Star x={1002} y={232} size={13} />
      </g>
      <g style={HAIRLINE} opacity="0.9">
        <Crosshair x={26} y={26} />
        <Crosshair x={1174} y={26} />
        <Crosshair x={26} y={294} />
        <Crosshair x={1174} y={294} />
      </g>
    </svg>
  );
}
