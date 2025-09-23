App folder structure

- routes: Route components and their per-route CSS (co-located)
- components: Shared components
  - ui: Reusable UI primitives (buttons, cards, inputs)
- lib: Utilities/helpers (formatters, data fetching, misc)
- types: Shared TypeScript types/interfaces
- assets: App-scoped assets (icons/images). Large/static files → public/
- app.css: Global styles (resets, tokens)

Conventions

- Prefer Tailwind utilities in TSX for speed; use @apply in per-route CSS to condense repeated utility sets
- Co-locate page CSS with its route and import it directly in the route
- Keep global-only rules in app.css

