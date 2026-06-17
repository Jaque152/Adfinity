"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { processContactForm } from "@/app/contacto/contact-action"; // <-- Importamos la acción

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const { t } = useLanguage();
  const formDict = t.components.contactForm;
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = formDict.valName;
    if (!form.email.trim()) e.email = formDict.valEmailReq;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = formDict.valEmailInv;
    if (!form.message.trim()) e.message = formDict.valMsg;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    // Llamada a la Server Action
    const result = await processContactForm(form);
    
    setLoading(false);

    if (result.success) {
      toast.success(formDict.toastSuccess, {
        description: formDict.toastDesc,
      });
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } else {
      toast.error("Error", { description: result.error });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label={formDict.nameLabel} error={errors.name} htmlFor="name">
          <input
            id="name"
            type="text"
            placeholder={formDict.namePlaceholder}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label={formDict.emailLabel} error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder={formDict.emailPlaceholder}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label={formDict.messageLabel} error={errors.message} htmlFor="message">
          <textarea
            id="message"
            rows={6}
            placeholder={formDict.messagePlaceholder}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={cn(inputCls(!!errors.message), "resize-none")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/15 py-1.5 pl-1.5 pr-7 font-semibold text-ink transition-colors disabled:opacity-70"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-volt text-ink">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
          )}
        </span>
        <span className="text-sm">
          {loading ? formDict.btnSending : formDict.btnSend}
        </span>
      </button>
    </form>
  );
}

function Field({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor: string; children: React.ReactNode; }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-card px-4 py-3.5 text-ink placeholder:text-ink/35 outline-none transition-all",
    "focus:border-ink focus:ring-2 focus:ring-volt/50",
    hasError ? "border-destructive" : "border-ink/15",
  );
}