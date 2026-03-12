"use client";

import { useState, useEffect } from "react";

interface LiveClockProps {
  showSeconds?: boolean;
  showTimezone?: boolean;
  className?: string;
}

export default function LiveClock({
  showSeconds = false,
  showTimezone = false,
  className = "",
}: LiveClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/New_York",
      };
      if (showSeconds) options.second = "2-digit";

      let formatted = now.toLocaleTimeString("en-US", options);
      if (showTimezone) formatted += " EST";

      setTime(formatted);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [showSeconds, showTimezone]);

  return (
    <span className={className} suppressHydrationWarning>
      {time || "00:00"}
    </span>
  );
}
