# Informations et fichiers manquants – Site EFA

Ce document recense ce qui a été fourni, comment chaque fichier a été utilisé, et tout ce qui manque. Sur le site, chaque information absente apparaît en orange « À renseigner » : rien n'a été inventé.

---

## 1. Inventaire des fichiers fournis

### Images (8 fichiers)

| Fichier reçu | Contenu | Utilisation sur le site | Remarque |
|---|---|---|---|
| `4.jpg` | Logo officiel EFA « Étoile du Sine » (1024 × 1024) | En-tête, pied de page, icône d'onglet, icône mobile | Fond blanc : fournir si possible une version **PNG/SVG à fond transparent** |
| `5.webp` | Façade « Étoile du Sine – EFA », joueurs entrant | Grande bannière d'accueil ; album « Vie de l'académie » ; image de partage | ⚠ Voir point A |
| `1.webp` | Façade « Étoile Football Académie », terrain | Page « Notre académie » ; album « Vie de l'académie » | ⚠ Voir point A |
| `7.webp` | Entraîneur en polo « COACH », ballon | Accueil ; fiche staff « Entraîneur » ; album « Staff technique » | Nom inconnu |
| `8.webp` | **Doublon exact de `7.webp`** | Non utilisé | — |
| `2.webp` | Entraîneur en maillot EFA, sifflet | Album « Staff technique » | Même personne que `7.webp` ? |
| `3.webp` | Deux jeunes joueurs, tenue blanche (n° 10 et 7) | Album « Joueurs » | ⚠ Voir point B |
| `6.webp` | Deux jeunes joueurs, tenue bleu/blanc (n° 10 et 7) | Album « Joueurs » | ⚠ Voir point B |

**Point A – Nature des visuels.** Les façades présentent des incohérences typiques d'images de synthèse ou de maquettes (textes « ETOILE DU SINE » / « ÉTOILE FOOTBALL ACADÉMIE », slogans différents, logos légèrement déformés), et le dossier Infrastructures (D10) indique que l'état du site n'est pas documenté et que vestiaires et bureaux sont des investissements prévus. Par prudence, ces images portent la mention discrète **« Visuel de présentation »**. → *Confirmer s'il s'agit de photos réelles (mention à retirer) ou de projections (mention à garder, et remplacer par de vraies photos du terrain dès que possible).*

**Point B – Photos d'enfants.** Si ces enfants sont réels, le **consentement écrit à l'image** de leurs représentants légaux est requis avant la mise en ligne. S'il s'agit de visuels générés, les remplacer à terme par de vraies photos (avec consentement). → *Confirmer.*

Toutes les images portent actuellement `illustration: true` dans `src/data/galerie.js`.

### Documents Word (13 fichiers – dossier « projet d'academie de foot »)

