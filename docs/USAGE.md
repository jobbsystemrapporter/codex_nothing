# Usage Guide

This document explains how to use `codex-nothing` as a universal design layer in other projects.

## 1. Copy the design layer
From this repository, copy:
- `src/design`
- `src/styles/globals.css`
- `AGENTS.md`
- `rules.md`

## 2. Import global styles
In your app entry file (for example `src/main.tsx`), import:
```ts
import "./styles/globals.css";
```

## 3. Keep tokens as source of truth
Build new UI from:
- `src/design/tokens/*`
- `src/design/primitives/*`
- `src/design/widgets/*`

Avoid one-off styling when a token or primitive already exists.

## 4. Render a playground route
Use `src/pages/NothingPlaygroundPage.tsx` as:
- a style reference
- a QA page
- a component catalog for future UI work

## 5. Codex workflow in your target repo
Add this instruction in your prompt:
```text
Use AGENTS.md and rules.md strictly. Build all UI with the codex-nothing design layer.
```

## 6. Verify before merge
Run:
```bash
npm run lint
npm run build
```

## 7. Optional: publish preview
If you use GitHub Pages with Actions:
- keep `.github/workflows/deploy-pages.yml`
- keep Vite `base` config in `vite.config.ts`
