import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import beeLeaf from "@/assets/bee-leaf.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "O nás — TatraCannaBees®" },
      { name: "description", content: "Slovenská značka konopných produktov spod Tatier. Zakladateľ Jaroslav Špes, spoločnosť JUVEA s.r.o., Kežmarok." },
      { property: "og:title", content: "O nás — TatraCannaBees®" },
      { property: "og:description", content: "Príbeh značky, ľudia za ňou, WHX Dubai 2026." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32">
          <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Kto sme</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-black text-balance leading-tight">
            Značka, ktorú <span className="text-honey">postavili Tatry</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            TatraCannaBees® vznikli v roku 2018 v Kežmarku ako projekt, ktorý mal jeden cieľ: dokázať, že Slovensko dokáže vypestovať CBD kvet svetovej kvality — a robiť to čestne.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20 grid gap-10 md:grid-cols-2">
        {[
          { k: "Založené", v: "2018" },
          { k: "Sídlo", v: "Kežmarok, Slovensko" },
          { k: "Právna forma", v: "JUVEA s.r.o." },
          { k: "Zakladateľ", v: "Jaroslav Špes" },
          { k: "Ochranná známka", v: "TatraCannaBees®" },
          { k: "Medzinárodná scéna", v: "WHX Dubai 2026" },
        ].map((x) => (
          <div key={x.k} className="border-t border-border pt-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{x.k}</div>
            <div className="mt-1 font-display text-2xl font-bold">{x.v}</div>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <h2 className="font-display text-3xl font-black text-foreground">Ako sme sa sem dostali</h2>
          <p>
            Začali sme na jednom malom poli. Bez veľkej stratégie, ale s poriadnou dávkou trpezlivosti. Prvé sezóny boli školou pokory — počasie, škodcovia, byrokracia. Zostali sme.
          </p>
          <p>
            Postupne sme spresnili genetiku, dolaďovali postupy sušenia a zaviedli si vlastný interný štandard triedenia. Dnes robíme veci, ktoré by pred piatimi rokmi vyzerali ako sci-fi — a stále je pre nás najdôležitejšie, čo cítime v ruke, keď kvet zdvihneme z paletky.
          </p>
          <p>
            V roku 2026 sme predstavili značku na <strong className="text-foreground">WHX Dubai</strong> — vedľa značiek z Kanady, USA a Švajčiarska. Nezostali sme nepovšimnutí.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <img src={beeLeaf} width={1200} height={900} loading="lazy" alt="Včela a konope" className="rounded-3xl shadow-elev" />
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-balance">Prečo „Bees"?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Konopa a včely nie sú tradičný pár. Ale peľ konopy je pre včely v neskorom lete cenný zdroj bielkovín — a naše polia sú miestom, kde sa oba svety stretávajú. Meno je záväzok: bez pesticídov, bez postrekov v čase kvitnutia, s priestorom pre divokú faunu.
          </p>
          <Link to="/blog/od-vcely-po-kvet" className="mt-6 inline-flex items-center gap-2 text-honey text-sm">
            Celý príbeh v blogu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
