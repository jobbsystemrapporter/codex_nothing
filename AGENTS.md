# AGENTS.md

These rules apply to all work in this repository.

> **For widget development:** Read `DESIGN_SYSTEM.md` first — it has copy-paste templates, token reference, and concrete code examples.

## Core directive
- Use the Nothing-inspired design layer in `src/design` as the primary system.
- Do not replace the design language with generic SaaS/agency styling.

## Source of truth
- **Design System Guide:** `DESIGN_SYSTEM.md` — templates, tokens, examples
- Evidence: `src/design/evidence.md`
- Rules: `src/design/rules.md` and root `rules.md`
- Tokens: `src/design/tokens/*`
- Primitives: `src/design/primitives/*`
- Widgets: `src/design/widgets/*`

## Typography and loading
- Required Google Fonts: `Doto`, `Inter`, `Space Grotesk`, `Space Mono`.
- Keep dot-matrix display usage limited to clocks, counters, short metrics and labels.
- Use readable sans-serif for body copy and longer UI text.

## Implementation rules
- Read relevant files before edits.
- Prefer small, safe, additive changes.
- Reuse tokens and primitives before creating new one-off styles.
- Keep layout, primitives, and widget logic separated.
- Preserve existing behavior unless explicitly asked to change it.
- Avoid gradients and decorative shadows unless requested.
- Keep black/white first; use red only for status/alert/active emphasis.

## Playground rules
- Update `src/pages/NothingPlaygroundPage.tsx` when adding new widgets.
- Every showcased widget should have a code label format: `ABCDE-000`.
- Keep desktop and mobile behavior stable (no overlap, no clipping).

## Verification
- Run `npm run lint` and `npm run build` before finalizing.
- Report changed files and remaining risks clearly.
