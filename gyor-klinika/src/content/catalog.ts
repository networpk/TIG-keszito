import type { DirectoryCategory } from "@/components/sections/ServiceDirectory";
import type { PriceGroup } from "@/components/sections/PriceTable";

/*
  A szolgáltatás-katalógus és az árlista közös forrása.

  Az árak a jelenlegi oldal nyilvános árlistájából származnak ott, ahol volt
  közölt érték (ABI, anyajegy, belgyógyászat, bőrgyógyászat, kardiológia,
  röntgen, ultrahang, esztétika); a többi tétel ára helykitöltő, és a végleges
  árlistából kell frissíteni.

  A katalógus kártyáin szándékosan „-tól" ár szerepel: a pontos összeg
  vizsgálatfüggő, és a vizsgálat előtt mindig elhangzik.
*/

export const serviceCategories: DirectoryCategory[] = [
  {
    id: "nogyogyaszat",
    title: "Nőgyógyászat és családtervezés",
    items: [
      {
        title: "Nőgyógyászati vizsgálat",
        description: "Rutinvizsgálat citológiával, kolposzkópiával, szükség esetén ultrahanggal.",
        price: "28 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Terhesgondozás",
        description: "Komplett gondozás a kismamának, ugyanazzal az orvossal végig.",
        price: "32 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Nőgyógyászati ultrahang",
        description: "Hüvelyi vagy hasi ultrahang, aznapi lelettel.",
        price: "24 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Emlődiagnosztika",
        description: "Emlő-ultrahang és tapintásos vizsgálat, szűrési céllal is.",
        price: "26 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Meddőségi tanácsadás",
        description: "Kivizsgálási terv és hormonstátusz felmérése.",
        price: "34 000 Ft-tól",
        url: "#/vizsgalat",
      },
    ],
  },
  {
    id: "mozgasszervek",
    title: "Mozgásszervek",
    items: [
      {
        title: "Ortopédiai vizsgálat",
        description: "Ízületi fájdalom, kopás, sérülés kivizsgálása, helyben röntgennel.",
        price: "27 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Traumatológia",
        description: "Friss sérülések ellátása, sínezés, kontroll.",
        price: "27 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Reumatológia",
        description: "Gyulladásos ízületi panaszok gondozása, laborháttérrel.",
        price: "27 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Gyógytorna",
        description: "Egyéni kezelés, derék-, nyak- és térdpanaszokra.",
        price: "14 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Sportorvosi alkalmassági",
        description: "Versenyengedélyhez és amatőr sporthoz, terheléses vizsgálattal.",
        price: "38 000 Ft-tól",
        url: "#/vizsgalat",
      },
    ],
  },
  {
    id: "sziv-er",
    title: "Szív- és érrendszer",
    items: [
      {
        title: "Kardiológiai vizsgálat",
        description: "Komplex szívvizsgálat EKG-val, konzultációval, terhelés esetén kiegészítve.",
        price: "42 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "Terheléses EKG",
        description:
          "Futópadon végzett terhelés — mellkasi panasz, szűrés és sportalkalmassági esetén.",
        price: "34 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "Szív-ultrahang",
        description: "A szívizom és a billentyűk működésének képalkotó vizsgálata.",
        price: "28 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "Holter-vizsgálat",
        description: "24 órás EKG-monitorozás alkalomszerű panaszok esetén.",
        price: "24 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "ABI boka-kar index",
        description: "Alsó végtagi érszűkület gyors, fájdalommentes szűrése.",
        price: "10 000 Ft",
        url: "#/vizsgalat",
      },
    ],
  },
  {
    id: "erzekszervek",
    title: "Szemészet, fül-orr-gégészet",
    items: [
      {
        title: "Szemészeti vizsgálat",
        description: "Látásélesség, szemnyomás, szemfenék — jogosítványhoz is.",
        price: "25 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Gyermekszemészet",
        description: "Kancsalság és fénytörési hiba szűrése iskolakezdés előtt.",
        price: "25 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Fül-orr-gégészeti vizsgálat",
        description: "Krónikus orrdugulás, fülfájás, hangképzési panaszok.",
        price: "25 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Hallásvizsgálat (audiometria)",
        description: "Hallásküszöb mérése, munkaköri alkalmassághoz is.",
        price: "16 000 Ft-tól",
        url: "#/vizsgalat",
      },
    ],
  },
  {
    id: "belgyogyaszat",
    title: "Belgyógyászati szakterületek",
    items: [
      {
        title: "Belgyógyászati vizsgálat",
        description: "Általános kivizsgálás, laboreredmények értékelésével.",
        price: "25 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "Bőrgyógyászati vizsgálat",
        description: "Kiütés, ekcéma, gyulladásos bőrbetegségek kezelése.",
        price: "25 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Anyajegyszűrés dermatoszkóppal",
        description: "Teljes testfelület átvizsgálása, fotódokumentációval.",
        price: "43 000 Ft",
        url: "#/vizsgalat",
      },
      {
        title: "Endokrinológia",
        description: "Pajzsmirigy- és hormonpanaszok gondozása.",
        price: "28 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Diabetológia",
        description: "Cukorbetegség gondozása, étrendi tanácsadással.",
        price: "28 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Gasztroenterológia",
        description: "Emésztési panaszok kivizsgálása, hasi ultrahanggal.",
        price: "28 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Urológia",
        description: "Vizelési panaszok, prosztataszűrés, here-ultrahang.",
        price: "27 000 Ft-tól",
        url: "#/vizsgalat",
      },
    ],
  },
  {
    id: "mentalis",
    title: "Mentális egészség és gyermekellátás",
    items: [
      {
        title: "Pszichiátriai konzultáció",
        description: "Szorongás, alvászavar, hangulatzavar — gyógyszeres kezeléssel is.",
        price: "32 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Pszichológiai tanácsadás",
        description: "50 perces ülések, egyéni vagy páros formában.",
        price: "22 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Gyermekgyógyászat",
        description: "Akut panaszok és státuszvizsgálat, 0–18 éves korig.",
        price: "25 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Logopédia",
        description: "Beszédfejlődési elmaradás felmérése és terápiája.",
        price: "16 000 Ft-tól",
        url: "#/vizsgalat",
      },
      {
        title: "Táplálkozási tanácsadás",
        description: "Egyéni étrend testösszetétel-mérés alapján.",
        price: "18 000 Ft-tól",
        url: "#/vizsgalat",
      },
    ],
  },
];

