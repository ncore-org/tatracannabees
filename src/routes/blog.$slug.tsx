import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { getPost, BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowLeft, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Článok nenájdený" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.post.title} — TatraCannaBees blog` },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: loaderData.post.title },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-black">Článok neexistuje</h1>
      <Link to="/blog" className="mt-6 inline-flex text-honey">← späť na blog</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl">Článok sa nedal načítať.</h1>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Späť na blog
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-honey/10 text-honey px-2 py-0.5 font-medium">{post.category}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-black text-balance leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>

      <div className="mt-12 prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-a:text-honey prose-strong:text-foreground">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-bold">Ďalej v blogu</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="rounded-2xl border border-border p-4 hover:border-honey/50 transition-colors"
            >
              <h3 className="font-display font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
