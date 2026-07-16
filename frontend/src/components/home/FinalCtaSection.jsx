// 10 — Фінальний CTA. Чесний заклик без тиску.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { NodePair } from "@/components/shared/NodePair";
import { FINAL_CTA } from "@/content/homepage";
import { CTA_T } from "@/constants/testIds";

export const FinalCtaSection = () => {
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
      data-testid={CTA_T.section}
      aria-labelledby="cta-heading"
      className="bg-[hsl(var(--warm-white))]"
    >
      <div className="mx-auto flex max-w-[var(--grid-max)] flex-col items-start px-[var(--gutter)] py-[calc(var(--section-y)*1.15)] md:items-center md:text-center">
        <p className="reveal-fade mono-label mb-6">
          {FINAL_CTA.index} — ЗАПИС
        </p>
        <h2
          id="cta-heading"
          className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[hsl(var(--graphite))]"
        >
          <span className="block overflow-hidden">
            <span className="reveal-line block">{FINAL_CTA.title}</span>
          </span>
        </h2>
        <p className="reveal-fade mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--text-2))]">
          {FINAL_CTA.text}
        </p>
        <div className="reveal-fade mt-10">
          <Button
            asChild
            size="lg"
            data-testid={CTA_T.button}
            className="rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] px-8 py-6 text-[hsl(var(--warm-white))] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[hsl(var(--graphite))] hover:shadow-[var(--shadow-md)] active:scale-[0.98]"
          >
            <Link to="/booking">{FINAL_CTA.button}</Link>
          </Button>
        </div>
        <p className="reveal-fade mono-label mt-8 max-w-md">{FINAL_CTA.micro.toUpperCase()}</p>
        <div className="reveal-fade mt-12">
          <NodePair width={34} muted />
        </div>
      </div>
    </section>
  );
};
