import React from 'react';

export const AnimatedWeddingRings: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 110,
}) => (
  <svg
    width={size}
    height={size * 0.78}
    viewBox="0 0 220 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <defs>
      <linearGradient id="goldRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9A7426" />
        <stop offset="30%" stopColor="#F9E8A2" />
        <stop offset="55%" stopColor="#D4AF37" />
        <stop offset="80%" stopColor="#FFF6CC" />
        <stop offset="100%" stopColor="#8B6514" />
      </linearGradient>
      <linearGradient id="goldRingGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#AA771C" />
        <stop offset="40%" stopColor="#FFE885" />
        <stop offset="70%" stopColor="#C59B27" />
        <stop offset="100%" stopColor="#7C5811" />
      </linearGradient>
      <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="50%" stopColor="#FFF4B8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient Aura */}
    <circle cx="110" cy="95" r="65" fill="url(#diamondGlow)" opacity="0.35" />

    {/* Left Groom Ring */}
    <g className="animate-float-slow">
      <ellipse
        cx="84"
        cy="102"
        rx="44"
        ry="42"
        stroke="url(#goldRingGrad1)"
        strokeWidth="9.5"
        fill="none"
      />
      <ellipse
        cx="84"
        cy="102"
        rx="39"
        ry="37"
        stroke="#FFF6CC"
        strokeWidth="1.2"
        strokeDasharray="6 4"
        opacity="0.65"
        fill="none"
      />
    </g>

    {/* Right Bride Ring with Solitaire Diamond */}
    <g style={{ animation: 'floatSlow 5.5s ease-in-out infinite 0.6s' }}>
      <ellipse
        cx="136"
        cy="102"
        rx="44"
        ry="42"
        stroke="url(#goldRingGrad2)"
        strokeWidth="8.5"
        fill="none"
      />
      {/* Diamond Prongs & Gem at Top of Bride Ring */}
      <polygon
        points="136,34 150,46 142,58 130,58 122,46"
        fill="#FFFFFF"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      <polygon
        points="136,34 143,46 136,58 129,46"
        fill="#E8F5FF"
        opacity="0.85"
      />
      {/* Diamond Sparkle Star */}
      <circle cx="136" cy="40" r="18" fill="url(#diamondGlow)" />
      <path
        d="M136 16 L138 34 L156 36 L138 38 L136 56 L134 38 L116 36 L134 34 Z"
        fill="#FFFFFF"
        className="animate-pulse"
      />
    </g>

    {/* Interlocking Overlap Segment */}
    <path
      d="M 110 66 A 44 42 0 0 1 128 102"
      stroke="url(#goldRingGrad1)"
      strokeWidth="9.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Floating Mini Hearts */}
    <path
      d="M110 28 C110 23, 102 20, 102 26 C102 31, 110 35, 110 38 C110 35, 118 31, 118 26 C118 20, 110 23, 110 28 Z"
      fill="#D4AF37"
      opacity="0.85"
    />
  </svg>
);

