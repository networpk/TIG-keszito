# Győri magánklinika – főoldal és vizsgálat-aloldal (Relume)

A főoldal-struktúraterv 18 szakasza és a vizsgálat-aloldal sablonjának 14 szakasza megépítve, Relume React komponensekből, saját
styleguide-dal. React + Vite + Tailwind, a komponensek shadcn-módra a projektbe
másolva (`src/components/ui`, `src/components/sections`) — nincs
`@relume_io/relume-ui` futásidejű függőség, minden fájl szerkeszthető.

```
npm install
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/-be
```

- Főoldal: `/`
- Vizsgálat-aloldal (sablon): `/#/vizsgalat`
- Styleguide: `/#/styleguide`

## Szakasz → Relume komponens

| # | Szakasz | Relume komponens | Megjegyzés |
|---|---------|------------------|------------|
| 1 | Header / sticky navigáció | Navbar 1 | sticky pozíció + végig látható, kattintható telefonszám |
| 2 | Hero | Header 1 | statikus kép, egy elsődleges CTA, halkabb B2B link |
| 3 | Bizalomsáv | Stats 8 + Logo 1 | egyetlen vékony sávvá összevonva (`TrustBar`) |
| 4 | Célközönség-elágazás | Layout 620 | oszloponként külön CTA (foglalás / tájékozódás / ajánlatkérés) |
| 5 | Szakrendelések | Layout 505 | a tabok a kategóriák, a tartalom linklista + kereső |
| 6 | Miért minket | Layout 234 | gombok nélkül, tudatosan |
| 7 | Hogyan zajlik nálunk | Timeline 5 | 4 lépés, görgetésre kiemelkedő idővonal |
| 8 | Orvosaink | Team 3 | közösségi ikonok helyett orvosprofil-link |
| 9 | Páciensvélemények | Testimonial 49 | kép nélkül, csillagos értékelés + kezelés megnevezése |
| 10 | Szűrőprogramok | Pricing 40 | három összehasonlítható csomag |
| 11 | Árak | Pricing 4 | tájékoztató árlistává alakítva |
| 12 | Egészségpénztárak | Logo 5 | magyarázó szöveggel és „hogyan használható” linkkel |
| 13 | Vállalati sáv | CTA 1 | sötét séma, ajánlatkérés CTA-val |
| 14 | Elérhetőség | Contact 14 | cím, telefon, nyitvatartás, e-mail + térkép |
| 15 | GYIK | FAQ 3 | 7 kérdés, a leggyakoribb ellenvetésekre |
| 16 | Blog | Blog 40 | tudatosan a konverziós szakaszok után |
| 17 | Záró CTA | CTA 25 | sötét séma, ismételt foglalás + telefon |
| 18 | Footer | Footer 14 | hatoszlopos linkrács, SEO-célra is |
| – | Mobil cselekvési sáv | egyedi | lebegő hívás/foglalás gomb, csak mobilon (`MobileActionBar`) |

## Vizsgálat-aloldal sablon

A 40+ szakrendelés aloldala ugyanaz a sablon, más tartalommal. A logika
szándékosan más, mint a főoldalé: aki ide érkezik, már tudja, mit keres, ezért
az út rövidebb — megerősítés → folyamat → bizalom → gyakorlati akadályok
elhárítása → foglalás.

A sablon a `src/pages/ServicePage.tsx`, a tartalom a `src/content/services.ts`
`Service` típusa. Új aloldalhoz csak egy új `Service` objektum kell; a
komponensekhez nem kell hozzányúlni.

| # | Szakasz | Komponens | Megjegyzés |
|---|---------|-----------|------------|
| 1 | Header + breadcrumb | Navbar 1 + `Breadcrumb` | a breadcrumb a szakterületi hierarchiát mutatja |
| 2 | Hero | Header 47 | „egy pillantásra" adatsorral (ár, időtartam, lelet) |
| 3 | Kinek ajánlott | Layout 647 | pipás lista: minden sor egy önazonosítási pont |
| 4 | A vizsgálat menete | Timeline 5 | ugyanaz a komponens, mint a főoldalon |
| 5 | Felkészülés | `Preparation` | „erre lesz szükség" / „ezt kerülje" — elhagyható szakasz |
| 6 | Szakorvosok | Team 16 | csak az adott szakterület orvosai |
| 7 | Ár, időtartam, lelet | `KeyFacts` | a bizalomépítés után, a záró CTA előtt |
| 8 | Egészségpénztár | Logo 5 | erre a konkrét szolgáltatásra vonatkoztatva |
| 9 | Kapcsolódó vizsgálatok | Layout 376 | kiemelt csomag + kapcsolódó vizsgálatok |
| 10 | Páciensvélemények | Testimonial 49 | lehetőleg szakterület-specifikus |
| 11 | GYIK | FAQ 3 | a vizsgálathoz kötött kérdések |
| 12 | Záró CTA | CTA 25 | a szolgáltatás nevével a gombon |
| 13 | Kapcsolódó blog | Blog 40 | SEO, nem elsődleges CTA |
| 14 | Footer | Footer 14 | örökölve a főoldalról |

