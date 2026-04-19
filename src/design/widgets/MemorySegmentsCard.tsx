import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type MemorySegmentsCardProps = {
  value: string;
  unit?: string;
  used: string;
  total: string;
  activeSegments?: number;
  segments?: number;
  light?: boolean;
  liveEnabled?: boolean;
  liveSupported?: boolean;
  onToggleLive?: () => void;
};

export function MemorySegmentsCard({
  value,
  unit = "GB",
  used,
  total,
  activeSegments = 12,
  segments = 16,
  light = true,
  liveEnabled = false,
  liveSupported = false,
  onToggleLive,
}: MemorySegmentsCardProps) {
  const muted = light ? "text-[rgba(17,17,17,0.58)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[180px] p-4">
      <div className="flex items-center justify-between gap-2">
        <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>MEMORY</Label>
        {onToggleLive ? (
          <button
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.1em] ${
              liveEnabled
                ? "border-[#f97316] text-[#f97316]"
                : "border-[var(--border)] text-[var(--text-muted)]"
            } ${!liveSupported ? "opacity-50" : ""}`}
            disabled={!liveSupported}
            onClick={onToggleLive}
            type="button"
          >
            {liveEnabled ? "Live on" : "Live off"}
          </button>
        ) : null}
      </div>
      <div className="mt-4 flex items-end gap-2">
        <p className="text-[56px] leading-[0.88] tracking-[-0.03em]">{value}</p>
        <p className={`pb-1 text-[24px] leading-none ${muted}`}>{unit}</p>
      </div>
      <p className={`mt-1 text-[12px] uppercase tracking-[0.12em] ${muted}`}>
        / {total} GB USED
      </p>
      <div className="mt-5 flex gap-1.5">
        {Array.from({ length: segments }).map((_, index) => {
          const on = index < activeSegments;
          return (
            <span
              key={index}
              className="h-[9px] w-[14px] rounded-[2px]"
              style={{
                backgroundColor: on
                  ? light
                    ? "#111111"
                    : "#f5f5f5"
                  : light
                    ? "rgba(17,17,17,0.14)"
                    : "rgba(245,245,245,0.18)",
              }}
            />
          );
        })}
      </div>
      <p className={`mt-3 text-[12px] uppercase tracking-[0.1em] ${muted}`}>{used} used</p>
    </Tile>
  );
}
