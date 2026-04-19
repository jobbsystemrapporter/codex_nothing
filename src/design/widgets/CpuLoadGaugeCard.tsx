import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type CpuLoadGaugeCardProps = {
  value: number;
  light?: boolean;
};

export function CpuLoadGaugeCard({ value, light = true }: CpuLoadGaugeCardProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 38;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference;

  return (
    <Tile light={light} className="min-h-[180px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>CPU LOAD</Label>
      <div className="mt-3 flex items-center justify-center">
        <svg className="h-[118px] w-[150px]" viewBox="0 0 120 95">
          <path
            d="M22,76 A38,38 0 0 1 98,76"
            fill="none"
            stroke={light ? "rgba(17,17,17,0.16)" : "rgba(245,245,245,0.16)"}
            strokeLinecap="round"
            strokeWidth="5.5"
          />
          <path
            d="M22,76 A38,38 0 0 1 98,76"
            fill="none"
            stroke="#f97316"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            strokeWidth="5.5"
          />
          <text
            fill={light ? "#111111" : "#f5f5f5"}
            fontSize="36"
            fontWeight="500"
            textAnchor="middle"
            x="60"
            y="69"
          >
            {Math.round(clamped)}
          </text>
          <text
            fill={light ? "rgba(17,17,17,0.55)" : "rgba(245,245,245,0.6)"}
            fontSize="18"
            fontWeight="600"
            textAnchor="start"
            x="72"
            y="69"
          >
            %
          </text>
        </svg>
      </div>
    </Tile>
  );
}
