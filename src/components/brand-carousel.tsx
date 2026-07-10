import { useCallback, useEffect, useRef, useState } from "react";
import { Award, ChevronLeft, ChevronRight, Leaf, Mountain, Sparkles, Users, Wheat, Sun, HandHeart } from "lucide-react";

type Slide = {
  icon: typeof Leaf;
  eyebrow: string;
  title: string;
  body: string;
  tint: string; // css color for accent glow
};

const SLIDES: Slide[] = [
  {
    icon: Award,
    eyebrow: "WHX Dubai 2026",
    title: "Slovenská konopa na svetovom pódiu",
    body: "Zakladateľ Jaroslav Špes reprezentoval TatraCannaBees medzi TOP wellness značkami z Kanady, USA a Švajčiarska.",
    tint: "var(--honey)",
  },
  {
    icon: Mountain,
    eyebrow: "Terroir 600–900 m n.m.",
    title: "Vypestované tam, kde vzduch chutí",
    body: "Chladné tatranské noci, čistá pôda, ručný zber. Rastlina má čas dozrieť — a je to cítiť v každom kvete.",
    tint: "var(--leaf)",
  },
  {
    icon: Leaf,
    eyebrow: "100 % outdoor · since 2018",
    title: "Bez indoor lámp, bez skratiek",
    body: "Priemyselná konopa v súlade s EÚ legislatívou. Bez syntetiky, bez kanabinoidových derivátov, bez postrekov.",
    tint: "var(--leaf)",
  },
  {
    icon: Sparkles,
    eyebrow: "Field-to-flower",
    title: "Od semienka po ručne triedený kvet",
    body: "Každé balenie prechádza vizuálnou kontrolou a je doplnené certifikátom obsahu (COA) z akreditovaného laboratória.",
    tint: "var(--honey)",
  },
  {
    icon: Users,
    eyebrow: "JUVEA s.r.o. · Kežmarok",
    title: "Rodinný projekt s misiou",
    body: "Podporujeme udržateľné poľnohospodárstvo, opeľovače a lokálnu komunitu pod Vysokými Tatrami.",
    tint: "var(--leaf)",
  },
];

const MARQUEE = [
  { icon: Leaf, label: "100% Outdoor Slovak Grown" },
  { icon: Sun, label: "Slnkom sušené kvety" },
  { icon: Mountain, label: "Tatranský terroir 600–900 m" },
  { icon: HandHeart, label: "Ručný zber & triedenie" },
  { icon: Wheat, label: "Bez pesticídov & syntetiky" },
  { icon: Award, label: "COA v každom balení" },
  { icon: Sparkles, label: "Since 2018" },
];

export function BrandCarousel() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const total = SLIDES.length;

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + total) % total);
  }, [total]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % total);
    }, 5500);
    return () => window.clearInterval(id);
  }, [total]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-16">
      {/* MARQUEE strip — inspired by top-cbd.eu benefit bar */}
      <div className="mb-8 overflow-hidden rounded-full border border-honey/20 bg-gradient-to-r from-honey/5 via-transparent to-leaf/5">
        <div className="flex animate-marquee gap-10 py-3 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground shrink-0">
              <m.icon className="h-4 w-4 text-honey" />
              <span>{m.label}</span>
              <span className="ml-10 text-honey/40">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main story carousel */}
      <div
        className="relative"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
          {/* Slide track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((s, i) => (
              <article
                key={s.title}
                className="relative min-w-full p-6 sm:p-10 md:p-14"
                aria-hidden={i !== index}
              >
                {/* tinted glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    backgroundImage: `radial-gradient(70% 90% at 10% 10%, color-mix(in oklab, ${s.tint} 22%, transparent) 0%, transparent 60%), radial-gradient(60% 80% at 100% 100%, color-mix(in oklab, ${s.tint} 12%, transparent) 0%, transparent 70%)`,
                  }}
                />

                <div className="relative grid md:grid-cols-[auto_1fr] items-center gap-6 md:gap-10">
                  {/* icon medallion */}
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-3xl blur-2xl opacity-70"
                      style={{ background: `color-mix(in oklab, ${s.tint} 40%, transparent)` }}
                    />
                    <div
                      className="relative grid h-24 w-24 sm:h-32 sm:w-32 place-items-center rounded-3xl ring-1"
                      style={{
                        background: `linear-gradient(135deg, color-mix(in oklab, ${s.tint} 25%, transparent), color-mix(in oklab, ${s.tint} 8%, transparent))`,
                        borderColor: `color-mix(in oklab, ${s.tint} 40%, transparent)`,
                        boxShadow: `inset 0 1px 0 color-mix(in oklab, ${s.tint} 40%, transparent)`,
                      }}
                    >
                      <s.icon className="h-12 w-12 sm:h-16 sm:w-16" style={{ color: s.tint }} />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold"
                      style={{ color: s.tint }}
                    >
                      {s.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-black text-balance leading-[1.05]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                      {s.body}
                    </p>

                    <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono tabular-nums">
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Arrows (desktop) */}
          <button
            onClick={() => go(-1)}
            aria-label="Predchádzajúci"
            className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-border bg-background/70 backdrop-blur hover:bg-honey hover:text-honey-foreground hover:border-honey transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Ďalší"
            className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-border bg-background/70 backdrop-blur hover:bg-honey hover:text-honey-foreground hover:border-honey transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/50">
            <div
              className="h-full bg-honey transition-[width] duration-700 ease-out"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Dots + mobile arrows */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Predchádzajúci"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-border bg-card active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-honey" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Ďalší"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-border bg-card active:scale-95 transition-transform"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
