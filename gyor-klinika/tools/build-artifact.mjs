import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

/*
  Egyfájlos változat készítése a dist/-ből.

  A `npm run build` külön JS- és CSS-fájlt ad, a képeket viszont már data
  URI-ként ágyazza be. Ez a script a JS-t és a CSS-t is beemeli, és olyan
  HTML-t ír ki, ami csak a törzs tartalmát tartalmazza (nincs doctype, html,
  head, body) — így megosztható oldalként publikálható, és offline is megnyílik.

  Használat:
    npm run build
    node tools/build-artifact.mjs --out foooldal.html --title "Klinika Győr főoldal"
    node tools/build-artifact.mjs --out vizsgalat.html --title "Terheléses EKG oldal" --route "#/vizsgalat"

  A `--route` a kezdő nézetet állítja be: a publikált oldal URL-jén nincs hash,
  ezért a beágyazott app alapból a főoldalt mutatná.
*/

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index !== -1 && args[index + 1] ? args[index + 1] : fallback;
};

const outName = arg("out", "foooldal.html");
const title = arg("title", "Klinika Győr főoldal");
const route = arg("route", "");

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");
const outFile = path.join(distDir, outName);

const files = await readdir(assetsDir);
const jsFile = files.find((file) => file.endsWith(".js"));
const cssFile = files.find((file) => file.endsWith(".css"));

if (!jsFile || !cssFile) {
  throw new Error(`Nincs JS vagy CSS a ${assetsDir} mappában — futott a build?`);
}

const js = await readFile(path.join(assetsDir, jsFile), "utf8");
const css = await readFile(path.join(assetsDir, cssFile), "utf8");

// A beágyazott kódban a záró tagek megtörnék a HTML-t.
const safeJs = js.replaceAll("</script", "<\\/script");
const safeCss = css.replaceAll("</style", "<\\/style");

// Csak akkor állítunk hasht, ha a látogató nem kért mást — így a linkre
// kattintva megnyitott másik nézet nem íródik felül.
const routeScript = route
  ? `<script>if(!location.hash)location.hash=${JSON.stringify(route)};</script>\n`
  : "";

const html = `<title>${title}</title>
<style>
${safeCss}
</style>
<div id="root"></div>
${routeScript}<script type="module">
${safeJs}
</script>
`;

await writeFile(outFile, html, "utf8");

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`Kész: ${path.relative(root, outFile)} (${kb} kB)`);
