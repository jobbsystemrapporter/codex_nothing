import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const widgets = [
  { type: "ClockCard", name: "nothing-clock", w: 340, h: 420, title: "Nothing Clock" },
  { type: "AnalogClockCard", name: "nothing-analog-clock", w: 280, h: 280, title: "Nothing Analog Clock" },
  { type: "LiveWeatherAccentCard", name: "nothing-weather", w: 340, h: 260, title: "Nothing Weather" },
  { type: "QuickNotesCard", name: "nothing-notes", w: 340, h: 220, title: "Nothing Notes" },
  { type: "ScheduleCalendarCard", name: "nothing-calendar", w: 360, h: 340, title: "Nothing Calendar" },
  { type: "BatterySegmentsCard", name: "nothing-battery", w: 280, h: 190, title: "Nothing Battery" },
  { type: "NetworkTrendCard", name: "nothing-network", w: 300, h: 190, title: "Nothing Network" },
  { type: "NowPlayingEqualizerCard", name: "nothing-music", w: 360, h: 240, title: "Nothing Music" },
  { type: "CryptoTickerCard", name: "nothing-crypto", w: 320, h: 180, title: "Nothing Crypto" },
  { type: "PomodoroCard", name: "nothing-pomodoro", w: 280, h: 280, title: "Nothing Pomodoro" },
  { type: "StopwatchCard", name: "nothing-stopwatch", w: 300, h: 200, title: "Nothing Stopwatch" },
  { type: "AlarmListCard", name: "nothing-alarms", w: 340, h: 320, title: "Nothing Alarms" },
  { type: "CalculatorCard", name: "nothing-calculator", w: 280, h: 360, title: "Nothing Calculator" },
  { type: "DiceRollCard", name: "nothing-dice", w: 260, h: 240, title: "Nothing Dice" },
  { type: "CpuMonitorCard", name: "nothing-cpu", w: 320, h: 220, title: "Nothing CPU" },
  { type: "ScreenTimeCard", name: "nothing-screen-time", w: 300, h: 220, title: "Nothing Screen Time" },
  { type: "ActivityPulseCard", name: "nothing-activity", w: 300, h: 200, title: "Nothing Activity" },
  { type: "StorageCard", name: "nothing-storage", w: 280, h: 180, title: "Nothing Storage" },
  { type: "MemorySegmentsCard", name: "nothing-memory", w: 280, h: 180, title: "Nothing Memory" },
  { type: "WeatherCard", name: "nothing-weather-simple", w: 260, h: 200, title: "Nothing Weather Simple" },
  { type: "ForecastStripCard", name: "nothing-forecast", w: 340, h: 200, title: "Nothing Forecast" },
  { type: "DayAgendaCard", name: "nothing-agenda", w: 300, h: 220, title: "Nothing Agenda" },
  { type: "EventCard", name: "nothing-event", w: 280, h: 160, title: "Nothing Event" },
  { type: "StepsStreakCard", name: "nothing-steps", w: 260, h: 180, title: "Nothing Steps" },
  { type: "MarketDotsChartCard", name: "nothing-market", w: 320, h: 200, title: "Nothing Market" },
  { type: "VolumeSliderCard", name: "nothing-volume", w: 260, h: 160, title: "Nothing Volume" },
  { type: "BrightnessSliderCard", name: "nothing-brightness", w: 260, h: 160, title: "Nothing Brightness" },
  { type: "CoordinatesCircleCard", name: "nothing-coordinates", w: 280, h: 280, title: "Nothing Coordinates" },
  { type: "WorldTimeMapCard", name: "nothing-world-time", w: 320, h: 240, title: "Nothing World Time" },
  { type: "GmtDotCard", name: "nothing-gmt", w: 260, h: 180, title: "Nothing GMT" },
  { type: "TempRangeCircleCard", name: "nothing-temp-range", w: 260, h: 200, title: "Nothing Temp Range" },
  { type: "StatusPillsCard", name: "nothing-status", w: 300, h: 160, title: "Nothing Status" },
  { type: "FlightStatusCompactCard", name: "nothing-flight", w: 340, h: 180, title: "Nothing Flight" },
  { type: "WeeklyMarksCard", name: "nothing-weekly", w: 320, h: 200, title: "Nothing Weekly" },
  { type: "WeatherMatrixCard", name: "nothing-weather-matrix", w: 300, h: 240, title: "Nothing Weather Matrix" },
  { type: "WeatherStatusCard", name: "nothing-weather-status", w: 280, h: 220, title: "Nothing Weather Status" },
  { type: "ConnectivityPillsCard", name: "nothing-connectivity", w: 280, h: 160, title: "Nothing Connectivity" },
  { type: "CompassRoseCard", name: "nothing-compass", w: 260, h: 260, title: "Nothing Compass" },
  { type: "RecordCircleCard", name: "nothing-record", w: 220, h: 220, title: "Nothing Record" },
  { type: "DotCountMiniCard", name: "nothing-dot-count", w: 260, h: 140, title: "Nothing Dot Count" },
  { type: "DotBarTimeCard", name: "nothing-dot-bar", w: 280, h: 160, title: "Nothing Dot Bar" },
  { type: "NumberLightCard", name: "nothing-number", w: 220, h: 160, title: "Nothing Number" },
  { type: "DotNumberBoardCard", name: "nothing-number-board", w: 300, h: 200, title: "Nothing Number Board" },
  { type: "StatCard", name: "nothing-stat", w: 240, h: 160, title: "Nothing Stat" },
  { type: "LimitRedCard", name: "nothing-limit", w: 240, h: 160, title: "Nothing Limit" },
  { type: "OverLimitTimerCard", name: "nothing-timer", w: 260, h: 160, title: "Nothing Timer" },
  { type: "PairDeviceCard", name: "nothing-pair", w: 240, h: 160, title: "Nothing Pair" },
  { type: "PhotoFrameCard", name: "nothing-photo", w: 280, h: 280, title: "Nothing Photo" },
  { type: "NowPlayingCard", name: "nothing-now-playing", w: 300, h: 180, title: "Nothing Now Playing" },
  { type: "StorageMultiRowCard", name: "nothing-storage-multi", w: 320, h: 220, title: "Nothing Storage Multi" },
  { type: "ToggleTile", name: "nothing-toggles", w: 280, h: 240, title: "Nothing Toggles" },
  { type: "QuickSettingsListCard", name: "nothing-quick-settings", w: 300, h: 220, title: "Nothing Quick Settings" },
];

const baseUrl = "https://jobbsystemrapporter.github.io/codex_nothing";

for (const w of widgets) {
  const dir = path.join(__dirname, "widgets", w.name);
  fs.mkdirSync(dir, { recursive: true });

  const coffee = `command: "echo ''"
refreshFrequency: false

render: -> """
  <iframe
    src="${baseUrl}/?widget=${w.type}"
    style="width:100%;height:100%;border:none;border-radius:20px;"
    sandbox="allow-scripts"
  ></iframe>
"""

style: """
  width: ${w.w}px
  height: ${w.h}px
  background: transparent
"""
`;

  fs.writeFileSync(path.join(dir, "index.coffee"), coffee);
}

console.log(`Generated ${widgets.length} Übersicht widgets in ./widgets/`);
