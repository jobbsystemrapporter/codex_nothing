# Contributing

Thank you for improving `codex-nothing`.

## Branch standard
Use one of these branch prefixes:
- `feat/<short-topic>`
- `fix/<short-topic>`
- `docs/<short-topic>`
- `refactor/<short-topic>`

Examples:
- `feat/add-weather-alert-widget`
- `fix/playground-mobile-overlap`
- `docs/update-usage-guide`

## Commit style
Keep commit messages clear and action-oriented:
- `feat: add compact connectivity widget`
- `fix: prevent tile overlap on small screens`
- `docs: add GitHub Pages setup section`

## Pull request standard
Each PR should include:
1. What changed
2. Why it changed
3. Screenshot(s) if UI changed
4. Validation results (`npm run lint`, `npm run build`)
5. Known risks (if any)

## Design rule compliance
Before opening a PR, verify:
- uses tokens/primitives/widgets from `src/design`
- no visual drift to generic SaaS styling
- red accent used only for alert/active/status signals
- mobile and desktop layouts are stable (no overlap/clipping)
