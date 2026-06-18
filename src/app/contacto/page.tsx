"use client";

import { PillButton } from "@/components/site/pill-button";
import { ContactForm } from "@/components/site/contact-form";
import { useLanguage } from "@/lib/language-context";

export default function ContactoPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="overflow-hidden bg-bone pt-10 md:pt-14">
        <div className="container-x">
          <div className="overflow-hidden">
            <h1 className="display block text-balance text-[22vw] leading-[0.82] text-ink lg:text-[16vw]">
              <span className="clip-line block">{t.contact.giantWord}</span>
            </h1>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <p className="text-lg leading-relaxed text-ink/70">
              {t.contact.desc1}
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              {t.contact.desc2}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- FORM ---------- */}
      <section className="bg-bone py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="eyebrow text-volt-deep">{t.contact.writeUs}</span>
              <h2 className="display mt-5 text-3xl text-ink sm:text-4xl">
                {t.contact.titleForm}
              </h2>
              <div className="mt-8 space-y-5 border-t border-ink/15 pt-8">
                <ContactRow label={t.contact.labelPhone} value="+52 55 5553 0511" href="tel:+525555530511" />
                <ContactRow
                  label={t.contact.labelEmail}
                  value="contacto@adfinity.com.mx"
                  href="mailto:contacto@adfinity.com.mx"
                />
                <ContactRow
                  label={t.contact.labelLocation}
                  value={t.contact.locationValue}
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-ink/10 bg-card p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PAYMENT CTA ---------- */}
      <section className="bg-bone pb-24 md:pb-32">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-ink px-7 py-14 text-bone md:px-14 md:py-20">
            <div className="grain absolute inset-0" />
            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="eyebrow text-volt">{t.contact.ctaTitle}</span>
                <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                  {t.contact.ctaHeading}
                </h2>
                <p className="mt-6 max-w-lg text-lg text-bone/65">
                  {t.contact.ctaDesc}
                </p>
              </div>
              <div className="flex lg:justify-end">
                <PillButton href="/pago-folio" tone="dark" variant="solid">
                  {t.contact.btnCta}
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
        {label}
      </span>
      <span className="text-right font-semibold text-ink transition-colors group-hover:text-volt-deep">
        {value}
      </span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}