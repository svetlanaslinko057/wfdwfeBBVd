// /conditions/:region — єдиний reusable-шаблон для 6 регіонів.
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { MiniBody } from "@/components/shared/MiniBody";
import { NodePair } from "@/components/shared/NodePair";
import PlaceholderPage from "@/pages/PlaceholderPage";
import { REGIONS_BY_ID, REGIONS } from "@/content/conditions";
import { DISCLAIMER } from "@/content/site";
import { REGION_PAGE_T } from "@/constants/testIds";

export default function ConditionRegionPage() {
  const { region: regionId } = useParams();
  const rootRef = useRef(null);
  const region = REGIONS_BY_ID[regionId];

  useGSAP(
    () => {
      if (!region) return;
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced: prefersReducedMotion() });
    },
    { scope: rootRef, dependencies: [regionId] }
  );

  if (!region) {
    return (
      <PlaceholderPage
        index="404"
        title="Ця сторінка втратила вирівнювання."
        note="Такої ділянки немає в навігаторі. Оберіть регіон зі сторінки Стани."
      />
    );
  }

  const idx = REGIONS.findIndex((r) => r.id === regionId);

  return (
    <main id="main" ref={rootRef} data-testid={REGION_PAGE_T.page} className="bg-[hsl(var(--bone))]">
      {/* Hero регіону */}
      <section className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-10 px-[var(--gutter)] pt-[var(--section-y)] pb-[calc(var(--section-y)*0.5)] lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="mono-label mb-6">
            <Link to="/conditions" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]">
              СТАНИ
            </Link>{" "}
            / 0{idx + 1} — {region.name.toUpperCase()}
          </p>
          <h1 className="font-serif text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.06] tracking-[-0.02em] text-[hsl(var(--graphite))]">
            {region.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--text-2))]">{region.short}</p>

          <h2 className="mono-label mt-12 mb-4">ТИПОВІ ЗАПИТИ</h2>
          <ul>
            {region.requests.map((req, i) => (
              <li key={i} className="flex items-baseline gap-4 border-t border-[hsl(var(--hairline))] py-3 last:border-b">
                <span className="mono-label shrink-0">0{i + 1}</span>
                <span className="text-[15px] text-[hsl(var(--text-2))]">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto hidden h-[52vh] lg:col-span-4 lg:col-start-9 lg:block" style={{ aspectRatio: "400 / 720" }}>
          <MiniBody density={2}>
            <ellipse
              cx={region.zone.cx}
              cy={region.zone.cy}
              rx={region.zone.rx}
              ry={region.zone.ry}
              fill="hsl(28, 30%, 88%)"
              stroke="hsl(28, 28%, 38%)"
              strokeWidth="1"
              opacity="0.55"
            />
          </MiniBody>
        </div>
      </section>

      {/* Що перевіряється + сусідні ділянки */}
      <section className="bg-[hsl(var(--warm-white))]">
        <div className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-10 px-[var(--gutter)] py-[var(--section-y)] md:grid-cols-2">
          <div className="reveal-fade">
            <h2 className="mono-label mb-4">ЩО МОЖЕ ПЕРЕВІРЯТИСЯ</h2>
            <ul className="flex flex-col gap-3">
              {region.checks.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
                  <NodePair muted width={20} className="mt-[7px] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-fade">
            <h2 className="mono-label mb-4">СУСІДНІ ДІЛЯНКИ</h2>
            <p className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{region.neighbors}</p>
            <h2 className="mono-label mt-8 mb-4">ЯК ПРОХОДИТЬ ОЦІНКА</h2>
            <p className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{region.assessment}</p>
          </div>
        </div>
      </section>

      {/* Обмеження + коли до лікаря */}
      <section className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="reveal-fade rounded-[var(--radius-md)] border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white))] p-7">
            <h2 className="mono-label mb-3">ЧОГО НЕ ВИЗНАЧИТИ БЕЗ ЗУСТРІЧІ</h2>
            <p className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{region.limits}</p>
          </div>
          <div className="reveal-fade rounded-[var(--radius-md)] border border-[hsl(28,28%,80%)] bg-[hsl(var(--accent-soft))] p-7">
            <h2 className="mono-label mb-3 !text-[hsl(var(--accent))]">КОЛИ ПОТРІБНА КОНСУЛЬТАЦІЯ ЛІКАРЯ</h2>
            <p className="text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{region.doctor}</p>
          </div>
        </div>
        <p className="mono-label reveal-fade mt-8">{DISCLAIMER.toUpperCase()}</p>
      </section>

      {/* FAQ регіону */}
      <section className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] pb-[var(--section-y)]">
        <h2 className="mono-label mb-4">ПИТАННЯ ПРО ЦЮ ДІЛЯНКУ</h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {region.faq.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-[hsl(var(--hairline))]">
                <AccordionTrigger className="min-h-[52px] py-4 text-left text-[15.5px] font-medium text-[hsl(var(--graphite))] hover:text-[hsl(var(--accent))] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-14 flex flex-col items-start gap-6">
          <NodePair width={30} muted />
          <Button
            asChild
            size="lg"
            data-testid={REGION_PAGE_T.cta}
            className="rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] px-8 py-6 text-[hsl(var(--warm-white))] hover:bg-[hsl(var(--graphite))]"
          >
            <Link to="/booking">Записатися на оцінку</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
