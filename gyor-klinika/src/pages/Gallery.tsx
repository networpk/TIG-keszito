import { Accessible, DirectionsCar, FamilyRestroom } from "relume-icons";

import { placeholders } from "@/assets/placeholders";
import { PHONE_LABEL } from "@/content/site";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Layout234 } from "@/components/sections/Layout234";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Galéria.

  Egy magánklinikánál a galéria nem dekoráció: azt a kérdést válaszolja meg,
  hogy „milyen lesz ott bent". Ezért minden képhez tartozik képaláírás, a rács
  szűrhető aszerint, hogy mi érdekli a látogatót, és az oldal alján ott van az,
  amit a fotók nem mutatnak meg — parkolás, akadálymentesség, gyerekbarát
  körülmények.
*/

const iconClass = "size-12 text-scheme-text";

const galleryImages = [
  {
    src: placeholders.landscape,
    alt: "Belgyógyászati rendelő",
    caption: "Belgyógyászati rendelő — minden rendelő természetes fényt kap.",
    category: "rendelok",
    wide: true,
  },
  {
    src: placeholders.portrait,
    alt: "Ultrahangos vizsgáló",
    caption: "Ultrahangos vizsgáló, 2023-ban cserélt készülékkel.",
    category: "diagnosztika",
  },
  {
    src: placeholders.landscape,
    alt: "Váróterem",
    caption: "A váró: foglalt időpontokkal dolgozunk, ezért ritkán telik meg.",
    category: "varo",
  },
  {
    src: placeholders.portrait,
    alt: "Laboratórium",
    caption: "Saját labor — a legtöbb eredmény 24 órán belül elkészül.",
    category: "diagnosztika",
  },
  {
    src: placeholders.landscape,
    alt: "Röntgen",
    caption: "Digitális röntgen, alacsony sugárterheléssel.",
    category: "diagnosztika",
  },
  {
    src: placeholders.portrait,
    alt: "Gyermekrendelő",
    caption: "Gyermekrendelő, játszósarokkal.",
    category: "rendelok",
  },
  {
    src: placeholders.landscape,
    alt: "Recepció",
    caption: "Recepció: itt intézzük az egészségpénztári elszámolást is.",
    category: "varo",
    wide: true,
  },
  {
    src: placeholders.portrait,
    alt: "Gyógytorna terem",
    caption: "Gyógytorna terem, egyéni és csoportos foglalkozásokhoz.",
    category: "rendelok",
  },
  {
    src: placeholders.landscape,
    alt: "Orvosaink munka közben",
    caption: "Reggeli esetmegbeszélés — a nehezebb esetek közösen kerülnek elő.",
    category: "csapat",
  },
];

export const Gallery = () => {
  return (
    <PageShell crumbs={[{ title: "Galéria" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Galéria"
        heading="Nézzen körül, mielőtt bejön"
        description="Rendelők, diagnosztikai eszközök, váró és a csapat. Ha valami hiányzik a képekről, amit tudni szeretne, hívjon minket — szívesen körbevezetjük érkezés előtt."
        buttons={[
          { title: "Időpontfoglalás" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
        ]}
        facts={[
          { label: "Rendelők", value: "22" },
          { label: "Alapterület", value: "1 400 m²" },
          { label: "Parkolóhely", value: "40" },
        ]}
      />

      {/* 2. Szűrhető képrács */}
      <GalleryGrid
        tagline="Képek"
        heading="Így néz ki nálunk"
        description="Válassza ki, mi érdekli. Minden kép a saját rendelőnkben készült — nincs köztük katalógusfotó."
        allLabel="Összes"
        categories={[
          { id: "rendelok", title: "Rendelők" },
          { id: "diagnosztika", title: "Diagnosztika" },
          { id: "varo", title: "Váró és recepció" },
          { id: "csapat", title: "A csapat" },
        ]}
        images={galleryImages}
      />

      {/* 3. Amit a képek nem mutatnak */}
      <Layout234
        tagline="Gyakorlati tudnivalók"
        heading="Amit a fotókról nem lehet leolvasni"
        description="A leggyakoribb kérdések arról, hogyan lehet hozzánk eljutni és bejutni."
        sections={[
          {
            icon: <DirectionsCar className={iconClass} />,
            heading: "Parkolás a hátsó bejáratnál",
            description:
              "40 ingyenes parkolóhely a klinika saját területén. Ha megtelik, a szomszédos utcában fizetős parkolás van, buszmegálló 200 méterre.",
          },
          {
            icon: <Accessible className={iconClass} />,
            heading: "Akadálymentes bejutás",
            description:
              "Lift, széles ajtók és akadálymentes mosdó minden szinten. Kerekesszékes érkezésnél szóljon foglaláskor, hogy a földszinti rendelőt tudjuk beosztani.",
          },
          {
            icon: <FamilyRestroom className={iconClass} />,
            heading: "Gyerekkel érkezőknek",
            description:
              "Játszósarok a váróban, pelenkázó a mosdóban. A gyermekrendeléseket úgy időzítjük, hogy ne kelljen felnőtt betegekkel együtt várakozni.",
          },
        ]}
      />

      {/* 4. Záró CTA */}
      <Cta25
        heading="Jöjjön be személyesen"
        description="A legtöbb szakrendelésünkre egy héten belül van szabad időpont. Beutaló nem kell hozzá."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
      />
    </PageShell>
  );
};
