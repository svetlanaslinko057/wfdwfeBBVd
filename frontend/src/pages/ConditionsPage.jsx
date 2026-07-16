// /conditions — каталог станів: інтерактивна карта тіла + список регіонів. Без ecommerce-сітки.
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { MiniBody } from "@/components/shared/MiniBody";
import { VIEW_W, VIEW_H } from "@/components/hero/bodyModel";
import { REGIONS, CONDITIONS_PAGE } from "@/content/conditions";
import { CONDITIONS_T } from "@/constants/testIds";

const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

export default function ConditionsPage() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  return (
    <main id="main" ref={rootRef} data-testid={CONDITIONS_T.page} className="bg-[hsl(var(--bone))]">
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <p className="mono-label mb-6">05 — СТАНИ</p>
        <h1 className="max-w-3xl font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[hsl(var(--graphite))]">
          З чим до мене приходять
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--text-2))]">{CONDITIONS_PAGE.support}</p>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Карта тіла */}
          <div
            className="relative mx-auto hidden h-[64vh] lg:col-span-5 lg:block"
            style={{ aspectRatio: "400 / 720" }}
          >
            <MiniBody density={2} className="h-full w-full">
              {REGIONS.map((r) => (
                <ellipse
                  key={r.id}
                  cx={r.zone.cx}
                  cy={r.zone.cy}
                  rx={r.zone.rx}
                  ry={r.zone.ry}
                  fill="hsl(28, 30%, 88%)"
                  stroke="hsl(28, 28%, 38%)"
                  strokeWidth="1"
                  strokeDasharray={hovered === r.id ? "none" : "3 4"}
                  className="transition-opacity duration-300"
                  opacity={hovered === r.id ? 0.55 : 0.14}
                />
              ))}
            </MiniBody>
            <div className="absolute inset-0">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-label={`${r.name} — відкрити сторінку регіону`}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(r.id)}
                  onClick={() => navigate(`/conditions/${r.id}`)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
                  style={{
                    left: pct(r.zone.cx, VIEW_W),
                    top: pct(r.zone.cy, VIEW_H),
                    width: "64px",
                    height: "64px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Список регіонів */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ul>
              {REGIONS.map((r, i) => (
                <li key={r.id} className="reveal-fade border-t border-[hsl(var(--hairline))] last:border-b">
                  <Link
                    to={`/conditions/${r.id}`}
                    data-testid={CONDITIONS_T.regionLink(r.id)}
                    onMouseEnter={() => setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="group flex min-h-[76px] items-baseline gap-5 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
                  >
                    <span className="mono-label shrink-0">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-serif text-2xl text-[hsl(var(--graphite))] transition-colors group-hover:text-[hsl(var(--accent))]">
                        {r.name}
                      </span>
                      <span className="mt-1 block max-w-md text-[14px] leading-relaxed text-[hsl(var(--text-2))]">
                        {r.short}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-[hsl(var(--accent))] opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mono-label reveal-fade mt-8 max-w-xl">{CONDITIONS_PAGE.disclaimer.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
