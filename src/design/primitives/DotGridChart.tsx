import clsx from "clsx";

type DotGridChartProps = {
  columns: number;
  rows: number;
  heights: number[];
  className?: string;
  light?: boolean;
  accentFromRow?: number;
};

export function DotGridChart({
  columns,
  rows,
  heights,
  className,
  light = false,
  accentFromRow = Math.floor(rows * 0.55),
}: DotGridChartProps) {
  const onNeutral = light ? "bg-[rgba(17,17,17,0.16)]" : "bg-[rgba(255,255,255,0.12)]";
  const onAccent = "bg-[var(--danger)]";
  const off = light ? "bg-[rgba(17,17,17,0.06)]" : "bg-[rgba(255,255,255,0.04)]";

  return (
    <div className={clsx("grid gap-1.5", className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
      {Array.from({ length: rows * columns }).map((_, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const h = heights[col] ?? 0;
        const isOn = row >= rows - h;
        const accent = row >= accentFromRow;

        return (
          <span
            className={clsx("h-2.5 w-2.5 rounded-full", isOn ? (accent ? onAccent : onNeutral) : off)}
            key={i}
          />
        );
      })}
    </div>
  );
}
