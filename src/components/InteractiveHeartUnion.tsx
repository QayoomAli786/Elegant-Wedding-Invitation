import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { RomanticCouplePortraitSvg, AnimatedWeddingRings, CornerFloralFiligree } from './RoyalSvgArtwork';
import { WeddingInvitationData } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

interface InteractiveHeartUnionProps {
  data: WeddingInvitationData;
}

export const InteractiveHeartUnion: React.FC<InteractiveHeartUnionProps> = ({ data }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lineAnimating, setLineAnimating] = useState(false);

  const brideInitial = (data.brideName.trim().charAt(0) || 'M').toUpperCase();
  const brideRest = data.brideName.trim().slice(1).toLowerCase();

  const handleHeartClick = () => {
    weddingAudio.playHeartChime();
    setIsRevealed(true);
    setLineAnimating(false);

    // Trigger romantic rose & gold sparkle burst
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F43F5E', '#D4AF37', '#FDE047', '#FFE4E6'],
    });

    setTimeout(() => {
      setLineAnimating(true);
    }, 150);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setLineAnimating(false);
  };

  return (
    <section
      id="section-union"
      className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FDFBF7 0%, #FFF5F7 35%, #FDECF0 65%, #FDFBF7 100%)',
      }}
    >
      {/* Floating Background Glowing Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: '10%', delay: '0s', size: 22, dur: '6s' },
          { left: '22%', delay: '1.5s', size: 16, dur: '7.5s' },
          { left: '38%', delay: '0.8s', size: 26, dur: '6.8s' },
          { left: '64%', delay: '2.1s', size: 18, dur: '7.2s' },
          { left: '78%', delay: '0.4s', size: 24, dur: '6.4s' },
          { left: '88%', delay: '1.9s', size: 15, dur: '8s' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="absolute bottom-12 text-[#E11D48]/30"
            style={{
              left: item.left,
              animation: `floatUpHeart ${item.dur} ease-in-out infinite ${item.delay}`,
            }}
          >
            <Heart
              style={{ width: item.size, height: item.size }}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E11D48]/25 shadow-sm mb-3">
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48] animate-heartbeat" />
            <span className="font-cinzel text-xs tracking-[0.22em] uppercase text-[#9F1239]">
              Interactive Sacred Union
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2C221E]">
            Two Souls, One Eternal Heart
          </h2>
          <p className="font-nastaleeq text-3xl text-[#B38728] mt-2">{data.quranicVerseArabic}</p>
          <p className="font-serif-luxury italic text-base md:text-lg text-[#6E5D4F] max-w-xl mx-auto mt-1">
            {data.quranicVerseTranslation}{' '}
            <span className="not-italic font-cinzel text-xs text-[#9A7426]">
              — {data.quranicVerseReference}
            </span>
          </p>
        </div>

        {/* Main Interactive Heart Card */}
        <div
          className="relative rounded-3xl p-6 sm:p-10 md:p-14 text-center transition-all duration-700 overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, #FFFFFF 0%, #FFF9FA 65%, #FCEEF2 100%)',
            boxShadow:
              '0 25px 60px -15px rgba(190, 18, 60, 0.14), 0 0 0 1px rgba(212, 175, 55, 0.45), inset 0 0 0 6px rgba(255, 255, 255, 0.85)',
          }}
        >
          <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 left-3" color="#D4AF37" />
          <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 right-3" flipX color="#D4AF37" />
          <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 left-3" flipY color="#D4AF37" />
          <CornerFloralFiligree
            className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 right-3"
            flipX
            flipY
            color="#D4AF37"
          />

          {/* Interactive Centerpiece Heart (Always clickable or reveals the couple) */}
          {!isRevealed ? (
            <div className="py-10 md:py-14 flex flex-col items-center justify-center">
              <p className="font-cinzel text-xs md:text-sm tracking-[0.25em] uppercase text-[#9F1239] mb-6">
                ✦ Touch the Glowing Heart to Reveal the Couple ✦
              </p>

              {/* Glowing & Floating Interactive Heart Button */}
              <button
                type="button"
                onClick={handleHeartClick}
                aria-label="Touch the glowing heart to reveal the couple"
                className="relative group cursor-pointer focus:outline-none my-4"
              >
                {/* Concentric Glowing Heart Ripples */}
                <span className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#F43F5E]/30 via-[#D4AF37]/30 to-[#E11D48]/30 blur-xl animate-pulse" />
                <span className="absolute -inset-4 rounded-full bg-[#FFE4E6] opacity-75 animate-ping" style={{ animationDuration: '2.6s' }} />

                <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 active:scale-95 animate-heartbeat">
                  <svg viewBox="0 0 200 185" className="w-full h-full drop-shadow-[0_12px_28px_rgba(225,29,72,0.45)]">
                    <defs>
                      <linearGradient id="rubyHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FB7185" />
                        <stop offset="45%" stopColor="#E11D48" />
                        <stop offset="100%" stopColor="#881337" />
                      </linearGradient>
                      <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF3B0" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#9A7426" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M100 172 C100 172, 16 120, 16 62 C16 28, 44 10, 72 10 C88 10, 96 18, 100 28 C104 18, 112 10, 128 10 C156 10, 184 28, 184 62 C184 120, 100 172, 100 172 Z"
                      fill="url(#rubyHeartGrad)"
                      stroke="url(#goldRimGrad)"
                      strokeWidth="5"
                    />
                    {/* Inner Filigree Heart Outline */}
                    <path
                      d="M100 156 C100 156, 30 112, 30 62 C30 36, 50 22, 72 22 C86 22, 95 30, 100 40 C105 30, 114 22, 128 22 C150 22, 170 36, 170 62 C170 112, 100 156, 100 156 Z"
                      fill="none"
                      stroke="#FFF3B0"
                      strokeWidth="1.5"
                      strokeDasharray="5 4"
                      opacity="0.8"
                    />
                    {/* Glossy Highlight */}
                    <path
                      d="M42 54 C42 36, 58 26, 74 28"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.55"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                    <Sparkles className="w-6 h-6 text-[#FFF3B0] mb-1 animate-spin-slow" />
                    <span className="font-script-luxury text-3xl md:text-4xl text-[#FFFDF9] drop-shadow">
                      Tap Me
                    </span>
                  </div>
                </div>
              </button>

              <p className="font-serif-luxury italic text-lg text-[#6E5D4F] mt-6 max-w-md">
                Click the heart above to unveil a romantic illustration of{' '}
                <strong className="text-[#9F1239] font-semibold">{data.groomName}</strong> &amp;{' '}
                <strong className="text-[#9F1239] font-semibold">{data.brideName}</strong>
              </p>
            </div>
          ) : (
            /* Revealed State: Temporary Bride & Groom Illustration + Connecting Line Between Names */
            <div className="py-4 transition-all duration-1000 animate-fadeIn">
              {/* Top Mini Sparkle Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF1F2] border border-[#F43F5E]/30 text-[#9F1239] text-xs font-cinzel tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Blessed Union Revealed</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>

              {/* Temporary Illustrated Bride & Groom Appearing Gradually with Flowers & Sparkles */}
              <div
                className={`relative mx-auto transition-all duration-1000 transform ${
                  lineAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-6'
                }`}
              >
                <RomanticCouplePortraitSvg />
                <span className="block text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#8A7968] mt-1">
                  ✦ Artistic Couple Illustration • {data.groomName} &amp; {data.brideName} ✦
                </span>
              </div>

              {/* Groom & Bride Names Connected by an Animated Golden Heart Line */}
              <div className="mt-8 max-w-2xl mx-auto px-2">
                <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4">
                  {/* Groom Name */}
                  <div
                    className={`md:col-span-4 transition-all duration-1000 delay-200 transform ${
                      lineAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    <span className="block font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#9A7426]">
                      The Groom
                    </span>
                    <h3 className="font-script-luxury text-5xl sm:text-6xl gold-foil-text py-1">
                      {data.groomName}
                    </h3>
                    <p className="font-serif-luxury text-sm text-[#6E5D4F]">{data.groomFullTitle}</p>
                  </div>

                  {/* Animated Line Connecting Their Names */}
                  <div className="md:col-span-3 flex flex-col items-center justify-center py-2">
                    <svg
                      viewBox="0 0 220 70"
                      className="w-48 md:w-full h-16 overflow-visible"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="connectingLineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="50%" stopColor="#E11D48" />
                          <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                      </defs>
                      {/* Animated Golden Thread Path */}
                      <path
                        d="M 5 35 C 45 10, 75 60, 110 35 C 145 10, 175 60, 215 35"
                        stroke="url(#connectingLineGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="300"
                        strokeDashoffset={lineAnimating ? '0' : '300'}
                        style={{
                          transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                        }}
                      />
                      {/* Left & Right Terminal Dots */}
                      <circle cx="5" cy="35" r="4.5" fill="#D4AF37" />
                      <circle cx="215" cy="35" r="4.5" fill="#D4AF37" />
                      {/* Center Glowing Heart on the Connecting Line */}
                      <g transform="translate(110, 35)" className="animate-heartbeat">
                        <circle cx="0" cy="0" r="16" fill="#FFE4E6" stroke="#D4AF37" strokeWidth="1.5" />
                        <path
                          d="M0 -5 C0 -10, -8 -11, -8 -5 C-8 0, 0 5, 0 8 C0 5, 8 0, 8 -5 C8 -11, 0 -10, 0 -5 Z"
                          fill="#E11D48"
                        />
                      </g>
                    </svg>
                    <span className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[#9F1239]">
                      Connected by Destiny
                    </span>
                  </div>

                  {/* Bride Name */}
                  <div
                    className={`md:col-span-4 transition-all duration-1000 delay-300 transform ${
                      lineAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <span className="block font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#9A7426]">
                      The Bride
                    </span>
                    <h3 className="font-cinzel font-semibold uppercase gold-foil-text py-1 leading-none whitespace-nowrap tracking-[0.14em]">
                      <span className="text-6xl sm:text-7xl align-baseline">{brideInitial}</span>
                      <span className="text-4xl sm:text-5xl align-baseline">{brideRest}</span>
                    </h3>
                    <p className="font-serif-luxury text-sm text-[#6E5D4F]">{data.brideFullTitle}</p>
                  </div>
                </div>
              </div>

              {/* Intertwined Wedding Rings & Replay Button */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <AnimatedWeddingRings size={76} />
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-cinzel tracking-widest uppercase text-[#7A6A5E] hover:text-[#2C221E] bg-[#F5EFE6]/80 hover:bg-[#F5EFE6] border border-[#D4AF37]/35 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Heart Reveal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
