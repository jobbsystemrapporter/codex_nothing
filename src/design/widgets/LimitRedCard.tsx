import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type LimitRedCardProps = {
  value: string;
  subtitle: string;
};

export function LimitRedCard({ value, subtitle }: LimitRedCardProps) {
  return (
    <Tile className="min-h-[170px] border-0 bg-[var(--danger)] p-4 text-[var(--white)]">
      <Label className="text-[rgba(255,255,255,0.84)]">Over limit</Label>
      <DotText value={value} className="mt-12 text-[42px] leading-[0.92] tracking-[0.01em]" />
      <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[rgba(255,255,255,0.84)]">
        {subtitle}
      </p>
    </Tile>
  );
}
