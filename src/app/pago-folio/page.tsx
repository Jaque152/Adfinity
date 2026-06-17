"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  folio: string;
  amount: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  folio: "",
  amount: "",
};

export default function PagoFolioPage() {
  const router = useRouter();
  const { addItem, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo inválido";
    if (!form.folio.trim()) e.folio = "Requerido";
    if (!form.amount.trim() || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      e.amount = "Ingresa un monto válido";
    }

    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Revisa los campos", {
        description: "Asegúrate de llenar toda la información correctamente.",
      });
    }
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    // Opcional: Limpiar el carrito previo para asegurar que solo pague este folio.
    // Si deseas permitir que pague otras cosas junto al folio, elimina esta línea.
    clear();

    // 1. Construir el producto a la medida para inyectarlo al carrito
    const customProduct: Product = {
      id: Date.now(), // ID dinámico
      slug: `pago-${form.folio.toLowerCase().replace(/\W+/g, "-")}`,
      name: `Servicio Personalizado`,
      sku: form.folio.toUpperCase(),
      price: parseFloat(form.amount),
      tier: "impacto", // Requisito del tipado, no afecta al carrito
      image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80", // Imagen genérica premium
      blurb: `Pago de folio ${form.folio.toUpperCase()} a nombre de ${form.name}.`,
      includes: ["Servicio acordado previamente", "Atención personalizada"],
      delivery: "Según acuerdo",
    };

    // 2. Añadir al carrito global
    addItem(customProduct, 1);

    // 3. Notificar y redirigir
    toast.success("Folio agregado", {
      description: "Redirigiendo al pago seguro...",
    });
    router.push("/checkout");
  }

  return (
    <section className="bg-bone pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="container-tight">
        {/* Título Gigante */}
        <h1 className="display mb-16 text-[16vw] leading-[0.85] tracking-tight text-ink md:mb-24 md:text-[10vw]">
          PAGA AQUÍ
        </h1>

        <form onSubmit={handleSubmit} noValidate className="max-w-4xl">
          {/* Grid de Formulario */}
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              value={form.name}
              error={errors.name}
              onChange={(v) => set("name", v)}
            />
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="correo electrónico"
              value={form.email}
              error={errors.email}
              onChange={(v) => set("email", v)}
            />
            <Input
              label="Número De Pago Personalizado"
              placeholder="Número de Pago / Folio"
              value={form.folio}
              error={errors.folio}
              onChange={(v) => set("folio", v)}
            />
            <Input
              label="Monto A Pagar"
              type="number"
              inputMode="decimal"
              placeholder="Ej. 15000"
              value={form.amount}
              error={errors.amount}
              onChange={(v) => set("amount", v.replace(/[^0-9.]/g, ""))}
            />
          </div>

          {/* Botón de Pago */}
          <div className="mt-14">
            <button
              type="submit"
              className="group relative inline-flex items-center gap-4 rounded-full border border-ink/20 py-2 pl-2 pr-8 text-lg font-semibold tracking-tight text-ink transition-colors hover:border-ink/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt text-ink transition-transform duration-500 group-hover:rotate-[45deg] group-hover:scale-105">
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
              </span>
              Pagar
            </button>
          </div>

          {/* Nota de IVA */}
          <p className="mt-12 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink/50">
            Al monto final se le sumará el IVA
          </p>
        </form>

        {/* Footer / Información de contacto */}
        <div className="mt-20 grid gap-10 border-t border-ink/10 pt-16 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">Contáctanos</h3>
            <div className="mt-4 space-y-2 text-sm text-ink/70">
              <p>+52 55 5553 0511</p>
              <p>contacto@trazocreative.com</p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">Ubicación</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
              Av. Tamaulipas No. 150, Piso 18, Int. 1801, Col. Hipódromo, Alcaldía Cuauhtémoc, C.P. 06100, CDMX.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponente de Input Reutilizable ---------- */
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
  inputMode?: "numeric" | "text" | "email" | "decimal";
}) {
  return (
    <div>
      <label className="mb-3 block font-display text-[15px] font-medium tracking-tight text-ink/90">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-card px-5 py-4 text-ink placeholder:text-ink/30 outline-none transition-all focus:border-ink focus:ring-2 focus:ring-volt/50",
          error ? "border-destructive" : "border-ink/10",
        )}
      />
      {error && <p className="mt-2 text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}