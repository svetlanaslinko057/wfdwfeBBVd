// 05 — Навігатор по тілу: силует із зонами + жива панель. Без сітки карток.
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { MiniBody } from "@/components/shared/MiniBody";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { VIEW_W, VIEW_H } from "@/components/hero/bodyModel";
import { REGIONS, CONDITIONS_PAGE } from "@/content/conditions";
import { REGIONS_T } from "@/constants/testIds";

const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

export const ConditionsNavigator = () => {
  const rootRef = useRef(null);
  const [active, setActive] = useState("neck");

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  const region = REGIONS.find((r) => r.id === active);

  return (
    <section
      ref={rootRef}
      data-testid={REGIONS_T.section}
      aria-labelledby="regions-heading"
      className="bg-[hsl(var(--bone))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <SectionHeader
          id="regions-heading"
          index={CONDITIONS_PAGE.index}
          title="З якими станами я працюю"
          support={CONDITIONS_PAGE.support}
        />

        {/* Mobile selector — tap зберігає стан */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden" role="tablist" aria-label="Ділянки тіла">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={active === r.id}
              data-testid={REGIONS_T.chip(r.id)}
              onClick={() => setActive(r.id)}
              className={`min-h-[44px] whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] ${
                active === r.id
                  ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                  : "border-[hsl(var(--hairline))] text-[hsl(var(--text-2))]"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {/* Силует із зонами */}
          <div className="relative mx-auto h-[42vh] min-h-[300px] lg:col-span-5 lg:h-[64vh]" style={{ aspectRatio: "400 / 720" }}>
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
                  strokeDasharray={active === r.id ? "none" : "3 4"}
                  className="transition-opacity duration-500"
                  opacity={active === r.id ? 0.55 : 0.12}
                />
              ))}
            </MiniBody>
            {/* Зони-кнопки — desktop */}
            <div className="absolute inset-0 hidden lg:block">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  data-testid={REGIONS_T.zone(r.id)}
                  aria-label={`${r.name} — показати типові запити`}
                  aria-pressed={active === r.id}
                  onMouseEnter={() => setActive(r.id)}
                  onFocus={() => setActive(r.id)}
                  onClick={() => setActive(r.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
                  style={{
                    left: pct(r.zone.cx, VIEW_W),
                    top: pct(r.zone.cy, VIEW_H),
                    width: `${Math.max(44, (r.zone.rx * 2 * 100) / VIEW_W)}px`,
                    height: `${Math.max(44, (r.zone.ry * 2 * 100) / VIEW_H)}px`,
                    minWidth: "44px",
                    minHeight: "44px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Жива панель */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div key={region.id} data-testid={REGIONS_T.panel} className="journey-fade-in">
              <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-[hsl(var(--graphite))]">
                {region.name}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">{region.short}</p>
              <ul className="mt-8">
                {region.requests.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-4 border-t border-[hsl(var(--hairline))] py-3 last:border-b"
                  >
                    <span className="mono-label shrink-0">0{i + 1}</span>
                    <span className="text-[15px] text-[hsl(var(--text-2))]">{req}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/conditions/${region.id}`}
                data-testid={REGIONS_T.link}
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-[15px] text-[hsl(var(--accent))] underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
              >
                Як я працюю з цим →
              </Link>
            </div>
          </div>
        </div>

        <p className="mono-label reveal-fade mt-12 max-w-2xl">{CONDITIONS_PAGE.disclaimer.toUpperCase()}</p>
      </div>
    </section>
  );
};
