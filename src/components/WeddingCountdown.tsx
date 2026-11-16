import React, { useEffect, useState } from 'react';
import { CalendarPlus, Clock3, Sparkles } from 'lucide-react';
import { WeddingInvitationData } from '../data/weddingData';

interface WeddingCountdownProps {
  data: WeddingInvitationData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

const computeTimeLeft = (iso: string): TimeLeft => {
  const target = new Date(iso).getTime();
  const diff = target - Date.now();
  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
};

const pad = (value: number) => String(value).padStart(2, '0');

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(data.countdownISO)
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(data.countdownISO));
    }, 1000);
    return () => window.clearInterval(id);
  }, [data.countdownISO]);

  // Local-time safe ICS generation for the three-day celebration
  const handleAddToCalendar = () => {
    const start = new Date(data.countdownISO);
    const end = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    const fmt = (date: Date) =>
      `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
        date.getUTCHours()
      )}${pad(date.getUTCMinutes())}00Z`;

    const description = [
      `You're Invited to the Wedding Celebration of ${data.groomName} & ${data.brideName}.`,
      `Mehndi — ${data.events.mehndi.date}, ${data.events.mehndi.time}`,
      `Baraat & Nikah — ${data.events.baraat.date}, ${data.events.baraat.time}`,
      `Walima — ${data.events.walima.date}, ${data.events.walima.time}`,
      `Venue: ${data.venueTitle}, ${data.venueAddress}`,
      `Google Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapQuery)}`,
    ].join('\\n');

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Faizan and Maryam Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@faizan-maryam-wedding`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Wedding of ${data.groomName} & ${data.brideName} — Mehndi, Baraat & Walima`,
      `LOCATION:${data.venueTitle}, ${data.venueAddress}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Faizan-Maryam-Wedding.ics';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const units: Array<{ label: string; value: number }> = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-7">
      <div className="flex items-center justify-center gap-2 mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
        <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#8C6D2E]">
          {timeLeft.passed
            ? 'Alhamdulillah — The Celebrations Have Begun'
            : 'Counting Down To The Mehndi Evening'}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-2xl py-3 px-1 bg-white/85 border border-[#D4AF37]/45 shadow-[0_10px_25px_-16px_rgba(139,105,20,0.55)]"
          >
            <span className="block font-cinzel text-2xl sm:text-4xl font-semibold tracking-tight gold-foil-text tabular-nums">
              {pad(unit.value)}
            </span>
            <span className="block font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8A7968] mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/35 text-[11px] font-sans-luxury text-[#6E5634]">
          <Clock3 className="w-3 h-3 text-[#9A7426]" />
          {data.events.mehndi.date} • 7:30 PM
        </span>
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2C221E] hover:bg-[#9A7426] text-[#FFF3B0] border border-[#D4AF37]/50 font-cinzel text-[10px] tracking-[0.16em] uppercase transition cursor-pointer"
        >
          <CalendarPlus className="w-3 h-3" />
          Add to Calendar
        </button>
      </div>
    </div>
  );
};
