import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type CityTime = {
  city: string;
  time: string;
};

type WorldTimeMapCardProps = {
  items: CityTime[];
};

const mapRows = [
  "000000000000001110000000001111100000000000000",
  "000000000000011111100000011111111000000000000",
  "000001100000111111110000111111111100000000000",
  "000011111001111111111001111111111110000000000",
  "000111111101111111110001111111111111000000000",
  "000011111101111111100000111111111110000000000",
  "000001111100111111000000011111111100000001100",
  "000000111000011110000000001111110000000011110",
  "000000010000001100000000000111100000000001100",
];

const highlights = new Set(["16-6", "25-4", "42-7"]);

export function WorldTimeMapCard({ items }: WorldTimeMapCardProps) {
  const light = useWidgetTheme();
  const dotOn = light ? "rgba(17,17,17,0.52)" : "rgba(255,255,255,0.52)";
  const dotOff = light ? "rgba(17,17,17,0.08)" : "rgba(255,255,255,0.05)";
  return (
    <Tile className="min-h-[200px] p-4 @min-[360px]:min-h-[300px]">
      <div className="grid gap-4 @min-[360px]:grid-cols-[180px_1fr]">
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.city}>
              <DotText className="text-[22px] leading-[0.95] tracking-[0.02em]" value={item.city.toUpperCase()} />
              <p className="mt-1 text-[14px] tracking-[0.08em] text-[var(--text-muted)]">{item.time}</p>
            </div>
          ))}
        </div>

        <div className="grid place-items-center overflow-x-auto">
          <div className="inline-grid gap-0.5 sm:gap-1">
            {mapRows.map((row, rowIndex) => (
              <div className="flex gap-0.5 sm:gap-1" key={rowIndex}>
                {row.split("").map((cell, cellIndex) => {
                  const key = `${cellIndex}-${rowIndex}`;
                  const hot = highlights.has(key);
                  return (
                    <span
                      className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full"
                      key={key}
                      style={{
                        backgroundColor:
                          cell === "1"
                            ? hot
                              ? "var(--danger)"
                              : dotOn
                            : dotOff,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <Label className="mt-3">World time map</Label>
        </div>
      </div>
    </Tile>
  );
}
