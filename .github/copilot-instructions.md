# GitHub Copilot Instructions — Codex Nothing

## Design System
Nothing OS-inspired design system with strict visual rules:
- **Colors**: Black/white first. Red (`#ff0000` / `var(--danger)`) only for status/alert/active emphasis
- **Fonts**: Doto (dot-matrix, limited use), Inter (body), Space Grotesk (headings), Space Mono (code)
- **Shapes**: Rounded corners (`var(--radius-lg)`), no sharp edges
- **Effects**: No gradients, no decorative shadows. Subtle borders only.

## Architecture
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4.2.2
- **Backend**: Express + SQLite3 + JWT (local development only)
- **Deploy**: GitHub Pages via GitHub Actions

## Widget Development Checklist
When creating or modifying a widget:
1. Use `Tile` primitive from `src/design/primitives/Tile.tsx`
2. Use `useWidgetTheme()` hook for light/dark mode
3. Use container queries (`@min-[300px]:`) for responsiveness
4. Base metric font: 24-32px, scale up gradually
5. Add widget code label in format `ABCDE-000`
6. Register in `WidgetRegistry.tsx`
7. Add demo to `NothingPlaygroundPage.tsx`
8. Run `npm run lint && npm run build`

## Key Files
- `src/components/Desktop.tsx` — Desktop shell with masonry layout
- `src/components/Window.tsx` — Draggable/resizable window frame
- `src/components/WidgetRegistry.tsx` — Widget type → component mapping
- `src/design/primitives/Tile.tsx` — Card primitive
- `src/styles/globals.css` — CSS variables and `nothing-card` styles

## Constraints
- Do NOT add external UI libraries (no Material UI, no Chakra, etc.)
- Do NOT use viewport media queries for widgets (`md:`, `lg:`) — use container queries
- Do NOT modify AGENTS.md coding rules without updating the corresponding code
- Keep widget logic pure — no side effects in render
