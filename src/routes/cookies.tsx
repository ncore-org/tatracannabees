import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — TatraCannaBees®" },
      { name: "description", content: "Ako TatraCannaBees pracujú s cookies a čo si môžeš nastaviť." },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-20 prose prose-invert prose-lg prose-headings:font-display">
      <h1>Zásady používania cookies</h1>
      <p><em>Posledná aktualizácia: {new Date().toLocaleDateString("sk-SK")}</em></p>
      <p>
        Táto stránka (tatracannabees.sk) je prevádzkovaná spoločnosťou <strong>JUVEA s.r.o.</strong>,
        Tatranská 781/14, Kežmarok, Slovenská republika. Stránka je aktuálne <strong>informačná</strong> — nepredáva produkty online.
      </p>

      <h2>Čo sú cookies</h2>
      <p>
        Cookies sú malé textové súbory, ktoré prehliadač ukladá vo vašom zariadení, aby si stránka zapamätala vaše nastavenia alebo prihlásenie.
      </p>

      <h2>Aké cookies používame</h2>
      <ul>
        <li><strong>Nevyhnutné</strong> — potrebné na fungovanie stránky (napr. prihlásenie, súhlas s cookies). Bez týchto stránka nefunguje.</li>
        <li><strong>Analytické (voliteľné)</strong> — pomáhajú nám pochopiť, ako sa stránka používa, aby sme ju mohli zlepšovať.</li>
        <li><strong>Marketingové (voliteľné)</strong> — pre prípadné budúce personalizované ponuky. Aktuálne nespúšťame reklamné kampane.</li>
      </ul>

      <h2>Váš súhlas</h2>
      <p>
        Pri prvej návšteve stránky sa zobrazí banner, kde si viete zvoliť rozsah súhlasu. Voľbu môžete kedykoľvek zmeniť tak, že si vymažete cookies vo svojom prehliadači a znova navštívite stránku.
      </p>

      <h2>Kontakt</h2>
      <p>Otázky ohľadom cookies smerujte na <a href="mailto:hello@tatracannabees.sk">hello@tatracannabees.sk</a>.</p>

      <p className="text-sm opacity-70"><em>Odporúčame nechať si tento dokument pred publikáciou prekontrolovať právnikom.</em></p>
    </article>
  );
}
