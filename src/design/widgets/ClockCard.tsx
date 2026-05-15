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
    <Tile light={light} className="flex h-full min-h-[410px] flex-col justify-between p-6 md:min-h-[520px]">
      <div className={textTone}>
        <Label className={labelTone}>{label}</Label>

        <div className="mt-6 flex items-center gap-3 min-[430px]:gap-4 md:gap-5">
          <DotText
            value={hours}
            className="text-[62px] leading-[0.84] tracking-[0.01em] min-[430px]:text-[70px] md:text-[96px]"
          />
          <DotText
            value=":"
            className="text-[48px] leading-[0.84] tracking-[0.01em] min-[430px]:text-[56px] md:text-[78px]"
          />
          <DotText
            value={minutes}
            className="text-[62px] leading-[0.84] tracking-[0.01em] min-[430px]:text-[70px] md:text-[96px]"
          />
        </div>

        <DotText value={displayDate} className={`mt-7 text-[20px] leading-[1] min-[430px]:text-[23px] md:mt-8 md:text-[30px] ${metaTone}`} />
      </div>

      {note ? (
        <div className="pt-6 md:pt-8">
          <DotText value={note} className={`text-[19px] leading-[1] min-[430px]:text-[22px] md:text-[29px] ${metaTone}`} />
          {noteTime ? (
            <DotText value={noteTime} className={`mt-1 text-[17px] leading-[1] min-[430px]:text-[19px] md:text-[25px] ${metaTone}`} />
          ) : null}
        </div>
      ) : null}
    </Tile>
  );
}
