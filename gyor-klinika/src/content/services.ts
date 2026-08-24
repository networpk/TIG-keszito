import { placeholders } from "@/assets/placeholders";
import { PHONE_LABEL } from "@/content/site";

/*
  A vizsgálat-aloldal sablonjának adatszerkezete.

  A 40+ szakrendelés mind ugyanazt a szakaszsorrendet kapja — ez a típus írja
  le, mi változik oldalanként. A sablon néhány ponton szolgáltatástípusonként
  hangsúlyt vált; ezt a `ctaKind` és az elhagyható szakaszok (`preparation`,
  `blogPosts`) kezelik:

  - diagnosztikai vizsgálat: a folyamat és a felkészülés a legfontosabb
  - szűrőcsomag: az ár/átfutási idő és a „mit tartalmaz" kap nagyobb súlyt
  - gondozási jellegű rendelés: az orvosbemutatás és a vélemények értékelődnek fel
  - vállalati szolgáltatás: `ctaKind: "quote"` — ajánlatkérés foglalás helyett
*/

export type ServiceFact = {
  label: string;
  value: string;
  detail?: string;
};

export type ServiceStep = {
  heading: string;
  title: string;
  description: string;
};

export type ServiceDoctor = {
  image: { src: string; alt?: string };
  name: string;
  jobTitle: string;
  description: string;
  profileUrl?: string;
};

export type Service = {
  slug: string;
  /** Breadcrumb: Főoldal → kategória → vizsgálat */
  category: { title: string; url: string };
  /** A hero fölötti kiemelés: melyik szakterülethez tartozik */
  tagline: string;
  name: string;
  intro: string;
  /** Foglalás vagy ajánlatkérés — a vállalati szolgáltatásoknál más a döntési út */
  ctaKind: "booking" | "quote";
  ctaLabel: string;
  heroFacts: { label: string; value: string }[];

  audience: {
    heading: string;
    description: string;
    features: string[];
    note?: string;
  };

  process: {
    heading: string;
    description: string;
    steps: ServiceStep[];
  };

  /** Elhagyható: nem minden vizsgálat igényel előkészületet */
  preparation?: {
    heading: string;
    description: string;
    todo: string[];
    avoid: string[];
    note?: string;
  };

  doctors: {
    heading: string;
    description: string;
    members: ServiceDoctor[];
  };

  keyFacts: {
    heading: string;
    description: string;
    facts: ServiceFact[];
    note?: string;
  };

  insurance: {
    heading: string;
    description: string;
  };

  related: {
    heading: string;
    description: string;
    highlight: {
      tagline: string;
      heading: string;
      description: string;
    };
    items: { heading: string; description: string }[];
  };

  testimonials: {
    description: string;
    treatment: string;
    author: { name: string; source: string };
  }[];

  faq: { title: string; answer: string }[];

  closing: {
    heading: string;
    description: string;
  };

  blogPosts: {
    category: string;
    readTime: string;
    title: string;
    description: string;
  }[];
};

