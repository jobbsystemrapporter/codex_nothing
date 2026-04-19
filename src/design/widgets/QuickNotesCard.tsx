import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type QuickNotesCardProps = {
  note: string;
  compact?: boolean;
};

export function QuickNotesCard({ note, compact = false }: QuickNotesCardProps) {
  return (
    <Tile className={`min-h-[220px] p-5 ${compact ? "md:min-h-[220px]" : "md:min-h-[260px]"}`}>
      <div className="flex items-center justify-between gap-3">
        <DotText value="QUICK NOTES" className="text-[34px] tracking-[0.02em] leading-[0.95]" />
        <span className="text-[40px] leading-none text-[var(--danger)]">+</span>
      </div>

      <div className="mt-4 rounded-[20px] bg-[rgba(255,255,255,0.05)] p-4">
        <p className="text-[14px] leading-[1.55] tracking-[0.02em] text-[var(--white-soft)]">{note}</p>
      </div>
    </Tile>
  );
}
