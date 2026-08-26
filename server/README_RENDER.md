# Trouve ton artisan — mise en ligne du backend

## 1. Copier le dossier `server`

Place `server/` à la racine du dépôt GitHub, à côté de `client/`.

## 2. Tester en local

Dans `server/` :

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Dans `.env`, remplace seulement `DB_PASSWORD` par le mot de passe Clever Cloud.

Le frontend local conserve :

```env
VITE_API_URL=http://localhost:5000/api
```

## 3. GitHub

Ne pousse jamais `server/.env`.

```powershell
git add server
git commit -m "Ajout API Express Sequelize"
git push origin main
```

## 4. Render — backend

Créer un **Web Service** sur le même dépôt.

- Root Directory : `server`
- Build Command : `npm install`
- Start Command : `npm start`

Variables d'environnement :

- `NODE_ENV=production`
- `DB_HOST=bstzhavdytgopdk4raow-mysql.services.clever-cloud.com`
- `DB_PORT=3306`
- `DB_NAME=bstzhavdytgopdk4raow`
- `DB_USER=udsc4abtmijt1od4`
- `DB_PASSWORD=<mot de passe Clever Cloud>`
- `CLIENT_URL=https://devoir-8-trouver-mon-artisan.onrender.com`

`PORT` n'a pas besoin d'être fixé sur Render : Render l'injecte.

Quand le service est en ligne, tester :

`https://NOM-DU-BACKEND.onrender.com/api/health`

## 5. Render — frontend

Dans le **Static Site** frontend, ajouter/modifier :

`VITE_API_URL=https://NOM-DU-BACKEND.onrender.com/api`

Puis **Clear build cache & deploy** ou **Deploy latest commit**.

Conserver également la Rewrite React Router :

- Source : `/*`
- Destination : `/index.html`
- Action : `Rewrite`
