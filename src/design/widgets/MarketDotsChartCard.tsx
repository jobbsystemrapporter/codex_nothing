import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { DotGridChart } from "../primitives/DotGridChart";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type MarketDotsChartCardProps = {
  symbol: string;
  value: string;
  change: string;
  changePct: string;
  light?: boolean;
};

const bars = [6, 5, 4, 6, 7, 8, 7, 5, 4, 5, 6, 8, 9, 10, 9, 8, 6, 5, 5, 6, 7, 8, 8, 7];

export function MarketDotsChartCard({
  symbol,
  value,
  change,
  changePct,
  light: explicitLight,
}: MarketDotsChartCardProps) {
  const light = useWidgetTheme(explicitLight);

  const textColor = light ? "text-[rgba(17,17,17,0.8)]" : "text-[var(--white-soft)]";

  return (
    <Tile light={light} className="min-h-[250px] p-4 md:min-h-[280px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <DotText value={symbol.toUpperCase()} className="text-[34px] leading-[0.95] tracking-[0.02em]" />
          <p className={`mt-1 text-[20px] tracking-[0.02em] ${textColor}`}>{value}</p>
        </div>
        <div className="text-right">
          <p className="text-[28px] leading-none tracking-[0.02em] text-[var(--success)]">{change}</p>
          <p className="mt-1 text-[14px] tracking-[0.08em] text-[var(--success)]">{changePct}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
          <Label key={month}>{month}</Label>
        ))}
      </div>

      <DotGridChart className="mt-3" columns={24} heights={bars} rows={10} />
    </Tile>
  );
}
