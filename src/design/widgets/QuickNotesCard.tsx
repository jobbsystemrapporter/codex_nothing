import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type QuickNotesCardProps = {
  note: string;
  compact?: boolean;
  light?: boolean;
};

export function QuickNotesCard({ note, compact = false, light: explicitLight }: QuickNotesCardProps) {
  const light = useWidgetTheme(explicitLight);

  const bgColor = light ? "bg-[rgba(17,17,17,0.06)]" : "bg-[rgba(255,255,255,0.05)]";
  const textColor = light ? "text-[rgba(17,17,17,0.8)]" : "text-[var(--white-soft)]";

  return (
    <Tile light={light} className={`min-h-[220px] p-5 ${compact ? "md:min-h-[220px]" : "md:min-h-[260px]"}`}>
      <div className="flex items-center justify-between gap-3">
        <DotText value="QUICK NOTES" className="text-[34px] tracking-[0.02em] leading-[0.95]" />
        <span className="text-[40px] leading-none text-[var(--danger)]">+</span>
      </div>

      <div className={`mt-4 rounded-[20px] ${bgColor} p-4`}>
        <p className={`text-[14px] leading-[1.55] tracking-[0.02em] ${textColor}`}>{note}</p>
      </div>
    </Tile>
  );
}
