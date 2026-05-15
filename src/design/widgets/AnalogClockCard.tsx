import clsx from "clsx";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { CircleTile } from "../primitives/CircleTile";
import { useLiveTime } from "../hooks/useLiveTime";

type AnalogClockCardProps = {
  hourDeg?: number;
  minuteDeg?: number;
  secondDeg?: number;
  light?: boolean;
  live?: boolean;
  className?: string;
};

export function AnalogClockCard({
  hourDeg,
  minuteDeg,
  secondDeg,
  light: explicitLight,
  live = true,
  className,
}: AnalogClockCardProps) {
  const light = useWidgetTheme(explicitLight);
  const { now } = useLiveTime("sv-SE");
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours() % 12;

  const currentHourDeg = live ? hour * 30 + min * 0.5 : (hourDeg ?? 0);
  const currentMinuteDeg = live ? (min + sec / 60) * 6 : (minuteDeg ?? 0);
  const currentSecondDeg = live ? sec * 6 : secondDeg;
  const handColor = light ? "#111111" : "#F5F5F5";
  const markerColor = light ? "rgba(17,17,17,0.46)" : "rgba(245,245,245,0.56)";
  const minuteMarker = light ? "rgba(17,17,17,0.24)" : "rgba(245,245,245,0.30)";

  return (
    <CircleTile light={light} className={clsx("relative min-h-[170px] p-4", className)}>
      <svg className="h-full w-full" viewBox="0 0 200 200">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * Math.PI) / 30;
          const isMajor = i % 5 === 0;
          const r1 = isMajor ? 80 : 84;
          const r2 = 88;
          const x1 = 100 + r1 * Math.cos(angle - Math.PI / 2);
          const y1 = 100 + r1 * Math.sin(angle - Math.PI / 2);
          const x2 = 100 + r2 * Math.cos(angle - Math.PI / 2);
          const y2 = 100 + r2 * Math.sin(angle - Math.PI / 2);

          return (
            <line
              key={i}
              stroke={isMajor ? markerColor : minuteMarker}
              strokeLinecap="round"
              strokeWidth={isMajor ? 2.2 : 1.2}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
            />
          );
        })}

        <g transform={`rotate(${currentHourDeg} 100 100)`}>
          <line
            stroke={handColor}
            strokeLinecap="round"
            strokeWidth="4.5"
            x1="100"
            x2="100"
            y1="100"
            y2="64"
          />
        </g>
        <g transform={`rotate(${currentMinuteDeg} 100 100)`}>
          <line
            stroke={handColor}
            strokeLinecap="round"
            strokeWidth="3"
            x1="100"
            x2="100"
            y1="100"
            y2="50"
          />
        </g>
        {typeof currentSecondDeg === "number" ? (
          <g transform={`rotate(${currentSecondDeg} 100 100)`}>
            <line
              stroke="var(--danger)"
              strokeLinecap="round"
              strokeWidth="2"
              x1="100"
              x2="100"
              y1="112"
              y2="42"
            />
          </g>
        ) : null}

        <circle cx="100" cy="100" fill="var(--danger)" r="4.8" />
      </svg>
    </CircleTile>
  );
}
