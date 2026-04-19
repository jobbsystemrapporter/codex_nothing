import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type CpuLoadGaugeCardProps = {
  value: number;
  light?: boolean;
};

export function CpuLoadGaugeCard({ value, light = true }: CpuLoadGaugeCardProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 36;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference;
  const muted = light ? "text-[rgba(17,17,17,0.55)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[180px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>CPU LOAD</Label>
      <div className="mt-4 flex items-center justify-center">
        <svg className="h-[110px] w-[130px]" viewBox="0 0 120 90">
          <path
            d="M24,72 A36,36 0 0 1 96,72"
            fill="none"
            stroke={light ? "rgba(17,17,17,0.16)" : "rgba(245,245,245,0.16)"}
            strokeLinecap="round"
            strokeWidth="4.5"
          />
          <path
            d="M24,72 A36,36 0 0 1 96,72"
            fill="none"
            stroke="#f97316"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            strokeWidth="4.5"
          />
          <text
            className={muted}
            fill={light ? "#111111" : "#f5f5f5"}
            fontSize="27"
            textAnchor="middle"
            x="60"
            y="63"
          >
            {Math.round(clamped)}
          </text>
          <text
            fill={light ? "rgba(17,17,17,0.55)" : "rgba(245,245,245,0.6)"}
            fontSize="14"
            textAnchor="start"
            x="76"
            y="63"
          >
            %
          </text>
        </svg>
      </div>
    </Tile>
  );
}
