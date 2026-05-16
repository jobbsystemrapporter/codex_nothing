# Claude Code — Project Guide

## Quick Start
```bash
npm install
npm run dev      # localhost:5173
npm run build    # production build → dist/
npm run lint     # eslint
npm run test     # vitest
```

## Design System
Nothing OS-inspired. Read `src/design/evidence.md`, `src/design/rules.md`, and `src/design/tokens/` before editing styles.

### Visual Rules
- **Palette**: Black/white first. Red only for alerts/active states.
- **Typography**: Doto (dot-matrix clocks/metrics), Inter (body), Space Grotesk, Space Mono
- **Widgets**: Use `Tile` + `nothing-card`. Container queries (`@min-[300px]:`) not viewport queries.
- **No gradients, no decorative shadows.**

## Adding a Widget
1. Create component in `src/design/widgets/MyWidgetCard.tsx`
2. Export from `src/components/WidgetRegistry.tsx`
3. Add demo to `src/pages/NothingPlaygroundPage.tsx`
4. Ensure `npm run lint && npm run build` pass

## Widget Registry
`WidgetRegistry.tsx` maps string types to components. Supported types:
```
ClockCard, AnalogClockCard, LiveWeatherAccentCard, QuickNotesCard,
BatterySegmentsCard, NetworkTrendCard, NowPlayingEqualizerCard,
ScheduleCalendarCard, CalculatorCard, StopwatchCard, AlarmListCard,
CryptoTickerCard, CpuMonitorCard, ScreenTimeCard, PomodoroCard,
DiceRollCard, VolumeSliderCard, BrightnessSliderCard, ... (52 total)
```

## Standalone Widget Mode
Append `?widget=TYPE` to URL to render a single widget (used by Übersicht).
Example: `https://site.com/?widget=ClockCard`

## Desktop vs Mobile
- Desktop: `useMediaQuery("(max-width: 768px)")` returns false
  - Windows are absolute-positioned, draggable, resizable
  - Masonry layout in `Desktop.tsx`
- Mobile: returns true
  - Windows are stacked cards in scrollable column
  - Taskbar has app launcher + settings + recent apps + clock

## Übersicht Integration
macOS desktop widgets via [Übersicht](http://tracesof.net/uebersicht/).
- Wrappers in `ubersicht/widgets/`
- Each widget loads via iframe to `/?widget=TYPE`
- Copy widgets to `~/Library/Application Support/Übersicht/widgets/`

## Important Context
- Build target: GitHub Pages (static site)
- Backend (Express) runs locally only on port 3001
- Demo mode: login with `demo` / `demo123` works offline
- Widget settings (opacity, border, shadow, glass) persist in localStorage
- 52 widgets total, most use hardcoded demo data. Live data: Clock, Weather (Open-Meteo)
