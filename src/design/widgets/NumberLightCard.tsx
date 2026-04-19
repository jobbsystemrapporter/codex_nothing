import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type NumberLightCardProps = {
  value: string;
};

export function NumberLightCard({ value }: NumberLightCardProps) {
  return (
    <Tile light className="min-h-[170px] flex items-center justify-center p-4">
      <DotText value={value} className="text-[84px] leading-[0.9] tracking-[0.01em] text-[var(--card-light-text)]" />
    </Tile>
  );
}
