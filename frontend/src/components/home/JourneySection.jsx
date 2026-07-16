// 03 — Від компенсації до відновлення.
// Одна state machine (7 станів) + одна схема тіла.
// Desktop: pinned scroll (ScrollTrigger, ~350vh). Mobile/reduced-motion: stepper без scroll-jacking.
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsapSetup";
import { MiniBody } from "@/components/shared/MiniBody";
import { EDGES, NODES, edgeBetween } from "@/components/hero/bodyModel";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { JOURNEY } from "@/content/homepage";
import { JOURNEY_T } from "@/constants/testIds";

const BRONZE = "hsl(28, 28%, 38%)";
const GRAPHITE = "hsl(30, 10%, 22%)";
const DORMANT = "hsl(30, 8%, 58%)";
const CHAIN = ["ankle-l", "knee-l", "hip-l", "l4", "t7", "c7", "occiput"];
const DETOURS = [
  "M 170 470 C 200 420, 226 380, 228 306", // коліно-L -> таз-R (обхід)
  "M 228 306 C 224 288, 210 268, 200 248", // таз-R -> L4
];

export const JourneySection = () => {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const svgRef = useRef(null);
  const fillRef = useRef(null);
  const [stateIdx, setStateIdx] = useState(0);
  const [dark, setDark] = useState(false);
  const anim = useRef({ tl: null, pulse: null, lengths: {}, plumbLen: 0, reduced: false, inView: true });

  const applyState = useCallback((idx) => {
    const a = anim.current;
    const svg = svgRef.current;
    if (!svg) return;
    const q = gsap.utils.selector(svg);
    if (a.tl) a.tl.kill();
    if (a.pulse) {
      a.pulse.kill();
      a.pulse = null;
    }
    const D = a.reduced ? 0 : 0.6;
    const tl = gsap.timeline({ defaults: { duration: D, ease: "power2.inOut", overwrite: "auto" } });
    a.tl = tl;

    // Базовий стан (все в нуль) — потім накладаємо стан-специфіку
    tl.to(q(".jr-body"), { rotation: 0, transformOrigin: "50% 95%" }, 0);
    NODES.forEach((n) => {
      tl.to(q(`.jr-node-${n.id} .dot`), { attr: { r: 3.5, fill: DORMANT }, opacity: 1 }, 0);
      tl.to(q(`.jr-node-${n.id} .halo`), { opacity: 0 }, 0);
    });
    EDGES.forEach((e) => {
      tl.to(q(`.jr-edge-${CSS.escape(e.id)}`), { strokeDashoffset: a.lengths[e.id] || 0, opacity: 0.9 }, 0);
    });
    tl.to(q(".jr-detour"), { opacity: 0 }, 0);
    tl.to(q(".jr-measure"), { opacity: 0 }, 0);
    tl.to(q(".jr-rings"), { opacity: 0 }, 0);
    tl.to(q(".jr-rom"), { opacity: 0 }, 0);
    tl.to(q(".jr-pain"), { opacity: 0 }, 0);
    tl.to(q(".jr-plumb"), { opacity: 0.25, strokeDashoffset: 0 }, 0);

    const nodeOn = (id, fill = BRONZE, at = 0) => {
      tl.to(q(`.jr-node-${id} .dot`), { attr: { r: 5, fill } }, at);
      tl.to(q(`.jr-node-${id} .halo`), { opacity: 0.35 }, at);
    };

    switch (idx) {
      case 0: // Рух — спокійна система
        break;
      case 1: // Компенсація — таз-L випадає, обхідні шляхи, нахил
        tl.to(q(".jr-node-hip-l .dot"), { opacity: 0.3 }, 0.1);
        tl.to(q(".jr-detour"), { opacity: 0.8 }, 0.15);
        tl.to(q(".jr-body"), { rotation: 1.6, transformOrigin: "50% 95%" }, 0.1);
        break;
      case 2: // Біль — темна смуга, шия пульсує
        tl.to(q(".jr-node-hip-l .dot"), { opacity: 0.3 }, 0);
        tl.to(q(".jr-detour"), { opacity: 0.6 }, 0);
        tl.to(q(".jr-body"), { rotation: 1.6, transformOrigin: "50% 95%" }, 0);
        nodeOn("c7", BRONZE, 0.1);
        tl.to(q(".jr-pain"), { opacity: 1 }, 0.2);
        if (!a.reduced) {
          a.pulse = gsap.to(q(".jr-node-c7 .halo"), {
            opacity: 0.15,
            duration: 1.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
        break;
      case 3: // Оцінка — вимірювальні оверлеї
        NODES.forEach((n) => tl.to(q(`.jr-node-${n.id} .dot`), { attr: { fill: GRAPHITE } }, 0.1));
        tl.to(q(".jr-measure"), { opacity: 1 }, 0.15);
        break;
      case 4: // Робота з тілом — точковий тиск у джерелі
        nodeOn("hip-l", BRONZE, 0.1);
        tl.to(q(".jr-rings"), { opacity: 1 }, 0.1);
        if (!a.reduced) {
          a.pulse = gsap.fromTo(
            q(".jr-ring"),
            { attr: { r: 8 }, opacity: 0.5 },
            { attr: { r: 26 }, opacity: 0, duration: 1.6, ease: "power2.out", repeat: -1, stagger: 0.55 }
          );
        }
        break;
      case 5: { // Повторна перевірка — ланцюг перемальовується чисто, ROM росте
        CHAIN.forEach((id, i) => {
          nodeOn(id, BRONZE, 0.1 + i * 0.14);
          if (i > 0) {
            const hit = edgeBetween(CHAIN[i - 1], id);
            if (hit) {
              const L = a.lengths[hit.edge.id];
              tl.to(
                q(`.jr-edge-${CSS.escape(hit.edge.id)}`),
                { strokeDashoffset: hit.reversed ? 2 * L : 0, duration: a.reduced ? 0 : 0.3, ease: "power1.inOut" },
                0.1 + (i - 1) * 0.14
              );
            }
          }
        });
        tl.to(q(".jr-rom"), { opacity: 1 }, 0.2);
        const counter = { v: 140 };
        const romText = q(".jr-rom-value")[0];
        if (romText) {
          tl.to(
            counter,
            {
              v: 165,
              duration: a.reduced ? 0 : 1.2,
              ease: "power2.out",
              onUpdate: () => {
                romText.textContent = `${Math.round(counter.v)}\u00B0`;
              },
            },
            0.3
          );
        }
        break;
      }
      case 6: // Баланс — відвіс рівно вертикальний, один повільний видих
        tl.to(q(".jr-plumb"), { opacity: 0.8 }, 0.1);
        if (!a.reduced) {
          tl.fromTo(
            q(".jr-body"),
            { scaleY: 1 },
            { scaleY: 1.012, transformOrigin: "50% 62%", duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1 },
            0.2
          );
        }
        break;
      default:
        break;
    }
    setDark(idx === 2);
  }, []);

  // Вимірювання довжин ребер один раз + початковий стан
  useGSAP(
    () => {
      const a = anim.current;
      a.reduced = prefersReducedMotion();
      const q = gsap.utils.selector(svgRef);
      EDGES.forEach((e) => {
        const el = q(`.jr-edge-${CSS.escape(e.id)}`)[0];
        if (!el) return;
        const L = el.getTotalLength();
        a.lengths[e.id] = L;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
      });
      const plumb = q(".jr-plumb")[0];
      if (plumb) {
        const L = plumb.getTotalLength();
        gsap.set(plumb, { strokeDasharray: "4 6", opacity: 0.25 });
      }
      applyState(0);

      // Desktop: pinned scrub. Створюється лише на великих екранах без reduced-motion.
      if (!a.reduced) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          let lastIdx = -1;
          const st = ScrollTrigger.create({
            trigger: pinRef.current,
            start: "top top",
            end: "+=330%",
            pin: true,
            scrub: 0.4,
            onUpdate: (self) => {
              if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`;
              const idx = Math.min(6, Math.floor(self.progress * 7));
              if (idx !== lastIdx) {
                lastIdx = idx;
                setStateIdx(idx);
              }
            },
          });
          return () => st.kill();
        });
        return () => mm.revert();
      }
      return undefined;
    },
    { scope: rootRef, dependencies: [applyState] }
  );

  // Застосування стану при зміні індексу
  useEffect(() => {
    applyState(stateIdx);
  }, [stateIdx, applyState]);

  // Пауза циклічних пульсів поза viewport / при прихованій вкладці
  useEffect(() => {
    const a = anim.current;
    const target = rootRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        a.inView = entry.isIntersecting;
        if (a.pulse) entry.isIntersecting && !document.hidden ? a.pulse.resume() : a.pulse.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(target);
    const onVis = () => {
      if (a.pulse) document.hidden || !a.inView ? a.pulse.pause() : a.pulse.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const state = JOURNEY.states[stateIdx];
  const isDark = dark;

  const diagram = (
    <MiniBody
      ref={svgRef}
      density={2}
      data-testid={JOURNEY_T.diagram}
      className="jr-svg h-full w-full"
      stroke="hsl(30, 10%, 30%)"
    >
      <g className="jr-body">
        {/* Відвіс */}
        <path className="jr-plumb" d="M 200 6 L 200 714" fill="none" stroke={BRONZE} strokeWidth="1" opacity="0.25" vectorEffect="non-scaling-stroke" />
        {/* Шляхи */}
        <g>
          {EDGES.map((e) => (
            <g key={e.id}>
              <path d={e.d} fill="none" stroke="hsl(30, 10%, 60%)" strokeWidth="1" strokeDasharray="2 5" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
              <path className={`jr-edge-${e.id}`} d={e.d} fill="none" stroke={BRONZE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </g>
        {/* Обхідні шляхи компенсації */}
        <g className="jr-detour" opacity="0">
          {DETOURS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={GRAPHITE} strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {/* Вузли */}
        <g>
          {NODES.map((n) => (
            <g key={n.id} className={`jr-node-${n.id}`}>
              <circle className="halo" cx={n.x} cy={n.y} r="11" fill={BRONZE} opacity="0" />
              <circle className="dot" cx={n.x} cy={n.y} r="3.5" fill={DORMANT} />
            </g>
          ))}
        </g>
        {/* Тиск-кільця (стан «Робота») */}
        <g className="jr-rings" opacity="0">
          <circle className="jr-ring" cx="172" cy="306" r="8" fill="none" stroke={BRONZE} strokeWidth="1" />
          <circle className="jr-ring" cx="172" cy="306" r="8" fill="none" stroke={BRONZE} strokeWidth="1" />
        </g>
        {/* Вимірювальні оверлеї (стан «Оцінка») */}
        <g className="jr-measure" opacity="0">
          <path d="M 132 296 L 124 296 L 124 336 L 132 336" fill="none" stroke={GRAPHITE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M 268 90 L 276 90 L 276 130 L 268 130" fill="none" stroke={GRAPHITE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M 150 470 A 50 50 0 0 1 200 430" fill="none" stroke={GRAPHITE} strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          <text x="108" y="286" className="jr-mono-svg">ROM</text>
          <text x="104" y="420" className="jr-mono-svg">140°</text>
        </g>
        {/* ROM-лічильник (стан «Повторна перевірка») */}
        <g className="jr-rom" opacity="0">
          <text x="96" y="300" className="jr-mono-svg">ROM 140° →</text>
          <text x="110" y="318" className="jr-mono-svg jr-rom-value" fill={BRONZE}>140°</text>
        </g>
        {/* Підпис болю (стан «Біль») */}
        <g className="jr-pain" opacity="0">
          <text x="238" y="78" className="jr-mono-svg" fill={BRONZE}>СИМПТОМ ≠ ДЖЕРЕЛО</text>
        </g>
      </g>
    </MiniBody>
  );

  const stepper = (
    <div className="flex items-center gap-3" role="group" aria-label="Керування станами">
      <button
        type="button"
        data-testid={JOURNEY_T.prev}
        onClick={() => setStateIdx((i) => Math.max(0, i - 1))}
        disabled={stateIdx === 0}
        aria-label="Попередній стан"
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] disabled:opacity-30 ${
          isDark ? "border-[hsl(30,8%,30%)] text-[hsl(var(--warm-white))]" : "border-[hsl(var(--hairline))] text-[hsl(var(--graphite))]"
        }`}
      >
        ←
      </button>
      <div className="flex flex-1 items-center justify-center gap-2" role="tablist" aria-label="Стани">
        {JOURNEY.states.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === stateIdx}
            aria-label={`${i + 1}. ${s.title}`}
            data-testid={JOURNEY_T.step(i)}
            onClick={() => setStateIdx(i)}
            className={`h-11 w-6 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]`}
          >
            <span
              className={`mx-auto block h-2 w-2 rounded-full transition-all duration-300 ${
                i === stateIdx
                  ? "scale-125 bg-[hsl(var(--accent))]"
                  : isDark
                    ? "bg-[hsl(30,8%,40%)]"
                    : "bg-[hsl(30,10%,78%)]"
              }`}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        data-testid={JOURNEY_T.next}
        onClick={() => setStateIdx((i) => Math.min(6, i + 1))}
        disabled={stateIdx === 6}
        aria-label="Наступний стан"
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] disabled:opacity-30 ${
          isDark ? "border-[hsl(30,8%,30%)] text-[hsl(var(--warm-white))]" : "border-[hsl(var(--hairline))] text-[hsl(var(--graphite))]"
        }`}
      >
        →
      </button>
    </div>
  );

  return (
    <section
      ref={rootRef}
      data-testid={JOURNEY_T.section}
      aria-labelledby="journey-heading"
      data-dark={isDark ? "true" : "false"}
      className={`journey-section transition-colors duration-700 ${isDark ? "bg-[hsl(var(--charcoal))]" : "bg-[hsl(var(--bone))]"}`}
    >
      <div ref={pinRef} className="lg:flex lg:min-h-screen lg:items-center">
        <div className="mx-auto grid w-full max-w-[var(--grid-max)] grid-cols-1 gap-8 px-[var(--gutter)] py-[var(--section-y)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-10">
          {/* Ліва колонка — текст стану */}
          <div className="order-2 lg:order-1 lg:col-span-4">
            <p className={`mono-label mb-6 ${isDark ? "!text-[hsl(30,8%,62%)]" : ""}`}>
              {JOURNEY.index} — {JOURNEY.title.toUpperCase()}
            </p>
            <h2 id="journey-heading" className="sr-only">
              {JOURNEY.title}
            </h2>
            <div data-testid={JOURNEY_T.stage} key={state.id} className="journey-fade-in">
              <p className={`mono-label mb-3 ${isDark ? "!text-[hsl(28,28%,58%)]" : "!text-[hsl(var(--accent))]"}`}>
                0{stateIdx + 1} / 07 · {state.label}
              </p>
              <h3
                data-testid={JOURNEY_T.stateTitle}
                className={`font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight tracking-[-0.02em] ${
                  isDark ? "text-[hsl(var(--warm-white))]" : "text-[hsl(var(--graphite))]"
                }`}
              >
                {state.title}
              </h3>
              <p className={`mt-4 max-w-sm text-base leading-relaxed ${isDark ? "text-[hsl(30,8%,72%)]" : "text-[hsl(var(--text-2))]"}`}>
                {state.copy}
              </p>
            </div>
            <div className="mt-8 lg:hidden">{stepper}</div>
            <p className={`mono-label mt-8 hidden lg:block ${isDark ? "!text-[hsl(30,8%,45%)]" : ""}`}>
              ГОРТАЙТЕ, ЩОБ ПРОЙТИ СТАНИ ↓
            </p>
          </div>

          {/* Центр — схема */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-7">
            <div className="h-[46vh] min-h-[320px] lg:h-[78vh]" style={{ aspectRatio: "400 / 720" }}>
              {diagram}
            </div>
          </div>

          {/* Права шкала прогресу — лише desktop */}
          <div className="order-3 hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:gap-3" aria-hidden="true">
            <span className={`mono-label ${isDark ? "!text-[hsl(30,8%,55%)]" : ""}`}>01</span>
            <div data-testid={JOURNEY_T.progress} className={`relative h-48 w-px overflow-hidden ${isDark ? "bg-[hsl(30,8%,26%)]" : "bg-[hsl(var(--hairline))]"}`}>
              <div ref={fillRef} className="absolute inset-0 origin-top bg-[hsl(var(--accent))]" style={{ transform: "scaleY(0)" }} />
            </div>
            <span className={`mono-label ${isDark ? "!text-[hsl(30,8%,55%)]" : ""}`}>07</span>
          </div>
        </div>
      </div>
    </section>
  );
};
