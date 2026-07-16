// SectionHeader — mono-індекс + serif-заголовок + опційний підрядок.
// Використовує .reveal-line / .reveal-fade (анімуються через revealSection).
export const SectionHeader = ({ index, title, support, dark = false, id }) => (
  <div className="max-w-2xl">
    <p
      className={`reveal-fade mono-label mb-6 ${dark ? "!text-[hsl(30,8%,62%)]" : ""}`}
    >
      {index} — {title.toUpperCase()}
    </p>
    <h2
      id={id}
      className={`font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.02em] ${
        dark ? "text-[hsl(var(--warm-white))]" : "text-[hsl(var(--graphite))]"
      }`}
    >
      <span className="block overflow-hidden">
        <span className="reveal-line block">{title}</span>
      </span>
    </h2>
    {support && (
      <p
        className={`reveal-fade mt-5 max-w-xl text-base leading-relaxed ${
          dark ? "text-[hsl(30,8%,70%)]" : "text-[hsl(var(--text-2))]"
        }`}
      >
        {support}
      </p>
    )}
  </div>
);
