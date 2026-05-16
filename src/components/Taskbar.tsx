import { Wifi, Battery, Volume2 } from "lucide-react";
import { DotText } from "../design/primitives/DotText";
import type { WidgetInstance } from "./types";

type TaskbarProps = {
  windows: WidgetInstance[];
  activeWindow: string | null;
  onRestore: (id: string) => void;
  onOpenLauncher: () => void;
  currentTime: Date;
  user: { displayName: string } | null;
  onLogout: () => void;
  isMobile?: boolean;
};

function getAppInitial(type: string): string {
  return type.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")[0]?.[0] ?? "?";
}

export function Taskbar({ windows, activeWindow, onRestore, onOpenLauncher, currentTime, user, onLogout, isMobile }: TaskbarProps) {
  const timeStr = currentTime.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();
  const minimized = windows.filter((w) => w.minimized);

  if (isMobile) {
    const recentWindows = windows.slice(-4);
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg)]/95 px-3 py-2 backdrop-blur-md">
        <button
          onClick={onOpenLauncher}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] ring-1 ring-[var(--border)] transition-colors active:scale-95"
        >
          <span className="text-[18px]">◩</span>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {recentWindows.map((win) => (
            <button
              key={win.id}
              onClick={() => onRestore(win.id)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold uppercase transition-colors ${
                activeWindow === win.id
                  ? "bg-[var(--danger)] text-white"
                  : "bg-[var(--surface-2)] text-[var(--text-muted)] ring-1 ring-[var(--border)]"
              }`}
              aria-label={win.type}
            >
              {getAppInitial(win.type)}
            </button>
          ))}
        </div>

        <div className="shrink-0 text-right">
          <DotText value={timeStr} className="text-[13px] leading-none tracking-[0.02em]" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg)]/90 px-4 py-2 backdrop-blur-md">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenLauncher}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] ring-1 ring-[var(--border)] transition-colors hover:bg-[var(--surface-3)]"
        >
          <span className="text-[16px]">◩</span>
        </button>
        <div className="flex items-center gap-1 overflow-x-auto">
          {minimized.map((win) => (
            <button
              key={win.id}
              onClick={() => onRestore(win.id)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                activeWindow === win.id ? "bg-[var(--surface-3)] text-[var(--text)]" : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
              }`}
            >
              {win.type.replace(/([A-Z])/g, " $1").trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <Wifi className="h-4 w-4" strokeWidth={1.5} />
          <Volume2 className="h-4 w-4" strokeWidth={1.5} />
          <Battery className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <DotText value={timeStr} className="text-[14px] leading-none tracking-[0.02em]" />
          <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{dateStr}</p>
        </div>
        {user && (
          <button
            onClick={onLogout}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-2)] text-[11px] font-bold uppercase text-[var(--text-muted)] ring-1 ring-[var(--border)] transition-colors hover:text-[var(--danger)]"
          >
            {user.displayName[0]}
          </button>
        )}
      </div>
    </div>
  );
}
