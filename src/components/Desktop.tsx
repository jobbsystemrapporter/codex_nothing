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

const TASKBAR_HEIGHT = 52;
const MARGIN = 24;
const GAP = 16;

function createDefaultWindows(vw: number, vh: number): WidgetInstance[] {
  const isMobile = vw <= 768;
  const availableWidth = vw - MARGIN * 2;
  const availableHeight = vh - MARGIN - TASKBAR_HEIGHT - 20;

  // Use 3 columns on wide screens, 2 on medium, 1 on narrow
  const cols = availableWidth >= 1200 ? 3 : availableWidth >= 800 ? 2 : 1;
  const colWidth = Math.floor((availableWidth - (cols - 1) * GAP) / cols);

  // Window size presets — mobile gets much more compact heights
  const sizes: Record<string, { w: number; h: number }> = isMobile
    ? {
        ClockCard: { w: colWidth, h: 240 },
        LiveWeatherAccentCard: { w: colWidth, h: 170 },
        QuickNotesCard: { w: colWidth, h: 150 },
        ScheduleCalendarCard: { w: colWidth, h: 220 },
        BatterySegmentsCard: { w: colWidth, h: 130 },
        NetworkTrendCard: { w: colWidth, h: 130 },
        NowPlayingEqualizerCard: { w: colWidth, h: 150 },
      }
    : {
        ClockCard: { w: colWidth, h: Math.min(420, Math.floor(availableHeight * 0.55)) },
        LiveWeatherAccentCard: { w: colWidth, h: Math.min(260, Math.floor(availableHeight * 0.32)) },
        QuickNotesCard: { w: colWidth, h: Math.min(220, Math.floor(availableHeight * 0.28)) },
        ScheduleCalendarCard: { w: colWidth, h: Math.min(340, Math.floor(availableHeight * 0.42)) },
        BatterySegmentsCard: { w: colWidth, h: Math.min(190, Math.floor(availableHeight * 0.25)) },
        NetworkTrendCard: { w: colWidth, h: Math.min(190, Math.floor(availableHeight * 0.25)) },
        NowPlayingEqualizerCard: { w: colWidth, h: Math.min(220, Math.floor(availableHeight * 0.28)) },
      };

  const windows: WidgetInstance[] = [
    { id: "clock-1", type: "ClockCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "weather-1", type: "LiveWeatherAccentCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "notes-1", type: "QuickNotesCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "tasks-1", type: "ScheduleCalendarCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "battery-1", type: "BatterySegmentsCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "network-1", type: "NetworkTrendCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
    { id: "music-1", type: "NowPlayingEqualizerCard", x: 0, y: 0, w: 0, h: 0, minimized: false },
  ];

  // Track column heights for masonry layout
  const colHeights = Array(cols).fill(MARGIN);

  windows.forEach((win) => {
    const size = sizes[win.type] ?? { w: colWidth, h: 240 };
    // Find shortest column
    const colIndex = colHeights.indexOf(Math.min(...colHeights));
    win.x = MARGIN + colIndex * (colWidth + GAP);
    win.y = colHeights[colIndex];
    win.w = size.w;
    win.h = size.h;
    colHeights[colIndex] += size.h + GAP;
  });

  return windows;
}

function clampWindow(win: WidgetInstance, vw: number, vh: number): WidgetInstance {
  const w = Math.max(200, Math.min(win.w, vw - MARGIN * 2));
  const h = Math.max(150, Math.min(win.h, vh - MARGIN - TASKBAR_HEIGHT));
  return {
    ...win,
    w,
    h,
    x: Math.max(MARGIN, Math.min(win.x, vw - w - MARGIN)),
    y: Math.max(MARGIN, Math.min(win.y, vh - h - TASKBAR_HEIGHT - 10)),
  };
}

export function Desktop() {
  const { user, logout } = useAuth();
  const { mode } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const viewport = useViewportSize();
  const [windows, setWindows] = useState<WidgetInstance[]>(() =>
    createDefaultWindows(viewport.width, viewport.height).map((w) =>
      clampWindow(w, viewport.width, viewport.height)
    )
  );
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (type: string) => {
    if (isMobile) {
      const id = `${type}-${Date.now()}`;
      const compactHeights: Record<string, number> = {
        ClockCard: 240, LiveWeatherAccentCard: 170, QuickNotesCard: 150,
        ScheduleCalendarCard: 220, BatterySegmentsCard: 130, NetworkTrendCard: 130,
        NowPlayingEqualizerCard: 150,
      };
      setWindows((prev) => [
        ...prev,
        { id, type, x: 0, y: 0, w: viewport.width, h: compactHeights[type] ?? 180, minimized: false },
      ]);
      setActiveWindow(id);
      setShowLauncher(false);
      return;
    }
    const id = `${type}-${Date.now()}`;
    const count = windows.length;
    const x = MARGIN + (count % 5) * 30;
    const y = MARGIN + (count % 5) * 25;
    const newWin = clampWindow(
      { id, type, x, y, w: 340, h: 240, minimized: false },
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
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
    setActiveWindow(id);
  };

  const bringToFront = (id: string) => setActiveWindow(id);

  const visibleWindows = windows.filter((w) => !w.minimized);

  return (
    <div
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${mode === "light" ? "nothing-canvas-soft" : "nothing-grid-bg"}`}
    >
      {/* Desktop / Mobile Content */}
      {isMobile ? (
        // Mobile: only visible windows as stacked cards; minimized apps live in taskbar
        <div className="h-full overflow-y-auto px-3 pt-3 pb-28 space-y-3">
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
