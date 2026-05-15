import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { DotText } from "../primitives/DotText";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";

type GmtDotCardProps = {
  light?: boolean;
  day?: string;
  zone?: string;
};

export function GmtDotCard({ day = "TUESDAY", zone = "GMT+1", light: explicitLight }: GmtDotCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const textColor = light ? "text-[var(--card-light-text)]" : "text-[var(--text)]";
  return (
    <Tile light={light} className="min-h-[170px] p-4">
      <DotText
        value={day}
        className={`text-[28px] leading-[0.95] tracking-[0.02em] ${textColor}`}
      />
      <div className="mt-6">
        <DotMatrixNumber light={light} offStyle="none" size="md" value={zone} />
      </div>
    </Tile>
  );
}
