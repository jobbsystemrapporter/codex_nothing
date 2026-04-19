import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type CpuLoadGaugeCardProps = {
  value: number;
  light?: boolean;
};

export function CpuLoadGaugeCard({ value, light = true }: CpuLoadGaugeCardProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 73;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference;
  const textColor = light ? "#111111" : "#f5f5f5";
  const mutedColor = light ? "rgba(17,17,17,0.52)" : "rgba(245,245,245,0.62)";
  const trackColor = light ? "rgba(17,17,17,0.18)" : "rgba(245,245,245,0.2)";

  return (
    <Tile light={light} className="min-h-[228px] p-5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>CPU LOAD</Label>
      <div className="mt-3 flex flex-1 items-center justify-center">
        <div className="relative h-[152px] w-[214px] max-w-full">
          <svg className="h-full w-full" viewBox="0 0 206 148">
            <path
              d="M30,118 A73,73 0 0 1 176,118"
              fill="none"
              stroke={trackColor}
              strokeLinecap="round"
              strokeWidth="10"
            />
            <path
              d="M30,118 A73,73 0 0 1 176,118"
              fill="none"
              stroke="#ff7a14"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="pointer-events-none absolute left-1/2 top-[96px] flex -translate-x-1/2 -translate-y-1/2 items-end gap-1">
            <span
              className="tabular-nums text-[74px] font-medium leading-[0.9] tracking-[-0.04em]"
              style={{ color: textColor }}
            >
              {Math.round(clamped)}
            </span>
            <span
              className="pb-[9px] text-[22px] font-semibold leading-none"
              style={{ color: mutedColor }}
            >
              %
            </span>
          </div>
        </div>
      </div>
    </Tile>
  );
}