export const CornerFloralFiligree: React.FC<{ className?: string; flipX?: boolean; flipY?: boolean; color?: string }> = ({
  className = '',
  flipX = false,
  flipY = false,
  color = '#D4AF37',
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    className={`pointer-events-none select-none ${className}`}
    style={{
      transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
    }}
  >
    {/* Corner Arabesque Scrolls */}
    <path
      d="M8 8 L8 120 C8 70, 40 40, 90 25 C60 55, 55 85, 80 105 C65 75, 95 55, 125 65 C95 40, 70 8, 130 8 Z"
      stroke={color}
      strokeWidth="1.5"
      fill={color}
      fillOpacity="0.08"
    />
    <path
      d="M16 16 L155 16 M16 16 L16 155"
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="4 4"
      opacity="0.7"
    />
    {/* Corner Blooming Rose */}
    <g transform="translate(36, 36)">
      <circle cx="0" cy="0" r="16" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" />
      <circle cx="0" cy="0" r="10" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M-6 -3 C-2 -9, 5 -9, 7 -2 C9 4, 2 9, -5 6 C-9 3, -8 -2, -2 -2" stroke={color} strokeWidth="1.4" fill="none" />
      {/* Leaves */}
      <path d="M16 -4 C28 -12, 38 -4, 24 6 Z" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1" />
      <path d="M-4 16 C-12 28, -4 38, 6 24 Z" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1" />
    </g>
    {/* Secondary Rose Buds */}
    <circle cx="82" cy="24" r="6" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    <circle cx="24" cy="82" r="6" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />
    <circle cx="118" cy="18" r="3" fill={color} />
    <circle cx="18" cy="118" r="3" fill={color} />
  </svg>
);

export const MarigoldGarlandHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 1200 135" fill="none" className="w-full h-auto">
      {/* Draped Marigold & Jasmine Strings */}
      {[0, 200, 400, 600, 800, 1000].map((offset, idx) => (
        <g key={offset} className="animate-sway-garland" style={{ animationDelay: `${idx * 0.35}s` }}>
          {/* Curved Festoon Swag */}
          <path
            d={`M ${offset} 0 Q ${offset + 100} 95 ${offset + 200} 0`}
            stroke="#FFB800"
            strokeWidth="12"
            strokeDasharray="2 16"
            strokeLinecap="round"
          />
          <path
            d={`M ${offset} 0 Q ${offset + 100} 70 ${offset + 200} 0`}
            stroke="#FFFDF0"
            strokeWidth="6"
            strokeDasharray="1 12"
            strokeLinecap="round"
          />
          {/* Vertical Hanging Marigold Lari */}
          <line
            x1={offset + 100}
            y1="0"
            x2={offset + 100}
            y2="112"
            stroke="#D4AF37"
            strokeWidth="2"
          />
          {[18, 38, 58, 78, 98].map((cy, bIdx) => (
            <circle
              key={cy}
              cx={offset + 100}
              cy={cy}
              r={bIdx % 2 === 0 ? 8.5 : 7}
              fill={bIdx % 2 === 0 ? '#FFA500' : '#FFD700'}
              stroke="#B45309"
              strokeWidth="1"
            />
          ))}
          {/* Golden Bell Jhumka at bottom */}
          <path
            d={`M ${offset + 91} 118 A 9 9 0 0 1 ${offset + 109} 118 Z`}
            fill="#D4AF37"
          />
          <circle cx={offset + 100} cy="122" r="3" fill="#FFF3B0" />
        </g>
      ))}
    </svg>
  </div>
);

export const FlickeringDiyaCandle: React.FC<{ className?: string; isLit?: boolean }> = ({
  className = '',
  isLit = true,
}) => (
  <svg viewBox="0 0 90 95" fill="none" className={`w-16 h-16 select-none ${className}`}>
    <defs>
      <radialGradient id="diyaFlameGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF7B2" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#FFA500" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
      </radialGradient>
    </defs>
    {isLit && (
      <g className="animate-candle-flicker">
        <circle cx="45" cy="30" r="26" fill="url(#diyaFlameGlow)" />
        {/* Outer Flame */}
        <path
          d="M45 8 C35 22, 34 36, 45 44 C56 36, 55 22, 45 8 Z"
          fill="#FF9500"
        />
        {/* Inner Bright Flame */}
        <path
          d="M45 16 C40 25, 40 34, 45 41 C50 34, 50 25, 45 16 Z"
          fill="#FFF9C4"
        />
      </g>
    )}
    {/* Ornate Golden Brass Diya Bowl */}
    <path
      d="M15 46 Q45 54 75 46 C72 68, 58 78, 45 78 C32 78, 18 68, 15 46 Z"
      fill="url(#goldRingGrad1)"
      stroke="#FFD700"
      strokeWidth="1.5"
    />
    {/* Decorative Jewels on Diya */}
    <circle cx="32" cy="59" r="2.5" fill="#10B981" />
    <circle cx="45" cy="61" r="3" fill="#FFF6CC" />
    <circle cx="58" cy="59" r="2.5" fill="#10B981" />
    {/* Diya Base Pedestal */}
    <path d="M32 78 L58 78 L63 85 L27 85 Z" fill="#B38728" />
  </svg>
);

