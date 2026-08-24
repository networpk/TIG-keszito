import { ChevronRight } from "relume-icons";

import { Card } from "@/components/ui/card";

type Entry = {
  route: string;
  title: string;
  sections: string;
  description: string;
};

const entries: Entry[] = [
  {
    route: "#/",
    title: "Főoldal",
    sections: "18 szakasz",
    description:
      "Kétirányú célközönség-elágazás, korai bizalomépítés, és minden szakasznál cselekvési lehetőség.",
  },
  {
    route: "#/szolgaltatasok",
    title: "Szolgáltatások gyűjtőoldal",
    sections: "7 szakasz",
    description:
      "A teljes vizsgálat-katalógus keresővel és szakterületi szűrővel, innen nyílnak az egyes aloldalak.",
  },
  {
    route: "#/vizsgalat",
    title: "Vizsgálat-aloldal sablon",
    sections: "14 szakasz",
    description:
      "A 40+ szakrendelés univerzális sablonja, terheléses EKG példatartalommal feltöltve.",
  },
  {
    route: "#/rolunk",
    title: "Rólunk",
    sections: "10 szakasz",
    description: "A klinika története, értékei, mérföldkövei és orvosi csapata — bizalmi oldal.",
  },
  {
    route: "#/galeria",
    title: "Galéria",
    sections: "5 szakasz",
    description: "Szűrhető képrács képaláírásokkal: rendelők, diagnosztika, várótér, csapat.",
  },
  {
    route: "#/halozat",
    title: "Országos hálózat",
    sections: "7 szakasz",
    description:
      "A két egészségközpont adatlapja és a 85+ települést lefedő üzemorvosi hálózat, kereshetően.",
  },
  {
    route: "#/egeszsegpenztarak",
    title: "Egészségpénztárak",
    sections: "7 szakasz",
    description: "A 15 elfogadott pénztár, és három lépésben az elszámolás menete.",
  },
  {
    route: "#/arak",
    title: "Árak",
    sections: "7 szakasz",
    description: "Kereshető, szakterületenként összecsukható árlista, csomagokkal és GYIK-kal.",
  },
  {
    route: "#/kapcsolat",
    title: "Kapcsolat",
    sections: "7 szakasz",
    description: "Elérhetőségek, térkép, űrlap témaválasztóval és a két telephely adatai.",
  },
  {
    route: "#/styleguide",
    title: "Styleguide",
    sections: "design rendszer",
    description: "Tipográfiai skála, színsémák, márkaszínek, gombok, űrlapelemek egy lapon.",
  },
];

/**
 * Az artifact nyitólapja: innen minden megépített oldal elérhető.
 * A publikált oldal egyetlen alkalmazás — az oldalak a hash útvonalon nyílnak.
 */
export const PageIndex = () => {
  return (
    <main className="px-[5%] py-16 md:py-24">
      <div className="container">
        <p className="mb-3 font-semibold">Struktúratervek</p>
        <h1 className="mb-5 text-h1 font-bold">Győri magánklinika — megépített oldalak</h1>
        <p className="max-w-lg text-medium">
          Minden oldal ugyanabból a design rendszerből épül, Relume komponensekből. A tartalom
          helykitöltő: a szakaszok sorrendje és szerepe a döntés, a végleges szövegek a következő
          fázisban készülnek.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <li key={entry.route}>
              <Card className="h-full">
                <a href={entry.route} className="flex h-full flex-col p-6">
                  <p className="text-small">{entry.sections}</p>
                  <h2 className="mt-1 mb-3 text-h5 font-bold">{entry.title}</h2>
                  <p>{entry.description}</p>
                  <span className="mt-auto flex items-center gap-1 pt-5 font-semibold">
                    Megnyitás
                    <ChevronRight className="size-5 text-scheme-text" />
                  </span>
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
