"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, count, subtotal, iva, total } = useCart();
  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l-0 bg-ink p-0 text-bone sm:max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
          <div className="flex items-baseline gap-3">
            <SheetTitle className="font-display text-xl font-extrabold uppercase tracking-tight text-bone">
              {t.components.cartDrawer.title}
            </SheetTitle>
            <span className="font-mono text-xs text-volt">
              [{String(count).padStart(2, "0")}]
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/15">
              <ShoppingBag className="h-6 w-6 text-bone/50" />
            </div>
            <div>
              <p className="font-display text-lg font-bold">
                {t.components.cartDrawer.emptyTitle}
              </p>
              <p className="mt-1 text-sm text-bone/50">
                {t.components.cartDrawer.emptyDesc}
              </p>
            </div>
            <Link
              href="/tienda"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink transition-transform hover:scale-[1.03]"
            >
              {t.components.cartDrawer.btnExplore}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-bone/10">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <div
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold leading-tight">
                            {item.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-bone/40">
                            {item.sku}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="Eliminar"
                          className="text-bone/40 transition-colors hover:text-volt"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-1 rounded-full border border-bone/15 p-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center font-mono text-sm">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-bone/70 transition-colors hover:bg-bone/10 hover:text-bone"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold">
                          {formatMXN(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer / totals */}
            <div className="border-t border-bone/10 bg-ink-soft px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-bone/60">
                  <dt>{t.components.cartDrawer.subtotal}</dt>
                  <dd>{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-bone/60">
                  <dt>{t.components.cartDrawer.iva}</dt>
                  <dd>{formatMXN(iva)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-bone/10 pt-3">
                  <dt className="font-display text-base font-bold text-bone">
                    {t.components.cartDrawer.total}
                  </dt>
                  <dd className="font-display text-xl font-extrabold text-volt">
                    {formatMXN(total)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-volt py-4 font-display text-sm font-extrabold uppercase tracking-wide text-ink transition-all hover:bg-bone"
              >
                {t.components.cartDrawer.btnCheckout}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 w-full text-center text-xs text-bone/40 underline-offset-4 transition-colors hover:text-bone hover:underline"
              >
                {t.components.cartDrawer.btnContinue}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}