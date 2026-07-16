// 04 — Як пов'язані ділянки тіла. Інтерактивна схема СТОПА→КОЛІНО→ТАЗ→ХРЕБЕТ→ШИЯ.
import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsapSetup";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { revealSection } from "@/lib/gsapSetup";
import { CHAIN } from "@/content/homepage";
import { CHAIN_T } from "@/constants/testIds";

export const ChainSection = () => {
  const rootRef = useRef(null);
  const [active, setActive] = useState("foot");

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  const seg = CHAIN.segments.find((s) => s.id === active);
  const activeIdx = CHAIN.segments.findIndex((s) => s.id === active);

  return (
    <section
      ref={rootRef}
      data-testid={CHAIN_T.section}
      aria-labelledby="chain-heading"
      className="bg-[hsl(var(--warm-white))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <SectionHeader id="chain-heading" index={CHAIN.index} title={CHAIN.title} support={CHAIN.support} />

        {/* Сегменти */}
        <div className="mt-12 overflow-x-auto pb-2">
          <div className="flex min-w-[560px] items-center" role="tablist" aria-label="Сегменти тіла">
            {CHAIN.segments.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === s.id}
                  data-testid={CHAIN_T.segment(s.id)}
                  onClick={() => setActive(s.id)}
                  className={`group flex min-h-[44px] flex-col items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] ${
                    active === s.id ? "" : "hover:bg-[hsl(var(--accent-soft))]"
                  }`}
                >
                  <span
                    className={`block h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                      active === s.id
                        ? "scale-110 bg-[hsl(var(--accent))] shadow-[0_0_0_6px_hsl(28_30%_92%)]"
                        : i < activeIdx
                          ? "bg-[hsl(30,10%,55%)]"
                          : "bg-[hsl(30,10%,74%)]"
                    }`}
                  />
                  <span
                    className={`mono-label whitespace-nowrap ${active === s.id ? "!text-[hsl(var(--accent))]" : ""}`}
                  >
                    {s.name.toUpperCase()}
                  </span>
                </button>
                {i < CHAIN.segments.length - 1 && (
                  <div className="h-px flex-1 bg-[hsl(var(--hairline))]" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Панель */}
        <div
          key={seg.id}
          data-testid={CHAIN_T.panel}
          className="journey-fade-in mt-8 grid grid-cols-1 gap-8 border-t border-[hsl(var(--hairline))] pt-8 md:grid-cols-3"
        >
          <div>
            <p className="mono-label mb-2">РОЛЬ</p>
            <p className="text-base leading-relaxed text-[hsl(var(--text-2))]">{seg.role}</p>
          </div>
          <div>
            <p className="mono-label mb-2">МОЖЛИВА КОМПЕНСАЦІЯ</p>
            <p className="text-base leading-relaxed text-[hsl(var(--text-2))]">{seg.compensation}</p>
          </div>
          <div>
            <p className="mono-label mb-2">ЩО ПЕРЕВІРЯЄТЬСЯ</p>
            <p className="text-base leading-relaxed text-[hsl(var(--text-2))]">{seg.checks}</p>
          </div>
        </div>

        <p className="mono-label reveal-fade mt-10">{CHAIN.note.toUpperCase()}</p>
      </div>
    </section>
  );
};
