import { DotText } from "../primitives/DotText";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { Tile } from "../primitives/Tile";

type NumberLightCardProps = {
  light?: boolean;
  value: string;
};

export function NumberLightCard({ value, light: explicitLight }: NumberLightCardProps) {
  const light = useWidgetTheme(explicitLight);
  const textColor = light ? "text-[var(--card-light-text)]" : "text-[var(--text)]";
  return (
    <Tile light={light} className="min-h-[170px] flex items-center justify-center p-4">
      <DotText value={value} className={`text-[48px] leading-[0.9] tracking-[0.01em] min-[430px]:text-[64px] md:text-[84px] ${textColor}`} />
    </Tile>
  );
}
