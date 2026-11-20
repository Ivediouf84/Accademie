/* =========================================================================
   STAFF TECHNIQUE ET ENCADREMENT
   -------------------------------------------------------------------------
   Les fonctions ci-dessous proviennent de l'organigramme (dossier D03 –
   Gouvernance). Les noms, diplômes et expériences ne sont pas encore
   connus : ils restent vides et le site affiche « À renseigner ».
   « profil » = profil requis par la fiche de poste (et non le diplôme
   effectif de la personne). Renseigner « diplomes » une fois vérifiés.
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.staff = [
  {
    id: "entraineur-photo-fournie",
    prenom: "", nom: "",
    fonction: "Entraîneur",
    photo: "assets/img/galerie/staff-entraineur-polo-coach.webp",
    diplomes: "",
    experience: "",
    presentation: "",
    profil: "Diplôme d'entraîneur (niveau à confirmer avec la FSF) ; expérience avec les jeunes ; pédagogie ; connaissance des règles de protection des mineurs.",
    note: "Photo fournie par l'académie. Nom, fonction exacte et parcours à confirmer."
  },
  {
    id: "directeur-technique",
    prenom: "", nom: "",
    fonction: "Directeur(trice) technique",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Diplôme d'entraîneur reconnu (niveau à confirmer avec la FSF) ; expérience de formation de jeunes ; expérience de gestion d'équipe.",
    mission: "Piloter le projet sportif et éducatif, encadrer l'équipe technique et garantir la sécurité des jeunes."
  },
  {
    id: "entraineurs-groupes",
    prenom: "", nom: "",
    fonction: "Entraîneurs des groupes d'âge (4)",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Diplôme d'entraîneur (à confirmer) ; expérience avec les jeunes ; pédagogie.",
    mission: "Conduire les entraînements et les matchs du groupe d'âge, suivre individuellement chaque joueur."
  },
  {
    id: "preparateur-physique",
    prenom: "", nom: "",
    fonction: "Préparateur physique",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Formation en préparation physique ou STAPS ; expérience en football de jeunes.",
    mission: "Concevoir et suivre une préparation physique adaptée à l'âge et à la maturation des joueurs."
  },
  {
    id: "coordinateur-scolaire",
    prenom: "", nom: "",
    fonction: "Coordinateur(trice) scolaire et suivi éducatif",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Diplôme dans le domaine de l'éducation ou du suivi social.",
    mission: "Assurer la réussite scolaire et le bien-être des jeunes, en lien avec les établissements et les familles."
  },
  {
    id: "soignant",
    prenom: "", nom: "",
    fonction: "Infirmier(ère) / soignant(e)",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Diplôme d'infirmier ou de soignant reconnu.",
    mission: "Veiller à la santé des joueurs : visites, premiers secours, suivi des blessures."
  },
  {
    id: "raf",
    prenom: "", nom: "",
    fonction: "Responsable administratif et financier",
    photo: "",
    diplomes: "", experience: "", presentation: "",
    profil: "Formation comptable ou en gestion ; rigueur.",
    mission: "Tenir la comptabilité, la trésorerie, les dossiers administratifs et les obligations légales."
  }
];

/* Bureau de l'association (statuts, titre III) – noms à compléter */
EFA.dirigeants = [
  { fonction: "Président(e)", nom: "" },
  { fonction: "Secrétaire général(e)", nom: "" },
  { fonction: "Trésorier(ère)", nom: "" },
  { fonction: "Directeur(trice) technique", nom: "" }
];
