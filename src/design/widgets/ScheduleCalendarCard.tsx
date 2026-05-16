import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";

type MeetingItem = {
  title: string;
  location: string;
  time: string;
};

type ScheduleCalendarCardProps = {
  month: string;
  activeDay: number;
  meetings: MeetingItem[];
  light?: boolean;
};

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

// June layout with first day offset = 1 and 30 days
const juneCells = [0, ...Array.from({ length: 30 }, (_, i) => i + 1)];

export function ScheduleCalendarCard({
  month,
  activeDay,
  meetings,
  light,
}: ScheduleCalendarCardProps) {
  const mutedTone = light ? "text-[rgba(17,17,17,0.62)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="min-h-[200px] p-5 md:p-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          {meetings.map((item) => (
            <article className="border-l-2 border-[var(--border)] pl-4" key={item.title}>
              <h3 className="text-[22px] leading-[1.1] tracking-[-0.02em]">{item.title}</h3>
              <p className={`mt-2 text-[13px] uppercase tracking-[0.12em] leading-[1.2] ${mutedTone}`}>
                {item.location}
              </p>
              <p className={`mt-1 text-[13px] tracking-[0.08em] leading-[1.2] ${mutedTone}`}>
                {item.time}
              </p>
            </article>
          ))}
        </div>

        <div>
          <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>{month}</Label>
          <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
            {weekDays.map((day, index) => (
              <div className={`text-[13px] leading-none ${mutedTone}`} key={`${day}-${index}`}>
                {day}
              </div>
            ))}

            {juneCells.map((day, index) => {
              if (day === 0) {
                return <div key={`empty-${index}`} />;
              }

              const isActive = day === activeDay;
              return (
                <div
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[15px] leading-none ${
                    isActive ? "bg-[var(--danger)] text-[var(--white)]" : ""
                  }`}
                  key={day}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Tile>
  );
}
