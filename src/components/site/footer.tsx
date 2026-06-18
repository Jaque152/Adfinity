"use client";

import Link from "next/link";
import { PillButton } from "./pill-button";
import { Logo } from "./logo";
import { useLanguage } from "@/lib/language-context";

const TEAM_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

export function Footer() {
  const { t } = useLanguage();
  const f = t.components.footer;

  return (
    <footer className="bg-ink text-bone">
      {/* CTA band */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${TEAM_IMG})` }} />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 grain" />
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-bone/10 py-5">
        <div className="flex w-max animate-marquee-slow whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {f.marquee.map((w) => (
                <span key={w} className="flex items-center">
                  <span className="px-6 font-display text-2xl font-extrabold uppercase tracking-tight text-bone/80">
                    {w}
                  </span>
                  <span className="text-volt">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer grid */}
      <div className="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="dark" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/60">
            {f.desc}
          </p>
          <div className="flex gap-3">
            <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center shadow-sm">
              <svg className="h-4" viewBox="0 0 780 500" fill="none"><rect width="780" height="500" rx="40" fill="white"/><path fill="#1434CB" d="M293.2 348.7l33.3-190.4h53.3l-33.3 190.4h-53.3zM500.8 163c-10.5-3.9-27-8.1-47.6-8.1-52.4 0-89.3 26.4-89.6 64.2-.3 28 26.5 43.6 46.7 52.9 20.7 9.5 27.7 15.6 27.6 24.1-.1 13-16.6 19-31.9 19-21.3 0-32.6-3-50.1-10.3l-6.9-3.1-7.5 43.8c12.4 5.4 35.5 10.1 59.4 10.4 55.7 0 91.9-26.1 92.3-66.5.2-22.2-14-39.1-44.6-53-18.6-9-30-15-29.9-24.1 0-8.1 9.6-16.7 30.5-16.7 17.4-.3 30 3.5 39.8 7.5l4.8 2.3 7.2-42.4h.8zM581.8 158.3h-41c-12.7 0-22.2 3.5-27.8 16.2l-78.8 178.2h55.7l11.1-29.1h68.1l6.5 29.1H624l-42.2-194.4zm-65.6 125.2c4.4-11.2 21.3-54.4 21.3-54.4-.3.5 4.4-11.4 7.1-18.7l3.6 16.9s10.2 46.6 12.4 56.2h-44.4z"/><path fill="#1434CB" d="M239.5 158.3L187.4 289l-5.5-26.8c-9.6-30.7-39.5-64-73-80.6l47.5 166.9h56l83.2-190.2h-56.1z"/><path fill="#F7B600" d="M146.9 158.3H61.3l-.6 3.5c66.4 16 110.3 54.7 128.5 101.2l-18.5-88.8c-3.2-12.1-12.5-15.5-23.8-15.9z"/></svg>
            </div>
            <div className="px-3 py-1.5 bg-white rounded flex items-center justify-center shadow-sm">
              <svg className="h-4" viewBox="0 0 152 100" fill="none"><rect width="152" height="100" rx="8" fill="white"/><circle cx="55" cy="50" r="30" fill="#EB001B"/><circle cx="97" cy="50" r="30" fill="#F79E1B"/><path d="M76 27.5C82.6 32.8 87 40.8 87 50C87 59.2 82.6 67.2 76 72.5C69.4 67.2 65 59.2 65 50C65 40.8 69.4 32.8 76 27.5Z" fill="#FF5F00"/></svg>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <FooterHead>{f.navTitle}</FooterHead>
          <ul className="mt-5 space-y-3 text-sm">
            {f.navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-bone/60 transition-colors hover:text-volt">
                  {l.label}.
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <FooterHead>{f.contactTitle}</FooterHead>
          <div className="mt-5 space-y-1.5 text-sm text-bone/60">
            <a href="tel:+525555530511" className="block transition-colors hover:text-volt">+52 55 5553 0511</a>
            <a href="mailto:contacto@adfinity.com.mx" className="block transition-colors hover:text-volt">contacto@adfinity.com.mx</a>
          </div>
          <FooterHead className="mt-8">{f.locationTitle}</FooterHead>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
            {f.locationDesc}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone/10">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-bone/40">{f.rights}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-bone/40">
            <Link href="/privacidad" className="transition-colors hover:text-bone">{f.privacy}</Link>
            <Link href="/terminos" className="transition-colors hover:text-bone">{f.terms}</Link>
            <Link href="/reembolsos" className="transition-colors hover:text-bone">{f.refunds}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHead({ children, className }: { children: React.ReactNode; className?: string; }) {
  return <p className={`font-mono text-[11px] uppercase tracking-[0.28em] text-bone ${className ?? ""}`}>{children}</p>;
}

function PayChip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-bone/15 px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-widest text-bone/70">{children}</span>;
}