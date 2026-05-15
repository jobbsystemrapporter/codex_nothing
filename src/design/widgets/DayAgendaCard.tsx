import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type AgendaItem = {
  time: string;
  text: string;
};

type DayAgendaCardProps = {
  dayNumber: string;
  dayName: string;
  items: AgendaItem[];
  light?: boolean;
};

export function DayAgendaCard({ dayNumber, dayName, items, light: explicitLight }: DayAgendaCardProps) {
  const light = useWidgetTheme(explicitLight);

  const textColor = light ? "text-[rgba(17,17,17,0.8)]" : "text-[var(--white-soft)]";
  const bgColor = light ? "bg-[rgba(17,17,17,0.06)]" : "bg-[rgba(255,255,255,0.05)]";

  return (
    <Tile light={light} className="min-h-[250px] p-4 md:min-h-[280px]">
      <div className="grid gap-4 md:grid-cols-[170px_1fr]">
        <div>
          <DotMatrixNumber light={light} size="lg" value={dayNumber} />
          <p className={`mt-2 text-[14px] uppercase tracking-[0.12em] ${textColor}`}>{dayName}</p>
        </div>

        <div className={`rounded-[18px] ${bgColor} p-4`}>
          <Label>Today</Label>
          <div className="mt-3 grid gap-4">
            {items.map((item) => (
              <div key={`${item.time}-${item.text}`}>
                <p className="text-[14px] tracking-[0.08em] text-[var(--text-muted)]">{item.time}</p>
                <p className={`text-[14px] leading-[1.45] tracking-[0.02em] ${textColor}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tile>
  );
}
