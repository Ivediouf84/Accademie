/* =========================================================================
   PARTENAIRES
   -------------------------------------------------------------------------
   Ajouter un partenaire uniquement après signature de la convention.
   Logo : fichier PNG ou SVG sur fond transparent dans assets/img/partenaires/.
   { nom: "", logo: "assets/img/partenaires/nom.png", site: "https://…",
     formule: "fondateur" | "or" | "argent" | "soutien" | "nature" }
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.partenaires = [
  /* Aucun partenaire signé à ce jour. */
];

/* Formules proposées (D08 – Dossier partenariats). Les montants sont des
   propositions en attente de validation : ils ne sont pas publiés. */
EFA.formules = [
  { id: "fondateur", nom: "Partenaire fondateur", phare: true,
    contreparties: ["Logo sur les maillots d'entraînement et les supports", "Mention dans les communications", "Présence aux événements", "Rapport annuel"] },
  { id: "or", nom: "Partenaire or",
    contreparties: ["Logo sur les supports et le site", "Deux événements par an", "Rapport annuel"] },
  { id: "argent", nom: "Partenaire argent",
    contreparties: ["Logo sur le site et le rapport annuel", "Un événement par an"] },
  { id: "soutien", nom: "Partenaire soutien",
    contreparties: ["Mention sur les réseaux sociaux et le site"] },
  { id: "nature", nom: "Don en nature",
    contreparties: ["Équipements, matériel, services", "Mention selon la valeur", "Reçu de don"] }
];
