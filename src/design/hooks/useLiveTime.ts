import { useEffect, useState } from "react";

function two(value: number) {
  return String(value).padStart(2, "0");
}

export function useLiveTime(locale = "sv-SE") {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = `${two(now.getHours())}:${two(now.getMinutes())}`;
  const date = now
    .toLocaleDateString(locale, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
    .replace(/\./g, "")
    .toUpperCase();

  return { now, time, date };
}
