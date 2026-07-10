import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Podmienky používania — TatraCannaBees®" },
      { name: "description", content: "Podmienky používania informačnej stránky tatracannabees.sk." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-20 prose prose-invert prose-lg prose-headings:font-display">
      <h1>Podmienky používania</h1>
      <p><em>Posledná aktualizácia: {new Date().toLocaleDateString("sk-SK")}</em></p>

      <h2>Charakter stránky</h2>
      <p>
        Stránka tatracannabees.sk je <strong>informačná</strong> a neposkytuje online predaj produktov.
        Slúži na prezentáciu značky TatraCannaBees®, zdieľanie noviniek, edukáciu a možnosť vytvorenia používateľského účtu pre budúci prístup k ponuke.
      </p>

      <h2>Prevádzkovateľ</h2>
      <p>JUVEA s.r.o., Tatranská 781/14, Kežmarok, Slovenská republika. Značka TatraCannaBees® je registrovaná ochranná známka.</p>

      <h2>Duševné vlastníctvo</h2>
      <p>
        Všetok obsah (texty, fotografie, logo, dizajn) je chránený autorským právom. Reprodukcia, distribúcia alebo úprava sú možné len s písomným súhlasom.
      </p>

      <h2>Používateľský účet</h2>
      <p>Registráciou súhlasíte s poskytnutím pravdivých údajov. Účet slúži výhradne pre osobné použitie a nesmie byť zneužitý.</p>

      <h2>Obsah tretích strán</h2>
      <p>Stránka môže odkazovať na externé zdroje. Za ich obsah nezodpovedáme.</p>

      <h2>Zdravotné tvrdenia</h2>
      <p>
        TatraCannaBees® neprezentujú žiadne zdravotné, terapeutické ani liečivé účinky produktov. Blogový obsah má výlučne edukatívny charakter a odkazuje na overené vedecké zdroje.
      </p>

      <h2>Rozhodné právo</h2>
      <p>Vzťahy vyplývajúce z používania stránky sa riadia právnym poriadkom Slovenskej republiky.</p>

      <p className="text-sm opacity-70"><em>Odporúčame nechať si tento dokument pred publikáciou prekontrolovať právnikom.</em></p>
    </article>
  );
}
