import { useEffect, useState } from "react";

import { Home } from "@/pages/Home";
import { ServicePage } from "@/pages/ServicePage";
import { Styleguide } from "@/pages/Styleguide";
import { terhelesesEkg } from "@/content/services";

/**
 * Három nézet: a főoldal, a vizsgálat-aloldal sablonja és a styleguide.
 * Külön router-könyvtár helyett a hash dönt (`#/vizsgalat`), így a horgonyra
 * ugró menülinkek (`#/#kapcsolat`) változatlanul működnek.
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // A menülinkek `#/#horgony` alakúak, hogy az aloldalról is a főoldal
  // megfelelő szakaszára vigyenek — az útvonal az első szegmens.
  const route = hash.replace(/^#\/?/, "").split("#")[0];

  // Ilyen összetett hashnél a böngésző már nem talál rá a horgonyra
  // (a teljes `/#szakrendelesek` töredéket keresné), ezért kézzel görgetünk.
  useEffect(() => {
    const anchor = hash.split("#")[2];
    if (!anchor) return;
    const element = document.getElementById(anchor);
    if (!element) return;
    const frame = requestAnimationFrame(() => element.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  if (route.startsWith("styleguide")) {
    return <Styleguide />;
  }

  if (route.startsWith("vizsgalat")) {
    return <ServicePage service={terhelesesEkg} />;
  }

  return <Home />;
}
