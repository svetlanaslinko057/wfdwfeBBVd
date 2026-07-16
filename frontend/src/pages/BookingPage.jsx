// /booking — повноцінна сторінка запису.
import { BookingForm } from "@/components/booking/BookingForm";
import { NodePair } from "@/components/shared/NodePair";
import { CONTACT } from "@/content/site";
import { BOOKING_T } from "@/constants/testIds";

export default function BookingPage() {
  return (
    <main id="main" data-testid={BOOKING_T.page} className="bg-[hsl(var(--bone))]">
      <div className="mx-auto grid max-w-[var(--grid-max)] grid-cols-1 gap-12 px-[var(--gutter)] py-[var(--section-y)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="mono-label mb-6">09 — ЗАПИС</p>
          <h1 className="font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-[hsl(var(--graphite))]">
            Почніть із оцінки руху
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--text-2))]">
            Перша зустріч — близько 60 хвилин: розмова, оцінка руху та зрозумілий план наступних дій —
            незалежно від того, чи продовжимо ми працювати разом.
          </p>
          <ul className="mt-10 flex flex-col gap-3">
            <li className="mono-label">МІСТО · {CONTACT.city.toUpperCase()}</li>
            <li className="mono-label">ГРАФІК · {CONTACT.hours.toUpperCase()}</li>
            <li className="mono-label">{CONTACT.responseTime.toUpperCase()}</li>
            <li className="mono-label">
              АДРЕСА · НАДАЄТЬСЯ ПІД ЧАС ПІДТВЕРДЖЕННЯ ЗАПИСУ
            </li>
          </ul>
          <div className="mt-10 flex items-center gap-4">
            <NodePair muted />
            <p className="max-w-sm text-[13.5px] leading-relaxed text-[hsl(var(--muted-2))]">
              Скасування або перенесення — без штрафів, просто попередьте заздалегідь. Якщо формат вам не
              підійде — я чесно про це скажу на першій зустрічі.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[var(--radius-lg)] border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white))] p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
