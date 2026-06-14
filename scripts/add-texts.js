/* Ajoute les TEXTES de l'export Takeout (published/) dans data.js :
   description de chaque projet + bio de la page About.
   Conserve les images/cover déjà générées. Usage : node scripts/add-texts.js */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const PUB = path.join(ROOT, "published");
const dataPath = path.join(ROOT, "assets/js/data.js");

global.window = {};
require(dataPath);
const { WORK, FILMS, SITE } = global.window.SITE_DATA;

const FOLDER = {
  "sunsick": "sunsick", "sign-of-connection": "Sign of connection ",
  "self-portrait-venice-biennale": "Self portrait at Venice Biennale",
  "where-do-you-feel-comfortable-in-weimar": "Where do you feel comfortable in Weimar",
  "in-the-nature-of-being": "In the nature of being", "a-love-note": "A love note",
  "cassette-castle": "Cassette Castle", "tasvir-archive-exhibition": "Tasvir archive exhibition",
  "in-die-steine": "In die Steine", "over-and-over": "Over and over",
  "language-is-a-mattress": "Language is a Mattress", "on-body-and-soul": "On body and Soul",
  "drecksarbeit": "Drecksarbeit", "found-objects-and-memories": "Found objects and memories",
  "i-destroyed-my-comfort": "I destroyed my comfort", "i-will-keep-your-photos": "I will keep your photos",
  "faceless-placeless": "Faceless Placeless", "three-four": "34",
  "land-escape": "Land-escape", "another-me": "Another me", "de-collage": "De-collage",
  "muttering-from-the-edges": "Muttering from the edges"
};

const NAV = new Set(["Work","Films","About","More","sunsick","Sign of connection",
"Self portrait at Venice Biennale","Where do you feel comfortable in Weimar?","Where do you feel comfortable in Weimar",
"In the nature of being","A love note","Cassette Castle","Tasvir archive exhibition","In die Steine",
"Over and over","Language is a Mattress","On body and Soul","Drecksarbeit","Found objects and memories",
"I destroyed my comfort","I will keep your photos","Faceless, Placeless","Faceless Placeless","3**4","34",
"Land-escape","Another me","De-collage","Muttering from the edges","Erphaneh Sadeghzadeh","Erphaneh sadeghzadeh"]);

