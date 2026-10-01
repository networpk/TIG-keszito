import { placeholders } from "@/assets/placeholders";

/*
  Oldalak közötti közös tartalom: ami minden oldalon ugyanaz. Egy helyen
  szerkesztve mindenhol frissül.

  A menü- és lábléchivatkozások `#/útvonal` alakúak, a horgonyok `#/útvonal#id`
  formában — így egy aloldalról is a megfelelő oldal megfelelő szakaszára
  visznek.

  Az elérhetőségi adatok a jelenlegi oldal nyilvános kapcsolati aloldaláról
  származnak.
*/

export const PHONE_LABEL = "+36 20 373 3343";
export const PHONE_NUMBER = "+36203733343";
export const BOOKING_URL = "#idopontfoglalas";

export const navLinks = [
  {
    title: "Szakrendelések",
    url: "#/szolgaltatasok",
    subMenuLinks: [
      { title: "Összes szakrendelés", url: "#/szolgaltatasok" },
      { title: "Nőgyógyászat és családtervezés", url: "#/szolgaltatasok#katalogus" },
      { title: "Mozgásszervek", url: "#/szolgaltatasok#katalogus" },
      { title: "Szív- és érrendszer", url: "#/szolgaltatasok#katalogus" },
      { title: "Szemészet, fül-orr-gégészet", url: "#/szolgaltatasok#katalogus" },
      { title: "Belgyógyászati szakterületek", url: "#/szolgaltatasok#katalogus" },
      { title: "Mentális egészség és gyermekellátás", url: "#/szolgaltatasok#katalogus" },
    ],
  },
  { title: "Szűrőprogramok", url: "#/szolgaltatasok#szuroprogramok" },
  { title: "Vállalatoknak", url: "#/halozat#vallalatoknak" },
  {
    title: "A klinikáról",
    url: "#/rolunk",
    subMenuLinks: [
      { title: "Rólunk", url: "#/rolunk" },
      { title: "Orvosaink", url: "#/rolunk#orvosaink" },
      { title: "Galéria", url: "#/galeria" },
      { title: "Országos hálózat", url: "#/halozat" },
      { title: "Egészségpénztárak", url: "#/egeszsegpenztarak" },
    ],
  },
  { title: "Árak", url: "#/arak" },
  { title: "Kapcsolat", url: "#/kapcsolat" },
];

export const doctorImage = {
  src: placeholders.avatar,
  alt: "Orvos portréja",
};

export const doctors = [
  {
    image: doctorImage,
    name: "Dr. Kovács Eszter",
    jobTitle: "Szülész-nőgyógyász szakorvos",
    description:
      "22 év klinikai tapasztalat, terhesgondozás és nőgyógyászati ultrahang. Szakvizsga: 2004, Semmelweis Egyetem.",
    profileUrl: "#",
  },
  {
    image: doctorImage,
    name: "Dr. Nagy Balázs",
    jobTitle: "Ortopéd-traumatológus szakorvos",
    description:
      "Sportsérülések és ízületi panaszok konzervatív kezelése. 15 éve dolgozik mozgásszervi rehabilitációval.",
    profileUrl: "#",
  },
  {
    image: doctorImage,
    name: "Dr. Tóth Márta",
    jobTitle: "Kardiológus, belgyógyász szakorvos",
    description:
      "Szív- és érrendszeri kivizsgálás, hipertónia-gondozás. Terheléses vizsgálatok és szív-ultrahang.",
    profileUrl: "#",
  },
  {
    image: doctorImage,
    name: "Dr. Szabó Péter",
    jobTitle: "Bőrgyógyász szakorvos",
    description:
      "Anyajegyszűrés dermatoszkóppal, gyulladásos bőrbetegségek kezelése. 12 év szakorvosi gyakorlat.",
    profileUrl: "#",
  },
];

export const footerColumns = [
  {
    title: "Szakrendelések",
    links: [
      { title: "Összes szakrendelés", url: "#/szolgaltatasok" },
      { title: "Nőgyógyászat", url: "#/szolgaltatasok" },
      { title: "Ortopédia", url: "#/szolgaltatasok" },
      { title: "Kardiológia", url: "#/szolgaltatasok" },
      { title: "Bőrgyógyászat", url: "#/szolgaltatasok" },
    ],
  },
  {
    title: "Diagnosztika",
    links: [
      { title: "Labor", url: "#/szolgaltatasok" },
      { title: "Ultrahang", url: "#/szolgaltatasok" },
      { title: "Röntgen", url: "#/szolgaltatasok" },
      { title: "Terheléses EKG", url: "#/vizsgalat" },
      { title: "Gyógytorna", url: "#/szolgaltatasok" },
    ],
  },
  {
    title: "Szűrőprogramok",
    links: [
      { title: "Alap szűrés", url: "#/szolgaltatasok#szuroprogramok" },
      { title: "Menedzserszűrés", url: "#/szolgaltatasok#szuroprogramok" },
      { title: "Céges szűrés", url: "#/szolgaltatasok#szuroprogramok" },
    ],
  },
  {
    title: "Vállalatoknak",
    links: [
      { title: "Üzemorvosi ellátás", url: "#/halozat#vallalatoknak" },
      { title: "Országos hálózat", url: "#/halozat" },
      { title: "Ajánlatkérés", url: "#/kapcsolat" },
    ],
  },
  {
    title: "A klinikáról",
    links: [
      { title: "Rólunk", url: "#/rolunk" },
      { title: "Orvosaink", url: "#/rolunk#orvosaink" },
      { title: "Galéria", url: "#/galeria" },
      { title: "Karrier", url: "#/rolunk" },
    ],
  },
  {
    title: "Ügyintézés",
    links: [
      { title: "Árak", url: "#/arak" },
      { title: "Egészségpénztárak", url: "#/egeszsegpenztarak" },
      { title: "Kapcsolat", url: "#/kapcsolat" },
      { title: "Időpontfoglalás", url: "#idopontfoglalas" },
    ],
  },
];

export const legalLinks = [
  { title: "Adatkezelési tájékoztató", url: "#" },
  { title: "ÁSZF", url: "#" },
  { title: "Panaszkezelés", url: "#" },
  { title: "Impresszum", url: "#" },
];

export const footerText = "© 2026 Klinika Győr. Minden jog fenntartva.";
