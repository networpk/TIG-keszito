import type { Location } from "@/components/sections/LocationCards";

/*
  A két egészségközpont adatai a jelenlegi oldal nyilvános kapcsolati és
  hálózati aloldaláról. A jelenlegi oldalon a két telephely adatai a fejlécben
  futnak össze, ami összekeverhető — itt mindegyik a saját kártyáján szerepel.
*/

export const locations: Location[] = [
  {
    city: "Győr",
    name: "Győri Egészségközpont",
    address: "9021 Győr, Bajcsy-Zsilinszky utca 30–32.",
    phoneLabel: "+36 20 373 3343",
    phoneNumber: "+36203733343",
    email: "gyor@hungariamed.hu",
    hours: "Hétfő–csütörtök: 7:00–19:00\nPéntek: 7:00–16:00\nHétvégén zárva",
    note: "Saját parkoló a hátsó bejáratnál, buszmegálló 200 méterre.",
    buttons: [
      { title: "Időpontfoglalás" },
      { title: "Útvonaltervezés", variant: "secondary" },
    ],
  },
  {
    city: "Budapest",
    name: "Budapesti Egészségközpont",
    address: "1135 Budapest, Jász utca 33–35.",
    phoneLabel: "+36 1 800 9333",
    phoneNumber: "+3618009333",
    email: "hungariamed@hungariamed.hu",
    hours: "Hétfő, szerda, péntek: 8:00–16:00\nKedd, csütörtök: 8:00–18:00\nHétvégén zárva",
    note: "A budapesti központ szolgáltatási köre eltérhet a győritől.",
    buttons: [
      { title: "Időpontfoglalás" },
      { title: "Útvonaltervezés", variant: "secondary" },
    ],
  },
];

/*
  Az üzemorvosi szolgáltatás országos lefedettsége. A jelenlegi oldalon ez egy
  85+ elemű, egybefüggő felsorolás; itt megyénként csoportosítva és kereshetően
  szerepel. A lista mintavétel a végleges településlistából — a teljes listát a
  szerződéses lefedettség alapján kell frissíteni.
*/

export const coverage = [
  {
    county: "Győr-Moson-Sopron",
    cities: ["Győr", "Sopron", "Mosonmagyaróvár", "Csorna", "Kapuvár", "Pannonhalma", "Tét"],
  },
  {
    county: "Komárom-Esztergom",
    cities: ["Tatabánya", "Tata", "Esztergom", "Komárom", "Oroszlány", "Dorog"],
  },
  { county: "Vas", cities: ["Szombathely", "Sárvár", "Kőszeg", "Körmend", "Celldömölk"] },
  { county: "Veszprém", cities: ["Veszprém", "Pápa", "Ajka", "Balatonfüred", "Tapolca", "Várpalota"] },
  { county: "Zala", cities: ["Zalaegerszeg", "Nagykanizsa", "Keszthely", "Hévíz", "Lenti"] },
  { county: "Fejér", cities: ["Székesfehérvár", "Dunaújváros", "Mór", "Bicske", "Sárbogárd"] },
  {
    county: "Pest és Budapest",
    cities: ["Budapest", "Érd", "Vác", "Gödöllő", "Cegléd", "Szentendre", "Dunakeszi", "Szigetszentmiklós"],
  },
  { county: "Bács-Kiskun", cities: ["Kecskemét", "Baja", "Kiskunfélegyháza", "Kalocsa", "Kiskőrös"] },
  { county: "Baranya", cities: ["Pécs", "Mohács", "Komló", "Siklós", "Szigetvár"] },
  { county: "Somogy", cities: ["Kaposvár", "Siófok", "Marcali", "Nagyatád", "Balatonboglár"] },
  { county: "Tolna", cities: ["Szekszárd", "Paks", "Dombóvár", "Bonyhád"] },
  { county: "Borsod-Abaúj-Zemplén", cities: ["Miskolc", "Ózd", "Kazincbarcika", "Sátoraljaújhely", "Tiszaújváros"] },
  { county: "Hajdú-Bihar", cities: ["Debrecen", "Hajdúböszörmény", "Hajdúszoboszló", "Berettyóújfalu", "Püspökladány"] },
  { county: "Heves", cities: ["Eger", "Gyöngyös", "Hatvan", "Füzesabony"] },
  { county: "Jász-Nagykun-Szolnok", cities: ["Szolnok", "Jászberény", "Karcag", "Törökszentmiklós", "Mezőtúr"] },
  { county: "Nógrád", cities: ["Salgótarján", "Balassagyarmat", "Pásztó"] },
  { county: "Szabolcs-Szatmár-Bereg", cities: ["Nyíregyháza", "Mátészalka", "Kisvárda", "Nyírbátor", "Fehérgyarmat"] },
  { county: "Békés", cities: ["Békéscsaba", "Gyula", "Orosháza", "Szarvas", "Békés"] },
  { county: "Csongrád-Csanád", cities: ["Szeged", "Hódmezővásárhely", "Szentes", "Makó", "Csongrád"] },
];
