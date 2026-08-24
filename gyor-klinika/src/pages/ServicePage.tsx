import { ChevronRight } from "relume-icons";

import { placeholders } from "@/assets/placeholders";
import {
  BOOKING_URL,
  PHONE_LABEL,
  PHONE_NUMBER,
  footerColumns,
  footerText,
  legalLinks,
  navLinks,
} from "@/content/site";
import type { Service } from "@/content/services";

import { Navbar1 } from "@/components/sections/Navbar1";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Header47 } from "@/components/sections/Header47";
import { Layout647 } from "@/components/sections/Layout647";
import { Timeline5 } from "@/components/sections/Timeline5";
import { Preparation } from "@/components/sections/Preparation";
import { Team16 } from "@/components/sections/Team16";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { Logo5 } from "@/components/sections/Logo5";
import { Layout376 } from "@/components/sections/Layout376";
import { Testimonial49 } from "@/components/sections/Testimonial49";
import { Faq3 } from "@/components/sections/Faq3";
import { Cta25 } from "@/components/sections/Cta25";
import { Blog40, blogPostButton } from "@/components/sections/Blog40";
import { Footer14 } from "@/components/sections/Footer14";
import { MobileActionBar } from "@/components/sections/MobileActionBar";

/*
  Vizsgálat-aloldal sablon — a struktúraterv 14 szakasza, sorrendben.

  A főoldal logikája „figyelemfelkeltés → érdeklődés → megerősítés"; ez az oldal
  ezzel szemben rövidebb, célzottabb utat jár be: megerősítés → folyamat →
  bizalom → gyakorlati akadályok elhárítása → foglalás. Aki ideér, már tudja,
  mit keres — azt akarja tudni, hogy jó helyen jár, mi fog történni, mennyibe
  kerül és mikor jut be.

  Minden szakasz a `service` objektumból töltődik, így a 40+ szakrendelés
  ugyanezt a sablont használja más tartalommal.
*/

