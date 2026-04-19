import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type CpuLoadGaugeCardProps = {
  value: number;
  light?: boolean;
};

export function CpuLoadGaugeCard({ value, light = true }: CpuLoadGaugeCardProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 52;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference;

  return (
    <Tile light={light} className="min-h-[220px] p-5">
      <div className="flex items-center justify-between">
        <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>CPU LOAD</Label>
        <span
          className={`text-[11px] uppercase tracking-[0.12em] ${
            light ? "text-[rgba(17,17,17,0.5)]" : "text-[var(--text-muted)]"
          }`}
        >
          Live
        </span>
      </div>

      <div className="mt-2 flex flex-1 items-center justify-center">
        <svg className="h-[156px] w-[210px] max-w-full" viewBox="0 0 170 120">
          <path
            d="M33,92 A52,52 0 0 1 137,92"
            fill="none"
            stroke={light ? "rgba(17,17,17,0.16)" : "rgba(245,245,245,0.16)"}
            strokeLinecap="round"
            strokeWidth="7"
          />
          <path
            d="M33,92 A52,52 0 0 1 137,92"
            fill="none"
            stroke="#f97316"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            strokeWidth="7"
          />
          <text
            fill={light ? "#111111" : "#f5f5f5"}
            fontSize="56"
            fontWeight="500"
            textAnchor="middle"
            x="85"
            y="90"
          >
            {Math.round(clamped)}
          </text>
          <text
            fill={light ? "rgba(17,17,17,0.55)" : "rgba(245,245,245,0.6)"}
            fontSize="26"
            fontWeight="600"
            textAnchor="start"
            x="107"
            y="90"
          >
            %
          </text>
        </svg>
      </div>

      <p
        className={`text-[11px] uppercase tracking-[0.12em] ${
          light ? "text-[rgba(17,17,17,0.52)]" : "text-[var(--text-muted)]"
        }`}
      >
        System performance
      </p>
    </Tile>
  );
}
