import { Tile } from "../primitives/Tile";
import { ProgressDots } from "../primitives/ProgressDots";
import { Label } from "../primitives/Label";
import { DotText } from "../primitives/DotText";

type StorageCardProps = {
  used: string;
  total: string;
  progress: number;
};

export function StorageCard({ used, total, progress }: StorageCardProps) {
  return (
    <Tile className="min-h-[220px]">
      <Label>Manage files</Label>

      <div className="mt-6 flex items-end gap-2">
        <DotText value={used} className="text-[36px] min-[430px]:text-5xl md:text-7xl leading-none" />
        <div className="pb-2 text-2xl text-[var(--text-muted)]">GB</div>
      </div>

      <div className="mt-1 text-sm uppercase tracking-[0.14em] text-[var(--danger)]">
        Used
      </div>

      <div className="mt-6 flex items-center justify-between text-sm uppercase tracking-[0.12em] text-[var(--text-muted)]">
        <span>{used} GB</span>
        <span>{total} total</span>
      </div>

      <div className="mt-4">
        <ProgressDots total={18} active={progress} />
      </div>
    </Tile>
  );
}
