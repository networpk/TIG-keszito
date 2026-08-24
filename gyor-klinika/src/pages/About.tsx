import { CalendarMonth, Science, Verified } from "relume-icons";

import { placeholders } from "@/assets/placeholders";
import { PHONE_LABEL, doctors } from "@/content/site";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { TrustBar } from "@/components/sections/TrustBar";
import { Layout647 } from "@/components/sections/Layout647";
import { Layout234 } from "@/components/sections/Layout234";
import { Timeline5 } from "@/components/sections/Timeline5";
import { Team3 } from "@/components/sections/Team3";
import { Testimonial49 } from "@/components/sections/Testimonial49";
import { Cta1 } from "@/components/sections/Cta1";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Rólunk — bizalmi oldal.

  Ide az jut el, aki már látta a szolgáltatást, és most azt kérdezi: „kik ezek
  valójában?" Ezért az oldal nem a szolgáltatásokat ismétli, hanem a mögöttük
  álló bizonyítékokat sorakoztatja fel: számok, történet, elvek, mérföldkövek,
  arcok, vélemények. A CTA végig jelen van, de az oldal nem tolakszik — aki
  ide jön, még nem foglalni akar.
*/

const iconClass = "size-12 text-scheme-text";

export const About = () => {
  return (
    <PageShell crumbs={[{ title: "Rólunk" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Rólunk"
        heading="18 éve gyógyítunk Győrben"
        description="Magánklinikaként azt tűztük ki, hogy a szakorvosi ellátás ne jelentsen hetekig tartó várakozást és bizonytalan számlát. Ma több mint 40 szakrendelés, saját diagnosztika és nevesített orvosi gárda áll emögött."
        buttons={[
          { title: "Időpontfoglalás" },
          { title: "Orvosaink megismerése", variant: "secondary" },
        ]}
        facts={[
          { label: "Alapítás", value: "2008" },
          { label: "Szakorvosaink", value: "60+" },
          { label: "Vizsgálat évente", value: "60 000+" },
        ]}
      />

      {/* 2. Számokban */}
      <TrustBar
        stats={[
          { value: "18 éve", label: "működünk Győrben" },
          { value: "40+", label: "szakrendelés egy helyen" },
          { value: "60 000+", label: "vizsgálat évente" },
          { value: "4,8/5", label: "páciensértékelés" },
        ]}
        logosHeading="Minősítéseink és szakmai partnereink"
        logos={[
          { src: placeholders.logo, alt: "Minősítés 1" },
          { src: placeholders.logo, alt: "Minősítés 2" },
          { src: placeholders.logo, alt: "Minősítés 3" },
          { src: placeholders.logo, alt: "Minősítés 4" },
        ]}
      />

      {/* 3. A klinika története */}
      <Layout647
        tagline="A kezdetek"
        heading="Egy belgyógyászati rendelőből lett egészségközpont"
        description="2008-ban két szakorvossal és három rendelővel indultunk. A bővítés iránya mindvégig ugyanaz volt: ami a kivizsgáláshoz kell, legyen egy helyen, hogy a páciensnek ne kelljen városrészek között ingáznia egy diagnózisért."
        features={[
          "Saját labor, ultrahang és röntgen a helyszínen",
          "Foglalt időpontra érkezés, sorszám és tömeg nélkül",
          "Hosszabb konzultációs idővel tervezett rendelések",
          "Nyilvános árlista, utólagos tételek nélkül",
        ]}
        buttons={[{ title: "Szakrendeléseink", variant: "secondary" }]}
        image={{ src: placeholders.portrait, alt: "A klinika épülete" }}
      />

      {/* 4. Értékeink */}
      <Layout234
        tagline="Amiben hiszünk"
        heading="Három elv, amit számonkérhet rajtunk"
        description="Ezek nem szlogenek: mindegyikhez tartozik egy konkrét vállalás, amit a mindennapi működésünk visszaigazol."
        sections={[
          {
            icon: <CalendarMonth className={iconClass} />,
            heading: "Az idő a páciensé",
            description:
              "Foglalt időpontra érkezik, és a rendelés hosszabb konzultációs idővel van tervezve. Ha csúszunk, szólunk — nem hagyjuk a váróban tájékozatlanul.",
          },
          {
            icon: <Verified className={iconClass} />,
            heading: "Nevesített felelősség",
            description:
              "Minden orvosunk bemutatkozik: végzettség, tapasztalat, szakterület. Ön választja ki, kihez megy, és a leletet is ő írja alá.",
          },
          {
            icon: <Science className={iconClass} />,
            heading: "Egy látogatás, teljes kép",
            description:
              "A diagnosztika a helyszínen van, így a legtöbb kivizsgálás egyetlen alkalommal lezárul — nem kell hetekig újabb időpontokra várni.",
          },
        ]}
      />

      {/* 5. Mérföldkövek */}
      <Timeline5
        tagline="Mérföldkövek"
        heading="Hogyan jutottunk idáig"
        description="A bővítéseink nem üzleti tervből, hanem a leggyakoribb páciensbosszúságokból következtek."
        buttons={[{ title: "Kapcsolat", variant: "secondary" }]}
        timelineItems={[
          {
            heading: "2008",
            title: "Megnyitunk Győrben",
            description:
              "Két szakorvos, három rendelő, belgyógyászati és kardiológiai ellátás. Az első évben 1 200 vizsgálat.",
          },
          {
            heading: "2013",
            title: "Saját diagnosztika",
            description:
              "Labor, ultrahang és röntgen a helyszínen. Ettől kezdve a legtöbb kivizsgálás egy látogatás alatt lezárul.",
          },
          {
            heading: "2018",
            title: "Szűrőprogramok és üzemorvosi ellátás",
            description:
              "Menedzserszűrés és céges csomagok indulnak; az üzemorvosi szolgáltatás országos hálózatra bővül.",
          },
          {
            heading: "2024",
            title: "Online leletek és foglalás",
            description:
              "A leleteket a páciensek saját felületükön érik el, az időpontfoglalás pedig orvosválasztással működik.",
          },
        ]}
      />

      {/* 6. Orvosaink */}
      <div id="orvosaink">
        <Team3
          tagline="Orvosaink"
          heading="Kire bízza magát"
          description="Hatvan szakorvos dolgozik nálunk. Itt a szakterületek vezetői; az összes orvosunk a szakrendelések oldalán található meg."
          teamMembers={doctors}
          footer={{
            heading: "Nem találja a keresett szakterületet?",
            description:
              "Hívjon minket, és megmondjuk, melyik orvosunkhoz érdemes fordulnia a panaszával.",
            button: { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
          }}
        />
      </div>

      {/* 7. Páciensvélemények */}
      <Testimonial49
        heading="Mit mondanak a pácienseink"
        description="Valós, ellenőrizhető visszajelzések — a kezelés megnevezésével együtt."
        ratingSummary="4,8 / 5 · 1 240 Google-értékelés alapján"
        testimonials={[
          {
            description:
              "Tizenöt éve járok ide. Ugyanaz az orvos követ végig, nem kell minden alkalommal elölről kezdeni a történetet.",
            treatment: "Belgyógyászat",
            author: { name: "F. Erzsébet", source: "Google-értékelés" },
          },
          {
            description:
              "Az árat előre megmondták, és pontosan annyi lett. Nem volt utólagos tétel a számlán.",
            treatment: "Bőrgyógyászat",
            author: { name: "M. Péter", source: "Google-értékelés" },
          },
          {
            description:
              "A cégünk üzemorvosi ellátását is ők viszik. Egy kapcsolattartó, egy számla, kiszámítható ütemezés.",
            treatment: "Üzemorvosi ellátás",
            author: { name: "K. Zsolt", source: "Google-értékelés" },
          },
        ]}
      />

      {/* 8. Karrier */}
      <Cta1
        tagline="Karrier"
        heading="Dolgozzon nálunk"
        description="Szakorvosokat, szakasszisztenseket és recepciós kollégákat keresünk. Nálunk a rendelési idő nem tíz perces sávokra van szabdalva."
        bullets={[
          "Kiszámítható beosztás, tervezhető rendelési idővel",
          "Saját diagnosztikai háttér és korszerű eszközpark",
          "Adminisztrációs terhek helyett szakmai munka",
        ]}
        buttons={[
          { title: "Nyitott pozíciók", variant: "alternate" },
          { title: "Jelentkezés", variant: "secondary-alt" },
        ]}
        image={{ src: placeholders.landscape, alt: "Kollégáink munka közben" }}
      />

      {/* 9. Záró CTA */}
      <Cta25
        heading="Ismerkedjen meg velünk személyesen"
        description="A legtöbb szakrendelésünkre egy héten belül van szabad időpont. Beutaló nem kell hozzá."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
        note="Hétköznap 7:00–19:00 között telefonon is foglalhat."
      />
    </PageShell>
  );
};
