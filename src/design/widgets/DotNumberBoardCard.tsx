import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";

type DotNumberBoardCardProps = {
  light?: boolean;
};

export function DotNumberBoardCard({ light: explicitLight }: DotNumberBoardCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const muted = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[220px] p-5 md:p-6">
      <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>Dot matrix set</Label>

      <DotMatrixNumber
        className={`mt-4 ${muted}`}
        light={light}
        offStyle="none"
        size="sm"
        value="0123456789"
      />

      <div className="mt-8 grid gap-6">
        <DotMatrixNumber light={light} offStyle="none" size="lg" value="01234" />
        <DotMatrixNumber light={light} offStyle="none" size="lg" value="56789" />
      </div>
    </Tile>
  );
}
