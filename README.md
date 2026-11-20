# Site officiel EFA – Étoile Football Académie

Site institutionnel statique (HTML5, CSS3, JavaScript sans dépendance) de l'Étoile Football Académie, Patar (Sénégal).

## Démarrage rapide (Windows)

```powershell
.\build.ps1          # assemble le site dans dist/
.\serve.ps1          # aperçu sur http://localhost:8080
```

Le dossier **`dist/`** est le site prêt à publier : il suffit de l'envoyer chez l'hébergeur.

## Organisation

```
Accademie de foot/
├── build.ps1                 Script de construction (src → dist)
├── serve.ps1                 Serveur local d'aperçu
├── src/                      SOURCES – c'est ici que l'on modifie le site
│   ├── pages/                Contenu de chaque page (16 pages)
│   ├── partials/             En-tête, menu, pied de page communs
│   ├── data/                 CONTENUS MODIFIABLES (config, joueurs, staff, actualités,
│   │                         galerie, vidéos, documents, partenaires)
│   ├── assets/css/style.css  Charte graphique
│   ├── assets/js/main.js     Fonctions interactives
│   ├── assets/img/           Logo, icônes, photos
│   ├── assets/docs/          PDF officiels validés (vide pour l'instant)
│   └── static/               robots.txt, manifeste, en-têtes de sécurité
├── dist/                     SITE GÉNÉRÉ (ne pas modifier à la main)
└── docs/
    ├── GUIDE_INSTALLATION_PUBLICATION.md
    ├── DOCUMENTATION_TECHNIQUE.md
    └── INFORMATIONS_MANQUANTES.md   ← à lire en priorité
```

## Mettre à jour le contenu

| Je veux…                                   | Fichier à modifier            |
|--------------------------------------------|-------------------------------|
| Renseigner téléphone, WhatsApp, e-mail, carte | `src/data/config.js`        |
| Ajouter un joueur                          | `src/data/joueurs.js`         |
| Compléter le staff / les dirigeants        | `src/data/staff.js`           |
| Publier une actualité                      | `src/data/actualites.js`      |
| Ajouter des photos                         | `src/data/galerie.js` + image dans `src/assets/img/galerie/` |
| Ajouter une vidéo YouTube                  | `src/data/videos.js`          |
| Mettre un document en téléchargement       | `src/data/documents.js` + PDF dans `src/assets/docs/` |
| Ajouter un partenaire                      | `src/data/partenaires.js`     |

Après chaque modification : relancer `.\build.ps1`, vérifier avec `.\serve.ps1`, puis republier `dist/`.

## Mise en ligne actuelle (GitHub + Vercel)

- Code source : dépôt privé GitHub `Ivediouf84/Accademie` (branche `main`)
- Site public : https://accademie-zeta.vercel.app (projet Vercel « accademie »)
- Vercel publie le dossier `dist/` tel quel (voir `vercel.json`) : **toujours lancer `.\build.ps1` avant d'enregistrer**, sinon les modifications de `src/` n'apparaîtront pas.

Publier une mise à jour :

```powershell
.\build.ps1
git add -A
git commit -m "Description de la modification"
git push
```

Vercel redéploie automatiquement en moins d'une minute après chaque `git push`.

Formulaires sur Vercel : utiliser Formspree (`fournisseur: "formspree"` dans `src/data/config.js`), car l'option « netlify » ne fonctionne pas sur Vercel.
