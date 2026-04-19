import { Tile } from "../primitives/Tile";
import { ProgressDots } from "../primitives/ProgressDots";
import { Label } from "../primitives/Label";

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
        <div className="text-7xl font-light leading-none">{used}</div>
        <div className="pb-2 text-2xl opacity-80">GB</div>
      </div>

      <div className="mt-1 text-sm uppercase tracking-[0.14em] text-red-500">
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
