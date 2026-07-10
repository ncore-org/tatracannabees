import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Meno je príliš krátke").max(80),
  email: z.string().trim().email("Neplatný e-mail").max(160),
  topic: z.enum(["wholesale", "general"]),
  message: z.string().trim().min(10, "Správa je príliš krátka").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — TatraCannaBees" },
      {
        name: "description",
        content:
          "Napíš nám. Veľkoobchodná spolupráca alebo bežný kontakt — ozveme sa čo najskôr.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Nepodarilo sa odoslať. Skús to prosím znova.");
      return;
    }
    toast.success("Ďakujeme! Ozveme sa čo najskôr 🐝");
    setForm({ name: "", email: "", topic: "general", message: "" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Kontakt</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl font-black text-balance">
          Napíš nám. <span className="text-honey">Ozveme sa.</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Máš záujem o veľkoobchodnú spoluprácu, alebo len otázku o značke? Vyber tému a pošli
          nám správu — odpovedáme spravidla do 48 hodín.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 animate-reveal-up"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Meno" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-honey"
                placeholder="Jozef Novák"
                maxLength={80}
              />
            </Field>
            <Field label="E-mail" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-honey"
                placeholder="jozef@email.sk"
                maxLength={160}
              />
            </Field>
          </div>

          <Field label="Téma" error={errors.topic}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "general", l: "Bežný kontakt" },
                { v: "wholesale", l: "Veľkoobchod" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, topic: o.v }))}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    form.topic === o.v
                      ? "border-honey bg-honey/10 text-honey"
                      : "border-border bg-background hover:border-honey/50"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Správa" error={errors.message}>
            <textarea
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-honey resize-y"
              placeholder={
                form.topic === "wholesale"
                  ? "Predstav svoj biznis, predpokladané objemy, región…"
                  : "O čom ti môžeme povedať viac?"
              }
              maxLength={2000}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-full bg-honey text-honey-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Odosielam…" : "Odoslať správu"}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        <aside className="space-y-4">
          <InfoCard
            icon={<Mail className="h-5 w-5 text-honey" />}
            title="E-mail"
            body="info@tatracannabees.sk"
          />
          <InfoCard
            icon={<MapPin className="h-5 w-5 text-honey" />}
            title="Sídlo"
            body="JUVEA s.r.o., Tatranská 781/14, Kežmarok"
          />
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Sledovať</h3>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.instagram.com/tatracannabees"
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-10 w-10 place-items-center rounded-full bg-background border border-border hover:border-honey/60 hover:text-honey transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1CWxuZLUFq/"
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-10 w-10 place-items-center rounded-full bg-background border border-border hover:border-honey/60 hover:text-honey transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey/10">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground break-words">{body}</p>
      </div>
    </div>
  );
}
