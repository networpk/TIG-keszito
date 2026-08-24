import { placeholders } from "@/assets/placeholders";
import {
  CalendarMonth,
  Call,
  ChevronRight,
  Description,
  Groups,
  HealthAndSafety,
  LocationOn,
  Mail,
  Payments,
  Person,
  Schedule,
  Science,
  Verified,
} from "relume-icons";

import { Navbar1 } from "@/components/sections/Navbar1";
import { Header1 } from "@/components/sections/Header1";
import { TrustBar } from "@/components/sections/TrustBar";
import { Layout620 } from "@/components/sections/Layout620";
import { Layout505 } from "@/components/sections/Layout505";
import { Layout234 } from "@/components/sections/Layout234";
import { Timeline5 } from "@/components/sections/Timeline5";
import { Team3 } from "@/components/sections/Team3";
import { Testimonial49 } from "@/components/sections/Testimonial49";
import { Pricing40 } from "@/components/sections/Pricing40";
import { Pricing4 } from "@/components/sections/Pricing4";
import { Logo5 } from "@/components/sections/Logo5";
import { Cta1 } from "@/components/sections/Cta1";
import { Contact14 } from "@/components/sections/Contact14";
import { Faq3 } from "@/components/sections/Faq3";
import { Blog40, blogPostButton } from "@/components/sections/Blog40";
import { Cta25 } from "@/components/sections/Cta25";
import { Footer14 } from "@/components/sections/Footer14";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import {
  BOOKING_URL,
  PHONE_LABEL,
  PHONE_NUMBER,
  doctors,
  footerColumns,
  footerText,
  legalLinks,
  navLinks,
} from "@/content/site";

/*
  Főoldal — a struktúraterv 18 szakasza, sorrendben.

  A szövegek helykitöltők: a terv szándéka szerint a szakaszok sorrendje és
  szerepe a döntés, a végleges üzenetek a következő fázisban készülnek. Ami
  viszont már itt is szándékos: minden szakasz végén van egy cselekvési
  lehetőség, és a három vásárlói út (magánszemély / szűrés / vállalat) végig
  külön nyelvet és külön CTA-t kap.
*/

const iconClass = "size-12 text-scheme-text";

