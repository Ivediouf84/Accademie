# Guide d'installation et de publication – Site EFA

Ce guide s'adresse à la personne chargée du site, sans connaissance technique avancée.

---

## 1. Prérequis

- Un ordinateur Windows (PowerShell est déjà installé).
- Aucun autre logiciel n'est nécessaire : pas de Node.js, pas de base de données.
- Un éditeur de texte pour modifier les contenus : **Visual Studio Code** (gratuit) est recommandé, le Bloc-notes fonctionne aussi. Enregistrer toujours en **UTF-8**.

Si PowerShell refuse d'exécuter les scripts (« l'exécution de scripts est désactivée »), lancer une fois :

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## 2. Construire et prévisualiser le site

Dans le dossier du projet (clic droit → « Ouvrir dans le terminal ») :

```powershell
.\build.ps1
```

```powershell
.\serve.ps1
```

Ouvrir ensuite http://localhost:8080 dans le navigateur. `Ctrl + C` arrête l'aperçu.

> Pourquoi un serveur ? En ouvrant directement le fichier `index.html` par double-clic, les icônes et certaines fonctions ne s'affichent pas (restriction de sécurité des navigateurs). L'aperçu par `serve.ps1` reproduit les conditions réelles.

---

## 3. Avant la première mise en ligne (liste de contrôle)

1. Compléter `src/data/config.js` : téléphone, WhatsApp, e-mail, adresse, réseaux sociaux, coordonnées GPS.
2. Choisir le service d'envoi des formulaires (section 5) et le renseigner dans `config.js`.
3. Passer `afficherDemo: false` dans `config.js` (retire la fiche joueur et l'article de démonstration).
4. Retirer ou modifier le bandeau « Site en cours de construction » (`bandeau: ""`).
5. Faire relire par un juriste la page `src/pages/mentions-legales.html` et compléter les champs en orange.
6. Vérifier la liste `docs/INFORMATIONS_MANQUANTES.md`.
7. Reconstruire avec le nom de domaine définitif :

```powershell
.\build.ps1 -SiteUrl "https://www.votre-domaine.sn"
```

Cette option ajoute les adresses canoniques et génère `sitemap.xml` pour Google.

---

## 4. Héberger le site

Le dossier **`dist/`** contient tout le site. Trois solutions, de la plus simple à la plus classique :

### Option A – Netlify (recommandée, gratuite pour ce volume)
1. Créer un compte sur netlify.com.
2. Menu **Sites → Add new site → Deploy manually**, puis glisser-déposer le dossier `dist/`.
3. Le site est en ligne immédiatement (adresse en `.netlify.app`), avec HTTPS.
4. **Domain settings** : relier le nom de domaine acheté (ex. `.sn` ou `.com`).
5. Les formulaires fonctionnent automatiquement avec `fournisseur: "netlify"` (voir section 5). Les demandes reçues s'affichent dans **Forms** et peuvent être envoyées par e-mail (**Forms → Form notifications**).
6. Le fichier `_headers` applique automatiquement les en-têtes de sécurité.

### Option B – Cloudflare Pages ou GitHub Pages
Même principe : publier le contenu du dossier `dist/`. Les formulaires utilisent alors Formspree (section 5).

### Option C – Hébergement mutualisé classique (OVH, Hostinger, hébergeur sénégalais…)
1. Se connecter en FTP (logiciel FileZilla) avec les identifiants fournis par l'hébergeur.
2. Envoyer **le contenu** du dossier `dist/` (pas le dossier lui-même) dans le répertoire `www` ou `public_html`.
3. Le fichier `.htaccess` (fichier caché) configure la page d'erreur, le cache et la sécurité. Activer le certificat SSL gratuit (Let's Encrypt) dans le panneau de l'hébergeur, puis décommenter les 3 lignes « Forcer HTTPS » de `.htaccess`.
4. Formulaires : Formspree (section 5).

---

## 5. Activer les formulaires (préinscription, contact, partenariat)

Un site statique ne stocke pas les données lui-même. Tant que rien n'est configuré, les formulaires indiquent honnêtement au visiteur que l'envoi n'est pas encore activé et **ne transmettent rien**.

**Avec Netlify** – dans `src/data/config.js` :
```js
formulaires: { fournisseur: "netlify", endpoints: { preinscription: "", contact: "", partenariat: "" } }
```

**Avec Formspree** (tout hébergeur) :
1. Créer un compte sur formspree.io avec l'adresse e-mail officielle de l'académie.
2. Créer 3 formulaires : « Préinscription », « Contact », « Partenariat ». Copier chaque adresse (`https://formspree.io/f/xxxxxx`).
3. Dans `config.js` :
```js
formulaires: {
  fournisseur: "formspree",
  endpoints: {
    preinscription: "https://formspree.io/f/AAAAAA",
    contact: "https://formspree.io/f/BBBBBB",
    partenariat: "https://formspree.io/f/CCCCCC"
  }
}
```
4. Reconstruire et republier.

> Protection des données : les demandes de préinscription concernent des mineurs. Ne transférer ces e-mails qu'aux personnes habilitées, et supprimer les demandes non suivies d'inscription selon la durée fixée dans la politique de confidentialité.

---

## 6. Ajouter la carte

Dans Google Maps, faire un clic droit sur le terrain : les coordonnées s'affichent (ex. `14.3456, -16.4567`). Les reporter dans `config.js` :
```js
carte: { latitude: 14.3456, longitude: -16.4567, zoom: 15 }
```

---

## 7. Mettre à jour le site au quotidien

1. Modifier le fichier concerné dans `src/data/` (voir le tableau du README).
2. `.\build.ps1` puis vérifier avec `.\serve.ps1`.
3. Republier `dist/` (glisser-déposer sur Netlify ou envoi FTP).

**Préparer une photo** : largeur maximale 1600 px, format `.webp` ou `.jpg`, moins de 400 Ko (outil gratuit en ligne : squoosh.app). Nom de fichier en minuscules sans accent ni espace : `entrainement-u13-mars-2027.webp`.

**Règle absolue** : aucune photo, vidéo ou fiche d'un mineur sans le consentement écrit de son représentant légal.

---

## 8. Sauvegarde

Conserver une copie du dossier complet du projet (et surtout de `src/`) sur un second support (clé USB, Google Drive…) après chaque mise à jour importante. Idéalement, placer le projet sous Git (GitHub privé) pour garder l'historique des modifications.
