# Documentation technique – Site EFA

## 1. Choix d'architecture

| Besoin | Choix | Raison |
|---|---|---|
| Rapidité, sécurité, coût | Site **statique** (HTML/CSS/JS) | Aucune base de données ni serveur applicatif à attaquer ou maintenir ; hébergement gratuit ou très bon marché ; chargement rapide sur réseau mobile. |
| Outils disponibles | **Aucune dépendance** (pas de Node.js) | Le poste de travail ne dispose pas de Node.js ; un script PowerShell suffit pour assembler les pages. React/Astro/Tailwind n'apportaient pas de gain justifiant une chaîne d'outils supplémentaire à ce stade. |
| Pas de répétition du menu | Gabarits (`src/partials`) + `build.ps1` | Un seul en-tête/pied de page pour 16 pages. |
| Contenus faciles à modifier | Fichiers de données `src/data/*.js` | Une personne non développeuse peut ajouter un joueur ou une actualité sans toucher au HTML. Format `.js` (et non `.json`) pour fonctionner sans serveur. |
| Évolution vers un espace administrateur | Couche d'accès unique `Store` dans `main.js` | Voir section 6. |

Navigateurs : Chrome, Edge, Firefox, Safari récents (iOS/Android compris). Aucune fonctionnalité expérimentale.

## 2. Pages

| Fichier | Page | Contenu dynamique (rendu par `main.js`) |
|---|---|---|
| `index.html` | Accueil | 3 dernières actualités, 5 photos, 3 vidéos |
| `academie.html` | Notre académie | Liste des dirigeants |
| `joueurs.html` | Nos joueurs | Fiches + filtres U7…U18 + recherche |
| `staff.html` | Staff technique | Fiches encadrants |
| `activites.html` | Nos activités | – |
| `galerie.html` | Galerie | Albums, grille, visionneuse plein écran (clavier ←/→/Échap, balayage tactile) |
| `videos.html` | Vidéothèque | YouTube chargé au clic (youtube-nocookie) ou MP4 |
| `actualites.html` / `article.html?id=…` | Actualités | Liste filtrable / article complet |
| `documents.html` | Documents officiels | Bibliothèque avec niveaux d'accès, aperçu PDF, téléchargement |
| `inscriptions.html` | Inscriptions | Formulaire de préinscription |
| `partenaires.html` | Partenaires | Logos, formules, formulaire entreprises |
| `contact.html` | Contact | Coordonnées, formulaire, carte OpenStreetMap |
| `protection.html` | Protection de l'enfance | – (page ajoutée : prévue au dossier D09) |
| `mentions-legales.html` | Mentions légales et confidentialité | – |
| `404.html` | Page introuvable | – |

## 3. Format d'une page source

```html
<!--
title: Titre affiché dans Google (60 caractères env.)
description: Résumé pour Google (155 caractères env.)
page: identifiant-du-menu
robots: noindex          (facultatif)
-->
<section>…contenu…</section>
```
`build.ps1` lit cet en-tête, l'insère dans `partials/head.html`, ajoute l'en-tête, le pied de page, les scripts et un numéro de version (anti-cache) puis écrit `dist/<page>.html`.

## 4. Charte graphique

Définie par des variables CSS en tête de `style.css`, tirées du logo officiel :

| Rôle | Couleur |
|---|---|
| Bleu royal (étoile) | `#1f45b5` |
| Bleu nuit (bandeau) | `#0b1d4f` / `#071337` |
| Bleu lumineux (reflets) | `#4f8cff` |
| Argent (liseré) | `#c7cfdc` |
| Blanc | `#ffffff` |

Typographies (Google Fonts) : **Oswald** (titres, style maillot/affiche sportive) et **Inter** (texte, très lisible sur mobile). Icônes : sprite SVG maison `assets/img/icons.svg` (aucune dépendance). Animations : apparition douce au défilement, désactivées si l'utilisateur a demandé « réduire les animations ».

## 5. Sécurité

- **Content-Security-Policy** dans chaque page : scripts uniquement depuis le site, pas de script en ligne, cadres limités à YouTube (nocookie) et OpenStreetMap, envois de formulaire limités au site et à Formspree.
- En-têtes complémentaires : `_headers` (Netlify/Cloudflare) et `.htaccess` (Apache). `.htaccess` interdit aussi le téléchargement de fichiers `.docx`, `.md`, `.ps1` déposés par erreur.
- Toutes les données insérées dynamiquement sont **échappées** (fonction `esc`) ; les liens sont filtrés (`safeUrl`).
- Formulaires : validation côté navigateur, champ piège anti-robots, délai minimal de saisie, consentements obligatoires, aucune donnée médicale demandée. Si l'envoi n'est pas configuré, rien n'est transmis et le visiteur en est informé.
- **Documents** : un fichier n'est téléchargeable que si `acces: "public"`, `etat: "valide"` et `fichier` renseigné. Les documents « restreint » n'ont jamais de fichier dans le site. Les fichiers Word de travail du dossier de projet **ne sont pas** copiés dans le site.
- Mineurs : une photo de fiche joueur ne s'affiche que si `consentementImage: true`. Aucune date de naissance complète, adresse, téléphone ou école n'est prévue dans les fiches.

