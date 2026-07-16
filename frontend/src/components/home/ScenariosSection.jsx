// 08 — Типові сценарії роботи. Друга темна смуга сторінки.
// НЕ testimonials: чесний формат до появи реальних кейсів.
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SCENARIOS } from "@/content/homepage";
import { SCENARIOS_T } from "@/constants/testIds";

export const ScenariosSection = () => {
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
      data-testid={SCENARIOS_T.section}
      aria-labelledby="scenarios-heading"
      className="bg-[hsl(var(--charcoal))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <SectionHeader
          id="scenarios-heading"
          index={SCENARIOS.index}
          title={SCENARIOS.title}
          support={SCENARIOS.support}
          dark
        />
        <div className="mt-14 flex flex-col">
          {SCENARIOS.items.map((s) => (
            <article
              key={s.id}
              data-testid={SCENARIOS_T.item(s.id)}
              className="reveal-fade grid grid-cols-1 gap-4 border-t border-[hsl(30,8%,20%)] py-10 last:border-b md:grid-cols-12 md:gap-6"
            >
              <p className="mono-label !text-[hsl(28,28%,58%)] md:col-span-4">{s.context}</p>
              <div className="md:col-span-8">
                <h3 className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug text-[hsl(var(--warm-white))]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[hsl(30,8%,70%)]">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="reveal-fade mono-label mt-10 !text-[hsl(30,8%,55%)]">
          {SCENARIOS.note.toUpperCase()}
        </p>
      </div>
    </section>
  );
};
