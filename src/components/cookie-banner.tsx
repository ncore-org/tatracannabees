import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

const KEY = "tcb-cookie-consent-v1";

type Consent = { necessary: true; analytics: boolean; marketing: boolean };

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [customize, setCustomize] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(KEY);
    if (!saved) setOpen(true);
  }, []);

  function save(consent: Consent) {
    window.localStorage.setItem(KEY, JSON.stringify({ ...consent, at: new Date().toISOString() }));
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md animate-reveal-up">
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-5 shadow-elev">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey/15 text-honey">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-base">Sladká drobnosť — cookies 🍪</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Používame len to nevyhnutné, aby stránka fungovala. Voliteľne aj analytiku, aby sme vedeli, čo vylepšiť. Detaily v{" "}
              <Link to="/cookies" className="underline hover:text-foreground">zásadách cookies</Link>.
            </p>

            {customize && (
              <div className="mt-4 space-y-2 text-sm">
                <label className="flex items-center justify-between opacity-70">
                  <span>Nevyhnutné (vždy zapnuté)</span>
                  <input type="checkbox" checked readOnly className="accent-honey" />
                </label>
                <label className="flex items-center justify-between">
                  <span>Analytika</span>
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="accent-honey" />
                </label>
                <label className="flex items-center justify-between">
                  <span>Marketing</span>
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="accent-honey" />
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => save({ necessary: true, analytics: true, marketing: true })}
                className="rounded-full bg-honey text-honey-foreground px-4 py-2 text-sm font-semibold"
              >
                Prijať všetko
              </button>
              <button
                onClick={() => save({ necessary: true, analytics, marketing })}
                className="rounded-full border border-border px-4 py-2 text-sm"
              >
                {customize ? "Uložiť voľbu" : "Iba nevyhnutné"}
              </button>
              {!customize && (
                <button
                  onClick={() => setCustomize(true)}
                  className="text-sm text-muted-foreground underline"
                >
                  Prispôsobiť
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
