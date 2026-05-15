import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";

type WeekMark = {
  day: string;
  value: string;
  tone?: "neutral" | "danger";
};

type WeeklyMarksCardProps = {
  marks: WeekMark[];
  light?: boolean;
};

export function WeeklyMarksCard({ marks, light: explicitLight }: WeeklyMarksCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const muted = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";
  const rowBorder = light ? "border-[rgba(17,17,17,0.08)]" : "border-[var(--border)]";

  return (
    <Tile light={light} className="min-h-[170px] p-4">
      <div className="grid grid-cols-7 gap-2">
        {marks.map((item) => (
          <div className="text-center" key={item.day}>
            <div className="mb-2 flex justify-center gap-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: item.tone === "danger" ? "var(--danger)" : "currentColor",
                  opacity: 0.8,
                }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: item.tone === "danger" ? "var(--danger)" : "currentColor",
                  opacity: 0.8,
                }}
              />
            </div>
            <Label className={light ? "text-[rgba(17,17,17,0.58)]" : ""}>{item.day}</Label>
            <p className={`mt-1 text-[12px] tracking-[0.08em] ${muted}`}>{item.value}</p>
          </div>
        ))}
      </div>
      <div className={`mt-3 border-t ${rowBorder}`} />
    </Tile>
  );
}
