import { useMemo } from "react";
import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type ScreenTimeCardProps = {
  light?: boolean;
};

const days = [
  { day: "M", hours: 4.2 },
  { day: "T", hours: 6.5 },
  { day: "W", hours: 5.1 },
  { day: "T", hours: 7.8 },
  { day: "F", hours: 3.4 },
  { day: "S", hours: 8.2 },
  { day: "S", hours: 5.6 },
];

export function ScreenTimeCard({ light: explicitLight }: ScreenTimeCardProps) {
  const light = useWidgetTheme(explicitLight);
  const max = useMemo(() => Math.max(...days.map((d) => d.hours)), []);
  const total = useMemo(() => days.reduce((a, b) => a + b.hours, 0).toFixed(1), []);
  const avg = useMemo(() => (days.reduce((a, b) => a + b.hours, 0) / days.length).toFixed(1), []);

  return (
    <Tile light={light} className="flex flex-col gap-3 @min-[360px]:gap-4">
      <div className="flex items-center justify-between">
        <Label>Screen Time</Label>
        <DotText value={`${total}H`} className="text-[14px] @min-[360px]:text-[16px]" />
      </div>
      <div className="flex items-end gap-1 @min-[360px]:gap-2 h-24 @min-[360px]:h-28">
        {days.map((d, i) => {
          const pct = (d.hours / max) * 100;
          const isHigh = d.hours > 6;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 @min-[360px]:gap-2">
              <span className="text-[9px] @min-[360px]:text-[10px] text-[var(--text-muted)]">{d.hours}h</span>
              <div
                className={clsx(
                  "w-full rounded-full transition-all",
                  isHigh ? "bg-[var(--danger)]" : light ? "bg-[var(--card-light-text)]" : "bg-[var(--white)]"
                )}
                style={{ height: `${pct}%` }}
              />
              <span className="text-[9px] @min-[360px]:text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">{d.day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <span>Daily avg {avg}h</span>
        <span>This week</span>
      </div>
    </Tile>
  );
}
