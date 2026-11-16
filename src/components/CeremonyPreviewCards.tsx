import React from 'react';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Crown,
  Flower2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { WeddingInvitationData } from '../data/weddingData';

interface CeremonyPreviewCardsProps {
  data: WeddingInvitationData;
  onNavigate: (sectionId: string) => void;
}

interface ChapterStyle {
  order: string;
  numeral: string;
  bar: string;
  medallion: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
}

const chapterStyles: Record<'mehndi' | 'baraat' | 'walima', ChapterStyle> = {
  mehndi: {
    order: 'Ceremony One',
    numeral: '01',
    bar: 'from-[#0A2F1D] via-[#F4C430] to-[#0A2F1D]',
    medallion: 'bg-[#0A2F1D] border-[#D4AF37]/70 text-[#FDE047]',
    accent: 'text-[#0F5132]',
    icon: Flower2,
  },
  baraat: {
    order: 'Ceremony Two',
    numeral: '02',
    bar: 'from-[#4C0817] via-[#FFD700] to-[#4C0817]',
    medallion: 'bg-[#4C0817] border-[#D4AF37]/70 text-[#FFD700]',
    accent: 'text-[#7F1D1D]',
    icon: Crown,
  },
  walima: {
    order: 'Ceremony Three',
    numeral: '03',
    bar: 'from-[#C5A059] via-[#FFF3B0] to-[#C5A059]',
    medallion: 'bg-[#FAF8F5] border-[#C5A059] text-[#9A7426]',
    accent: 'text-[#7A6236]',
    icon: Sparkles,
  },
};

export const CeremonyPreviewCards: React.FC<CeremonyPreviewCardsProps> = ({
  data,
  onNavigate,
}) => {
  const chapters = (['mehndi', 'baraat', 'walima'] as const).map((key) => ({
    key,
    event: data.events[key],
    style: chapterStyles[key],
  }));

  return (
    <div className="max-w-3xl mx-auto my-8">
      {/* Header row */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="font-cinzel text-[10px] tracking-[0.28em] uppercase text-[#8C6D2E]">
          The Three Celebrations
        </span>
        <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {chapters.map(({ key, event, style }) => {
          const Icon = style.icon;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(`section-${key}`)}
              aria-label={`View ${event.title} details`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-white/95 text-left shadow-[0_18px_40px_-32px_rgba(139,105,20,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B38728]/70 hover:shadow-[0_26px_50px_-28px_rgba(139,105,20,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 cursor-pointer"
            >
              {/* Coloured chapter accent */}
              <span className={`block h-1.5 w-full bg-gradient-to-r ${style.bar}`} />

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${style.medallion} shadow-sm`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="block font-cinzel text-[9px] uppercase tracking-[0.2em] text-[#8A7968]">
                        {style.order}
                      </span>
                      <span className="block font-nastaleeq text-base leading-tight text-[#9A7426]">
                        {event.urduSubtitle}
                      </span>
                    </div>
                  </div>
                  <span className={`font-cinzel text-[11px] font-semibold tracking-widest ${style.accent}`}>
                    {style.numeral}
                  </span>
                </div>

                <h3 className="mt-3 font-serif-luxury text-[1.35rem] font-semibold leading-tight text-[#2C221E]">
                  {event.title}
                </h3>

                <div className="mt-3 space-y-1.5 border-t border-[#D4AF37]/25 pt-3 text-[11px] leading-snug text-[#5C4E43]">
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3 shrink-0 text-[#B38728]" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock3 className="h-3 w-3 shrink-0 text-[#B38728]" />
                    {event.time}
                  </p>
                  <p className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#B38728]" />
                    Stadium Road, Burewala
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#D4AF37]/25 pt-3">
                  <span className="font-cinzel text-[9px] uppercase tracking-[0.18em] text-[#8C6D2E]">
                    View Ceremony
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#9A7426] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
