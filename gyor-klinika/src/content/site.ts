import { placeholders } from "@/assets/placeholders";

/*
  Oldalak közötti közös tartalom: ami a főoldalon és minden vizsgálat-aloldalon
  ugyanaz. Egy helyen szerkesztve mindenhol frissül.
*/

export const PHONE_LABEL = "+36 96 000 000";
export const PHONE_NUMBER = "+3696000000";
export const BOOKING_URL = "#idopontfoglalas";

export const navLinks = [
  {
    title: "Szakrendelések",
    url: "#/#szakrendelesek",
    subMenuLinks: [
      { title: "Nőgyógyászat és családtervezés", url: "#/#szakrendelesek" },
      { title: "Mozgásszervek", url: "#/#szakrendelesek" },
      { title: "Szív- és érrendszer", url: "#/#szakrendelesek" },
      { title: "Szemészet, fül-orr-gégészet", url: "#/#szakrendelesek" },
      { title: "Belgyógyászati szakterületek", url: "#/#szakrendelesek" },
      { title: "Mentális egészség és gyermekellátás", url: "#/#szakrendelesek" },
    ],
  },
  { title: "Szűrőprogramok", url: "#/#szuroprogramok" },
  { title: "Vállalatoknak", url: "#/#vallalatoknak" },
  { title: "Orvosaink", url: "#/#orvosaink" },
  { title: "Árak", url: "#/#arak" },
  { title: "Kapcsolat", url: "#/#kapcsolat" },
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
      { title: "Nőgyógyászat", url: "#" },
      { title: "Ortopédia", url: "#" },
      { title: "Kardiológia", url: "#" },
      { title: "Belgyógyászat", url: "#" },
      { title: "Bőrgyógyászat", url: "#" },
    ],
  },
  {
    title: "További szakterületek",
    links: [
      { title: "Szemészet", url: "#" },
      { title: "Fül-orr-gégészet", url: "#" },
      { title: "Urológia", url: "#" },
      { title: "Endokrinológia", url: "#" },
      { title: "Gyermekgyógyászat", url: "#" },
    ],
  },
  {
    title: "Diagnosztika",
    links: [
      { title: "Labor", url: "#" },
      { title: "Ultrahang", url: "#" },
      { title: "Röntgen", url: "#" },
      { title: "Terheléses EKG", url: "#/vizsgalat" },
      { title: "Gyógytorna", url: "#" },
    ],
  },
  {
    title: "Szűrőprogramok",
    links: [
      { title: "Alap szűrés", url: "#" },
      { title: "Menedzserszűrés", url: "#" },
      { title: "Céges szűrés", url: "#" },
      { title: "Onkológiai szűrés", url: "#" },
    ],
  },
  {
    title: "Vállalatoknak",
    links: [
      { title: "Üzemorvosi ellátás", url: "#" },
      { title: "Céges csomagok", url: "#" },
      { title: "Ajánlatkérés", url: "#" },
    ],
  },
  {
    title: "A klinikáról",
    links: [
      { title: "Orvosaink", url: "#/#orvosaink" },
      { title: "Árak", url: "#/#arak" },
      { title: "Egészségpénztárak", url: "#" },
      { title: "Egészségmagazin", url: "#" },
      { title: "Kapcsolat", url: "#/#kapcsolat" },
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
