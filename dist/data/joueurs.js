/* =========================================================================
   JOUEURS – fiches publiques
   -------------------------------------------------------------------------
   RÈGLES (protection des mineurs – voir docs/DOCUMENTATION_TECHNIQUE.md) :
   • Ne publier une fiche QUE si le consentement écrit à l'image du
     représentant légal a été signé (champ consentementImage: true).
   • Ne jamais indiquer : adresse, téléphone, établissement scolaire,
     date de naissance complète (l'âge ou l'année suffit), données médicales.
   • Ne rien inventer : laisser vide ("") ou null ce qui n'est pas connu.

   Modèle d'une fiche :
   {
     id: "prenom-nom",            // identifiant unique, sans espace ni accent
     prenom: "", nom: "",
     anneeNaissance: 2012,        // ou null
     categorie: "U13",            // U7, U9, U11, U13, U15, U17 ou U18
     poste: "Milieu de terrain",
     numero: 8,
     pied: "Droit",               // Droit, Gauche ou Les deux
     photo: "assets/img/joueurs/prenom-nom.webp",  // ou ""
     bio: "",
     stats: { matchs: null, buts: null, passes: null },  // null = non disponible
     consentementImage: true,
     demo: false
   }
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.categories = [
  { code: "U7",  age: "6 ans",          groupe: "École de football" },
  { code: "U9",  age: "7 – 8 ans",      groupe: "École de football" },
  { code: "U11", age: "9 – 10 ans",     groupe: "Pré-formation" },
  { code: "U13", age: "11 – 12 ans",    groupe: "Pré-formation / Formation" },
  { code: "U15", age: "13 – 14 ans",    groupe: "Formation" },
  { code: "U17", age: "15 – 16 ans",    groupe: "Espoirs" },
  { code: "U18", age: "17 – 18 ans",    groupe: "Espoirs" }
];

EFA.joueurs = [
  {
    id: "exemple-fiche-joueur",
    prenom: "Prénom",
    nom: "NOM",
    anneeNaissance: null,
    categorie: "U13",
    poste: "Poste à renseigner",
    numero: 0,
    pied: "",
    photo: "",
    bio: "Fiche de démonstration montrant la mise en page. Elle sera remplacée par les vraies fiches des joueurs dès réception des informations et des consentements parentaux.",
    stats: { matchs: null, buts: null, passes: null },
    consentementImage: false,
    demo: true
  }
];
