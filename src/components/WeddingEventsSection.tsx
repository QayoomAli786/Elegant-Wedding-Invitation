import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Sparkles, Music, Flame, Crown } from 'lucide-react';
import {
  MarigoldGarlandHeader,
  FlickeringDiyaCandle,
  MehndiHennaAndDholakIllustration,
  RoyalBaraatCoupleIllustration,
  WalimaCrystalChandelierSvg,
  CornerFloralFiligree,
} from './RoyalSvgArtwork';
import { WeddingInvitationData } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

interface WeddingEventsSectionProps {
  data: WeddingInvitationData;
  onChapterVisible: (chapter: 'mehndi' | 'baraat' | 'walima') => void;
}

export const WeddingEventsSection: React.FC<WeddingEventsSectionProps> = ({
  data,
  onChapterVisible,
}) => {
  const mehndiRef = useRef<HTMLElement | null>(null);
  const baraatRef = useRef<HTMLElement | null>(null);
  const walimaRef = useRef<HTMLElement | null>(null);

  const [mehndiVisible, setMehndiVisible] = useState(false);
  const [baraatVisible, setBaraatVisible] = useState(false);
  const [walimaVisible, setWalimaVisible] = useState(false);

  // Interactive Mehndi States
  const [dholakPlaying, setDholakPlaying] = useState(false);
  const [diyasBoosted, setDiyasBoosted] = useState(false);

  // Interactive Baraat Royal Entrance State
  const [baraatProcessionActive, setBaraatProcessionActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-event');
            if (id === 'mehndi') {
              setMehndiVisible(true);
              onChapterVisible('mehndi');
            } else if (id === 'baraat') {
              setBaraatVisible(true);
              onChapterVisible('baraat');
            } else if (id === 'walima') {
              setWalimaVisible(true);
              onChapterVisible('walima');
            }
          }
        });
      },
      { threshold: 0.28 }
    );

    if (mehndiRef.current) observer.observe(mehndiRef.current);
    if (baraatRef.current) observer.observe(baraatRef.current);
    if (walimaRef.current) observer.observe(walimaRef.current);

    return () => observer.disconnect();
  }, [onChapterVisible]);

  const handlePlayMehndiDholak = () => {
    weddingAudio.playDholakBeat();
    setDholakPlaying(true);
    setDiyasBoosted(true);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#F4C430', '#FFB800', '#10B981', '#FFD700'],
    });
    setTimeout(() => setDholakPlaying(false), 1800);
  };

  const handleTriggerBaraatEntrance = () => {
    weddingAudio.playHeartChime();
    setBaraatProcessionActive(true);
    confetti({
      particleCount: 80,
      spread: 95,
      origin: { y: 0.55 },
      colors: ['#FFD700', '#FFF3B0', '#BE123C', '#E11D48', '#D4AF37'],
    });
    setTimeout(() => setBaraatProcessionActive(false), 3200);
  };

  const { mehndi, baraat, walima } = data.events;

  return (
    <div className="relative">
      {/* =====================================================================
          EVENT 1: MEHNDI CEREMONY (Yellow, Emerald Green & Golden Theme)
      ====================================================================== */}
      <section
        ref={mehndiRef}
        id="section-mehndi"
        data-event="mehndi"
        className="relative min-h-screen py-20 md:py-28 px-4 sm:px-6 overflow-hidden transition-colors duration-1000"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, #145334 0%, #0A2F1D 58%, #061D12 100%)',
        }}
      >
        {/* Top Swaying Marigold Garlands */}
        <MarigoldGarlandHeader className="absolute top-0 left-0 right-0 z-10" />

        {/* Hanging Vertical Fairy Light Strings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[12, 24, 38, 62, 76, 88].map((leftPct, i) => (
            <div
              key={leftPct}
              className="absolute top-0 flex flex-col items-center gap-6 opacity-75 animate-sway-lantern"
              style={{ left: `${leftPct}%`, animationDelay: `${i * 0.4}s` }}
            >
              <div className="w-[1px] h-64 bg-gradient-to-b from-[#FFD700] to-transparent" />
              {[40, 90, 140, 190, 240].map((topPx) => (
                <span
                  key={topPx}
                  style={{ top: `${topPx}px` }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#FFF3B0] shadow-[0_0_12px_#FFD700] animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-20 pt-16 md:pt-20">
          {/* Event Chapter Badge */}
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              mehndiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#F4C430]/20 border border-[#F4C430]/60 text-[#FDE047] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event 01 • Traditional Festivity</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-nastaleeq text-3xl md:text-4xl text-[#FDE047] mb-1">
              {mehndi.urduSubtitle}
            </p>
            <h2 className="font-script-luxury text-6xl sm:text-7xl md:text-8xl gold-foil-light py-2">
              {mehndi.title}
            </h2>
            <p className="font-serif-luxury italic text-lg md:text-xl text-[#FEF9C3]/90 max-w-xl mx-auto">
              {mehndi.tagline}
            </p>
          </div>

          {/* Mehndi Main Royal Card */}
          <div
            className={`relative rounded-3xl p-6 sm:p-10 md:p-14 transition-all duration-1000 delay-150 transform ${
              mehndiVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{
              background:
                'linear-gradient(145deg, rgba(16, 66, 42, 0.92) 0%, rgba(8, 38, 24, 0.96) 100%)',
              boxShadow:
                '0 30px 70px -15px rgba(0, 0, 0, 0.6), 0 0 0 2px #F4C430, inset 0 0 0 6px rgba(244, 196, 48, 0.2)',
            }}
          >
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 left-3" color="#F4C430" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 right-3" flipX color="#F4C430" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 left-3" flipY color="#F4C430" />
            <CornerFloralFiligree
              className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 right-3"
              flipX
              flipY
              color="#F4C430"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column: Mehndi Illustration & Flickering Diyas */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <MehndiHennaAndDholakIllustration isPlayingBeat={dholakPlaying} />

                {/* Row of Flickering Candles / Diyas */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 -mt-4">
                  <FlickeringDiyaCandle className={diyasBoosted ? 'scale-110 transition' : ''} />
                  <FlickeringDiyaCandle className="w-20 h-20" />
                  <FlickeringDiyaCandle className={diyasBoosted ? 'scale-110 transition' : ''} />
                </div>

                {/* Interactive Mehndi Dholak & Candle Button */}
                <button
                  type="button"
                  onClick={handlePlayMehndiDholak}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs font-semibold tracking-[0.18em] uppercase text-[#0A2F1D] bg-gradient-to-r from-[#F4C430] via-[#FFF3B0] to-[#FFB800] hover:brightness-110 shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Music className="w-4 h-4" />
                  <span>Play Dholak Beat &amp; Shower Marigolds</span>
                  <Flame className="w-4 h-4 text-[#B45309]" />
                </button>
              </div>

              {/* Right Column: Line-by-Line Scroll-Revealed Mehndi Details */}
              <div className="lg:col-span-6 text-left space-y-5 text-[#FEFCE8]">
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    mehndiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#F4C430]">
                    Saffron, Henna &amp; Melodies
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#FFFBEB] mt-1">
                    {data.groomName} &amp; {data.brideName}&apos;s Mehndi Night
                  </h3>
                  <p className="font-sans-luxury text-sm sm:text-base text-[#ECFDF5]/85 leading-relaxed mt-2">
                    {mehndi.description}
                  </p>
                </div>

                {/* Staggered Detail Rows */}
                <div className="space-y-3 pt-2">
                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#062214]/70 border border-[#F4C430]/35 transition-all duration-700 delay-300 transform ${
                      mehndiVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-[#F4C430] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FDE047]">
                        Date
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-white">
                        {mehndi.date}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#062214]/70 border border-[#F4C430]/35 transition-all duration-700 delay-400 transform ${
                      mehndiVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <Clock className="w-5 h-5 text-[#F4C430] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FDE047]">
                        Event Timing
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-white">
                        {mehndi.time}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#062214]/70 border border-[#F4C430]/35 transition-all duration-700 delay-500 transform ${
                      mehndiVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-[#F4C430] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FDE047]">
                        Venue &amp; Location
                      </span>
                      <span className="block font-serif-luxury text-lg sm:text-xl font-semibold text-white">
                        {mehndi.venueName}
                      </span>
                      <span className="block font-sans-luxury text-xs sm:text-sm text-[#D1FAE5]/80">
                        {mehndi.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ceremony Highlights Line-by-Line */}
                <div className="pt-2">
                  <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#F4C430] mb-2">
                    Ceremony Highlights:
                  </p>
                  <ul className="space-y-1.5">
                    {mehndi.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs sm:text-sm text-[#FEF9C3]"
                      >
                        <span className="text-[#F4C430]">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Google Maps Action */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mehndi.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs tracking-widest uppercase border border-[#F4C430] text-[#FEF08A] hover:bg-[#F4C430] hover:text-[#0A2F1D] transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps Location</span>
                  </a>
                  <span className="text-xs font-serif-luxury italic text-[#A7F3D0]">
                    Dress Code: {mehndi.dressCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Ornamental Transition Wave Between Mehndi & Baraat */}
      <div
        className="h-16 w-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #061D12 0%, #3D0814 100%)',
        }}
      >
        <div className="flex items-center gap-4 text-[#FFD700]/70">
          <span className="w-24 h-[1px] bg-[#FFD700]/40" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase">Chapter II • Royal Baraat</span>
          <span className="w-24 h-[1px] bg-[#FFD700]/40" />
        </div>
      </div>

      {/* =====================================================================
          EVENT 2: BARAAT CEREMONY (Royal Crimson Red, Golden & Ivory Theme)
      ====================================================================== */}
      <section
        ref={baraatRef}
        id="section-baraat"
        data-event="baraat"
        className="relative min-h-screen py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 25%, #691022 0%, #3D0814 60%, #24040B 100%)',
        }}
      >
        {/* Royal Entrance Golden Curtains & Shimmering Arch Backdrop */}
        <div className="
          absolute inset-0 pointer-events-none overflow-hidden
        " aria-hidden="true">
          {/* Left Velvet Curtain Drape */}
          <div
            className={`absolute -top-10 -left-10 w-64 md:w-96 h-[120%] rounded-r-full border-r-2 border-[#FFD700]/40 transition-transform duration-[1500ms] ${
              baraatVisible ? '-translate-x-28 md:-translate-x-40' : 'translate-x-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, #1F0208 0%, #4C0817 80%, #7F1D1D 100%)',
              opacity: 0.55,
            }}
          />
          {/* Right Velvet Curtain Drape */}
          <div
            className={`absolute -top-10 -right-10 w-64 md:w-96 h-[120%] rounded-l-full border-l-2 border-[#FFD700]/40 transition-transform duration-[1500ms] ${
              baraatVisible ? 'translate-x-28 md:translate-x-40' : 'translate-x-0'
            }`}
            style={{
              background: 'linear-gradient(270deg, #1F0208 0%, #4C0817 80%, #7F1D1D 100%)',
              opacity: 0.55,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-20">
          {/* Baraat Section Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              baraatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/60 text-[#FFF3B0] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
              <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Event 02 • Royal Procession &amp; Sacred Nikah</span>
              <Crown className="w-3.5 h-3.5 text-[#FFD700]" />
            </div>
            <p className="font-nastaleeq text-3xl md:text-4xl text-[#FFD700] mb-1">
              {baraat.urduSubtitle}
            </p>
            <h2 className="font-script-luxury text-6xl sm:text-7xl md:text-8xl gold-foil-light py-2">
              {baraat.title}
            </h2>
            <p className="font-serif-luxury italic text-lg md:text-xl text-[#FFF5F5]/90 max-w-xl mx-auto">
              {baraat.tagline}
            </p>
          </div>

          {/* Baraat Royal Crimson & Ivory Card */}
          <div
            className={`relative rounded-3xl p-6 sm:p-10 md:p-14 transition-all duration-1000 delay-150 transform ${
              baraatVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{
              background:
                'linear-gradient(145deg, rgba(78, 10, 26, 0.94) 0%, rgba(45, 5, 15, 0.98) 100%)',
              boxShadow:
                '0 30px 80px -15px rgba(0, 0, 0, 0.7), 0 0 0 2px #FFD700, inset 0 0 0 6px rgba(255, 215, 0, 0.22)',
            }}
          >
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 left-3" color="#FFD700" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 right-3" flipX color="#FFD700" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 left-3" flipY color="#FFD700" />
            <CornerFloralFiligree
              className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 right-3"
              flipX
              flipY
              color="#FFD700"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column: Line-by-Line Baraat Details */}
              <div className="lg:col-span-6 order-2 lg:order-1 text-left space-y-5 text-[#FFF5F5]">
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    baraatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#FFD700]">
                    Royal Mughal Splendor
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#FFFDF9] mt-1">
                    The Royal Baraat of {data.groomName} &amp; {data.brideName}
                  </h3>
                  <p className="font-sans-luxury text-sm sm:text-base text-[#FFE4E6]/85 leading-relaxed mt-2">
                    {baraat.description}
                  </p>
                </div>

                {/* Staggered Baraat Info Cards */}
                <div className="space-y-3 pt-2">
                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#2A040C]/80 border border-[#FFD700]/40 transition-all duration-700 delay-300 transform ${
                      baraatVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FFF3B0]">
                        Wedding Date
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#FFF5F5]">
                        {baraat.date}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#2A040C]/80 border border-[#FFD700]/40 transition-all duration-700 delay-400 transform ${
                      baraatVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    <Clock className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FFF3B0]">
                        Procession &amp; Nikah Timing
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#FFF5F5]">
                        {baraat.time}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#2A040C]/80 border border-[#FFD700]/40 transition-all duration-700 delay-500 transform ${
                      baraatVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#FFF3B0]">
                        Royal Venue
                      </span>
                      <span className="block font-serif-luxury text-lg sm:text-xl font-semibold text-[#FFF5F5]">
                        {baraat.venueName}
                      </span>
                      <span className="block font-sans-luxury text-xs sm:text-sm text-[#FECDD3]/80">
                        {baraat.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#FFD700] mb-2">
                    Royal Program:
                  </p>
                  <ul className="space-y-1.5">
                    {baraat.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#FFF5F5]">
                        <span className="text-[#FFD700]">❖</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${baraat.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs tracking-widest uppercase border border-[#FFD700] text-[#FFF3B0] hover:bg-[#FFD700] hover:text-[#3D0814] transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps Location</span>
                  </a>
                  <span className="text-xs font-serif-luxury italic text-[#FECDD3]">
                    Dress Code: {baraat.dressCode}
                  </span>
                </div>
              </div>

              {/* Right Column: Elegant Bride & Groom Illustration + Royal Entrance Animation Button */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center">
                <RoyalBaraatCoupleIllustration showerActive={baraatProcessionActive} />

                <button
                  type="button"
                  onClick={handleTriggerBaraatEntrance}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-cinzel text-xs font-semibold tracking-[0.18em] uppercase text-[#3D0814] bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#FFD700] hover:brightness-110 shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-[#7F1D1D]" />
                  <span>Trigger Royal Entrance &amp; Golden Shower</span>
                  <Sparkles className="w-4 h-4 text-[#7F1D1D]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Ornamental Transition Between Baraat & Walima */}
      <div
        className="h-16 w-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #24040B 0%, #F2ECE1 100%)',
        }}
      >
        <div className="flex items-center gap-4 text-[#8C6D2E]">
          <span className="w-24 h-[1px] bg-[#C5A059]" />
          <span className="font-cinzel text-xs tracking-[0.3em] uppercase bg-[#FAF8F5]/90 px-4 py-1 rounded-full shadow-sm">
            Chapter III • Walima Reception
          </span>
          <span className="w-24 h-[1px] bg-[#C5A059]" />
        </div>
      </div>

      {/* =====================================================================
          EVENT 3: WALIMA RECEPTION (Elegant White, Champagne & Golden Theme)
      ====================================================================== */}
      <section
        ref={walimaRef}
        id="section-walima"
        data-event="walima"
        className="relative min-h-screen py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, #FFFFFF 0%, #FAF8F5 45%, #EFE6D5 100%)',
        }}
      >
        {/* Subtle Champagne Glowing Bokeh Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-[#FFF9DB] blur-xl opacity-60 animate-pulse"
              style={{
                width: `${45 + (idx % 4) * 25}px`,
                height: `${45 + (idx % 4) * 25}px`,
                left: `${(idx * 19) % 92}%`,
                top: `${(idx * 23) % 85}%`,
                animationDelay: `${idx * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative z-20">
          {/* Walima Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              walimaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white border border-[#C5A059]/50 text-[#8C6D2E] font-cinzel text-xs tracking-[0.25em] uppercase shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Event 03 • Grand Reception Banquet</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>
            <p className="font-nastaleeq text-3xl md:text-4xl text-[#9A7426] mb-1">
              {walima.urduSubtitle}
            </p>
            <h2 className="font-script-luxury text-6xl sm:text-7xl md:text-8xl gold-foil-text py-2">
              {walima.title}
            </h2>
            <p className="font-serif-luxury italic text-lg md:text-xl text-[#5C4E43] max-w-xl mx-auto">
              {walima.tagline}
            </p>
          </div>

          {/* Walima Pearl White & Champagne Card */}
          <div
            className={`relative rounded-3xl p-6 sm:p-10 md:p-14 transition-all duration-1000 delay-150 transform ${
              walimaVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{
              background:
                'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(250, 246, 239, 0.96) 60%, rgba(242, 234, 219, 0.96) 100%)',
              boxShadow:
                '0 30px 70px -15px rgba(166, 138, 86, 0.25), 0 0 0 2px #C5A059, inset 0 0 0 8px rgba(255, 255, 255, 0.9)',
            }}
          >
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 left-3" color="#C5A059" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute top-3 right-3" flipX color="#C5A059" />
            <CornerFloralFiligree className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 left-3" flipY color="#C5A059" />
            <CornerFloralFiligree
              className="w-24 h-24 md:w-32 md:h-32 absolute bottom-3 right-3"
              flipX
              flipY
              color="#C5A059"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column: Crystal Chandelier & White Orchid Reception Artwork */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <WalimaCrystalChandelierSvg />
                <div className="mt-3 text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF6EE] border border-[#C5A059]/40 font-cinzel text-[11px] tracking-[0.2em] uppercase text-[#7A6236]">
                    ✦ Pearl &amp; Crystal Reception Hall ✦
                  </span>
                </div>
              </div>

              {/* Right Column: Line-by-Line Walima Details */}
              <div className="lg:col-span-6 text-left space-y-5 text-[#2C221E]">
                <div
                  className={`transition-all duration-700 delay-200 transform ${
                    walimaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#9A7426]">
                    Sunnah &amp; Celebration
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#2C221E] mt-1">
                    Walima Reception of {data.groomName} &amp; {data.brideName}
                  </h3>
                  <p className="font-sans-luxury text-sm sm:text-base text-[#5C4E43] leading-relaxed mt-2">
                    {walima.description}
                  </p>
                </div>

                {/* Staggered Walima Details */}
                <div className="space-y-3 pt-2">
                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/90 border border-[#C5A059]/40 shadow-sm transition-all duration-700 delay-300 transform ${
                      walimaVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-[#9A7426] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#8C6D2E]">
                        Reception Date
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#2C221E]">
                        {walima.date}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/90 border border-[#C5A059]/40 shadow-sm transition-all duration-700 delay-400 transform ${
                      walimaVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <Clock className="w-5 h-5 text-[#9A7426] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#8C6D2E]">
                        Reception Timing
                      </span>
                      <span className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#2C221E]">
                        {walima.time}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/90 border border-[#C5A059]/40 shadow-sm transition-all duration-700 delay-500 transform ${
                      walimaVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-[#9A7426] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-cinzel text-[11px] uppercase tracking-widest text-[#8C6D2E]">
                        Venue &amp; Location
                      </span>
                      <span className="block font-serif-luxury text-lg sm:text-xl font-semibold text-[#2C221E]">
                        {walima.venueName}
                      </span>
                      <span className="block font-sans-luxury text-xs sm:text-sm text-[#6E5D4F]">
                        {walima.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pt-2">
                  <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#9A7426] mb-2">
                    Evening Highlights:
                  </p>
                  <ul className="space-y-1.5">
                    {walima.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A3E35]">
                        <span className="text-[#C5A059]">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${walima.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs tracking-widest uppercase bg-[#2C221E] text-[#FAF8F5] hover:bg-[#9A7426] transition shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Google Maps Location</span>
                  </a>
                  <span className="text-xs font-serif-luxury italic text-[#6E5D4F]">
                    Dress Code: {walima.dressCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
