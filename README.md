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

- Configurer les variables Vercel Supabase, Stripe et OpenAI.
- Ajouter les vrais guides PDF premium.
- Remplacer progressivement les visuels restants par des photos individuelles finales.

## Membership Premium

Le projet inclut maintenant une architecture membership:

- `FREE`: compte gratuit, 3 recommandations par jour, 1 apercu combinaison, 5 favoris.
- `PREMIUM`: 7,90 EUR/mois via Stripe Billing.
- `ELITE`: prevu dans le code, non affiche.

Routes:

- `/login`
- `/register`
- `/account`
- `/dashboard`
- `/pricing`
- `/api/stripe/create-checkout-session`
- `/api/stripe/create-portal-session`
- `/api/stripe/webhook`

## Variables d'environnement Vercel

```bash
NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app

OPENAI_API_KEY=
MAX_DAILY_AI_CALLS=500

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PREMIUM_PRICE_ID=

NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=
```

## Supabase

Executer les migrations:

```sql
supabase/migrations/20260424190000_membership.sql
supabase/migrations/20260424213000_ai_hybrid_engine.sql
supabase/migrations/20260424235000_stone_catalog.sql
supabase/migrations/20260425090000_native_stones.sql
```

Elles creent les tables `profiles`, `subscriptions`, `usage_limits`, `favorites`, `recommendation_history`, `downloads`, `leads`, `events`, `ai_cache`, `ai_usage_logs`, les RLS policies, le trigger profil FREE apres inscription, et la fonction `increment_usage_limit`.

## Base native des pierres

La base originale Litho Intelligence est dans `data/stones.seed.json`.

- 50 fiches originales, sans copie de site concurrent.
- Ton premium, SEO, non medical.
- Route SEO publique: `/stones/[slug]`.
- Moteur local: `lib/nativeRecommendation.ts`, utilise par `lib/stoneRules.ts`.
- Produits Amazon: `data/products.seed.json`.

Importer uniquement les pierres natives:

```bash
npm run import:stones
```

Importer le catalogue complet dans Supabase (`native_stones`, `stones`, `products`):

```bash
npm run import:catalog
```

Verifier la configuration production:

```text
/system
/api/system/status
```

## Moteur hybride IA

Le moteur de recommandation suit cet ordre pour limiter les couts:

- local: `lib/stoneRules.ts`, reponse instantanee sans OpenAI
- cache: table Supabase `ai_cache`
- OpenAI: uniquement en fallback, modele `gpt-4.1-mini`, `max_output_tokens: 300`, `temperature: 0.7`
- fallback global: si OpenAI est indisponible, si Supabase ne peut pas compter les appels, ou si `MAX_DAILY_AI_CALLS` est atteint

Les appels sont journalises dans `ai_usage_logs` avec `source` = `local`, `cache`, `ai` ou `fallback`.

Pour rendre l'IA active en production:

1. Ajouter `OPENAI_API_KEY` dans Vercel.
2. Garder `MAX_DAILY_AI_CALLS=500` ou plus bas pour securiser les couts.
3. Verifier `/api/system/status`.
4. Tester `/recommendation` avec une demande qui ne matche pas le moteur local, afin de declencher le fallback IA.

## Stripe

Configurer un produit recurrent Premium a `7,90 EUR/mois`, puis renseigner `STRIPE_PREMIUM_PRICE_ID`.

Webhook Stripe:

```text
https://votre-domaine.vercel.app/api/stripe/webhook
```

Evenements a activer:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
