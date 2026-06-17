"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-bone/85 backdrop-blur-md"
          : "border-b border-transparent bg-bone",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex xl:gap-9">
          {t.components.navbar.links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-[13px] font-semibold leading-[1.15] tracking-tight transition-colors",
                  active ? "text-volt-deep" : "text-ink/75 hover:text-ink",
                )}
              >
                <span className="xl:hidden">{item.short}</span>
                <span className="hidden max-w-[11rem] xl:block">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Selector de Idioma */}
          <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1 font-mono text-[10px] font-bold">
            <button
              onClick={() => setLanguage("es")}
              className={cn("rounded-full px-2 py-1 transition-colors", language === "es" ? "bg-ink text-volt" : "text-ink/60 hover:text-ink")}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn("rounded-full px-2 py-1 transition-colors", language === "en" ? "bg-ink text-volt" : "text-ink/60 hover:text-ink")}
            >
              EN
            </button>
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir carrito"
            className="group relative flex items-center gap-2 rounded-full border border-ink/15 py-2 pl-4 pr-2 transition-colors hover:border-ink/40"
          >
            <span className="hidden text-xs font-semibold uppercase tracking-wide text-ink sm:inline">
              {t.components.navbar.cart}
            </span>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink text-bone">
              <ShoppingMark />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-volt px-1 font-mono text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink text-bone transition-all duration-500 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo tone="dark" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="container-x flex flex-1 flex-col justify-center gap-2 pb-24">
          {t.components.navbar.links.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group border-b border-bone/10 py-5",
                  active ? "text-volt" : "text-bone",
                )}
              >
                <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
                  0{i + 1} — {item.short}
                </span>
                <span className="font-display text-3xl font-extrabold uppercase tracking-tight">
                  {item.short}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function ShoppingMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M6 8h12l-1 11H7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}