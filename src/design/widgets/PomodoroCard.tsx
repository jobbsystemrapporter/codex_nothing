import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type PomodoroCardProps = {
  light?: boolean;
  minutes?: number;
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PomodoroCard({ light: explicitLight, minutes = 25 }: PomodoroCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const interval = useRef<ReturnType<typeof setInterval>>(null);

  const tick = useCallback(() => {
    setSecondsLeft((s) => {
      if (s <= 1) {
        setRunning(false);
        return 0;
      }
      return s - 1;
    });
  }, []);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(tick, 1000);
    }
    return () => clearInterval(interval.current!);
  }, [running, tick]);

  const toggle = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setSecondsLeft(mode === "work" ? 25 * 60 : 5 * 60); };
  const switchMode = (m: "work" | "break") => {
    setMode(m);
    setRunning(false);
    setSecondsLeft(m === "work" ? 25 * 60 : 5 * 60);
  };

  const total = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((total - secondsLeft) / total) * 100;

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Pomodoro</Label>
        <div className="flex gap-1">
          <button
            onClick={() => switchMode("work")}
            className={clsx(
              "rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em] transition-colors",
              mode === "work"
                ? light
                  ? "bg-[var(--card-light-text)] text-[var(--card-light)]"
                  : "bg-[var(--white)] text-[var(--bg)]"
                : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
            )}
          >
            Work
          </button>
          <button
            onClick={() => switchMode("break")}
            className={clsx(
              "rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em] transition-colors",
              mode === "break"
                ? light
                  ? "bg-[var(--card-light-text)] text-[var(--card-light)]"
                  : "bg-[var(--white)] text-[var(--bg)]"
                : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
            )}
          >
            Break
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center py-4">
        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="4" className={light ? "stroke-[rgba(17,17,17,0.1)]" : "stroke-[rgba(255,255,255,0.1)]"} />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className={mode === "work" ? "stroke-[var(--danger)]" : light ? "stroke-[var(--card-light-text)]" : "stroke-[var(--white)]"}
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <DotText value={formatTime(secondsLeft)} className="text-[36px] leading-[1] tracking-[0.02em]" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.12em] ring-1 ring-[var(--border)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)]"
        >
          Reset
        </button>
        <button
          onClick={toggle}
          className={clsx(
            "rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-90",
            running
              ? "bg-[var(--danger)] text-white"
              : light
                ? "bg-[var(--card-light-text)] text-[var(--card-light)]"
                : "bg-[var(--white)] text-[var(--bg)]"
          )}
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </Tile>
  );
}
