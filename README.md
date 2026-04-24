# Litho Intelligence

Base Codex pour creer le "Google intelligent de la lithotherapie", oriente recommandation personnalisee, fiches SEO et conversion Amazon.

## Positionnement

Litho Intelligence recommande des pierres selon l'etat physique ressenti, l'etat emotionnel et les objectifs de vie de l'utilisateur.

Important: la lithotherapie est presentee comme une pratique de bien-etre non medicale, basee sur des traditions, croyances et pratiques energetiques. L'application ne fait aucune promesse medicale.

## MVP inclus

- Home page avec test rapide partageable.
- Moteur de recommandation Top 5 avec score, raison et conseil d'usage.
- Fiches pierres premium: description, origine, proprietes symboliques, compatibilites, incompatibilites, purification, port recommande et CTA Amazon.
- Analyse de combinaison des pierres possedees.
- Profil local pour favoris, pret a migrer vers Supabase Auth.
- Capture newsletter pour ebook/guide PDF.
- API route `POST /api/recommendation`.

## Stack

- Next.js App Router
- TypeScript
- Vercel
- Futur: Supabase Auth + DB, OpenAI API, liens Amazon Partenaires

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Deploiement GitHub + Vercel

### Option recommandee: import GitHub dans Vercel

1. Creer un repo GitHub vide, par exemple `litho-intelligence`.
2. Initialiser et pousser le projet:

```bash
git init
git add .
git commit -m "Initial Litho Intelligence MVP"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/litho-intelligence.git
git push -u origin main
```

3. Sur Vercel, cliquer sur `Add New...` puis `Project`.
4. Importer le repo GitHub.
5. Framework: Next.js.
6. Build command: `npm run build`.
7. Output directory: laisser vide.
8. Ajouter les variables de `.env.example` si necessaire.
9. Deployer.

### Option CI: GitHub Actions

Le workflow `.github/workflows/vercel-production.yml` deploie sur Vercel a chaque push sur `main`.

Secrets GitHub requis:

```bash
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

Pour obtenir `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID`, lier une fois le projet avec Vercel CLI:

```bash
vercel link
```

Puis consulter `.vercel/project.json` sans le commit.

## Prochaines integrations

- Remplacer les URLs Amazon temporaires dans `lib/stones.ts` par les liens Felicidade, Vera Mentis et KDP.
- Brancher Supabase pour `users`, `stones`, `products`, `preferences` et `history`.
- Ajouter OpenAI dans l'API recommendation pour enrichir l'explication, en gardant le JSON et les garde-fous non medicaux.
