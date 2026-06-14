/* Reconstruit images/<slug>/ + data.js à partir de l'export Google Takeout
   situé dans ./published. Pour chaque projet : copie ses photos dans l'ordre
   d'apparition dans la page HTML (01.jpg, 02.jpg, ...), cover = 1re image.
   Usage : node scripts/build-from-published.js                              */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "published");
const IMG = path.join(ROOT, "images");

// slug -> { folder (dans published), titleEn, titleFa, medium, type }
const WORK_ORDER = [
  ["sunsick", "sunsick", "Sunsick"],
  ["sign-of-connection", "Sign of connection ", "Sign of Connection"],
  ["self-portrait-venice-biennale", "Self portrait at Venice Biennale", "Self Portrait at Venice Biennale"],
  ["where-do-you-feel-comfortable-in-weimar", "Where do you feel comfortable in Weimar", "Where Do You Feel Comfortable in Weimar?"],
  ["in-the-nature-of-being", "In the nature of being", "In the Nature of Being"],
  ["a-love-note", "A love note", "A Love Note"],
  ["cassette-castle", "Cassette Castle", "Cassette Castle"],
  ["tasvir-archive-exhibition", "Tasvir archive exhibition", "Tasvir Archive Exhibition"],
  ["in-die-steine", "In die Steine", "In die Steine"],
  ["over-and-over", "Over and over", "Over and Over"],
  ["language-is-a-mattress", "Language is a Mattress", "Language is a Mattress"],
  ["on-body-and-soul", "On body and Soul", "On Body and Soul"],
  ["drecksarbeit", "Drecksarbeit", "Drecksarbeit"],
  ["found-objects-and-memories", "Found objects and memories", "Found Objects and Memories"],
  ["i-destroyed-my-comfort", "I destroyed my comfort", "I Destroyed My Comfort"],
  ["i-will-keep-your-photos", "I will keep your photos", "I Will Keep Your Photos"],
  ["faceless-placeless", "Faceless Placeless", "Faceless, Placeless"],
  ["three-four", "34", "3**4"]
];
const FILMS_ORDER = [
  ["land-escape", "Land-escape", "Land-escape"],
  ["another-me", "Another me", "Another Me"],
  ["de-collage", "De-collage", "De-collage"],
  ["muttering-from-the-edges", "Muttering from the edges", "Muttering from the Edges"]
];

// Trouve le fichier HTML correspondant à un dossier projet
function htmlFor(folder) {
  const candidates = [folder + ".html", folder.trim() + ".html", folder.trim() + "_.html"];
  for (const c of candidates) { if (fs.existsSync(path.join(PUB, c))) return path.join(PUB, c); }
  // fallback : cherche un .html qui commence pareil
  const base = folder.trim().toLowerCase();
  const f = fs.readdirSync(PUB).find((x) => x.toLowerCase().replace(/_?\.html$/, "") === base);
  return f ? path.join(PUB, f) : null;
}

// Ordonne les images d'un dossier selon leur 1re apparition dans le HTML
function orderedImages(folder) {
  const dir = path.join(PUB, folder);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
  const htmlPath = htmlFor(folder);
  if (!htmlPath) return files; // pas de html : ordre alpha
  const html = fs.readFileSync(htmlPath, "utf8");
  return files
    .map((f) => ({ f, idx: html.indexOf(f.replace(/\.jpe?g$/i, "")) }))
    .sort((a, b) => (a.idx < 0 ? 1e9 : a.idx) - (b.idx < 0 ? 1e9 : b.idx))
    .map((o) => o.f);
}

function clearSlug(slug) {
  const dir = path.join(IMG, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).forEach((f) => fs.unlinkSync(path.join(dir, f)));
}

function build(list, isFilm) {
  return list.map(([slug, folder, titleEn]) => {
    const imgs = orderedImages(folder);
    clearSlug(slug);
    const out = [];
    imgs.forEach((src, i) => {
      const name = i === 0 ? "cover.jpg" : String(i + 1).padStart(2, "0") + ".jpg";
      fs.copyFileSync(path.join(PUB, folder, src), path.join(IMG, slug, name));
      out.push("images/" + slug + "/" + name);
    });
    console.log((isFilm ? "[film] " : "") + slug + " : " + out.length + " images");
    const entry = { slug, titleEn, titleFa: "", years: "", medium: "", description: "",
      cover: out[0] || ("images/" + slug + "/cover.jpg"), images: out };
    if (isFilm) entry.video = "";
    return entry;
  });
}

const WORK = build(WORK_ORDER, false);
const FILMS = build(FILMS_ORDER, true);

// About : portrait + (texte rempli plus tard)
clearSlug("about");
const aboutImgs = orderedImages("About");
if (aboutImgs[0]) fs.copyFileSync(path.join(PUB, "About", aboutImgs[0]), path.join(IMG, "about", "portrait.jpg"));
const SITE = {
  name: "Erphaneh Sadeghzadeh",
  email: "Erphane.sadeghzadeh@gmail.com",
  about: [
    "Erphaneh Sadeghzadeh is an interdisciplinary artist and filmmaker from Iran, based in Berlin, Germany.",
    "She holds a B.A. in Cinema and is currently pursuing an M.F.A. at the Bauhaus-University Weimar.",
    "Working across analogue photography, video, archive, collage and installation, her practice is deeply personal — exploring themes of identity, memory and history."
  ],
  portrait: "images/about/portrait.jpg",
  portraitCredit: "Photo: Carlos Santos"
};

// Écrit data.js
function esc(s){return String(s).replace(/\\/g,"\\\\").replace(/"/g,'\\"');}
function fmt(p, isFilm){
  let o="  {\n";
  o+=`    slug: "${esc(p.slug)}",\n`;
  o+=`    titleEn: "${esc(p.titleEn)}",\n`;
  o+=`    titleFa: "${esc(p.titleFa)}",\n`;
  o+=`    years: "${esc(p.years)}",\n`;
  o+=`    medium: "${esc(p.medium)}",\n`;
  o+=`    description: "${esc(p.description)}",\n`;
  if(isFilm) o+=`    video: "${esc(p.video||"")}",\n`;
  o+=`    cover: "${esc(p.cover)}",\n`;
  o+=`    images: ${JSON.stringify(p.images)}\n`;
  o+="  }";
  return o;
}
let s = `/* =============================================================
   DONNÉES DU SITE — Erphaneh Sadeghzadeh
   Généré depuis l'export Google Takeout (dossier ./published).
   Ordre des projets = ordre du site publié ; images dans l'ordre
   d'affichage de chaque page. Textes (titleFa/description) à compléter.
   ============================================================= */\n\n`;
s += "const WORK = [\n" + WORK.map((p)=>fmt(p,false)).join(",\n") + "\n];\n\n";
s += "const FILMS = [\n" + FILMS.map((p)=>fmt(p,true)).join(",\n") + "\n];\n\n";
s += "const SITE = " + JSON.stringify(SITE,null,2) + ";\n\n";
s += "window.SITE_DATA = { WORK, FILMS, SITE };\n";
fs.writeFileSync(path.join(ROOT, "assets/js/data.js"), s);
console.log("\ndata.js régénéré :", WORK.length, "work,", FILMS.length, "films.");
