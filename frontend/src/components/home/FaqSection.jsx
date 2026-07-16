// 09 — FAQ. Мінімальний accordion із hairline-роздільниками (shadcn/radix — aria вбудовано).
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FAQ } from "@/content/faq";
import { FAQ_T } from "@/constants/testIds";

export const FaqSection = () => {
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
      data-testid={FAQ_T.section}
      aria-labelledby="faq-heading"
      className="bg-[hsl(var(--bone))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <SectionHeader id="faq-heading" index={FAQ.index} title={FAQ.title} support={FAQ.support} />
        <div className="mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-[hsl(var(--hairline))]">
                <AccordionTrigger
                  data-testid={FAQ_T.item(item.id)}
                  className="min-h-[52px] py-5 text-left text-[16px] font-medium text-[hsl(var(--graphite))] hover:no-underline hover:text-[hsl(var(--accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="reveal-fade mono-label mt-10">{FAQ.disclaimer.toUpperCase()}</p>
        </div>
      </div>
    </section>
  );
};