/** Reprezentatív példa: diagnosztikai, egyszeri vizsgálat. */
export const terhelesesEkg: Service = {
  slug: "terheleses-ekg",
  category: { title: "Kardiológia", url: "#/#szakrendelesek" },
  tagline: "Kardiológia",
  name: "Terheléses EKG vizsgálat",
  intro:
    "Futópadon végzett, folyamatos EKG- és vérnyomás-ellenőrzés melletti terhelés. Azt mutatja meg, hogyan viselkedik a szíve fizikai igénybevétel alatt — olyan eltéréseket is, amelyek nyugalmi EKG-n nem látszanak.",
  ctaKind: "booking",
  ctaLabel: "Időpontfoglalás terheléses EKG-ra",
  heroFacts: [
    { label: "Ár", value: "34 000 Ft-tól" },
    { label: "Időtartam", value: "kb. 45 perc" },
    { label: "Lelet", value: "a vizsgálat napján" },
  ],

  audience: {
    heading: "Ez a vizsgálat Önnek szól, ha…",
    description:
      "Ha az alábbiak közül bármelyik igaz Önre, a terheléses EKG érdemi választ ad — és nem kell hozzá beutaló.",
    features: [
      "Terhelésre jelentkező mellkasi szorítás, nyomás vagy szokatlan fulladás",
      "Ismert szívbetegség gondozása, kezelés hatásának ellenőrzése",
      "40 év feletti rendszeres szűrés, panasz nélkül is",
      "Sportolás vagy versenyzés előtti terhelhetőségi vizsgálat",
      "Magas vérnyomás, magas koleszterin vagy cukorbetegség mellett",
      "Családi anamnézisben korai szívinfarktus vagy hirtelen szívhalál",
    ],
    note: "Akut, nyugalomban is fennálló mellkasi fájdalom esetén ne időpontot foglaljon: hívja a 112-t.",
  },

  process: {
    heading: "Így zajlik a terheléses EKG",
    description:
      "A teljes folyamat egy látogatás, nagyjából 45 perc. Végig szakorvos és asszisztens van Önnel.",
    steps: [
      {
        heading: "1. lépés",
        title: "Érkezés és előzmények",
        description:
          "Az orvos átnézi a panaszait, a gyógyszereit és a korábbi leleteit, majd megbeszéli Önnel, mire számíthat a vizsgálat alatt. Ekkor tud kérdezni is.",
      },
      {
        heading: "2. lépés",
        title: "Felkészítés és nyugalmi EKG",
        description:
          "Az asszisztens felhelyezi az elektródákat és a vérnyomásmérőt, majd nyugalmi EKG készül. Ez adja az összehasonlítási alapot a terhelés alatti görbéhez.",
      },
      {
        heading: "3. lépés",
        title: "A terhelés",
        description:
          "Futópadon halad, a tempó és az emelkedés fokozatosan nő. Az EKG-t és a vérnyomását folyamatosan figyeljük. Ha bármikor rosszul érzi magát, szóljon — a vizsgálatot azonnal leállítjuk.",
      },
      {
        heading: "4. lépés",
        title: "Levezetés, kiértékelés, lelet",
        description:
          "A terhelés után néhány percig még mérünk, amíg a szívfrekvenciája visszaáll. A szakorvos még aznap kiértékeli a görbét, és a leletet az online felületén is eléri.",
      },
    ],
  },

  preparation: {
    heading: "Így készüljön a vizsgálatra",
    description:
      "Néhány perc előkészület, de sokat számít: felkészületlenül érkezve a vizsgálatot esetenként meg kell ismételni.",
    todo: [
      "Kényelmes sportruházat és zárt sportcipő",
      "Korábbi EKG, szív-ultrahang vagy zárójelentés, ha van",
      "A rendszeresen szedett gyógyszerek listája, adagolással",
      "Könnyű étkezés legkésőbb 2 órával a vizsgálat előtt",
    ],
    avoid: [
      "Kávé, energiaital és egyéb koffein a vizsgálat előtti 12 órában",
      "Dohányzás a vizsgálat napján",
      "Megerőltető testmozgás a vizsgálatot megelőző napon",
      "Bő, csúszós ruházat és utcai cipő",
    ],
    note: "Vérnyomáscsökkentőt vagy béta-blokkolót csak akkor hagyjon ki, ha a kezelőorvosa kifejezetten így rendelkezett. Kérdés esetén hívjon minket a foglalás előtt.",
  },

  doctors: {
    heading: "Ki végzi a vizsgálatot",
    description:
      "A terhelést kardiológus szakorvos felügyeli, a leletet is ő írja alá. Az időpontfoglalásnál orvost is választhat.",
    members: [
      {
        image: { src: placeholders.avatar, alt: "Dr. Tóth Márta portréja" },
        name: "Dr. Tóth Márta",
        jobTitle: "Kardiológus, belgyógyász szakorvos",
        description:
          "Szív- és érrendszeri kivizsgálás, hipertónia-gondozás. Terheléses vizsgálatok és szív-ultrahang, 18 év szakorvosi gyakorlattal.",
        profileUrl: "#",
      },
      {
        image: { src: placeholders.avatar, alt: "Dr. Fekete András portréja" },
        name: "Dr. Fekete András",
        jobTitle: "Kardiológus szakorvos, sportkardiológia",
        description:
          "Sportolók terhelhetőségi vizsgálata és versenyengedélyhez szükséges alkalmassági kivizsgálás. Szakvizsga: 2011.",
        profileUrl: "#",
      },
    ],
  },

  keyFacts: {
    heading: "Mennyibe kerül és mikor lesz meg az eredmény",
    description:
      "Nincs utólagos tétel: a vizsgálat előtt megmondjuk a pontos összeget, és csak azt számlázzuk.",
    facts: [
      {
        label: "Ár",
        value: "34 000 Ft",
        detail: "Kardiológiai konzultációval együtt 52 000 Ft. Kontrollvizsgálat 26 000 Ft.",
      },
      {
        label: "Időtartam",
        value: "kb. 45 perc",
        detail: "Ebből a terhelés maga 8–12 perc, a többi felkészítés és levezetés.",
      },
      {
        label: "Lelet",
        value: "a vizsgálat napján",
        detail: "Online elérhető és letölthető PDF-ben; kérésre postázzuk is.",
      },
    ],
    note: "Az árak tájékoztató jellegűek. Fizetni kártyával, készpénzzel vagy egészségpénztári kártyával lehet.",
  },

  insurance: {
    heading: "Egészségpénztári kártyával elszámolható",
    description:
      "A terheléses EKG a felsorolt pénztáraknál és biztosítóknál elszámolható szolgáltatás. A kártyát a helyszínen leolvassuk, az elszámolást mi intézzük — Önnek nincs vele teendője.",
  },

  related: {
    heading: "Ez is érdekelheti",
    description:
      "Ha nem biztos benne, hogy pontosan erre van szüksége, ezek a leggyakoribb kiegészítő vagy alternatív vizsgálatok.",
    highlight: {
      tagline: "Csomagban kedvezőbb",
      heading: "Kardiológiai kivizsgálás egy látogatás alatt",
      description:
        "Kardiológiai konzultáció, terheléses EKG, szív-ultrahang és laborvizsgálat egy időpontban, közös kiértékeléssel. Aki teljes képet szeretne a szíve állapotáról, ezzel jár a legjobban.",
    },
    items: [
      {
        heading: "Szív-ultrahang",
        description: "A szívizom és a billentyűk működésének képalkotó vizsgálata, terhelés nélkül.",
      },
      {
        heading: "Holter-vizsgálat",
        description: "24 órás EKG-monitorozás, ha a panaszok alkalomszerűen jelentkeznek.",
      },
      {
        heading: "ABI (boka-kar index)",
        description: "Az alsó végtagi érszűkület gyors, fájdalommentes szűrése.",
      },
      {
        heading: "Kardiológiai konzultáció",
        description: "Ha még nem tudja, melyik vizsgálat kell: az orvos segít eldönteni.",
      },
    ],
  },

  testimonials: [
    {
      description:
        "Végig elmondták, mi következik, és hogy mikor szóljak. Nem volt bennem feszültség a futópadon sem.",
      treatment: "Terheléses EKG",
      author: { name: "V. Tamás", source: "Google-értékelés" },
    },
    {
      description:
        "A leletet még aznap délután megkaptam, és az orvos telefonon átbeszélte velem, mit jelentenek az értékek.",
      treatment: "Terheléses EKG",
      author: { name: "B. Ildikó", source: "Google-értékelés" },
    },
    {
      description:
        "Versenyengedélyhez kellett az alkalmassági. Egy hét alatt kaptam időpontot, minden papírt itt intéztek.",
      treatment: "Sportkardiológiai vizsgálat",
      author: { name: "N. Dániel", source: "Google-értékelés" },
    },
  ],

  faq: [
    {
      title: "Fájdalmas a vizsgálat?",
      answer:
        "Nem. A terhelés fáradtsággal jár — nagyjából annyival, mint egy gyors séta vagy könnyű futás —, de fájdalmat nem okoz. Ha bármikor rosszul érzi magát, szóljon, és azonnal leállítjuk.",
    },
    {
      title: "Kell hozzá beutaló?",
      answer:
        "Nem. Magánrendelésre beutaló nélkül is jöhet. Ha van korábbi EKG-ja vagy kardiológiai lelete, azt hozza magával — segít az összehasonlításban.",
    },
    {
      title: "Mennyi idő alatt kapom meg az eredményt?",
      answer:
        "A leletet a vizsgálat napján elkészítjük. Az online felületén éri el és PDF-ben letöltheti; kérésre postázzuk is.",
    },
    {
      title: "Elszámolható az egészségpénztáramnál?",
      answer:
        "Igen, a felsorolt pénztárak és biztosítók kártyáit a helyszínen elfogadjuk, és az elszámolást mi intézzük. Ha az Ön pénztára nem szerepel a listán, hívjon minket a foglalás előtt.",
    },
    {
      title: "Szedhetem a gyógyszereimet a vizsgálat napján?",
      answer:
        "Alapesetben igen. Vérnyomáscsökkentőt vagy béta-blokkolót csak akkor hagyjon ki, ha a kezelőorvosa kifejezetten így rendelkezett — ezek befolyásolják a szívfrekvenciát, ezért fontos, hogy a vizsgálatot végző orvos tudjon róluk.",
    },
    {
      title: "Mi történik, ha a vizsgálat eltérést mutat?",
      answer:
        "A szakorvos még a helyszínen elmondja, mit lát, és javaslatot tesz a következő lépésre — ez lehet további vizsgálat, gyógyszeres kezelés vagy gondozásba vétel. Kontrollra ugyanahhoz az orvoshoz jön vissza.",
    },
  ],

  closing: {
    heading: "Foglaljon időpontot terheléses EKG-ra",
    description:
      "Kardiológiai vizsgálatainkra jellemzően egy héten belül van szabad időpont. Beutaló nem kell, a foglalás két perc.",
  },

  blogPosts: [
    {
      category: "Szív- és érrendszer",
      readTime: "6 perc olvasás",
      title: "Mit érdemes tudni a szívszűrésről 40 felett?",
      description: "Melyik vizsgálat mit mutat meg, és milyen gyakorisággal érdemes elvégeztetni.",
    },
    {
      category: "Megelőzés",
      readTime: "4 perc olvasás",
      title: "Terhelésre jelentkező mellkasi panasz: mikor menjen orvoshoz?",
      description: "A figyelmeztető jelek, amiknél nem érdemes kivárni a következő szűrést.",
    },
    {
      category: "Sport",
      readTime: "5 perc olvasás",
      title: "Sportolás előtti alkalmassági: kinek kötelező, kinek ajánlott?",
      description: "Versenyengedély, amatőr sport, visszatérés kihagyás után — mikor mi szükséges.",
    },
  ],
};

/** A telefonszám a CTA-kban is megjelenik, egy helyről. */
export const CALL_LABEL = `Hívás: ${PHONE_LABEL}`;