function htmlFor(folder) {
  for (const c of [folder + ".html", folder.trim() + ".html", folder.trim() + "_.html"]) {
    if (fs.existsSync(path.join(PUB, c))) return path.join(PUB, c);
  }
  return null;
}
function visibleText(file) {
  let h = fs.readFileSync(file, "utf8");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  // retire les balises INLINE sans insérer d'espace (évite les coupures de mot)
  h = h.replace(/<\/?(span|a|b|i|em|strong|font|u|sub|sup|small|mark|wbr|tt)\b[^>]*>/gi, "");
  // les sauts réels (<br> et blocs) deviennent des retours ligne
  h = h.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "\n");
  h = h.replace(/&amp;/g,"&").replace(/&#39;/g,"’").replace(/&quot;/g,'"').replace(/&nbsp;/g," ").replace(/&gt;/g,">").replace(/&lt;/g,"<");
  const seen = new Set(); const out = [];
  for (let l of h.split("\n").map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean)) {
    if (l.length < 2 || /^[\s·•|\-–—]+$/.test(l) || seen.has(l)) continue;
    seen.add(l); out.push(l);
  }
  return out;
}
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
// Recompose des paragraphes : fusionne les lignes jusqu'à une ponctuation finale
function toParagraphs(lines) {
  const paras = []; let cur = "";
  for (const l of lines) {
    cur = cur ? cur + " " + l : l;
    if (/[.!?]["”’)]?$/.test(l)) { paras.push(cur); cur = ""; }
  }
  if (cur) paras.push(cur);
  return paras;
}

// Renvoie le bloc de contenu (entre le menu "More" et l'email), titre retiré
function contentBlock(folder, titleEn) {
  const file = htmlFor(folder);
  if (!file) return [];
  const lines = visibleText(file);
  let start = lines.lastIndexOf("More");
  start = start >= 0 ? start + 1 : 0;
  let block = lines.slice(start).filter((l) => !NAV.has(l));
  const ei = block.findIndex((l) => /@/.test(l));
  if (ei >= 0) block = block.slice(0, ei);
  // retire les lignes de titre en tête
  const nt = norm(titleEn);
  while (block.length) {
    const nb = norm(block[0]);
    if (nb && (nt.includes(nb) || nb.startsWith(nt))) block.shift();
    else break;
  }
  return block.map((l) => l.trim()).filter(Boolean);
}

// Une ligne est "meta" (technique / lieu / date / crédit / lien) — pas de la prose
function isMeta(l) {
  if (/^https?:\/\//i.test(l)) return true;
  // crédits/lieux explicites (forts) — quelle que soit la longueur
  if (/(photo credit|photo by|courtesy|hosted by|first show|premiere|screening|group exhibition|solo exhibition|exhibition at|exhibition place|shown at|on view|published by|show at)/i.test(l)) return true;
  const short = l.length < 95; // les crédits/lieux sont courts ; la prose est longue
  if (short && /\b(19|20)\d{2}\b/.test(l)) return true;
  if (short && /^(photo\s?book|photobook|performance|installation|photo installation|video|experimental film|short fiction film|short film|film|sound|self-?published|book)\b/i.test(l)) return true;
  if (short && /\b(gallery|museum|biennale|festival|kunsthalle|gfzk|acc gallery|pavilion)\b/i.test(l)) return true;
  if (short && /sadeghzadeh/i.test(l)) return true; // crédits collaborateurs
  return false;
}

function apply(list) {
  list.forEach((p) => {
    const folder = FOLDER[p.slug];
    if (!folder) return;
    const orig = contentBlock(folder, p.titleEn);
    let lines = orig.slice();
    const lead = []; while (lines.length && isMeta(lines[0])) lead.push(lines.shift());
    const tail = []; while (lines.length && isMeta(lines[lines.length - 1])) tail.unshift(lines.pop());
    let meta = lead.concat(tail);
    // garde-fou : si on viderait la description, on garde tout le texte
    if (lines.length === 0) { lines = orig.slice(); meta = []; }
    p.description = toParagraphs(lines).join("\n\n");
    p.medium = meta.map((s) => s.replace(/\s+\/\/\s+/g, " — ").trim()).filter(Boolean).join(" · ");
    console.log("• " + p.slug + " : prose " + p.description.length + "c | medium: " + (p.medium.slice(0, 70) || "—"));
  });
}
apply(WORK); apply(FILMS);

// ---- About ----
const aboutFile = htmlFor("About");
if (aboutFile) {
  const lines = visibleText(aboutFile);
  let start = lines.lastIndexOf("More");
  let block = lines.slice(start >= 0 ? start + 1 : 0).filter((l) => !NAV.has(l));
  const cred = block.find((l) => /photo by/i.test(l));
  const ei = block.findIndex((l) => /@/.test(l));
  if (ei >= 0) block = block.slice(0, ei);
  const paras = toParagraphs(block.filter((l) => !/photo by/i.test(l)));
  if (paras.length) SITE.about = paras;
  if (cred) SITE.portraitCredit = cred.trim();
  SITE.email = "Erphane.sadeghzadeh@gmail.com";
  console.log("• About : " + SITE.about.length + " paragraphes ; crédit: " + SITE.portraitCredit);
}

// ---- Réécrit data.js (strings via JSON.stringify pour gérer les sauts de ligne) ----
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
   Généré depuis l'export Google Takeout (dossier ./published) :
   ordre des projets, images (ordre d'affichage) et textes du site publié.
   ============================================================= */\n\n`;
s += "const WORK = [\n" + WORK.map((p) => fmt(p, false)).join(",\n") + "\n];\n\n";
s += "const FILMS = [\n" + FILMS.map((p) => fmt(p, true)).join(",\n") + "\n];\n\n";
s += "const SITE = " + JSON.stringify(SITE, null, 2) + ";\n\n";
s += "window.SITE_DATA = { WORK, FILMS, SITE };\n";
fs.writeFileSync(dataPath, s);
console.log("\ndata.js mis à jour avec les textes.");
