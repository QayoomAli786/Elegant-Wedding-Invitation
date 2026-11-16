import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Car,
  CalendarCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { WeddingInvitationData } from '../data/weddingData';
import { CornerFloralFiligree } from './RoyalSvgArtwork';

interface VenueMapSectionProps {
  data: WeddingInvitationData;
}

export const VenueMapSection: React.FC<VenueMapSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const fullMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.mapQuery
  )}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    data.mapQuery
  )}`;
  const liveEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    data.mapQuery
  )}&z=14&output=embed`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${data.venueTitle}, ${data.venueAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="section-venue"
      className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 15%, #FFFDF9 0%, #F7F0E4 55%, #EDE1CD 100%)',
      }}
    >
      {/* Ornamental Top Divider */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="h-[2px] w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/50 text-[#8C6D2E] font-cinzel text-[11px] sm:text-xs tracking-[0.24em] uppercase shadow-sm mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#9A7426]" />
            <span>Wedding Venue • Google Maps Location</span>
            <MapPin className="w-3.5 h-3.5 text-[#9A7426]" />
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2C221E]">
            Join Us at <span className="gold-foil-text">Stadium Road, Burewala</span>
          </h2>
          <p className="font-nastaleeq text-3xl md:text-4xl text-[#9A7426] mt-2">{data.venueUrdu}</p>
          <p className="font-serif-luxury italic text-base sm:text-lg text-[#5C4E43] max-w-2xl mx-auto mt-1">
            All three royal ceremonies take place at the same beautifully decorated venue — easy to
            find, ample parking, and warm hospitality throughout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* Left: Venue Information */}
          <div
            className="lg:col-span-5 relative rounded-3xl p-6 sm:p-8 bg-white/95 border border-[#D4AF37]/40 shadow-[0_25px_60px_-30px_rgba(139,105,20,0.6)] flex flex-col justify-between"
          >
            <CornerFloralFiligree className="w-20 h-20 absolute top-2 left-2 opacity-70" color="#D4AF37" />
            <CornerFloralFiligree className="w-20 h-20 absolute top-2 right-2 opacity-70" flipX color="#D4AF37" />

            <div className="relative z-10">
              <span className="font-cinzel text-[10px] tracking-[0.26em] uppercase text-[#8C6D2E]">
                The Celebration Venue
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2C221E] mt-1">
                {data.venueTitle}
              </h3>

              <div className="mt-4 space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#9A7426]" />
                  </span>
                  <div>
                    <span className="block font-cinzel text-[10px] uppercase tracking-[0.18em] text-[#8A7968]">
                      Full Address
                    </span>
                    <p className="font-sans-luxury text-sm text-[#2C221E] leading-relaxed">
                      {data.venueAddress}
                    </p>
                    <p className="font-sans-luxury text-xs text-[#6E5D4F] mt-0.5">
                      {data.venueLandmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-4 h-4 text-[#9A7426]" />
                  </span>
                  <div className="w-full">
                    <span className="block font-cinzel text-[10px] uppercase tracking-[0.18em] text-[#8A7968]">
                      Ceremony Timings
                    </span>
                    <ul className="mt-1 space-y-1.5">
                      {[
                        {
                          title: data.events.mehndi.title,
                          date: data.events.mehndi.date,
                          time: data.events.mehndi.time,
                          dot: 'bg-[#F4C430]',
                          text: 'text-[#065F46]',
                        },
                        {
                          title: data.events.baraat.title,
                          date: data.events.baraat.date,
                          time: data.events.baraat.time,
                          dot: 'bg-[#BE123C]',
                          text: 'text-[#7F1D1D]',
                        },
                        {
                          title: data.events.walima.title,
                          date: data.events.walima.date,
                          time: data.events.walima.time,
                          dot: 'bg-[#C5A059]',
                          text: 'text-[#6E5634]',
                        },
                      ].map((event) => (
                        <li key={event.title} className="flex items-start gap-2">
                          <span className={`mt-1.5 w-2 h-2 rounded-full ${event.dot} shrink-0`} />
                          <div>
                            <span className={`font-cinzel text-[11px] font-semibold uppercase tracking-wider ${event.text}`}>
                              {event.title}
                            </span>
                            <span className="block font-serif-luxury text-sm text-[#2C221E]">
                              {event.date} • {event.time}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-[#F5EFE6] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4 text-[#9A7426]" />
                  </span>
                  <div>
                    <span className="block font-cinzel text-[10px] uppercase tracking-[0.18em] text-[#8A7968]">
                      Arrival &amp; Parking
                    </span>
                    <p className="font-sans-luxury text-xs sm:text-sm text-[#2C221E] leading-relaxed">
                      Complimentary valet and guarded parking on Stadium Road. Kindly arrive 20
                      minutes before each ceremony.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="relative z-10 mt-6 space-y-2.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#2C221E] gold-metallic-bg shadow-md hover:brightness-105 transition transform hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={fullMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#2C221E] hover:bg-[#9A7426] text-[#FFF3B0] font-cinzel text-[10px] tracking-[0.14em] uppercase transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white hover:bg-[#F5EFE6] border border-[#D4AF37]/60 text-[#6E5634] font-cinzel text-[10px] tracking-[0.14em] uppercase transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#0F766E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Google Map Embed */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 bg-[#F5EFE6] shadow-[0_25px_70px_-30px_rgba(139,105,20,0.7)] min-h-[340px] sm:min-h-[420px]">
            {/* Golden frame trim */}
            <div className="pointer-events-none absolute inset-0 z-20 ring-1 ring-inset ring-[#FFF3B0]/70 rounded-3xl" />
            <div className="pointer-events-none absolute inset-2 z-20 border border-[#FFF3B0]/45 rounded-2xl" />

            {!mapLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#F7F0E4]">
                <span className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                <p className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[#8C6D2E]">
                  Loading Burewala Map…
                </p>
              </div>
            )}

            <iframe
              title="Wedding venue map — Stadium Road, Burewala"
              src={liveEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 340 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="absolute inset-0 w-full h-full grayscale-[12%] contrast-[1.02]"
            />

            {/* Floating location chip */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#2C221E]/92 backdrop-blur-md px-4 py-3 text-[#FFF3B0] shadow-xl border border-[#D4AF37]/45">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                </span>
                <div>
                  <span className="block font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]">
                    Pinned Location
                  </span>
                  <span className="block font-serif-luxury text-sm sm:text-base font-semibold text-[#FFFDF9]">
                    Stadium Road, Burewala
                  </span>
                </div>
              </div>
              <a
                href={fullMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF3B0] hover:bg-[#FFD700] text-[#2C221E] font-cinzel text-[10px] font-semibold tracking-[0.14em] uppercase transition"
              >
                <Sparkles className="w-3 h-3" />
                Open Map
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center font-sans-luxury text-xs text-[#6E5D4F] mt-6 max-w-2xl mx-auto">
          Venue details and map are editable placeholders — tap{' '}
          <span className="font-semibold text-[#9A7426]">“Customize Dates &amp; Venues”</span> in the
          final invitation card to update them any time.
        </p>
      </div>
    </section>
  );
};
