import type { CSSProperties } from "react";

/* Drafting marks shared by the drawn background art: the "+" crosshair the
   Industry system uses at framed-object corners, and the open square that
   terminates a plotted route. Both are pure hairline geometry. */

export function Crosshair({
  x,
  y,
  arm = 9,
  style,
}: {
  x: number;
  y: number;
  arm?: number;
  style?: CSSProperties;
}) {
  return (
    <path
      d={`M${x - arm} ${y}H${x + arm}M${x} ${y - arm}V${y + arm}`}
      style={style}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export function Terminal({
  x,
  y,
  size = 9,
  style,
}: {
  x: number;
  y: number;
  size?: number;
  style?: CSSProperties;
}) {
  const half = size / 2;
  return (
    <rect
      x={x - half}
      y={y - half}
      width={size}
      height={size}
      style={style}
      vectorEffect="non-scaling-stroke"
    />
  );
}
