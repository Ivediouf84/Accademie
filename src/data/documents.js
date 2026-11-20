/* =========================================================================
   BIBLIOTHÈQUE DE DOCUMENTS OFFICIELS
   -------------------------------------------------------------------------
   NIVEAUX D'ACCÈS (champ "acces") :
     "public"       → téléchargeable par tous. Exige un fichier PDF validé
                      par le conseil d'administration dans assets/docs/.
     "sur-demande"  → visible au catalogue, transmis par l'académie sur
                      demande (partenaires, institutions). Aucun fichier en ligne.
     "restreint"    → document interne, médical ou contenant des données
                      personnelles : JAMAIS de fichier sur le site.
   ÉTAT (champ "etat") :
     "valide"       → version officielle approuvée
     "preparation"  → projet de travail existant, en attente de validation
     "a-produire"   → document pas encore rédigé / pas encore obtenu

   IMPORTANT : un document ne devient téléchargeable que si
   acces === "public" ET etat === "valide" ET fichier renseigné.
   Ne jamais déposer dans le site les fichiers de travail Word du dossier
   de projet (ils contiennent des hypothèses et des mentions « À VALIDER »).
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.docCategories = [
  { id: "administratif", nom: "Documents administratifs", icone: "i-building" },
  { id: "sportif",       nom: "Documents sportifs",       icone: "i-ball" },
  { id: "parents",       nom: "Documents destinés aux parents", icone: "i-users" },
  { id: "partenaires",   nom: "Documents partenaires",    icone: "i-handshake" }
];

EFA.documents = [
  /* ---------- Administratifs ---------- */
  { titre: "Statuts de l'association", categorie: "administratif", acces: "public", etat: "preparation",
    description: "Constitution, objet, membres, administration, ressources et dissolution de l'association EFA.",
    source: "D02 – Dossier juridique (projet de statuts)", date: "", fichier: "" },
  { titre: "Règlement intérieur", categorie: "administratif", acces: "public", etat: "preparation",
    description: "Admission, vie à l'académie, sécurité et santé, comportement, discipline, finances.",
    source: "D02 – Dossier juridique (structure)", date: "", fichier: "" },
  { titre: "Récépissé de déclaration de l'association", categorie: "administratif", acces: "public", etat: "a-produire",
    description: "Preuve officielle de l'enregistrement de l'association auprès de l'autorité compétente.",
    source: "Démarche à conduire (D02, démarche n° 1)", date: "", fichier: "" },
  { titre: "Organigramme", categorie: "administratif", acces: "public", etat: "preparation",
    description: "Organisation de la gouvernance, de la direction et de l'encadrement sportif, éducatif et médical.",
    source: "D03 – Dossier gouvernance", date: "", fichier: "" },
  { titre: "Présentation officielle de l'académie", categorie: "administratif", acces: "public", etat: "preparation",
    description: "Projet institutionnel, vision, mission et valeurs d'EFA.",
    source: "D01 – Dossier institutionnel", date: "", fichier: "" },

  /* ---------- Sportifs ---------- */
  { titre: "Projet sportif", categorie: "sportif", acces: "public", etat: "preparation",
    description: "Principes du projet sportif, méthodologie pédagogique, détection et recrutement.",
    source: "D04 – Dossier sportif", date: "", fichier: "" },
  { titre: "Programme de formation", categorie: "sportif", acces: "public", etat: "preparation",
    description: "Contenus techniques, physiques, tactiques et mentaux par catégorie d'âge ; tests d'évaluation.",
    source: "D04 – Dossier sportif ; D05 – Pédagogique", date: "", fichier: "" },
  { titre: "Planning des entraînements", categorie: "sportif", acces: "public", etat: "preparation",
    description: "Volume hebdomadaire par catégorie et semaine type. À aligner sur le calendrier scolaire et fédéral.",
    source: "D04 – Dossier sportif", date: "", fichier: "" },
  { titre: "Charte du joueur", categorie: "sportif", acces: "public", etat: "preparation",
    description: "Engagements du joueur : assiduité, scolarité, tenue, comportement, santé, réseaux sociaux.",
    source: "D06 – Règlement des joueurs", date: "", fichier: "" },
  { titre: "Règlement sportif", categorie: "sportif", acces: "public", etat: "a-produire",
    description: "Règles sportives propres à l'académie (sélections, temps de jeu, compétitions).",
    source: "Non fourni", date: "", fichier: "" },
  { titre: "Fiches individuelles des joueurs", categorie: "sportif", acces: "restreint", etat: "preparation",
    description: "Suivi sportif, scolaire et médical de chaque joueur. Données personnelles de mineurs : consultation réservée à l'encadrement et à la famille concernée.",
    source: "D05 – Fiche de suivi individuel", date: "", fichier: "" },

  /* ---------- Parents ---------- */
  { titre: "Dossier d'inscription", categorie: "parents", acces: "public", etat: "preparation",
    description: "Liste des pièces à fournir et formulaires à compléter pour l'inscription d'un joueur.",
    source: "D06 – Dossier administratif du joueur", date: "", fichier: "" },
  { titre: "Fiche de renseignements", categorie: "parents", acces: "public", etat: "preparation",
    description: "Modèle vierge de fiche d'inscription du joueur et de ses représentants légaux.",
    source: "D06 – Fiche d'inscription (modèle)", date: "", fichier: "" },
  { titre: "Autorisation parentale", categorie: "parents", acces: "public", etat: "preparation",
    description: "Modèle d'autorisation de participation aux activités, aux déplacements et aux soins d'urgence.",
    source: "D06 – Autorisation parentale (modèle)", date: "", fichier: "" },
  { titre: "Consentement à l'utilisation de l'image", categorie: "parents", acces: "public", etat: "a-produire",
    description: "Formulaire distinct de l'autorisation parentale, requis avant toute publication de photo ou de vidéo d'un enfant.",
    source: "Prévu par D06 et D09 – à rédiger", date: "", fichier: "" },
  { titre: "Fiche médicale confidentielle", categorie: "parents", acces: "restreint", etat: "preparation",
    description: "Allergies, traitements, vaccins, antécédents. Remise et restituée en main propre ; jamais diffusée en ligne.",
    source: "D06 – Fiche sanitaire", date: "", fichier: "" },
  { titre: "Règlement applicable aux joueurs", categorie: "parents", acces: "public", etat: "preparation",
    description: "Règles de vie, sanctions et procédure contradictoire, à signer par le joueur et sa famille.",
    source: "D06 – Règlement des joueurs", date: "", fichier: "" },
  { titre: "Charte de protection des enfants", categorie: "parents", acces: "public", etat: "preparation",
    description: "Principes, code de conduite des adultes et procédure de signalement.",
    source: "D06 – Charte de protection des enfants", date: "", fichier: "" },
  { titre: "Informations pratiques", categorie: "parents", acces: "public", etat: "a-produire",
    description: "Horaires, tenue, équipement, transport, contacts utiles.",
    source: "À rédiger", date: "", fichier: "" },

  /* ---------- Partenaires ---------- */
  { titre: "Dossier de sponsoring", categorie: "partenaires", acces: "sur-demande", etat: "preparation",
    description: "Présentation du projet, formules de partenariat et contreparties proposées.",
    source: "D08 – Dossier partenariats", date: "", fichier: "" },
  { titre: "Plaquette de présentation", categorie: "partenaires", acces: "public", etat: "a-produire",
    description: "Présentation synthétique de l'académie pour les entreprises et institutions.",
    source: "À concevoir", date: "", fichier: "" },
  { titre: "Rapport d'activités", categorie: "partenaires", acces: "public", etat: "a-produire",
    description: "Bilan sportif, scolaire, protection, financier et perspectives. Premier rapport prévu à la fin de la première année.",
    source: "D11 – Sommaire du rapport annuel", date: "", fichier: "" },
  { titre: "Projet de développement", categorie: "partenaires", acces: "sur-demande", etat: "preparation",
    description: "Plan stratégique sur cinq ans et indicateurs de suivi.",
    source: "D11 – Dossier pilotage", date: "", fichier: "" },
  { titre: "Budget prévisionnel", categorie: "partenaires", acces: "sur-demande", etat: "preparation",
    description: "Charges, recettes, investissements et plan de financement. Communiqué aux partenaires sur demande, une fois validé.",
    source: "D07 – Dossier financier", date: "", fichier: "" }
];
