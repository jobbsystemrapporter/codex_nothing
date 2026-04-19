import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type FlightStatusCompactCardProps = {
  route: string;
  status: string;
  gate: string;
  time: string;
};

export function FlightStatusCompactCard({
  route,
  status,
  gate,
  time,
}: FlightStatusCompactCardProps) {
  return (
    <Tile className="min-h-[170px] p-4">
      <p className="text-[18px] uppercase leading-[1.25] tracking-[0.05em]">{route}</p>
      <div className="mt-3 grid gap-1">
        <p className="text-[13px] text-[var(--text-muted)]">{status}</p>
        <p className="text-[13px] text-[var(--text-muted)]">{gate}</p>
        <p className="text-[13px] text-[var(--text-muted)]">{time}</p>
      </div>
      <div className="mt-4 border-t border-[var(--border)] pt-3">
        <Label>Flight monitor</Label>
      </div>
    </Tile>
  );
}
