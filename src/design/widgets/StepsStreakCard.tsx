import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";

type StepsStreakCardProps = {
  totalSteps: string;
  streak: string;
  light?: boolean;
};

export function StepsStreakCard({
  totalSteps,
  streak,
  light: explicitLight,
}: StepsStreakCardProps) {
  const light = useWidgetTheme(explicitLight);
  const muted = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[150px] p-3.5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>Total steps</Label>
      <DotText
        value={totalSteps}
        className={`mt-2 text-[36px] leading-[0.92] tracking-[0.01em] ${light ? "text-[var(--card-light-text)]" : ""}`}
      />
      <Label className={`mt-3 ${light ? "text-[rgba(17,17,17,0.62)]" : ""}`}>Streak</Label>
      <div className="mt-1.5 flex items-end gap-2">
        <DotText
          value={streak}
          className={`text-[32px] leading-[0.92] tracking-[0.01em] ${light ? "text-[var(--card-light-text)]" : ""}`}
        />
        <span className={`pb-1 text-[14px] uppercase tracking-[0.1em] ${muted}`}>Days</span>
      </div>
    </Tile>
  );
}
