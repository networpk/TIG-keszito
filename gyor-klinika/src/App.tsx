import { useEffect, useState } from "react";

import { Home } from "@/pages/Home";
import { Styleguide } from "@/pages/Styleguide";

/**
 * Két nézet van: a főoldal és a styleguide. Külön router-könyvtár helyett a
 * hash dönt (`#/styleguide`), így a horgonyra ugró menülinkek (`#kapcsolat`)
 * változatlanul működnek.
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash.startsWith("#/styleguide")) {
    return <Styleguide />;
  }

  return <Home />;
}
