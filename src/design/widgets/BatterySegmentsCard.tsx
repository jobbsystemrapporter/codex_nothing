import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
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
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const muted = light ? "text-[rgba(17,17,17,0.56)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[190px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>BATTERY</Label>
      <div className="mt-4 flex items-end gap-2">
        <DotText
          value={value}
          className={`text-[54px] leading-[0.9] tracking-[0.02em] ${light ? "text-[var(--card-light-text)]" : ""}`}
        />
        <span className={`pb-2 text-[16px] tracking-[0.1em] ${muted}`}>%</span>
      </div>
      <div className="mt-4 flex gap-1.5">
        {Array.from({ length: bars }).map((_, index) => {
          const on = index < active;
          return (
            <span
              key={index}
              className="h-[9px] w-[12px] rounded-[2px]"
              style={{
                backgroundColor: on
                  ? "#22c55e"
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
