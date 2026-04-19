import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type OverLimitTimerCardProps = {
  minutes: string;
  note?: string;
};

export function OverLimitTimerCard({
  minutes,
  note = "OVER LIMIT",
}: OverLimitTimerCardProps) {
  return (
    <Tile className="min-h-[170px] p-4">
      <p className="text-[34px] leading-none text-[var(--danger)]">↑</p>
      <div className="mt-7 flex items-end gap-2">
        <span className="text-[44px] leading-[0.9] tracking-[-0.03em]">{minutes}</span>
        <span className="pb-1 text-[22px] leading-none text-[var(--text-muted)]">MIN</span>
      </div>
      <Label className="mt-2">{note}</Label>
    </Tile>
  );
}
