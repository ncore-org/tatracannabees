import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — TatraCannaBees®" },
      { name: "description", content: "Príbehy z polí pod Tatrami, edukácia o CBD, novinky značky TatraCannaBees a report z WHX Dubai 2026." },
      { property: "og:title", content: "Blog — TatraCannaBees®" },
      { property: "og:description", content: "Príbehy, edukácia a novinky značky TatraCannaBees." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogList,
});

function BlogList() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Blog</p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl font-black text-balance">Príbehy spod Tatier.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Edukácia, pestovanie, novinky značky. Bez marketingu, bez zdravotných tvrdení — len fakty a náš pohľad.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p, i) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className={`group rounded-3xl border border-border bg-card p-6 hover:border-honey/50 transition-all hover:-translate-y-1 ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-honey/10 text-honey px-2 py-0.5 font-medium">{p.category}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMinutes} min</span>
              <span>{new Date(p.publishedAt).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <h2 className={`mt-4 font-display font-black text-balance ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{p.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{p.excerpt}</p>
            <span className="mt-6 inline-block text-sm text-honey">Čítať →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
