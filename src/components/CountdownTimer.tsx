import { FC, useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: FC = () => {
  // Valentine's Day - February 14, 2026 at 10:00 AM
  const targetDate = new Date("2026-02-14T10:00:00").getTime();
  
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setFlip(true);
      setTimeout(() => setFlip(false), 300);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="countdown-card-enhanced min-w-[70px] md:min-w-[100px]">
      <span 
        className={`text-3xl md:text-5xl font-display font-bold text-foreground transition-all duration-300 ${
          flip ? "animate-number-flip" : ""
        }`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[0.65rem] md:text-xs font-body text-chrome font-semibold tracking-[0.2em] uppercase mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="flex items-center text-2xl md:text-4xl text-muted-foreground font-light">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="flex items-center text-2xl md:text-4xl text-muted-foreground font-light">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="flex items-center text-2xl md:text-4xl text-muted-foreground font-light">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};
