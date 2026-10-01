import { placeholders } from "@/assets/placeholders";
import { PHONE_LABEL } from "@/content/site";
import { coverage, locations } from "@/content/locations";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { LocationCards } from "@/components/sections/LocationCards";
import { CoverageList } from "@/components/sections/CoverageList";
import { Cta1 } from "@/components/sections/Cta1";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Országos hálózat.

  Két különböző látogató jár erre az oldalra, és a jelenlegi oldal
  összemossa őket: a magánszemély azt kérdezi, „hol tudok bemenni", a HR-es
  pedig azt, „a mi telephelyünkön elérhető-e az üzemorvosi ellátás". Ezért
  előbb a két egészségközpont áll, teljes adatlappal, és csak utána a
  településlista — ami itt kereshető, mert egyetlen konkrét kérdésre kell
  válaszolnia.
*/

export const Network = () => {
  const cityCount = coverage.reduce((sum, region) => sum + region.cities.length, 0);

  return (
    <PageShell crumbs={[{ title: "Országos hálózat" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Országos hálózat"
        heading="Két központ, országos lefedettség"
        description="Szakorvosi ellátás Győrben és Budapesten, foglalkozás-egészségügyi (üzemorvosi) szolgáltatás pedig országosan — a munkavállalóinak nem kell utazniuk az alkalmassági vizsgálatért."
        buttons={[
          { title: "Ajánlatkérés üzemorvosi ellátásra" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
        ]}
        facts={[
          { label: "Egészségközpont", value: "2" },
          { label: "Ellátott település", value: `${cityCount}+` },
          { label: "Megye", value: `${coverage.length}` },
        ]}
      />

      {/* 2. Egészségközpontjaink */}
      <LocationCards
        tagline="Egészségközpontjaink"
        heading="Ide tud bejönni vizsgálatra"
        description="Mindkét központban szakorvosi ellátás és saját diagnosztika működik. A rendelési idők és a szolgáltatási kör eltérhet."
        locations={locations}
      />

      {/* 3. Országos lefedettség */}
      <CoverageList
        tagline="Üzemorvosi lefedettség"
        heading="Hol tudjuk ellátni a munkavállalóit"
        description="A foglalkozás-egészségügyi szolgáltatásunkat országos szinten biztosítjuk: a munkaköri alkalmassági vizsgálatok a telephelyükön vagy a hozzájuk legközelebbi partnerrendelőben zajlanak."
        searchPlaceholder="Keressen településre vagy megyére"
        regions={coverage}
        note="A lista a jelenlegi szerződéses lefedettséget mutatja. Ha az Önök telephelye nincs köztük, attól még tudunk megoldást ajánlani."
        buttons={[
          { title: "Ajánlatkérés" },
          { title: "Üzemorvosi szolgáltatásaink", variant: "secondary" },
        ]}
      />

      {/* 4. Vállalati sáv */}
      <div id="vallalatoknak">
        <Cta1
          tagline="Vállalatoknak"
          heading="Egy szerződés, egy kapcsolattartó, országos ellátás"
          description="Több telephelyes cégeknél a legnagyobb teher az adminisztráció: külön szolgáltató, külön számla, külön ütemezés minden városban. Nálunk ez egy szerződés."
          bullets={[
            "Munkaköri alkalmassági vizsgálatok országosan, telephelyen is",
            "Csoportos időpontszervezés, egy tételben számlázva",
            "Menedzserszűrés vezetőknek, egy nap alatt",
            "Anonimizált, összesített egészségriport a HR-nek",
          ]}
          buttons={[
            { title: "Ajánlatot kérek", variant: "alternate" },
            { title: "Céges szolgáltatásaink", variant: "secondary-alt" },
          ]}
          image={{ src: placeholders.landscape, alt: "Céges egészségügyi ellátás" }}
        />
      </div>

      {/* 5. GYIK */}
      <Faq3
        heading="Gyakori kérdések a hálózatról"
        description="A leggyakoribb kérdések a telephelyekről és az országos ellátásról."
        button={{ title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" }}
        questions={[
          {
            title: "Melyik központban milyen vizsgálat érhető el?",
            answer:
              "A győri központban működik a teljes szakrendelési kör és a saját diagnosztika. A budapesti központ szolgáltatási köre ettől eltérhet — foglalás előtt a szakrendelés oldalán jelezzük, melyik helyszínen elérhető.",
          },
          {
            title: "Az üzemorvosi ellátás a telephelyünkön is megoldható?",
            answer:
              "Igen. 20 fő feletti létszámnál jellemzően kitelepülünk a telephelyre; ez alatt a hozzájuk legközelebbi partnerrendelőben zajlik a vizsgálat.",
          },
          {
            title: "A listán nem szereplő településre is vállalnak ellátást?",
            answer:
              "Jellemzően igen — a lista a jelenlegi szerződéses lefedettséget mutatja, nem a határainkat. Küldje el a telephelyek listáját, és megnézzük, mit tudunk ajánlani.",
          },
          {
            title: "Egy szerződéssel intézhető több telephely?",
            answer:
              "Igen. Egy keretszerződés, egy kapcsolattartó és egy számla — a telephelyek szerinti bontást a mellékletben kezeljük.",
          },
        ]}
      />

      {/* 6. Záró CTA */}
      <Cta25
        heading="Kérjen ajánlatot a cégének"
        description="Küldje el a létszámot és a telephelyeket, és két munkanapon belül árazott javaslatot adunk."
        buttons={[
          { title: "Ajánlatkérés", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
      />
    </PageShell>
  );
};
