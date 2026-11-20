/* =========================================================================
   VIDÉOTHÈQUE
   -------------------------------------------------------------------------
   Héberger les vidéos sur YouTube (chaîne officielle de l'académie) de
   préférence : gratuit, rapide, adapté aux mobiles. Mettre la vidéo en
   « publique » ou « non répertoriée », puis copier son identifiant
   (ce qui suit "v=" dans https://www.youtube.com/watch?v=XXXXXXXXXXX).

   Modèle :
   { titre: "", categorie: "entrainements", date: "2026-01-15",
     description: "", youtube: "XXXXXXXXXXX" }
   ou, pour un fichier hébergé ailleurs (MP4) :
   { titre: "", categorie: "matchs", date: "", description: "",
     fichier: "https://…/video.mp4", affiche: "assets/img/…jpg" }

   Vidéo montrant des mineurs : consentement écrit obligatoire.
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.videoCategories = [
  { id: "presentation",  nom: "Présentation de l'académie" },
  { id: "entrainements", nom: "Séances d'entraînement" },
  { id: "matchs",        nom: "Matchs" },
  { id: "interviews",    nom: "Interviews" },
  { id: "reportages",    nom: "Reportages" },
  { id: "evenements",    nom: "Événements" },
  { id: "annonces",      nom: "Publicités et annonces" }
];

EFA.videos = [
  /* Aucune vidéo fournie pour le moment. */
];
