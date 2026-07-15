import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { Button } from "@/components/ui/button";
import { HERO } from "@/constants/testIds";
import {
  CONTOURS,
  NODES,
  NODES_BY_ID,
  EDGES,
  CHAINS,
  AUTO_SEQUENCE,
  MOBILE_NODE_IDS,
  VIEW_W,
  VIEW_H,
  edgeBetween,
} from "./bodyModel";

gsap.registerPlugin(useGSAP, TextPlugin);

const BRONZE = "hsl(28, 28%, 38%)";
const DORMANT = "hsl(30, 8%, 58%)";
const FIELD_BASE_OPACITY = 0.85;
const AUTO_INTERVAL = 9; // seconds between auto propagations
const STEP = 0.32; // per-node stagger inside a propagation

const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

export const ConnectedBodyHero = () => {
  const rootRef = useRef(null);
  const mapRef = useRef(null);
  const breathRef = useRef(null);
  const contoursRef = useRef(null);
  const lensLayerRef = useRef(null);
  const lensCircleRef = useRef(null);
  const originAnnoRef = useRef(null);
  const terminalAnnoRef = useRef(null);
  const liveRef = useRef(null);
  const [hoverNode, setHoverNode] = useState(null);

  // Single-owner animation registry — guarantees no overlapping timelines.
  const anim = useRef({
    reduced: false,
    breath: [],
    prop: null,
    auto: null,
    autoIdx: 0,
    inView: true,
    lengths: {},
    run: null,
    pauseAll: null,
    resumeAll: null,
  });

  const { contextSafe } = useGSAP(
    () => {
      const a = anim.current;
      const q = gsap.utils.selector(rootRef);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      a.reduced = reduced;

      // ---- Headline: masked line reveal (never per-character) ----
      if (!reduced) {
        gsap.fromTo(
          q(".hero-line"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power2.out", stagger: 0.12, delay: 0.15 }
        );
        gsap.fromTo(
          q(".hero-fade"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, delay: 0.55 }
        );
      }

      // ---- Measure pathway lengths, hide active strokes ----
      EDGES.forEach((e) => {
        const el = q(`.edge-active-${CSS.escape(e.id)}`)[0];
        if (!el) return;
        const L = el.getTotalLength();
        a.lengths[e.id] = L;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0.95 });
      });

      const setAnno = (wrapEl, node, side) => {
        wrapEl.style.left = pct(node.x, VIEW_W);
        wrapEl.style.top = pct(node.y, VIEW_H);
        wrapEl.style.transform =
          side === "left"
            ? "translate(calc(-100% - 14px), -50%)"
            : "translate(14px, -50%)";
      };

      // ---- Reduced motion: equivalent static state, zero animation ----
      if (reduced) {
        const chain = CHAINS["ankle-l"];
        chain.forEach((id, i) => {
          gsap.set(q(`.node-${id} .dot`), { attr: { r: 5, fill: BRONZE } });
          gsap.set(q(`.node-${id} .halo`), { opacity: 0.3 });
          if (i > 0) {
            const hit = edgeBetween(chain[i - 1], id);
            if (hit) gsap.set(q(`.edge-active-${CSS.escape(hit.edge.id)}`), { strokeDashoffset: 0 });
          }
        });
        const oWrap = originAnnoRef.current;
        const tWrap = terminalAnnoRef.current;
        setAnno(oWrap, NODES_BY_ID["ankle-l"], "left");
        setAnno(tWrap, NODES_BY_ID.occiput, "right");
        oWrap.querySelector(".anno-text").textContent = "ДЖЕРЕЛО ДИСФУНКЦІЇ";
        tWrap.querySelector(".anno-text").textContent = "БІЛЬ ВІДЧУВАЄТЬСЯ ТУТ";
        gsap.set([oWrap, tWrap], { opacity: 1 });
        return;
      }

      // ---- Breath: 6s sine cycle, transform-only ----
      const scaleTargets = [breathRef.current, lensLayerRef.current];
      a.breath.push(
        gsap.to(scaleTargets, {
          scaleY: 1.015,
          scaleX: 1.006,
          transformOrigin: "50% 62%",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
      [0, 1, 2].forEach((p) => {
        const tw = gsap.fromTo(
          q(`.breath-p${p}`),
          { y: -1.4 },
          { y: 1.4, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 }
        );
        tw.progress((p + 1) * 0.27);
        a.breath.push(tw);
      });

      // ---- Chain state reset (used after a kill — never mid-flight) ----
      const resetChainState = () => {
        NODES.forEach((n) => {
          gsap.set(q(`.node-${n.id} .dot`), { attr: { r: 3.5, fill: DORMANT } });
          gsap.set(q(`.node-${n.id} .halo`), { opacity: 0 });
        });
        EDGES.forEach((e) => {
          gsap.set(q(`.edge-active-${CSS.escape(e.id)}`), {
            strokeDashoffset: a.lengths[e.id],
            opacity: 0.95,
          });
        });
        gsap.set([originAnnoRef.current, terminalAnnoRef.current], { opacity: 0 });
        originAnnoRef.current.querySelector(".anno-text").textContent = "";
        terminalAnnoRef.current.querySelector(".anno-text").textContent = "";
        gsap.set(contoursRef.current, { opacity: FIELD_BASE_OPACITY });
      };

      // ---- Auto scheduler: one pending call max, always guarded ----
      const scheduleNext = () => {
        if (a.auto) a.auto.kill();
        a.auto = gsap.delayedCall(AUTO_INTERVAL, () => {
          a.auto = null;
          if (document.hidden || !a.inView || a.prop) {
            scheduleNext();
            return;
          }
          const origin = AUTO_SEQUENCE[a.autoIdx % AUTO_SEQUENCE.length];
          a.autoIdx += 1;
          runPropagation(origin, true);
        });
      };

      // ---- Propagation: single timeline ref, kill+reset before replace ----
      const buildPropagation = (chain) => {
        const oWrap = originAnnoRef.current;
        const tWrap = terminalAnnoRef.current;
        const oText = oWrap.querySelector(".anno-text");
        const tText = tWrap.querySelector(".anno-text");
        const originNode = NODES_BY_ID[chain[0]];
        const terminalNode = NODES_BY_ID[chain[chain.length - 1]];
        setAnno(oWrap, originNode, originNode.x <= 200 ? "left" : "right");
        setAnno(tWrap, terminalNode, terminalNode.x <= 200 ? "right" : "left");

        const tl = gsap.timeline({
          paused: true,
          onComplete: () => {
            a.prop = null;
            scheduleNext();
          },
        });

        // Tension: field contrast rises as the wave travels
        tl.to(contoursRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
        tl.set(oText, { text: "" }, 0).set(oWrap, { opacity: 1 }, 0.05);
        tl.to(oText, { text: "ДЖЕРЕЛО ДИСФУНКЦІЇ", duration: 0.55, ease: "none" }, 0.05);

        chain.forEach((id, i) => {
          const at = i * STEP;
          tl.to(q(`.node-${id} .dot`), { attr: { r: 5, fill: BRONZE }, duration: 0.25, ease: "power2.out" }, at);
          tl.to(q(`.node-${id} .halo`), { opacity: 0.4, duration: 0.3, ease: "power2.out" }, at);
          if (i > 0) {
            const hit = edgeBetween(chain[i - 1], id);
            if (hit) {
              const L = a.lengths[hit.edge.id];
              tl.to(
                q(`.edge-active-${CSS.escape(hit.edge.id)}`),
                { strokeDashoffset: hit.reversed ? 2 * L : 0, duration: STEP * 1.6, ease: "power1.inOut" },
                (i - 1) * STEP + 0.08
              );
            }
          }
        });

        const endAt = (chain.length - 1) * STEP + 0.3;
        tl.set(tText, { text: "" }, endAt).set(tWrap, { opacity: 1 }, endAt);
        tl.to(tText, { text: "БІЛЬ ВІДЧУВАЄТЬСЯ ТУТ", duration: 0.5, ease: "none" }, endAt);

        // Release: slow exhale, then silent reset of hidden strokes
        const rel = endAt + 1.6;
        tl.to([oWrap, tWrap], { opacity: 0, duration: 0.8, ease: "power2.inOut" }, rel);
        chain.forEach((id) => {
          tl.to(q(`.node-${id} .dot`), { attr: { r: 3.5, fill: DORMANT }, duration: 1, ease: "power2.inOut" }, rel);
          tl.to(q(`.node-${id} .halo`), { opacity: 0, duration: 1, ease: "power2.inOut" }, rel);
        });
        chain.forEach((id, i) => {
          if (i === 0) return;
          const hit = edgeBetween(chain[i - 1], id);
          if (hit) {
            tl.to(q(`.edge-active-${CSS.escape(hit.edge.id)}`), { opacity: 0, duration: 1, ease: "power2.inOut" }, rel);
          }
        });
        tl.to(contoursRef.current, { opacity: FIELD_BASE_OPACITY, duration: 1, ease: "power2.inOut" }, rel);
        chain.forEach((id, i) => {
          if (i === 0) return;
          const hit = edgeBetween(chain[i - 1], id);
          if (hit) {
            tl.set(q(`.edge-active-${CSS.escape(hit.edge.id)}`), { strokeDashoffset: a.lengths[hit.edge.id], opacity: 0.95 }, rel + 1.05);
          }
        });
        tl.set([oText, tText], { text: "" }, rel + 1.05);
        return tl;
      };

      const runPropagation = (originId, isAuto) => {
        if (a.prop) {
          if (isAuto) {
            scheduleNext();
            return;
          }
          a.prop.kill();
          a.prop = null;
          resetChainState();
        }
        if (a.auto) {
          a.auto.kill();
          a.auto = null;
        }
        const chain = CHAINS[originId];
        if (!chain) return;
        if (liveRef.current) {
          liveRef.current.textContent = `Кінетичний ланцюг активовано: від ${NODES_BY_ID[originId].label} до ${NODES_BY_ID[chain[chain.length - 1]].label}.`;
        }
        const tl = buildPropagation(chain);
        a.prop = tl;
        tl.play();
      };

      a.run = runPropagation;

      a.pausedBySystem = false;
      a.pauseAll = () => {
        a.pausedBySystem = true;
        a.breath.forEach((t) => t.pause());
        if (a.prop) a.prop.pause();
        if (a.auto) a.auto.kill();
        a.auto = null;
      };
      a.resumeAll = () => {
        if (!a.pausedBySystem) return; // never reschedule if we never paused
        a.pausedBySystem = false;
        a.breath.forEach((t) => t.resume());
        if (a.prop) a.prop.resume();
        else scheduleNext();
      };

      // First auto propagation arrives sooner to reveal the mechanic
      a.auto = gsap.delayedCall(2.2, () => {
        a.auto = null;
        if (!document.hidden && a.inView && !a.prop) {
          a.autoIdx = 1;
          runPropagation(AUTO_SEQUENCE[0], true);
        } else {
          scheduleNext();
        }
      });

      // ---- Pointer coupling: refs + ONE ticker, zero tweens per pointermove ----
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer && mapRef.current) {
        const ptr = { tx: VIEW_W / 2, ty: VIEW_H / 2, x: VIEW_W / 2, y: VIEW_H / 2, active: false, rect: null };
        const lens = lensCircleRef.current;
        const xTo = gsap.quickTo(breathRef.current, "x", { duration: 0.6, ease: "power2.out" });
        const yTo = gsap.quickTo(breathRef.current, "y", { duration: 0.6, ease: "power2.out" });
        let lastNear = null;

        const tick = () => {
          if (!ptr.active) return;
          ptr.x += (ptr.tx - ptr.x) * 0.14;
          ptr.y += (ptr.ty - ptr.y) * 0.14;
          lens.setAttribute("cx", ptr.x.toFixed(1));
          lens.setAttribute("cy", ptr.y.toFixed(1));
          // Soft magnetic attraction of the whole field (max ±3px)
          xTo(gsap.utils.clamp(-3, 3, (ptr.x - VIEW_W / 2) * 0.02));
          yTo(gsap.utils.clamp(-3, 3, (ptr.y - VIEW_H / 2) * 0.012));
          // Nearest node label (state updates only on change)
          let near = null;
          let best = 3600; // 60px squared
          for (const n of NODES) {
            const dx = n.x - ptr.x;
            const dy = n.y - ptr.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < best) {
              best = d2;
              near = n;
            }
          }
          if ((near && near.id) !== (lastNear && lastNear.id)) {
            lastNear = near;
            setHoverNode(near);
          }
        };
        gsap.ticker.add(tick);

        const toSvg = (e) => {
          const r = ptr.rect;
          if (!r) return;
          ptr.tx = ((e.clientX - r.left) / r.width) * VIEW_W;
          ptr.ty = ((e.clientY - r.top) / r.height) * VIEW_H;
        };
        const onEnter = (e) => {
          ptr.rect = mapRef.current.getBoundingClientRect();
          toSvg(e);
          ptr.x = ptr.tx;
          ptr.y = ptr.ty;
          ptr.active = true;
          gsap.to(lens, { attr: { r: 90 }, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        };
        const onMove = (e) => toSvg(e); // ref write only — no tween creation
        const onLeave = () => {
          ptr.active = false;
          lastNear = null;
          setHoverNode(null);
          gsap.to(lens, { attr: { r: 0 }, duration: 0.5, ease: "power2.inOut", overwrite: "auto" });
          xTo(0);
          yTo(0);
        };
        const el = mapRef.current;
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);

        return () => {
          gsap.ticker.remove(tick);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      }
    },
    { scope: rootRef }
  );

  // Pause everything offscreen and when the tab is hidden
  useEffect(() => {
    const a = anim.current;
    if (a.reduced) return undefined;
    const target = rootRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        a.inView = entry.isIntersecting;
        if (!a.pauseAll || !a.resumeAll) return;
        if (entry.isIntersecting && !document.hidden) a.resumeAll();
        else a.pauseAll();
      },
      { threshold: 0.12 }
    );
    io.observe(target);
    const onVis = () => {
      if (!a.pauseAll || !a.resumeAll) return;
      if (document.hidden) a.pauseAll();
      else if (a.inView) a.resumeAll();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const onNodeActivate = contextSafe((id) => {
    if (anim.current.reduced) return; // static state already shows the chain
    if (anim.current.run) anim.current.run(id, false);
  });

  return (
    <section
      ref={rootRef}
      data-testid={HERO.section}
      className="relative overflow-hidden bg-[hsl(var(--bone))]"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 70% 20%, rgba(206,137,70,0.10), transparent 60%), radial-gradient(900px 500px at 20% 70%, rgba(60,52,44,0.06), transparent 55%)",
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[var(--grid-max)] grid-cols-1 gap-8 px-[var(--gutter)] pt-10 pb-8 lg:grid-cols-12 lg:gap-6 lg:pt-0 lg:pb-0">
        {/* Left column — editorial statement */}
        <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5">
          <p className="hero-fade mono-label mb-8">01 — ЖИВА СИСТЕМА</p>
          <h1 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.04] tracking-[-0.02em] text-[hsl(var(--graphite))]">
            <span className="block overflow-hidden">
              <span className="hero-line block">Біль — це</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">сигнал.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">Рідко — джерело.</span>
            </span>
          </h1>
          <p className="hero-fade mt-8 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">
            Мануальна терапія та відновлення руху. Я простежую дисфункцію крізь
            ланцюги тіла — і лікую там, де вона починається.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              data-testid={HERO.book}
              className="rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] px-7 text-[hsl(var(--warm-white))] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[hsl(var(--graphite))] hover:shadow-[var(--shadow-md)] active:scale-[0.98]"
            >
              <Link to="/booking">Записатися на діагностику</Link>
            </Button>
            <Link
              to="/approach"
              data-testid={HERO.how}
              className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[hsl(var(--text))] transition-colors duration-200 hover:bg-[hsl(var(--accent-soft))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
            >
              Як це працює →
            </Link>
          </div>
        </div>

        {/* Right column — the living body map */}
        <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-7">
          <div
            ref={mapRef}
            data-testid={HERO.bodymap}
            className="relative h-[56vh] max-h-[640px] min-h-[380px] lg:h-[78vh]"
            style={{ aspectRatio: "400 / 720" }}
          >
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="h-full w-full"
              role="img"
              aria-labelledby="bodymap-title bodymap-desc"
              preserveAspectRatio="xMidYMid meet"
            >
              <title id="bodymap-title">Пов'язане тіло</title>
              <desc id="bodymap-desc">
                Абстрактний топографічний силует людини з тонких контурних
                ліній. Дванадцять анатомічних точок з'єднані кінетичними
                ланцюгами; активація точки показує, як дисфункція поширюється,
                наприклад, від стопи до шиї.
              </desc>
              <defs>
                <radialGradient id="lens-grad">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="70%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="lens-mask">
                  <circle ref={lensCircleRef} cx="200" cy="360" r="0" fill="url(#lens-grad)" />
                </mask>
              </defs>

              <g ref={breathRef}>
                <g ref={contoursRef} opacity={FIELD_BASE_OPACITY}>
                  {CONTOURS.map((c, i) => (
                    <path
                      key={c.id}
                      d={c.d}
                      className={`breath-p${c.phase}${i % 2 === 1 ? " contour-dense" : ""}`}
                      fill="none"
                      stroke="hsl(30, 10%, 26%)"
                      strokeWidth="1"
                      strokeOpacity={c.opacity}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>

                {/* Pathways: dormant dotted ghosts + active bronze strokes */}
                <g>
                  {EDGES.map((e) => (
                    <g key={e.id}>
                      <path
                        d={e.d}
                        fill="none"
                        stroke="hsl(30, 10%, 70%)"
                        strokeWidth="1"
                        strokeDasharray="2 5"
                        strokeOpacity="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        className={`edge-active-${e.id}`}
                        d={e.d}
                        fill="none"
                        stroke={BRONZE}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ))}
                </g>

                {/* Nodes */}
                <g>
                  {NODES.map((n) => (
                    <g key={n.id} className={`node-${n.id}`}>
                      <circle className="halo" cx={n.x} cy={n.y} r="12" fill={BRONZE} opacity="0" />
                      <circle className="dot" cx={n.x} cy={n.y} r="3.5" fill={DORMANT} />
                    </g>
                  ))}
                </g>
              </g>

              {/* Contrast lens following the cursor (masked duplicate) */}
              <g ref={lensLayerRef} mask="url(#lens-mask)" className="pointer-events-none">
                {CONTOURS.map((c) => (
                  <path
                    key={`lens-${c.id}`}
                    d={c.d}
                    className={`breath-p${c.phase}`}
                    fill="none"
                    stroke="hsl(30, 10%, 20%)"
                    strokeWidth="1"
                    strokeOpacity={Math.min(c.opacity + 0.14, 0.3)}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            </svg>

            {/* Accessible hotspots — real buttons over the SVG */}
            <div className="absolute inset-0">
              {NODES.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  data-testid={HERO.node(n.id)}
                  aria-label={`${n.label} — простежити кінетичний ланцюг від цієї точки`}
                  onClick={() => onNodeActivate(n.id)}
                  className={`absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background-color] duration-200 hover:bg-[hsl(var(--accent)/0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    MOBILE_NODE_IDS.includes(n.id) ? "" : "hidden md:block"
                  }`}
                  style={{ left: pct(n.x, VIEW_W), top: pct(n.y, VIEW_H) }}
                />
              ))}
            </div>

            {/* Propagation annotations (typed on) */}
            <div
              ref={originAnnoRef}
              data-testid={HERO.annotationOrigin}
              className="pointer-events-none absolute flex items-center gap-1.5 whitespace-nowrap opacity-0"
            >
              <span className="text-[8px] leading-none text-[hsl(var(--accent))]">●</span>
              <span className="anno-text mono-label !text-[hsl(var(--accent))]" />
            </div>
            <div
              ref={terminalAnnoRef}
              data-testid={HERO.annotationTerminal}
              className="pointer-events-none absolute flex items-center gap-1.5 whitespace-nowrap opacity-0"
            >
              <span className="text-[8px] leading-none text-[hsl(var(--graphite))]">○</span>
              <span className="anno-text mono-label !text-[hsl(var(--graphite))]" />
            </div>

            {/* Nearest-node label (desktop pointer only) */}
            {hoverNode && (
              <div
                data-testid={HERO.nodeLabel}
                className="pointer-events-none absolute -translate-y-8 translate-x-4 whitespace-nowrap"
                style={{ left: pct(hoverNode.x, VIEW_W), top: pct(hoverNode.y, VIEW_H) }}
              >
                <span className="mono-label rounded-sm border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white)/0.9)] px-2 py-1 backdrop-blur-sm">
                  {hoverNode.label}
                </span>
              </div>
            )}

            {/* Mobile hint chip */}
            <div
              data-testid={HERO.hint}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden"
            >
              <span className="mono-label rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white)/0.85)] px-3 py-1.5 backdrop-blur-sm">
                Торкніться точки
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom mono legend */}
      <div
        data-testid={HERO.legend}
        className="mx-auto flex max-w-[var(--grid-max)] flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--hairline))] px-[var(--gutter)] py-4"
      >
        <span className="mono-label">РИС.00 · КІНЕТИЧНИЙ ЛАНЦЮГ, ЗАДНЯ ЛІНІЯ</span>
        <span className="mono-label">
          <span className="text-[hsl(var(--accent))]">●</span> ДЖЕРЕЛО&nbsp;&nbsp;
          <span>○</span> ВІДОБРАЖЕНИЙ БІЛЬ
        </span>
      </div>

      {/* Screen-reader announcements */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />
    </section>
  );
};
