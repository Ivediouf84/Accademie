/* =========================================================================
   ACTUALITÉS
   -------------------------------------------------------------------------
   Catégories possibles : "annonce", "resultat", "activite", "recrue",
   "evenement", "communique".
   Le contenu accepte des paragraphes : utiliser un tableau de chaînes
   (un élément = un paragraphe). Vidéo facultative : identifiant YouTube.
   Les articles sont triés automatiquement du plus récent au plus ancien.
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.newsCategories = {
  annonce: "Annonce officielle",
  resultat: "Résultat",
  activite: "Activité",
  recrue: "Nouvelle recrue",
  evenement: "Événement",
  communique: "Communiqué"
};

EFA.actualites = [
  {
    id: "exemple-article",
    titre: "Exemple d'article : présentation de la mise en page",
    categorie: "annonce",
    date: "2026-11-20",
    image: "assets/img/galerie/academie-facade-entree-joueurs.webp",
    resume: "Cet article de démonstration montre comment s'affichera une actualité. Il sera remplacé par la première publication officielle de l'académie.",
    contenu: [
      "Ce texte est un contenu de démonstration. Il ne décrit aucun événement réel.",
      "Chaque article comporte un titre, une image, une date, une catégorie, un contenu et, si besoin, une vidéo YouTube intégrée.",
      "Pour publier une actualité, ajoutez une entrée dans le fichier data/actualites.js (voir la documentation technique)."
    ],
    youtube: "",
    demo: true
  }
];
