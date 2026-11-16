import React from 'react';

interface CoupleNameDisplayProps {
  groomName: string;
  brideName: string;
  variant?: 'stacked' | 'inline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'gold' | 'ivory';
  /** Render the bride's first capital noticeably larger (drop-cap style). */
  brideEmphasis?: boolean;
  /** Show thin ornamental rules with a diamond above and below (stacked only). */
  showOrnament?: boolean;
  className?: string;
}

const sizeClasses: Record<NonNullable<CoupleNameDisplayProps['size']>, string> = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-4xl sm:text-5xl md:text-6xl',
  lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  xl: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
};

/** Title case — only the first letter capitalised, e.g. "Faizan". */
const cap = (name: string) => {
  const t = name.trim();
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
};

/**
 * Professional invitation-grade couple name treatment.
 * Names are set in refined serif title case (first letter capital only)
 * with a gold foil gradient; the ampersand remains a script accent.
 */
export const CoupleNameDisplay: React.FC<CoupleNameDisplayProps> = ({
  groomName,
  brideName,
  variant = 'stacked',
  size = 'md',
  tone = 'gold',
  brideEmphasis = false,
  showOrnament = false,
  className = '',
}) => {
  const foil = tone === 'gold' ? 'gold-foil-text' : 'gold-foil-light';
  const nameSpan = `font-serif-luxury font-semibold ${foil} tracking-[0.05em] leading-[1.15]`;
  const amp = `font-script-luxury ${foil} leading-none`;

  const groomText = cap(groomName);
  const brideText = cap(brideName);

  const brideContent = brideEmphasis ? (
    <>
      <span className="text-[1.22em] leading-none">{brideText.charAt(0)}</span>
      {brideText.slice(1)}
    </>
  ) : (
    brideText
  );

  const ornament = (
    <div className="flex w-full max-w-[16rem] items-center justify-center gap-2.5">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B38728] to-[#B38728]" />
      <span className={`text-[0.32em] ${foil}`}>❖</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B38728] to-[#B38728]" />
    </div>
  );

  if (variant === 'inline') {
    return (
      <div
        className={`flex flex-wrap items-baseline justify-center gap-x-[0.35em] gap-y-1 ${sizeClasses[size]} ${className}`}
      >
        <span className={nameSpan}>{groomText}</span>
        <span className={`${amp} text-[0.55em]`}>&amp;</span>
        <span className={nameSpan}>{brideContent}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${sizeClasses[size]} ${className}`}>
      {showOrnament && <div className="mb-[0.35em] w-full">{ornament}</div>}
      <span className={nameSpan}>{groomText}</span>
      <span className={`${amp} my-[0.08em] text-[0.42em]`}>&amp;</span>
      <span className={nameSpan}>{brideContent}</span>
      {showOrnament && <div className="mt-[0.35em] w-full">{ornament}</div>}
    </div>
  );
};
