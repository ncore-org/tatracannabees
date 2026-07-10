import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Mail } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_signups").insert({ email });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.success("Už si prihlásený/á. Ďakujeme 🐝");
      else toast.error("Nepodarilo sa prihlásiť. Skús to prosím znova.");
      return;
    }
    setEmail("");
    toast.success("Vitaj v úli. Ozveme sa, keď spustíme predaj 🌿");
  }

  return (
    <footer className="mt-32 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="" width={40} height={40} className="h-10 w-10 rounded-md" />
            <span className="font-display font-bold text-xl">
              TatraCanna<span className="text-honey">Bees</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Slovenská značka prírodných konopných produktov. Pestované ručne, pod Tatrami, s rešpektom k pôde aj k opeľovačom.
          </p>

          <form onSubmit={subscribe} className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              placeholder="tvoj@email.sk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full bg-background border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-honey text-honey-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "..." : "Prihlásiť"}
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Quick links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Domov</Link></li>
            <li><Link to="/about" className="hover:text-foreground">O nás</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Produkty</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Kontakt</Link></li>
            <li><Link to="/auth" className="hover:text-foreground">Prihlásenie</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Právne</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/cookies" className="hover:text-foreground">Cookies</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Ochrana údajov</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Podmienky</Link></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="https://www.instagram.com/tatracannabees" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-honey" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/share/1CWxuZLUFq/" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-honey" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Tatranská 781/14, Kežmarok</span>
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> hello@tatracannabees.sk</span>
          </div>
          <p>© {new Date().getFullYear()} JUVEA s.r.o. · TatraCannaBees® je registrovaná ochranná známka.</p>
        </div>
      </div>
    </footer>
  );
}
