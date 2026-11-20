/* =========================================================================
   EFA – Étoile Football Académie · Script principal
   Aucun framework, aucune dépendance externe.
   Les contenus dynamiques sont lus dans les fichiers data/*.js
   (couche « données » remplaçable plus tard par une API / un CMS :
   voir la fonction Store ci-dessous et docs/DOCUMENTATION_TECHNIQUE.md).
   ========================================================================= */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var EFA = window.EFA || {};
  var cfg = EFA.config || {};
  var ICONS = "assets/img/icons.svg";

  /* ---------------------------------------------------------------------
     Couche d'accès aux données (point unique de remplacement futur)
     Aujourd'hui : lecture des tableaux définis dans data/*.js
     Demain : remplacer le corps de chaque fonction par un fetch() vers
     l'API de l'espace administrateur, sans toucher au reste du code.
     --------------------------------------------------------------------- */
  var Store = {
    showDemo: function () { return cfg.afficherDemo !== false; },
    filterDemo: function (list) {
      var show = this.showDemo();
      return (list || []).filter(function (x) { return show || !x.demo; });
    },
    joueurs: function () { return Promise.resolve(this.filterDemo(EFA.joueurs)); },
    staff: function () { return Promise.resolve(EFA.staff || []); },
    dirigeants: function () { return Promise.resolve(EFA.dirigeants || []); },
    photos: function () { return Promise.resolve(EFA.photos || []); },
    albums: function () { return Promise.resolve(EFA.albums || []); },
    videos: function () { return Promise.resolve(EFA.videos || []); },
    actualites: function () {
      var list = this.filterDemo(EFA.actualites).slice();
      list.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
      return Promise.resolve(list);
    },
    documents: function () { return Promise.resolve(EFA.documents || []); },
    partenaires: function () { return Promise.resolve(EFA.partenaires || []); }
  };
  EFA.Store = Store;

  /* ---------------------------------------------------------------------
     Utilitaires
     --------------------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true" focusable="false"><use href="' + ICONS + "#" + id + '"></use></svg>';
  }
  function todo(label) { return '<span class="fill">' + esc(label || "À renseigner") + "</span>"; }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T12:00:00");
    if (isNaN(d)) return esc(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : ""; }, obj);
  }
  function safeUrl(u) {
    u = String(u || "");
    return /^(https?:|mailto:|tel:|assets\/|[a-z0-9-]+\.html)/i.test(u) ? u : "";
  }
  function emptyState(title, text) {
    return '<div class="placeholder empty-state"><strong>' + esc(title) + "</strong>" + esc(text) + "</div>";
  }

  /* ---------------------------------------------------------------------
     En-tête, navigation, bandeau
     --------------------------------------------------------------------- */
  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $(".main-nav");
    var page = document.body.getAttribute("data-page");

    if (page) {
      $$('.main-nav a[data-nav="' + page + '"]').forEach(function (a) { a.setAttribute("aria-current", "page"); });
    }

    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      var tt = $(".to-top");
      if (tt) tt.classList.toggle("is-visible", window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
        toggle.innerHTML = icon(open ? "i-close" : "i-menu");
        document.body.classList.toggle("nav-open", open);
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a") && nav.classList.contains("is-open")) toggle.click();
      });
    }

    var more = $(".nav-more > button");
    if (more) {
      var menu = more.nextElementSibling;
      more.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = menu.classList.toggle("is-open");
        more.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-more")) { menu.classList.remove("is-open"); more.setAttribute("aria-expanded", "false"); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { menu.classList.remove("is-open"); more.setAttribute("aria-expanded", "false"); }
      });
    }

    var tt = $(".to-top");
    if (tt) tt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    if (cfg.bandeau) {
      var b = document.createElement("div");
      b.className = "build-banner";
      b.setAttribute("role", "note");
      b.textContent = cfg.bandeau;
      var skip = $(".skip-link"); document.body.insertBefore(b, skip ? skip.nextSibling : document.body.firstChild);
    }
  }

  /* ---------------------------------------------------------------------
     Coordonnées et réseaux (lus dans data/config.js)
     --------------------------------------------------------------------- */
  function initContacts() {
    var c = cfg.contact || {};
    var tel = (c.telephone || "").trim();
    var wa = (c.whatsapp || "").replace(/\D/g, "");
    var mail = (c.email || "").trim();
    var addr = [cfg.adresseComplete || "", cfg.adresseComplete ? "" : (cfg.ville || "Patar") + ", " + (cfg.pays || "Sénégal")].filter(Boolean).join("");

    $$("[data-contact]").forEach(function (elx) {
      var k = elx.getAttribute("data-contact");
      var html = "";
      if (k === "telephone") html = tel ? '<a href="tel:' + esc(tel.replace(/\s/g, "")) + '">' + esc(tel) + "</a>" : todo("Numéro à renseigner");
      if (k === "whatsapp") html = wa ? '<a href="https://wa.me/' + wa + '" target="_blank" rel="noopener">Écrire sur WhatsApp</a>' : todo("Numéro WhatsApp à renseigner");
      if (k === "email") html = mail ? '<a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a>" : todo("Adresse e-mail à renseigner");
      if (k === "adresse") html = esc(addr);
      if (k === "horaires") html = c.horaires ? esc(c.horaires) : todo("Horaires à renseigner");
      elx.innerHTML = html;
    });

    var r = cfg.reseaux || {};
    var names = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" };
    $$("[data-socials]").forEach(function (box) {
      var html = "";
      Object.keys(names).forEach(function (k) {
        var u = safeUrl(r[k]);
        if (u) html += '<a href="' + esc(u) + '" target="_blank" rel="noopener" aria-label="' + names[k] + '">' + icon("i-" + k) + "</a>";
      });
      box.innerHTML = html || '<span class="small">Réseaux sociaux : liens à renseigner.</span>';
    });

    if (wa) {
      var a = document.createElement("a");
      a.className = "wa-float";
      a.href = "https://wa.me/" + wa;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Contacter l'académie sur WhatsApp");
      a.innerHTML = icon("i-whatsapp");
      document.body.appendChild(a);
    }

    $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------------------
     Animations d'apparition
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.08 });
    items.forEach(function (i) { io.observe(i); });
  }
  function revealNew(ctx) {
    $$(".reveal:not(.is-visible)", ctx).forEach(function (i) { i.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------------------
     Visionneuse plein écran (galerie)
     --------------------------------------------------------------------- */
  var Lightbox = (function () {
    var box, img, cap, counter, items = [], index = 0, lastFocus = null, touchX = null;

    function build() {
      box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Visionneuse de photos");
      box.innerHTML =
        '<span class="lightbox__counter"></span>' +
        '<button class="lightbox__btn lightbox__close" type="button" aria-label="Fermer">' + icon("i-close") + "</button>" +
        '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Photo précédente">' + icon("i-chev-left") + "</button>" +
        '<figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__cap"></figcaption></figure>' +
        '<button class="lightbox__btn lightbox__next" type="button" aria-label="Photo suivante">' + icon("i-chev-right") + "</button>";
      document.body.appendChild(box);
      img = $(".lightbox__img", box);
      cap = $(".lightbox__cap", box);
      counter = $(".lightbox__counter", box);
      $(".lightbox__close", box).addEventListener("click", close);
      $(".lightbox__prev", box).addEventListener("click", function () { go(-1); });
      $(".lightbox__next", box).addEventListener("click", function () { go(1); });
      box.addEventListener("click", function (e) { if (e.target === box) close(); });
      box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      box.addEventListener("touchend", function (e) {
        if (touchX == null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX = null;
      });
      document.addEventListener("keydown", function (e) {
        if (!box.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
        if (e.key === "Tab") { // piège du focus dans la visionneuse
          var f = $$("button", box), first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
    function show() {
      var p = items[index];
      img.src = p.src;
      img.alt = p.titre || "";
      cap.innerHTML = esc(p.titre || "") + (p.illustration ? "<small>Visuel de présentation</small>" : "") + (p.date ? "<small>" + fmtDate(p.date) + "</small>" : "");
      counter.textContent = (index + 1) + " / " + items.length;
      var single = items.length < 2;
      $(".lightbox__prev", box).hidden = single;
      $(".lightbox__next", box).hidden = single;
      [index - 1, index + 1].forEach(function (i) { // préchargement
        var n = items[(i + items.length) % items.length];
        if (n) { var pre = new Image(); pre.src = n.src; }
      });
    }
    function open(list, i) {
      if (!box) build();
      items = list; index = i || 0; lastFocus = document.activeElement;
      show();
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".lightbox__close", box).focus();
    }
    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    function go(step) { index = (index + step + items.length) % items.length; show(); }
    return { open: open };
  })();

  function galleryItemHTML(p, i) {
    return '<button type="button" class="gallery-item reveal" data-index="' + i + '" aria-label="Agrandir : ' + esc(p.titre) + '">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.titre) + '" loading="lazy" decoding="async"' +
      (p.largeur ? ' width="' + p.largeur + '" height="' + p.hauteur + '"' : "") + ">" +
      '<span class="gallery-item__cap">' + esc(p.titre) + "</span></button>";
  }
  function bindGallery(container, list) {
    container.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery-item");
      if (b) Lightbox.open(list, parseInt(b.getAttribute("data-index"), 10));
    });
  }

  /* ---------------------------------------------------------------------
     Vidéos (chargement YouTube au clic : plus rapide et plus respectueux
     de la vie privée, domaine youtube-nocookie.com)
     --------------------------------------------------------------------- */
  function videoCardHTML(v, cats) {
    var catName = (cats.filter(function (c) { return c.id === v.categorie; })[0] || {}).nom || "";
    var media;
    if (v.youtube) {
      var id = String(v.youtube).replace(/[^\w-]/g, "");
      media = '<button type="button" class="video-facade" data-yt="' + id + '" aria-label="Lire la vidéo : ' + esc(v.titre) + '">' +
        '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy">' +
        '<span class="play">' + icon("i-play") + "</span></button>";
    } else if (v.fichier) {
      media = '<video controls preload="none"' + (v.affiche ? ' poster="' + esc(v.affiche) + '"' : "") + '><source src="' + esc(safeUrl(v.fichier)) + '" type="video/mp4">Votre navigateur ne lit pas cette vidéo.</video>';
    } else {
      media = "";
    }
    return '<article class="card video-card reveal"><div class="video-frame">' + media + "</div>" +
      '<div class="video-card__body"><div class="news-card__meta"><span class="news-card__cat">' + esc(catName) + "</span>" +
      (v.date ? "<span>" + fmtDate(v.date) + "</span>" : "") + "</div><h3>" + esc(v.titre) + "</h3>" +
      (v.description ? "<p>" + esc(v.description) + "</p>" : "") + "</div></article>";
  }
  function bindVideos(container) {
    container.addEventListener("click", function (e) {
      var f = e.target.closest(".video-facade");
      if (!f) return;
      var id = f.getAttribute("data-yt");
      var ifr = document.createElement("iframe");
      ifr.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      ifr.title = f.getAttribute("aria-label");
      ifr.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      ifr.allowFullscreen = true;
      f.replaceWith(ifr);
    });
  }

  /* ---------------------------------------------------------------------
     Actualités
     --------------------------------------------------------------------- */
  function newsCardHTML(a) {
    var cat = (EFA.newsCategories || {})[a.categorie] || "";
    return '<a class="card news-card reveal" href="article.html?id=' + encodeURIComponent(a.id) + '">' +
      '<div class="news-card__img">' + (a.image ? '<img src="' + esc(a.image) + '" alt="" loading="lazy" decoding="async">' : "") +
      (a.demo ? '<span class="tag tag--demo">Contenu de démonstration</span>' : "") + "</div>" +
      '<div class="news-card__body"><div class="news-card__meta"><span class="news-card__cat">' + esc(cat) + "</span>" +
      (a.date ? '<time datetime="' + esc(a.date) + '">' + fmtDate(a.date) + "</time>" : "") + "</div>" +
      "<h3>" + esc(a.titre) + "</h3><p>" + esc(a.resume || "") + "</p>" +
      '<span class="news-card__more">Lire l\'article →</span></div></a>';
  }

  /* ---------------------------------------------------------------------
     ACCUEIL
     --------------------------------------------------------------------- */
  function initHome() {
    var news = $("#home-news");
    if (news) Store.actualites().then(function (list) {
      news.innerHTML = list.length ? list.slice(0, 3).map(newsCardHTML).join("") :
        emptyState("Actualités à venir", "Les premières actualités de l'académie seront publiées ici.");
      revealNew(news);
    });
    var gal = $("#home-gallery");
    if (gal) Store.photos().then(function (list) {
      var sel = list.slice(0, 5);
      gal.innerHTML = sel.length ? sel.map(galleryItemHTML).join("") : emptyState("Galerie en préparation", "");
      bindGallery(gal, sel);
      revealNew(gal);
    });
    var vid = $("#home-videos");
    if (vid) Store.videos().then(function (list) {
      vid.innerHTML = list.length ? list.slice(0, 3).map(function (v) { return videoCardHTML(v, EFA.videoCategories || []); }).join("") :
        emptyState("Vidéos à venir", "Présentation de l'académie, séances d'entraînement et matchs seront bientôt en ligne.");
      bindVideos(vid);
      revealNew(vid);
    });
  }

  /* ---------------------------------------------------------------------
     JOUEURS
     --------------------------------------------------------------------- */
  function initPlayers() {
    var grid = $("#players-grid");
    if (!grid) return;
    var filters = $("#players-filters");
    var count = $("#players-count");
    var search = $("#players-search");
    var current = "all";
    var all = [];

    var cats = EFA.categories || [];
    filters.innerHTML = '<button type="button" class="filter-btn" data-cat="all" aria-pressed="true">Tous</button>' +
      cats.map(function (c) { return '<button type="button" class="filter-btn" data-cat="' + c.code + '" aria-pressed="false" title="' + esc(c.age) + '">' + c.code + "</button>"; }).join("");

    function card(p) {
      var name = [p.prenom, p.nom].filter(Boolean).join(" ");
      var age = p.anneeNaissance ? (new Date().getFullYear() - p.anneeNaissance) + " ans (né en " + p.anneeNaissance + ")" : "";
      var s = p.stats || {};
      var hasStats = s.matchs != null || s.buts != null || s.passes != null;
      var showPhoto = p.photo && p.consentementImage;
      return '<article class="card person-card reveal">' +
        '<div class="person-card__photo">' +
        (showPhoto ? '<img src="' + esc(p.photo) + '" alt="Photo de ' + esc(name) + '" loading="lazy">' : '<div class="no-photo">' + icon("i-user") + "</div>") +
        '<div class="person-card__tags"><span class="tag tag--public">' + esc(p.categorie) + "</span>" + (p.demo ? '<span class="tag tag--demo">Démonstration</span>' : "") + "</div>" +
        (p.numero ? '<span class="person-card__num">' + esc(p.numero) + "</span>" : "") + "</div>" +
        '<div class="person-card__body"><span class="person-card__role">' + esc(p.poste || "Poste à renseigner") + "</span>" +
        "<h3>" + esc(name || "Nom à renseigner") + "</h3>" +
        '<dl class="person-card__meta"><div><dt>Âge</dt><dd>' + (age || "—") + "</dd></div>" +
        "<div><dt>Pied fort</dt><dd>" + esc(p.pied || "—") + "</dd></div>" +
        "<div><dt>Catégorie</dt><dd>" + esc(p.categorie) + "</dd></div>" +
        "<div><dt>Numéro</dt><dd>" + (p.numero ? esc(p.numero) : "—") + "</dd></div></dl>" +
        (p.bio ? '<p class="person-card__bio">' + esc(p.bio) + "</p>" : "") +
        (hasStats ? '<div class="person-card__stats"><div><b>' + (s.matchs != null ? s.matchs : "—") + "</b><span>Matchs</span></div><div><b>" +
          (s.buts != null ? s.buts : "—") + "</b><span>Buts</span></div><div><b>" + (s.passes != null ? s.passes : "—") + "</b><span>Passes déc.</span></div></div>" : "") +
        "</div></article>";
    }
    function render() {
      var q = (search && search.value || "").toLowerCase().trim();
      var list = all.filter(function (p) {
        var okCat = current === "all" || p.categorie === current;
        var okQ = !q || [p.prenom, p.nom, p.poste].join(" ").toLowerCase().indexOf(q) > -1;
        return okCat && okQ;
      });
      var real = list.filter(function (p) { return !p.demo; }).length;
      count.textContent = real + " joueur" + (real > 1 ? "s" : "") + " publié" + (real > 1 ? "s" : "");
      grid.innerHTML = list.length ? list.map(card).join("") :
        emptyState("Aucune fiche publiée dans cette catégorie", "Les fiches des joueurs seront publiées après réception des informations et des autorisations parentales.");
      revealNew(grid);
    }
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter-btn");
      if (!b) return;
      current = b.getAttribute("data-cat");
      $$(".filter-btn", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });
    if (search) search.addEventListener("input", render);
    Store.joueurs().then(function (list) {
      all = list.slice().sort(function (a, b) { return (a.numero || 99) - (b.numero || 99); });
      render();
    });
  }

  /* ---------------------------------------------------------------------
     STAFF
     --------------------------------------------------------------------- */
  function initStaff() {
    var grid = $("#staff-grid");
    if (grid) Store.staff().then(function (list) {
      grid.innerHTML = list.map(function (s) {
        var name = [s.prenom, s.nom].filter(Boolean).join(" ");
        return '<article class="card person-card reveal"><div class="person-card__photo">' +
          (s.photo ? '<img src="' + esc(s.photo) + '" alt="' + esc(name || s.fonction) + '" loading="lazy">' : '<div class="no-photo">' + icon("i-whistle") + "</div>") +
          (name ? "" : '<div class="person-card__tags"><span class="tag tag--todo">Nom à renseigner</span></div>') + "</div>" +
          '<div class="person-card__body"><span class="person-card__role">' + esc(s.fonction) + "</span>" +
          "<h3>" + (name ? esc(name) : todo("Nom et prénom à renseigner")) + "</h3>" +
          (s.mission ? '<p class="person-card__bio"><b>Mission :</b> ' + esc(s.mission) + "</p>" : "") +
          '<p class="person-card__bio"><b>Diplômes et qualifications :</b> ' + (s.diplomes ? esc(s.diplomes) : todo()) + "</p>" +
          '<p class="person-card__bio"><b>Expérience :</b> ' + (s.experience ? esc(s.experience) : todo()) + "</p>" +
          (s.presentation ? '<p class="person-card__bio">' + esc(s.presentation) + "</p>" : "") +
          '<p class="person-card__bio small"><b>Profil requis (fiche de poste) :</b> ' + esc(s.profil || "") + "</p>" +
          (s.note ? '<p class="person-card__bio small fill">' + esc(s.note) + "</p>" : "") +
          "</div></article>";
      }).join("");
      revealNew(grid);
    });
    var leaders = $("#leaders-list");
    if (leaders) Store.dirigeants().then(function (list) {
      leaders.innerHTML = list.map(function (d) {
        return '<div class="card card--flat reveal"><div class="icon-badge">' + icon("i-user") + '</div><span class="person-card__role">' + esc(d.fonction) +
          "</span><h3>" + (d.nom ? esc(d.nom) : todo("Nom à renseigner")) + "</h3></div>";
      }).join("");
      revealNew(leaders);
    });
  }

  /* ---------------------------------------------------------------------
     GALERIE
     --------------------------------------------------------------------- */
  function initGallery() {
    var grid = $("#gallery-grid");
    if (!grid) return;
    var tabs = $("#album-tabs");
    Promise.all([Store.photos(), Store.albums()]).then(function (r) {
      var photos = r[0], albums = r[1], current = "all", shown = [];
      function countFor(id) { return photos.filter(function (p) { return p.album === id; }).length; }
      tabs.innerHTML = '<button type="button" class="filter-btn" data-album="all" aria-pressed="true">Toutes <span class="count">' + photos.length + "</span></button>" +
        albums.map(function (a) { return '<button type="button" class="filter-btn" data-album="' + a.id + '" aria-pressed="false">' + esc(a.nom) + ' <span class="count">' + countFor(a.id) + "</span></button>"; }).join("");
      function render() {
        shown = current === "all" ? photos : photos.filter(function (p) { return p.album === current; });
        grid.innerHTML = shown.length ? shown.map(galleryItemHTML).join("") :
          emptyState("Album en préparation", "Les photos de cet album seront ajoutées prochainement.");
        revealNew(grid);
      }
      tabs.addEventListener("click", function (e) {
        var b = e.target.closest(".filter-btn");
        if (!b) return;
        current = b.getAttribute("data-album");
        $$(".filter-btn", tabs).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        render();
      });
      grid.addEventListener("click", function (e) {
        var b = e.target.closest(".gallery-item");
        if (b) Lightbox.open(shown, parseInt(b.getAttribute("data-index"), 10));
      });
      render();
    });
  }

  /* ---------------------------------------------------------------------
     VIDÉOTHÈQUE
     --------------------------------------------------------------------- */
  function initVideos() {
    var grid = $("#videos-grid");
    if (!grid) return;
    var filters = $("#video-filters");
    var cats = EFA.videoCategories || [];
    Store.videos().then(function (list) {
      var current = "all";
      filters.innerHTML = '<button type="button" class="filter-btn" data-cat="all" aria-pressed="true">Toutes</button>' +
        cats.map(function (c) { return '<button type="button" class="filter-btn" data-cat="' + c.id + '" aria-pressed="false">' + esc(c.nom) + "</button>"; }).join("");
      function render() {
        var l = current === "all" ? list : list.filter(function (v) { return v.categorie === current; });
        grid.innerHTML = l.length ? l.map(function (v) { return videoCardHTML(v, cats); }).join("") :
          emptyState("Aucune vidéo pour le moment", "Les vidéos de l'académie (présentation, entraînements, matchs, interviews…) seront publiées ici.");
        revealNew(grid);
      }
      filters.addEventListener("click", function (e) {
        var b = e.target.closest(".filter-btn");
        if (!b) return;
        current = b.getAttribute("data-cat");
        $$(".filter-btn", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        render();
      });
      bindVideos(grid);
      render();
    });
  }

  /* ---------------------------------------------------------------------
     ACTUALITÉS (liste + article)
     --------------------------------------------------------------------- */
  function initNews() {
    var grid = $("#news-grid");
    if (grid) {
      var filters = $("#news-filters");
      var cats = EFA.newsCategories || {};
      Store.actualites().then(function (list) {
        var current = "all";
        filters.innerHTML = '<button type="button" class="filter-btn" data-cat="all" aria-pressed="true">Toutes</button>' +
          Object.keys(cats).map(function (k) { return '<button type="button" class="filter-btn" data-cat="' + k + '" aria-pressed="false">' + esc(cats[k]) + "</button>"; }).join("");
        function render() {
          var l = current === "all" ? list : list.filter(function (a) { return a.categorie === current; });
          grid.innerHTML = l.length ? l.map(newsCardHTML).join("") : emptyState("Aucune actualité dans cette rubrique", "");
          revealNew(grid);
        }
        filters.addEventListener("click", function (e) {
          var b = e.target.closest(".filter-btn");
          if (!b) return;
          current = b.getAttribute("data-cat");
          $$(".filter-btn", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          render();
        });
        render();
      });
    }

    var art = $("#article");
    if (art) {
      var id = new URLSearchParams(location.search).get("id");
      Store.actualites().then(function (list) {
        var a = list.filter(function (x) { return x.id === id; })[0];
        if (!a) {
          art.innerHTML = emptyState("Article introuvable", "Cet article n'existe pas ou a été retiré.") +
            '<p class="center-btn"><a class="btn btn--primary" href="actualites.html">Toutes les actualités</a></p>';
          return;
        }
        var cat = (EFA.newsCategories || {})[a.categorie] || "";
        document.title = a.titre + " | EFA – Étoile Football Académie";
        var h1 = $("#article-title");
        if (h1) h1.textContent = a.titre;
        var meta = $("#article-meta");
        if (meta) meta.textContent = cat + (a.date ? " · " + new Date(a.date + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "");
        var yt = a.youtube ? String(a.youtube).replace(/[^\w-]/g, "") : "";
        art.innerHTML =
          (a.demo ? '<div class="notice notice--warn mb-2">' + icon("i-alert") + "<p><b>Contenu de démonstration.</b> Cet article ne décrit aucun événement réel et sera remplacé.</p></div>" : "") +
          (a.image ? '<div class="article__cover"><img src="' + esc(a.image) + '" alt=""></div>' : "") +
          '<div class="article__body">' + (a.contenu || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
          (yt ? '<div class="card video-card mt-2"><div class="video-frame"><button type="button" class="video-facade" data-yt="' + yt + '" aria-label="Lire la vidéo"><img src="https://i.ytimg.com/vi/' + yt + '/hqdefault.jpg" alt="" loading="lazy"><span class="play">' + icon("i-play") + "</span></button></div></div>" : "") +
          '<p class="mt-3"><a class="btn btn--outline btn--sm" href="actualites.html">← Toutes les actualités</a></p>';
        bindVideos(art);
      });
    }
  }

  /* ---------------------------------------------------------------------
     DOCUMENTS OFFICIELS
     --------------------------------------------------------------------- */
  function initDocuments() {
    var lib = $("#docs-library");
    if (!lib) return;
    var ACCES = {
      "public": ['<span class="tag tag--public">Diffusion publique</span>'],
      "sur-demande": ['<span class="tag tag--request">Sur demande</span>'],
      "restreint": ['<span class="tag tag--restricted">' + "Accès restreint</span>"]
    };
    var ETAT = {
      "valide": '<span class="tag tag--public">Version officielle</span>',
      "preparation": '<span class="tag tag--draft">En cours de validation</span>',
      "a-produire": '<span class="tag tag--todo">À venir</span>'
    };
    var viewer = null;
    function openPdf(url, title) {
      if (!viewer) {
        viewer = document.createElement("div");
        viewer.className = "pdf-viewer";
        viewer.setAttribute("role", "dialog");
        viewer.setAttribute("aria-modal", "true");
        viewer.innerHTML = '<div class="pdf-viewer__bar"><strong></strong><button type="button" class="lightbox__btn lightbox__btn--static" aria-label="Fermer l\'aperçu">' + icon("i-close") + "</button></div><iframe title=\"Aperçu du document\"></iframe>";
        document.body.appendChild(viewer);
        $("button", viewer).addEventListener("click", function () { viewer.classList.remove("is-open"); $("iframe", viewer).src = "about:blank"; document.body.style.overflow = ""; });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape" && viewer.classList.contains("is-open")) $("button", viewer).click(); });
      }
      $("strong", viewer).textContent = title;
      $("iframe", viewer).src = url;
      viewer.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $("button", viewer).focus();
    }

    Store.documents().then(function (docs) {
      var cats = EFA.docCategories || [];
      lib.innerHTML = cats.map(function (c) {
        var list = docs.filter(function (d) { return d.categorie === c.id; });
        return '<section class="doc-section" id="docs-' + c.id + '"><h2>' + icon(c.icone) + esc(c.nom) + '</h2><div class="grid grid--3">' +
          list.map(function (d) {
            var file = safeUrl(d.fichier);
            var downloadable = d.acces === "public" && d.etat === "valide" && file;
            var actions;
            if (downloadable) {
              actions = '<button type="button" class="btn btn--outline btn--sm" data-preview="' + esc(file) + '" data-title="' + esc(d.titre) + '">' + icon("i-eye") + "Aperçu</button>" +
                '<a class="btn btn--primary btn--sm" href="' + esc(file) + '" download>' + icon("i-download") + "Télécharger</a>";
            } else if (d.acces === "restreint") {
              actions = '<span class="small muted">' + icon("i-lock", "") + " Jamais publié en ligne. Remis directement aux personnes concernées.</span>";
            } else if (d.acces === "sur-demande") {
              actions = '<a class="btn btn--outline btn--sm" href="partenaires.html#contact-partenaire">Demander le document</a>';
            } else {
              actions = '<button type="button" class="btn btn--sm btn--outline" disabled>' + icon("i-download") + "Bientôt disponible</button>";
            }
            return '<article class="card doc-card reveal"><div class="doc-card__head"><div class="doc-card__icon">' + icon(d.acces === "restreint" ? "i-lock" : "i-file") + "</div>" +
              "<div><h3>" + esc(d.titre) + "</h3><p>" + esc(d.description) + "</p></div></div>" +
              '<div class="doc-card__meta">' + ACCES[d.acces] + (ETAT[d.etat] || "") + "<span>· " + (d.date ? "Publié le " + fmtDate(d.date) : "Date de publication : —") + "</span></div>" +
              '<div class="doc-card__actions">' + actions + "</div></article>";
          }).join("") + "</div></section>";
      }).join("");
      lib.addEventListener("click", function (e) {
        var b = e.target.closest("[data-preview]");
        if (b) openPdf(b.getAttribute("data-preview"), b.getAttribute("data-title"));
      });
      revealNew(lib);
    });
  }

  /* ---------------------------------------------------------------------
     PARTENAIRES
     --------------------------------------------------------------------- */
  function initPartners() {
    var logos = $("#partners-logos");
    if (logos) Store.partenaires().then(function (list) {
      var html = list.map(function (p) {
        var inner = p.logo ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.nom) + '" loading="lazy">' : "<b>" + esc(p.nom) + "</b>";
        var u = safeUrl(p.site);
        return u ? '<a class="partner-logo" href="' + esc(u) + '" target="_blank" rel="noopener">' + inner + "</a>" : '<div class="partner-logo">' + inner + "</div>";
      }).join("");
      for (var i = list.length; i < 4; i++) html += '<div class="partner-logo partner-logo--empty">Votre logo ici<br>Devenez partenaire</div>';
      logos.innerHTML = html;
    });
    var tiers = $("#partner-tiers");
    if (tiers) {
      tiers.innerHTML = (EFA.formules || []).map(function (f) {
        return '<article class="card tier reveal' + (f.phare ? " tier--featured" : "") + '"><span class="tier__name">' + esc(f.nom) + "</span>" +
          '<ul class="check-list small">' + f.contreparties.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" +
          '<p class="small muted mt-1 mb-0">Montant : communiqué sur demande</p></article>';
      }).join("");
    }
  }

  /* ---------------------------------------------------------------------
     CARTE (OpenStreetMap, chargée seulement si les coordonnées existent)
     --------------------------------------------------------------------- */
  function initMap() {
    var box = $("#map");
    if (!box) return;
    var m = cfg.carte || {};
    var lat = parseFloat(m.latitude), lon = parseFloat(m.longitude);
    if (isNaN(lat) || isNaN(lon)) return; // l'espace réservé HTML reste affiché
    var d = 0.006;
    var src = "https://www.openstreetmap.org/export/embed.html?bbox=" + (lon - d) + "%2C" + (lat - d) + "%2C" + (lon + d) + "%2C" + (lat + d) + "&layer=mapnik&marker=" + lat + "%2C" + lon;
    box.innerHTML = '<iframe src="' + src + '" title="Localisation de l\'académie EFA" loading="lazy"></iframe>';
    var link = $("#map-link");
    if (link) { link.href = "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "#map=17/" + lat + "/" + lon; link.hidden = false; }
  }

  /* ---------------------------------------------------------------------
     FORMULAIRES (préinscription, contact, partenariat)
     --------------------------------------------------------------------- */
  function initForms() {
    $$("form[data-form]").forEach(function (form) {
      var type = form.getAttribute("data-form");
      var status = $(".form-status", form);
      var started = Date.now();
      var fc = cfg.formulaires || {};
      var provider = fc.fournisseur || "none";

      if (provider === "none" && status) {
        showStatus("info", "Information : l'envoi en ligne n'est pas encore activé. En attendant, contactez directement l'académie (coordonnées en bas de page). Aucune donnée saisie ici n'est transmise.");
      }

      // Calcul automatique de la catégorie à partir de la date de naissance
      var dob = $('input[name="date_naissance"]', form);
      var catOut = $("#categorie-estimee", form);
      if (dob && catOut) {
        dob.addEventListener("change", function () {
          var y = parseInt((dob.value || "").slice(0, 4), 10);
          if (!y) { catOut.textContent = ""; return; }
          var now = new Date();
          var season = now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear(); // saison sportive se terminant l'année suivante
          var age = season - y;
          var cat = age <= 6 ? "U7" : age <= 8 ? "U9" : age <= 10 ? "U11" : age <= 12 ? "U13" : age <= 14 ? "U15" : age <= 16 ? "U17" : "U18";
          var realAge = now.getFullYear() - y;
          if (realAge < 5 || realAge > 18) {
            catOut.textContent = "L'académie accueille les jeunes de 6 à 18 ans.";
          } else {
            catOut.textContent = "Catégorie indicative : " + cat + " (confirmée par l'académie après les tests).";
          }
        });
      }

      function showStatus(kind, msg) {
        if (!status) return;
        status.className = "form-status form-status--" + kind + " is-visible";
        status.textContent = msg;
      }
      function validate() {
        var ok = true, firstBad = null;
        $$(".field, .consent", form).forEach(function (f) { f.classList.remove("has-error"); });
        $$("input:not([type=hidden]):not([name=site_web]), select, textarea", form).forEach(function (inp) {
          var wrap = inp.closest(".field") || inp.closest(".consent");
          var bad;
          if (inp.required) bad = inp.type === "checkbox" ? !inp.checked : !inp.value.trim() || !inp.checkValidity();
          else bad = !!inp.value && !inp.checkValidity(); // champ facultatif mais mal rempli
          if (inp.type === "tel" && inp.value && !/^[+0-9 ().-]{8,20}$/.test(inp.value)) bad = true;
          if (bad) { ok = false; if (wrap) wrap.classList.add("has-error"); if (!firstBad) firstBad = inp; }
        });
        if (dob && dob.value) {
          var y = parseInt(dob.value.slice(0, 4), 10), age = new Date().getFullYear() - y;
          if (age < 5 || age > 19) { ok = false; dob.closest(".field").classList.add("has-error"); if (!firstBad) firstBad = dob; }
        }
        if (firstBad) firstBad.focus();
        return ok;
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validate()) { showStatus("err", "Merci de vérifier les champs signalés en rouge."); return; }
        // Anti-spam : champ piège + délai minimum de saisie
        var hp = $('input[name="site_web"]', form);
        if ((hp && hp.value) || Date.now() - started < 3000) { showStatus("ok", "Merci, votre message a bien été pris en compte."); form.reset(); return; }

        if (provider === "none") {
          showStatus("info", "L'envoi en ligne n'est pas encore activé : votre demande n'a pas été transmise. Merci de contacter directement l'académie par téléphone, WhatsApp ou e-mail.");
          return;
        }
        var btn = $('button[type="submit"]', form);
        if (btn) { btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.textContent = "Envoi en cours…"; }
        var data = new FormData(form);
        data.delete("site_web");
        var req;
        if (provider === "netlify") {
          data.set("form-name", form.getAttribute("name"));
          req = fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
        } else {
          var url = (fc.endpoints || {})[type];
          if (!url) { showStatus("err", "Adresse d'envoi non configurée pour ce formulaire."); restore(); return; }
          req = fetch(url, { method: "POST", body: data, headers: { Accept: "application/json" } });
        }
        req.then(function (r) {
          if (!r.ok) throw new Error(r.status);
          showStatus("ok", type === "preinscription"
            ? "Merci ! Votre demande de préinscription a bien été envoyée. L'académie vous recontactera pour la suite de la procédure."
            : "Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.");
          form.reset();
          if (catOut) catOut.textContent = "";
        }).catch(function () {
          showStatus("err", "L'envoi a échoué. Vérifiez votre connexion ou contactez directement l'académie.");
        }).then(restore);
        function restore() { if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.label; } }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Démarrage
     --------------------------------------------------------------------- */
  function start() {
    initHeader();
    initContacts();
    initHome();
    initPlayers();
    initStaff();
    initGallery();
    initVideos();
    initNews();
    initDocuments();
    initPartners();
    initMap();
    initForms();
    initReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
