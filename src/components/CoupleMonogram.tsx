import React from 'react';

interface CoupleMonogramProps {
  size?: number;
  className?: string;
  tone?: 'gold' | 'ivory';
}

/** Elegant Q & A monogram — the bride's "A" is given a jewelled emerald highlight. */
export const CoupleMonogram: React.FC<CoupleMonogramProps> = ({
  size = 96,
  className = '',
  tone = 'gold',
}) => {
  const outline = tone === 'gold' ? '#B38728' : '#FFF3B0';
  const inner = tone === 'gold' ? '#D4AF37' : '#FFE885';
  const letterFill = tone === 'gold' ? '#7A6236' : '#FFFDF9';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      role="img"
      aria-label="Faizan and Maryam monogram"
    >
      <defs>
        <linearGradient id="monogramRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7426" />
          <stop offset="35%" stopColor="#F9E8A2" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B6514" />
        </linearGradient>
        <radialGradient id="monogramCore" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#F3E7CE" />
        </radialGradient>
      </defs>

      {/* Outer jewelled ring */}
      <circle cx="60" cy="60" r="56" stroke={outline} strokeWidth="1.4" fill="none" opacity="0.75" />
      <circle
        cx="60"
        cy="60"
        r="51"
        stroke="url(#monogramRing)"
        strokeWidth="3.4"
        fill="url(#monogramCore)"
      />
      <circle
        cx="60"
        cy="60"
        r="45"
        stroke={inner}
        strokeWidth="1"
        strokeDasharray="2 3.4"
        fill="none"
        opacity="0.9"
      />

      {/* Crown florets */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={deg}
            cx={60 + Math.cos(rad) * 51}
            cy={60 + Math.sin(rad) * 51}
            r="2.1"
            fill={inner}
          />
        );
      })}

      {/* Q — groom initial */}
      <text
        x="39"
        y="72"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="38"
        fontWeight="600"
        fill={letterFill}
        letterSpacing="-1"
      >
        F
      </text>

      {/* Ampersand seal */}
      <circle cx="60" cy="60" r="11" fill="#2C221E" opacity="0.06" />
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="24"
        fill={outline}
      >
        &amp;
      </text>

      {/* A — bride initial, framed with a subtle emerald accent */}
      <circle cx="82" cy="57" r="17" fill="#065F46" fillOpacity="0.06" />
      <text
        x="82"
        y="72"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="38"
        fontWeight="600"
        fill={letterFill}
        letterSpacing="-1"
      >
        M
      </text>
      <circle cx="82" cy="40" r="1.9" fill="#0F766E" />

      {/* Bottom ornamental swash */}
      <path
        d="M38 88 Q60 97 82 88"
        stroke={inner}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface BrideInitialProps {
  letter?: string;
  size?: number;
  className?: string;
}

/** Prominent, professional initial badge used beside the bride's name. */
export const BrideInitialBadge: React.FC<BrideInitialProps> = ({
  letter = 'M',
  size = 74,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    role="img"
    aria-label={`Bride initial ${letter}`}
  >
    <defs>
      <linearGradient id="brideInitialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9A7426" />
        <stop offset="40%" stopColor="#FFF3B0" />
        <stop offset="100%" stopColor="#B38728" />
      </linearGradient>
      <radialGradient id="brideInitialCore" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F7EEDD" />
      </radialGradient>
    </defs>

    <circle cx="50" cy="50" r="46" fill="url(#brideInitialCore)" stroke="url(#brideInitialGrad)" strokeWidth="2.6" />
    <circle cx="50" cy="50" r="39" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2.5 3.5" />
    {/* Crown & floral coronet above the bride's initial */}
    <path d="M43 18 L47 10 L50 16 L53 10 L57 18 Z" fill="#B38728" stroke="#FFF3B0" strokeWidth="0.8" />
    <circle cx="50" cy="8" r="1.8" fill="#D4AF37" />
    <path d="M50 6 C54 10, 54 14, 50 17 C46 14, 46 10, 50 6 Z" fill="#D4AF37" opacity="0.35" />
    <path d="M84 22 C88 27, 86 31, 81 32 C78 28, 80 24, 84 22 Z" fill="#0F766E" opacity="0.75" />
    <path d="M16 22 C12 27, 14 31, 19 32 C22 28, 20 24, 16 22 Z" fill="#0F766E" opacity="0.75" />
    <path d="M50 88 C54 92, 54 95, 50 97 C46 95, 46 92, 50 88 Z" fill="#D4AF37" opacity="0.8" />
    <text
      x="50"
      y="73"
      textAnchor="middle"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="60"
      fontWeight="700"
      fill="#8B6514"
      stroke="#FFF3B0"
      strokeWidth="0.35"
    >
      {letter}
    </text>
  </svg>
);
