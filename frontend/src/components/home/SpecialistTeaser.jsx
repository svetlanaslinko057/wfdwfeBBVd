// 07 — Про спеціаліста (teaser). Повна інформація — на /about.
// Жодних вигаданих фактів — дані беруться з content/site.js.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { NodePair } from "@/components/shared/NodePair";
import { SPECIALIST } from "@/content/site";
import { SPECIALIST_T } from "@/constants/testIds";

export const SpecialistTeaser = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      data-testid={SPECIALIST_T.section}
      aria-labelledby="specialist-heading"
      className="bg-[hsl(var(--bone))]"
    >
      <div className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-12 px-[var(--gutter)] py-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <PhotoSlot
            src={SPECIALIST.portrait}
            alt="Портрет спеціаліста"
            label="ПОРТРЕТ · БУДЕ ДОДАНО"
            ratio="4 / 5"
            className="reveal-fade"
          />
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className="reveal-fade mono-label mb-6">07 — ПРО СПЕЦІАЛІСТА</p>
          <h2
            id="specialist-heading"
            className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[hsl(var(--graphite))]"
          >
            <span className="block overflow-hidden">
              <span className="reveal-line block">{SPECIALIST.name || SPECIALIST.displayName}</span>
            </span>
          </h2>
          <p className="reveal-fade mono-label mt-3">{SPECIALIST.role.toUpperCase()}</p>
          <p className="reveal-fade mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">
            Я не ганяюся за вашим болем. Я шукаю, де він починається — і перевіряю результат тими самими
            тестами, що й на початку сеансу.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {SPECIALIST.principles.map((f, i) => (
              <li key={i} className="reveal-fade flex items-start gap-3">
                <NodePair muted className="mt-[7px] shrink-0" width={20} />
                <span className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{f}</span>
              </li>
            ))}
          </ul>
          <div className="reveal-fade mt-8">
            <Link
              to="/about"
              data-testid={SPECIALIST_T.more}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-[15px] text-[hsl(var(--accent))] underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
            >
              Дізнатися більше →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