export const Home = () => {
  return (
    <>
      {/* 1. Header / sticky navigáció */}
      <Navbar1
        logo={{ url: "#/", src: "", alt: "Klinika Győr" }}
        navLinks={navLinks}
        phone={{ label: PHONE_LABEL, number: PHONE_NUMBER }}
        buttons={[{ title: "Időpontfoglalás", size: "sm" }]}
      />

      {/* 2. Hero */}
      <div id="idopontfoglalas">
        <Header1
          heading="Szakorvosi vizsgálat Győrben, jellemzően egy héten belül"
          description="Több mint 40 szakrendelés egy helyen, saját diagnosztikával. Ön választja ki az orvost és az időpontot — a leletet a vizsgálat után online is eléri."
          buttons={[
            { title: "Időpontfoglalás" },
            { title: `Hívjon: ${PHONE_LABEL}`, variant: "secondary" },
          ]}
          secondaryLink={{
            label: "Cégeknek: üzemorvosi ellátás és menedzserszűrés →",
            url: "#vallalatoknak",
          }}
          image={{
            src: placeholders.portrait,
            alt: "A klinika rendelője",
          }}
        />
      </div>

      {/* 3. Bizalomsáv */}
      <TrustBar
        stats={[
          { value: "18 éve", label: "működünk Győrben" },
          { value: "40+", label: "szakrendelés egy helyen" },
          { value: "60 000+", label: "vizsgálat évente" },
          { value: "4,8/5", label: "páciensértékelés" },
        ]}
        logosHeading="Elfogadott egészségpénztárak, biztosítók és minősítéseink"
        logos={[
          { src: placeholders.logo, alt: "Partner logó 1" },
          { src: placeholders.logo, alt: "Partner logó 2" },
          { src: placeholders.logo, alt: "Partner logó 3" },
          { src: placeholders.logo, alt: "Partner logó 4" },
          { src: placeholders.logo, alt: "Partner logó 5" },
        ]}
      />

      {/* 4. Célközönség-elágazás */}
      <Layout620
        tagline="Miben segíthetünk?"
        heading="Válassza ki, mivel érkezett"
        description="Három tipikus út, három különböző következő lépéssel. Így nem kell végigolvasnia azt, ami nem Önre vonatkozik."
        listItems={[
          {
            icon: <Person className={iconClass} />,
            heading: "Konkrét panaszom van",
            description:
              "Tudja, milyen szakorvost keres. Válasszon szakrendelést, nézze meg a szabad időpontokat, és foglaljon néhány kattintással.",
            buttons: [
              {
                title: "Szakrendelés választása",
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
              "Nincs panasza, de szeretné tudni, hol tart. Nézze meg a szűrőcsomagokat: mit tartalmaznak, kinek ajánlottak és mennyibe kerülnek.",
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
              "Üzemorvosi ellátás, céges szűrés vagy menedzserszűrés. Kérjen ajánlatot a létszám és az igények alapján — két munkanapon belül válaszolunk.",
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

      {/* 5. Szakrendelések / szolgáltatások áttekintés */}
      <div id="szakrendelesek">
        <Layout505
          tagline="Szakrendelések"
          heading="Több mint 40 szakrendelés, kategóriákba rendezve"
          description="Nem kell végiggörgetnie az egész listát: válasszon területet, vagy keressen rá a panaszra, illetve a szakrendelés nevére."
          searchPlaceholder="Keresés a szakrendelések között"
          defaultTabValue="nogyogyaszat"
          tabs={[
            {
              value: "nogyogyaszat",
              trigger: "Nőgyógyászat és családtervezés",
              content: {
                heading: "Nőgyógyászat és családtervezés",
                description:
                  "Rutinvizsgálattól a terhesgondozásig, saját ultrahang- és laborháttérrel.",
                specialities: [
                  { title: "Nőgyógyászat", url: "#" },
                  { title: "Terhesgondozás", url: "#" },
                  { title: "Meddőségi tanácsadás", url: "#" },
                  { title: "Emlődiagnosztika", url: "#" },
                  { title: "Nőgyógyászati ultrahang", url: "#" },
                  { title: "Menopauza-tanácsadás", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
            {
              value: "mozgasszervek",
              trigger: "Mozgásszervek",
              content: {
                heading: "Mozgásszervi ellátás",
                description:
                  "Diagnosztika, konzervatív kezelés és rehabilitáció ugyanazon a helyszínen.",
                specialities: [
                  { title: "Ortopédia", url: "#" },
                  { title: "Traumatológia", url: "#" },
                  { title: "Reumatológia", url: "#" },
                  { title: "Gyógytorna", url: "#" },
                  { title: "Sportorvoslás", url: "#" },
                  { title: "Kézsebészet", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
            {
              value: "sziv-er",
              trigger: "Szív- és érrendszer",
              content: {
                heading: "Szív- és érrendszeri vizsgálatok",
                description: "Kivizsgálás egy látogatás alatt, a legtöbb lelettel aznap.",
                specialities: [
                  { title: "Kardiológia", url: "#" },
                  { title: "Érsebészet", url: "#" },
                  { title: "Terheléses EKG", url: "#" },
                  { title: "Holter-vizsgálat", url: "#" },
                  { title: "Szív-ultrahang", url: "#" },
                  { title: "Hipertónia-gondozás", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
            {
              value: "erzekszervek",
              trigger: "Szemészet, fül-orr-gégészet",
              content: {
                heading: "Érzékszervi szakrendelések",
                description: "Felnőtt- és gyermekellátás, korszerű vizsgálóeszközökkel.",
                specialities: [
                  { title: "Szemészet", url: "#" },
                  { title: "Gyermekszemészet", url: "#" },
                  { title: "Fül-orr-gégészet", url: "#" },
                  { title: "Audiológia (hallásvizsgálat)", url: "#" },
                  { title: "Allergiavizsgálat (FOG)", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
            {
              value: "belgyogyaszat",
              trigger: "Belgyógyászati szakterületek",
              content: {
                heading: "Belgyógyászat és társszakmák",
                description: "Panasz kivizsgálása, gondozás és kontroll ugyanannál az orvosnál.",
                specialities: [
                  { title: "Belgyógyászat", url: "#" },
                  { title: "Endokrinológia", url: "#" },
                  { title: "Diabetológia", url: "#" },
                  { title: "Gasztroenterológia", url: "#" },
                  { title: "Urológia", url: "#" },
                  { title: "Nefrológia", url: "#" },
                  { title: "Bőrgyógyászat", url: "#" },
                  { title: "Allergológia", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
            {
              value: "mentalis",
              trigger: "Mentális egészség és gyermekellátás",
              content: {
                heading: "Mentális egészség és gyermekellátás",
                description: "Diszkrét, hosszabb konzultációs idővel tervezett rendelések.",
                specialities: [
                  { title: "Pszichiátria", url: "#" },
                  { title: "Pszichológia", url: "#" },
                  { title: "Gyermekgyógyászat", url: "#" },
                  { title: "Gyermekneurológia", url: "#" },
                  { title: "Logopédia", url: "#" },
                  { title: "Táplálkozási tanácsadás", url: "#" },
                ],
                buttons: [{ title: "Időpontfoglalás", variant: "secondary" }],
              },
            },
          ]}
        />
      </div>

      {/* 6. Miért minket válasszon */}
      <Layout234
        tagline="Miért minket"
        heading="Amit egy magánklinikától jogos elvárni"
        description="Konkrét, számonkérhető ígéretek — nem általánosságok."
        sections={[
          {
            icon: <CalendarMonth className={iconClass} />,
            heading: "Időpont jellemzően egy héten belül",
            description:
              "A legtöbb szakrendelésre 7 napon belül tudunk időpontot adni, sürgős esetben ennél hamarabb.",
          },
          {
            icon: <Science className={iconClass} />,
            heading: "Saját diagnosztika a helyszínen",
            description:
              "Labor, ultrahang és röntgen egy épületben: a legtöbb kivizsgálás egyetlen látogatás alatt lezárul.",
          },
          {
            icon: <Verified className={iconClass} />,
            heading: "Nevesített szakorvosok",
            description:
              "Minden orvosunk bemutatkozik: végzettség, tapasztalat, szakterület. Ön választja ki, kihez megy.",
          },
          {
            icon: <Schedule className={iconClass} />,
            heading: "Várakozás nélküli rendszer",
            description:
              "Foglalt időpontra érkezik, nem sorszámra. A rendelések hosszabb konzultációs idővel vannak tervezve.",
          },
          {
            icon: <Description className={iconClass} />,
            heading: "Lelet online, érthetően",
            description:
              "A leleteket a saját felületén éri el, és az orvos elmagyarázza, mit jelentenek a számok.",
          },
          {
            icon: <Payments className={iconClass} />,
            heading: "Előre látható ár",
            description:
              "Az árlista nyilvános, egészségpénztári kártyát és biztosítói finanszírozást is elfogadunk.",
          },
        ]}
      />

      {/* 7. Hogyan zajlik nálunk */}
      <Timeline5
        tagline="A folyamat"
        heading="Így zajlik egy vizsgálat nálunk"
        description="Ha még nem járt magánklinikán, itt végigolvashatja, mi történik a foglalástól a kontrollig."
        buttons={[{ title: "Időpontfoglalás" }]}
        timelineItems={[
          {
            heading: "1. lépés",
            title: "Időpontfoglalás",
            description:
              "Online vagy telefonon. Kiválasztja a szakrendelést és az orvost, és e-mailben visszaigazolást kap. Beutaló nem szükséges.",
          },
          {
            heading: "2. lépés",
            title: "Vizsgálat és konzultáció",
            description:
              "A foglalt időpontban érkezik. Az orvos meghallgatja a panaszt, elvégzi a vizsgálatot, és ha szükséges, a diagnosztika helyben megtörténik.",
          },
          {
            heading: "3. lépés",
            title: "Lelet és javaslat",
            description:
              "A leleteket online is eléri. Az orvos leírja a javasolt kezelést, és megbeszéli Önnel, mi a következő lépés.",
          },
          {
            heading: "4. lépés",
            title: "Kontroll, ha szükséges",
            description:
              "Kontrollvizsgálatnál ugyanahhoz az orvoshoz jön vissza, aki már ismeri a kórtörténetét.",
          },
        ]}
      />

      {/* 8. Orvosaink */}
      <div id="orvosaink">
        <Team3
          tagline="Orvosaink"
          heading="Kire bízza magát"
          description="Minden szakorvosunknál látja a végzettséget, a szakterületet és a tapasztalatot — mielőtt időpontot foglal."
          teamMembers={doctors}
          footer={{
            heading: "Nem találja a keresett szakterületet?",
            description:
              "Hívjon minket, és megmondjuk, melyik orvosunkhoz érdemes fordulnia a panaszával.",
            button: { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" },
          }}
        />
      </div>

      {/* 9. Páciensvélemények */}
      <Testimonial49
        heading="Mit mondanak a pácienseink"
        description="Valós, ellenőrizhető visszajelzések — a kezelés megnevezésével együtt."
        ratingSummary="4,8 / 5 · 1 240 Google-értékelés alapján"
        testimonials={[
          {
            description:
              "Két nap alatt kaptam ortopédiai időpontot, a röntgen helyben megvolt, és a leletet még aznap megkaptam.",
            treatment: "Ortopédia",
            author: { name: "K. Anna", source: "Google-értékelés" },
          },
          {
            description:
              "A menedzserszűrésen minden vizsgálat egy délelőtt lement, és az eredményeket egy összefoglaló konzultáción beszéltük át.",
            treatment: "Menedzserszűrés",
            author: { name: "T. Gábor", source: "Google-értékelés" },
          },
          {
            description:
              "A terhesgondozás alatt végig ugyanaz az orvos kísért, így nem kellett minden alkalommal elölről kezdeni a történetet.",
            treatment: "Terhesgondozás",
            author: { name: "Sz. Réka", source: "Google-értékelés" },
          },
          {
            description:
              "Az árat előre megmondták, és pontosan annyi lett. Nem volt utólagos tétel a számlán.",
            treatment: "Bőrgyógyászat",
            author: { name: "M. Péter", source: "Google-értékelés" },
          },
          {
            description:
              "Az egészségpénztári kártyámat gond nélkül elfogadták, a papírmunkát ők intézték.",
            treatment: "Kardiológia",
            author: { name: "H. Judit", source: "Google-értékelés" },
          },
        ]}
      />

      {/* 10. Szűrőprogramok / csomagok */}
      <div id="szuroprogramok">
        <Pricing40
          tagline="Szűrőprogramok"
          heading="Szűrőcsomagok, összehasonlítható tartalommal"
          description="Minden csomagnál látja, mit tartalmaz, kinek ajánljuk és mennyi időt vesz igénybe."
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
                "Testösszetétel-mérés",
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
                "Nemre szabott onkológiai szűrés",
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
                "Számlázás egy tételben",
              ],
              button: { title: "Ajánlatot kérek", variant: "secondary" },
            },
          ]}
        />
      </div>

      {/* 11. Árak átláthatósága */}
      <div id="arak">
        <Pricing4
          tagline="Árak"
          heading="Mennyibe kerül? Előre megmondjuk"
          description="A leggyakoribb vizsgálataink irányára. A teljes, tételes árlista egy kattintásra elérhető."
          rows={[
            { name: "Szakorvosi konzultáció", price: "22 000 Ft-tól" },
            { name: "Kontrollvizsgálat", price: "16 000 Ft-tól" },
            { name: "Ultrahangvizsgálat", price: "24 000 Ft-tól" },
            { name: "Laborcsomag (alap)", price: "18 000 Ft-tól" },
            { name: "Gyógytorna (egyéni)", price: "14 000 Ft-tól" },
          ]}
          note="Az árak tájékoztató jellegűek, a vizsgálat előtt minden esetben pontos árat mondunk. Egészségpénztári kártyát és biztosítói finanszírozást elfogadunk."
          button={{ title: "Teljes árlista megtekintése", variant: "secondary" }}
        />
      </div>

      {/* 12. Egészségpénztárak és biztosítók */}
      <Logo5
        heading="Egészségpénztárral és biztosítóval is fizethet"
        description="Az alábbi pénztárak és biztosítók kártyáját fogadjuk el. A pénztári egyenleg a helyszínen, a kártya leolvasásával használható fel — az elszámolást mi intézzük."
        logos={[
          { src: placeholders.logo, alt: "Pénztár logó 1" },
          { src: placeholders.logo, alt: "Pénztár logó 2" },
          { src: placeholders.logo, alt: "Pénztár logó 3" },
          { src: placeholders.logo, alt: "Pénztár logó 4" },
          { src: placeholders.logo, alt: "Pénztár logó 5" },
          { src: placeholders.logo, alt: "Pénztár logó 6" },
        ]}
        button={{
          title: "Hogyan használható fel a pénztári egyenleg?",
          variant: "link",
          size: "link",
          iconRight: <ChevronRight className="text-scheme-text" />,
        }}
      />

      {/* 13. Vállalati / üzemorvosi sáv */}
      <div id="vallalatoknak">
        <Cta1
          tagline="Vállalatoknak"
          heading="Üzemorvosi ellátás és céges szűrés Győrben"
          description="A munkavállalói egészségügy nem foglalási, hanem szerződéses döntés. Küldje el a létszámot és az igényeket, és két munkanapon belül árazott javaslatot adunk."
          bullets={[
            "Üzemorvosi alkalmassági vizsgálatok, telephelyen vagy a klinikán",
            "Menedzserszűrés vezetőknek, egy nap alatt",
            "Csoportos időpontszervezés, egy tételben számlázva",
            "Anonimizált, összesített egészségriport a HR-nek",
          ]}
          buttons={[
            { title: "Ajánlatot kérek", variant: "alternate" },
            { title: "Céges szolgáltatásaink", variant: "secondary-alt" },
          ]}
          image={{
            src: placeholders.landscape,
            alt: "Céges egészségügyi ellátás",
          }}
        />
      </div>

      {/* 14. Elérhetőség és lokáció */}
      <div id="kapcsolat">
        <Contact14
          tagline="Kapcsolat"
          heading="Hol talál minket"
          description="A klinika Győr belvárosában, saját parkolóval működik. Ha bármi kérdése van érkezés előtt, hívjon minket."
          contacts={[
            {
              icon: <LocationOn className="size-8 text-scheme-text" />,
              title: "Cím és megközelítés",
              description:
                "9021 Győr, Bajcsy-Zsilinszky utca 30–32.\nSaját parkoló a hátsó bejáratnál, buszmegálló 200 méterre.",
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
              link: { label: PHONE_LABEL, url: `tel:${PHONE_NUMBER}` },
            },
            {
              icon: <Schedule className="size-8 text-scheme-text" />,
              title: "Nyitvatartás",
              description: "Hétfő–csütörtök: 7:00–19:00\nPéntek: 7:00–16:00\nHétvégén zárva",
            },
            {
              icon: <Mail className="size-8 text-scheme-text" />,
              title: "E-mail",
              description: "Írásos megkeresésekre egy munkanapon belül válaszolunk.",
              link: { label: "gyor@hungariamed.hu", url: "mailto:gyor@hungariamed.hu" },
            },
          ]}
          map={{
            url: "#",
            image: {
              src: placeholders.map,
              alt: "A klinika a térképen",
            },
          }}
        />
      </div>

      {/* 15. Gyakori kérdések */}
      <Faq3
        heading="Gyakori kérdések"
        description="A leggyakoribb ellenvetések és bizonytalanságok — közvetlenül a foglalás előtt."
        button={{ title: `Hívás: ${PHONE_LABEL}`, variant: "secondary" }}
        questions={[
          {
            title: "Kell beutaló a vizsgálathoz?",
            answer:
              "Nem. Magánrendelésre beutaló nélkül is jöhet, bármelyik szakrendelésünkre. Ha van korábbi lelete, hozza magával — segít az orvosnak.",
          },
          {
            title: "Mennyi idő alatt kapok időpontot?",
            answer:
              "A legtöbb szakrendelésre egy héten belül. Néhány szűk kapacitású szakterületen ennél hosszabb lehet a várakozás — a foglalási felületen mindig a valós szabad időpontok látszanak.",
          },
          {
            title: "Hogyan és mikor kapom meg a leletet?",
            answer:
              "A laboreredmények jellemzően 24 órán belül, a képalkotó leletek a vizsgálat napján elkészülnek. Minden leletet elér az online felületén, és letöltheti PDF-ben.",
          },
          {
            title: "Elfogadják az egészségpénztári kártyámat?",
            answer:
              "Igen, a felsorolt pénztárak kártyáit a helyszínen elfogadjuk, az elszámolást mi intézzük. Ha az Ön pénztára nem szerepel a listán, hívjon minket — a legtöbb esetben van megoldás.",
          },
          {
            title: "Mennyibe kerül, és mikor kell fizetni?",
            answer:
              "Az irányárak nyilvánosak, a pontos összeget a vizsgálat előtt megmondjuk. Fizetni a vizsgálat után lehet kártyával, készpénzzel vagy pénztári kártyával.",
          },
          {
            title: "Mi történik, ha nem tudok elmenni a foglalt időpontra?",
            answer:
              "A visszaigazoló e-mailből egy kattintással lemondhatja vagy módosíthatja az időpontot. Kérjük, ezt legalább 24 órával előtte tegye meg, hogy más páciens megkaphassa a helyet.",
          },
          {
            title: "Gyermeket is fogadnak?",
            answer:
              "Igen, gyermekgyógyászati, gyermekszemészeti és gyermekneurológiai rendelésünk is van. A korhatárt az adott szakrendelés oldalán jelezzük.",
          },
        ]}
      />

      {/* 16. Blog / edukációs tartalom */}
      <Blog40
        tagline="Egészségmagazin"
        heading="Amit érdemes tudni, mielőtt orvoshoz megy"
        description="Szakorvosaink írásai a leggyakoribb kérdésekről és panaszokról."
        button={{ title: "Összes cikk", variant: "secondary" }}
        blogPosts={[
          {
            url: "#",
            image: {
              src: placeholders.landscape,
              alt: "Cikk borítóképe",
            },
            category: "Megelőzés",
            readTime: "6 perc olvasás",
            title: "Milyen szűrésekre van szüksége 40 felett?",
            description:
              "Életkor és nem szerint: mit érdemes évente, és mit elég ritkábban elvégeztetni.",
            button: blogPostButton,
          },
          {
            url: "#",
            image: {
              src: placeholders.landscape,
              alt: "Cikk borítóképe",
            },
            category: "Mozgásszervek",
            readTime: "4 perc olvasás",
            title: "Derékfájás: mikor elég a gyógytorna, és mikor kell képalkotó?",
            description:
              "Ortopédus szakorvosunk összefoglalja, milyen jelek esetén ne várjon a vizsgálattal.",
            button: blogPostButton,
          },
          {
            url: "#",
            image: {
              src: placeholders.landscape,
              alt: "Cikk borítóképe",
            },
            category: "Labor",
            readTime: "5 perc olvasás",
            title: "Hogyan olvassa a laboreredményét?",
            description:
              "A leggyakoribb értékek jelentése, és hogy mikor jelent tényleg problémát az eltérés.",
            button: blogPostButton,
          },
        ]}
      />

      {/* 17. Záró CTA sáv */}
      <Cta25
        heading="Foglaljon időpontot még ma"
        description="A legtöbb szakrendelésünkre egy héten belül van szabad időpont. A foglalás két percet vesz igénybe, beutaló nem kell hozzá."
        buttons={[
          { title: "Időpontfoglalás", variant: "alternate" },
          { title: `Hívás: ${PHONE_LABEL}`, variant: "secondary-alt" },
        ]}
        note="Hétköznap 7:00–19:00 között telefonon is foglalhat."
      />

      {/* 18. Footer */}
      <Footer14
        logo={{ url: "#/", alt: "Klinika Győr" }}
        heading="Kérdése van? Kezdjük egy időponttal."
        description="Hétköznap 7:00 és 19:00 között telefonon is elérhetők vagyunk."
        buttons={[{ title: "Időpontfoglalás" }, { title: PHONE_LABEL, variant: "secondary" }]}
        columnLinks={footerColumns}
        legalLinks={legalLinks}
        footerText={footerText}
      />

      {/* Szakaszokon átívelő: mobil cselekvési sáv */}
      <MobileActionBar
        phoneLabel="Hívás"
        phoneNumber={PHONE_NUMBER}
        bookingLabel="Időpontfoglalás"
        bookingUrl={BOOKING_URL}
      />
      {/* A lebegő sáv ne takarja el a lábléc utolsó sorát mobilon. */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

