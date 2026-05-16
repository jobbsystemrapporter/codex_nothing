import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";

type BatterySegmentsCardProps = {
  value: string;
  bars?: number;
  active?: number;
  eta: string;
  light?: boolean;
};

export function BatterySegmentsCard({
  value,
  bars = 20,
  active = 17,
  eta,
  light: explicitLight,
}: BatterySegmentsCardProps) {
  const light = useWidgetTheme(explicitLight);
  const muted = light ? "text-[rgba(17,17,17,0.56)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[190px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>BATTERY</Label>
      <div className="mt-4 flex items-end gap-2">
        <DotText
          value={value}
          className={`text-[32px] @min-[300px]:text-[44px] @min-[360px]:text-[54px] leading-[0.9] tracking-[0.02em] ${light ? "text-[var(--card-light-text)]" : ""}`}
        />
        <span className={`pb-2 text-[16px] tracking-[0.1em] ${muted}`}>%</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1 @min-[360px]:gap-1.5">
        {Array.from({ length: bars }).map((_, index) => {
          const on = index < active;
          return (
            <span
              key={index}
              className="h-[7px] w-[9px] @min-[360px]:h-[9px] @min-[360px]:w-[12px] rounded-[2px]"
              style={{
                backgroundColor: on
                  ? "var(--white)"
                  : light
                    ? "rgba(17,17,17,0.14)"
                    : "rgba(245,245,245,0.18)",
              }}
            />
          );
        })}
      </div>
      <p className={`mt-3 text-[12px] uppercase tracking-[0.1em] ${muted}`}>~ {eta}</p>
    </Tile>
  );
}
