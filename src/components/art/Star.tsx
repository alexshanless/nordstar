import type { CSSProperties } from "react";

/* Waypoint star. A redrawn echo of the NordStar mark's four-point star
   (see public/brand/favicon-star.svg): concave quadrants, a long vertical
   axis, a shorter horizontal one. It is deliberately NOT the production
   artwork, it is a drafting-board marker in the same family, and per the
   logo rules nothing derived from the mark ever animates.

   Path lives in a 24 x 24 box. The visual waist (where the four arms meet)
   sits at y = 10.5, so `y` positions that point rather than the box centre
   and a star reads as centred on the node it marks. */

export const STAR_PATH =
  "M12 0.5 Q12.6 9.5 21.9 10.5 Q12.6 11.5 12 23.5 Q11.4 11.5 2.1 10.5 Q11.4 9.5 12 0.5 Z";

const WAIST = 10.5;

export function Star({
  x,
  y,
  size,
  style,
}: {
  x: number;
  y: number;
  size: number;
  style?: CSSProperties;
}) {
  const scale = size / 24;
  return (
    <path
      d={STAR_PATH}
      style={style}
      transform={`translate(${x - size / 2} ${y - WAIST * scale}) scale(${scale})`}
    />
  );
}
