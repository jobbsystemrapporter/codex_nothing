import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type GmtDotCardProps = {
  day?: string;
  zone?: string;
};

export function GmtDotCard({ day = "TUESDAY", zone = "GMT+1" }: GmtDotCardProps) {
  return (
    <Tile light className="min-h-[170px] p-4">
      <DotText
        value={day}
        className="text-[28px] leading-[0.95] tracking-[0.02em] text-[var(--card-light-text)]"
      />
      <div className="mt-6">
        <DotMatrixNumber light offStyle="none" size="md" value={zone} />
      </div>
    </Tile>
  );
}
