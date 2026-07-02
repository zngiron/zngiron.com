"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// Manila clock for the footer spec strip. Renders `--:--` until mounted so
// server and client markup always match (the build-time clock would drift),
// then ticks on the minute.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    // Align the interval to the next minute boundary, then tick per minute.
    const untilNextMinute = 60_000 - (Date.now() % 60_000);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      update();
      interval = window.setInterval(update, 60_000);
    }, untilNextMinute);
    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return <time className="tabular-nums">{time ?? "--:--"} PHT</time>;
}
