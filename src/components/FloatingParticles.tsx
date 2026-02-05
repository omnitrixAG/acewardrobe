import { FC, useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingParticles: FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, hsl(348, 76%, 50%) 0%, transparent 70%)`,
            animation: `particle-float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