## 6. Évolution vers un espace administrateur

L'objet `Store` (début de `src/assets/js/main.js`) est **le seul endroit** où le site lit ses contenus. Chaque fonction renvoie une promesse :

```js
joueurs: function () { return Promise.resolve(this.filterDemo(EFA.joueurs)); }
```

Pour brancher une base de données, il suffira de remplacer le corps par un appel réseau, sans modifier l'affichage :

```js
joueurs: function () { return fetch("/api/joueurs").then(r => r.json()); }
```

Trajectoires possibles, sans reconstruire le site :

1. **CMS « Git » (Decap CMS)** – le plus économique : une interface d'administration (`/admin`) permet d'éditer les fichiers de données et d'envoyer photos et actualités ; le site est republié automatiquement par Netlify. Convient pour joueurs, actualités, galerie, vidéos, documents publics.
2. **Backend géré (Supabase, Firebase)** – base de données + authentification + stockage de fichiers avec règles d'accès. Nécessaire pour **gérer les demandes de préinscription** dans un tableau de bord et pour stocker des documents à accès restreint (réservés aux familles ou à l'encadrement).
3. **CMS complet (WordPress headless, Strapi)** – si l'académie dispose d'un prestataire pour l'héberger et le maintenir.

Tables à prévoir : `joueurs`, `staff`, `actualites`, `photos`, `albums`, `videos`, `documents`, `partenaires`, `preinscriptions` (accès restreint, durée de conservation limitée), `utilisateurs` (rôles : administrateur, rédacteur, encadrant). Les champs reprennent exactement ceux des fichiers `src/data/*.js`.

Aucune fausse interface d'administration n'a été créée : elle n'aurait aucune donnée réelle derrière elle.

## 7. Référencement (SEO)

- Titre et description propres à chaque page, un seul `h1`, hiérarchie de titres respectée, fil d'Ariane.
- Données structurées schema.org `SportsOrganization` (nom, sport, ville, pays).
- Balises Open Graph pour le partage sur Facebook/WhatsApp.
- `sitemap.xml`, `robots.txt` et URL canoniques générés par `build.ps1 -SiteUrl …`.
- Images en `.webp`, dimensions déclarées (pas de saut de mise en page), chargement différé hors écran.
- Après la mise en ligne : déclarer le site dans **Google Search Console** et créer une fiche **Google Business Profile** « Étoile Football Académie – Patar » (très efficace pour les recherches locales).

## 8. Performances

Poids total du site ≈ 2,6 Mo (dont 2 Mo de photos chargées progressivement). Pas de bibliothèque JavaScript externe (main.js ≈ 43 Ko non compressé). Polices avec `display=swap`. Vidéos YouTube chargées uniquement au clic.

Optimisation possible : réduire les 6 photos actuelles à 1600 px de large (gain ≈ 30 %) et produire des miniatures pour la grille de la galerie.

## 9. Accessibilité

Lien d'évitement « Aller au contenu », navigation entièrement au clavier, focus visible, visionneuse avec gestion du focus et touche Échap, textes alternatifs, contrastes conformes, libellés de formulaires explicites, messages d'erreur annoncés aux lecteurs d'écran (`aria-live`).

## 10. Tests réalisés

- 16 pages servies sans erreur ; 31 ressources et liens internes vérifiés, aucun lien cassé.
- Console JavaScript sans erreur ni violation de la politique de sécurité.
- Filtres joueurs, albums de la galerie, visionneuse (ouverture, photo suivante, fermeture), page article, bibliothèque de documents (24 documents, 0 téléchargement public, 2 restreints).
- Formulaire de préinscription : champs obligatoires signalés, e-mail invalide détecté, catégorie estimée calculée, message honnête quand l'envoi n'est pas activé.
- Affichage mobile 375 px sans défilement horizontal, menu mobile fonctionnel ; affichage bureau 1366 px.

Non testé dans cette session : Safari/iOS réel, envoi effectif via Netlify/Formspree (nécessite la mise en ligne), aperçu d'un PDF réel (aucun PDF validé fourni).
