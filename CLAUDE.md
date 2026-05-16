# Claude Code — Codex Nothing Guide

> **Start with:** `DESIGN_SYSTEM.md` — universal reference with widget templates, token tables, and concrete examples.

## Quick Commands
```bash
npm run dev      # localhost:5173
npm run build    # dist/
npm run lint     # eslint
npm run test     # vitest
```

## Creating a New Widget

**Step 1:** Read `DESIGN_SYSTEM.md` → copy the widget template

**Step 2:** Create component in `src/design/widgets/MyWidgetCard.tsx`

**Step 3:** Register in `src/components/WidgetRegistry.tsx`:
```tsx
case "MyWidgetCard": return <MyWidgetCard ... />;
```

**Step 4:** Add demo in `src/pages/NothingPlaygroundPage.tsx`:
```tsx
<WidgetCard code="MYWID-001">
  <WidgetRegistry type="MyWidgetCard" />
</WidgetCard>
```

**Step 5:** Run `npm run lint && npm run build`

## Design System Essentials

### Tokens (always use these, never hardcode)
| Token | Use for |
|-------|---------|
| `var(--surface-2)` | Card backgrounds |
| `var(--text)` | Primary text |
| `var(--text-muted)` | Secondary text |
| `var(--danger)` | Red accent / active / alert |
| `var(--border)` | Borders, dividers |
| `var(--radius-lg)` | Card border-radius (24px) |

### Responsive Strategy
- **Container queries only:** `@min-[300px]:`, `@min-[360px]:`, `@min-[500px]:`
- **Never:** `md:`, `lg:`, `sm:`
- Tile has `container-type: size` built-in

### Typography
- **Doto:** Clocks, counters, short metrics only (max 3-4 words)
- **Inter:** Body text, labels, descriptions
- **Space Grotesk:** Headings
- **Space Mono:** Code, technical values

## Architecture

### Desktop vs Mobile
```tsx
const isMobile = useMediaQuery("(max-width: 768px)");
```
- **Desktop:** Absolute-positioned draggable windows, masonry layout
- **Mobile:** Stacked cards, scrollable column, compact heights

### Standalone Widget Mode
URL query `?widget=ClockCard` renders a single widget (used by Übersicht):
```
https://stemrapporter.github.io/codex_nothing/?widget=ClockCard
```

### Widget Settings
Opacity, border, shadow, glass effect — all persisted in localStorage.
Set via desktop taskbar ⚙ button or mobile taskbar.

## Important Constraints
- No external UI libraries (Material UI, Chakra, etc.)
- No gradients, no decorative shadows
- No viewport media queries inside widgets
- Keep widget logic pure — side effects in hooks only
