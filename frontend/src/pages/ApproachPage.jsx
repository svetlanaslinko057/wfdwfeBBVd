// /approach — детальне пояснення методу.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { NodePair } from "@/components/shared/NodePair";
import { APPROACH } from "@/content/approach";
import { APPROACH_T } from "@/constants/testIds";

export default function ApproachPage() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  return (
    <main id="main" ref={rootRef} data-testid={APPROACH_T.page} className="bg-[hsl(var(--bone))]">
      {/* Hero */}
      <section className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] pt-[var(--section-y)] pb-[calc(var(--section-y)*0.6)]">
        <p className="mono-label mb-6">{APPROACH.heroIndex} — ПІДХІД</p>
        <h1 className="max-w-4xl font-serif text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.08] tracking-[-0.02em] text-[hsl(var(--graphite))]">
          {APPROACH.heroTitle}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--text-2))]">{APPROACH.heroSupport}</p>
      </section>

      {/* Що оцінюється */}
      <section aria-labelledby="assess-heading" className="bg-[hsl(var(--warm-white))]">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
          <p className="mono-label mb-6">03 — ОЦІНКА</p>
          <h2 id="assess-heading" className="font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] text-[hsl(var(--graphite))]">
            {APPROACH.assessTitle}
          </h2>
          <dl className="mt-10">
            {APPROACH.assessItems.map((item, i) => (
              <div
                key={item.name}
                className="reveal-fade grid grid-cols-1 gap-2 border-t border-[hsl(var(--hairline))] py-6 last:border-b md:grid-cols-12 md:gap-6"
              >
                <dt className="flex items-baseline gap-4 md:col-span-4">
                  <span className="mono-label">0{i + 1}</span>
                  <span className="text-[17px] font-medium text-[hsl(var(--graphite))]">{item.name}</span>
                </dt>
                <dd className="text-[15px] leading-relaxed text-[hsl(var(--text-2))] md:col-span-7 md:col-start-6">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Протокол */}
      <section aria-labelledby="protocol-heading">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
          <p className="mono-label mb-6">04 — ПРОТОКОЛ</p>
          <h2 id="protocol-heading" className="font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] text-[hsl(var(--graphite))]">
            {APPROACH.protocolTitle}
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {APPROACH.protocol.map((p) => (
              <li key={p.step} className="reveal-fade border-t-2 border-[hsl(var(--graphite))] pt-4">
                <p className="mono-label">{p.step}</p>
                <h3 className="mt-2 font-serif text-xl text-[hsl(var(--graphite))]">{p.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[hsl(var(--text-2))]">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Чого я не роблю — темна смуга довіри */}
      <section aria-labelledby="donts-heading" className="bg-[hsl(var(--charcoal))]">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
          <p className="mono-label mb-6 !text-[hsl(30,8%,62%)]">05 — МЕЖІ</p>
          <h2 id="donts-heading" className="font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] text-[hsl(var(--warm-white))]">
            {APPROACH.dontsTitle}
          </h2>
          <ul className="mt-10 max-w-2xl">
            {APPROACH.donts.map((d, i) => (
              <li
                key={i}
                className="reveal-fade flex items-baseline gap-4 border-t border-[hsl(30,8%,20%)] py-4 text-[16px] text-[hsl(30,8%,74%)] last:border-b"
              >
                <span className="mono-label !text-[hsl(28,28%,58%)]">✕</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Red flags */}
      <section aria-labelledby="redflags-heading">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
          <div className="max-w-3xl rounded-[var(--radius-md)] border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white))] p-7 shadow-[var(--shadow-sm)] sm:p-10">
            <p className="mono-label mb-4">06 — БЕЗПЕКА</p>
            <h2 id="redflags-heading" className="font-serif text-[clamp(1.4rem,2.6vw,2rem)] text-[hsl(var(--graphite))]">
              {APPROACH.redFlagsTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{APPROACH.redFlagsText}</p>
            <ul className="mt-5 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
              {APPROACH.redFlags.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <p className="mono-label mt-6">{APPROACH.redFlagsNote.toUpperCase()}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto flex max-w-[var(--grid-max)] flex-col items-start gap-6 px-[var(--gutter)] pb-[var(--section-y)]">
        <NodePair width={30} muted />
        <Button
          asChild
          size="lg"
          data-testid={APPROACH_T.cta}
          className="rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] px-8 py-6 text-[hsl(var(--warm-white))] hover:bg-[hsl(var(--graphite))]"
        >
          <Link to="/booking">Записатися на первинну зустріч</Link>
        </Button>
      </section>
    </main>
  );
}
