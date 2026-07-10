import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Mountain, ShieldCheck, Sparkles } from "lucide-react";
import heroField from "@/assets/hero-field.jpg";
import cbdFlower from "@/assets/cbd-flower.jpg";
import beeLeaf from "@/assets/bee-leaf.jpg";
import logoAsset from "@/assets/logo.asset.json";
import { BrandCarousel } from "@/components/brand-carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TatraCannaBees® — Slovenské CBD spod Tatier" },
      {
        name: "description",
        content:
          "Ručne pestované CBD kvety zo slovenských polí pod Tatrami. Príbeh značky TatraCannaBees, WHX Dubai 2026 a čo pripravujeme do predaja.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero">
        <img
          src={heroField}
          alt="Konopné pole pod Tatrami pri západe slnka"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-honey/40 bg-honey/10 px-3 py-1 text-xs font-medium text-honey animate-reveal-up">
              <Sparkles className="h-3.5 w-3.5" /> Čoskoro v predaji · úroda 2026
            </div>

            <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-balance animate-reveal-up">
              Konope, ktoré <span className="text-shimmer">rastie tam, kde vzduch chutí</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed animate-reveal-up" style={{ animationDelay: "80ms" }}>
              TatraCannaBees® — slovenská značka prírodných CBD kvetov, pestovaných ručne na
              poliach pod Tatrami. Bez syntetiky. Bez umelého svetla. Bez skratiek.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-reveal-up" style={{ animationDelay: "160ms" }}>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="group inline-flex items-center gap-2 rounded-full bg-honey text-honey-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform"
              >
                Získať pozvánku medzi prvými
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 backdrop-blur px-6 py-3 text-sm font-semibold hover:border-honey/60"
              >
                Náš príbeh
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg animate-reveal-up" style={{ animationDelay: "240ms" }}>
              {[
                ["600–900", "m n.m."],
                ["100 %", "outdoor"],
                ["2018", "since"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl sm:text-3xl font-bold text-honey">{v}</dt>
                  <dd className="text-xs text-muted-foreground uppercase tracking-wider">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <img
            src={logoAsset.url}
            alt=""
            aria-hidden
            className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 h-64 w-64 opacity-20 animate-float-slow"
          />
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Filozofia</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-black text-balance">Menej robíme, viac necháme rásť.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Nesnažíme sa premôcť rastlinu chemikáliami. Vytvárame jej priestor a čas — potom stačí len počkať.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Mountain,
              t: "Tatranský terroir",
              d: "Chladné noci, čistý vzduch a pôda, ktorá desiatky rokov nevidela pesticídy. Rastlina si to pamätá.",
            },
            {
              icon: Leaf,
              t: "Field-to-flower",
              d: "Od semienka po ručne triedený kvet. Bez indoor lámp, bez syntetiky, bez skratiek.",
            },
            {
              icon: ShieldCheck,
              t: "Transparentné COA",
              d: "Certifikát obsahu v každom balení. Priemyselná konopa v súlade s legislatívou EÚ.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <article
              key={t}
              className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden transition-all hover:border-honey/50 hover:-translate-y-1"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-honey/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon className="h-8 w-8 text-honey" />
              <h3 className="mt-6 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BRAND CAROUSEL — fills space above product showcase */}
      <BrandCarousel />

      {/* SHOWCASE FLOWER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-square max-w-lg mx-auto w-full">
          <div className="absolute inset-0 rounded-3xl bg-honey/10 blur-3xl" />
          <img
            src={cbdFlower}
            width={1200}
            height={1200}
            loading="lazy"
            alt="Detail CBD kvetu s trichómami"
            className="relative rounded-3xl object-cover shadow-elev"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Produkt</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-black text-balance">
            CBD sušina. <br />Bez chémie. Bez umelostí.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Čistý kvet z priemyselnej konope, pestovaný v súlade s európskou legislatívou.
            V EÚ je CBD produkt bez psychoaktívnych účinkov — my dodávame surovinu, transparentne, s COA v každom balení.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Ručné triedenie a kontrola kvality",
              "Certifikát obsahu (COA) v každom balení",
              "100 % slovenský pôvod, úroda 2026",
              "Balenia 1 g / 3 g / 10 g",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-honey" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-honey-gradient text-honey-foreground px-6 py-3 text-sm font-semibold"
          >
            Pozrieť pripravovanú kolekciu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* THC EDU */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Edukácia</p>
            <h2 className="mt-3 font-display text-4xl font-black text-balance">Fakty o CBD a THC</h2>
            <p className="mt-4 text-muted-foreground">
              Bez marketingu, bez zdravotných tvrdení. Len to, čo skutočne hovoria overené zdroje ako WHO, EMCDDA a európska legislatíva.
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {[
              {
                t: "CBD — kanabidiol",
                d: "Nepsychoaktívny kanabinoid. WHO v roku 2018 uviedla „priaznivý bezpečnostný profil“. V EÚ z priemyselnej konope legálny.",
                link: "/blog/cbd-co-o-nom-vieme",
              },
              {
                t: "THC — kontext",
                d: "Psychoaktívny kanabinoid. Právne pravidlá sa v EÚ líšia; limit v priemyselnej konope je 0,3 % (2023). My tvrdenia nerobíme, len fakty.",
                link: "/blog/thc-neutralne-info",
              },
            ].map((x) => (
              <Link
                key={x.t}
                to={x.link}
                className="group rounded-2xl border border-border p-6 hover:border-honey/50 transition-colors"
              >
                <h3 className="font-display text-xl font-bold">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-honey">
                  Prečítať <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHX */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Novinky</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-black text-balance">
            Ukázali sme sa svetu. <br /><span className="text-honey">WHX Dubai 2026.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Zakladateľ Jaroslav Špes zastupoval značku na jednom z najväčších wellness fór planéty.
            Slovenská konopa vedľa značiek z Kanady, USA a Švajčiarska — a obstála.
          </p>
          <Link
            to="/blog/whx-dubai-2026"
            className="mt-6 inline-flex items-center gap-2 text-sm text-honey"
          >
            Prečítať reportáž <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elev">
          <img
            src={beeLeaf}
            width={1200}
            height={900}
            loading="lazy"
            alt="Včela na konopnom liste"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-leaf-gradient text-leaf-foreground p-10 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-balance">Zaregistruj sa a buď prvý v úli.</h2>
            <p className="mt-4 opacity-90 max-w-xl mx-auto">
              Pozvánka do predaja, blogové novinky a priamy chat so zakladateľom vo tvojom účte.
            </p>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:scale-105 transition-transform"
            >
              Vytvoriť účet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

