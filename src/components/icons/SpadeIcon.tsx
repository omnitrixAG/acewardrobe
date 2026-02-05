import { FC } from "react";

interface SpadeIconProps {
  className?: string;
  size?: number;
  showLetters?: boolean;
}

export const SpadeIcon: FC<SpadeIconProps> = ({ 
  className = "", 
  size = 40,
  showLetters = true 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="spadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Main Spade Shape */}
      <path
        d="M50 8 
           C50 8 15 40 15 55 
           C15 68 25 78 38 78 
           C44 78 48 75 50 72 
           C52 75 56 78 62 78 
           C75 78 85 68 85 55 
           C85 40 50 8 50 8Z"
        fill="url(#spadeGradient)"
        filter="url(#glow)"
      />
      
      {/* Spade Stem */}
      <path
        d="M45 72 L45 92 L55 92 L55 72 
           C53 74 47 74 45 72Z"
        fill="url(#spadeGradient)"
      />
      
      {/* AW Letters integrated */}
      {showLetters && (
        <g>
          <text
            x="35"
            y="58"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Playfair Display, serif"
            fill="#1a1a1a"
            textAnchor="middle"
          >
            a
          </text>
          <text
            x="65"
            y="58"
            fontSize="18"
            fontWeight="bold"
            fontFamily="Playfair Display, serif"
            fill="#1a1a1a"
            textAnchor="middle"
          >
            w
          </text>
        </g>
      )}
    </svg>
  );
};
