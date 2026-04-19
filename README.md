# codex-nothing

Universal, evidence-based Nothing-inspired design library for React + TypeScript projects.

This repo is made for Codex-driven UI work: tokens, primitives, widgets, and a live playground in one reusable package.

## What is included
- `src/design/evidence.md` — evidence and interpretation boundaries
- `src/design/rules.md` — visual and implementation rules
- `src/design/tokens/*` — colors, spacing, radius, typography, motion, shadows
- `src/design/primitives/*` — reusable UI building blocks
- `src/design/widgets/*` — composable widget-level components
- `src/pages/NothingPlaygroundPage.tsx` — showcase / validation page
- `AGENTS.md` + `rules.md` — Codex directives for consistent output

## Required fonts
Load these Google Fonts for intended look:
- `Doto`
- `Inter`
- `Space Grotesk`
- `Space Mono`

Fonts are already imported in `src/styles/globals.css`.

## Quick start
```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Validation
```bash
npm run lint
npm run build
```

## Reuse in another project
Copy these files/folders:
- `src/design`
- `src/styles/globals.css`
- `AGENTS.md`
- `rules.md`

Then ensure:
- your app imports `src/styles/globals.css`
- your app includes Tailwind setup similar to `src/index.css` and `vite.config.ts`

## GitHub push
```bash
git init
git add .
git commit -m "Initial codex-nothing design library"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
