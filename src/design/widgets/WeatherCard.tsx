import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Cloud } from "lucide-react";

type WeatherCardProps = {
  temp: string;
  label: string;
  condition: string;
  light?: boolean;
};

export function WeatherCard({
  temp,
  label,
  condition,
  light,
}: WeatherCardProps) {
  return (
    <Tile light={light} className="flex min-h-[160px] flex-col justify-between">
      <div className="flex items-center justify-between">
        <DotText value={temp} className="text-4xl font-medium" />
        <Cloud className="h-5 w-5 opacity-70" strokeWidth={1.75} />
      </div>

      <div>
        <div className="text-sm uppercase tracking-[0.14em] opacity-70">
          {label}
        </div>
        <div className="mt-2 text-base uppercase tracking-[0.08em]">
          {condition}
        </div>
      </div>
    </Tile>
  );
}
