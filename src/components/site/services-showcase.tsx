"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const { t } = useLanguage();
  const servicesData = t.components.servicesShowcase;

  return (
    <div className="border-b border-ink/15">
      {servicesData.map((s, i) => {
        const open = active === i;
        return (
          <div
            key={s.num}
            onMouseEnter={() => setActive(i)}
            className="border-t border-ink/15"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="flex w-full items-center gap-5 py-7 text-left md:py-9"
            >
              <span className={cn("font-mono text-sm transition-colors", open ? "text-volt-deep" : "text-ink/40")}>
                {s.num}
              </span>
              <span className={cn("flex-1 font-display text-3xl font-bold tracking-tight transition-colors md:text-5xl", open ? "text-ink" : "text-ink/45")}>
                {s.title}
              </span>
              <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500", open ? "rotate-45 border-volt bg-volt text-ink" : "border-ink/20 text-ink/50")}>
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <div className={cn("grid transition-all duration-500 ease-swift", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-9 md:grid-cols-[1.1fr_1fr] md:gap-10">
                  <div className="order-2 md:order-1">
                    <p className="max-w-md text-base leading-relaxed text-ink/70">
                      {s.blurb}
                    </p>
                    <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-volt-deep" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 h-56 overflow-hidden rounded-2xl bg-ink/5 md:order-2 md:h-64">
                    <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url(${s.image})` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}