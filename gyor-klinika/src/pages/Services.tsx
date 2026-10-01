import { ChevronRight, Groups, HealthAndSafety, Person } from "relume-icons";

import { PHONE_LABEL } from "@/content/site";
import { serviceCategories } from "@/content/catalog";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { ServiceDirectory } from "@/components/sections/ServiceDirectory";
import { Layout620 } from "@/components/sections/Layout620";
import { Pricing40 } from "@/components/sections/Pricing40";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Szolgáltatások gyűjtőoldal.

  A főoldal szakrendelés-szekciója áttekintésre való, ez itt a katalógus: aki
  ide jut, vagy tudja a vizsgálat nevét, vagy a panaszát írja be. Ezért a
  kereső a leírásokban is keres, és a kártyákon ott az irányár — így az
  aloldalra már döntés közelében lép tovább a látogató.
*/

const iconClass = "size-12 text-scheme-text";

export const Services = () => {
  return (
    <PageShell crumbs={[{ title: "Szolgáltatások" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Szolgáltatások"
        heading="Több mint 40 szakrendelés egy helyen"
        description="Szakorvosi vizsgálatok, saját diagnosztika és szűrőprogramok. Keressen rá a panaszra vagy a vizsgálat nevére — minden szakrendelésnél ott az irányár és a szabad időpontok."
        buttons={[
          { title: "Időpontfoglalás" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
        ]}
        facts={[
          { label: "Szakrendelés", value: "40+" },
          { label: "Szakorvos", value: "60+" },
          { label: "Időpont jellemzően", value: "egy héten belül" },
        ]}
      />

      {/* 2. A teljes katalógus */}
      <div id="katalogus">
        <ServiceDirectory
          tagline="Katalógus"
          heading="Minden vizsgálatunk egy helyen"
          description="Szűrjön szakterületre, vagy írja be, mi a panasza — a kereső a leírásokban is keres."
          searchPlaceholder="Pl. mellkasi fájdalom, ultrahang, anyajegy"
          allLabel="Összes szakterület"
          categories={serviceCategories}
        />
      </div>

      {/* 3. Célközönség-elágazás */}
      <Layout620
        tagline="Nem tudja, mire van szüksége?"
        heading="Kezdjük ott, hogy mivel érkezett"
        description="Három tipikus helyzet, három különböző következő lépéssel."
        listItems={[
          {
            icon: <Person className={iconClass} />,
            heading: "Konkrét panaszom van",
            description:
              "Írja be a panaszt a keresőbe. Ha nem egyértelmű, melyik szakrendelés kell, hívjon minket — a szakasszisztensünk eligazítja.",
            buttons: [
              {
                title: "Vissza a keresőhöz",
                variant: "link",
                size: "link",
                iconRight: <ChevronRight className="text-scheme-text" />,
              },
            ],
          },
          {
            icon: <HealthAndSafety className={iconClass} />,
            heading: "Megelőzni szeretnék",
            description:
              "Panasz nélkül is érdemes szűrésre járni. A csomagok tartalma és ára összehasonlítható, hogy tudjon választani.",
            buttons: [
              {
                title: "Szűrőprogramok",
                variant: "link",
                size: "link",
                iconRight: <ChevronRight className="text-scheme-text" />,
              },
            ],
          },
          {
            icon: <Groups className={iconClass} />,
            heading: "Cégként keresek partnert",
            description:
              "Üzemorvosi ellátás és céges szűrés — országos lefedettséggel. Két munkanapon belül árazott javaslatot adunk.",
            buttons: [
              {
                title: "Ajánlatkérés",
                variant: "link",
                size: "link",
                iconRight: <ChevronRight className="text-scheme-text" />,
              },
            ],
          },
        ]}
        buttons={[]}
      />

      {/* 4. Szűrőprogramok */}
      <div id="szuroprogramok">
        <Pricing40
          tagline="Szűrőprogramok"
          heading="Csomagok, ha teljes képet szeretne"
          description="Egyenként is kérhető minden vizsgálat, de csomagban egy látogatás alatt lezajlik, és kedvezőbb."
          pricingPlans={[
            {
              planName: "Alap szűrés",
              description: "Éves állapotfelmérés panaszmentes felnőtteknek",
              price: "59 000 Ft-tól",
              priceNote: "kb. 2 óra, egy látogatás",
              recommendedFor: "30–45 éveseknek, első szűrésként",
              features: [
                "Belgyógyászati vizsgálat és konzultáció",
                "Nagy vérkép és alap laborpanel",
                "EKG és vérnyomásmérés",
                "Írásos összefoglaló és javaslat",
              ],
              button: { title: "Csomag részletei" },
            },
            {
              planName: "Menedzserszűrés",
              description: "Teljes körű szűrés egy nap alatt",
              price: "179 000 Ft-tól",
              priceNote: "kb. 4–5 óra, egy látogatás",
              recommendedFor: "45+ éveseknek és vezetőknek",
              features: [
                "Minden, ami az alap szűrésben",
                "Hasi és pajzsmirigy-ultrahang",
                "Terheléses EKG",
                "Szemészeti és bőrgyógyászati vizsgálat",
                "Záró konzultáció szakorvossal",
              ],
              button: { title: "Csomag részletei" },
            },
            {
              planName: "Céges szűrés",
              description: "Munkavállalói csomag, egyedi összeállítással",
              price: "Egyedi ajánlat",
              priceNote: "helyszínen vagy a klinikán",
              recommendedFor: "10 fő feletti csapatoknak",
              features: [
                "Igény szerint összeállított vizsgálati lista",
                "Csoportos időpontszervezés",
                "Üzemorvosi ellátással is kérhető",
                "Anonimizált, összesített riport a cégnek",
              ],
              button: { title: "Ajánlatot kérek", variant: "secondary" },
            },
          ]}
        />
      </div>

      {/* 5. GYIK */}
      <Faq3
        heading="Gyakori kérdések"
        description="A leggyakoribb kérdések a szolgáltatásainkról és a foglalásról."
        button={{ title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" }}
        questions={[
          {
            title: "Kell beutaló bármelyik vizsgálathoz?",
            answer:
              "Nem. Magánrendelésre minden szakrendelésünkre beutaló nélkül jöhet. Ha van korábbi lelete, hozza magával — segít az orvosnak.",
          },
          {
            title: "Honnan tudom, melyik szakrendelés kell nekem?",
            answer:
              "Írja be a panaszt a keresőbe: a leírásokban is keres, így a tünetre is ad találatot. Ha így sem egyértelmű, hívjon minket, és eligazítjuk.",
          },
          {
            title: "Egy látogatással megvan a kivizsgálás?",
            answer:
              "A legtöbb esetben igen, mert a labor, az ultrahang és a röntgen a helyszínen van. Ha további vizsgálat kell, azt jellemzően még aznap el tudjuk végezni.",
          },
          {
            title: "Az árlistán szereplő ár a végleges?",
            answer:
              "Az irányárakat előre közöljük, és a vizsgálat előtt pontos összeget mondunk. Utólagos tétel nem kerül a számlára.",
          },
          {
            title: "Elszámolható egészségpénztári kártyával?",
            answer:
              "A legtöbb szolgáltatásunk igen. Az elfogadott pénztárak listája és az elszámolás menete az Egészségpénztárak oldalon található.",
          },
        ]}
      />

      {/* 6. Záró CTA */}
      <Cta25
        heading="Foglaljon időpontot"
        description="Válassza ki a szakrendelést, nézze meg a szabad időpontokat, és foglaljon két perc alatt."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
        note="Hétköznap 7:00–19:00 között telefonon is foglalhat."
      />
    </PageShell>
  );
};
