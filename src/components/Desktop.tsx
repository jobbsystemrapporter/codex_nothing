import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../design/hooks/useTheme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useViewportSize } from "../hooks/useViewportSize";
import { Taskbar } from "./Taskbar";
import { Window } from "./Window";
import { AppLauncher } from "./AppLauncher";
import { WidgetRegistry } from "./WidgetRegistry";
import type { WidgetInstance } from "./types";

const defaultWindows: WidgetInstance[] = [
  { id: "clock-1", type: "ClockCard", x: 40, y: 40, w: 380, h: 520, minimized: false },
  { id: "weather-1", type: "LiveWeatherAccentCard", x: 450, y: 40, w: 340, h: 280, minimized: false },
  { id: "notes-1", type: "QuickNotesCard", x: 450, y: 350, w: 400, h: 260, minimized: false },
  { id: "tasks-1", type: "ScheduleCalendarCard", x: 860, y: 40, w: 340, h: 400, minimized: false },
  { id: "battery-1", type: "BatterySegmentsCard", x: 40, y: 580, w: 280, h: 200, minimized: false },
  { id: "network-1", type: "NetworkTrendCard", x: 340, y: 580, w: 300, h: 200, minimized: false },
  { id: "music-1", type: "NowPlayingEqualizerCard", x: 660, y: 580, w: 480, h: 240, minimized: false },
];

function clampWindow(win: WidgetInstance, vw: number, vh: number): WidgetInstance {
  const w = Math.max(200, Math.min(win.w, vw));
  const h = Math.max(150, Math.min(win.h, vh));
  return {
    ...win,
    w,
    h,
    x: Math.max(0, Math.min(win.x, vw - w)),
    y: Math.max(0, Math.min(win.y, vh - h)),
  };
}

export function Desktop() {
  const { user, logout } = useAuth();
  const { mode } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const viewport = useViewportSize();
  const [windows, setWindows] = useState<WidgetInstance[]>(() =>
    defaultWindows.map((w) => clampWindow(w, viewport.width, viewport.height))
  );
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Viewport clamping is handled per-window in the Window component and on open

  const openWindow = (type: string) => {
    if (isMobile) {
      const id = `${type}-${Date.now()}`;
      setWindows((prev) => [
        ...prev.map((w) => ({ ...w, minimized: true })),
        { id, type, x: 0, y: 0, w: viewport.width, h: Math.floor(viewport.height * 0.75), minimized: false },
      ]);
      setActiveWindow(id);
      setShowLauncher(false);
      return;
    }
    const id = `${type}-${Date.now()}`;
    const count = windows.length;
    const x = 60 + (count % 5) * 30;
    const y = 60 + (count % 5) * 20;
    const newWin = clampWindow(
      { id, type, x, y, w: 360, h: 280, minimized: false },
      viewport.width,
      viewport.height
    );
    setWindows((prev) => [...prev, newWin]);
    setActiveWindow(id);
    setShowLauncher(false);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    if (activeWindow === id) setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    if (isMobile) {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: false } : { ...w, minimized: true }))
      );
    } else {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
    }
    setActiveWindow(id);
  };

  const bringToFront = (id: string) => setActiveWindow(id);

  const visibleWindows = windows.filter((w) => !w.minimized);
  const minimizedWindows = windows.filter((w) => w.minimized);

  return (
    <div
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${mode === "light" ? "nothing-canvas-soft" : "nothing-grid-bg"}`}
    >
      {/* Desktop / Mobile Content */}
      {isMobile ? (
        // Mobile: stacked cards
        <div className="flex h-full flex-col gap-3 overflow-y-auto px-3 pt-3 pb-24">
          {visibleWindows.map((win, index) => (
            <Window
              key={win.id}
              instance={win}
              zIndex={activeWindow === win.id ? 100 : 10 + index}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
              onUpdate={(updates) =>
                setWindows((prev) => prev.map((w) => (w.id === win.id ? { ...w, ...updates } : w)))
              }
              isMobile
            >
              <WidgetRegistry type={win.type} />
            </Window>
          ))}
          {minimizedWindows.map((win) => (
            <button
              key={win.id}
              onClick={() => restoreWindow(win.id)}
              className="flex items-center justify-between rounded-[var(--radius-lg)] bg-[var(--surface-2)] px-4 py-3 ring-1 ring-[var(--border)]"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {win.type.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">Tap to open</span>
            </button>
          ))}
        </div>
      ) : (
        // Desktop: floating windows
        <>
          {/* Desktop Icons */}
          <div className="absolute left-4 top-4 flex flex-col gap-4">
            <button
              onClick={() => setShowLauncher(true)}
              className="flex flex-col items-center gap-2 rounded-[18px] p-3 transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--surface-2)] ring-1 ring-[var(--border)]">
                <span className="text-[20px]">◩</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Apps</span>
            </button>
          </div>

          {/* Windows */}
          {visibleWindows.map((win, index) => (
            <Window
              key={win.id}
              instance={win}
              zIndex={activeWindow === win.id ? 100 : 10 + index}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
              onUpdate={(updates) =>
                setWindows((prev) => prev.map((w) => (w.id === win.id ? { ...w, ...updates } : w)))
              }
            >
              <WidgetRegistry type={win.type} />
            </Window>
          ))}
        </>
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onRestore={restoreWindow}
        onOpenLauncher={() => setShowLauncher(true)}
        currentTime={currentTime}
        user={user}
        onLogout={logout}
        isMobile={isMobile}
      />

      {/* App Launcher */}
      {showLauncher && (
        <AppLauncher
          onOpen={openWindow}
          onClose={() => setShowLauncher(false)}
        />
      )}
    </div>
  );
}
