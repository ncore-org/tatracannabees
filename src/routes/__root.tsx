import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WizChat } from "@/components/wiz-chat";
import logoAsset from "@/assets/logo.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-black text-honey">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Stratil si sa v úli</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Táto stránka neexistuje alebo sa presťahovala pod iný kvet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-honey text-honey-foreground px-5 py-2.5 text-sm font-semibold"
        >
          Späť domov
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("React error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Niečo sa pokazilo</h1>
        <p className="mt-2 text-sm text-muted-foreground">Skús to prosím znova.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-honey text-honey-foreground px-5 py-2 text-sm font-semibold"
          >
            Skúsiť znova
          </button>
          <Link to="/" className="rounded-full border border-border px-5 py-2 text-sm">Domov</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TatraCannaBees® — Slovenské CBD spod Tatier" },
      {
        name: "description",
        content:
          "TatraCannaBees® — prírodné CBD kvety pestované ručne na slovenských poliach pod Tatrami. Blog, edukácia, čoskoro v predaji.",
      },
      { name: "author", content: "JUVEA s.r.o." },
      { name: "theme-color", content: "#0f2118" },
      { property: "og:title", content: "TatraCannaBees® — Slovenské CBD spod Tatier" },
      { property: "og:description", content: "Prírodné CBD kvety spod Tatier. Ručne pestované, transparentné, čoskoro v predaji." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TatraCannaBees" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logoAsset.url, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CookieBanner />
      <WizChat />
      <Toaster theme="dark" position="top-center" richColors />
    </QueryClientProvider>
  );
}
