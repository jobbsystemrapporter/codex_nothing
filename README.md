# codex-nothing

Universal, evidence-based Nothing-inspired design library for React + TypeScript projects.

[![Deploy Playground](https://github.com/jobbsystemrapporter/codex_nothing/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/jobbsystemrapporter/codex_nothing/actions/workflows/deploy-gh-pages.yml)
[![Live Playground](https://img.shields.io/badge/Live%20Preview-GitHub%20Pages-black)](https://jobbsystemrapporter.github.io/codex_nothing/)

This repository is built for **Codex-first workflows**: strong rules, reusable primitives, modular widgets, and a complete playground for visual validation.

## Live preview
- [Open Live Playground](https://jobbsystemrapporter.github.io/codex_nothing/)

## Screenshots
### Playground overview (top section)
![Playground top](docs/screenshots/playground-top-light.png)

### Full playground (desktop)
![Playground full desktop](docs/screenshots/playground-full-light.png)

### Full playground (mobile)
![Playground full mobile](docs/screenshots/playground-mobile-light.png)

## Repository structure
- `src/design/evidence.md` — evidence boundaries and interpretation policy
- `src/design/rules.md` — design and implementation rules
- `src/design/tokens/*` — color, spacing, radius, type, motion, shadows
- `src/design/primitives/*` — low-level reusable UI building blocks
- `src/design/widgets/*` — modular system widgets
- `src/pages/NothingPlaygroundPage.tsx` — showcase and visual QA surface
- `AGENTS.md` and `rules.md` — Codex behavior directives

## Required fonts
The design system expects:
- `Doto`
- `Inter`
- `Space Grotesk`
- `Space Mono`

Font loading is already included in `src/styles/globals.css`.

## Local development
```bash
npm install
npm run dev
```

## Quality checks
```bash
npm run lint
npm run build
```

## Use this in another project
See [docs/USAGE.md](docs/USAGE.md) for a step-by-step integration guide.

## Codex integration
To force Codex to follow this design language in another project:
1. Copy `AGENTS.md`, `rules.md`, `src/design`, and `src/styles/globals.css`.
2. Import `src/styles/globals.css` in your app entry.
3. Keep new UI built from tokens/primitives/widgets instead of one-off CSS.

## Branch and contribution standard
See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming and pull request conventions.