| Réf. | Fichier | Utilisation |
|---|---|---|
| D00 | Sommaire général | Structure de la bibliothèque documentaire |
| D01 | Institutionnel | Pages Accueil et Notre académie (contexte, vision, mission, 6 valeurs, fiche d'identité) |
| D02 | Juridique | Bibliothèque : statuts, règlement intérieur (non publiés, en validation) |
| D03 | Gouvernance | Organigramme, fiches staff (fonctions et profils requis) |
| D04 | Sportif | Catégories, volumes, contenus, semaine type, tests, détection (Activités, Inscriptions) |
| D05 | Pédagogique | Suivi scolaire et éducatif (Activités) |
| D06 | Administratif, médical, protection | Pièces à fournir, conditions, page Protection de l'enfance, règlement des joueurs |
| D07 | Financier | **Non publié** (hypothèses internes). Seule mention : « budget prévisionnel – sur demande » |
| D08 | Partenariats | Page Partenaires (cibles, formules, contreparties, engagements éthiques). **Montants non publiés** |
| D09 | Communication | Règles sur l'image des mineurs, pages du site, réseaux sociaux |
| D10 | Infrastructures | Peu exploité (état du site non documenté) |
| D11 | Pilotage | Objectifs à 5 ans (Notre académie), calendrier de saison (Activités) |
| D12 | Plan d'action 12 mois | Non publié (document interne) |
| — | `~$_Gouvernance_EFA.docx` | Fichier temporaire de Word (document ouvert) – à ignorer, illisible |

Tous ces documents sont des **versions de travail** marquées « À VALIDER » (le sommaire précise qu'aucun ne doit être diffusé avant relecture juridique et validation du conseil d'administration). Ils n'ont donc **pas** été mis en téléchargement, et leur contenu n'a pas été modifié. Sur le site, ils apparaissent dans la bibliothèque avec l'état « En cours de validation ».

### Vidéos
Aucune vidéo fournie. La vidéothèque affiche « Vidéos à venir ».

---

## 2. Informations à fournir (par priorité)

### Priorité 1 – indispensables avant la mise en ligne
- [ ] Téléphone, numéro WhatsApp et adresse e-mail officiels de l'académie
- [ ] Adresse précise (quartier, commune, département, région) et coordonnées GPS du terrain
- [ ] Nom du directeur de la publication, numéro de récépissé de l'association, NINEA (mentions légales)
- [ ] Choix de l'hébergeur et du nom de domaine
- [ ] Choix du service de formulaires (Netlify ou Formspree) et adresse e-mail de réception
- [ ] Confirmation des points A et B ci-dessus (nature des visuels, consentements)
- [ ] Relecture juridique de la politique de confidentialité (référence de la loi sénégalaise sur les données personnelles, formalités auprès de la CDP, durée de conservation)

### Priorité 2 – contenus des pages
- [ ] Date de création et fondateurs (historique)
- [ ] Noms des membres du bureau (président, secrétaire général, trésorier) et du directeur technique
- [ ] Pour chaque encadrant : nom, fonction exacte, photo, diplômes vérifiés, expérience, courte présentation
- [ ] Nom et téléphone du **responsable de la protection de l'enfance**
- [ ] Liens des réseaux sociaux (Facebook, Instagram, TikTok, YouTube)
- [ ] Horaires d'accueil
- [ ] Statut de l'affiliation à la FSF

### Priorité 3 – au fil de la saison
- [ ] Fiches des joueurs (prénom, nom, année de naissance, catégorie, poste, numéro, pied fort, biographie, statistiques) **avec consentement à l'image signé**
- [ ] Photos réelles : entraînements, matchs, tournois, événements, terrain
- [ ] Vidéos (chaîne YouTube de l'académie recommandée)
- [ ] Premières actualités
- [ ] Logos des partenaires signés (PNG/SVG fond transparent)
- [ ] PDF officiels **validés** des documents publics (statuts, règlement intérieur, charte du joueur, dossier d'inscription, autorisation parentale, consentement à l'image…)

---

## 3. Décisions à prendre par l'académie

| Sujet | Question | Situation actuelle sur le site |
|---|---|---|
| Slogan | « Former • Jouer • Réussir » (visuels) ou « Former • Encadrer • Réussir » (une façade) ? Le dossier D09 indique « slogan à définir » | « Former • Jouer • Réussir » |
| Nom d'usage | « Étoile du Sine » figure sur le logo : doit-il apparaître comme nom officiel ? | Utilisé comme mention secondaire |
| Couleurs | D09 proposait « vert et or » ; le logo est bleu/blanc/argent | Charte construite sur le logo (bleu) |
| Catégories | Correspondance U7…U18 / groupes d'âge D04 à aligner sur la FSF | Tableau indicatif, signalé comme tel |
| Public | Garçons uniquement, ou garçons et filles ? (D01 : « filles à confirmer ») | Le formulaire propose les deux |
| Cotisation | Publier le montant et les modalités d'aide ? (hypothèse D07 : 25 000 FCFA) | Non publié : « communiqué lors de l'inscription » |
| Formules partenaires | Publier les montants (D08 : 3 000 000 / 1 500 000 / 750 000 / 300 000 FCFA) ? | Non publiés : « sur demande » |
| Détection | Gratuité des tests de détection (recommandation D04) | Non affirmé sur le site |
| Stages | Dates et modalités des stages de vacances | « À annoncer » |

---

## 4. Contenus de démonstration (à retirer)

| Élément | Où | Comment le retirer |
|---|---|---|
| Fiche joueur « Prénom NOM » | `src/data/joueurs.js` (`demo: true`) | `afficherDemo: false` dans `config.js`, ou supprimer l'entrée |
| Article « Exemple d'article » | `src/data/actualites.js` (`demo: true`) | idem |
| Bandeau « Site en cours de construction » | `src/data/config.js` → `bandeau` | Mettre `bandeau: ""` |

Ces éléments sont signalés à l'écran par un badge jaune « Démonstration ».