export const priceGroups: PriceGroup[] = [
  {
    id: "konzultacio",
    title: "Szakorvosi konzultációk",
    rows: [
      { name: "Belgyógyászati vizsgálat", price: "25 000 Ft" },
      { name: "Kardiológiai vizsgálat", price: "42 000 Ft", note: "komplex, EKG-val" },
      { name: "Kardiológiai kontrollvizsgálat", price: "27 000 Ft" },
      { name: "Ortopédiai vizsgálat", price: "27 000 Ft" },
      { name: "Nőgyógyászati vizsgálat", price: "28 000 Ft" },
      { name: "Szemészeti vizsgálat", price: "25 000 Ft" },
      { name: "Fül-orr-gégészeti vizsgálat", price: "25 000 Ft" },
      { name: "Urológiai vizsgálat", price: "27 000 Ft" },
    ],
  },
  {
    id: "borgyogyaszat",
    title: "Bőrgyógyászat",
    rows: [
      { name: "Bőrgyógyászati vizsgálat", price: "25 000 Ft" },
      { name: "Anyajegyszűrés dermatoszkóppal", price: "43 000 Ft", note: "teljes testfelület" },
      { name: "Anyajegy eltávolítása – 1 db", price: "53 000 Ft", note: "szövettannal" },
      { name: "Anyajegy eltávolítása – 2 db", price: "73 000 Ft", note: "szövettannal" },
      { name: "Anyajegy eltávolítása – 3 db", price: "93 000 Ft", note: "szövettannal" },
    ],
  },
  {
    id: "diagnosztika",
    title: "Képalkotó diagnosztika",
    rows: [
      { name: "Ultrahangvizsgálat", price: "24 000 – 28 000 Ft", note: "testtájtól függően" },
      { name: "Szív-ultrahang", price: "28 000 Ft" },
      { name: "Röntgenvizsgálat", price: "12 000 – 21 000 Ft", note: "testtájtól függően" },
      { name: "Terheléses EKG", price: "34 000 Ft" },
      { name: "Holter-vizsgálat (24 órás EKG)", price: "24 000 Ft" },
      { name: "ABI boka-kar-index mérés", price: "10 000 Ft" },
    ],
  },
  {
    id: "labor",
    title: "Laborvizsgálatok",
    rows: [
      { name: "Alap laborcsomag", price: "18 000 Ft", note: "vérkép, vese, máj, ion" },
      { name: "Bővített laborcsomag", price: "32 000 Ft" },
      { name: "Pajzsmirigy-panel", price: "16 000 Ft" },
      { name: "Hormonvizsgálat", price: "12 000 Ft-tól", note: "paraméterenként" },
      { name: "PSA (prosztata-szűrés)", price: "9 000 Ft" },
    ],
  },
  {
    id: "szurocsomagok",
    title: "Szűrőcsomagok",
    rows: [
      { name: "Alap szűrés", price: "59 000 Ft-tól", note: "kb. 2 óra, egy látogatás" },
      { name: "Menedzserszűrés", price: "179 000 Ft-tól", note: "kb. 4–5 óra, egy látogatás" },
      { name: "Céges szűrés", price: "Egyedi ajánlat", note: "10 fő felett" },
    ],
  },
  {
    id: "terapia",
    title: "Terápia és rehabilitáció",
    rows: [
      { name: "Gyógytorna – egyéni", price: "14 000 Ft" },
      { name: "Gyógytorna – bérlet (10 alkalom)", price: "126 000 Ft" },
      { name: "Pszichológiai tanácsadás (50 perc)", price: "22 000 Ft" },
      { name: "Logopédia (45 perc)", price: "16 000 Ft" },
      { name: "Táplálkozási tanácsadás", price: "18 000 Ft" },
    ],
  },
  {
    id: "esztetika",
    title: "Esztétikai beavatkozások",
    rows: [
      { name: "Esztétikai konzultáció", price: "25 000 Ft" },
      { name: "Esztétikai beavatkozás", price: "90 000 – 160 000 Ft", note: "beavatkozástól függően" },
    ],
  },
  {
    id: "uzemorvos",
    title: "Üzemorvosi ellátás",
    rows: [
      { name: "Munkaköri alkalmassági vizsgálat", price: "Egyedi ajánlat" },
      { name: "Céges csomag, telephelyi ellátás", price: "Egyedi ajánlat" },
    ],
  },
];
