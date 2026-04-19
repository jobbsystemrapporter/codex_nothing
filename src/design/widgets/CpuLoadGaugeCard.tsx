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
  const textColor = light ? "#111111" : "#f5f5f5";
  const mutedColor = light ? "rgba(17,17,17,0.52)" : "rgba(245,245,245,0.62)";
  const trackColor = light ? "rgba(17,17,17,0.18)" : "rgba(245,245,245,0.2)";

  return (
    <Tile light={light} className="min-h-[180px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>CPU LOAD</Label>
      <div className="mt-2 flex items-center justify-center">
        <div className="relative h-[118px] w-[154px] max-w-full">
          <svg className="h-full w-full" viewBox="0 0 146 110">
            <path
              d="M21,88 A52,52 0 0 1 125,88"
              fill="none"
              stroke={trackColor}
              strokeLinecap="round"
              strokeWidth="8.5"
            />
            <path
              d="M21,88 A52,52 0 0 1 125,88"
              fill="none"
              stroke="#ff7a14"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              strokeWidth="8.5"
            />
          </svg>
          <div className="pointer-events-none absolute left-1/2 top-[64px] flex -translate-x-1/2 -translate-y-1/2 items-end gap-1">
            <span
              className="tabular-nums text-[56px] font-medium leading-[0.88] tracking-[-0.04em]"
              style={{ color: textColor }}
            >
              {Math.round(clamped)}
            </span>
            <span
              className="pb-[6px] text-[18px] font-semibold leading-none"
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
