import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  hue: number;
  decay: number;
}

export const MagicalParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = 48;

    // Warm alchemical amber, gold, and mystic violet motes
    const hues = [38, 42, 48, 52, 275, 290];

    function createParticle(initial = false): Particle {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.55 + 0.35),
        alpha: initial ? Math.random() * 0.75 : 0.05,
        maxAlpha: Math.random() * 0.6 + 0.35,
        hue: hues[Math.floor(Math.random() * hues.length)],
        decay: Math.random() * 0.003 + 0.0018,
      };
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Fade in when young, fade out near top
        if (p.y > height * 0.8) {
          p.alpha = Math.min(p.maxAlpha, p.alpha + 0.02);
        } else if (p.y < height * 0.25) {
          p.alpha = Math.max(0, p.alpha - p.decay * 3);
        }

        // Draw soft glowing particle
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${p.alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 85%, 60%, ${p.alpha * 0.6})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Respawn if drifted off-screen or faded
        if (p.y < -10 || p.alpha <= 0 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false);
        }
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
      aria-hidden="true"
    />
  );
};
