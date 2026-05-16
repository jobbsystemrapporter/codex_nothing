import { useState, useEffect, useRef } from "react";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type StopwatchCardProps = {
  light?: boolean;
};

function formatTime(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const ccs = String(cs).padStart(2, "0");
  return `${mm}:${ss}.${ccs}`;
}

export function StopwatchCard({ light: explicitLight }: StopwatchCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startTime = useRef<number>(0);
  const elapsedRef = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    if (!running) return;
    startTime.current = Date.now() - elapsedRef.current;
    const tick = () => {
      setElapsed(Date.now() - startTime.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const toggle = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); };
  const lap = () => setLaps((prev) => [elapsed, ...prev].slice(0, 5));

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <Label>Stopwatch</Label>
      <div className="text-center py-2">
        <DotText value={formatTime(elapsed)} className="text-[42px] leading-[1] tracking-[0.02em]" />
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
          className={`rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-90 ${
            running
              ? "bg-[var(--danger)] text-white"
              : light
                ? "bg-[var(--card-light-text)] text-[var(--card-light)]"
                : "bg-[var(--white)] text-[var(--bg)]"
          }`}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={lap}
          disabled={!running}
          className="rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.12em] ring-1 ring-[var(--border)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] disabled:opacity-30"
        >
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {laps.map((l, i) => (
            <div key={i} className="flex items-center justify-between border-t border-[var(--border)] pt-2">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Lap {laps.length - i}</span>
              <DotText value={formatTime(l)} className="text-[16px]" />
            </div>
          ))}
        </div>
      )}
    </Tile>
  );
}
