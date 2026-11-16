import { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Share2,
  BookOpen,
  ChevronDown,
  MapPin,
  Navigation,
} from 'lucide-react';
import { defaultWeddingData, WeddingInvitationData } from './data/weddingData';
import { weddingAudio } from './utils/weddingAudio';
import { FloatingPetalsCanvas } from './components/FloatingPetalsCanvas';
import { OpeningCoverGatefold } from './components/OpeningCoverGatefold';
import { InteractiveHeartUnion } from './components/InteractiveHeartUnion';
import { WeddingEventsSection } from './components/WeddingEventsSection';
import { FinalHeartScratchReveal } from './components/FinalHeartScratchReveal';
import { AnimatedWeddingRings, CornerFloralFiligree } from './components/RoyalSvgArtwork';
import { CoupleMonogram } from './components/CoupleMonogram';
import { WeddingCountdown } from './components/WeddingCountdown';
import { VenueMapSection } from './components/VenueMapSection';
import { CeremonyPreviewCards } from './components/CeremonyPreviewCards';
import { CoupleNameDisplay } from './components/CoupleNameDisplay';

export function App() {
  // Initial Luxury Loading Screen
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Whether the Opening 3D Cover Page has been opened
  const [isCoverOpened, setIsCoverOpened] = useState<boolean>(false);
  const [coverKey, setCoverKey] = useState<number>(0);

  // Editable Wedding Data (persisted in state)
  const [weddingData, setWeddingData] = useState<WeddingInvitationData>(defaultWeddingData);

  // Active Theme for Floating Petals & Sparkles
  const [activeTheme, setActiveTheme] = useState<
    'cover' | 'union' | 'mehndi' | 'baraat' | 'walima' | 'reveal'
  >('cover');

  // Scroll Progress (0 to 100)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Audio State
  const [audioState, setAudioState] = useState<{ isPlaying: boolean; isMuted: boolean }>({
    isPlaying: false,
    isMuted: false,
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((isPlaying, isMuted) => {
      setAudioState({ isPlaying, isMuted });
    });
    return unsub;
  }, []);

  // Lock page scrolling while the loading screen or the 3D cover is open
  useEffect(() => {
    const shouldLockScroll = isLoading || !isCoverOpened;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading, isCoverOpened]);

  // Track Scroll Progress & Active Section Theme
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      if (pct < 18) {
        setActiveTheme('cover');
      } else if (pct < 34) {
        setActiveTheme('union');
      } else if (pct > 82) {
        setActiveTheme('reveal');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReplayCover = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsCoverOpened(false);
    setCoverKey((prev) => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickWhatsAppUrl = () => {
    const msg = `✨ You're Invited to the Wedding Celebration of ${weddingData.groomName} & ${weddingData.brideName}! ✨\n\n📍 Venue: ${weddingData.venueTitle}\n${weddingData.venueAddress}\n🗺️ Map: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(weddingData.mapQuery)}\n\n🌼 Mehndi: ${weddingData.events.mehndi.date} at ${weddingData.events.mehndi.venueName}\n👑 Baraat: ${weddingData.events.baraat.date} at ${weddingData.events.baraat.venueName}\n🥂 Walima: ${weddingData.events.walima.date} at ${weddingData.events.walima.venueName}\n\nWith Warmest Compliments: ${weddingData.rsvpNames}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  // 1. Luxury Loading Screen
  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, #FFFDF9 0%, #F5EFE6 60%, #E8DCC8 100%)',
        }}
      >
        <div className="relative flex flex-col items-center">
          <AnimatedWeddingRings size={110} />
          <p className="font-nastaleeq text-3xl text-[#9A7426] mt-3">
            {weddingData.bismillahArabic}
          </p>
          <h1 className="font-script-luxury text-6xl sm:text-7xl gold-foil-text py-2">
            {weddingData.groomName} &amp; {weddingData.brideName}
          </h1>
          <div className="w-48 h-1 rounded-full bg-[#E6D7C3] overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#9A7426] animate-pulse w-full" />
          </div>
          <p className="font-cinzel text-[11px] tracking-[0.28em] uppercase text-[#8A7968] mt-3">
            Preparing Royal Wedding Invitation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen paper-texture selection:bg-[#D4AF37]/30">
      {/* Global Floating Petals & Golden Glitter Canvas */}
      <FloatingPetalsCanvas activeTheme={activeTheme} />

      {/* 1. Opening Full-Screen 3D Cover Page */}
      {!isCoverOpened && (
        <OpeningCoverGatefold
          key={coverKey}
          data={weddingData}
          isOpen={isCoverOpened}
          onOpenComplete={() => setIsCoverOpened(true)}
        />
      )}

      {/* Top Scroll Progress Bar & Floating Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Golden Scroll Progress Bar */}
        <div className="h-1.5 w-full bg-[#2C221E]/15 backdrop-blur-xs">
          <div
            className="h-full transition-all duration-150"
            style={{
              width: `${scrollProgress}%`,
              background:
                'linear-gradient(90deg, #9A7426 0%, #D4AF37 45%, #FFF3B0 75%, #E11D48 100%)',
            }}
          />
        </div>

        {/* Floating Luxury Glass Navigation Bar */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Couple Monogram & Replay 3D Cover Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplayCover}
              title="Replay 3D Envelope Opening"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#D4AF37]/50 shadow-md text-xs font-cinzel tracking-wider uppercase text-[#2C221E] transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9A7426]" />
              <span className="hidden sm:inline">Replay Cover</span>
            </button>

            <span className="hidden md:inline-flex items-center gap-1.5 pr-3.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D4AF37]/35 shadow-sm overflow-hidden">
              <CoupleMonogram size={30} className="ml-1 my-0.5" />
              <span className="font-serif-luxury text-lg font-semibold tracking-[0.03em] text-[#7A6236] leading-none">
                {weddingData.groomName} &amp; {weddingData.brideName}
              </span>
            </span>
          </div>

          {/* Story Chapter Quick-Scroll Pills */}
          <nav
            aria-label="Wedding Story Chapters"
            className="order-3 w-full lg:order-none lg:w-auto flex items-center gap-1.5 px-3 py-1.5 lg:py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/45 shadow-md overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {[
              { label: 'Blessing', id: 'section-blessing' },
              { label: 'Heart Union', id: 'section-union' },
              { label: 'Mehndi', id: 'section-mehndi' },
              { label: 'Baraat', id: 'section-baraat' },
              { label: 'Walima', id: 'section-walima' },
              { label: 'Venue & Map', id: 'section-venue' },
              { label: 'Heart Reveal', id: 'section-final-reveal' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="shrink-0 px-3 py-1 rounded-full font-cinzel text-[10px] lg:text-[11px] tracking-widest uppercase text-[#5C4E43] hover:text-[#2C221E] hover:bg-[#F5EFE6] transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Scroll Percentage & Background Music Mute/Unmute */}
          <div className="flex items-center gap-2">
            <span className="hidden xs:inline px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 font-cinzel text-[11px] font-semibold text-[#8C6D2E] shadow-sm sm:inline">
              {Math.round(scrollProgress)}%
            </span>


            <button
              type="button"
              onClick={() => weddingAudio.toggleMute()}
              aria-label={
                audioState.isPlaying && !audioState.isMuted
                  ? 'Mute background wedding music'
                  : 'Play background wedding music'
              }
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C221E]/95 hover:bg-[#9A7426] text-[#FFF3B0] border border-[#D4AF37]/60 shadow-md text-xs font-cinzel tracking-wider uppercase transition cursor-pointer"
            >
              {audioState.isPlaying && !audioState.isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
                  <span className="hidden sm:inline">Music On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Play Music</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom-Right WhatsApp Share Action */}
      <a
        href={quickWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        title="Share Wedding Invitation on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-cinzel text-xs tracking-wider uppercase shadow-2xl border border-white/30 transition transform hover:scale-105"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share on WhatsApp</span>
      </a>

      {/* =====================================================================
          HERO BLESSING & STORY OPENING SECTION (Revealed after 3D Cover Opens)
      ====================================================================== */}
      <main>
        <section
          id="section-blessing"
          className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, #FFFDF9 0%, #F7F0E4 55%, #EFE4D2 100%)',
          }}
        >
          <div
            className="relative max-w-4xl w-full mx-auto rounded-3xl p-8 sm:p-14 md:p-16 text-center"
            style={{
              background:
                'radial-gradient(circle at 50% 25%, rgba(255, 253, 249, 0.96) 0%, rgba(248, 241, 229, 0.94) 100%)',
              boxShadow:
                '0 30px 80px -20px rgba(139, 105, 20, 0.25), 0 0 0 1.5px rgba(212, 175, 55, 0.55), inset 0 0 0 8px rgba(255, 253, 249, 0.9)',
            }}
          >
            <CornerFloralFiligree className="w-28 h-28 md:w-40 md:h-40 absolute top-3 left-3" />
            <CornerFloralFiligree className="w-28 h-28 md:w-40 md:h-40 absolute top-3 right-3" flipX />
            <CornerFloralFiligree className="w-28 h-28 md:w-40 md:h-40 absolute bottom-3 left-3" flipY />
            <CornerFloralFiligree
              className="w-28 h-28 md:w-40 md:h-40 absolute bottom-3 right-3"
              flipX
              flipY
            />

            {/* Bismillah Calligraphy */}
            <p className="font-nastaleeq text-4xl sm:text-5xl text-[#9A7426] mb-1">
              {weddingData.bismillahArabic}
            </p>
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8A7968] mb-5">
              {weddingData.bismillahTranslation}
            </p>

            {/* Engraved Q & A Monogram + Animated Intertwined Wedding Rings */}
            <div className="my-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
              <CoupleMonogram size={80} />
              <AnimatedWeddingRings size={96} />
            </div>

            {/* Headline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/40 my-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
              <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#6E5634]">
                {weddingData.invitationHeadline}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
            </div>

            {/* Line-by-line Family Host Intro */}
            <p className="font-serif-luxury italic text-lg sm:text-xl text-[#5C4E43] max-w-2xl mx-auto mt-2">
              {weddingData.invitationMessage}
            </p>

            {/* Couple Grand Display — professional engraved names */}
            <div className="my-6">
              <h1>
                <CoupleNameDisplay
                  groomName={weddingData.groomName}
                  brideName={weddingData.brideName}
                  variant="stacked"
                  size="xl"
                  brideEmphasis
                  showOrnament
                />
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-3 text-xs sm:text-sm font-cinzel tracking-widest uppercase text-[#7A6A5E]">
                <span>{weddingData.groomParents}</span>
                <span className="text-[#D4AF37]">❖</span>
                <span>{weddingData.brideParents}</span>
              </div>

              {/* Venue quick access — Stadium Road, Burewala */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('section-venue')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-[#D4AF37]/50 shadow-sm text-xs font-sans-luxury text-[#4A3E35] transition cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#9A7426]" />
                  <span>
                    <strong className="font-semibold text-[#2C221E]">Venue:</strong>{' '}
                    {weddingData.venueAddress}
                  </span>
                </button>
                <a
                  href={weddingData.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2C221E] hover:bg-[#9A7426] text-[#FFF3B0] font-cinzel text-[10px] tracking-[0.16em] uppercase transition shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Live Countdown to the Mehndi Evening */}
            <WeddingCountdown data={weddingData} />

            {/* Professional Ceremony Preview Cards */}
            <CeremonyPreviewCards data={weddingData} onNavigate={scrollToSection} />

            {/* Scroll Cue */}
            <button
              type="button"
              onClick={() => scrollToSection('section-union')}
              className="inline-flex flex-col items-center gap-1 text-xs font-cinzel tracking-[0.25em] uppercase text-[#9A7426] hover:text-[#2C221E] transition cursor-pointer mt-2"
            >
              <span>Scroll to Experience Our Animated Story</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: INTERACTIVE HEART ANIMATION (Click Heart -> Couple & Line)
        ==================================================================== */}
        <InteractiveHeartUnion data={weddingData} />

        {/* ===================================================================
            SECTION 2 & 4: THREE WEDDING EVENT ANIMATIONS (MEHNDI, BARAAT, WALIMA)
        ==================================================================== */}
        <WeddingEventsSection
          data={weddingData}
          onChapterVisible={(chapter) => setActiveTheme(chapter)}
        />

        {/* ===================================================================
            VENUE & GOOGLE MAPS — STADIUM ROAD, BUREWALA
        ==================================================================== */}
        <VenueMapSection data={weddingData} />

        {/* ===================================================================
            SECTION 5 & 6: FINAL INTERACTIVE COVER PAGE – HEART SCRATCH REVEAL
            & COMPLETE EDITABLE WEDDING DETAILS
        ==================================================================== */}
        <FinalHeartScratchReveal
          data={weddingData}
          onUpdateData={setWeddingData}
          onResetData={() => setWeddingData(defaultWeddingData)}
        />
      </main>

      {/* Luxury Footer */}
      <footer className="py-12 px-4 text-center bg-[#2C221E] text-[#F5EFE6] border-t border-[#D4AF37]/40">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center">
            <CoupleMonogram size={88} tone="ivory" />
          </div>
          <p className="font-script-luxury text-4xl sm:text-5xl gold-foil-light">
            {weddingData.groomName} &amp; {weddingData.brideName}
          </p>
          <p className="font-cinzel text-xs tracking-[0.28em] uppercase text-[#D4AF37]">
            {weddingData.weddingHashtag} • {weddingData.weddingYear}
          </p>
          <p className="font-serif-luxury italic text-sm text-[#E6D7C3]/80">
            {weddingData.venueTitle} · {weddingData.venueAddress}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => scrollToSection('section-venue')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4AF37]/50 text-[#FFF3B0] hover:bg-[#D4AF37]/15 font-cinzel text-[10px] tracking-[0.18em] uppercase transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              View Venue Map
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-final-reveal')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF37] hover:bg-[#FFF3B0] text-[#2C221E] font-cinzel text-[10px] tracking-[0.18em] uppercase transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Full Invitation Card
            </button>
          </div>
          <p className="font-serif-luxury italic text-sm text-[#E6D7C3]/80 pt-1">
            Crafted with love, prayers, and royal elegance for the wedding celebration of{' '}
            {weddingData.groomName} &amp; {weddingData.brideName}.
          </p>
          <Heart className="w-4 h-4 text-[#E11D48] fill-[#E11D48] animate-heartbeat mx-auto" />
        </div>
      </footer>
    </div>
  );
}

export default App;
