import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Leaf } from "lucide-react";
import cbdFlower from "@/assets/cbd-flower.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produkty — čoskoro v predaji · TatraCannaBees®" },
      { name: "description", content: "Prvá séria CBD kvetov z úrody 2026. Balenia 1 g, 3 g, 10 g. Registrácia pre skorý prístup." },
      { property: "og:title", content: "Produkty — čoskoro · TatraCannaBees®" },
      { property: "og:description", content: "Čoskoro spúšťame predaj CBD kvetov spod Tatier." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

const CULTIVARS = [
  { name: "Tatra No. 1", note: "citrusový, jasný", ratio: "CBD 12 %", size: "1 / 3 / 10 g" },
  { name: "Poľana Kush", note: "zemitý, hlboký", ratio: "CBD 10 %", size: "1 / 3 / 10 g" },
  { name: "Belianska Rosa", note: "kvetinový, jemný", ratio: "CBD 14 %", size: "1 / 3 / 10 g" },
];

function Products() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-honey/40 bg-honey/10 px-3 py-1 text-xs font-medium text-honey">
          <Clock className="h-3.5 w-3.5" /> Coming soon · úroda 2026
        </div>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl font-black text-balance">
          Prvá séria. Ešte pár posledných dní ticha v sušiarni.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Ručne triedené CBD kvety zo slovenských polí. Balenia 1 g, 3 g, 10 g s COA v každom vrecku.
          Kým spustíme predaj, môžeš si zaregistrovať účet a dostať pozvánku medzi prvými.
        </p>

        <Link
          to="/auth"
          search={{ mode: "signup" }}
          className="mt-8 inline-flex items-center rounded-full bg-honey text-honey-foreground px-6 py-3 text-sm font-semibold shadow-glow"
        >
          Získať skorý prístup
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {CULTIVARS.map((c) => (
            <article
              key={c.name}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={cbdFlower}
                  alt={c.name}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  Soon
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <Leaf className="h-5 w-5 text-leaf" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wider">Obsah</dt>
                    <dd className="font-semibold">{c.ratio}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground uppercase tracking-wider">Balenia</dt>
                    <dd className="font-semibold">{c.size}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground max-w-2xl">
          Uvedené informácie sú pripravovaná ponuka. Táto stránka aktuálne nepredáva produkty online. Konečné špecifikácie potvrdí COA v každom balení.
        </p>
      </section>
    </>
  );
}
