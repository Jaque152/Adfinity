"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, Loader2 } from "lucide-react";
import { PillButton } from "@/components/site/pill-button";
import { ServicesShowcase } from "@/components/site/services-showcase";
import { useLanguage } from "@/lib/language-context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1700&q=80";

export default function Home() {
  const { t } = useLanguage();
  const [hydrated, setHydrated] = useState(false);

  // Evita errores de renderizado asíncrono esperando a la carga del contexto
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center bg-bone">
        <Loader2 className="h-8 w-8 animate-spin text-ink/40" />
      </div>
    );
  }

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-bone pt-8 md:pt-10">
        <div className="container-x">
          <div className="flex items-center justify-between">
            <span className="eyebrow reveal text-ink/50">
              {t.hero.location}
            </span>
            <span className="eyebrow reveal delay-1 hidden text-ink/50 sm:block">
              {t.hero.est}
            </span>
          </div>
        </div>

        {/* Image band */}
        <div className="container-x mt-10 md:mt-14">
          <div className="relative h-[62vh] min-h-[440px] overflow-hidden rounded-[28px]">
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center grayscale"
              style={{ backgroundImage: `url(${HERO_IMG})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/90 via-ink/40 to-transparent" />
            <div className="grain absolute inset-0" />
            <div className="absolute bottom-0 left-0 max-w-2xl p-7 md:p-12">
              <p className="reveal delay-3 text-balance font-display text-2xl font-semibold leading-snug text-bone md:text-3xl">
                {t.hero.tagline}
              </p>
              <div className="reveal delay-4 mt-7">
                <PillButton href="/tienda" tone="dark" variant="solid">
                  {t.hero.btnServices}
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STATEMENT / ABOUT ---------- */}
      <section className="relative overflow-hidden bg-ink py-24 text-bone md:py-36">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <div>
              <span className="eyebrow text-volt">{t.home.statementEyebrow}</span>
            </div>
            <div>
              <p className="display max-w-4xl text-3xl leading-[1.06] text-bone sm:text-4xl md:text-[3.4rem]">
                {t.home.statementText}{" "}
                <span className="text-bone/35">
                  {t.home.statementSubtext}
                </span>
              </p>
              <div className="mt-10">
                <PillButton href="/tienda" tone="dark">
                  {t.home.btnMore}
                </PillButton>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 md:grid-cols-3">
            {t.home.stats.map((s) => (
              <div key={s.v} className="bg-ink p-6 md:p-8">
                <div className="font-display text-4xl font-extrabold text-volt md:text-5xl">
                  {s.k}
                </div>
                <div className="mt-2 text-sm text-bone/55">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow text-volt-deep">{t.home.servicesEyebrow}</span>
              <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-5xl md:text-6xl">
                {t.home.servicesTitle}
              </h2>
            </div>
            <PillButton href="/tienda">{t.home.servicesBtn}</PillButton>
          </div>

          <div className="mt-14">
            <ServicesShowcase />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-bone pb-28 md:pb-36">
        <div className="container-x grid gap-12 md:grid-cols-[1fr_1.25fr]">
          <div>
            <span className="eyebrow text-volt-deep">{t.home.faqEyebrow}</span>
            <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
              {t.home.faqTitle}
            </h2>
            <p className="mt-6 max-w-sm text-ink/60">
              {t.home.faqDesc}
            </p>
            <PillButton href="/contacto" className="mt-8">
              {t.home.faqBtn}
            </PillButton>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {t.home.faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-ink/15"
              >
                <AccordionTrigger className="py-6 text-left font-display text-lg font-bold tracking-tight text-ink hover:no-underline md:text-xl [&[data-state=open]]:text-ink [&>svg]:text-volt-deep">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-ink/65">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}