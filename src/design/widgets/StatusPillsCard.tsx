import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";

type StatusPill = {
  label: string;
  tone?: "default" | "green" | "orange";
};

type StatusPillsCardProps = {
  pills: StatusPill[];
  light?: boolean;
};

export function StatusPillsCard({ pills, light: explicitLight }: StatusPillsCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const getTone = (tone: StatusPill["tone"]) => {
    if (tone === "green") return { border: "#65a30d", text: "#65a30d" };
    if (tone === "orange") return { border: "#f97316", text: "#f97316" };
    return {
      border: light ? "rgba(17,17,17,0.24)" : "rgba(245,245,245,0.24)",
      text: light ? "rgba(17,17,17,0.8)" : "rgba(245,245,245,0.8)",
    };
  };

  return (
    <Tile light={light} className="min-h-[180px] p-5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>STATUS</Label>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {pills.map((pill) => {
          const tone = getTone(pill.tone);
          return (
            <span
              key={pill.label}
              className="rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.12em]"
              style={{ borderColor: tone.border, color: tone.text }}
            >
              {pill.label}
            </span>
          );
        })}
      </div>
    </Tile>
  );
}
