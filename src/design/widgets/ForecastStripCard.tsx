import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type ForecastDay = {
  day: string;
  high: string;
  low: string;
  icon?: string;
};

type ForecastStripCardProps = {
  city: string;
  temp: string;
  subtitle: string;
  days: ForecastDay[];
};

export function ForecastStripCard({
  city,
  temp,
  subtitle,
  days,
}: ForecastStripCardProps) {
  return (
    <Tile className="min-h-[190px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Label>{city}</Label>
          <p className="mt-1 text-[13px] text-[var(--text-muted)]">{subtitle}</p>
        </div>
        <DotText value={temp} className="text-[50px] leading-[0.9] tracking-[0.01em]" />
      </div>

      <div className="mt-4 grid grid-cols-6 gap-2">
        {days.map((item) => (
          <div className="text-center" key={item.day}>
            <Label>{item.day}</Label>
            <p className="mt-1 text-[14px]">{item.icon ?? "•"}</p>
            <p className="mt-1 text-[12px] text-[var(--text-muted)]">
              {item.high}° / {item.low}°
            </p>
          </div>
        ))}
      </div>
    </Tile>
  );
}
