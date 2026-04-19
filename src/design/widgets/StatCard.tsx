import { Tile } from "../primitives/Tile";
import { Label } from "../primitives/Label";

type StatCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

export function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <Tile className="min-h-[160px] flex flex-col justify-between">
      <Label>{label}</Label>
      <div
        className="text-5xl font-light leading-none"
        style={{ color: accent ? "var(--danger)" : "var(--text)" }}
      >
        {value}
      </div>
    </Tile>
  );
}
