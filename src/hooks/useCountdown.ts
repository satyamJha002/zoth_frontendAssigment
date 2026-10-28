import { useState, useEffect } from "react";

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export function useCountdown(targetIsoDate?: string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isExpired: false,
  });

  useEffect(() => {
    if (!targetIsoDate) return;

    const targetTime = new Date(targetIsoDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        isExpired: false,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return timeLeft;
}
