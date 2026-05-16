import { Label } from "../primitives/Label";
import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type ActivityPulseCardProps = {
  activity: string;
  duration: string;
  steps: string;
  bpm: string;
  light?: boolean;
};

export function ActivityPulseCard({
  activity,
  duration,
  steps,
  bpm,
  light,
}: ActivityPulseCardProps) {
  const mutedTone = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[180px] overflow-hidden p-0">
      <div className="p-4 @min-[360px]:p-5">
        <div className="flex items-center justify-between gap-3">
          <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>{activity}</Label>
          <div className={`text-[14px] @min-[360px]:text-[16px] leading-none tracking-[0.08em] ${mutedTone}`}>{duration}</div>
        </div>

        <div className="mt-5 @min-[360px]:mt-7 flex items-end gap-2">
          <DotText value={steps} className="text-[36px] @min-[300px]:text-[48px] @min-[360px]:text-[64px] leading-[0.9] tracking-[-0.04em]" />
          <div className={`pb-1.5 @min-[360px]:pb-2 text-[16px] leading-none tracking-[0.14em] ${mutedTone}`}>STEPS</div>
        </div>
      </div>

      <div className="relative border-t border-[var(--border)] px-4 @min-[360px]:px-5 py-3 @min-[360px]:py-4">
        <svg
          aria-hidden
          className="h-[60px] @min-[360px]:h-[72px] w-full"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 320 72"
        >
          <path
            d="M0 38 C 36 16, 70 56, 106 38 C 142 20, 178 54, 214 38 C 250 22, 286 48, 320 38"
            fill="none"
            opacity={light ? 0.22 : 0.26}
            stroke="currentColor"
            strokeDasharray="3 7"
            strokeLinecap="round"
            strokeWidth="1.4"
          />
          <line
            opacity={0.9}
            stroke="var(--danger)"
            strokeWidth="1.4"
            x1="190"
            x2="190"
            y1="0"
            y2="72"
          />
          <circle cx="190" cy="38" fill="var(--danger)" r="5.5" />
        </svg>

        <div className="absolute bottom-3 @min-[360px]:bottom-5 right-4 @min-[360px]:right-5 text-[20px] @min-[360px]:text-[22px] leading-none tracking-[0.01em]">
          <DotText value={bpm} className="text-[20px] @min-[360px]:text-[22px] leading-none tracking-[0.01em]" />
          <span className={`ml-1 text-[16px] @min-[360px]:text-[18px] tracking-[0.12em] ${mutedTone}`}>BPM</span>
        </div>
      </div>
    </Tile>
  );
}