Szolgáltatástípusonként a sablon két ponton vált hangsúlyt: a `ctaKind: "quote"`
a vállalati szolgáltatásoknál ajánlatkérésre váltja a foglalást, a `preparation`
pedig elhagyható ott, ahol nincs teendő a vizsgálat előtt.

## Design rendszer

- **Színsémák.** Minden szakasz `scheme-*` tokeneket használ, a tokenek CSS-változók
  (`src/index.css`). Egy szakasz átszínezéséhez elég ráadni a `.scheme-light` vagy
  a `.scheme-brand` osztályt — a komponenst nem kell módosítani.
- **Tipográfia.** A `text-h1`–`text-h6`, `text-large`, `text-medium` osztályokat
  a `tailwind.config.js` plugin része állítja elő, mobilon kisebb fokozattal.
  (A publikált Relume v3 preset fontSize-a nem lehet breakpointfüggő; enélkül a
  hosszú magyar szavak kilógnak a mobil képernyőről.)
- **Márkaszínek, sarokkerekítés.** `tailwind.config.js` → `theme.extend.colors`,
  `borderRadius`. A styleguide oldal mindkettőt kilistázza.

## Amit a végleges tartalomhoz cserélni kell

- **Szövegek.** A jelenlegiek helykitöltők: a szakaszok sorrendje és szerepe a
  döntés, az üzenetek a következő fázisban készülnek.
- **Képek.** A `src/assets/placeholder-*.svg` fájlok helyére valódi fotók
  (klinika, orvosok), a partnerlogók helyére a tényleges pénztár- és
  biztosítói logók.
- **Adatok.** Telefonszám, cím, nyitvatartás, orvosnevek, árak, GYIK-válaszok.
  Az oldalak közötti közös adatok (telefonszám, menü, lábléc, orvosok) a
  `src/content/site.ts`-ben vannak, a vizsgálatok tartalma a
  `src/content/services.ts`-ben.
- **Linkek.** Minden `#` horgony helyére a valós aloldalak és a foglalórendszer
  URL-je.

## Vendorolt komponenseken végzett javítások

A Relume forrásból átvett fájlokban a következő hibákat javítottam:

- **Layout 620** a defaultokat a propok után terítette szét
  (`{...props, ...Defaults}`), ezért elnyelte az átadott tartalmat.
- **FAQ 3** `lg:grid-cols-[.75fr,1fr]` vesszős arbitrary értéke Tailwind v3-ban
  nem fordul le (aláhúzásra cserélve).
- **Contact 14** a gombot a `contact.title === "Office"` sztringegyezéshez
  kötötte; most az dönt, hogy az adott blokkhoz gombot vagy linket adtunk.
- **Pricing 4** címsorba ágyazott címsort renderelt (`<h4>` a `<h1>`-en belül).
- **Accordion** primitív a `className` propot elnyelte.
- **Layout 647** `aspect-squarerounded-image` elgépelés — hiányzó szóköz két
  osztálynév között, amitől sem az arány, sem a kerekítés nem érvényesült.

## Egyfájlos, megosztható változat

```
npm run build
node tools/build-artifact.mjs --out foooldal.html --title "Klinika Győr főoldal"
node tools/build-artifact.mjs --out vizsgalat-aloldal.html --title "Terheléses EKG vizsgálat" --route "#/vizsgalat"
```

A kapott fájl egyetlen HTML: a CSS, a JS és a képek is bele vannak
ágyazva, így hálózat nélkül, dupla kattintással is megnyílik, és megosztható
oldalként publikálható. A `--route` a kezdő nézetet állítja be, mert a publikált
oldal URL-jén nincs hash. A helykitöltő képek ezért `src/assets/`-ből importálva
vannak (data URI-ként ágyazódnak be), nem a `public/` mappából hivatkozva.
