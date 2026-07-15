import { Link } from "react-router-dom";
import { PLACEHOLDER } from "@/constants/testIds";

// Calm, on-brand placeholder for routes whose sections arrive in later phases.
export default function PlaceholderPage({ index = "00", title, note }) {
  return (
    <main
      id="main"
      data-testid={PLACEHOLDER.page}
      className="mx-auto flex min-h-[calc(100vh-76px)] max-w-[var(--grid-max)] flex-col justify-center px-[var(--gutter)] py-[var(--section-y)]"
    >
      <p className="mono-label mb-8">{index} — {title?.toUpperCase()}</p>
      <h1 className="max-w-xl font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.06] tracking-[-0.02em] text-[hsl(var(--graphite))]">
        {title}
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">
        {note || "Цей розділ калібрується. Він з'явиться в наступній фазі."}
      </p>
      <div className="mt-10 flex items-center gap-3">
        <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
          <path d="M 3 9 C 9 3, 17 3, 23 9" fill="none" stroke="hsl(30, 10%, 55%)" strokeWidth="1" />
          <circle cx="3" cy="9" r="2.5" fill="hsl(28, 28%, 38%)" />
          <circle cx="23" cy="9" r="2" fill="hsl(30, 10%, 40%)" />
        </svg>
        <Link
          to="/"
          data-testid={PLACEHOLDER.home}
          className="rounded-[var(--radius-sm)] px-2 py-1 text-sm text-[hsl(var(--accent))] underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
        >
          Повернутися до живої системи
        </Link>
      </div>
    </main>
  );
}
