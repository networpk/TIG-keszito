import { Call, ChevronRight, LocationOn, Mail, Schedule } from "relume-icons";

import { placeholders } from "@/assets/placeholders";
import { locations } from "@/content/locations";

import { PageShell } from "@/components/sections/PageShell";
import { Header47 } from "@/components/sections/Header47";
import { Contact14 } from "@/components/sections/Contact14";
import { ContactForm } from "@/components/sections/ContactForm";
import { LocationCards } from "@/components/sections/LocationCards";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";

/*
  Kapcsolat.

  A sorrend szándékos: elöl a telefon és a cím, mert a látogatók többsége
  foglalni vagy kérdezni akar, és arra a telefon a leggyorsabb út. Az űrlap
  csak utána jön — az annak való, akinek írásos ügye van. A végén a két
  telephely adatlapja, hogy ne kelljen a hálózat oldalra átmenni.
*/

const gyor = locations[0];

export const Contact = () => {
  return (
    <PageShell crumbs={[{ title: "Kapcsolat" }]}>
      {/* 1. Hero */}
      <Header47
        tagline="Kapcsolat"
        heading="Hívjon, írjon, vagy jöjjön be"
        description="Foglaláshoz és rövid kérdésekhez a telefon a leggyorsabb — hétköznap 7:00 és 19:00 között vesszük fel. Írásos megkeresésre egy munkanapon belül válaszolunk."
        buttons={[
          { title: `Hívás: ${gyor.phoneLabel}` },
          { title: "Időpontfoglalás", variant: "secondary" },
        ]}
        facts={[
          { label: "Telefon", value: gyor.phoneLabel },
          { label: "E-mail", value: gyor.email },
          { label: "Válaszidő", value: "1 munkanap" },
        ]}
      />

      {/* 2. Elérhetőségek és térkép */}
      <Contact14
        tagline="Győri Egészségközpont"
        heading="Hol talál minket"
        description="A klinika Győr belvárosában, saját parkolóval működik. Ha bármi kérdése van érkezés előtt, hívjon minket."
        contacts={[
          {
            icon: <LocationOn className="size-8 text-scheme-text" />,
            title: "Cím és megközelítés",
            description: `${gyor.address}\n${gyor.note}`,
            button: {
              title: "Útvonaltervezés",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          },
          {
            icon: <Call className="size-8 text-scheme-text" />,
            title: "Telefon",
            description: "Foglalás és kérdések, hétköznap 7:00–19:00 között.",
            link: { label: gyor.phoneLabel, url: `tel:${gyor.phoneNumber}` },
          },
          {
            icon: <Schedule className="size-8 text-scheme-text" />,
            title: "Nyitvatartás",
            description: gyor.hours,
          },
          {
            icon: <Mail className="size-8 text-scheme-text" />,
            title: "E-mail",
            description: "Írásos megkeresésekre egy munkanapon belül válaszolunk.",
            link: { label: gyor.email, url: `mailto:${gyor.email}` },
          },
        ]}
        map={{
          url: "#",
          image: { src: placeholders.map, alt: "A klinika a térképen" },
        }}
      />

      {/* 3. Írásos megkeresés */}
      <ContactForm
        tagline="Írjon nekünk"
        heading="Kérdése van? Írja meg"
        description="Válassza ki a témát, hogy a megkeresése rögtön a megfelelő kollégához kerüljön. Egy munkanapon belül válaszolunk."
        topics={[
          "Kérdés egy vizsgálatról",
          "Időpont módosítása vagy lemondása",
          "Lelet, dokumentáció",
          "Számlázás, egészségpénztár",
          "Céges együttműködés, üzemorvosi ellátás",
          "Panasz vagy visszajelzés",
          "Egyéb",
        ]}
        note="Sürgős, akut panasz esetén ne írjon: hívja a 112-t vagy a háziorvosi ügyeletet. Időpontot foglalni online vagy telefonon gyorsabb."
      />

      {/* 4. A két telephely */}
      <LocationCards
        tagline="Egészségközpontjaink"
        heading="Két helyszín, ugyanaz a szemlélet"
        description="A győri központban működik a teljes szakrendelési kör és a saját diagnosztika; a budapesti központ szolgáltatási köre ettől eltérhet."
        locations={locations}
      />

      {/* 5. GYIK */}
      <Faq3
        heading="Mielőtt felhívna"
        description="Néhány kérdés, amire itt rögtön megvan a válasz."
        button={{ title: `Hívás: ${gyor.phoneLabel}`, variant: "secondary" }}
        questions={[
          {
            title: "Hogyan tudok időpontot foglalni?",
            answer:
              "Online a foglalófelületen, ahol a szakrendelést és az orvost is kiválaszthatja, vagy telefonon hétköznap 7:00 és 19:00 között. Beutaló egyik esetben sem kell.",
          },
          {
            title: "Hogyan mondhatom le vagy módosíthatom az időpontomat?",
            answer:
              "A visszaigazoló e-mailből egy kattintással. Kérjük, legalább 24 órával előtte tegye meg, hogy más páciens megkaphassa a helyet. Lemondási díjat nem számolunk fel.",
          },
          {
            title: "Hol tudom megnézni a leletemet?",
            answer:
              "Az online felületén, ahová a vizsgálat után hozzáférést kap. Onnan PDF-ben letöltheti; papíralapú másolatot a recepción kérhet.",
          },
          {
            title: "Van parkolás a klinikánál?",
            answer:
              "Igen, saját, ingyenes parkoló a hátsó bejáratnál, 40 férőhellyel. Ha megtelik, a szomszédos utcában fizetős parkolás van, buszmegálló pedig 200 méterre.",
          },
        ]}
      />

      {/* 6. Záró CTA */}
      <Cta25
        heading="Foglaljon időpontot"
        description="A legtöbb szakrendelésünkre egy héten belül van szabad időpont. A foglalás két percet vesz igénybe."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${gyor.phoneLabel}`, variant: "secondary-alt" },
        ]}
      />
    </PageShell>
  );
};
