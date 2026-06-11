/* Télécharge des images ALÉATOIRES (picsum.photos) en local, pour tester le
   rendu avec images. Crée images/<slug>/cover.jpg + 01.jpg + 02.jpg et
   images/about/portrait.jpg, puis met à jour les tableaux `images` de data.js.
   Usage : node scripts/seed-random-images.js
   ⚠️ Images de test uniquement — à remplacer par les vraies photos.        */

const fs = require("fs");
const path = require("path");
const https = require("https");

global.window = {};
const dataPath = path.resolve(__dirname, "../assets/js/data.js");
require(dataPath);
const { WORK, FILMS, SITE } = global.window.SITE_DATA;
const ROOT = path.resolve(__dirname, "..");

function download(url, dest, depth) {
  depth = depth || 0;
  return new Promise((resolve, reject) => {
    if (depth > 6) return reject(new Error("too many redirects"));
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(download(res.headers.location, dest, depth + 1));
        }
        if (res.statusCode !== 200) { res.resume(); return reject(new Error("HTTP " + res.statusCode)); }
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on("finish", () => f.close(() => resolve(dest)));
        f.on("error", reject);
      })
      .on("error", reject);
  });
}

// tailles variées pour un rendu réaliste
const SIZES = [[1200, 1500], [1500, 1000], [1200, 1200], [1000, 1400], [1600, 1067]];
function pic(seed, i) {
  const s = SIZES[i % SIZES.length];
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${s[0]}/${s[1]}`;
}

(async function () {
  const all = WORK.concat(FILMS);
  let ok = 0, fail = 0;
  for (const p of all) {
    const targets = [
      [pic(p.slug + "-cover", 0), path.join(ROOT, "images", p.slug, "cover.jpg")],
      [pic(p.slug + "-1", 1), path.join(ROOT, "images", p.slug, "01.jpg")],
      [pic(p.slug + "-2", 2), path.join(ROOT, "images", p.slug, "02.jpg")]
    ];
    for (const [url, dest] of targets) {
      try { await download(url, dest); ok++; }
      catch (e) { console.log("✗ " + path.relative(ROOT, dest) + " (" + e.message + ")"); fail++; }
    }
    // remplit le tableau images pour la page projet / lightbox
    p.images = ["images/" + p.slug + "/01.jpg", "images/" + p.slug + "/02.jpg"];
    console.log("✓ " + p.slug);
  }
  // portrait About
  try { await download(pic("erphaneh-portrait", 0), path.join(ROOT, "images", "about", "portrait.jpg")); ok++; }
  catch (e) { console.log("✗ portrait (" + e.message + ")"); fail++; }

  // Réécrit data.js avec les tableaux images mis à jour
  function esc(s){return String(s).replace(/\\/g,"\\\\").replace(/"/g,'\\"');}
  function proj(p, isFilm){
    let o="  {\n";
    o+=`    slug: "${esc(p.slug)}",\n`;
    o+=`    titleEn: "${esc(p.titleEn)}",\n`;
    o+=`    titleFa: "${esc(p.titleFa||"")}",\n`;
    o+=`    years: "${esc(p.years||"")}",\n`;
    o+=`    medium: "${esc(p.medium||"")}",\n`;
    o+=`    description: "${esc(p.description||"")}",\n`;
    if(isFilm) o+=`    video: "${esc(p.video||"")}",\n`;
    o+=`    cover: "images/${esc(p.slug)}/cover.jpg",\n`;
    o+=`    coverRemote: "${esc(p.coverRemote||"")}",\n`;
    o+=`    images: ${JSON.stringify(p.images||[])}\n`;
    o+="  }";
    return o;
  }
  let s = fs.readFileSync(dataPath, "utf8").split("\nconst WORK")[0]; // garde l'en-tête de commentaire
  s += "\nconst WORK = [\n" + WORK.map(p=>proj(p,false)).join(",\n") + "\n];\n\n";
  s += "const FILMS = [\n" + FILMS.map(p=>proj(p,true)).join(",\n") + "\n];\n\n";
  s += "const SITE = " + JSON.stringify(SITE,null,2) + ";\n\n";
  s += "window.SITE_DATA = { WORK, FILMS, SITE };\n";
  fs.writeFileSync(dataPath, s);

  console.log(`\nTerminé : ${ok} images téléchargées, ${fail} échouées. data.js mis à jour.`);
})();
