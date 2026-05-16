import { Tile } from "../primitives/Tile";
import { DotText } from "../primitives/DotText";
import { Label } from "../primitives/Label";
import { useLiveTime } from "../hooks/useLiveTime";

type ClockCardProps = {
  time?: string;
  date?: string;
  note?: string;
  noteTime?: string;
  light?: boolean;
  live?: boolean;
  label?: string;
  locale?: string;
};

export function ClockCard({
  time,
  date,
  note,
  noteTime,
  light,
  live = false,
  label = "Lokal tid",
  locale = "sv-SE",
}: ClockCardProps) {
  const liveTime = useLiveTime(locale);
  const displayTime = live ? liveTime.time : time ?? "09:41";
  const displayDate = live ? liveTime.date : date ?? "MÅN, 02 MAJ";
  const [hours = displayTime, minutes = ""] = displayTime.split(":");
  const textTone = light ? "text-[var(--card-light-text)]" : "text-[var(--text)]";
  const labelTone = light ? "text-[rgba(17,17,17,0.66)]" : "text-[var(--text-muted)]";
  const metaTone = light ? "text-[rgba(17,17,17,0.78)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="flex h-full min-h-[220px] flex-col justify-between p-4 @min-[360px]:min-h-[520px] @min-[360px]:p-6">
      <div className={textTone}>
        <Label className={labelTone}>{label}</Label>

        <div className="mt-4 @min-[360px]:mt-6 flex items-center gap-1.5 @min-[240px]:gap-2 @min-[300px]:gap-3 @min-[360px]:gap-5">
          <DotText
            value={hours}
            className="text-[28px] @min-[240px]:text-[36px] @min-[300px]:text-[48px] @min-[360px]:text-[62px] @min-[400px]:text-[70px] @min-[500px]:text-[96px] leading-[0.84] tracking-[0.01em]"
          />
          <DotText
            value=":"
            className="text-[22px] @min-[240px]:text-[28px] @min-[300px]:text-[38px] @min-[360px]:text-[48px] @min-[400px]:text-[56px] @min-[500px]:text-[78px] leading-[0.84] tracking-[0.01em]"
          />
          <DotText
            value={minutes}
            className="text-[28px] @min-[240px]:text-[36px] @min-[300px]:text-[48px] @min-[360px]:text-[62px] @min-[400px]:text-[70px] @min-[500px]:text-[96px] leading-[0.84] tracking-[0.01em]"
          />
        </div>

        <DotText value={displayDate} className={`mt-4 @min-[360px]:mt-7 text-[14px] @min-[240px]:text-[17px] @min-[300px]:text-[20px] @min-[360px]:text-[23px] @min-[500px]:text-[30px] leading-[1] ${metaTone}`} />
      </div>

      {note ? (
        <div className="pt-4 @min-[360px]:pt-8">
          <DotText value={note} className={`text-[14px] @min-[240px]:text-[16px] @min-[300px]:text-[19px] @min-[360px]:text-[22px] @min-[500px]:text-[29px] leading-[1] ${metaTone}`} />
          {noteTime ? (
            <DotText value={noteTime} className={`mt-1 text-[12px] @min-[240px]:text-[14px] @min-[300px]:text-[17px] @min-[360px]:text-[19px] @min-[500px]:text-[25px] leading-[1] ${metaTone}`} />
          ) : null}
        </div>
      ) : null}
    </Tile>
  );
}
