export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  cover: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "whx-dubai-2026",
    title: "WHX Dubai 2026 — TatraCannaBees na svetovej scéne",
    excerpt:
      "Ako sa slovenská značka z Kežmarku dostala na jedno z najväčších wellness podujatí sveta a čo si z púšte odniesla domov.",
    category: "Novinky",
    readMinutes: 4,
    publishedAt: "2026-02-14",
    cover: "/images/blog-whx.jpg",
    body: `Dubaj, WHX 2026. Konferencia, ktorá spája wellness, zdravie a inovácie z celého sveta.\n\nTatraCannaBees tam boli. Ukázali sme sa, prepojili sa s ľuďmi, s ktorými zdieľame víziu a "zasiali sme semienka" pre spoluprácu, ktorá bude rásť ešte roky.\n\n## Prečo je to dôležité\n\nSlovenský konopný priemysel sa dlho pohyboval v tieni. WHX Dubai bola príležitosť postaviť sa vedľa značiek z Kanady, USA, Švajčiarska a povedať: aj tu, pod Tatrami, robíme prácu, ktorá má svetový štandard.\n\n## Čo si odnášame\n\n- Nové kontakty v oblasti udržateľného pestovania\n- Potvrdenie, že náš prístup "field-to-flower" má miesto na globálnom trhu\n- Rešpekt komunity, ktorá si cení kvalitu nad kvantitou\n\nĎakujeme každému, kto sa s nami zastavil pri stánku. Uvidíme sa opäť.`,
  },
  {
    slug: "slovenske-polia",
    title: "Prečo pestujeme pod Tatrami",
    excerpt:
      "Vysoká nadmorská výška, čistý vzduch, chladné noci. Konope, ktoré rastie pod Tatrami, má charakter, ktorý sa nedá napodobniť.",
    category: "Pestovanie",
    readMinutes: 5,
    publishedAt: "2026-01-22",
    cover: "/images/blog-fields.jpg",
    body: `Keď sa nás ľudia pýtajú, prečo pestujeme presne tam, kde pestujeme, odpoveď je jednoduchá: **terroir**.\n\nRovnako ako víno z Champagne alebo káva z Etiópie, aj konopa nesie stopu miesta, kde vyrástla.\n\n## Podmienky, ktoré máme\n\n- Nadmorská výška 600 – 900 m n. m.\n- Chladné noci → pomalšie zrenie, hustejšie kvety\n- Čistý horský vzduch bez priemyselného znečistenia\n- Pôda, ktorú nikto pred nami desaťročia neškrtal chémiou\n\n## Bez skratiek\n\nŽiadne umelé osvetlenie, žiadne syntetické hnojivá, žiadny rush. Rastliny idú svojím tempom, my ich len sprevádzame.\n\nVýsledok? Kvet, ktorý voňou a hustotou trichómov obstojí vedľa akéhokoľvek "premium indoor" z Holandska — a pritom má úplne iný, autentický profil.`,
  },
  {
    slug: "cbd-co-o-nom-vieme",
    title: "CBD — čo o ňom vieme z výskumu",
    excerpt:
      "Edukatívny prehľad toho, čo skutočne hovoria overené štúdie o kanabidiole. Bez marketingových tvrdení, bez sľubov.",
    category: "Edukácia",
    readMinutes: 7,
    publishedAt: "2025-12-10",
    cover: "/images/blog-cbd.jpg",
    body: `Kanabidiol (CBD) je jedným z viac ako 100 kanabinoidov identifikovaných v rastline Cannabis sativa. Na rozdiel od THC nemá psychoaktívne účinky, ktoré by menili vnímanie.\n\n## Čo hovorí veda\n\nSvetová zdravotnícka organizácia (WHO) v roku 2018 uviedla, že CBD vo všeobecnosti "vykazuje priaznivý bezpečnostný profil". Európska liekopisná monografia z roku 2023 potvrdila jeho stabilné farmakologické parametre.\n\n## Čo o CBD tvrdiť nesmieme\n\nAko značka, ktorá stojí za transparentnosťou, nebudeme tvrdiť, že CBD "lieči" čokoľvek. Klinický výskum je v mnohých oblastiach ešte v ranom štádiu a v EÚ platia jasné pravidlá pre zdravotné tvrdenia. Rešpektujeme ich.\n\n## Náš postoj\n\nPonúkame kvalitný, čistý produkt vypestovaný na Slovensku. Ako s ním ľudia naložia, je ich rozhodnutie — my dodávame surovinu, dôveryhodnosť a transparentnosť pôvodu.\n\n> Odporúčané zdroje: WHO CBD Critical Review Report (2018), EMCDDA Cannabidiol Insights (2022), European Pharmacopoeia 11.0.`,
  },
  {
    slug: "od-vcely-po-kvet",
    title: "Od včely po kvet — prečo je v našom logu včela",
    excerpt:
      "Meno TatraCannaBees nie je náhoda. Vysvetľujeme, prečo sú včely a konopa v našej filozofii nerozlučný pár.",
    category: "Príbeh",
    readMinutes: 3,
    publishedAt: "2025-11-05",
    cover: "/images/blog-bees.jpg",
    body: `Keď zakladateľ Jaroslav Špes vyberal meno pre značku, hľadal niečo, čo spája to najlepšie z Tatier — divokú prírodu, čisté prostredie a symbioticke vzťahy.\n\n## Včely + konopa = ekosystém\n\nKonopa nekvitne pre včely v klasickom zmysle, no jej peľ je dôležitým zdrojom bielkovín pre robotnice v neskorom lete, keď iné zdroje ubúdajú. Naše polia sú miestom, kde sa oba svety stretávajú.\n\n## Znamená to viac než logo\n\nZáväzok k udržateľnosti — žiadne pesticídy, žiadne postreky v čase kvitnutia, priestor pre divokú faunu okolo poľa.\n\nZáväzok k lokalite — pracujeme s tým, čo je pod Tatrami doma, a snažíme sa nič neubrať.`,
  },
  {
    slug: "thc-neutralne-info",
    title: "THC — čo hovorí veda (a čo my nesmieme)",
    excerpt:
      "Rýchly, neutrálny prehľad tetrahydrokanabinolu podľa overených zdrojov. Fakty, kontext, žiadne odporúčania.",
    category: "Edukácia",
    readMinutes: 6,
    publishedAt: "2025-10-18",
    cover: "/images/blog-thc.jpg",
    body: `Tetrahydrokanabinol (THC) je najznámejší psychoaktívny kanabinoid rastliny konopy. Je predmetom desaťročí výskumu — od farmakológie cez neurovedu po verejné zdravie.\n\n## Ako pôsobí (na úrovni receptorov)\n\nTHC sa viaže na receptory CB1 v centrálnom nervovom systéme. Táto väzba je dobre zdokumentovaná v základnom výskume (Mechoulam et al., 1964 – doteraz).\n\n## Právny stav v EÚ\n\nPrávna úprava THC v Európskej únii sa líši medzi členskými štátmi. Na Slovensku sa produkty s obsahom THC riadia zákonom 139/1998 Z. z. a súvisiacimi predpismi. Prípustný limit THC v priemyselnej konope sa v EÚ pohybuje na úrovni 0,3 % (od roku 2023).\n\n## Náš postoj\n\nNaše produkty sú **CBD kvet z priemyselnej konope**, pestovanej v súlade s európskou legislatívou. Nepredávame a nepropagujeme produkty s obsahom THC nad zákonný limit.\n\n> Odporúčané zdroje: EMCDDA Cannabis Report (2023), Nariadenie EÚ 2021/2115, Zákon NR SR č. 139/1998 Z. z.`,
  },
  {
    slug: "coskoro-v-predaji",
    title: "Čoskoro spúšťame predaj — čo vás čaká",
    excerpt:
      "Otvárame dvere. Prvá séria CBD kvetov z úrody 2026 mieri k vám. Tu je krátky pohľad, na čo sa môžete tešiť.",
    category: "Novinky",
    readMinutes: 3,
    publishedAt: "2026-03-01",
    cover: "/images/blog-launch.jpg",
    body: `Roky pestovania, testovania a učenia sa. Blížime sa k momentu, keď náš CBD kvet konečne opustí sušiareň a mieri k vám.\n\n## Čo bude v prvej sérii\n\n- 3 kultivary z úrody 2026\n- Balenia 1 g, 3 g, 10 g\n- Certifikát obsahu (COA) v každom balíku\n- 100 % slovenský pôvod, ručne triedené kvety\n\n## Kedy\n\nPresný dátum spustenia zdieľame cez newsletter a Instagram (@tatracannabees). Zaregistrujte si účet — dostanete pozvánku medzi prvými.\n\n## Prečo "čoskoro" a nie "hneď"\n\nRobíme veci raz a poriadne. Radšej pár týždňov navyše na finálne testy, ako uponáhľaný launch, ktorý by nezodpovedal štandardu, ktorý si značka nastavila.`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
