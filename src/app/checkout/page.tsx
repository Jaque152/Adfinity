"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  CreditCard,
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/products";
import { cn } from "@/lib/utils";
import { processEtominPayment } from "./etomin-action"; // Importamos el Server Action

type FormState = {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  additionalInfo: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  country: "MX", // Default a México
  address: "",
  city: "",
  zip: "",
  phone: "",
  email: "",
  additionalInfo: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export default function CheckoutPage() {
  const { items, subtotal, iva, total, clear, hydrated } = useCart();
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const cardDigits = useMemo(
    () => form.cardNumber.replace(/\D/g, ""),
    [form.cardNumber],
  );

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    const req = t.checkout.validation.required;
    
    if (!form.firstName.trim()) e.firstName = req;
    if (!form.lastName.trim()) e.lastName = req;
    if (!form.address.trim()) e.address = req;
    if (!form.city.trim()) e.city = req;
    if (!form.zip.trim()) e.zip = req;
    if (!form.phone.trim()) e.phone = req;
    
    if (!form.email.trim()) e.email = req;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t.checkout.validation.invalidEmail;
      
    if (!form.cardName.trim()) e.cardName = req;
    if (cardDigits.length < 15) e.cardNumber = t.checkout.validation.incompleteCard;
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/AA";
    if (form.cvc.length < 3) e.cvc = "3-4";
    
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error(t.checkout.validation.toastTitle, {
        description: t.checkout.validation.toastDesc,
      });
    }
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    
    setProcessing(true);
    
    // Preparar el Payload para Etomin
    const [expMonth, expYear] = form.expiry.split("/");
    const payload = {
      amount: total,
      billing: {
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        address: form.address,
        city: form.city,
        zip: form.zip,
        phone: form.phone,
        email: form.email,
      },
      cardData: {
        cardName: form.cardName,
        cardNumber: cardDigits,
        expMonth: expMonth,
        expYear: `20${expYear}`,
        cvc: form.cvc
      },
      items: items
    };

    // Llamada segura al Server Action
    const result = await processEtominPayment(payload);

    setProcessing(false);

    if (result.success) {
      setOrderNo(result.orderId || "");
      setDone(true);
      clear();
      toast.success(t.checkout.validation.toastSuccess, { description: `${t.checkout.order} ${result.orderId || ""}` });
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // Si la pasarela pide redirección (como un 3D Secure), ejecutarla aquí
      if (result.redirect && result.redirect !== "") {
          window.location.href = result.redirect;
      }
    } else {
      toast.error(t.checkout.validation.toastError, { description: result.error });
    }
  }

  if (!hydrated) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
      </div>
    );
  }

  if (done) {
    return (
      <section className="bg-bone py-20 md:py-28">
        <div className="container-tight">
          <div className="overflow-hidden rounded-[28px] border border-ink/10 bg-card">
            <div className="bg-ink px-8 py-14 text-center text-bone md:px-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt text-ink">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <h1 className="display mt-8 text-4xl text-bone sm:text-5xl">
                {t.checkout.thanks}
              </h1>
              <p className="mx-auto mt-4 max-w-md text-bone/65">
                {t.checkout.confirmationDesc}
              </p>
              <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-bone/15 px-5 py-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-bone/45">
                  {t.checkout.order}
                </span>
                <span className="font-display text-lg font-extrabold text-volt">
                  {orderNo}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 px-8 py-10 text-center md:flex-row md:justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-bone transition-transform hover:scale-[1.03]"
              >
                {t.checkout.btnHome}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tienda"
                className="text-sm font-semibold text-ink/60 underline-offset-4 hover:text-ink hover:underline"
              >
                {t.checkout.exploreMore}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-bone py-24 md:py-32">
        <div className="container-tight flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/15">
            <ShoppingBag className="h-7 w-7 text-ink/40" />
          </div>
          <h1 className="display mt-8 text-4xl text-ink sm:text-5xl">
            {t.checkout.emptyCart}
          </h1>
          <p className="mt-4 max-w-md text-ink/60">
            {t.checkout.emptyDesc}
          </p>
          <Link
            href="/tienda"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            {t.checkout.btnServices}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bone py-12 md:py-16">
      <div className="container-x">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
          <Link href="/tienda" className="hover:text-ink">
            {t.checkout.breadcrumbServices}
          </Link>
          <span>/</span>
          <span className="text-ink">{t.checkout.breadcrumbCheckout}</span>
        </div>
        <h1 className="display mt-4 text-5xl text-ink sm:text-6xl md:text-7xl">
          {t.checkout.title}
        </h1>

        <form
          id="checkout"
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
        >
          {/* LEFT: fields */}
          <div className="space-y-12">
            
            {/* 1. FACTURACIÓN */}
            <fieldset>
              <Legend num="01">{t.checkout.billingData}</Legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label={t.checkout.firstName}
                  value={form.firstName}
                  onChange={(v) => set("firstName", v)}
                  error={errors.firstName}
                  placeholder={t.checkout.firstNamePlaceholder}
                />
                <Input
                  label={t.checkout.lastName}
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                  error={errors.lastName}
                  placeholder={t.checkout.lastNamePlaceholder}
                />
                <div className="sm:col-span-2">
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    {t.checkout.country}
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="w-full rounded-xl border border-ink/15 bg-card px-4 py-3.5 text-ink outline-none transition-all focus:border-ink focus:ring-2 focus:ring-volt/50 appearance-none"
                  >
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="ES">España</option>
                    <option value="CO">Colombia</option>
                    <option value="AR">Colombia</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Input
                    label={t.checkout.address}
                    value={form.address}
                    onChange={(v) => set("address", v)}
                    error={errors.address}
                    placeholder={t.checkout.addressPlaceholder}
                  />
                </div>
                <Input
                  label={t.checkout.city}
                  value={form.city}
                  onChange={(v) => set("city", v)}
                  error={errors.city}
                  placeholder={t.checkout.cityPlaceholder}
                />
                <Input
                  label={t.checkout.zip}
                  value={form.zip}
                  onChange={(v) => set("zip", v.replace(/\D/g, "").slice(0, 5))}
                  error={errors.zip}
                  placeholder={t.checkout.zipPlaceholder}
                  inputMode="numeric"
                />
                <Input
                  label={t.checkout.phone}
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  error={errors.phone}
                  placeholder={t.checkout.phonePlaceholder}
                />
                <Input
                  label={t.checkout.email}
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  error={errors.email}
                  placeholder={t.checkout.emailPlaceholder}
                />
                <div className="sm:col-span-2">
                  <Input
                    label={t.checkout.additionalInfo}
                    value={form.additionalInfo}
                    onChange={(v) => set("additionalInfo", v)}
                    placeholder={t.checkout.additionalInfoPlaceholder}
                  />
                </div>
              </div>
            </fieldset>

            {/* 2. PAGO */}
            <fieldset>
              <Legend num="02">{t.checkout.payment}</Legend>
              
              <div className="rounded-2xl border border-ink/10 bg-card p-5 sm:p-6 shadow-sm">
                {/* Cabecera con Logo de Etomin */}
                <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 text-sm font-bold text-ink">
                      <CreditCard className="h-4 w-4" /> 
                    </span>
                  </div>
                  {/* Etomin SVG desde carpeta public */}
                  <div className="flex items-center gap-1.5 opacity-80">
                    <img 
                      src="etomin_logo.svg" 
                      alt="Etomin" 
                      className="h-5 w-auto" 
                    />
                  </div>
                </div>

                <div className="grid gap-5">
                  <Input
                    label={t.checkout.cardName}
                    value={form.cardName}
                    onChange={(v) => set("cardName", v)}
                    error={errors.cardName}
                    placeholder={t.checkout.cardNamePlaceholder}
                  />
                  <div className="relative">
                    <Input
                      label={t.checkout.cardNumber}
                      value={form.cardNumber}
                      onChange={(v) => set("cardNumber", formatCard(v))}
                      error={errors.cardNumber}
                      placeholder={t.checkout.cardNumberPlaceholder}
                      inputMode="numeric"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-1">
                      <Chip>VISA</Chip>
                      <Chip>MC</Chip>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Input
                      label={t.checkout.expiry}
                      value={form.expiry}
                      onChange={(v) => set("expiry", formatExpiry(v))}
                      error={errors.expiry}
                      placeholder={t.checkout.expiryPlaceholder}
                      inputMode="numeric"
                    />
                    <Input
                      label={t.checkout.cvc}
                      value={form.cvc}
                      onChange={(v) =>
                        set("cvc", v.replace(/\D/g, "").slice(0, 4))
                      }
                      error={errors.cvc}
                      placeholder={t.checkout.cvcPlaceholder}
                      inputMode="numeric"
                      type="password"
                    />
                  </div>
                </div>

                {/* Pago Seguro SVG desde carpeta public */}
                <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-emerald-50/50 py-3 text-emerald-700 border border-emerald-100/50">
                  <img 
                    src="etomin_secbadge.svg" 
                    alt="Pago Seguro" 
                    className="h-12 w-12" 
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{t.checkout.securePayment}</span>
                </div>
              </div>
            </fieldset>
          </div>

          {/* RIGHT: summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[24px] border border-ink/10 bg-ink text-bone">
              <div className="border-b border-bone/10 px-6 py-5">
                <h2 className="font-display text-lg font-extrabold uppercase tracking-tight">
                  {t.checkout.summary}
                </h2>
              </div>
              <ul className="max-h-[320px] divide-y divide-bone/10 overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 py-4">
                    <div
                      className="h-14 w-14 shrink-0 rounded-lg bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                          {item.sku} · x{item.qty}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold">
                        {formatMXN(item.price * item.qty)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-bone/10 px-6 py-5 text-sm">
                <Row label={t.checkout.subtotal} value={formatMXN(subtotal)} />
                <Row label={t.checkout.iva} value={formatMXN(iva)} />
                <div className="flex items-baseline justify-between border-t border-bone/10 pt-3">
                  <span className="font-display text-base font-bold">{t.checkout.total}</span>
                  <span className="font-display text-2xl font-extrabold text-volt">
                    {formatMXN(total)}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  form="checkout"
                  disabled={processing}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-volt py-4 font-display text-sm font-extrabold uppercase tracking-wide text-ink transition-all hover:bg-bone disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t.checkout.processing}
                    </>
                  ) : (
                    <>
                      {t.checkout.btnPay} {formatMXN(total)}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-[10px] leading-relaxed text-bone/40">
                  {t.checkout.terms}
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

/* ---------- helpers & subcomponents ---------- */

function formatCard(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function Legend({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 border-b border-ink/15 pb-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-volt">
        {num}
      </span>
      <h2 className="font-display text-xl font-bold tracking-tight text-ink">
        {children}
      </h2>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "numeric" | "text" | "email";
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-card px-4 py-3.5 text-ink placeholder:text-ink/35 outline-none transition-all focus:border-ink focus:ring-2 focus:ring-volt/50",
          error ? "border-destructive" : "border-ink/15",
        )}
      />
      {error && <p className="mt-1 text-[11px] font-semibold text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-bone/60">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-ink/15 bg-bone px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-widest text-ink/50">
      {children}
    </span>
  );
}