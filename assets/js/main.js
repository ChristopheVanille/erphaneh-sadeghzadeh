/* =============================================================
   main.js — logique du site
   - placeholders automatiques tant que les vraies images manquent
   - rendu des galeries (Work / Films) depuis data.js
   - rendu de la page projet
   - révélation au scroll (IntersectionObserver)
   - lightbox plein écran sur fond noir
   - menu mobile
   ============================================================= */

(function () {
  "use strict";

  const DATA = window.SITE_DATA || { WORK: [], FILMS: [], SITE: {} };

  /* ---------- Placeholder SVG (charcoal + titre) ---------------- */
  function placeholder(label, w, h) {
    const txt = (label || "image").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
      <rect width='100%' height='100%' fill='#141414'/>
      <rect x='1' y='1' width='${w - 2}' height='${h - 2}' fill='none' stroke='#2a2a2a' stroke-width='2'/>
      <text x='50%' y='49%' fill='#5c5c5c' font-family='Georgia, serif' font-style='italic'
        font-size='${Math.round(Math.min(w, h) / 14)}' text-anchor='middle'>${txt}</text>
      <text x='50%' y='49%' dy='2.4em' fill='#3a3a3a' font-family='monospace'
        font-size='${Math.round(Math.min(w, h) / 26)}' text-anchor='middle'>image à venir</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // Dimensions pseudo-aléatoires mais stables (variété visuelle des placeholders)
  function dims(seed) {
    let n = 0; for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) % 997;
    const ratios = [[3, 4], [4, 3], [1, 1], [16, 9], [3, 2], [2, 3]];
    const r = ratios[n % ratios.length];
    return { w: 1200, h: Math.round(1200 * r[1] / r[0]) };
  }

  // Crée une <img> qui bascule sur un placeholder si la vraie image est absente
  function makeImg(src, label, className, eager) {
    const img = document.createElement("img");
    if (className) img.className = className;
    img.alt = label || "";
    img.loading = eager ? "eager" : "lazy";
    const d = dims(src || label || "x");
    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      img.src = placeholder(label, d.w, d.h);
    });
    img.src = src || placeholder(label, d.w, d.h);
    return img;
  }

  /* ---------- Galerie (accueil Work / Films) -------------------- */
  function renderGallery(targetId, items, isFilm) {
    const root = document.getElementById(targetId);
    if (!root) return;

    // Scène d'image centrée, partagée et créée une seule fois
    let stage = document.querySelector(".hover-stage");
    if (!stage) {
      stage = document.createElement("div");
      stage.className = "hover-stage";
      stage.appendChild(document.createElement("img"));
      document.body.appendChild(stage);
    }
    const stageImg = stage.querySelector("img");

    items.forEach(function (p) {
      const block = document.createElement("div");
      block.className = "project";

      const link = document.createElement("a");
      link.href = "project.html?slug=" + encodeURIComponent(p.slug);

      const titles = document.createElement("div");
      titles.className = "project__titles";
      if (p.titleFa) {
        const fa = document.createElement("div");
        fa.className = "project__fa";
        fa.textContent = p.titleFa;
        titles.appendChild(fa);
      }
      const en = document.createElement("h2");
      en.className = "project__en";
      en.textContent = p.titleEn;
      titles.appendChild(en);
      if (p.years) {
        const y = document.createElement("small");
        y.className = "project__years";
        y.textContent = "(" + p.years + ")";
        titles.appendChild(y);
      }
      link.appendChild(titles);
      block.appendChild(link);

      // Image inline (affichée uniquement sur écran tactile, cf. CSS)
      const inlineWrap = document.createElement("div");
      inlineWrap.className = "project__cover-inline";
      inlineWrap.appendChild(makeImg(p.cover, p.titleEn));
      block.appendChild(inlineWrap);

      // Survol : image centrée dans la scène (placeholder si fichier absent)
      const d = dims(p.cover || p.titleEn);
      block.addEventListener("mouseenter", function () {
        stageImg.onerror = function () {
          stageImg.onerror = null;
          stageImg.src = placeholder(p.titleEn, d.w, d.h);
        };
        stageImg.alt = p.titleEn;
        stageImg.src = p.cover || placeholder(p.titleEn, d.w, d.h);
        stage.classList.add("is-visible");
        root.classList.add("is-hovering");
      });
      block.addEventListener("mouseleave", function () {
        stage.classList.remove("is-visible");
        root.classList.remove("is-hovering");
      });

      root.appendChild(block);
    });
  }

  /* ---------- Page projet (détail) ------------------------------ */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function renderProject() {
    const root = document.getElementById("project-detail");
    if (!root) return;

    const slug = getParam("slug");
    const all = DATA.WORK.concat(DATA.FILMS);
    const p = all.find(function (x) { return x.slug === slug; });

    if (!p) {
      root.innerHTML = "<p style='color:#888;text-align:center'>Projet introuvable.</p>";
      return;
    }

    document.title = p.titleEn + " — " + (DATA.SITE.name || "");

    // En-tête
    const head = document.createElement("div");
    head.className = "project-detail__head reveal";
    if (p.titleFa) {
      const fa = document.createElement("div");
      fa.className = "project-detail__fa"; fa.textContent = p.titleFa;
      head.appendChild(fa);
    }
    const en = document.createElement("h1");
    en.className = "project-detail__en"; en.textContent = p.titleEn;
    head.appendChild(en);

    const metaBits = [p.years ? "(" + p.years + ")" : "", p.medium || ""].filter(Boolean);
    if (metaBits.length) {
      const meta = document.createElement("div");
      meta.className = "project-detail__meta"; meta.textContent = metaBits.join("  ·  ");
      head.appendChild(meta);
    }
    if (p.description) {
      const desc = document.createElement("p");
      desc.className = "project-detail__desc"; desc.textContent = p.description;
      head.appendChild(desc);
    }
    root.appendChild(head);

    // Vidéo éventuelle (films)
    if (p.video) {
      const vid = document.createElement("div");
      vid.className = "project-detail__video reveal";
      const iframe = document.createElement("iframe");
      iframe.src = p.video; iframe.allow = "fullscreen; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      vid.appendChild(iframe);
      root.appendChild(vid);
    }

    // Images
    const wrap = document.createElement("div");
    wrap.className = "project-detail__images";
    const sources = (p.images && p.images.length) ? p.images : [p.cover];
    sources.forEach(function (src, i) {
      const fig = document.createElement("figure");
      fig.className = "reveal";
      const img = makeImg(src, p.titleEn);
      img.dataset.lbIndex = String(i);
      fig.appendChild(img);
      wrap.appendChild(fig);
    });
    root.appendChild(wrap);

    // Retour
    const back = document.createElement("a");
    back.className = "back-link reveal";
    back.href = DATA.FILMS.indexOf(p) > -1 ? "films.html" : "index.html";
    back.textContent = "← Index";
    root.appendChild(back);

    initReveal();
    initLightbox(wrap, sources, p.titleEn);
  }

  /* ---------- Révélation au scroll ------------------------------ */
  function initReveal() {
    const els = document.querySelectorAll(".reveal:not(.is-watched)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { el.classList.add("is-watched"); io.observe(el); });
  }

  /* ---------- Lightbox ------------------------------------------ */
  function initLightbox(scope, sources, label) {
    const imgs = scope.querySelectorAll("img");
    if (!imgs.length) return;

    const lb = document.createElement("div");
    lb.className = "lb";
    lb.innerHTML =
      '<button class="lb__btn lb__close" aria-label="Fermer">×</button>' +
      '<button class="lb__btn lb__prev" aria-label="Précédent">‹</button>' +
      '<img class="lb__img" alt="">' +
      '<button class="lb__btn lb__next" aria-label="Suivant">›</button>' +
      '<div class="lb__count"></div>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector(".lb__img");
    const lbCount = lb.querySelector(".lb__count");
    let idx = 0;

    function srcFor(i) {
      const real = imgs[i] && imgs[i].getAttribute("src");
      return real || sources[i];
    }
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      lbImg.src = srcFor(idx);
      lbImg.alt = label || "";
      lbCount.textContent = (idx + 1) + " / " + imgs.length;
    }
    function open(i) { show(i); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; }
    function close() { lb.classList.remove("is-open"); document.body.style.overflow = ""; }

    imgs.forEach(function (img, i) {
      img.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lb__close").addEventListener("click", close);
    lb.querySelector(".lb__prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector(".lb__next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lbImg.addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Navigation : actif + menu mobile ------------------ */
  function initNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href === path) a.classList.add("is-active");
    });
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelector(".nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("is-open"); });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("is-open"); });
      });
    }
  }

  /* ---------- Boot ---------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    renderGallery("work-gallery", DATA.WORK, false);
    renderGallery("films-gallery", DATA.FILMS, true);
    renderProject();

    // Page About : remplir depuis les données
    const aboutBio = document.getElementById("about-bio");
    if (aboutBio && DATA.SITE.about) {
      DATA.SITE.about.forEach(function (para) {
        const p = document.createElement("p"); p.textContent = para; aboutBio.appendChild(p);
      });
      const portrait = document.getElementById("about-portrait");
      if (portrait) portrait.appendChild(makeImg(DATA.SITE.portrait, DATA.SITE.name));
      const credit = document.getElementById("about-credit");
      if (credit && DATA.SITE.portraitCredit) credit.textContent = DATA.SITE.portraitCredit;
      const mail = document.getElementById("about-email");
      if (mail && DATA.SITE.email) {
        mail.href = "mailto:" + DATA.SITE.email; mail.textContent = DATA.SITE.email;
      }
      initReveal();
    }
  });
})();
