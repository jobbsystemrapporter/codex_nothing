import { useEffect, useRef } from "react";
import { Clock, Cloud, FileText, Activity, Battery, Wifi, Music, CalendarDays, BarChart3, MapPin, HardDrive, Globe, Timer, Sun, Thermometer, Repeat, Calculator, Volume2, SunDim, Cpu, Bell, Eye, Dices } from "lucide-react";

const apps = [
  { type: "ClockCard", label: "Clock", icon: <Clock className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "AnalogClockCard", label: "Analog", icon: <Clock className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "LiveWeatherAccentCard", label: "Weather", icon: <Cloud className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "QuickNotesCard", label: "Notes", icon: <FileText className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ActivityPulseCard", label: "Activity", icon: <Activity className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "BatterySegmentsCard", label: "Battery", icon: <Battery className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "NetworkTrendCard", label: "Network", icon: <Wifi className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "NowPlayingEqualizerCard", label: "Music", icon: <Music className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ScheduleCalendarCard", label: "Calendar", icon: <CalendarDays className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "MarketDotsChartCard", label: "Market", icon: <BarChart3 className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "CoordinatesCircleCard", label: "Location", icon: <MapPin className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "StorageCard", label: "Storage", icon: <HardDrive className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "WeatherMatrixCard", label: "Weather 2", icon: <Cloud className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "WorldTimeMapCard", label: "World Time", icon: <Globe className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "MemorySegmentsCard", label: "Memory", icon: <HardDrive className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "OverLimitTimerCard", label: "Timer", icon: <Timer className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "StepsStreakCard", label: "Steps", icon: <Activity className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "TempRangeCircleCard", label: "Temp", icon: <Thermometer className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "WeatherStatusCard", label: "Weather 3", icon: <Sun className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ForecastStripCard", label: "Forecast", icon: <Cloud className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "DayAgendaCard", label: "Agenda", icon: <CalendarDays className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ConnectivityPillsCard", label: "Connect", icon: <Wifi className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ToggleTile", label: "Tiles", icon: <Repeat className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "CalculatorCard", label: "Calc", icon: <Calculator className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "StopwatchCard", label: "Stopwatch", icon: <Timer className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "VolumeSliderCard", label: "Volume", icon: <Volume2 className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "BrightnessSliderCard", label: "Bright", icon: <SunDim className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "CpuMonitorCard", label: "CPU", icon: <Cpu className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "CryptoTickerCard", label: "Crypto", icon: <BarChart3 className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "AlarmListCard", label: "Alarms", icon: <Bell className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "ScreenTimeCard", label: "Usage", icon: <Eye className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "PomodoroCard", label: "Focus", icon: <Timer className="h-6 w-6" strokeWidth={1.5} /> },
  { type: "DiceRollCard", label: "Dice", icon: <Dices className="h-6 w-6" strokeWidth={1.5} /> },
];

type AppLauncherProps = {
  onOpen: (type: string) => void;
  onClose: () => void;
};

export function AppLauncher({ onOpen, onClose }: AppLauncherProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    setTimeout(() => {
      document.addEventListener("pointerdown", handlePointer);
      document.addEventListener("keydown", handleKey);
    }, 10);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
      <div
        ref={ref}
        className="nothing-card w-full max-w-[640px] max-h-[85dvh] overflow-y-auto rounded-t-[24px] sm:rounded-[var(--radius-lg)] p-6"
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[var(--text-muted)]/30 sm:hidden" />
        <h2 className="mb-6 text-[22px] font-light tracking-[-0.02em]">Applications</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {apps.map((app) => (
            <button
              key={app.type}
              onClick={() => onOpen(app.type)}
              className="flex flex-col items-center gap-2 rounded-[16px] p-3 transition-colors hover:bg-[rgba(255,255,255,0.06)] active:scale-95"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--surface)] ring-1 ring-[var(--border)] text-[var(--text-muted)]">
                {app.icon}
              </div>
              <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{app.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
