# Table de correspondance URL - Litho Intelligence

Objectif : préparer une architecture française cohérente sans casser les pages déjà indexées.

Décision de cette première phase : ne pas migrer brutalement les pages existantes. Les URLs historiques restent les destinations canoniques opérationnelles tant qu'une migration complète des liens internes, canonicals et partages sociaux n'a pas été validée.

## Redirections appliquées

| Ancienne ou alternative | Destination actuelle | Type | Raison |
| --- | --- | --- | --- |
| `/stones` | `/pierres` | 301 | Ancien catalogue anglais redirigé vers le catalogue canonique français. |
| `/stones/:slug` | `/pierres/:slug` | 301 | Anciennes fiches natives redirigées vers les fiches canoniques françaises. |
| `/stone/:slug` | `/pierres/:slug` | 301 | Anciennes fiches produits redirigées vers les fiches canoniques françaises. |
| `/intention` | `/intentions` | 301 | Ancien hub redirigé vers le hub canonique français. |
| `/intention/:slug` | `/intentions/:slug` | 301 | Anciennes pages intentions redirigées vers les pages canoniques françaises. |
| `/authenticite-entretien` | `/entretien` | 301 | Nom court retenu pour le hub authenticité et entretien. |
| `/stone/obsidienne` | `/pierres/obsidienne-noire` | 301 | Fiche produit existante plus précise. |

## Redirections temporaires existantes à réévaluer

| URL actuelle | Destination | Type actuel | Recommandation |
| --- | --- | --- | --- |
| `/stone/jade-blanc` | `/pierres/jade-emeraude` | 302 | Créer une vraie fiche si la donnée et le produit existent, sinon passer en 301 vers la fiche la plus pertinente. |
| `/stone/agate` | `/pierres/agate-du-botswana` | 302 | Créer une page famille Agate ou passer en 301 vers une fiche famille claire. |
| `/intention/argent` | `/intentions/argent-abondance` | 302 | Passer en 301 après validation du libellé SEO final. |

## Architecture cible à valider

| Famille | URL cible proposée | Statut |
| --- | --- | --- |
| Catalogue pierres | `/pierres` | À migrer après validation. |
| Fiche pierre | `/pierres/[slug]` | À migrer après table complète. |
| Intentions | `/intentions/[slug]` | Canonique validée et prête pour indexation. |
| Guides | `/guides/[slug]` | Créé en première phase. |
| Comparatifs | `/comparatifs/[slug]` | Hub créé, détails à développer. |
| Entretien | `/entretien/[slug]` | Hub créé, détails à développer sous guides pour l'instant. |
| Journal | `/journal/[slug]` | Hub créé, détails à développer. |

## Principe de migration future

1. Choisir définitivement les URLs canoniques françaises.
2. Mettre à jour tous les liens internes.
3. Mettre à jour les canonicals et Open Graph.
4. Mettre à jour le sitemap.
5. Mettre les anciennes URLs en 301 vers les nouvelles.
6. Vérifier que les partages Facebook/X gardent une image Open Graph valide.
7. Contrôler Search Console après déploiement.
