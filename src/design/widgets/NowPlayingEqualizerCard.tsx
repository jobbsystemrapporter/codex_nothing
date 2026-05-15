import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";
import type { CSSProperties } from "react";

type NowPlayingEqualizerCardProps = {
  title: string;
  artist: string;
  genre?: string;
  start: string;
  end: string;
  progress?: number;
  light?: boolean;
};

const bars = [16, 25, 12, 31, 19, 26, 14, 29, 11, 24, 34, 18, 28, 15];

export function NowPlayingEqualizerCard({
  title,
  artist,
  genre = "",
  start,
  end,
  progress = 62,
  light: explicitLight,
}: NowPlayingEqualizerCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const clamped = Math.max(0, Math.min(100, progress));
  const muted = light ? "text-[rgba(17,17,17,0.58)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[210px] p-5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>NOW PLAYING</Label>
      <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <p className="text-[46px] leading-[0.9] tracking-[-0.03em]">{title}</p>
          <p className={`mt-2 text-[13px] uppercase tracking-[0.1em] ${muted}`}>
            {artist}
            {genre ? ` · ${genre}` : ""}
          </p>
        </div>
        <div className="flex h-[62px] items-end gap-1.5">
          {bars.map((height, index) => (
            <span
              key={index}
              className="nothing-eq-bar w-[4px] rounded-[2px]"
              style={
                {
                  "--eq-base": `${height}px`,
                  "--eq-scale": `${1 + (index % 5) * 0.16}`,
                  "--eq-delay": `${index * 70}ms`,
                  backgroundColor: light ? "rgba(17,17,17,0.72)" : "rgba(245,245,245,0.72)",
                  height: `${height}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="h-[3px] w-full rounded-full bg-[var(--border)]">
          <div className="h-full rounded-full bg-[#f97316]" style={{ width: `${clamped}%` }} />
        </div>
        <div className={`mt-2 flex items-center justify-between text-[13px] uppercase tracking-[0.08em] ${muted}`}>
          <span>{start}</span>
          <span>{end}</span>
        </div>
      </div>
    </Tile>
  );
}
