import { CircleTile } from "../primitives/CircleTile";
import { DotText } from "../primitives/DotText";

export function CompassRoseCard() {
  return (
    <CircleTile className="relative min-h-[170px] p-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[36px] leading-none">↑</span>
      </div>
      <DotText value="N" className="absolute left-1/2 top-4 -translate-x-1/2 text-[14px] text-[var(--danger)]" />
      <DotText value="E" className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px]" />
      <DotText value="S" className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[14px]" />
      <DotText value="W" className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px]" />
    </CircleTile>
  );
}
