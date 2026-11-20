/* =========================================================================
   GALERIE PHOTOS
   -------------------------------------------------------------------------
   Ajouter une photo : copier le fichier dans assets/img/galerie/ (format
   .webp ou .jpg, 1600 px de large maximum, moins de 400 Ko) puis ajouter
   une ligne ci-dessous.
   Photo d'enfant : uniquement avec consentement écrit du représentant légal
   (consentement: true). Ne jamais associer le nom complet, l'adresse ou
   l'école d'un enfant à sa photo.
   "illustration: true" affiche la mention « Visuel de présentation »
   (pour les visuels de communication qui ne sont pas des photos de terrain).
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.albums = [
  { id: "entrainements", nom: "Entraînements" },
  { id: "matchs",        nom: "Matchs" },
  { id: "tournois",      nom: "Tournois" },
  { id: "joueurs",       nom: "Joueurs" },
  { id: "staff",         nom: "Staff technique" },
  { id: "evenements",    nom: "Événements" },
  { id: "vie",           nom: "Vie de l'académie" }
];

EFA.photos = [
  {
    src: "assets/img/galerie/academie-facade-entree-joueurs.webp",
    titre: "L'entrée de l'académie aux couleurs d'EFA",
    album: "vie", date: "", largeur: 1672, hauteur: 941,
    illustration: true, consentement: null
  },
  {
    src: "assets/img/galerie/academie-facade-terrain.webp",
    titre: "Le bâtiment d'accueil et le terrain",
    album: "vie", date: "", largeur: 1672, hauteur: 941,
    illustration: true, consentement: null
  },
  {
    src: "assets/img/galerie/joueurs-tenue-bleu-blanc.webp",
    titre: "Jeunes joueurs en tenue bleu et blanc",
    album: "joueurs", date: "", largeur: 1214, hauteur: 1296,
    illustration: true, consentement: null
  },
  {
    src: "assets/img/galerie/joueurs-tenue-blanche.webp",
    titre: "Jeunes joueurs en tenue blanche",
    album: "joueurs", date: "", largeur: 1211, hauteur: 1299,
    illustration: true, consentement: null
  },
  {
    src: "assets/img/galerie/staff-entraineur-polo-coach.webp",
    titre: "Encadrement technique",
    album: "staff", date: "", largeur: 1206, hauteur: 1305,
    illustration: true, consentement: null
  },
  {
    src: "assets/img/galerie/staff-entraineur-maillot.webp",
    titre: "Encadrement technique – tenue d'entraînement",
    album: "staff", date: "", largeur: 1199, hauteur: 1312,
    illustration: true, consentement: null
  }
];
