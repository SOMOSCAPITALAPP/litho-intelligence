# Table de correspondance URL - Litho Intelligence

Objectif : préparer une architecture française cohérente sans casser les pages déjà indexées.

Décision de cette première phase : ne pas migrer brutalement les pages existantes. Les URLs historiques restent les destinations canoniques opérationnelles tant qu'une migration complète des liens internes, canonicals et partages sociaux n'a pas été validée.

## Redirections appliquées

| Ancienne ou alternative | Destination actuelle | Type | Raison |
| --- | --- | --- | --- |
| `/pierres` | `/stones` | 301 | Alias français préparatoire vers le catalogue existant. |
| `/pierres/:slug` | `/stones/:slug` | 301 | Alias français préparatoire vers les fiches natives existantes. |
| `/intentions` | `/intention` | 301 | Alias français préparatoire vers le hub existant. |
| `/intentions/:slug` | `/intention/:slug` | 301 | Alias français préparatoire vers les pages intentions existantes. |
| `/authenticite-entretien` | `/entretien` | 301 | Nom court retenu pour le hub authenticité et entretien. |
| `/stone/obsidienne` | `/stone/obsidienne-noire` | 301 | Fiche produit existante plus précise. |

## Redirections temporaires existantes à réévaluer

| URL actuelle | Destination | Type actuel | Recommandation |
| --- | --- | --- | --- |
| `/stone/jade-blanc` | `/stone/jade-emeraude` | 302 | Créer une vraie fiche si la donnée et le produit existent, sinon passer en 301 vers la fiche la plus pertinente. |
| `/stone/agate` | `/stone/agate-du-botswana` | 302 | Créer une page famille Agate ou passer en 301 vers une fiche famille claire. |
| `/intention/argent` | `/intention/argent-abondance` | 302 | Passer en 301 après validation du libellé SEO final. |

## Architecture cible à valider

| Famille | URL cible proposée | Statut |
| --- | --- | --- |
| Catalogue pierres | `/pierres` | À migrer après validation. |
| Fiche pierre | `/pierres/[slug]` | À migrer après table complète. |
| Intentions | `/intentions/[slug]` | À migrer après mise à jour des liens internes. |
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
