import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

type TimeValue = {
  now: Date;
  time: string;
  date: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TimeContext = createContext<TimeValue>({
  now: new Date(),
  time: "09:41",
  date: "MÅN, 02 MAJ",
});

export function TimeProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let frame: number;
    const update = () => {
      setNow(new Date());
      frame = window.setTimeout(update, 1000);
    };
    update();
    return () => window.clearTimeout(frame);
  }, []);

  const value = useMemo(() => {
    const optsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const optsDate: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    return {
      now,
      time: new Intl.DateTimeFormat("sv-SE", optsTime).format(now),
      date: new Intl.DateTimeFormat("sv-SE", optsDate).format(now).toUpperCase(),
    };
  }, [now]);

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
}
