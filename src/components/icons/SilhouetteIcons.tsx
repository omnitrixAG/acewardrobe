import { FC } from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const DressSilhouette: FC<IconProps> = ({ className = "", size = 80 }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M40 5 L32 20 L25 20 L30 45 L15 110 L65 110 L50 45 L55 20 L48 20 Z"
      fill="currentColor"
      opacity="0.15"
    />
    <ellipse cx="40" cy="8" rx="6" ry="4" fill="currentColor" opacity="0.15" />
  </svg>
);

export const LingerieSilhouette: FC<IconProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 60 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 28 Q15 8 30 8 Q45 8 55 28 L50 32 Q40 20 30 20 Q20 20 10 32 Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M10 28 L10 5 M50 28 L50 5"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.15"
    />
  </svg>
);

export const PyjamaSilhouette: FC<IconProps> = ({ className = "", size = 70 }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 70 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Top */}
    <path
      d="M35 5 L25 12 L15 12 L18 40 L52 40 L55 12 L45 12 Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Pants */}
    <path
      d="M20 42 L18 80 L32 80 L35 55 L38 80 L52 80 L50 42 Z"
      fill="currentColor"
      opacity="0.15"
    />
  </svg>
);

export const SuitSilhouette: FC<IconProps> = ({ className = "", size = 80 }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 80 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Jacket */}
    <path
      d="M40 5 L32 12 L20 15 L15 45 L20 90 L35 90 L35 50 L40 30 L45 50 L45 90 L60 90 L65 45 L60 15 L48 12 Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Collar */}
    <path
      d="M35 12 L40 25 L45 12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.2"
    />
    {/* Tie */}
    <path
      d="M40 25 L38 60 L40 65 L42 60 Z"
      fill="currentColor"
      opacity="0.2"
    />
  </svg>
);

export const ShirtSilhouette: FC<IconProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size * 1.1}
    viewBox="0 0 60 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M30 5 L22 10 L10 15 L8 30 L15 30 L15 60 L45 60 L45 30 L52 30 L50 15 L38 10 Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Collar */}
    <path
      d="M22 10 L30 20 L38 10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.2"
    />
  </svg>
);

export const ShortsSilhouette: FC<IconProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size * 0.7}
    viewBox="0 0 60 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 5 L8 38 L25 38 L30 25 L35 38 L52 38 L50 5 Z"
      fill="currentColor"
      opacity="0.15"
    />
  </svg>
);

export const BoxersSilhouette: FC<IconProps> = ({ className = "", size = 50 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 50 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 5 L5 25 L20 25 L25 18 L30 25 L45 25 L45 5 Z"
      fill="currentColor"
      opacity="0.15"
    />
  </svg>
);
