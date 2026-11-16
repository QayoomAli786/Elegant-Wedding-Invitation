import React, { useEffect, useRef } from 'react';

interface FloatingPetalsCanvasProps {
  activeTheme: 'cover' | 'union' | 'mehndi' | 'baraat' | 'walima' | 'reveal';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'sparkle';
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const THEME_PALETTES: Record<FloatingPetalsCanvasProps['activeTheme'], string[]> = {
  cover: ['#F4D068', '#E8B4B8', '#FFF0F3', '#D4AF37', '#F7E7CE'],
  union: ['#E06D85', '#F4C2C2', '#D4AF37', '#FFE4E8', '#C85A70'],
  mehndi: ['#FFB800', '#F4C430', '#FF8C00', '#FFD700', '#4E9F6E'],
  baraat: ['#A41623', '#D90429', '#FFD700', '#E63946', '#F4D068'],
  walima: ['#FFFDF9', '#F3E5AB', '#E6D7C3', '#D4AF37', '#F8F4EC'],
  reveal: ['#D4AF37', '#E8B4B8', '#C51130', '#F9E8A2', '#FFF0F5'],
};

export const FloatingPetalsCanvas: React.FC<FloatingPetalsCanvasProps> = ({ activeTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(activeTheme);

  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 55;
    const particles: Particle[] = [];

    const createParticle = (initialRandomY = false): Particle => {
      const palette = THEME_PALETTES[themeRef.current] || THEME_PALETTES.cover;
      const isPetal = Math.random() > 0.42;
      return {
        x: Math.random() * width,
        y: initialRandomY ? Math.random() * height : -25,
        size: isPetal ? 6 + Math.random() * 9 : 1.5 + Math.random() * 2.8,
        speedY: isPetal ? 0.45 + Math.random() * 0.85 : 0.2 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: isPetal ? 0.45 + Math.random() * 0.4 : 0.4 + Math.random() * 0.55,
        type: isPetal ? 'petal' : 'sparkle',
        color: palette[Math.floor(Math.random() * palette.length)],
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.45;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          const fresh = createParticle(false);
          particles[i] = fresh;
          continue;
        }
        if (p.x > width + 30) p.x = -20;
        if (p.x < -30) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Organic rose/marigold petal curve
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 1.1, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.5, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
          ctx.fill();

          // Subtle golden highlight vein
          ctx.strokeStyle = 'rgba(255, 235, 170, 0.35)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // Twinkling golden 4-point star / bokeh sparkle
          const twinkle = 0.35 + Math.abs(Math.sin(tick * 0.04 + p.swayOffset)) * 0.65;
          ctx.globalAlpha = p.opacity * twinkle;
          ctx.fillStyle = '#FFE885';
          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          const r = p.size;
          ctx.moveTo(0, -r * 2);
          ctx.quadraticCurveTo(0, 0, r * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, r * 2);
          ctx.quadraticCurveTo(0, 0, -r * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
