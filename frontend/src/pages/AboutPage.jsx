// /about — одна людина, не клініка. Усі персональні факти — з content/site.js.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { NodePair } from "@/components/shared/NodePair";
import { SPECIALIST } from "@/content/site";
import { ABOUT } from "@/content/about";
import { ABOUT_T } from "@/constants/testIds";

const SpecRow = ({ label, items, emptyText }) => (
  <div className="reveal-fade grid grid-cols-1 gap-2 border-t border-[hsl(var(--hairline))] py-6 last:border-b md:grid-cols-12 md:gap-6">
    <dt className="mono-label md:col-span-4">{label.toUpperCase()}</dt>
    <dd className="md:col-span-7 md:col-start-6">
      {items && items.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {items.map((it, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
              {it}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[15px] leading-relaxed text-[hsl(var(--muted-2))]">{emptyText}</p>
      )}
    </dd>
  </div>
);

export default function AboutPage() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef }
  );

  return (
    <main id="main" ref={rootRef} data-testid={ABOUT_T.page} className="bg-[hsl(var(--bone))]">
      {/* Hero: портрет + позиція */}
      <section className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-12 px-[var(--gutter)] py-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <PhotoSlot
            src={SPECIALIST.portrait}
            alt="Портрет спеціаліста"
            label="ПОРТРЕТ · БУДЕ ДОДАНО"
            ratio="4 / 5"
          />
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className="mono-label mb-6">{ABOUT.index} — {ABOUT.titlePrefix.toUpperCase()}</p>
          <h1 className="font-serif text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-[hsl(var(--graphite))]">
            {SPECIALIST.name || SPECIALIST.displayName}
          </h1>
          <p className="mono-label mt-3">{SPECIALIST.role.toUpperCase()}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">{ABOUT.intro}</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">{ABOUT.position}</p>
        </div>
      </section>

      {/* Специфікація: освіта / сертифікації / досвід */}
      <section className="bg-[hsl(var(--warm-white))]">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
          <dl>
            <SpecRow label={ABOUT.educationTitle} items={SPECIALIST.education} emptyText={ABOUT.educationEmpty} />
            <SpecRow
              label={ABOUT.certificationsTitle}
              items={SPECIALIST.certifications}
              emptyText={ABOUT.certificationsEmpty}
            />
            <SpecRow
              label={ABOUT.experienceTitle}
              items={SPECIALIST.experience ? [SPECIALIST.experience] : []}
              emptyText={ABOUT.experienceEmpty}
            />
          </dl>
        </div>
      </section>

      {/* Принципи */}
      <section className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <h2 className="mono-label mb-8">{ABOUT.principlesTitle.toUpperCase()}</h2>
        <div className="flex flex-col gap-8">
          {SPECIALIST.principles.map((p, i) => (
            <p
              key={i}
              className="reveal-fade max-w-3xl font-serif text-[clamp(1.3rem,2.6vw,2rem)] leading-snug text-[hsl(var(--graphite))]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Простір */}
      <section className="bg-[hsl(var(--warm-white))]">
        <div className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-10 px-[var(--gutter)] py-[var(--section-y)] md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="mono-label mb-4">{ABOUT.studioTitle.toUpperCase()}</h2>
            <p className="max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">{ABOUT.studioText}</p>
          </div>
          <PhotoSlot
            src={SPECIALIST.studioPhoto}
            alt="Простір для роботи"
            label="ФОТО · ПРОСТІР · БУДЕ ДОДАНО"
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto flex max-w-[var(--grid-max)] flex-col items-start gap-6 px-[var(--gutter)] py-[var(--section-y)]">
        <NodePair width={30} muted />
        <Button
          asChild
          size="lg"
          data-testid={ABOUT_T.cta}
          className="rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] px-8 py-6 text-[hsl(var(--warm-white))] hover:bg-[hsl(var(--graphite))]"
        >
          <Link to="/booking">{ABOUT.cta}</Link>
        </Button>
      </section>
    </main>
  );
}
