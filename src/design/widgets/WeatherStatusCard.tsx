import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { Label } from "../primitives/Label";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Tile } from "../primitives/Tile";
import { WeatherDotsIcon, type WeatherDotsVariant } from "../primitives/WeatherDotsIcon";

type WeatherStatusCardProps = {
  variant: WeatherDotsVariant;
  title?: string;
  temp?: string;
  condition?: string;
  message?: string;
  light?: boolean;
};

export function WeatherStatusCard({
  variant,
  title,
  temp,
  condition,
  message,
  light: explicitLight,
}: WeatherStatusCardProps) {
  const theme = useContext(ThemeContext);
  const light = explicitLight !== undefined ? explicitLight : theme.isLight;
  const muted = light ? "text-[rgba(17,17,17,0.72)]" : "text-[var(--text-muted)]";

  return (
    <Tile light={light} className="flex min-h-[200px] flex-col justify-between p-3.5">
      <div>
        {title ? (
          <Label className={light ? "text-[rgba(17,17,17,0.62)]" : ""}>{title}</Label>
        ) : null}
        <div className="mt-3">
          <WeatherDotsIcon light={light} size="sm" variant={variant} />
        </div>
      </div>

      <div>
        {temp ? (
          <DotMatrixNumber
            className={light ? "text-[var(--card-light-text)]" : ""}
            light={light}
            offStyle="none"
            size="sm"
            value={`${temp}°`}
          />
        ) : null}
        {condition ? (
          <p className={`mt-2 text-[12px] uppercase tracking-[0.11em] leading-[1.22] ${muted}`}>
            {condition}
          </p>
        ) : null}
        {message ? (
          <p className={`mt-2 text-[12px] uppercase tracking-[0.11em] leading-[1.22] ${muted}`}>
            {message}
          </p>
        ) : null}
      </div>
    </Tile>
  );
}
