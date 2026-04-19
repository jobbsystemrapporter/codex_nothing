import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type PairDeviceCardProps = {
  title?: string;
  subtitle?: string;
};

export function PairDeviceCard({
  title = "Pair",
  subtitle = "New device",
}: PairDeviceCardProps) {
  return (
    <Tile className="min-h-[170px] flex items-center justify-center p-4 text-center">
      <div>
        <DotText value={title} className="text-[26px] leading-[0.95] tracking-[0.02em]" />
        <DotText
          value={subtitle}
          className="mt-2 text-[26px] leading-[0.95] tracking-[0.02em] text-[var(--text-muted)]"
        />
      </div>
    </Tile>
  );
}
