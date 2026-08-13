# Győri magánklinika – főoldal (Relume)

A struktúraterv 18 szakasza megépítve, Relume React komponensekből, saját
styleguide-dal. React + Vite + Tailwind, a komponensek shadcn-módra a projektbe
másolva (`src/components/ui`, `src/components/sections`) — nincs
`@relume_io/relume-ui` futásidejű függőség, minden fájl szerkeszthető.

```
npm install
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/-be
```

- Főoldal: `/`
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
- **Képek.** A `public/placeholder-*.svg` fájlok helyére valódi fotók
  (klinika, orvosok), a partnerlogók helyére a tényleges pénztár- és
  biztosítói logók.
- **Adatok.** Telefonszám, cím, nyitvatartás, orvosnevek, árak, GYIK-válaszok.
  A telefonszám a `src/pages/Home.tsx` tetején egy helyen van (`PHONE_LABEL`,
  `PHONE_NUMBER`).
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

## Egyfájlos, megosztható változat

```
npm run build && node tools/build-artifact.mjs
```

A `dist/foooldal.html` egyetlen fájl: a CSS, a JS és a képek is bele vannak
ágyazva, így hálózat nélkül, dupla kattintással is megnyílik, és megosztható
oldalként publikálható. A helykitöltő képek ezért `src/assets/`-ből importálva
vannak (data URI-ként ágyazódnak be), nem a `public/` mappából hivatkozva.
