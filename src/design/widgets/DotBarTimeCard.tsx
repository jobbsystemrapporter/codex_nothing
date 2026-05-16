import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";
import { useWidgetTheme } from "../hooks/useWidgetTheme";

type DotBarTimeCardProps = {
  time: string;
  total: number;
  active: number;
};

export function DotBarTimeCard({ time, total, active }: DotBarTimeCardProps) {
  const light = useWidgetTheme();
  const inactive = light ? "rgba(17,17,17,0.14)" : "rgba(255,255,255,0.16)";
  return (
    <Tile className="min-h-[170px] p-4">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor:
                index < active ? (index > total - 4 ? "var(--danger)" : "var(--white)") : inactive,
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex items-end gap-2">
        <DotText value={time} className="text-[28px] min-[430px]:text-[36px] md:text-[48px] leading-[0.92] tracking-[0.01em]" />
      </div>
      <Label className="mt-2">Total time</Label>
    </Tile>
  );
}
