import { useState } from "react";
import clsx from "clsx";
import { Volume2, VolumeX } from "lucide-react";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";

type VolumeSliderCardProps = {
  light?: boolean;
};

export function VolumeSliderCard({ light: explicitLight }: VolumeSliderCardProps) {
  const light = useWidgetTheme(explicitLight);
  const [volume, setVolume] = useState(68);
  const muted = volume === 0;

  return (
    <Tile light={light} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label>Volume</Label>
        <button
          onClick={() => setVolume(muted ? 50 : 0)}
          className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          {muted ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-48 w-6 rounded-full bg-[var(--surface)] ring-1 ring-[var(--border)]">
          <div
            className={clsx("absolute bottom-0 left-0 right-0 rounded-full transition-all", light ? "bg-[var(--card-light-text)]" : "bg-[var(--white)]")}
            style={{ height: `${volume}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="Volume"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <DotText value={String(volume)} className="text-[28px] min-[430px]:text-[36px] md:text-[48px] leading-[1] tracking-[0.02em]" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">%</span>
        </div>
      </div>
    </Tile>
  );
}
