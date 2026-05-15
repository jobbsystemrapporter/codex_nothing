import { Label } from "../primitives/Label";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";

type StorageRow = {
  name: string;
  used: number;
  total: number;
  tone?: "default" | "orange";
};

type StorageMultiRowCardProps = {
  capacityLabel: string;
  rows: StorageRow[];
  light?: boolean;
};

export function StorageMultiRowCard({
  capacityLabel,
  rows,
  light: explicitLight,
}: StorageMultiRowCardProps) {
  const light = useWidgetTheme(explicitLight);
  const muted = light ? "text-[rgba(17,17,17,0.58)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[220px] p-5">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>STORAGE · {capacityLabel}</Label>
      <div className="mt-4 grid gap-4">
        {rows.map((row) => {
          const pct = Math.max(0, Math.min(100, (row.used / row.total) * 100));
          return (
            <div key={row.name}>
              <div className={`mb-2 flex items-center justify-between text-[12px] uppercase tracking-[0.1em] ${muted}`}>
                <span>{row.name}</span>
                <span>{row.used} GB</span>
              </div>
              <div className="h-[9px] w-full overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor:
                      row.tone === "orange"
                        ? "var(--danger)"
                        : light
                          ? "#111111"
                          : "#f5f5f5",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Tile>
  );
}
