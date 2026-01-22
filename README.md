# Eterball

Projet full-stack (Next.js + Express + MongoDB) autour d'un univers MMORPG fictif.

## Fonctionnalites principales

- Site vitrine (accueil, actus, pages legales)
- Authentification (signup/login) avec JWT
- Boutique (liste d'items, achat, solde)
- Inventaire utilisateur
- Classes jouables (liste + details)
- Ladders (general, succes, soccherium)
- Administration (creation d'items et de classes)

## Stack technique

- Front: Next.js (App Router), React, TypeScript, Redux Toolkit, SCSS
- Back: Express, MongoDB (Mongoose), JWT, bcrypt

## Prerequis

- Node.js 18+
- MongoDB Atlas (ou MongoDB local)

## Installation

A la racine du projet:

```bash
npm install
```

### Front

```bash
cd Client
npm install
npm run dev
```

### Back

```bash
cd Server
npm install
npm run dev
```

## Variables d'environnement

Cote serveur, creer un fichier `Server/.env` :

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET=change-me
CLIENT_URL=http://localhost:3000
PORT=5000
```

Cote client, creer un fichier `Client/.env.local` :

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Scripts utiles

- Lancer le back en dev: `npm run dev` (dans `Server/`)
- Lancer le front en dev: `npm run dev` (dans `Client/`)

## Authentification & roles

- Le JWT contient `userId`, `identifier`, `role`.
- Roles possibles: `user`, `admin`.
- Les routes d'ecriture pour items/classes sont protegees par role admin.

## Parcours utilisateur

1. Visite du site vitrine (accueil, actus, pages legales).
2. Inscription puis connexion (creation de compte et recuperation du JWT).
3. Consultation des classes et des ladders.
4. Acces a la boutique, achat d'items (mise a jour du solde).
5. Consultation de l'inventaire.
6. (Admin) Acces a `/admin` pour creer des items/classes.

## Routes API (back)

### Auth

- `POST /auth/signup`
- `POST /auth/login`

### Boutique

- `GET /shop/items` (public)
- `POST /shop/items` (admin)
- `POST /shop/buy/:itemId` (auth)

### Compte

- `GET /account/inventory` (auth)

### Classes

- `GET /api/classes` (public)
- `GET /api/classes/carousel` (public)
- `GET /api/classes/:slug` (public)
- `POST /api/classes` (admin)
- `PATCH /api/classes/:id` (admin)
- `DELETE /api/classes/:id` (admin)

### Ladders

- `GET /api/ladders/general` (public)
- `GET /api/ladders/success` (public)
- `GET /api/ladders/soccherium` (public)

### Stats

- `POST /api/stats/user/init`
- `PATCH /api/stats/user/match-played`
- `PATCH /api/stats/user/level`
- `PATCH /api/stats/user/success`
- `POST /api/stats/team/init`
- `PATCH /api/stats/team/soccherium`

## Administration

- Page admin: `/admin` (accessible uniquement si `role === 'admin'`).
- Creer des items et des classes depuis l'interface.

## Scripts DB

Dans `Server/scripts/` :

- `backfillUserRole.js` : ajoute le role `user` aux comptes existants.
- `promoteAdmin.js <identifier>` : passe un compte en admin.
- `backfillUserStats.js` : cree les stats pour les users existants.
- `backfillAvatar.js` : ajoute `avatarURL` manquant.
- `seedSoccherium.js` : seed equipes Soccherium.

## Notes

- Le projet est a vocation pedagogique (pas d'achats reels).
- Pour l'admin, il faut se reconnecter apres promotion afin d'obtenir un token avec le role.
