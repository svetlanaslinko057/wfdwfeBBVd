// /privacy — політика конфіденційності (реальний зміст, не заглушка).
import { DISCLAIMER } from "@/content/site";

export default function PrivacyPage() {
  return (
    <main id="main" className="bg-[hsl(var(--bone))]">
      <div className="mx-auto max-w-3xl px-[var(--gutter)] py-[var(--section-y)]">
        <p className="mono-label mb-6">ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</p>
        <h1 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-[hsl(var(--graphite))]">
          Як обробляються ваші дані
        </h1>
        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
          <section>
            <h2 className="mono-label mb-3">01 · ЯКІ ДАНІ ЗБИРАЮТЬСЯ</h2>
            <p>
              Через форму запису збираються лише дані, необхідні для зв'язку щодо запису: ім'я, номер
              телефону, за бажанням — електронна адреса, опис запиту та бажаний час зустрічі. Медичні
              документи через сайт не збираються і не завантажуються.
            </p>
          </section>
          <section>
            <h2 className="mono-label mb-3">02 · МЕТА ОБРОБКИ</h2>
            <p>
              Дані використовуються виключно для зв'язку щодо запису та підготовки до першої зустрічі.
              Дані не передаються третім особам і не використовуються для розсилок.
            </p>
          </section>
          <section>
            <h2 className="mono-label mb-3">03 · ЗБЕРІГАННЯТА ВИДАЛЕННЯ</h2>
            <p>
              Заявки зберігаються в захищеній базі даних. Ви можете будь-коли попросити видалити ваші дані —
              достатньо написати про це у відповідь на будь-яке повідомлення щодо вашого запису.
            </p>
          </section>
          <section>
            <h2 className="mono-label mb-3">04 · ДИСКЛЕЙМЕР</h2>
            <p>{DISCLAIMER}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
