import { Label } from "../primitives/Label";
import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";

type WeatherMatrixCardProps = {
  city: string;
  temp: string;
  condition: string;
  light?: boolean;
};

const cloudPattern = [
  "000111000",
  "001111100",
  "011111110",
  "111111111",
  "011111110",
];

export function WeatherMatrixCard({
  city,
  temp,
  condition,
  light,
}: WeatherMatrixCardProps) {
  const dotColor = light ? "#111111" : "var(--white-soft)";
  const dotOff = light ? "rgba(17,17,17,0.14)" : "rgba(255,255,255,0.08)";

  return (
    <Tile light={light} className="flex min-h-[180px] flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>{city}</Label>
        <DotText value={temp} className="text-[32px] min-[430px]:text-[44px] md:text-[56px] leading-none tracking-[-0.04em]" />
      </div>

      <div className="grid justify-start gap-1.5">
        {cloudPattern.map((row, rowIndex) => (
          <div className="flex gap-1.5" key={`${row}-${rowIndex}`}>
            {row.split("").map((cell, cellIndex) => (
              <span
                key={`${rowIndex}-${cellIndex}`}
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: cell === "1" ? dotColor : dotOff,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="text-[14px] uppercase tracking-[0.12em] leading-[1.2] text-[var(--text-muted)]">
        {condition}
      </div>
    </Tile>
  );
}
