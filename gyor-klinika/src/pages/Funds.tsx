import { ChevronRight, CreditCard, HealthAndSafety, Science } from "relume-icons";

import { placeholders } from "@/assets/placeholders";
import { PHONE_LABEL } from "@/content/site";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { FundGrid } from "@/components/sections/FundGrid";
import { Timeline5 } from "@/components/sections/Timeline5";
import { Layout234 } from "@/components/sections/Layout234";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Egészségpénztárak.

  Ez az oldal egyetlen kérdésre válaszol: „az én pénztáram elfogadott-e, és
  hogyan fizetek vele?" Ezért a lista áll elöl, névvel (nem csak logóval, mert
  a logót nem mindenki ismeri fel), és utána jön a folyamat három lépésben.
  A pénztári fedezet sokaknál eldönti, hogy egyáltalán idejön-e — ezért nem
  maradhat egy alárendelt menüpontban.
*/

const iconClass = "size-12 text-scheme-text";

const funds = [
  "Allianz Egészségpénztár",
  "MKB Egészségpénztár",
  "Új Pillér Egészségpénztár",
  "Dimenzió Egészségpénztár",
  "Egészségért Egészségpénztár",
  "Generali Egészségpénztár",
  "Honvéd Egészségpénztár",
  "K&H Medicina Egészségpénztár",
  "OTP Egészségpénztár",
  "Ticket Wellness Egészségpénztár",
  "Vasutas Egészségpénztár",
  "Patika Egészségpénztár",
  "Tempo Egészségpénztár",
  "AXA Egészségpénztár",
  "Üdülési csekk",
].map((name) => ({ name, logo: placeholders.logo, url: "#" }));

export const Funds = () => {
  return (
    <PageShell crumbs={[{ title: "Egészségpénztárak" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Fizetés"
        heading="Fizessen egészségpénztári kártyával"
        description="Tizenöt pénztár és biztosító kártyáját fogadjuk el. A kártyát a helyszínen leolvassuk, az elszámolást mi intézzük — Önnek nincs vele teendője, és nem kell megelőlegeznie a díjat."
        buttons={[
          { title: "Időpontfoglalás" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
        ]}
        facts={[
          { label: "Elfogadott pénztár", value: "15" },
          { label: "Elszámolás", value: "a helyszínen" },
          { label: "Megelőlegezés", value: "nem szükséges" },
        ]}
      />

      {/* 2. Az elfogadott pénztárak */}
      <FundGrid
        tagline="Partnereink"
        heading="Ezeket a pénztárakat fogadjuk el"
        description="Ha az Öné szerepel a listán, a vizsgálat díja közvetlenül a pénztári egyenlegéből fizethető."
        funds={funds}
        note="A lista változhat: ha az Ön pénztára nincs köztük, hívjon minket a foglalás előtt — a legtöbb esetben van megoldás."
        buttons={[
          {
            title: "Kérdése van? Hívjon minket",
            variant: "link",
            size: "link",
            iconRight: <ChevronRight className="text-scheme-text" />,
          },
        ]}
      />

      {/* 3. Az elszámolás menete */}
      <Timeline5
        tagline="Az elszámolás menete"
        heading="Három lépés, papírmunka nélkül"
        description="Nem kell előre engedélyt kérnie a pénztártól, és nem kell utólag számlát beküldenie."
        buttons={[{ title: "Időpontfoglalás" }]}
        timelineItems={[
          {
            heading: "1. lépés",
            title: "Szóljon a foglaláskor",
            description:
              "Jelezze, melyik pénztár kártyájával szeretne fizetni. Így a recepció előre fel tud készülni, és a vizsgálat után nem kell várakoznia.",
          },
          {
            heading: "2. lépés",
            title: "Hozza magával a kártyát",
            description:
              "A vizsgálat után a recepción leolvassuk a kártyát. Ha az egyenlege nem fedezi a teljes összeget, a különbözetet bankkártyával vagy készpénzzel egészítheti ki.",
          },
          {
            heading: "3. lépés",
            title: "Az elszámolást mi intézzük",
            description:
              "A pénztár felé mi számolunk el, Önnek nincs beküldenivalója. A számlát e-mailben is megkapja, ha a munkáltatói hozzájárulás igazolásához szüksége van rá.",
          },
        ]}
      />

      {/* 4. Mire használható */}
      <Layout234
        tagline="Mire használható"
        heading="Mit fizethet a pénztári egyenlegéből"
        description="A pénztári kártya nem csak gyógyszerre jó: a megelőzés és a szakorvosi ellátás nagy része is elszámolható."
        sections={[
          {
            icon: <HealthAndSafety className={iconClass} />,
            heading: "Szűrőprogramok",
            description:
              "Az alap szűrés és a menedzserszűrés teljes összege elszámolható. Sok pénztár kifejezetten támogatja a megelőzést.",
          },
          {
            icon: <Science className={iconClass} />,
            heading: "Szakorvosi ellátás és diagnosztika",
            description:
              "Konzultáció, labor, ultrahang, röntgen és a terápiás kezelések — a szolgáltatásaink döntő része elszámolható.",
          },
          {
            icon: <CreditCard className={iconClass} />,
            heading: "Munkáltatói hozzájárulás",
            description:
              "Ha a munkáltatója fizet be a pénztárába, az az egyenleg ugyanúgy felhasználható nálunk, mint a saját befizetése.",
          },
        ]}
      />

      {/* 5. GYIK */}
      <Faq3
        heading="Gyakori kérdések a pénztári fizetésről"
        description="Amit a leggyakrabban kérdeznek az elszámolásról."
        button={{ title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" }}
        questions={[
          {
            title: "Minden szolgáltatás elszámolható pénztári kártyával?",
            answer:
              "A szakorvosi ellátás, a diagnosztika és a szűrőprogramok igen. Az esztétikai célú beavatkozások jellemzően nem — ezt a pénztár szabályzata dönti el, és a foglalás előtt meg tudjuk mondani.",
          },
          {
            title: "Mi történik, ha az egyenlegem nem fedezi a díjat?",
            answer:
              "A különbözetet a helyszínen bankkártyával vagy készpénzzel egészítheti ki. Nem kell külön számlát intéznie.",
          },
          {
            title: "Kell előre engedélyt kérnem a pénztártól?",
            answer:
              "Nem. Az elszámolás a vizsgálat után, a helyszínen történik, és a pénztár felé mi számolunk el.",
          },
          {
            title: "Elszámolhatom a hozzátartozóm vizsgálatát is?",
            answer:
              "A legtöbb pénztárnál igen, ha a hozzátartozó szerepel a tagsági nyilatkozatán. A pontos feltételt a pénztára szabályzata mondja meg.",
          },
          {
            title: "Az én pénztáram nincs a listán. Mit tehetek?",
            answer:
              "Hívjon minket a foglalás előtt. Több pénztárral eseti elszámolásra is van lehetőség, és a listát folyamatosan bővítjük.",
          },
        ]}
      />

      {/* 6. Záró CTA */}
      <Cta25
        heading="Foglaljon időpontot"
        description="Foglaláskor jelezze, hogy pénztári kártyával fizetne — a többit mi intézzük."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
      />
    </PageShell>
  );
};
