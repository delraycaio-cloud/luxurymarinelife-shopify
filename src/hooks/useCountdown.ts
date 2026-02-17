import { useState, useEffect } from 'react';

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(initialHours: number = 72): CountdownTime {
  const [timeLeft, setTimeLeft] = useState(initialHours * 60 * 60); // Convert to seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return initialHours * 60 * 60; // Reset countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialHours]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}
