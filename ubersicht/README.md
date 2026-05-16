# Übersicht Widgets for Nothing OS

Desktop widgets for macOS using [Übersicht](http://tracesof.net/uebersicht/).

## Installation

1. Install Übersicht: `brew install --cask ubersicht` or download from http://tracesof.net/uebersicht/
2. Copy widget folders to `~/Library/Application Support/Übersicht/widgets/`
3. Each widget auto-loads from the web app — no build step needed

## Widget List

| Widget | Size | URL Param |
|--------|------|-----------|
| nothing-clock | 320×420 | `?widget=ClockCard` |
| nothing-weather | 340×260 | `?widget=LiveWeatherAccentCard` |
| nothing-notes | 340×220 | `?widget=QuickNotesCard` |
| nothing-calendar | 360×340 | `?widget=ScheduleCalendarCard` |
| nothing-battery | 280×190 | `?widget=BatterySegmentsCard` |
| nothing-network | 300×190 | `?widget=NetworkTrendCard` |
| nothing-music | 360×240 | `?widget=NowPlayingEqualizerCard` |
| nothing-analog-clock | 280×280 | `?widget=AnalogClockCard` |
| nothing-crypto | 320×180 | `?widget=CryptoTickerCard` |
| nothing-pomodoro | 280×280 | `?widget=PomodoroCard` |
| nothing-stopwatch | 300×200 | `?widget=StopwatchCard` |
| nothing-alarms | 340×320 | `?widget=AlarmListCard` |
| nothing-calculator | 280×360 | `?widget=CalculatorCard` |
| nothing-dice | 260×240 | `?widget=DiceRollCard` |
| nothing-cpu | 320×220 | `?widget=CpuMonitorCard` |
| nothing-screen-time | 300×220 | `?widget=ScreenTimeCard` |

## Customizing Size

Edit any widget's `index.coffee` and change:
```coffee
style: """
  width: 320px
  height: 240px
"""
```

## Offline Mode

Widgets load from `https://stemrapporter.github.io/codex_nothing/`. For offline use, run the web app locally (`npm run dev`) and change the iframe URL to `http://localhost:5173/?widget=ClockCard`.
