import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MapPin, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { CornerFloralFiligree, AnimatedWeddingRings } from './RoyalSvgArtwork';
import { CoupleMonogram } from './CoupleMonogram';
import { CoupleNameDisplay } from './CoupleNameDisplay';
import { WeddingInvitationData } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

interface OpeningCoverGatefoldProps {
  data: WeddingInvitationData;
  isOpen: boolean;
  onOpenComplete: () => void;
}

export const OpeningCoverGatefold: React.FC<OpeningCoverGatefoldProps> = ({
  data,
  isOpen,
  onOpenComplete,
}) => {
  const [unfoldingStage, setUnfoldingStage] = useState<'closed' | 'flap-opening' | 'doors-opening' | 'opened'>('closed');
  const [musicOn, setMusicOn] = useState<boolean>(false);

  useEffect(
    () =>
      weddingAudio.subscribe((isPlaying, isMuted) => {
        setMusicOn(isPlaying && !isMuted);
      }),
    []
  );

  const handleOpenClick = () => {
    if (unfoldingStage !== 'closed') return;

    // Start ambient romantic wedding music & play heart chime
    weddingAudio.startMusic();
    weddingAudio.playHeartChime();

    // Stage 1: Envelope Seal & Top Flap Unfolds in 3D
    setUnfoldingStage('flap-opening');

    // Burst of golden & rose petals
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#D4AF37', '#F9E8A2', '#E8B4B8', '#FFFDF9', '#C59B27'],
    });

    // Stage 2: Royal Double Gatefold Doors Swing Open in 3D
    setTimeout(() => {
      setUnfoldingStage('doors-opening');
    }, 550);

    // Stage 3: Complete & Reveal Inner Scroll Story
    setTimeout(() => {
      setUnfoldingStage('opened');
      onOpenComplete();
    }, 1850);
  };

  // If already opened and parent switched state, don't block pointer events
  if (isOpen && unfoldingStage === 'opened') {
    return null;
  }

  const isFlapOpen = unfoldingStage === 'flap-opening' || unfoldingStage === 'doors-opening' || unfoldingStage === 'opened';
  const areDoorsOpen = unfoldingStage === 'doors-opening' || unfoldingStage === 'opened';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto overflow-x-hidden perspective-stage transition-opacity duration-700 ${
        unfoldingStage === 'opened' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 40%, #FFFDF9 0%, #F7F1E5 55%, #EDE2CE 100%)',
      }}
    >

      {/* Cover Music Toggle */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          weddingAudio.toggleMute();
        }}
        aria-label={musicOn ? 'Mute wedding music' : 'Play wedding music'}
        className="absolute top-4 right-4 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#D4AF37]/55 shadow-md font-cinzel text-[10px] tracking-[0.16em] uppercase text-[#6E5634] transition cursor-pointer"
      >
        {musicOn ? (
          <Volume2 className="w-3.5 h-3.5 text-[#9A7426] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#9A7426]" />
        )}
        <span className="hidden sm:inline">{musicOn ? 'Music On' : 'Play Music'}</span>
      </button>

      {/* Inner Golden Light Rays Revealed as Gatefold Opens */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isFlapOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 246, 204, 0.95) 0%, rgba(212, 175, 55, 0.25) 45%, rgba(253, 251, 247, 0.95) 100%)',
        }}
      >
        <div className="flex items-center justify-center px-4 py-6 w-full transform transition-transform duration-1000 scale-105">
          <div
            className="relative w-[92%] max-w-xl rounded-2xl border-2 border-[#D4AF37]/80 bg-white/75 px-5 py-7 sm:px-10 sm:py-9 shadow-[inset_0_0_0_6px_rgba(255,253,249,0.9),inset_0_0_0_7px_rgba(212,175,55,0.35)]"
          >
            <CornerFloralFiligree className="w-16 h-16 absolute top-1.5 left-1.5 opacity-80" />
            <CornerFloralFiligree className="w-16 h-16 absolute top-1.5 right-1.5 opacity-80" flipX />
            <CornerFloralFiligree className="w-16 h-16 absolute bottom-1.5 left-1.5 opacity-80" flipY />
            <CornerFloralFiligree
              className="w-16 h-16 absolute bottom-1.5 right-1.5 opacity-80"
              flipX
              flipY
            />

            <p className="font-nastaleeq text-3xl md:text-4xl text-[#9A7426]">{data.bismillahArabic}</p>
            <p className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#8A7968] mt-1">
              {data.bismillahTranslation}
            </p>

            <div className="flex justify-center mt-3">
              <CoupleMonogram size={62} />
            </div>

            <div className="mt-2">
              <CoupleNameDisplay
                groomName={data.groomName}
                brideName={data.brideName}
                variant="stacked"
                size="md"
                brideEmphasis
                showOrnament
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EFE6]/90 border border-[#D4AF37]/50">
              <Sparkles className="w-3 h-3 text-[#B38728]" />
              <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.26em] uppercase text-[#6E5634]">
                Save the Date • {data.weddingYear}
              </span>
              <Sparkles className="w-3 h-3 text-[#B38728]" />
            </div>

            <p className="mt-2.5 text-[11px] sm:text-xs font-sans-luxury text-[#6E5D4F]">
              {data.venueTitle} — {data.venueAddress}
            </p>
          </div>
        </div>
      </div>

      {/* 3D Gatefold Left Wing */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 preserve-3d transition-transform duration-[1350ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-r border-[#D4AF37]/40 shadow-2xl"
        style={{
          transformOrigin: 'left center',
          transform: areDoorsOpen ? 'rotateY(-135deg)' : 'rotateY(0deg)',
          background: 'linear-gradient(135deg, #FDFBF7 0%, #F5EFE6 65%, #EFE5D4 100%)',
        }}
      >
        <div className="absolute inset-4 md:inset-8 border border-[#D4AF37]/45 pointer-events-none" />
        <div className="absolute inset-6 md:inset-10 border border-dashed border-[#D4AF37]/30 pointer-events-none" />
        <CornerFloralFiligree className="w-28 h-28 md:w-44 md:h-44 absolute top-4 left-4 md:top-8 md:left-8" />
        <CornerFloralFiligree
          className="w-28 h-28 md:w-44 md:h-44 absolute bottom-4 left-4 md:bottom-8 md:left-8"
          flipY
        />
        {/* Subtle Damask Arch Pattern on Left Wing */}
        <div className="hidden md:flex h-full items-center justify-end pr-16 opacity-15 pointer-events-none">
          <div className="w-40 h-80 rounded-t-full border-2 border-[#D4AF37]" />
        </div>
      </div>

      {/* 3D Gatefold Right Wing */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 preserve-3d transition-transform duration-[1350ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-l border-[#D4AF37]/40 shadow-2xl"
        style={{
          transformOrigin: 'right center',
          transform: areDoorsOpen ? 'rotateY(135deg)' : 'rotateY(0deg)',
          background: 'linear-gradient(225deg, #FDFBF7 0%, #F5EFE6 65%, #EFE5D4 100%)',
        }}
      >
        <div className="absolute inset-4 md:inset-8 border border-[#D4AF37]/45 pointer-events-none" />
        <div className="absolute inset-6 md:inset-10 border border-dashed border-[#D4AF37]/30 pointer-events-none" />
        <CornerFloralFiligree
          className="w-28 h-28 md:w-44 md:h-44 absolute top-4 right-4 md:top-8 md:right-8"
          flipX
        />
        <CornerFloralFiligree
          className="w-28 h-28 md:w-44 md:h-44 absolute bottom-4 right-4 md:bottom-8 md:right-8"
          flipX
          flipY
        />
        <div className="hidden md:flex h-full items-center justify-start pl-16 opacity-15 pointer-events-none">
          <div className="w-40 h-80 rounded-t-full border-2 border-[#D4AF37]" />
        </div>
      </div>

      {/* 3D Top Envelope Flap Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-32 md:h-44 pointer-events-none preserve-3d transition-transform duration-700 ease-in-out z-20"
        style={{
          transformOrigin: 'top center',
          transform: isFlapOpen ? 'rotateX(165deg)' : 'rotateX(0deg)',
        }}
      >
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EFE6" />
              <stop offset="50%" stopColor="#FFFDF9" />
              <stop offset="100%" stopColor="#EBE0CC" />
            </linearGradient>
          </defs>
          <polygon
            points="0,0 1440,0 720,185"
            fill="url(#flapGrad)"
            stroke="#D4AF37"
            strokeWidth="3"
          />
          <polygon
            points="40,0 1400,0 720,168"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
        </svg>
      </div>

      {/* Center Royal Invitation Plaque & Interactive Seal */}
      <div
        className={`relative z-30 max-w-2xl w-[92%] mx-auto my-5 sm:my-auto text-center px-5 py-6 md:py-12 md:px-12 rounded-3xl transition-all duration-700 ${
          areDoorsOpen
            ? 'scale-125 opacity-0 pointer-events-none'
            : isFlapOpen
            ? 'scale-105'
            : 'scale-100'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(255, 253, 249, 0.97) 0%, rgba(248, 242, 230, 0.94) 100%)',
          boxShadow:
            '0 25px 70px -15px rgba(139, 105, 20, 0.28), 0 0 0 1px rgba(212, 175, 55, 0.55), inset 0 0 0 6px rgba(255, 253, 249, 0.9), inset 0 0 0 7px rgba(212, 175, 55, 0.3)',
        }}
      >
        {/* Top Islamic Bismillah Calligraphy */}
        <div className="mb-3">
          <p className="font-nastaleeq text-3xl md:text-4xl text-[#9A7426] tracking-wide">
            {data.bismillahArabic}
          </p>
          <p className="text-[11px] md:text-xs font-cinzel tracking-[0.2em] uppercase text-[#8A7968] mt-1">
            {data.bismillahTranslation}
          </p>
        </div>

        {/* Engraved Q & A Monogram + Animated Wedding Rings Emblem */}
        <div className="my-1 flex items-center justify-center gap-1 sm:gap-3">
          <CoupleMonogram size={72} />
          <AnimatedWeddingRings size={84} />
        </div>

        {/* Required Invitation Headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/40 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B38728] animate-spin-slow" />
          <span className="font-cinzel text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-[#6E5634]">
            You&apos;re Invited to the Wedding Celebration
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#B38728] animate-spin-slow" />
        </div>

        <p className="font-serif-luxury italic text-base md:text-lg text-[#6E5D4F] mb-1">
          Together with their beloved families, celebrating the sacred union of
        </p>

        {/* Couple Names — professional title-case treatment */}
        <div className="py-2">
          <CoupleNameDisplay
            groomName={data.groomName}
            brideName={data.brideName}
            variant="inline"
            size="lg"
            brideEmphasis
          />
        </div>

        {/* Ornamental Floral Rose Divider */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37] text-lg">❖</span>
          <span className="font-cinzel text-xs tracking-[0.28em] uppercase text-[#8C6D2E]">
            {data.weddingYear}
          </span>
          <span className="text-[#D4AF37] text-lg">❖</span>
          <span className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Three Events Badges Preview */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs font-cinzel tracking-widest uppercase text-[#7A6A5E] mb-7">
          <span className="px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#F4C430]/50 text-[#92400E]">
            ✦ Mehndi
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FFF1F2] border border-[#E11D48]/30 text-[#881337]">
            ✦ Baraat
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A059]/50 text-[#574B3D]">
            ✦ Walima
          </span>
        </div>

        {/* Celebration Venue: Burewala, Stadium Road */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 -mt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-[#D4AF37]/45 text-[11px] font-sans-luxury text-[#5C4E43]">
            <MapPin className="w-3 h-3 text-[#9A7426]" />
            {data.venueAddress}
          </span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2C221E] text-[#FFF3B0] hover:bg-[#9A7426] font-cinzel text-[9px] tracking-[0.14em] uppercase transition"
          >
            <MapPin className="w-2.5 h-2.5" />
            Google Maps
          </a>
        </div>

        {/* Centerpiece Animated Button: "Open Invitation" */}
        <div className="relative inline-block group">
          {/* Pulsing Golden Halo Ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#B38728] opacity-60 blur-md group-hover:opacity-95 transition duration-500 animate-pulse" />

          <button
            type="button"
            onClick={handleOpenClick}
            className="relative flex items-center justify-center gap-3 px-9 py-4 md:px-11 md:py-4.5 rounded-full font-cinzel font-semibold text-sm md:text-base tracking-[0.22em] uppercase text-[#2C221E] shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse-glow"
            style={{
              background:
                'linear-gradient(135deg, #C59B27 0%, #FFF3B0 35%, #D4AF37 65%, #9A7426 100%)',
              border: '2px solid #FFF9DB',
            }}
          >
            <Sparkles className="w-4 h-4 text-[#5C4008]" />
            <span>Open Invitation</span>
            <Sparkles className="w-4 h-4 text-[#5C4008]" />
          </button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#8A7968] font-sans-luxury">
          <Volume2 className="w-3.5 h-3.5 text-[#B38728]" />
          <span>Tap to unfold 3D royal card &amp; play romantic wedding melody</span>
        </p>
      </div>
    </div>
  );
};
