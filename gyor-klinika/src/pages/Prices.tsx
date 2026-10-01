import { CreditCard, Description, Verified } from "relume-icons";

import { PHONE_LABEL } from "@/content/site";
import { priceGroups } from "@/content/catalog";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { PriceTable } from "@/components/sections/PriceTable";
import { Pricing40 } from "@/components/sections/Pricing40";
import { Layout234 } from "@/components/sections/Layout234";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Árak.

  A bizonytalan költség a magánegészségügy legerősebb konverziós akadálya, és
  aki erre az oldalra jön, egyetlen dolgot akar: megtalálni egy konkrét
  vizsgálat árát. Ezért a kereshető, szakterületenként összecsukható lista az
  oldal fő tartalma, és rögtön a hero után jön — a csomagok és a magyarázat
  csak utána.
*/

const iconClass = "size-12 text-scheme-text";

export const Prices = () => {
  return (
    <PageShell crumbs={[{ title: "Árak" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Árak"
        heading="Nyilvános árlista, utólagos tételek nélkül"
        description="Az árainkat nem kell telefonon kikérdeznie. A vizsgálat előtt minden esetben pontos összeget mondunk, és csak azt számlázzuk — a listán szereplő ár nem indulóajánlat."
        buttons={[
          { title: "Időpontfoglalás" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
        ]}
        facts={[
          { label: "Szakorvosi konzultáció", value: "25 000 Ft-tól" },
          { label: "Képalkotó diagnosztika", value: "12 000 Ft-tól" },
          { label: "Fizetés", value: "pénztári kártyával is" },
        ]}
      />

      {/* 2. A tételes árlista */}
      <div id="arlista">
        <PriceTable
          tagline="Árlista"
          heading="Áraink szakterületenként"
          description="Nyissa le a szakterületet, vagy keressen rá közvetlenül a vizsgálatra."
          searchPlaceholder="Pl. ultrahang, anyajegy, labor"
          groups={priceGroups}
          note="Az árak tájékoztató jellegűek és a vizsgálat összetettségétől függően változhatnak. A ritkább vizsgálatok nem mind szerepelnek a listán — ilyenkor hívjon minket, és pontos árat mondunk."
        />
      </div>

      {/* 3. Csomagok */}
      <div id="csomagok">
        <Pricing40
          tagline="Csomagok"
          heading="Csomagban kedvezőbb"
          description="A szűrőcsomagok egy látogatás alatt lezajlanak, és olcsóbbak, mint a vizsgálatok külön-külön."
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

      {/* 4. Mit tartalmaz az ár */}
      <Layout234
        tagline="Mit tartalmaz"
        heading="Mi van benne az árban"
        description="Ami a felsoroltakon kívül esik, arról a vizsgálat előtt szólunk — soha nem utólag, a számlán."
        sections={[
          {
            icon: <Verified className={iconClass} />,
            heading: "A szakorvosi munka",
            description:
              "A vizsgálat, a konzultáció és a lelet kiértékelése egy díjban van. Nem számolunk fel külön adminisztrációs vagy leletezési díjat.",
          },
          {
            icon: <Description className={iconClass} />,
            heading: "A lelet és a dokumentáció",
            description:
              "A leletet online eléri és PDF-ben letöltheti. Papíralapú másolat kérésre, felár nélkül.",
          },
          {
            icon: <CreditCard className={iconClass} />,
            heading: "A fizetés módja",
            description:
              "Bankkártya, készpénz vagy egészségpénztári kártya. Pénztári fizetésnél az elszámolást mi intézzük, nem kell megelőlegeznie.",
          },
        ]}
      />

      {/* 5. GYIK */}
      <Faq3
        heading="Gyakori kérdések az árakról"
        description="Amit a leggyakrabban kérdeznek a fizetésről és a számlázásról."
        button={{ title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" }}
        questions={[
          {
            title: "A listaár a végleges összeg?",
            answer:
              "A vizsgálat előtt minden esetben pontos árat mondunk, és azt számlázzuk. Ha a vizsgálat közben derül ki, hogy további lépés indokolt, azt előbb megbeszéljük Önnel — a hozzájárulása nélkül nem végezzük el.",
          },
          {
            title: "Mikor kell fizetni?",
            answer:
              "A vizsgálat után, a recepción. Előre utalni nem kell, és foglalási díjat sem kérünk.",
          },
          {
            title: "Kaphatok céges számlát?",
            answer:
              "Igen. A foglaláskor vagy a recepción jelezze a cég adatait, és a számlát arra a névre állítjuk ki.",
          },
          {
            title: "Van kedvezmény, ha több vizsgálatra jövök?",
            answer:
              "A szűrőcsomagok éppen ezért olcsóbbak, mint a vizsgálatok külön-külön. Rendszeres gondozás esetén a kontrollvizsgálat díja alacsonyabb az első vizsgálaténál.",
          },
          {
            title: "Mi történik, ha lemondom az időpontot?",
            answer:
              "Lemondási díjat nem számolunk fel. Kérjük, legalább 24 órával előtte jelezze, hogy más páciens megkaphassa a helyet.",
          },
        ]}
      />

      {/* 6. Záró CTA */}
      <Cta25
        heading="Megvan a vizsgálat, amire szüksége van?"
        description="Foglaljon időpontot, vagy hívjon minket, ha a listán nem találta meg, amit keresett."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
      />
    </PageShell>
  );
};
