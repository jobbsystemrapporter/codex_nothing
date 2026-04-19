import { CircleTile } from "../primitives/CircleTile";

type CoordinatesCircleCardProps = {
  lat: string;
  lng: string;
  altitude: string;
};

export function CoordinatesCircleCard({
  lat,
  lng,
  altitude,
}: CoordinatesCircleCardProps) {
  return (
    <CircleTile light className="min-h-[170px] p-5">
      <div className="space-y-2 text-[12px] uppercase tracking-[0.08em] text-[rgba(17,17,17,0.72)]">
        <p>◐ {lat}</p>
        <p>◍ {lng}</p>
        <p>⌁ {altitude}</p>
      </div>
    </CircleTile>
  );
}