export const ServicePage = ({ service }: { service: Service }) => {
  const isQuote = service.ctaKind === "quote";
  const primaryCta = { title: service.ctaLabel };
  const callCta = { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" as const };

  return (
    <>
      {/* 1. Header / sticky navigáció + breadcrumb */}
      <Navbar1
        logo={{ url: "#/", src: "", alt: "Klinika Győr" }}
        navLinks={navLinks}
        phone={{ label: PHONE_LABEL, number: PHONE_NUMBER }}
        buttons={[{ title: isQuote ? "Ajánlatkérés" : "Időpontfoglalás", size: "sm" }]}
      />
      <Breadcrumb
        crumbs={[
          { title: "Főoldal", url: "#/" },
          { title: service.category.title, url: service.category.url },
          { title: service.name },
        ]}
      />

      {/* 2. Hero (szolgáltatás-specifikus) */}
      <div id="idopontfoglalas">
        <Header47
          tagline={service.tagline}
          heading={service.name}
          description={service.intro}
          buttons={[primaryCta, callCta]}
          facts={service.heroFacts}
        />
      </div>

      {/* 3. Kinek ajánlott / mikor van rá szükség */}
      <Layout647
        tagline="Kinek ajánljuk"
        heading={service.audience.heading}
        description={service.audience.description}
        features={service.audience.features}
        note={service.audience.note}
        buttons={[{ ...primaryCta, variant: "secondary" }]}
        image={{ src: placeholders.portrait, alt: `${service.name} a rendelőben` }}
      />

      {/* 4. A vizsgálat menete */}
      <Timeline5
        tagline="A vizsgálat menete"
        heading={service.process.heading}
        description={service.process.description}
        buttons={[primaryCta]}
        timelineItems={service.process.steps}
      />

      {/* 5. Felkészülés a vizsgálatra — elhagyható, ha nincs teendő */}
      {service.preparation && (
        <Preparation
          tagline="Felkészülés"
          heading={service.preparation.heading}
          description={service.preparation.description}
          todo={service.preparation.todo}
          avoid={service.preparation.avoid}
          note={service.preparation.note}
        />
      )}

      {/* 6. Szakorvos(ok) bemutatása */}
      <Team16
        tagline="Orvosaink"
        heading={service.doctors.heading}
        description={service.doctors.description}
        teamMembers={service.doctors.members}
        footerContent={{
          heading: "Kérdése van a vizsgálattal kapcsolatban?",
          description:
            "Hívjon minket — a szakasszisztensünk válaszol, és ha kell, orvoshoz irányítja a kérdést.",
          button: callCta,
        }}
      />

      {/* 7. Ár, időtartam, eredmény átfutási ideje */}
      <div id="ar">
        <KeyFacts
          tagline={isQuote ? "Ajánlat és ütemezés" : "Ár és időtartam"}
          heading={service.keyFacts.heading}
          description={service.keyFacts.description}
          facts={service.keyFacts.facts}
          note={service.keyFacts.note}
          buttons={[primaryCta, { title: "Teljes árlista", variant: "secondary" }]}
        />
      </div>

      {/* 8. Egészségpénztár / biztosító elfogadása */}
      <Logo5
        heading={service.insurance.heading}
        description={service.insurance.description}
        logos={[
          { src: placeholders.logo, alt: "Pénztár logó 1" },
          { src: placeholders.logo, alt: "Pénztár logó 2" },
          { src: placeholders.logo, alt: "Pénztár logó 3" },
          { src: placeholders.logo, alt: "Pénztár logó 4" },
          { src: placeholders.logo, alt: "Pénztár logó 5" },
        ]}
        button={{
          title: "Hogyan használható fel a pénztári egyenleg?",
          variant: "link",
          size: "link",
          iconRight: <ChevronRight className="text-scheme-text" />,
        }}
      />

      {/* 9. Kapcsolódó / kiegészítő vizsgálatok */}
      <Layout376
        tagline="Kapcsolódó vizsgálatok"
        heading={service.related.heading}
        description={service.related.description}
        cardBig={{
          tagline: service.related.highlight.tagline,
          heading: service.related.highlight.heading,
          description: service.related.highlight.description,
          buttons: [
            { title: "Csomag részletei", variant: "secondary" },
            {
              title: "Időpontfoglalás",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          ],
          image: { src: placeholders.landscape, alt: "Kardiológiai kivizsgálás" },
        }}
        cardsSmall={service.related.items.map((item) => ({
          heading: item.heading,
          description: item.description,
          button: {
            title: "Részletek",
            variant: "link",
            size: "link",
            iconRight: <ChevronRight className="text-scheme-text" />,
          },
        }))}
      />

      {/* 10. Páciensvélemények */}
      <Testimonial49
        heading="Mit mondanak azok, akik már voltak nálunk"
        description="Ehhez a vizsgálathoz kötődő visszajelzések, a kezelés megnevezésével."
        ratingSummary="4,8 / 5 · 1 240 Google-értékelés alapján"
        testimonials={service.testimonials}
      />

      {/* 11. Gyakori kérdések */}
      <Faq3
        heading="Gyakori kérdések a vizsgálatról"
        description="A leggyakoribb konkrét kérdések — közvetlenül a foglalás előtt."
        button={callCta}
        questions={service.faq}
      />

      {/* 12. Záró CTA sáv */}
      <Cta25
        heading={service.closing.heading}
        description={service.closing.description}
        buttons={[
          { ...primaryCta, variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
        note="Hétköznap 7:00–19:00 között telefonon is foglalhat."
      />

      {/* 13. Kapcsolódó blog / edukációs tartalom */}
      <Blog40
        tagline="Egészségmagazin"
        heading="Kapcsolódó olvasnivaló"
        description="Szakorvosaink írásai ehhez a témához."
        button={{ title: "Összes cikk", variant: "secondary" }}
        blogPosts={service.blogPosts.map((post) => ({
          url: "#",
          image: { src: placeholders.landscape, alt: "Cikk borítóképe" },
          category: post.category,
          readTime: post.readTime,
          title: post.title,
          description: post.description,
          button: blogPostButton,
        }))}
      />

      {/* 14. Footer — örökölve a főoldalról */}
      <Footer14
        logo={{ url: "#/", alt: "Klinika Győr" }}
        heading="Kérdése van? Kezdjük egy időponttal."
        description="Hétköznap 7:00 és 19:00 között telefonon is elérhetők vagyunk."
        buttons={[{ title: "Időpontfoglalás" }, { title: PHONE_LABEL, variant: "secondary" }]}
        columnLinks={footerColumns}
        legalLinks={legalLinks}
        footerText={footerText}
      />

      <MobileActionBar
        phoneLabel="Hívás"
        phoneNumber={PHONE_NUMBER}
        bookingLabel={isQuote ? "Ajánlatkérés" : "Időpontfoglalás"}
        bookingUrl={BOOKING_URL}
      />
      <div className="h-20 lg:hidden" />
    </>
  );
};
