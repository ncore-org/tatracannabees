import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { LogOut, MessageCircle, Newspaper, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Môj účet — TatraCannaBees®" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

function Account() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (!data.session) navigate({ to: "/auth" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-20 text-muted-foreground">Načítavam…</div>;
  if (!session) return null;

  const name = session.user.user_metadata?.full_name || session.user.email?.split("@")[0];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-honey font-semibold">Môj účet</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-black truncate">Ahoj, {name} 🐝</h1>
        </div>
        <button
          onClick={signOut}
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-honey/50"
        >
          <LogOut className="h-4 w-4" /> Odhlásiť
        </button>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-honey">
            <Newspaper className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">Novinky z blogu</span>
          </div>
          <div className="mt-4 space-y-4">
            {BLOG_POSTS.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="block rounded-xl p-4 -mx-4 hover:bg-muted transition-colors"
              >
                <div className="text-xs text-muted-foreground">{new Date(p.publishedAt).toLocaleDateString("sk-SK")} · {p.category}</div>
                <div className="mt-1 font-display font-bold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-honey">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">Ponuky</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Predaj ešte len spúšťame. Si na zozname skorého prístupu — dáme ti vedieť ako prvému.
          </p>
          <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-center">
            <div className="font-display text-2xl font-black text-honey">-15 %</div>
            <div className="text-xs text-muted-foreground mt-1">Early-access zľava pri spustení</div>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-honey">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">Chat s TatraCannaBees</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Priama linka na tím značky. Otázky o produktoch, spolupráci, vzorkách — píš.
          </p>
          <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Messenger sa pripája… Systém je v príprave — spustíme ho hneď po dokončení real-time backendu.
          </div>
        </div>
      </div>
    </section>
  );
}
