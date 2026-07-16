// BookingForm — робоча форма запису: валідація, стани (loading/success/error),
// honeypot, захист від повторного сабміту, UTM + source_page, aria-live.
import { useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NodePair } from "@/components/shared/NodePair";
import { CONTACT } from "@/content/site";
import { BOOKING_T } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const METHODS = [
  { value: "phone", label: "Телефон" },
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "email", label: "Email" },
];

const DURATIONS = ["Менше місяця", "1–3 місяці", "3–12 місяців", "Понад рік", "Важко сказати"];

const PHONE_RE = /^\+?[\d\s()\-]{7,20}$/;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export const BookingForm = () => {
  const location = useLocation();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    contact_method: "phone",
    complaint: "",
    duration: "",
    preferred_time: "",
    consent: false,
    company: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState("");
  const [leadId, setLeadId] = useState(null);
  const submittedRef = useRef(false);

  const utm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const out = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return Object.keys(out).length ? out : null;
  }, [location.search]);

  const set = (field) => (e) => {
    const v = e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e;
    setValues((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (values.name.trim().length < 2) errs.name = "Вкажіть ім'я (щонайменше 2 символи).";
    if (!PHONE_RE.test(values.phone.trim())) errs.phone = "Вкажіть коректний номер телефону.";
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim()))
      errs.email = "Вкажіть коректну електронну адресу або залиште поле порожнім.";
    if (values.complaint.trim().length < 5) errs.complaint = "Опишіть коротко, що турбує (від 5 символів).";
    if (!values.consent) errs.consent = "Потрібна згода на обробку персональних даних.";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading" || submittedRef.current) return; // захист від повторного сабміту
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");
    try {
      const payload = {
        ...values,
        email: values.email.trim() || null,
        duration: values.duration || null,
        preferred_time: values.preferred_time.trim() || null,
        source_page: location.pathname,
        utm,
      };
      const res = await axios.post(`${API}/leads`, payload, { timeout: 15000 });
      submittedRef.current = true;
      setLeadId(res.data?.id || null);
      setStatus("success");
      toast.success("Заявку отримано", {
        description: "Я особисто відповім протягом одного робочого дня.",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setServerError(
        typeof detail === "string"
          ? detail
          : "Не вдалося надіслати заявку. Перевірте з'єднання та спробуйте ще раз."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        data-testid={BOOKING_T.success}
        role="status"
        className="rounded-[var(--radius-md)] border border-[hsl(var(--hairline))] bg-[hsl(var(--warm-white))] p-8 shadow-[var(--shadow-sm)]"
      >
        <NodePair width={34} />
        <h3 className="mt-5 font-serif text-2xl text-[hsl(var(--graphite))]">Заявку отримано.</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[hsl(var(--text-2))]">
          Я особисто відповім протягом одного робочого дня — обраним вами способом зв'язку. У відповідь
          узгодимо час і деталі першої зустрічі.
        </p>
        {leadId && <p className="mono-label mt-5">НОМЕР ЗАЯВКИ · {leadId.slice(0, 8).toUpperCase()}</p>}
      </div>
    );
  }

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1.5 text-[13px] text-[hsl(var(--danger))]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form data-testid={BOOKING_T.form} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — приховане поле для ботів */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Не заповнюйте це поле</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set("company")}
        />
      </div>

      <div>
        <Label htmlFor="name" className="text-[hsl(var(--text))]">
          Ім'я <span aria-hidden="true">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          data-testid={BOOKING_T.name}
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-1.5 h-11 bg-[hsl(var(--warm-white))]"
          placeholder="Як до вас звертатися"
        />
        {fieldError("name")}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone" className="text-[hsl(var(--text))]">
            Телефон <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            data-testid={BOOKING_T.phone}
            value={values.phone}
            onChange={set("phone")}
            autoComplete="tel"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-1.5 h-11 bg-[hsl(var(--warm-white))]"
            placeholder="+380 __ ___ __ __"
          />
          {fieldError("phone")}
        </div>
        <div>
          <Label htmlFor="email" className="text-[hsl(var(--text))]">
            Email <span className="mono-label">НЕОБОВ'ЯЗКОВО</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            data-testid={BOOKING_T.email}
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1.5 h-11 bg-[hsl(var(--warm-white))]"
            placeholder="name@example.com"
          />
          {fieldError("email")}
        </div>
      </div>

      <fieldset data-testid={BOOKING_T.method}>
        <legend className="text-sm font-medium text-[hsl(var(--text))]">Бажаний спосіб зв'язку</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {METHODS.map((m) => (
            <label
              key={m.value}
              className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-[hsl(var(--focus-ring))] ${
                values.contact_method === m.value
                  ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                  : "border-[hsl(var(--hairline))] text-[hsl(var(--text-2))]"
              }`}
            >
              <input
                type="radio"
                name="contact_method"
                value={m.value}
                checked={values.contact_method === m.value}
                onChange={set("contact_method")}
                className="sr-only"
              />
              {m.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="complaint" className="text-[hsl(var(--text))]">
          Що турбує <span aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="complaint"
          name="complaint"
          data-testid={BOOKING_T.complaint}
          value={values.complaint}
          onChange={set("complaint")}
          required
          rows={4}
          aria-invalid={!!errors.complaint}
          aria-describedby={errors.complaint ? "complaint-error" : undefined}
          className="mt-1.5 bg-[hsl(var(--warm-white))]"
          placeholder="Наприклад: біль у правому коліні під час спуску сходами, близько 3 місяців"
        />
        {fieldError("complaint")}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="duration" className="text-[hsl(var(--text))]">
            Як давно
          </Label>
          <select
            id="duration"
            name="duration"
            data-testid={BOOKING_T.duration}
            value={values.duration}
            onChange={set("duration")}
            className="mt-1.5 h-11 w-full rounded-md border border-input bg-[hsl(var(--warm-white))] px-3 text-sm text-[hsl(var(--text))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))]"
          >
            <option value="">Оберіть (необов'язково)</option>
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="preferred_time" className="text-[hsl(var(--text))]">
            Бажаний день або період
          </Label>
          <Input
            id="preferred_time"
            name="preferred_time"
            data-testid={BOOKING_T.time}
            value={values.preferred_time}
            onChange={set("preferred_time")}
            className="mt-1.5 h-11 bg-[hsl(var(--warm-white))]"
            placeholder="Наприклад: будні після 18:00"
          />
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            data-testid={BOOKING_T.consent}
            checked={values.consent}
            onChange={set("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[hsl(28,28%,38%)]"
          />
          <span className="text-[14px] leading-relaxed text-[hsl(var(--text-2))]">
            Погоджуюсь на обробку персональних даних для зв'язку щодо запису згідно з{" "}
            <a href="/privacy" className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
              політикою конфіденційності
            </a>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        {fieldError("consent")}
      </div>

      {status === "error" && serverError && (
        <div
          data-testid={BOOKING_T.error}
          role="alert"
          className="rounded-[var(--radius-sm)] border border-[hsl(6,55%,80%)] bg-[hsl(6,55%,96%)] px-4 py-3 text-[14px] text-[hsl(var(--danger))]"
        >
          {serverError}
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {status === "loading" ? "Надсилання заявки…" : ""}
      </div>

      <Button
        type="submit"
        size="lg"
        data-testid={BOOKING_T.submit}
        disabled={status === "loading"}
        className="mt-2 h-12 rounded-[var(--radius-md)] bg-[hsl(var(--charcoal))] text-[hsl(var(--warm-white))] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[hsl(var(--graphite))] active:scale-[0.98] disabled:opacity-60"
      >
        {status === "loading" ? "Надсилання…" : "Надіслати заявку"}
      </Button>
      <p className="mono-label">{CONTACT.responseTime.toUpperCase()}</p>
    </form>
  );
};
