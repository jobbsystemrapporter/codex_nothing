import { Label } from "../primitives/Label";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";

type NetworkTrendCardProps = {
  value: string;
  unit?: string;
  delta: string;
  light?: boolean;
};

export function NetworkTrendCard({
  value,
  unit = "MB/S",
  delta,
  light: explicitLight,
}: NetworkTrendCardProps) {
  const light = useWidgetTheme(explicitLight);
  const muted = light ? "text-[rgba(17,17,17,0.58)]" : "text-[var(--text-muted)]";
  const stroke = light ? "rgba(249,115,22,0.85)" : "rgba(249,115,22,0.95)";

  return (
    <Tile light={light} className="min-h-[180px] p-4">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>NETWORK</Label>
      <div className="mt-4 flex items-end gap-2">
        <p className="text-[52px] leading-[0.88] tracking-[-0.03em]">{value}</p>
        <p className={`pb-1 text-[18px] ${muted}`}>{unit}</p>
      </div>

      <svg className="mt-3 h-[46px] w-full" preserveAspectRatio="none" viewBox="0 0 260 46">
        <path
          d="M0 34 L18 30 L36 33 L54 24 L72 29 L90 20 L108 30 L126 21 L144 28 L162 24 L180 32 L198 25 L216 29 L234 24 L252 30 L260 22"
          fill="none"
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth="2.3"
        />
      </svg>

      <p className={`mt-2 text-[12px] uppercase tracking-[0.1em] ${muted}`}>↑ {delta}</p>
    </Tile>
  );
}
