# Portfolio — Rodrigue Olalékan Assogba

Scaffold Next.js (App Router) + TypeScript + MDX + Tailwind, basé sur le document de cadrage.

## Démarrage

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000

## Structure

```
app/
  layout.tsx          → layout racine, navbar, métadonnées SEO globales
  page.tsx             → accueil (hero, 3 axes, projets phares)
  projects/page.tsx    → liste des projets
  projects/[slug]/     → étude de cas dynamique (lit content/projects/*.mdx)
  about/, experience/, skills/, research/, writing/, contact/
                        → pages à créer sur le même modèle

content/projects/      → un fichier .mdx par projet (frontmatter = métadonnées, corps = étude de cas)
lib/projects.ts        → lecture/parsing des fichiers MDX
types/project.ts        → modèle de données Project (section 18 du document)
components/
  Navbar.tsx            → navigation, icônes lucide-react (SVG, pas d'emojis)
  ProjectCard.tsx       → carte de projet avec icône de statut SVG
```

## Prochaines étapes

1. `npm install` puis vérifier que `npm run dev` tourne.
2. Compléter `content/projects/cfaij-digital.mdx` avec le contenu réel.
3. Créer 1-2 fichiers .mdx supplémentaires (tontine, mémoire) pour peupler `/projects`.
4. Construire `/about`, `/skills`, `/contact` sur le modèle de `app/page.tsx`.
5. Brancher le rendu MDX compilé dans `app/projects/[slug]/page.tsx`
   (ex. `next-mdx-remote` ou import dynamique `import(`@/content/projects/${slug}.mdx`)`).
6. Ajouter `sitemap.ts`, `robots.ts` et les données structurées Schema.org (section 17).

## Icônes

Toutes les icônes viennent de `lucide-react` (SVG). Ne pas utiliser d'emojis
dans les composants — rester cohérent avec la direction artistique
"premium tech/finance/consulting" du document de cadrage.
