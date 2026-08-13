import avatar from "./placeholder-avatar.svg";
import landscape from "./placeholder-landscape.svg";
import logo from "./placeholder-logo.svg";
import map from "./placeholder-map.svg";
import portrait from "./placeholder-portrait.svg";

/*
  A helykitöltő képek importálva, nem a public/ mappából hivatkozva: így a build
  data URI-ként ágyazza be őket, és az oldal egyetlen fájlként, hálózat nélkül is
  megjelenik. Valódi fotókra cserélve érdemes visszatérni a public/ mappához.
*/
export const placeholders = { avatar, landscape, logo, map, portrait };
