import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Ochrana osobných údajov — TatraCannaBees®" },
      { name: "description", content: "Zásady spracovania osobných údajov (GDPR) na tatracannabees.sk." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-20 prose prose-invert prose-lg prose-headings:font-display">
      <h1>Zásady ochrany osobných údajov</h1>
      <p><em>Posledná aktualizácia: {new Date().toLocaleDateString("sk-SK")}</em></p>

      <h2>Prevádzkovateľ</h2>
      <p>
        <strong>JUVEA s.r.o.</strong>, Tatranská 781/14, Kežmarok, Slovenská republika.
        Prevádzkuje značku TatraCannaBees® a webovú stránku tatracannabees.sk.
      </p>

      <h2>Aké údaje spracúvame</h2>
      <ul>
        <li><strong>Newsletter</strong>: e-mailová adresa (súhlas so zasielaním noviniek).</li>
        <li><strong>Používateľský účet</strong>: e-mail, meno, avatar (ak prihlásenie cez Google), časy prihlásenia.</li>
        <li><strong>Správy v chate s prevádzkovateľom</strong>: obsah komunikácie a časové známky.</li>
        <li><strong>Technické údaje</strong>: IP, typ prehliadača, cookies (viď <a href="/cookies">Zásady cookies</a>).</li>
      </ul>

      <h2>Právny základ</h2>
      <ul>
        <li>Súhlas dotknutej osoby (čl. 6 ods. 1 písm. a GDPR) — newsletter, marketingové cookies.</li>
        <li>Plnenie zmluvy / opatrenia pred uzavretím zmluvy (čl. 6 ods. 1 písm. b) — používateľský účet a komunikácia.</li>
        <li>Oprávnený záujem (čl. 6 ods. 1 písm. f) — bezpečnosť stránky, prevencia zneužitia.</li>
      </ul>

      <h2>Doba uchovávania</h2>
      <p>Osobné údaje uchovávame len tak dlho, ako je to potrebné na účel spracovania alebo v súlade so zákonnými lehotami.</p>

      <h2>Vaše práva</h2>
      <p>Máte právo na prístup, opravu, výmaz („právo byť zabudnutý"), obmedzenie spracovania, prenositeľnosť a namietanie. Kontaktujte nás na <a href="mailto:hello@tatracannabees.sk">hello@tatracannabees.sk</a>.</p>

      <h2>Sprostredkovatelia</h2>
      <p>Používame službu Supabase (autentifikácia, databáza), Google (prihlasovanie) a e-mailový nástroj pre newsletter. Údaje sú spracované v EÚ alebo s primeranými zárukami.</p>

      <p className="text-sm opacity-70"><em>Odporúčame nechať si tento dokument pred publikáciou prekontrolovať právnikom / DPO.</em></p>
    </article>
  );
}
