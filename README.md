# Teljesítési igazolás készítő

Betöltöd a számla PDF-jét, és megkapod a hozzá tartozó, aláírt teljesítési
igazolást — ugyanabban a kétnyelvű formában, amit eddig is használtál.

- **A teljesítés dátuma mindig a számla keltét megelőző hónap utolsó napja.**
  A számla 2026.07.01-i kelte esetén tehát 2026. 06. 30., az időszak pedig 2026.06.
- **Az aláírás rákerül a dokumentumra.** Egyszer betöltöd a képet, az app
  eltávolítja a hátterét, és onnantól minden igazolás aljára felkerül.
- Minden a böngésződben fut. Sem a számla, sem az aláírás nem megy sehova —
  nincs szerver, nincs feltöltés.

## Használat

Nyisd meg a `dist/tig-keszito.html` fájlt — egyetlen fájl, dupla kattintással
indul, internet sem kell hozzá. Mentsd le a gépedre, és onnantól bármikor kéznél van.

1. Húzd rá a számla PDF-jét.
2. Az **Aláírás** résznél töltsd be egyszer az aláírásod fényképét vagy
   szkennelt képét. Fehér vagy világos háttérrel a legjobb; a hátteret az app
   automatikusan átlátszóvá teszi.
3. Nézd át az adatokat. Az első alkalommal a megrendelő cégjegyzékszámát és
   képviselőjét kézzel kell beírnod — ezek nincsenek rajta a számlán. Az app
   megjegyzi őket, és attól kezdve magától kitölti.
4. Kattints az **Igazolás letöltése** gombra.

Az aláírás, a vállalkozó adatai és a szerződésre való hivatkozás szövege is
mentődik a böngészőben, tehát csak egyszer kell megadni őket. Másik gépen vagy
másik böngészőben egyszer újra be kell tölteni az aláírást.

### Az aláírásról

Az aláírás szándékosan nincs benne a kódban és a repóban. A böngésző tárolójába
kerül (`localStorage`), így a publikusan elérhető oldalról sem tölthető le senki
más által. Ha törölnéd, az **Eltávolítás** gomb kiveszi.

### Böngészőben, közös linken

A mappa statikus oldalként is működik, tehát feltölthető GitHub Pages-re vagy
bármilyen tárhelyre. Helyi kipróbáláshoz:

```
python3 -m http.server 8000
```

majd nyisd meg a http://localhost:8000 címet.

## Amit az app kiolvas a számlából

| Igazolás mezője | Honnan jön |
| --- | --- |
| Megrendelő neve, székhelye, adószáma | a számla „To:” blokkjából |
| Számla sorszáma | „Invoice No.” |
| Teljesítés dátuma és időszaka | a számla keltéből számolva |
| Tételek és összegeik | a tételtáblázat „Description” és „Total” oszlopa |
| Számlázott összeg | „Balance Due”, ennek hiányában „Total” |
| Pénznem | a „Balance Due (HUF)” zárójeles kódjából |

Ha a tételek összege eltér a számlázott összegtől, az app jelzi — nem javítja
csendben, mert ilyenkor általában emberi döntés kell.

Minden mező szerkeszthető a letöltés előtt, és az előnézet azonnal frissül.

## Fejlesztés

```
tools/make-assets.py   # betűtípusok újragenerálása assets/-be
tools/build.py         # egyfájlos verzió készítése dist/-be
```

Az `index.html` a fejlesztői verzió (külön CSS/JS fájlokkal), a
`dist/tig-keszito.html` pedig ugyanaz egyetlen fájlba csomagolva. Ha a forráson
módosítasz, futtasd a `tools/build.py`-t, hogy a `dist` is frissüljön.

Felépítés:

- `js/invoice-parser.js` — a számla PDF szövegének visszaépítése sorokra és
  oszlopcellákra, majd a mezők kiolvasása
- `js/certificate.js` — a kész igazolás rajzolása (tördelés, táblázat, oldaltörés)
- `js/app.js` — űrlap, előnézet, mentett adatok
- `js/signature.js` — az aláírás beolvasása, háttértisztítás, tárolás
- `assets/` — a beágyazott betűtípusok (generált fájlok)
- `tools/source/` — a generálás forrásai (betűtípusok)

## Licencek

A beépített külső komponensek: pdf.js és Tinos (Apache 2.0), IBM Plex Sans és
Mono (SIL OFL 1.1), pdf-lib és fontkit (MIT).
