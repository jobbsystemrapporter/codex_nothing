# GitHub Copilot — Codex Nothing Instructions

> **Primary reference:** `DESIGN_SYSTEM.md` — contains copy-paste widget templates, CSS token table, typography rules, and responsive breakpoint guide.

## When Completing a Task

### If creating a widget:
1. Read `DESIGN_SYSTEM.md` → "Snabbstart — Skapa en ny widget"
2. Copy the template and adapt it
3. Use `Tile` from `src/design/primitives/Tile.tsx`
4. Use `useWidgetTheme()` for light/dark support
5. Use container queries (`@min-[300px]:`) — never `md:`
6. Register in `src/components/WidgetRegistry.tsx`
7. Add to `src/pages/NothingPlaygroundPage.tsx`
8. Run `npm run lint && npm run build`

### If editing layout:
1. Read `src/components/Desktop.tsx` for masonry behavior
2. Read `src/components/Window.tsx` for window chrome
3. Make minimal changes — affects both desktop and mobile

## Design Tokens (always use these)
- `var(--bg)` — app background
- `var(--surface-2)` — card background
- `var(--text)` — primary text
- `var(--text-muted)` — secondary text
- `var(--danger)` — red / alert / active
- `var(--border)` — borders
- `var(--radius-lg)` — 24px border radius

## Constraints
- No external UI libraries
- No viewport media queries in widgets
- No gradients or decorative shadows
- Doto font: clocks, counters, short metrics ONLY
