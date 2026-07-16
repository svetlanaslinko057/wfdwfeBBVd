// 02 — Маніфест. Типографіка, повітря, line-mask reveal, node-pair між твердженнями.
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsapSetup";
import { NodePair } from "@/components/shared/NodePair";
import { MANIFESTO } from "@/content/homepage";
import { MANIFESTO_T } from "@/constants/testIds";

export const ManifestoSection = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(rootRef);
      q(".manifesto-line").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });
      q(".manifesto-hairline").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      data-testid={MANIFESTO_T.section}
      aria-labelledby="manifesto-heading"
      className="bg-[hsl(var(--bone))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[calc(var(--section-y)*1.2)]">
        <p className="mono-label mb-14">
          {MANIFESTO.index} — {MANIFESTO.title.toUpperCase()}
        </p>
        <h2 id="manifesto-heading" className="sr-only">
          {MANIFESTO.title}
        </h2>
        <div className="flex flex-col gap-14 md:gap-20">
          {MANIFESTO.lines.map((line, i) => (
            <div key={i} className="max-w-3xl">
              <p
                data-testid={MANIFESTO_T.line(i)}
                className="overflow-hidden font-serif text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.18] tracking-[-0.01em] text-[hsl(var(--graphite))]"
              >
                <span className="manifesto-line block">{line}</span>
              </p>
              {i < MANIFESTO.lines.length - 1 && (
                <div className="mt-14 flex items-center gap-6 md:mt-20">
                  <div className="manifesto-hairline h-px flex-1 bg-[hsl(var(--hairline))]" />
                  <NodePair muted />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
