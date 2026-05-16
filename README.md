# Codex Nothing — Web OS + AI Coding Environment

> A fully functional Nothing OS-inspired web operating system with 52 widgets, dual-mode window manager, auth, and built-in AI coding assistant configurations.

[![Deploy](https://github.com/jobbsystemrapporter/codex_nothing/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/jobbsystemrapporter/codex_nothing/actions/workflows/deploy-gh-pages.yml)

![Codex Nothing Desktop](docs/screenshots/screenshot.png)

---

## What is this?

A web-based operating system that runs in your browser. It features:

- **52 widgets** — clocks, weather, notes, calendar, calculator, crypto, CPU monitor, stopwatch, alarms, dice, pomodoro, and more
- **Desktop mode** — floating draggable windows with masonry layout
- **Mobile mode** — stacked cards optimized for touch
- **Window manager** — open, close, minimize, drag, resize
- **Auth system** — login/register with offline demo mode (`demo` / `demo123`)
- **Widget settings** — per-widget opacity, border, shadow, glass effect
- **macOS desktop widgets** — via Übersicht (52 wrapper widgets included)
- **AI-ready codebase** — configs for Cursor, Copilot, Claude, Windsurf, Kimi, and Codeium

---

## Live Demo

🔗 [Open Web OS](https://jobbsystemrapporter.github.io/codex_nothing/)

> Login with `demo` / `demo123` for offline demo mode. No backend required.

### Standalone Widget Mode

Any widget can be rendered standalone via URL query param:
```
https://jobbsystemrapporter.github.io/codex_nothing/?widget=ClockCard
https://jobbsystemrapporter.github.io/codex_nothing/?widget=LiveWeatherAccentCard
https://jobbsystemrapporter.github.io/codex_nothing/?widget=PomodoroCard
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS v4.2.2 |
| Backend | Express + SQLite3 + JWT + Socket.io (local dev only) |
| Icons | Lucide React |
| Fonts | Doto, Inter, Space Grotesk, Space Mono |
| Deploy | GitHub Pages via GitHub Actions |

---

## Quick Start

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production → dist/
npm run lint     # eslint
npm run test     # vitest
```

---

## Project Structure

```
src/
  design/
    evidence.md         — Design rationale
    rules.md            — Visual rules
    tokens/             — CSS variables
    primitives/         — Tile, Label, DotText, IconButton
    widgets/            — 52 widget components
    hooks/              — useWidgetTheme, useLiveTime
  components/
    Desktop.tsx         — Desktop shell + masonry layout
    Window.tsx          — Draggable/resizable window frame
    Taskbar.tsx         — Bottom status bar (desktop + mobile)
    WidgetRegistry.tsx  — Widget type → component mapping
    AppLauncher.tsx     — App grid launcher
  context/
    AuthProvider.tsx    — JWT auth + offline demo fallback
    WidgetSettingsContext.tsx — Per-widget opacity/border/shadow/glass
  pages/
    NothingPlaygroundPage.tsx — Widget showcase gallery
ubersicht/
  widgets/            — 52 Übersicht wrappers for macOS desktop
  README.md           — Übersicht installation guide
```

---

## AI Coding Configs

This repo includes configuration files for major AI coding assistants:

| File | Tool |
|------|------|
| `DESIGN_SYSTEM.md` | Universal reference for all AI tools |
| `.cursorrules` | Cursor IDE |
| `.windsurfrules` | Windsurf |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `CLAUDE.md` | Claude Code |
| `AGENTS.md` | Kimi, Codeium, generic agents |

All configs point to `DESIGN_SYSTEM.md` which contains copy-paste widget templates, CSS token tables, typography rules, and container query breakpoints.

---

## Übersicht — macOS Desktop Widgets

Run any of the 52 widgets directly on your macOS desktop:

```bash
# 1. Install Übersicht
brew install --cask ubersicht

# 2. Copy widgets
cp -r ubersicht/widgets/* ~/Library/Application\ Support/Übersicht/widgets/

# 3. Done — widgets appear on your desktop
```

Each Übersicht widget loads the standalone web widget via iframe. No build step needed.

See [ubersicht/README.md](ubersicht/README.md) for full guide.

---

## Design System Rules

- **Colors**: Black/white first. Red (`var(--danger)`) only for alerts/active states
- **Typography**: Doto for clocks/metrics only; Inter for body; Space Grotesk/Mono for headings/code
- **Responsive**: Container queries (`@min-[300px]:`) — never viewport media queries in widgets
- **No gradients, no decorative shadows**
- **Shapes**: Rounded corners (`var(--radius-lg)` = 24px)

Read `DESIGN_SYSTEM.md` for the complete reference with copy-paste templates.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming and PR conventions.

---

## License

MIT
