import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type EventCardProps = {
  title: string;
  time: string;
  secondary?: string;
  light?: boolean;
};

export function EventCard({
  title,
  time,
  secondary,
  light,
}: EventCardProps) {
  return (
    <Tile light={light} className="min-h-[160px] flex flex-col justify-between">
      <div>
        <Label>Upcoming</Label>
        <div className="mt-5 text-lg uppercase tracking-[0.08em]">{title}</div>
      </div>

      <div className="text-sm uppercase tracking-[0.08em] text-[var(--text-muted)]">
        {time}
        {secondary ? ` · ${secondary}` : ""}
      </div>
    </Tile>
  );
}
