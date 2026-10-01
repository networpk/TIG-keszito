import { useEffect, useState } from "react";

import { Home } from "@/pages/Home";
import { ServicePage } from "@/pages/ServicePage";
import { Services } from "@/pages/Services";
import { About } from "@/pages/About";
import { Gallery } from "@/pages/Gallery";
import { Network } from "@/pages/Network";
import { Funds } from "@/pages/Funds";
import { Prices } from "@/pages/Prices";
import { Contact } from "@/pages/Contact";
import { PageIndex } from "@/pages/PageIndex";
import { Styleguide } from "@/pages/Styleguide";
import { terhelesesEkg } from "@/content/services";

/**
 * Hash-alapú útvonalválasztás router-könyvtár nélkül.
 *
 * A hivatkozások `#/útvonal` alakúak, a horgonyok `#/útvonal#id` formában —
 * így egy aloldalról is a megfelelő oldal megfelelő szakaszára lehet vinni.
 */
const routes: Record<string, () => React.ReactElement> = {
  "": () => <Home />,
  oldalak: () => <PageIndex />,
  szolgaltatasok: () => <Services />,
  vizsgalat: () => <ServicePage service={terhelesesEkg} />,
  rolunk: () => <About />,
  galeria: () => <Gallery />,
  halozat: () => <Network />,
  egeszsegpenztarak: () => <Funds />,
  arak: () => <Prices />,
  kapcsolat: () => <Contact />,
  styleguide: () => <Styleguide />,
};

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const route = hash.replace(/^#\/?/, "").split("#")[0];

  // Útvonalváltáskor az oldal tetejéről induljunk, különben a látogató a
  // korábbi görgetési pozíción találja magát az új oldal közepén.
  useEffect(() => {
    if (!hash.split("#")[2]) window.scrollTo(0, 0);
  }, [route]);

  // Ilyen összetett hashnél a böngésző már nem talál rá a horgonyra
  // (a teljes `/rolunk#orvosaink` töredéket keresné), ezért kézzel görgetünk.
  useEffect(() => {
    const anchor = hash.split("#")[2];
    if (!anchor) return;
    const element = document.getElementById(anchor);
    if (!element) return;
    const frame = requestAnimationFrame(() => element.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const render = routes[route] ?? routes[""];
  return render();
}
