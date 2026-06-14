// Inverse l'ordre des projets (WORK et FILMS) dans data.js
const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, "../assets/js/data.js");

global.window = {};
require(dataPath);
const { WORK, FILMS, SITE } = global.window.SITE_DATA;
WORK.reverse();
FILMS.reverse();

function fmt(p, isFilm) {
  const f = (k) => `    ${k}: ${JSON.stringify(p[k] || "")},\n`;
  let o = "  {\n" + f("slug") + f("titleEn") + f("titleFa") + f("years") + f("medium") + f("description");
  if (isFilm) o += f("video");
  o += `    cover: ${JSON.stringify(p.cover)},\n`;
  o += `    images: ${JSON.stringify(p.images)}\n  }`;
  return o;
}
let s = `/* =============================================================
   DONNÉES DU SITE — Erphaneh Sadeghzadeh
   Contenu issu de l'export Google Takeout (photos + textes).
   Ordre des projets : inversé.
   ============================================================= */\n\n`;
s += "const WORK = [\n" + WORK.map((p) => fmt(p, false)).join(",\n") + "\n];\n\n";
s += "const FILMS = [\n" + FILMS.map((p) => fmt(p, true)).join(",\n") + "\n];\n\n";
s += "const SITE = " + JSON.stringify(SITE, null, 2) + ";\n\n";
s += "window.SITE_DATA = { WORK, FILMS, SITE };\n";
fs.writeFileSync(dataPath, s);
console.log("Ordre inversé. WORK[0] =", WORK[0].titleEn, "| FILMS[0] =", FILMS[0].titleEn);
