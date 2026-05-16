import { useState } from "react";
import clsx from "clsx";
import { Sun, SunDim } from "lucide-react";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type BrightnessSliderCardProps = {
  light?: boolean;
};

export function BrightnessSliderCard({ light: explicitLight }: BrightnessSliderCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [brightness, setBrightness] = useState(72);

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Brightness</Label>
        {brightness > 50 ? (
          <Sun className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
        ) : (
          <SunDim className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <DotText value={String(brightness)} className="text-[48px] leading-[1] tracking-[0.02em]" />
        <div className="relative h-3 w-full rounded-full bg-[var(--surface)] ring-1 ring-[var(--border)]">
          <div
            className={clsx("absolute left-0 top-0 bottom-0 rounded-full transition-all", light ? "bg-[var(--card-light-text)]" : "bg-[var(--white)]")}
            style={{ width: `${brightness}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Brightness"
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Dim</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Bright</span>
        </div>
      </div>
    </Tile>
  );
}
