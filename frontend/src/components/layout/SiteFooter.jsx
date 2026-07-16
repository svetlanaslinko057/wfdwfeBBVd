// SiteFooter — «система у спокої». Charcoal, лежачий силует на низькій opacity,
// навігація, контакти з конфігу, дисклеймер, політика конфіденційності.
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsapSetup";
import { MiniBody } from "@/components/shared/MiniBody";
import { NodePair } from "@/components/shared/NodePair";
import { SITE, CONTACT, DISCLAIMER } from "@/content/site";
import { FOOTER_T } from "@/constants/testIds";

const NAV_LINKS = [
  { to: "/approach", label: "Підхід" },
  { to: "/conditions", label: "Стани" },
  { to: "/about", label: "Про мене" },
  { to: "/booking", label: "Записатися" },
];

export const SiteFooter = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Один повільний цикл дихання, пауза поза viewport через ScrollTrigger toggle.
      const tw = gsap.to(rootRef.current.querySelector(".footer-body"), {
        scaleY: 1.02,
        transformOrigin: "50% 50%",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 95%",
          onToggle: (self) => (self.isActive ? tw.play() : tw.pause()),
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <footer
      ref={rootRef}
      data-testid={FOOTER_T.root}
      className="relative overflow-hidden bg-[hsl(var(--charcoal))] text-[hsl(30,8%,70%)]"
    >
      <div className="relative z-10 mx-auto max-w-[var(--grid-max)] px-[var(--gutter)] pt-[var(--section-y)] pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
          {/* Бренд */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
              aria-label="Kinetic — на головну"
            >
              <NodePair width={30} />
              <span className="font-serif text-3xl lowercase tracking-tight text-[hsl(var(--warm-white))]">
                {SITE.brand}
              </span>
            </Link>
            <p className="mono-label mt-3 !text-[hsl(30,8%,55%)]">{SITE.descriptor.toUpperCase()}</p>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[hsl(30,8%,62%)]">
              Приватна практика функціональної роботи з тілом: оцінка руху, мануальна робота та повторна
              перевірка результату.
            </p>
          </div>

          {/* Навігація */}
          <nav data-testid={FOOTER_T.nav} aria-label="Футер" className="md:col-span-3">
            <p className="mono-label mb-4 !text-[hsl(30,8%,50%)]">НАВІГАЦІЯ</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `inline-block min-h-[36px] rounded-[var(--radius-sm)] py-1.5 text-[15px] transition-colors hover:text-[hsl(var(--warm-white))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] ${
                        isActive ? "text-[hsl(28,28%,58%)]" : ""
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Практична інформація (все з content/site.js) */}
          <div className="md:col-span-4">
            <p className="mono-label mb-4 !text-[hsl(30,8%,50%)]">ПРАКТИКА</p>
            <ul className="flex flex-col gap-2 text-[14px] leading-relaxed">
              <li>Місто — {CONTACT.city}</li>
              <li>{CONTACT.hours}</li>
              <li>{CONTACT.responseTime}</li>
              <li>
                {CONTACT.address
                  ? CONTACT.address
                  : "Адреса надається під час підтвердження запису"}
              </li>
              <li>
                {CONTACT.phone ? (
                  <a href={`tel:${CONTACT.phone}`} className="hover:text-[hsl(var(--warm-white))]">
                    {CONTACT.phone}
                  </a>
                ) : (
                  "Зв'язок — через форму запису"
                )}
              </li>
              <li>
                {CONTACT.instagram ? (
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:text-[hsl(var(--warm-white))] hover:underline"
                  >
                    Instagram
                  </a>
                ) : (
                  <span className="mono-label !text-[hsl(30,8%,50%)]">INSTAGRAM · БУДЕ ДОДАНО</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Легальний рядок */}
        <div className="mt-16 border-t border-[hsl(30,8%,18%)] pt-6">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-[hsl(30,8%,50%)]">{DISCLAIMER}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
            <Link
              to="/privacy"
              data-testid={FOOTER_T.privacy}
              className="min-h-[36px] py-1.5 underline-offset-4 hover:text-[hsl(var(--warm-white))] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
            >
              Політика конфіденційності
            </Link>
            <span className="mono-label !text-[hsl(30,8%,45%)]">© 2026 · KINETIC</span>
          </div>
        </div>
      </div>

      {/* Тіло у спокої — горизонтальний line-field на низькій opacity */}
      <div className="pointer-events-none relative h-36 overflow-hidden" aria-hidden="true">
        <div className="footer-body absolute left-1/2 top-6 w-[520px] -translate-x-1/2">
          <div className="rotate-90" style={{ transformOrigin: "50% 30%" }}>
            <MiniBody density={2} opacity={0.16} stroke="hsl(30, 10%, 70%)" className="w-full" />
          </div>
        </div>
      </div>
    </footer>
  );
};
