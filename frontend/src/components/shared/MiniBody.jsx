// MiniBody — повторно використовуваний силует із line-field головного Hero.
// Рендерить контури зі зниженою щільністю; діти (зони/вузли/оверлеї)
// малюються в тій самій системі координат (viewBox 400x720).
import { forwardRef } from "react";
import { CONTOURS, VIEW_W, VIEW_H } from "@/components/hero/bodyModel";

export const MiniBody = forwardRef(function MiniBody(
  { density = 2, opacity = 0.75, className = "", stroke = "hsl(30, 10%, 30%)", children, ...rest },
  ref
) {
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <g className="minibody-contours" opacity={opacity}>
        {CONTOURS.filter((_, i) => i % density === 0).map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="none"
            stroke={stroke}
            strokeWidth="1"
            strokeOpacity={c.opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {children}
    </svg>
  );
});
