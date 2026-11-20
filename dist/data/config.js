/* =========================================================================
   CONFIGURATION GÉNÉRALE DU SITE EFA
   -------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour renseigner les coordonnées,
   les réseaux sociaux, l'envoi des formulaires et la carte.
   Laisser une valeur vide ("") tant que l'information n'est pas confirmée :
   le site affichera alors automatiquement « À renseigner ».
   ========================================================================= */
window.EFA = window.EFA || {};

EFA.config = {
  nom: "Étoile Football Académie",
  sigle: "EFA",
  sousTitre: "Étoile du Sine",           // mention figurant sur le logo officiel
  slogan: ["Former", "Jouer", "Réussir"], // slogan figurant sur les visuels fournis
  ville: "Patar",
  pays: "Sénégal",
  adresseComplete: "",                   // ex. "Quartier …, Patar, commune de …" (à compléter)

  contact: {
    telephone: "",        // format international conseillé : "+221 7X XXX XX XX"
    whatsapp: "",         // chiffres uniquement, sans "+" ni espaces : "2217XXXXXXXX"
    email: "",            // ex. "contact@domaine.sn"
    horaires: ""          // ex. "Lundi – samedi, 9 h – 18 h"
  },

  reseaux: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: ""
  },

  /* Carte : renseigner la latitude et la longitude du terrain (Google Maps :
     clic droit sur le lieu → les coordonnées s'affichent). */
  carte: { latitude: null, longitude: null, zoom: 15 },

  /* ENVOI DES FORMULAIRES
     Un site statique ne peut pas recevoir de données seul. Choisir un service :
       - "netlify"  : si le site est hébergé sur Netlify (aucun réglage supplémentaire)
       - "formspree": créer un formulaire sur formspree.io et coller son adresse
                      (https://formspree.io/f/xxxxxx) dans "endpoints"
       - "none"     : aucun envoi ; le visiteur est informé que le formulaire
                      n'est pas encore activé (aucune donnée n'est transmise).
     Voir docs/GUIDE_INSTALLATION_PUBLICATION.md, section 5. */
  formulaires: {
    fournisseur: "none",
    endpoints: {
      preinscription: "",
      contact: "",
      partenariat: ""
    }
  },

  /* Pendant la construction, les fiches de démonstration (clairement
     signalées) aident à visualiser le rendu. Passer à false avant la mise
     en ligne définitive. */
  afficherDemo: true,

  /* Bandeau d'information en haut de chaque page. Mettre "" pour le retirer. */
  bandeau: "Site en cours de construction : certaines informations sont en attente de validation par l'académie."
};
