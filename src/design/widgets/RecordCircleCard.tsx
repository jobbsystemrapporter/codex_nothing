import { CircleTile } from "../primitives/CircleTile";
import { DotText } from "../primitives/DotText";

type RecordCircleCardProps = {
  label?: string;
};

export function RecordCircleCard({ label = "REC" }: RecordCircleCardProps) {
  return (
    <CircleTile className="min-h-[170px] border-0 bg-[var(--danger)] text-[var(--white)]">
      <DotText value={label} className="text-[28px] leading-[0.95] tracking-[0.02em]" />
    </CircleTile>
  );
}
