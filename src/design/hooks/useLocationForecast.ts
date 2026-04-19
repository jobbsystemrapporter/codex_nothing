import { useCallback, useEffect, useMemo, useState } from "react";

type ForecastDay = {
  day: string;
  high: string;
  low: string;
  icon: string;
};

type Coords = {
  lat: number;
  lon: number;
};

type ForecastResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
};

type ReverseGeocodeResponse = {
  results?: Array<{
    name?: string;
  }>;
};

type WeatherInfo = {
  icon: string;
  label: string;
};

const FALLBACK_COORDS: Coords = { lat: 59.3293, lon: 18.0686 };
const FALLBACK_DAYS: ForecastDay[] = [
  { day: "WED", high: "-3", low: "-6", icon: "☁" },
  { day: "THU", high: "-1", low: "-9", icon: "❄" },
  { day: "FRI", high: "-9", low: "-10", icon: "❄" },
  { day: "SAT", high: "-6", low: "-6", icon: "☁" },
  { day: "SUN", high: "-4", low: "-6", icon: "☁" },
  { day: "MON", high: "-4", low: "-6", icon: "☁" },
];

function dayFromIso(value: string) {
  return new Date(value)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
}

function weatherInfo(code?: number): WeatherInfo {
  if (code === undefined) return { icon: "☁", label: "Cloudy" };

  if (code === 0) return { icon: "☀", label: "Clear" };
  if (code >= 1 && code <= 3) return { icon: "☁", label: "Partly Cloudy" };
  if (code >= 45 && code <= 48) return { icon: "〰", label: "Fog" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { icon: "☂", label: "Rain" };
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return { icon: "❄", label: "Snow" };
  }
  if (code >= 95) return { icon: "⚡", label: "Storm" };

  return { icon: "☁", label: "Cloudy" };
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export function useLocationForecast() {
  const [coords, setCoords] = useState<Coords>(FALLBACK_COORDS);
  const [city, setCity] = useState("Stockholm");
  const [temp, setTemp] = useState("30°");
  const [subtitle, setSubtitle] = useState("Party Cloudy");
  const [days, setDays] = useState<ForecastDay[]>(FALLBACK_DAYS);
  const [source, setSource] = useState<"fallback" | "location">("fallback");
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setSource("location");
      },
      () => {
        setSource("fallback");
      },
      { enableHighAccuracy: false, maximumAge: 600000, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    const loadForecast = async () => {
      setLoading(true);
      try {
        const forecastUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}` +
          `&longitude=${coords.lon}` +
          `&current=temperature_2m,weather_code` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
          `&forecast_days=6&timezone=auto`;

        const reverseUrl =
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${coords.lat}` +
          `&longitude=${coords.lon}&count=1&language=en`;

        const [forecast, reverse] = await Promise.all([
          fetchJson<ForecastResponse>(forecastUrl, controller.signal),
          fetchJson<ReverseGeocodeResponse>(reverseUrl, controller.signal).catch(
            () => ({ results: [] })
          ),
        ]);

        if (!alive) return;

        const times = forecast.daily?.time ?? [];
        const codes = forecast.daily?.weather_code ?? [];
        const highs = forecast.daily?.temperature_2m_max ?? [];
        const lows = forecast.daily?.temperature_2m_min ?? [];

        const mappedDays = times.slice(0, 6).map((iso, index) => {
          const code = codes[index];
          const weather = weatherInfo(code);
          return {
            day: dayFromIso(iso),
            high: String(Math.round(highs[index] ?? 0)),
            low: String(Math.round(lows[index] ?? 0)),
            icon: weather.icon,
          };
        });

        if (mappedDays.length > 0) {
          setDays(mappedDays);
        }

        const currentCode = forecast.current?.weather_code ?? codes[0];
        const currentTemp = forecast.current?.temperature_2m ?? highs[0];
        const currentWeather = weatherInfo(currentCode);

        if (typeof currentTemp === "number") {
          setTemp(`${Math.round(currentTemp)}°`);
        }
        setSubtitle(currentWeather.label);

        const placeName = reverse.results?.[0]?.name;
        if (placeName) {
          setCity(placeName);
        }
      } catch {
        if (!alive) return;
        setSource("fallback");
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    void loadForecast();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [coords.lat, coords.lon]);

  return useMemo(
    () => ({
      city,
      temp,
      subtitle,
      days,
      source,
      loading,
      requestLocation,
    }),
    [city, temp, subtitle, days, source, loading, requestLocation]
  );
}
