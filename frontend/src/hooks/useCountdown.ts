import { useState, useEffect } from 'react';

interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export function useCountdown(expirationTime: string): CountdownResult {
  const getRemaining = () =>
    Math.max(0, Math.floor((new Date(expirationTime).getTime() - Date.now()) / 1000));

  const [totalSeconds, setTotalSeconds] = useState(getRemaining);

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const timer = setInterval(() => {
      setTotalSeconds(getRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [expirationTime]);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: totalSeconds === 0,
    totalSeconds,
  };
}
