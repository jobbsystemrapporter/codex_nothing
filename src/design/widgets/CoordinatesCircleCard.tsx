import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CircleTile } from "../primitives/CircleTile";

type CoordinatesCircleCardProps = {
  light?: boolean;
  lat: string;
  lng: string;
  altitude: string;
};

export function CoordinatesCircleCard({
  lat,
  lng,
  altitude,
  light: explicitLight,
}: CoordinatesCircleCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const textColor = light ? "text-[rgba(17,17,17,0.72)]" : "text-[var(--text-muted)]";

  return (
    <CircleTile light={light} className="min-h-[170px] p-5">
      <div className={`space-y-2 text-[12px] uppercase tracking-[0.08em] ${textColor}`}>
        <p>◐ {lat}</p>
        <p>◍ {lng}</p>
        <p>⌁ {altitude}</p>
      </div>
    </CircleTile>
  );
}
