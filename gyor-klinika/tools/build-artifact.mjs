import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

/*
  Egyfájlos változat készítése a dist/-ből.

  A `npm run build` külön JS- és CSS-fájlt ad, a képeket viszont már data
  URI-ként ágyazza be. Ez a script a JS-t és a CSS-t is beemeli, és olyan
  HTML-t ír ki, ami csak a törzs tartalmát tartalmazza (nincs doctype, html,
  head, body) — így megosztható oldalként publikálható, és offline is megnyílik.

  Használat:  npm run build && node tools/build-artifact.mjs
*/

const root = path.resolve(import.meta.dirname, "..");
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");
const outFile = path.join(distDir, "foooldal.html");

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

const html = `<title>Klinika Győr főoldal</title>
<style>
${safeCss}
</style>
<div id="root"></div>
<script type="module">
${safeJs}
</script>
`;

await writeFile(outFile, html, "utf8");

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`Kész: ${path.relative(root, outFile)} (${kb} kB)`);
