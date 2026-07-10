import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.asset.json";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Domov" },
  { to: "/about", label: "O nás" },
  { to: "/products", label: "Produkty" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Kontakt" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={logoAsset.url}
            alt="TatraCannaBees logo"
            width={40}
            height={40}
            className="h-9 w-9 rounded-md object-contain"
          />
          <span className="font-display font-bold tracking-tight text-lg sm:text-xl truncate">
            TatraCanna<span className="text-honey">Bees</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-honey transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Prihlásiť
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="inline-flex items-center rounded-full bg-honey text-honey-foreground px-4 py-2 text-sm font-semibold hover:shadow-glow transition-shadow"
          >
            Vytvoriť účet
          </Link>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base"
                activeProps={{ className: "text-honey" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm"
              >
                Prihlásiť
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-honey text-honey-foreground px-4 py-2 text-center text-sm font-semibold"
              >
                Účet
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
