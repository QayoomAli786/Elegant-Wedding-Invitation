import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Edit3,
  Check,
  RotateCcw,
  Navigation,
  Hand,
  MessageSquareHeart,
  Send,
  Copy,
} from 'lucide-react';
import {
  WeddingInvitationData,
  GuestBlessing,
  initialBlessings,
} from '../data/weddingData';
import { AnimatedWeddingRings, CornerFloralFiligree } from './RoyalSvgArtwork';
import { BrideInitialBadge, CoupleMonogram } from './CoupleMonogram';
import { CoupleNameDisplay } from './CoupleNameDisplay';
import { weddingAudio } from '../utils/weddingAudio';

interface FinalHeartScratchRevealProps {
  data: WeddingInvitationData;
  onUpdateData: (updated: WeddingInvitationData) => void;
  onResetData: () => void;
}

export const FinalHeartScratchReveal: React.FC<FinalHeartScratchRevealProps> = ({
  data,
  onUpdateData,
  onResetData,
}) => {
  // Stage 1: 'closed-cover' -> Stage 2: 'heart-scratch' -> Stage 3: 'details-revealed'
  const [stage, setStage] = useState<'closed-cover' | 'heart-scratch' | 'details-revealed'>('closed-cover');
  const [scratchProgress, setScratchProgress] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Guest Blessings State
  const [blessings, setBlessings] = useState<GuestBlessing[]>(initialBlessings);
  const [guestName, setGuestName] = useState('');
  const [guestRelation, setGuestRelation] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchPointsCountRef = useRef<number>(0);
  const completedRef = useRef<boolean>(false);

  // Live editable map + RSVP helpers (update instantly when placeholders change)
  const liveMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.mapQuery
  )}`;
  const liveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    data.mapQuery
  )}`;
  const liveEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    data.mapQuery
  )}&z=14&output=embed`;
  const rsvpDigits = data.rsvpPhone.replace(/[^\d]/g, '');
  const rsvpMessage = encodeURIComponent(
    `Assalam-o-Alaikum! I would like to confirm my attendance at the wedding of ${data.groomName} & ${data.brideName} at ${data.venueTitle}, Stadium Road, Burewala.`
  );

  // Open the Final Cover Page to show the Large Glowing Heart
  const handleOpenFinalCover = () => {
    weddingAudio.playHeartChime();
    setStage('heart-scratch');
    setScratchProgress(0);
    scratchPointsCountRef.current = 0;
    completedRef.current = false;
  };

  // Complete the Heart Reveal with celebration
  const completeReveal = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setScratchProgress(100);
    weddingAudio.playHeartChime();

    confetti({
      particleCount: 95,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF3B0', '#E11D48', '#F43F5E', '#FFFDF9'],
    });

    setTimeout(() => {
      setStage('details-revealed');
    }, 550);
  }, []);

  // Initialize the Glowing Heart on the HTML5 Canvas when entering 'heart-scratch' stage
  useEffect(() => {
    if (stage !== 'heart-scratch') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 520;
    const height = 460;
    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // Draw Soft Golden Parchment Veil with a Large Glowing Ruby & Gold Heart in Center
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 30, width / 2, height / 2, 270);
    bgGrad.addColorStop(0, 'rgba(255, 244, 246, 0.96)');
    bgGrad.addColorStop(0.65, 'rgba(249, 236, 224, 0.95)');
    bgGrad.addColorStop(1, 'rgba(242, 226, 206, 0.97)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Outer Glowing Aura around the Heart
    ctx.save();
    ctx.translate(width / 2, height / 2 + 10);
    ctx.shadowColor = 'rgba(225, 29, 72, 0.65)';
    ctx.shadowBlur = 40;

    // Heart Path helper
    const drawHeartPath = (scale: number) => {
      ctx.beginPath();
      ctx.moveTo(0, 120 * scale);
      ctx.bezierCurveTo(
        -150 * scale,
        45 * scale,
        -155 * scale,
        -85 * scale,
        -75 * scale,
        -115 * scale
      );
      ctx.bezierCurveTo(-25 * scale, -135 * scale, 0, -90 * scale, 0, -65 * scale);
      ctx.bezierCurveTo(0, -90 * scale, 25 * scale, -135 * scale, 75 * scale, -115 * scale);
      ctx.bezierCurveTo(155 * scale, -85 * scale, 150 * scale, 45 * scale, 0, 120 * scale);
      ctx.closePath();
    };

    // Draw Large Glowing Ruby-Gold Heart
    drawHeartPath(1.18);
    const heartGrad = ctx.createLinearGradient(-150, -140, 150, 140);
    heartGrad.addColorStop(0, '#FB7185');
    heartGrad.addColorStop(0.35, '#E11D48');
    heartGrad.addColorStop(0.7, '#9F1239');
    heartGrad.addColorStop(1, '#881337');
    ctx.fillStyle = heartGrad;
    ctx.fill();

    // Gold Foil Border Around Heart
    ctx.lineWidth = 7;
    const goldStroke = ctx.createLinearGradient(-140, -120, 140, 120);
    goldStroke.addColorStop(0, '#B38728');
    goldStroke.addColorStop(0.5, '#FFF3B0');
    goldStroke.addColorStop(1, '#D4AF37');
    ctx.strokeStyle = goldStroke;
    ctx.stroke();

    // Inner Dashed Filigree Heart
    ctx.shadowBlur = 0;
    drawHeartPath(1.02);
    ctx.setLineDash([7, 5]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFF3B0';
    ctx.stroke();
    ctx.setLineDash([]);

    // Text Inside the Glowing Heart
    ctx.fillStyle = '#FFFDF9';
    ctx.font = '600 15px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SWIPE OR SCRATCH HEART ✦', 0, -22);

    ctx.font = '46px "Great Vibes", cursive';
    ctx.fillStyle = '#FFF3B0';
    ctx.fillText(`${data.groomName} & ${data.brideName}`, 0, 26);

    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFE4E6';
    ctx.fillText('Use your finger or mouse to wipe away the heart', 0, 62);

    ctx.restore();
  }, [stage, data.groomName, data.brideName]);

  // Scratch / Wipe Handler for Mouse and Touch
  const scratchAtPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || completedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    // Erase a soft circular brush on the heart canvas
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const brushRadius = 42;
    const radial = ctx.createRadialGradient(x, y, 5, x, y, brushRadius);
    radial.addColorStop(0, 'rgba(0,0,0,1)');
    radial.addColorStop(0.75, 'rgba(0,0,0,0.85)');
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    scratchPointsCountRef.current += 1;
    if (scratchPointsCountRef.current % 5 === 0) {
      weddingAudio.playSparkleTick();
    }

    // Calculate approximate progress smoothly
    const nextProgress = Math.min(100, Math.round((scratchPointsCountRef.current / 42) * 100));
    setScratchProgress(nextProgress);

    if (nextProgress >= 92) {
      completeReveal();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Support both click-drag and gentle mouse/touch swipe across the heart
    if (isDrawing || e.pointerType === 'mouse' || e.pointerType === 'touch') {
      if (e.pointerType === 'mouse' && !isDrawing && e.buttons === 0) {
        // Even if the desktop user simply wipes their cursor over the heart, erase gently!
        scratchAtPoint(e.clientX, e.clientY);
        return;
      }
      scratchAtPoint(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  // WhatsApp Share Formatter
  const getWhatsAppShareUrl = () => {
    const shareText = `✨ *${data.bismillahArabic}* ✨\n\n💍 *${data.invitationHeadline}*\n*${data.groomName} & ${data.brideName}*\n\n${data.invitationMessage}\n\n📍 *VENUE*\n${data.venueTitle}\n${data.venueAddress}\n🗺️ Google Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapQuery)}\n\n🌼 *${data.events.mehndi.title}*\n📅 ${data.events.mehndi.date} | ⏰ ${data.events.mehndi.time}\n\n👑 *${data.events.baraat.title}*\n📅 ${data.events.baraat.date} | ⏰ ${data.events.baraat.time}\n\n🥂 *${data.events.walima.title}*\n📅 ${data.events.walima.date} | ⏰ ${data.events.walima.time}\n\n🤍 *With Warmest Compliments:*\n${data.rsvpNames} (${data.rsvpPhone})\n${window.location.href}`;
    return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  };

  const handleCopyInvitationText = () => {
    const text = `You're Invited to the Wedding Celebration of ${data.groomName} & ${data.brideName}! Venue: ${data.venueTitle}, ${data.venueAddress}. Mehndi: ${data.events.mehndi.date} | Baraat: ${data.events.baraat.date} | Walima: ${data.events.walima.date}. Map: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapQuery)}`;
    navigator.clipboard?.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2600);
  };

  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    const newBlessing: GuestBlessing = {
      id: Date.now().toString(),
      name: guestName.trim(),
      relation: guestRelation.trim() || 'Honored Guest',
      message: guestMessage.trim(),
      timestamp: 'Just now',
    };
    setBlessings([newBlessing, ...blessings]);
    setGuestName('');
    setGuestRelation('');
    setGuestMessage('');
    weddingAudio.playHeartChime();
  };

  return (
    <section
      id="section-final-reveal"
      className="relative min-h-screen py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 25%, #FFFDF9 0%, #F7EFE2 50%, #EFE2CD 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-20">
        {/* Top Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/50 text-[#9A7426] font-cinzel text-xs tracking-[0.25em] uppercase shadow-sm mb-3">
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
            <span>The Grand Finale • Sacred Invitation Card</span>
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2C221E]">
            {stage === 'details-revealed'
              ? 'Complete Wedding Invitation Details'
              : 'Unveil Your Personal Wedding Card'}
          </h2>
          <p className="font-serif-luxury italic text-lg text-[#6E5D4F] max-w-xl mx-auto mt-2">
            {stage === 'closed-cover' &&
              'Click the royal clasp below to open your keepsake wedding invitation.'}
            {stage === 'heart-scratch' &&
              'Gently wipe or scratch away the glowing heart using your finger or mouse to reveal the sacred invitation details underneath.'}
            {stage === 'details-revealed' &&
              'All ceremony dates, timings, venues, and family blessings — with customizable placeholders.'}
          </p>
        </div>

        {/* =================================================================
            STAGE 1: FINAL CLOSED WEDDING INVITATION COVER
        ================================================================== */}
        {stage === 'closed-cover' && (
          <div
            className="relative max-w-2xl mx-auto rounded-[2rem] p-4 sm:p-7 md:p-9 text-center transition-all duration-700"
            style={{
              background:
                'linear-gradient(160deg, #FFFDF9 0%, #F8F1E3 55%, #EDDFC7 100%)',
              boxShadow:
                '0 40px 90px -25px rgba(139, 105, 20, 0.42), 0 0 0 2px #D4AF37, inset 0 0 0 6px rgba(255, 253, 249, 0.7)',
            }}
          >
            {/* Inner engraved frame — the professional second card */}
            <div className="relative rounded-3xl border border-[#D4AF37]/60 bg-white/45 px-5 py-8 sm:px-10 sm:py-11 md:px-14 md:py-12 shadow-[inset_0_0_30px_rgba(212,175,55,0.08)]">
              <CornerFloralFiligree className="w-20 h-20 md:w-28 md:h-28 absolute top-2 left-2 opacity-80" />
              <CornerFloralFiligree className="w-20 h-20 md:w-28 md:h-28 absolute top-2 right-2 opacity-80" flipX />
              <CornerFloralFiligree className="w-20 h-20 md:w-28 md:h-28 absolute bottom-2 left-2 opacity-80" flipY />
              <CornerFloralFiligree
                className="w-20 h-20 md:w-28 md:h-28 absolute bottom-2 right-2 opacity-80"
                flipX
                flipY
              />

              {/* Official seal label */}
              <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C221E] text-[#FFF3B0] font-cinzel text-[10px] tracking-[0.3em] uppercase shadow-md">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Official Wedding Invitation</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </div>

              {/* Bismillah */}
              <p className="relative font-nastaleeq text-3xl md:text-4xl text-[#9A7426] mt-5">
                {data.bismillahArabic}
              </p>
              <p className="relative font-cinzel text-[10px] tracking-[0.26em] uppercase text-[#8A7968] mt-1">
                {data.bismillahTranslation}
              </p>

              {/* Monogram & rings emblem */}
              <div className="relative my-4 flex items-center justify-center gap-2 sm:gap-4">
                <CoupleMonogram size={72} />
                <AnimatedWeddingRings size={82} />
              </div>

              {/* Couple names — professional title case */}
              <div className="relative">
                <CoupleNameDisplay
                  groomName={data.groomName}
                  brideName={data.brideName}
                  variant="stacked"
                  size="lg"
                  brideEmphasis
                  showOrnament
                />
              </div>

              {/* Date divider */}
              <div className="relative flex items-center justify-center gap-3 my-5">
                <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B38728]" />
                <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#8C6D2E]">
                  {data.weddingYear}
                </span>
                <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B38728]" />
              </div>

              <p className="relative font-serif-luxury italic text-base sm:text-lg text-[#5C4E43] max-w-md mx-auto">
                Enclosed within this royal parchment are the complete dates, timings, venue and
                family invitation details.
              </p>

              {/* Venue chip */}
              <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans-luxury text-[#6E5634] px-3 py-1.5 rounded-full bg-white/85 border border-[#D4AF37]/40">
                  <MapPin className="w-3.5 h-3.5 text-[#9A7426]" />
                  {data.venueTitle} — {data.venueAddress}
                </span>
                <a
                  href={liveDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[#D4AF37]/40 font-cinzel text-[9px] tracking-[0.16em] uppercase text-[#6E5634] transition"
                >
                  <Navigation className="w-3 h-3 text-[#9A7426]" />
                  Directions
                </a>
              </div>

              {/* Animated Button: "Open Your Invitation" */}
              <div className="relative inline-block group mt-7">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#B38728] opacity-65 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
                <button
                  type="button"
                  onClick={handleOpenFinalCover}
                  className="relative flex items-center justify-center gap-3 px-9 py-4 rounded-full font-cinzel font-semibold text-sm md:text-base tracking-[0.22em] uppercase text-[#2C221E] shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse-glow"
                  style={{
                    background:
                      'linear-gradient(135deg, #C59B27 0%, #FFF3B0 38%, #D4AF37 68%, #9A7426 100%)',
                    border: '2px solid #FFF9DB',
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#5C4008]" />
                  <span>Open Your Invitation</span>
                  <Sparkles className="w-4 h-4 text-[#5C4008]" />
                </button>
              </div>


              <p className="relative mt-4 font-sans-luxury text-[11px] text-[#8A7968]">
                R.S.V.P: {data.rsvpPhone} · {data.weddingHashtag}
              </p>
            </div>
          </div>
        )}

        {/* =================================================================
            STAGE 2: INTERACTIVE GLOWING HEART SCRATCH-TO-REVEAL
        ================================================================== */}
        {stage === 'heart-scratch' && (
          <div
            className="relative max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 text-center overflow-hidden"
            style={{
              background: '#FFFDF9',
              boxShadow:
                '0 30px 70px -15px rgba(190, 18, 60, 0.25), 0 0 0 2px #D4AF37',
            }}
          >
            {/* Top Instruction Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
              <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-widest uppercase text-[#9F1239]">
                <Hand className="w-4 h-4 animate-bounce" />
                <span>Swipe / Scratch the Heart to Reveal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-cinzel font-semibold text-[#9A7426]">
                  Revealed: {scratchProgress}%
                </span>
                <button
                  type="button"
                  onClick={completeReveal}
                  className="px-3.5 py-1 rounded-full text-[11px] font-cinzel tracking-wider uppercase bg-[#F5EFE6] hover:bg-[#D4AF37] text-[#2C221E] border border-[#D4AF37]/50 transition cursor-pointer"
                >
                  Instant Reveal ✨
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#F5EFE6] overflow-hidden mb-5">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E11D48] to-[#F43F5E] transition-all duration-200"
                style={{ width: `${scratchProgress}%` }}
              />
            </div>

            {/* Interactive Scratch Container */}
            <div className="relative w-full max-w-[520px] mx-auto aspect-[520/460] rounded-2xl overflow-hidden border border-[#D4AF37]/40 select-none">
              {/* Underneath Layer: Preview of Sacred Invitation Details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FFFDF9] to-[#F9F2E4] text-center">
                <p className="font-nastaleeq text-3xl text-[#9A7426]">{data.bismillahArabic}</p>
                <p className="font-cinzel text-xs uppercase tracking-[0.22em] text-[#7A6A5E] mt-1">
                  {data.invitationHeadline}
                </p>
                <div className="my-2">
                  <CoupleNameDisplay
                    groomName={data.groomName}
                    brideName={data.brideName}
                    variant="inline"
                    size="sm"
                    brideEmphasis
                  />
                </div>
                <p className="font-serif-luxury text-sm text-[#5C4E43] max-w-sm">
                  {data.invitationMessage}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 w-full text-[11px] font-cinzel">
                  <div className="p-2 rounded-lg bg-[#FFFBEB] border border-[#F4C430]/50">
                    <strong className="block text-[#92400E]">Mehndi</strong>
                    <span>{data.events.mehndi.date}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FFF1F2] border border-[#E11D48]/30">
                    <strong className="block text-[#881337]">Baraat</strong>
                    <span>{data.events.baraat.date}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#C5A059]/50">
                    <strong className="block text-[#574B3D]">Walima</strong>
                    <span>{data.events.walima.date}</span>
                  </div>
                </div>
                <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-sans-luxury text-[#6E5634]">
                  <MapPin className="w-3 h-3 text-[#9A7426]" />
                  Stadium Road, Burewala, Punjab
                </p>
              </div>

              {/* Top Interactive Scratchable Glowing Heart Canvas */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
              />
            </div>

            <p className="mt-4 text-xs text-[#7A6A5E] font-sans-luxury">
              Tip: Rub your finger (mobile) or move/drag your mouse (desktop) across the glowing heart above!
            </p>
          </div>
        )}

        {/* =================================================================
            STAGE 3: COMPLETE WEDDING DETAILS REVEAL (WITH EDITABLE PLACEHOLDERS)
        ================================================================== */}
        {stage === 'details-revealed' && (
          <div className="space-y-12 transition-all duration-1000">
            {/* Master Royal Invitation Card */}
            <div
              className="relative rounded-3xl p-6 sm:p-12 md:p-16 text-center overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 50% 20%, #FFFDF9 0%, #FAF3E6 55%, #F2E5CE 100%)',
                boxShadow:
                  '0 35px 90px -20px rgba(139, 105, 20, 0.35), 0 0 0 2px #D4AF37, inset 0 0 0 8px rgba(255, 253, 249, 0.9), inset 0 0 0 9px rgba(212, 175, 55, 0.4)',
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

              {/* Top Controls Bar: Edit Placeholders / Replay Heart Scratch */}
              <div className="relative z-20 flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-8 pb-4 border-b border-[#D4AF37]/30">
                <button
                  type="button"
                  onClick={handleOpenFinalCover}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel tracking-widest uppercase text-[#6E5634] bg-white/80 hover:bg-white border border-[#D4AF37]/40 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Heart Wipe</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-cinzel tracking-widest uppercase transition cursor-pointer ${
                      isEditing
                        ? 'bg-[#10B981] text-white shadow-md'
                        : 'bg-[#2C221E] text-[#FFF3B0] hover:bg-[#9A7426]'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Done Customizing</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Customize Dates &amp; Venues</span>
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={onResetData}
                      className="px-3 py-2 rounded-full text-xs font-cinzel uppercase tracking-wider bg-white border border-[#D4AF37]/40 text-[#7A6A5E] hover:text-[#2C221E] cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                  )}
                </div>
              </div>

              {/* Bismillah & Rings */}
              <p className="font-nastaleeq text-3xl md:text-4xl text-[#9A7426] mb-1">
                {data.bismillahArabic}
              </p>
              <p className="font-cinzel text-xs tracking-[0.22em] uppercase text-[#7A6A5E] mb-4">
                {data.bismillahTranslation}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 my-2">
                <CoupleMonogram size={84} />
                <AnimatedWeddingRings size={96} />
              </div>

              {/* Wedding Invitation Message */}
              <div className="max-w-2xl mx-auto my-4">
                <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#9A7426] block mb-2">
                  ✦ Wedding Invitation Message ✦
                </span>
                {isEditing ? (
                  <textarea
                    value={data.invitationMessage}
                    onChange={(e) =>
                      onUpdateData({ ...data, invitationMessage: e.target.value })
                    }
                    rows={3}
                    className="w-full p-3 rounded-xl bg-white border border-[#D4AF37] text-sm text-center font-serif-luxury text-[#2C221E]"
                  />
                ) : (
                  <p className="font-serif-luxury text-lg sm:text-xl text-[#4A3E35] leading-relaxed">
                    {data.invitationMessage}
                  </p>
                )}
              </div>

              {/* Groom & Bride Names */}
              <div className="my-8 py-6 px-4 rounded-2xl bg-white/75 border border-[#D4AF37]/40 max-w-3xl mx-auto shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4">
                  {/* Groom */}
                  <div className="md:col-span-5">
                    <span className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#9A7426]">
                      The Groom
                    </span>
                    {isEditing ? (
                      <div className="space-y-2 mt-1">
                        <input
                          type="text"
                          value={data.groomName}
                          onChange={(e) =>
                            onUpdateData({ ...data, groomName: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D4AF37] text-center font-serif-luxury text-xl"
                        />
                        <input
                          type="text"
                          value={data.groomParents}
                          onChange={(e) =>
                            onUpdateData({ ...data, groomParents: e.target.value })
                          }
                          className="w-full px-3 py-1 rounded-lg border border-[#D4AF37]/60 text-center text-xs"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-script-luxury text-6xl sm:text-7xl gold-foil-text py-1">
                          {data.groomName}
                        </h3>
                        <p className="font-serif-luxury font-semibold text-base text-[#2C221E]">
                          {data.groomFullTitle}
                        </p>
                        <p className="font-sans-luxury text-xs text-[#6E5D4F] mt-0.5">
                          {data.groomParents}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Center Emblem */}
                  <div className="md:col-span-1 flex flex-col items-center justify-center">
                    <span className="font-script-luxury text-4xl text-[#B38728]">&amp;</span>
                  </div>

                  {/* Bride */}
                  <div className="md:col-span-5">
                    <span className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#9A7426]">
                      The Bride
                    </span>
                    {isEditing ? (
                      <div className="space-y-2 mt-1">
                        <input
                          type="text"
                          value={data.brideName}
                          onChange={(e) =>
                            onUpdateData({ ...data, brideName: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D4AF37] text-center font-serif-luxury text-xl"
                        />
                        <input
                          type="text"
                          value={data.brideParents}
                          onChange={(e) =>
                            onUpdateData({ ...data, brideParents: e.target.value })
                          }
                          className="w-full px-3 py-1 rounded-lg border border-[#D4AF37]/60 text-center text-xs"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1">
                          <BrideInitialBadge
                            size={86}
                            className="shrink-0 drop-shadow-[0_6px_16px_rgba(139,105,20,0.28)]"
                            letter={(data.brideName.trim().charAt(0) || 'M').toUpperCase()}
                          />
                          <h3 className="font-serif-luxury font-semibold gold-foil-text leading-none">
                            <span className="text-6xl sm:text-7xl md:text-[4.2rem]">
                              {data.brideName.trim().charAt(0).toUpperCase()}
                            </span>
                            <span className="text-4xl sm:text-5xl md:text-[3rem] tracking-[0.06em]">
                              {data.brideName.trim().slice(1).toLowerCase()}
                            </span>
                          </h3>
                        </div>
                        <p className="font-serif-luxury font-semibold text-base text-[#2C221E] mt-1">
                          {data.brideFullTitle}
                        </p>
                        <p className="font-sans-luxury text-xs text-[#6E5D4F] mt-0.5">
                          {data.brideParents}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Three Ceremonies Schedule Grid: Mehndi, Baraat, Walima */}
              <div className="mt-10">
                <h4 className="font-cinzel text-sm tracking-[0.28em] uppercase text-[#8C6D2E] mb-6">
                  ✦ Schedule of Royal Wedding Ceremonies ✦
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  {(
                    [
                      {
                        key: 'mehndi' as const,
                        badgeBg: 'bg-[#0A2F1D] text-[#FDE047]',
                        cardBorder: 'border-[#F4C430]',
                        accentText: 'text-[#0A2F1D]',
                      },
                      {
                        key: 'baraat' as const,
                        badgeBg: 'bg-[#4C0817] text-[#FFD700]',
                        cardBorder: 'border-[#9F1239]',
                        accentText: 'text-[#691022]',
                      },
                      {
                        key: 'walima' as const,
                        badgeBg: 'bg-[#2C221E] text-[#FAF8F5]',
                        cardBorder: 'border-[#C5A059]',
                        accentText: 'text-[#7A6236]',
                      },
                    ]
                  ).map(({ key, badgeBg, cardBorder, accentText }) => {
                    const ev = data.events[key];
                    return (
                      <div
                        key={key}
                        className={`rounded-2xl p-6 bg-white/95 border-2 ${cardBorder} shadow-md flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full font-cinzel text-[11px] tracking-widest uppercase ${badgeBg}`}
                            >
                              {ev.title}
                            </span>
                            <span className="font-nastaleeq text-xl text-[#9A7426]">
                              {ev.urduSubtitle}
                            </span>
                          </div>

                          <h5 className={`font-serif-luxury text-2xl font-bold ${accentText} mb-4`}>
                            {ev.title}
                          </h5>

                          {isEditing ? (
                            <div className="space-y-2.5 text-xs">
                              <div>
                                <label className="block font-cinzel text-[10px] uppercase text-[#7A6A5E]">
                                  Wedding Date
                                </label>
                                <input
                                  type="text"
                                  value={ev.date}
                                  onChange={(e) =>
                                    onUpdateData({
                                      ...data,
                                      events: {
                                        ...data.events,
                                        [key]: { ...ev, date: e.target.value },
                                      },
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded border border-[#D4AF37]"
                                />
                              </div>
                              <div>
                                <label className="block font-cinzel text-[10px] uppercase text-[#7A6A5E]">
                                  Event Timing
                                </label>
                                <input
                                  type="text"
                                  value={ev.time}
                                  onChange={(e) =>
                                    onUpdateData({
                                      ...data,
                                      events: {
                                        ...data.events,
                                        [key]: { ...ev, time: e.target.value },
                                      },
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded border border-[#D4AF37]"
                                />
                              </div>
                              <div>
                                <label className="block font-cinzel text-[10px] uppercase text-[#7A6A5E]">
                                  Venue Name
                                </label>
                                <input
                                  type="text"
                                  value={ev.venueName}
                                  onChange={(e) =>
                                    onUpdateData({
                                      ...data,
                                      events: {
                                        ...data.events,
                                        [key]: { ...ev, venueName: e.target.value },
                                      },
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded border border-[#D4AF37]"
                                />
                              </div>
                              <div>
                                <label className="block font-cinzel text-[10px] uppercase text-[#7A6A5E]">
                                  Venue Location / Address
                                </label>
                                <input
                                  type="text"
                                  value={ev.venueAddress}
                                  onChange={(e) =>
                                    onUpdateData({
                                      ...data,
                                      events: {
                                        ...data.events,
                                        [key]: { ...ev, venueAddress: e.target.value },
                                      },
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded border border-[#D4AF37]"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3 text-sm text-[#2C221E]">
                              <div className="flex items-start gap-2.5">
                                <Calendar className="w-4 h-4 text-[#B38728] shrink-0 mt-1" />
                                <div>
                                  <span className="block font-cinzel text-[10px] uppercase tracking-wider text-[#8A7968]">
                                    Wedding Date
                                  </span>
                                  <strong className="font-serif-luxury text-base">
                                    {ev.date}
                                  </strong>
                                </div>
                              </div>

                              <div className="flex items-start gap-2.5">
                                <Clock className="w-4 h-4 text-[#B38728] shrink-0 mt-1" />
                                <div>
                                  <span className="block font-cinzel text-[10px] uppercase tracking-wider text-[#8A7968]">
                                    Event Timing
                                  </span>
                                  <strong className="font-serif-luxury text-base">
                                    {ev.time}
                                  </strong>
                                </div>
                              </div>

                              <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#B38728] shrink-0 mt-1" />
                                <div>
                                  <span className="block font-cinzel text-[10px] uppercase tracking-wider text-[#8A7968]">
                                    Venue &amp; Location
                                  </span>
                                  <strong className="block font-serif-luxury text-base">
                                    {ev.venueName}
                                  </strong>
                                  <span className="text-xs text-[#6E5D4F]">
                                    {ev.venueAddress}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#D4AF37]/25">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                              ev.mapQuery || data.mapQuery
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-cinzel text-[11px] tracking-widest uppercase bg-[#F5EFE6] hover:bg-[#D4AF37] text-[#2C221E] transition"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#9A7426]" />
                            <span>Directions — Stadium Road</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shared Venue & Google Maps — Burewala, Stadium Road */}
              <div className="mt-8 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/55 bg-white text-left grid grid-cols-1 md:grid-cols-5 shadow-sm">
                <div className="md:col-span-3 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] text-[#8C6D2E] font-cinzel text-[10px] tracking-[0.2em] uppercase">
                      <MapPin className="w-3 h-3" />
                      Shared Venue — All Three Ceremonies
                    </span>
                    <h5 className="font-serif-luxury text-2xl font-bold text-[#2C221E] mt-2">
                      {data.venueTitle}
                    </h5>
                    <p className="font-nastaleeq text-xl text-[#9A7426]">{data.venueUrdu}</p>
                    <p className="font-sans-luxury text-sm text-[#4A3E35] mt-1">
                      {data.venueAddress}
                    </p>
                    <p className="font-sans-luxury text-xs text-[#6E5D4F] mt-1">
                      {data.venueLandmark}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <a
                      href={liveDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full gold-metallic-bg text-[#2C221E] font-cinzel text-[10px] font-semibold tracking-[0.16em] uppercase shadow-sm hover:brightness-105 transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Get Directions
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        data.mapQuery
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2C221E] text-[#FFF3B0] font-cinzel text-[10px] tracking-[0.16em] uppercase hover:bg-[#9A7426] transition"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
                <div className="md:col-span-2 relative min-h-[220px] bg-[#F5EFE6]">
                  <iframe
                    title="Stadium Road Burewala wedding venue map"
                    src={liveEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Family Invitation Message & RSVP */}
              <div className="mt-10 pt-8 border-t border-[#D4AF37]/35 max-w-2xl mx-auto">
                <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#9A7426] block mb-2">
                  ✦ Family Invitation Message ✦
                </span>
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={data.familyInvitationMessage}
                      onChange={(e) =>
                        onUpdateData({ ...data, familyInvitationMessage: e.target.value })
                      }
                      rows={2}
                      className="w-full p-3 rounded-xl bg-white border border-[#D4AF37] text-sm text-center font-serif-luxury"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={data.rsvpNames}
                        onChange={(e) =>
                          onUpdateData({ ...data, rsvpNames: e.target.value })
                        }
                        placeholder="Host Families"
                        className="px-3 py-2 rounded-lg bg-white border border-[#D4AF37] text-xs text-center"
                      />
                      <input
                        type="text"
                        value={data.rsvpPhone}
                        onChange={(e) =>
                          onUpdateData({ ...data, rsvpPhone: e.target.value })
                        }
                        placeholder="RSVP Phone"
                        className="px-3 py-2 rounded-lg bg-white border border-[#D4AF37] text-xs text-center"
                      />
                    </div>

                    {/* Shared venue & Google Maps placeholder editor */}
                    <div className="rounded-xl border border-[#D4AF37]/50 bg-[#FDFBF7] p-3 space-y-2">
                      <p className="font-cinzel text-[10px] uppercase tracking-[0.18em] text-[#8C6D2E] text-center">
                        Shared Venue &amp; Google Maps Location
                      </p>
                      <input
                        type="text"
                        value={data.venueTitle}
                        onChange={(e) =>
                          onUpdateData({ ...data, venueTitle: e.target.value })
                        }
                        placeholder="Venue name"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4AF37] text-xs text-center"
                      />
                      <input
                        type="text"
                        value={data.venueAddress}
                        onChange={(e) =>
                          onUpdateData({ ...data, venueAddress: e.target.value })
                        }
                        placeholder="Full address"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4AF37] text-xs text-center"
                      />
                      <input
                        type="text"
                        value={data.mapQuery}
                        onChange={(e) =>
                          onUpdateData({ ...data, mapQuery: e.target.value })
                        }
                        placeholder="Google Maps search query"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4AF37] text-xs text-center"
                      />
                      <p className="text-[10px] text-center text-[#8A7968] font-sans-luxury">
                        The embedded Google Map and directions update instantly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-serif-luxury italic text-lg sm:text-xl text-[#4A3E35] leading-relaxed">
                      &ldquo;{data.familyInvitationMessage}&rdquo;
                    </p>
                    <div className="mt-4">
                      <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#8C6D2E]">
                        With Best Compliments &amp; Duas From:
                      </p>
                      <p className="font-serif-luxury text-2xl font-semibold text-[#2C221E] mt-1">
                        {data.rsvpNames}
                      </p>
                      <p className="font-sans-luxury text-xs text-[#6E5D4F] mt-0.5">
                        R.S.V.P: {data.rsvpPhone} • {data.weddingHashtag}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        <a
                          href={`https://wa.me/${rsvpDigits}?text=${rsvpMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-cinzel text-[10px] tracking-[0.16em] uppercase transition shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          RSVP on WhatsApp
                        </a>
                        <a
                          href={`tel:${rsvpDigits}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5EFE6] hover:bg-[#EADBC3] border border-[#D4AF37]/45 text-[#6E5634] font-cinzel text-[10px] tracking-[0.16em] uppercase transition"
                        >
                          Call Family
                        </a>
                        <a
                          href={liveMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F5EFE6] border border-[#D4AF37]/45 text-[#6E5634] font-cinzel text-[10px] tracking-[0.16em] uppercase transition"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          Venue Map
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Share via WhatsApp & Copy Invitation Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-cinzel text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-[#128C7E] hover:bg-[#075E54] shadow-lg transition transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Invitation on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyInvitationText}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-cinzel text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#2C221E] bg-white hover:bg-[#F5EFE6] border border-[#D4AF37] shadow-sm transition cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-[#9A7426]" />
                  <span>{copiedToast ? 'Invitation Copied!' : 'Copy Details Summary'}</span>
                </button>

              </div>
            </div>

            {/* Interactive Guest Blessings & Duas Wall */}
            <div className="rounded-3xl p-6 sm:p-10 bg-white/90 border border-[#D4AF37]/40 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F5EFE6] text-[#9A7426] font-cinzel text-xs tracking-widest uppercase mb-2">
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  <span>Send Duas &amp; Warm Wishes</span>
                </div>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#2C221E]">
                  Blessings for {data.groomName} &amp; {data.brideName}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Leave a Blessing Form */}
                <form onSubmit={handleAddBlessing} className="lg:col-span-5 space-y-4">
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#6E5D4F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g., Aunt Nadia & Family"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 text-sm focus:outline-none focus:border-[#9A7426]"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#6E5D4F] mb-1">
                      Relation / City
                    </label>
                    <input
                      type="text"
                      value={guestRelation}
                      onChange={(e) => setGuestRelation(e.target.value)}
                      placeholder="e.g., Family Friends • Islamabad"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 text-sm focus:outline-none focus:border-[#9A7426]"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#6E5D4F] mb-1">
                      Heartfelt Dua or Blessing *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      placeholder={`Write your prayer or congratulations for ${data.groomName} & ${data.brideName}...`}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 text-sm focus:outline-none focus:border-[#9A7426]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-cinzel text-xs font-semibold tracking-[0.2em] uppercase text-[#2C221E] gold-metallic-bg shadow-md hover:brightness-105 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Wedding Blessing</span>
                  </button>
                </form>

                {/* Blessings Feed */}
                <div className="lg:col-span-7 space-y-3 max-h-80 overflow-y-auto pr-1">
                  {blessings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/30 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div>
                          <strong className="font-serif-luxury text-lg text-[#2C221E]">
                            {b.name}
                          </strong>
                          <span className="ml-2 text-xs text-[#9A7426] font-cinzel">
                            • {b.relation}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8A7968]">{b.timestamp}</span>
                      </div>
                      <p className="font-serif-luxury italic text-base text-[#4A3E35]">
                        &ldquo;{b.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
