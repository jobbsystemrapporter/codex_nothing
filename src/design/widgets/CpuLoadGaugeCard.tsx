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
      <div className="relative mt-3 flex items-center justify-center">
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
        </svg>
        <div className="pointer-events-none absolute top-[46px] flex items-end gap-0.5">
          <span
            className={`tabular-nums text-[42px] font-medium leading-none tracking-[-0.03em] ${
              light ? "text-[#111111]" : "text-[var(--text)]"
            }`}
          >
            {Math.round(clamped)}
          </span>
          <span
            className={`pb-[4px] text-[20px] font-semibold leading-none ${
              light ? "text-[rgba(17,17,17,0.55)]" : "text-[var(--text-muted)]"
            }`}
          >
            %
          </span>
        </div>
      </div>
    </Tile>
  );
}
