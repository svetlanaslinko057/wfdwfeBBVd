import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV } from "@/constants/testIds";

const LINKS = [
  { to: "/approach", label: "Approach", index: "01", testId: NAV.linkApproach },
  { to: "/conditions", label: "Conditions", index: "02", testId: NAV.linkConditions },
  { to: "/about", label: "About", index: "03", testId: NAV.linkAbout },
];

const desktopLinkClass = ({ isActive }) =>
  `rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] ${
    isActive
      ? "text-[hsl(var(--accent))]"
      : "text-[hsl(var(--text-2))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--text))]"
  }`;

export const SiteHeader = () => {
  const [compressed, setCompressed] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompressed(y > 64 && y > lastY.current);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid={NAV.root}
      className="sticky top-0 z-50 border-b border-[hsl(var(--hairline))] bg-[hsl(var(--bone)/0.82)] backdrop-blur-md"
    >
      <div
        className={`mx-auto flex max-w-[var(--grid-max)] items-center justify-between px-[var(--gutter)] transition-[height] duration-300 ${
          compressed ? "h-[60px]" : "h-[76px]"
        }`}
      >
        {/* Wordmark + node-pair device */}
        <Link
          to="/"
          data-testid={NAV.wordmark}
          className="group flex items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
          aria-label="Kinetic — manual therapy, home"
        >
          <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true" className="shrink-0">
            <path d="M 3 9 C 9 3, 17 3, 23 9" fill="none" stroke="hsl(30, 10%, 40%)" strokeWidth="1" />
            <circle cx="3" cy="9" r="2.5" fill="hsl(28, 28%, 38%)" />
            <circle cx="23" cy="9" r="2" fill="hsl(30, 10%, 30%)" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl lowercase tracking-tight text-[hsl(var(--graphite))]">
              kinetic
            </span>
            <span className="mono-label mt-1 hidden !text-[9px] sm:block">
              Manual therapy / movement systems
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} data-testid={l.testId} className={desktopLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            data-testid={NAV.book}
            className="hidden rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] text-[hsl(var(--warm-white))] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[hsl(var(--graphite))] active:scale-[0.98] md:inline-flex"
          >
            <Link to="/booking">Book an assessment</Link>
          </Button>

          {/* Mobile sheet menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-testid={NAV.menu}
                aria-label="Open navigation menu"
                className="h-11 w-11 rounded-[var(--radius-sm)] text-[hsl(var(--text))] hover:bg-[hsl(var(--accent-soft))] md:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              data-testid={NAV.sheet}
              className="flex w-[86vw] max-w-sm flex-col border-l border-[hsl(var(--hairline))] bg-[hsl(var(--bone))] px-7 pt-16"
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Primary site links and booking action
              </SheetDescription>
              <nav aria-label="Mobile" className="flex flex-1 flex-col gap-2">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 rounded-[var(--radius-sm)] px-2 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] ${
                        isActive ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--graphite))]"
                      }`
                    }
                  >
                    <span className="mono-label">{l.index}</span>
                    <span className="font-serif text-3xl lowercase">{l.label}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="pb-8">
                <Button
                  asChild
                  className="w-full rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] py-6 text-[hsl(var(--warm-white))]"
                >
                  <Link to="/booking" onClick={() => setOpen(false)}>
                    Book an assessment
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
