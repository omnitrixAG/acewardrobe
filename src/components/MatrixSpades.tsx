import { FC, useEffect, useState } from "react";

interface MatrixSpade {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export const MatrixSpades: FC = () => {
  const [spades, setSpades] = useState<MatrixSpade[]>([]);

  useEffect(() => {
    const newSpades: MatrixSpade[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 20 + Math.random() * 40,
      opacity: 0.03 + Math.random() * 0.05,
    }));
    setSpades(newSpades);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {spades.map((spade) => (
        <div
          key={spade.id}
          className="absolute"
          style={{
            left: `${spade.left}%`,
            top: `${spade.top}%`,
            width: `${spade.size}px`,
            height: `${spade.size}px`,
            opacity: spade.opacity,
            animation: `matrix-fall ${spade.duration}s linear infinite, slow-spin ${spade.duration * 0.5}s linear infinite`,
            animationDelay: `${spade.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M50 10 C50 10, 10 50, 10 70 C10 84, 24 94, 40 90 C36 100, 30 110, 30 110 L70 110 C70 110, 64 100, 60 90 C76 94, 90 84, 90 70 C90 50, 50 10, 50 10 Z"
              fill="hsl(var(--primary))"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
