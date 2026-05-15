import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { CircleTile } from "../primitives/CircleTile";

type TempRangeCircleCardProps = {
  high: string;
  low: string;
  light?: boolean;
};

export function TempRangeCircleCard({
  high,
  low,
  light: explicitLight,
}: TempRangeCircleCardProps) {
  const light = useWidgetTheme(explicitLight);
  const tone = light ? "text-[var(--card-light-text)]" : "text-[var(--text)]";
  const muted = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";

  return (
    <CircleTile light={light} className="min-h-[150px] p-4">
      <div className={`text-center ${tone}`}>
        <p className="text-[30px] leading-none tracking-[-0.03em]">^ {high}</p>
        <p className={`mt-2 text-[30px] leading-none tracking-[-0.03em] ${muted}`}>v {low}</p>
      </div>
    </CircleTile>
  );
}
