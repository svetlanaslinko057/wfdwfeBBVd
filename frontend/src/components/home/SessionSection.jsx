// 06 — Як проходить сеанс. Вертикальна лінія з вузлами часу, line-draw під час скролу.
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, revealSection } from "@/lib/gsapSetup";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { SESSION } from "@/content/homepage";
import { SPECIALIST } from "@/content/site";
import { SESSION_T } from "@/constants/testIds";

export const SessionSection = () => {
  const rootRef = useRef(null);
  const spineRef = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(rootRef);
      revealSection(q, { reduced });
      if (reduced) return;
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current.querySelector(".session-steps"),
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        }
      );
      q(".session-step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      data-testid={SESSION_T.section}
      aria-labelledby="session-heading"
      className="bg-[hsl(var(--warm-white))]"
    >
      <div className="mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] py-[var(--section-y)]">
        <SectionHeader id="session-heading" index={SESSION.index} title={SESSION.title} support={SESSION.support} />
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Таймлайн */}
          <div className="session-steps relative lg:col-span-7">
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[hsl(var(--hairline))]" aria-hidden="true" />
            <div
              ref={spineRef}
              className="absolute left-[3px] top-2 bottom-2 w-px bg-[hsl(var(--accent))]"
              style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
              aria-hidden="true"
            />
            <ol className="flex flex-col gap-10">
              {SESSION.steps.map((s, i) => (
                <li key={s.time} data-testid={SESSION_T.step(i)} className="session-step relative pl-10">
                  <span
                    className="absolute left-0 top-[6px] block h-[7px] w-[7px] rounded-full bg-[hsl(var(--accent))]"
                    aria-hidden="true"
                  />
                  <p className="mono-label">{s.time} · ОРІЄНТОВНО</p>
                  <h3 className="mt-1 font-serif text-xl text-[hsl(var(--graphite))]">{s.name}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[hsl(var(--text-2))]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          {/* Фото-слот рук */}
          <div className="lg:col-span-4 lg:col-start-9">
            <PhotoSlot
              src={SPECIALIST.sessionPhoto}
              alt="Руки спеціаліста під час мануальної роботи"
              label="ФОТО · РУКИ В РОБОТІ · БУДЕ ДОДАНО"
              ratio="4 / 5"
              className="reveal-fade"
            />
            <p className="mono-label reveal-fade mt-4">{SESSION.caption.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
