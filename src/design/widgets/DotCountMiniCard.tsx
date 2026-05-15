import { DotText } from "../primitives/DotText";
import { Tile } from "../primitives/Tile";
import { useWidgetTheme } from "../hooks/useWidgetTheme";

type DotCountMiniCardProps = {
  value: string;
};

export function DotCountMiniCard({ value }: DotCountMiniCardProps) {
  const light = useWidgetTheme();
  const inactive = light ? "rgba(17,17,17,0.14)" : "rgba(255,255,255,0.25)";
  return (
    <Tile className="min-h-[170px] p-4">
      <DotText value={value} className="text-[34px] leading-[0.9] tracking-[0.02em]" />
      <div className="mt-4 grid gap-2">
        {Array.from({ length: 3 }).map((_, row) => (
          <div className="flex gap-3" key={row}>
            {Array.from({ length: 6 }).map((__, i) => (
              <span
                className="h-2 w-2 rounded-full"
                key={i}
                style={{ backgroundColor: i >= row + 3 ? inactive : "var(--white)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </Tile>
  );
}