export const MehndiHennaAndDholakIllustration: React.FC<{ className?: string; isPlayingBeat?: boolean }> = ({
  className = '',
  isPlayingBeat = false,
}) => (
  <svg
    viewBox="0 0 420 310"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-md mx-auto select-none ${className}`}
  >
    <defs>
      <radialGradient id="mehndiMandalaGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F4C430" stopOpacity="0.38" />
        <stop offset="65%" stopColor="#10B981" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#0A2F1D" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Rotating Intricate Mandala Backdrop */}
    <circle cx="210" cy="155" r="140" fill="url(#mehndiMandalaGlow)" />
    <g className="animate-spin-slow" style={{ transformOrigin: '210px 155px' }}>
      <circle
        cx="210"
        cy="155"
        r="118"
        stroke="#F4C430"
        strokeWidth="1.2"
        strokeDasharray="6 6"
        opacity="0.55"
      />
      <circle
        cx="210"
        cy="155"
        r="98"
        stroke="#34D399"
        strokeWidth="1"
        strokeDasharray="12 8"
        opacity="0.45"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 210 + Math.cos(angle) * 108;
        const y = 155 + Math.sin(angle) * 108;
        return <circle key={i} cx={x} cy={y} r="5" fill="#F4C430" opacity="0.6" />;
      })}
    </g>

    {/* Traditional Festive Dholak Drum */}
    <g
      className={isPlayingBeat ? 'animate-bounce' : 'animate-float-slow'}
      style={{ transformOrigin: '210px 180px' }}
    >
      {/* Dholak Body */}
      <path
        d="M125 135 Q210 108 295 135 L295 215 Q210 242 125 215 Z"
        fill="#9A3412"
        stroke="#F4C430"
        strokeWidth="3"
      />
      {/* Emerald & Saffron Brocade Band on Dholak */}
      <path
        d="M180 123 Q210 118 240 123 L240 227 Q210 232 180 227 Z"
        fill="#065F46"
        stroke="#FFD700"
        strokeWidth="2"
      />
      {/* Golden Criss-Cross Ropes */}
      <path
        d="M135 136 L160 216 L185 128 L210 225 L235 128 L260 216 L285 136"
        stroke="#FDE047"
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="M135 214 L160 134 L185 222 L210 125 L235 222 L260 134 L285 214"
        stroke="#F59E0B"
        strokeWidth="1.8"
        fill="none"
      />
      {/* Left & Right Drum Heads */}
      <ellipse cx="125" cy="175" rx="18" ry="41" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
      <ellipse cx="295" cy="175" rx="18" ry="41" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
      <ellipse cx="125" cy="175" rx="8" ry="20" fill="#78350F" opacity="0.7" />
      <ellipse cx="295" cy="175" rx="8" ry="20" fill="#78350F" opacity="0.7" />
    </g>

    {/* Henna Mandala Lotus Emblem Above Dholak */}
    <g transform="translate(210, 72)">
      <path
        d="M0 -34 C12 -18, 16 -4, 0 12 C-16 -4, -12 -18, 0 -34 Z"
        fill="#F4C430"
        stroke="#FEF08A"
        strokeWidth="1.2"
      />
      <path
        d="M0 12 C18 -14, 34 -8, 26 12 C14 16, 6 14, 0 12 Z"
        fill="#F59E0B"
        stroke="#FEF08A"
        strokeWidth="1"
      />
      <path
        d="M0 12 C-18 -14, -34 -8, -26 12 C-14 16, -6 14, 0 12 Z"
        fill="#F59E0B"
        stroke="#FEF08A"
        strokeWidth="1"
      />
      <circle cx="0" cy="-6" r="5" fill="#064E3B" stroke="#FDE047" strokeWidth="1.5" />
    </g>

    {/* Marigold Blossoms Flanking Base */}
    {[85, 130, 290, 335].map((cx, idx) => (
      <g key={cx} transform={`translate(${cx}, ${idx % 2 === 0 ? 250 : 262})`}>
        <circle cx="0" cy="0" r="16" fill="#FF9500" stroke="#FDE047" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="10" fill="#FFD700" />
        <circle cx="0" cy="0" r="4" fill="#B45309" />
      </g>
    ))}

    {/* Musical Sangeet Notes */}
    <text x="68" y="95" fill="#FDE047" fontSize="26" className="animate-pulse">
      ♪
    </text>
    <text x="335" y="88" fill="#34D399" fontSize="28" className="animate-bounce">
      ♫
    </text>
    <text x="355" y="140" fill="#FDE047" fontSize="22" className="animate-pulse">
      ♩
    </text>
  </svg>
);

export const RoyalBaraatCoupleIllustration: React.FC<{ className?: string; showerActive?: boolean }> = ({
  className = '',
  showerActive = false,
}) => (
  <svg
    viewBox="0 0 460 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-md mx-auto select-none ${className}`}
  >
    <defs>
      <radialGradient id="baraatRoyalHalo" cx="50%" cy="45%" r="52%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.45" />
        <stop offset="55%" stopColor="#991B1B" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#3D0814" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B38728" />
        <stop offset="50%" stopColor="#FFF3B0" />
        <stop offset="100%" stopColor="#9A7426" />
      </linearGradient>
    </defs>

    {/* Warm Golden Halo */}
    <circle cx="230" cy="210" r="185" fill="url(#baraatRoyalHalo)" />

    {/* Ornate Scalloped Mughal Jharokha Arch */}
    <path
      d="M55 390 L55 185 C55 105, 135 55, 230 25 C325 55, 405 105, 405 185 L405 390 Z"
      fill="#2A050D"
      fillOpacity="0.7"
      stroke="url(#archGold)"
      strokeWidth="4"
    />
    <path
      d="M72 378 L72 190 C72 120, 145 72, 230 44 C315 72, 388 120, 388 190 L388 378"
      stroke="#FFD700"
      strokeWidth="1.5"
      strokeDasharray="6 4"
      opacity="0.75"
    />

    {/* Hanging Chandelier Inside Arch */}
    <line x1="230" y1="28" x2="230" y2="76" stroke="#FFD700" strokeWidth="2" />
    <path d="M208 76 Q230 92 252 76 Z" fill="#FFD700" />
    <circle cx="230" cy="86" r="12" fill="#FFF3B0" opacity="0.5" className="animate-pulse" />

    {/* GROOM (Faizan) — Left Side in Regal Ivory & Gold Sherwani & Crimson Turban */}
    <g className="animate-float-slow">
      {/* Groom Shoulders / Sherwani Coat */}
      <path
        d="M115 375 L128 242 C132 222, 152 212, 175 212 C198 212, 215 222, 220 242 L228 375 Z"
        fill="#FDF8EE"
        stroke="#D4AF37"
        strokeWidth="2.5"
      />
      {/* Gold Embroidery Collar & Buttons */}
      <path d="M162 212 L175 235 L188 212" stroke="#B38728" strokeWidth="3" fill="none" />
      <line x1="175" y1="235" x2="175" y2="365" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 6" />
      {/* Royal Crimson Velvet Shawl / Doshalah draped across Groom */}
      <path
        d="M128 232 Q175 275 220 245 L216 290 Q170 310 124 270 Z"
        fill="#880E1F"
        stroke="#FFD700"
        strokeWidth="1.8"
      />
      {/* Groom Neck & Head */}
      <rect x="165" y="192" width="20" height="22" rx="6" fill="#F3D2B8" />
      <circle cx="175" cy="172" r="24" fill="#F7DBC4" stroke="#D4AF37" strokeWidth="1.2" />
      {/* Groom Gentle Beard & Noble Features */}
      <path d="M154 176 Q175 198 196 176" stroke="#3B2314" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M164 168 Q168 165 172 168 M180 168 Q184 165 188 168" stroke="#3B2314" strokeWidth="1.8" strokeLinecap="round" />
      {/* Royal Turban (Kulla / Pagri) with Kalgi Feather */}
      <path
        d="M146 164 C144 138, 168 126, 198 138 C206 146, 204 158, 198 166 Q175 154 146 164 Z"
        fill="#991B1B"
        stroke="#FFD700"
        strokeWidth="2"
      />
      {/* Golden Kalgi Brooch & Plume */}
      <circle cx="188" cy="142" r="5" fill="#FFD700" />
      <path d="M188 142 C196 122, 212 115, 218 124 C210 132, 198 138, 188 142 Z" fill="#FFF8DC" stroke="#FFD700" strokeWidth="1" />
    </g>

    {/* BRIDE (Maryam) — Right Side in Royal Crimson & Antique Gold Bridal Lehenga */}
    <g style={{ animation: 'floatSlow 5.4s ease-in-out infinite 0.4s' }}>
      {/* Flowing Bridal Lehenga Skirt & Dupatta */}
      <path
        d="M222 375 L245 248 C250 228, 266 220, 286 220 C306 220, 322 228, 328 248 L355 375 Z"
        fill="#9B111E"
        stroke="#FFD700"
        strokeWidth="2.5"
      />
      {/* Intricate Gold Zardozi Lehenga Border */}
      <path d="M225 355 Q288 368 352 355 L355 375 L222 375 Z" fill="url(#archGold)" />
      <path
        d="M236 315 Q288 326 340 315"
        stroke="#FFD700"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {/* Bridal Neck & Head */}
      <rect x="277" y="200" width="18" height="20" rx="6" fill="#F7DBC4" />
      {/* Royal Gold Bridal Necklace (Rani Haar) */}
      <path d="M268 218 Q286 236 304 218" stroke="#FFD700" strokeWidth="4" fill="none" />
      <path d="M264 224 Q286 248 308 224" stroke="#FFF3B0" strokeWidth="2" strokeDasharray="3 3" fill="none" />
      {/* Bride Face */}
      <circle cx="286" cy="182" r="22" fill="#F9E0CC" stroke="#FFD700" strokeWidth="1.2" />
      {/* Graceful Downcast Eyelashes & Nath (Bridal Nose Ring) */}
      <path d="M274 180 Q278 183 282 180 M290 180 Q294 183 298 180" stroke="#3B2314" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="277" cy="188" r="4.5" stroke="#FFD700" strokeWidth="1.2" fill="none" />
      {/* Sheer Crimson & Gold Bridal Veil (Dupatta) Draped Over Head */}
      <path
        d="M258 178 C258 148, 314 148, 314 178 L342 295"
        stroke="#FFD700"
        strokeWidth="2.5"
        fill="#B91C1C"
        fillOpacity="0.28"
      />
      {/* Maang Tikka & Jhoomar on Forehead */}
      <circle cx="286" cy="164" r="4" fill="#FFD700" />
      <path d="M270 162 L262 172 L274 172 Z" fill="#FFF3B0" stroke="#FFD700" strokeWidth="1" />
    </g>

    {/* Joined Hands / Golden Heart Emblem Between Couple */}
    <g transform="translate(230, 275)">
      <circle cx="0" cy="0" r="18" fill="#FFD700" fillOpacity="0.25" className="animate-ping" />
      <path
        d="M0 -8 C0 -14, -10 -16, -10 -8 C-10 -2, 0 4, 0 9 C0 4, 10 -2, 10 -8 C10 -16, 0 -14, 0 -8 Z"
        fill="#FFD700"
      />
    </g>

    {/*Lush Crimson Roses at Arch Base */}
    {[70, 115, 165, 295, 345, 390].map((cx, i) => (
      <g key={cx} transform={`translate(${cx}, ${i % 2 === 0 ? 378 : 386})`}>
        <circle cx="0" cy="0" r="18" fill="#880E1F" stroke="#FFD700" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="11" fill="#BE123C" />
        <circle cx="0" cy="0" r="5" fill="#FDE047" />
      </g>
    ))}

    {/* Extra Golden Shower Particles when triggered */}
    {showerActive &&
      Array.from({ length: 18 }).map((_, idx) => (
        <circle
          key={idx}
          cx={70 + ((idx * 37) % 320)}
          cy={60 + ((idx * 53) % 280)}
          r={3 + (idx % 3)}
          fill={idx % 2 === 0 ? '#FFD700' : '#FB7185'}
          className="animate-ping"
        />
      ))}
  </svg>
);

export const WalimaCrystalChandelierSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 400 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-md mx-auto select-none ${className}`}
  >
    <defs>
      <radialGradient id="crystalGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#F3E5AB" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Warm Ambient Chandelier Glow */}
    <circle cx="200" cy="125" r="125" fill="url(#crystalGlow)" />

    <g className="animate-sway-garland" style={{ transformOrigin: '200px 0px' }}>
      {/* Central Chain */}
      <line x1="200" y1="0" x2="200" y2="55" stroke="#C5A059" strokeWidth="3" strokeDasharray="5 3" />

      {/* Upper Tier Crown */}
      <ellipse cx="200" cy="60" rx="52" ry="12" stroke="#C5A059" strokeWidth="2.5" fill="#FFFDF9" fillOpacity="0.6" />
      {/* Middle Grand Tier */}
      <ellipse cx="200" cy="98" rx="95" ry="18" stroke="#C5A059" strokeWidth="3" fill="#FFFDF9" fillOpacity="0.5" />
      {/* Lower Tier */}
      <ellipse cx="200" cy="138" rx="64" ry="14" stroke="#C5A059" strokeWidth="2.5" fill="#FFFDF9" fillOpacity="0.6" />

      {/* Draped Crystal Pearl Swags */}
      <path d="M105 98 Q152 135 200 98 Q248 135 295 98" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 4" fill="none" />
      <path d="M136 138 Q168 172 200 138 Q232 172 264 138" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 4" fill="none" />
      <path d="M165 138 Q200 205 235 138" stroke="#C5A059" strokeWidth="2" strokeDasharray="3 4" fill="none" />

      {/* Crystal Prism Teardrops */}
      {[105, 136, 168, 200, 232, 264, 295].map((x, idx) => {
        const yBase = idx === 0 || idx === 6 ? 105 : idx === 3 ? 190 : 155;
        return (
          <g key={x}>
            <polygon
              points={`${x},${yBase} ${x - 6},${yBase + 14} ${x},${yBase + 24} ${x + 6},${yBase + 14}`}
              fill="#FFFFFF"
              stroke="#C5A059"
              strokeWidth="1.2"
            />
            {/* Glowing Candle Light Bulbs on Tier */}
            <circle
              cx={x}
              cy={idx === 0 || idx === 6 ? 86 : 82}
              r="7"
              fill="#FFF9DB"
              className="animate-pulse"
            />
            <circle cx={x} cy={idx === 0 || idx === 6 ? 86 : 82} r="3.5" fill="#FFFFFF" />
          </g>
        );
      })}
    </g>

    {/* White Orchids & Champagne Roses Framing Bottom */}
    {[80, 140, 200, 260, 320].map((cx, idx) => (
      <g key={cx} transform={`translate(${cx}, ${idx === 2 ? 232 : 222})`}>
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#C5A059" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="9" fill="#FAF0CA" />
        <circle cx="0" cy="0" r="3.5" fill="#C5A059" />
      </g>
    ))}
  </svg>
);

export const RomanticCouplePortraitSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 380 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-sm mx-auto select-none ${className}`}
  >
    <defs>
      <radialGradient id="couplePortraitGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF5F7" stopOpacity="1" />
        <stop offset="60%" stopColor="#FDE8EE" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#F5EFE6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="roseGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B38728" />
        <stop offset="50%" stopColor="#E5B869" />
        <stop offset="100%" stopColor="#C85A70" />
      </linearGradient>
    </defs>

    {/* Soft Romantic Halo */}
    <circle cx="190" cy="170" r="155" fill="url(#couplePortraitGlow)" />

    {/* Circular Floral Wreath & Golden Crescent Frame */}
    <circle
      cx="190"
      cy="170"
      r="134"
      stroke="url(#roseGoldStroke)"
      strokeWidth="3"
      fill="#FFFDFB"
    />
    <circle
      cx="190"
      cy="170"
      r="124"
      stroke="#D4AF37"
      strokeWidth="1.2"
      strokeDasharray="5 5"
    />

    {/* Subtle Islamic Star & Arch Lattice inside Medallion */}
    <path
      d="M95 265 L95 155 C95 102, 138 68, 190 48 C242 68, 285 102, 285 155 L285 265"
      stroke="#D4AF37"
      strokeWidth="1.5"
      opacity="0.45"
      fill="#FDF6F0"
    />

    {/* Temporary Illustrated Bride & Groom Silhouette Portrait */}
    {/* Groom (Faizan) on Left gazing lovingly at Bride */}
    <g>
      <path
        d="M108 278 C112 225, 132 204, 162 204 C184 204, 194 222, 196 278 Z"
        fill="#2C221E"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      {/* Golden Sherwani Collar Detail */}
      <path d="M148 204 L162 232 L176 204" stroke="#D4AF37" strokeWidth="2.2" fill="none" />
      {/* Groom Head & Regal Turban Profile */}
      <circle cx="162" cy="166" r="22" fill="#F4D5BC" stroke="#D4AF37" strokeWidth="1.5" />
      <path
        d="M138 158 C138 134, 164 124, 188 138 C192 146, 188 156, 182 162 Q160 150 138 158 Z"
        fill="#D4AF37"
      />
      {/* Groom Smile & Eye */}
      <path d="M168 164 Q173 161 177 164" stroke="#2C221E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M168 175 Q174 179 179 175" stroke="#2C221E" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Bride (Maryam) on Right in Rose-Crimson Bridal Attire & Veil */}
    <g>
      <path
        d="M186 278 C190 228, 206 212, 232 212 C256 212, 272 230, 278 278 Z"
        fill="#A41623"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      {/* Bridal Jewelry & Dupatta Drape */}
      <path d="M216 212 Q232 232 248 212" stroke="#FFD700" strokeWidth="3" fill="none" />
      <circle cx="228" cy="176" r="20" fill="#F8DEC8" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Flowing Golden-Red Veil */}
      <path
        d="M210 162 C218 144, 248 148, 254 172 L276 262"
        stroke="#D4AF37"
        strokeWidth="2.2"
        fill="#E06D85"
        fillOpacity="0.3"
      />
      {/* Maang Tikka */}
      <circle cx="222" cy="160" r="3.5" fill="#FFD700" />
      {/* Bride Eyelash & Smile */}
      <path d="M215 175 Q220 178 224 175" stroke="#2C221E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M216 184 Q221 187 226 184" stroke="#A41623" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Glowing Floating Heart Between Couple */}
    <path
      d="M195 124 C195 117, 184 114, 184 122 C184 129, 195 135, 195 140 C195 135, 206 129, 206 122 C206 114, 195 117, 195 124 Z"
      fill="#E11D48"
      className="animate-heartbeat"
    />

    {/* Blooming Roses Along Bottom Curve of Wreath */}
    {[
      { x: 95, y: 255, r: 16, c: '#E06D85' },
      { x: 135, y: 282, r: 19, c: '#BE123C' },
      { x: 190, y: 294, r: 22, c: '#D4AF37' },
      { x: 245, y: 282, r: 19, c: '#BE123C' },
      { x: 285, y: 255, r: 16, c: '#E06D85' },
    ].map((rose, idx) => (
      <g key={idx} transform={`translate(${rose.x}, ${rose.y})`}>
        <circle cx="0" cy="0" r={rose.r} fill={rose.c} stroke="#FFFDF9" strokeWidth="2" />
        <circle cx="0" cy="0" r={rose.r * 0.58} fill="#FFE4E8" fillOpacity="0.6" />
        <circle cx="0" cy="0" r={rose.r * 0.25} fill="#FFD700" />
      </g>
    ))}
  </svg>
);
