import { useState } from "react";
import clsx from "clsx";
import { Bell, BellOff } from "lucide-react";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type AlarmListCardProps = {
  light?: boolean;
};

type Alarm = {
  id: string;
  time: string;
  label: string;
  active: boolean;
};

const initialAlarms: Alarm[] = [
  { id: "1", time: "06:30", label: "Morning run", active: true },
  { id: "2", time: "07:45", label: "Work start", active: true },
  { id: "3", time: "12:00", label: "Lunch break", active: false },
  { id: "4", time: "22:30", label: "Wind down", active: true },
];

export function AlarmListCard({ light: explicitLight }: AlarmListCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [alarms, setAlarms] = useState(initialAlarms);

  const toggle = (id: string) => {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Alarms</Label>
        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {alarms.filter((a) => a.active).length} Active
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={clsx(
              "flex items-center justify-between rounded-[14px] px-4 py-3 transition-colors",
              alarm.active
                ? light
                  ? "bg-[rgba(17,17,17,0.06)]"
                  : "bg-[rgba(255,255,255,0.06)]"
                : "opacity-50"
            )}
          >
            <div className="flex items-center gap-3">
              {alarm.active ? (
                <Bell className="h-4 w-4 text-[var(--danger)]" strokeWidth={1.5} />
              ) : (
                <BellOff className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
              )}
              <div>
                <DotText value={alarm.time} className="text-[22px] leading-[1]" />
                <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{alarm.label}</span>
              </div>
            </div>
            <button
              onClick={() => toggle(alarm.id)}
              className={clsx(
                "relative !min-h-0 !min-w-0 h-6 w-10 rounded-full transition-colors",
                alarm.active ? "bg-[var(--danger)]" : light ? "bg-[rgba(17,17,17,0.14)]" : "bg-[rgba(255,255,255,0.14)]"
              )}
            >
              <span
                className={clsx(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                  alarm.active ? "left-0.5 translate-x-4" : "left-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </Tile>
  );
}
