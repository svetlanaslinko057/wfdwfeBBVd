// PhotoSlot — місце під реальну фотографію.
// Якщо src є в конфігурації — рендериться фото; якщо ні — фірмова
// композиція з line-field та mono-підписом (не технічна заглушка).
import { CONTOURS } from "@/components/hero/bodyModel";
import { NodePair } from "./NodePair";

export const PhotoSlot = ({ src, alt, label, ratio = "4 / 5", className = "" }) => {
  if (src) {
    return (
      <figure className={`overflow-hidden rounded-[var(--radius-md)] ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </figure>
    );
  }
  return (
    <figure
      role="img"
      aria-label={alt}
      className={`relative flex items-end overflow-hidden rounded-[var(--radius-md)] border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white))] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g opacity="0.5">
          {CONTOURS.filter((_, i) => i % 3 === 0).map((c) => (
            <path key={c.id} d={c.d} fill="none" stroke="hsl(30, 10%, 55%)" strokeWidth="1" strokeOpacity={c.opacity} />
          ))}
        </g>
      </svg>
      <figcaption className="relative z-10 flex w-full items-center gap-3 border-t border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white)/0.9)] px-4 py-3 backdrop-blur-sm">
        <NodePair muted />
        <span className="mono-label">{label}</span>
      </figcaption>
    </figure>
  );
};
