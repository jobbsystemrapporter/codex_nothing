import { useContext, useMemo } from "react";
import { TimeContext } from "../context/TimeContext";

export function useLiveTime(locale = "sv-SE") {
  const ctx = useContext(TimeContext);
  return useMemo(() => {
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
      now: ctx.now,
      time: new Intl.DateTimeFormat(locale, optsTime).format(ctx.now),
      date: new Intl.DateTimeFormat(locale, optsDate)
        .format(ctx.now)
        .toUpperCase(),
    };
  }, [ctx.now, locale]);
}
