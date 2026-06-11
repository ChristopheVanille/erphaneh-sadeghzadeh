/* Télécharge les images de couverture (URLs Google) dans images/<slug>/cover.jpg
   Usage :  node scripts/download-images.js
   Après exécution, remplace dans data.js les URLs "https://lh3..." par
   "images/<slug>/cover.jpg" (ou lance scripts/rewrite-data.js si fourni).        */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Charge data.js (qui fait window.SITE_DATA = ...)
global.window = {};
require(path.resolve(__dirname, "../assets/js/data.js"));
const { WORK, FILMS } = global.window.SITE_DATA;
const ROOT = path.resolve(__dirname, "..");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Referer": "https://sites.google.com/view/erphaneh-sadeghzadeh/work",
        "Accept": "image/avif,image/webp,image/*,*/*;q=0.8"
      }
    };
    https
      .get(url, opts, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(download(res.headers.location, dest));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error("HTTP " + res.statusCode));
        }
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on("finish", () => f.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async function () {
  const all = WORK.concat(FILMS);
  let ok = 0, fail = 0;
  for (const p of all) {
    if (!p.cover || !/^https?:/.test(p.cover)) continue;
    const dest = path.join(ROOT, "images", p.slug, "cover.jpg");
    try {
      await download(p.cover, dest);
      console.log("✓ " + p.slug);
      ok++;
    } catch (e) {
      console.log("✗ " + p.slug + "  (" + e.message + ")");
      fail++;
    }
  }
  console.log(`\nTerminé : ${ok} téléchargées, ${fail} échouées.`);
})();
