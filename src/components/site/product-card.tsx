"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { formatMXN, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index }: { product: Product; index: number; }) {
  const { addItem, setOpen } = useCart();
  const { t } = useLanguage();
  const pDict = t.components.productCard;
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    toast.success(`${product.name} ${pDict.btnAdded.toLowerCase()}`, {
      description: `${product.sku} · ${formatMXN(product.price)} MXN`,
      action: {
        label: pDict.toastAction,
        onClick: () => setOpen(true),
      },
    });
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_28px_60px_-34px_rgba(14,15,12,0.55)]">
      {/* Contenedor de Imagen y Efectos Hover */}
      <div className="relative aspect-[5/4] overflow-hidden bg-ink/5">
        {/* Imagen base: A color por defecto, en hover -> escala de grises, zoom y blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-0 transition-all duration-700 will-change-transform group-hover:scale-[1.06] group-hover:grayscale group-hover:blur-[2px]" 
          style={{ backgroundImage: `url(${product.image})` }} 
        />
        
        {/* Capa oscura: Invisible por defecto, oscurece la imagen en hover para contraste perfecto */}
        <div className="absolute inset-0 bg-ink/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Etiquetas Superiores */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-bone/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink backdrop-blur">
          {product.sku}
        </span>
        <span className="absolute right-3 top-3 z-10 font-display text-sm font-extrabold text-bone/90 mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Contenido (Incluye): Flota sobre la capa oscura con animación de entrada */}
        <div className="absolute inset-0 z-10 flex translate-y-4 flex-col justify-end p-5 opacity-0 transition-all duration-500 ease-swift group-hover:translate-y-0 group-hover:opacity-100">
          <p className="eyebrow mb-3 text-volt">{pDict.includes}</p>
          <ul className="space-y-1.5">
            {product.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2 text-[13px] font-medium leading-snug text-bone/95">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-volt" strokeWidth={3} />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Body del Producto */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/55">
          {product.blurb}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-ink/10 pt-4">
          <div className="leading-none">
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
              {formatMXN(product.price)}
            </span>
            <span className="ml-1 font-mono text-[10px] uppercase tracking-wider text-ink/45">
              {pDict.plusIva}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "group/btn mt-4 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300",
            added ? "bg-ink text-volt" : "bg-volt text-ink hover:bg-ink hover:text-bone",
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> {pDict.btnAdded}
            </>
          ) : (
            <>
              {pDict.btnContract}
              <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            </>
          )}
        </button>
      </div>
    </article>
  );
}