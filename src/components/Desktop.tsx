import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../design/hooks/useTheme";

import { Taskbar } from "./Taskbar";
import { Window } from "./Window";
import { AppLauncher } from "./AppLauncher";
import { WidgetRegistry } from "./WidgetRegistry";
import type { WidgetInstance } from "./types";

export function Desktop() {
  const { user, logout } = useAuth();
  const { mode } = useTheme();
  const [windows, setWindows] = useState<WidgetInstance[]>([
    { id: "clock-1", type: "ClockCard", x: 40, y: 40, w: 380, h: 520, minimized: false },
    { id: "weather-1", type: "LiveWeatherAccentCard", x: 450, y: 40, w: 340, h: 280, minimized: false },
    { id: "notes-1", type: "QuickNotesCard", x: 450, y: 350, w: 400, h: 260, minimized: false },
    { id: "tasks-1", type: "TaskWidget", x: 860, y: 40, w: 340, h: 400, minimized: false },
    { id: "battery-1", type: "BatterySegmentsCard", x: 40, y: 580, w: 280, h: 200, minimized: false },
    { id: "network-1", type: "NetworkTrendCard", x: 340, y: 580, w: 300, h: 200, minimized: false },
    { id: "music-1", type: "NowPlayingEqualizerCard", x: 660, y: 580, w: 480, h: 240, minimized: false },
  ]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (type: string) => {
    const id = `${type}-${Date.now()}`;
    setWindows((prev) => [
      ...prev,
      { id, type, x: 60 + prev.length * 30, y: 60 + prev.length * 20, w: 360, h: 280, minimized: false },
    ]);
    setActiveWindow(id);
    setShowLauncher(false);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };

  const restoreWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
    setActiveWindow(id);
  };

  const bringToFront = (id: string) => setActiveWindow(id);

  return (
    <div
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${mode === "light" ? "nothing-canvas-soft" : "nothing-grid-bg"}`}
    >
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
      {windows.map((win, index) => (
        !win.minimized && (
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
        )
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onRestore={restoreWindow}
        onOpenLauncher={() => setShowLauncher(true)}
        currentTime={currentTime}
        user={user}
        onLogout={logout}
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
