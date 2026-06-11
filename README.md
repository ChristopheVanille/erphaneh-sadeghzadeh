# Erphaneh Sadeghzadeh — site portfolio

Site statique (HTML/CSS/JS, sans dépendance ni build) inspiré de
[amakmahmoodian.com](https://amakmahmoodian.com) : fond noir immersif,
colonne centrée, titres en serif italique, révélation des images au scroll,
lightbox plein écran sur fond noir, page *About* sur fond blanc.

## Lancer en local

Ouvrir `index.html` dans un navigateur suffit. Pour que tout fonctionne
parfaitement (chargement de `data.js`), mieux vaut un petit serveur local :

```bash
cd "Erpha Website"
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Structure

```
index.html      → galerie "Work" (page d'accueil, fond noir)
films.html      → galerie "Films"
project.html    → page d'un projet (URL : project.html?slug=...)
about.html      → biographie (fond blanc)
assets/
  css/style.css → tout le design
  js/data.js    → ►► LE CONTENU (projets, textes) — à éditer
  js/main.js    → logique (galeries, scroll, lightbox)
images/         → ►► TES PHOTOS
```

## Mécanique « hover » (comme Amak)

Sur l'accueil et la page Films, la page n'affiche qu'une **liste de titres**.
L'**image n'apparaît qu'au survol** du projet (fondu), exactement comme sur
amakmahmoodian.com. L'image reste dans le flux (espace réservé) → aucun saut.
Sur mobile (pas de survol), les images sont affichées directement.

## Ajouter les vraies images

> ⚠️ **Important** : les images de couverture ont été repérées sur le site
> Google d'origine (leurs URLs sont conservées dans le champ `coverRemote`
> de `data.js`), **mais Google refuse leur téléchargement/affichage hors
> session** (erreur 403 — protection anti-hotlink de Google Sites). Il faut
> donc fournir les fichiers toi-même.

Tant qu'une image est absente, un **placeholder gris** s'affiche
automatiquement — rien ne casse. Pour mettre les vraies photos :

1. Récupère les fichiers (depuis ton compte Google Sites en étant connectée :
   clic droit → « Enregistrer l'image », ou via tes fichiers originaux).
2. Dépose-les dans `images/<slug>/` :
   - couverture (galerie) → `images/<slug>/cover.jpg`
   - images de la page projet → `images/<slug>/01.jpg`, `02.jpg`, …
     puis liste-les dans le champ `images` du projet dans `data.js`.
3. Portrait de la page About → `images/about/portrait.jpg`.

Les slugs exacts sont listés dans `data.js`. Exemple :
`images/cassette-castle/cover.jpg`.

Formats conseillés : JPG ou WEBP, ~2000 px de large, optimisés pour le web.

### Script de téléchargement (`scripts/download-images.js`)
Le script qui tente de télécharger automatiquement les `coverRemote` est
fourni, **mais il renvoie actuellement 403** (Google bloque l'accès externe).
Il refonctionnera tel quel si tu remplaces les `coverRemote` par des URLs
réellement publiques.

## Modifier les textes

Tout est dans **`assets/js/data.js`** :

- `titleEn` : titre anglais (grand titre serif italique)
- `titleFa` : titre en persan (optionnel — laissé vide, il ne s'affiche pas).
  Pour coller au modèle d'Amak (bilingue FA/EN), renseigne-le quand tu l'as.
- `years` : période, ex. `"2019–2024"` (optionnel)
- `medium` : technique (optionnel)
- `description` : texte de présentation du projet (optionnel)
- `video` (films) : URL d'embed Vimeo/YouTube pour afficher le film.

## Films

Pour afficher un film, renseigne le champ `video` du projet dans `data.js`,
par exemple : `video: "https://player.vimeo.com/video/XXXXXXXX"`.

## Mettre en ligne

Site 100 % statique → hébergeable gratuitement sur Netlify, GitHub Pages,
Vercel, Cloudflare Pages… Il suffit de déposer le dossier.

---

### Choix de design repris d'amakmahmoodian.com
- Fond noir `#000`, texte blanc, page About blanche (contraste).
- Titres en **Averia Serif Libre** italique ; navigation/textes en **Space Grotesk**.
- Navigation fixe : nom à gauche, `WORK · FILMS · ABOUT` à droite.
- Images révélées au scroll (fondu + glissé : `opacity` + `translateY`).
- Clic sur une image d'un projet → lightbox noire plein écran (flèches + clavier).
