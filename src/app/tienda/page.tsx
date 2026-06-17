"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PillButton } from "@/components/site/pill-button";
import { ProductCard } from "@/components/site/product-card";
import { TIERS, getProductsByTier } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export default function TiendaPage() {
  // 🔴 AQUÍ ES LA CLAVE: Extraemos 'language' además de 't'
  const { t, language } = useLanguage();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-bone pt-14 md:pt-20">
        <div className="container-x">
          <span className="eyebrow text-volt-deep">{t.store.eyebrow}</span>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="display max-w-4xl text-balance text-4xl text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              {t.store.heading}
            </h1>
            <div>
              <p className="text-lg leading-relaxed text-ink/65">
                {t.store.desc}
              </p>
              <PillButton href="/contacto" className="mt-7">
                {t.store.btnHero}
              </PillButton>
            </div>
          </div>

          {/* Tier quick nav */}
          <div className="mt-12 flex flex-wrap gap-2 border-t border-ink/15 pt-6">
            {TIERS[language].map((tier) => (
              <Link
                key={tier.key}
                href={`#${tier.key}`}
                className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
              >
                {tier.label}
              </Link>
            ))}
            <Link
              href="#medida"
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
            >
              {t.store.customSolutionNav}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- TIERS ---------- */}
      {TIERS[language].map((tier, idx) => {
        // Obtenemos los productos dinámicamente según el idioma activo
        const products = getProductsByTier(tier.key, language);
        
        return (
          <section
            key={tier.key}
            id={tier.key}
            className="scroll-mt-24 bg-bone py-16 md:py-24"
          >
            <div className="container-x">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="font-mono text-sm text-volt-deep">
                    0{idx + 1} /
                  </span>
                  <h2 className="display mt-3 text-4xl text-ink sm:text-5xl md:text-6xl">
                    {tier.label}
                  </h2>
                </div>
                <p className="max-w-md text-ink/60">{tier.desc}</p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------- CUSTOM SOLUTION ---------- */}
      <section id="medida" className="scroll-mt-24 bg-ink py-24 text-bone md:py-32">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow text-volt">/ a la medida</span>
              <h2 className="display mt-5 text-4xl text-bone sm:text-5xl md:text-6xl">
                {t.store.customSolutionTitle}
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/65">
                {t.store.customSolutionDesc}
              </p>

              <ul className="mt-8 space-y-3">
                {t.store.customIncludes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-bone/85">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-volt text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <PillButton href="/contacto" tone="dark" variant="solid">
                  {t.store.btnCustomStart}
                </PillButton>
                <PillButton href="/checkout" tone="dark">
                  {t.store.btnCustomPay}
                </PillButton>
              </div>
            </div>

            {/* Price card */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[32px] bg-cover bg-center opacity-20 blur-2xl"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1100&q=80)",
                }}
              />
              <div className="relative overflow-hidden rounded-[28px] border border-bone/12 bg-ink-soft p-8 md:p-10">
                <div
                  className="mb-8 h-48 w-full rounded-2xl bg-cover bg-center grayscale"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1100&q=80)",
                  }}
                />
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-bone/45">
                  {t.store.priceLabel}
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold text-volt">
                  {t.store.customQuote}
                  <span className="ml-2 text-base font-medium text-bone/50">
                    +IVA
                  </span>
                </p>
                <p className="mt-6 text-sm leading-relaxed text-bone/60">
                  {t.store.customQuoteDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}