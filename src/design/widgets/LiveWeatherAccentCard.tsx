import { useEffect, useMemo, useState } from "react";
import { DotMatrixNumber } from "../primitives/DotMatrixNumber";
import { Label } from "../primitives/Label";
import { Tile } from "../primitives/Tile";
import { WeatherDotsIcon, type WeatherDotsVariant } from "../primitives/WeatherDotsIcon";
import { useWidgetTheme } from "../hooks/useWidgetTheme";
import { useLiveTime } from "../hooks/useLiveTime";

type LiveWeatherAccentCardProps = {
  fallbackCity?: string;
  fallbackLat?: number;
  fallbackLon?: number;
};

type WeatherState = {
  city: string;
  temp: number;
  code: number;
  wind: number;
};

const FALLBACK = {
  city: "Stockholm",
  lat: 59.3293,
  lon: 18.0686,
};

function mapCode(code: number): { label: string; variant: WeatherDotsVariant; accent: string } {
  if (code === 0 || code === 1) {
    return { label: "Clear", variant: "sunny", accent: "var(--white)" };
  }
  if (code === 2 || code === 3 || code === 45 || code === 48) {
    return { label: "Cloudy", variant: "cloudy", accent: "var(--text-muted)" };
  }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { label: "Rain", variant: "showers", accent: "var(--white)" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { label: "Snow", variant: "cloudy", accent: "var(--white)" };
  }
  if ([95, 96, 99].includes(code)) {
    return { label: "Storm", variant: "showers", accent: "var(--danger)" };
  }
  return { label: "Weather", variant: "cloudy", accent: "var(--white)" };
}

export function LiveWeatherAccentCard({
  fallbackCity = FALLBACK.city,
  fallbackLat = FALLBACK.lat,
  fallbackLon = FALLBACK.lon,
}: LiveWeatherAccentCardProps) {
  const light = useWidgetTheme();
  const [coords, setCoords] = useState({ lat: fallbackLat, lon: fallbackLon, city: fallbackCity });
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState(true);
  const { time } = useLiveTime("en-US");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }));
      },
      () => {},
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`,
        );
        const weatherJson = await weatherRes.json();
        const current = weatherJson?.current;

        if (!active || !current) return;
        setWeather({
          city: coords.city,
          temp: Math.round(current.temperature_2m),
          code: Number(current.weather_code ?? 3),
          wind: Math.round(current.wind_speed_10m ?? 0),
        });
      } catch {
        if (!active) return;
        setWeather({
          city: coords.city,
          temp: 12,
          code: 3,
          wind: 4,
        });
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const timer = window.setInterval(load, 600000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [coords.city, coords.lat, coords.lon]);

  const descriptor = useMemo(() => mapCode(weather?.code ?? 3), [weather?.code]);

  return (
    <Tile className="flex h-full min-h-[200px] flex-col p-4 md:min-h-[260px] md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Label>Live Weather</Label>
          <p className="mt-1 text-[14px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {weather?.city ?? coords.city}
          </p>
        </div>
        <p className="text-[13px] tracking-[0.08em] text-[var(--text-soft)]">{time}</p>
      </div>

      <div className="mt-4 flex items-start gap-5">
        <div className="w-[92px] shrink-0">
          <WeatherDotsIcon light={light} size="sm" variant={descriptor.variant} />
        </div>
        <div className="min-w-0 flex-1">
          <DotMatrixNumber
            className="max-w-full"
            offStyle="none"
            size="sm"
            value={`${loading ? "--" : String(weather?.temp ?? 12)}°`}
          />
          <p className="mt-2 text-[13px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {descriptor.label}
          </p>
        </div>
      </div>

      <div className="mt-auto rounded-[12px] border border-[var(--border)] px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--text-muted)]">Wind</span>
          <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--text)]">
            {loading ? "--" : `${weather?.wind ?? 0} m/s`}
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[rgba(255,255,255,0.08)]">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, ((weather?.wind ?? 0) / 20) * 100)}%`,
              backgroundColor: descriptor.accent,
            }}
          />
        </div>
      </div>
    </Tile>
  );
}
