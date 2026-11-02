import { useEffect, useRef } from 'react';

/**
 * ParticleBackground
 * ------------------
 * A single persistent, full-viewport canvas layer rendered behind all content.
 * - Tiny drifting nano-particles with organic noise-based motion.
 * - Pointer interaction: local displacement (repulsion ripple), brief scale +
 *   brightness boost, gradual spring return to home positions.
 * - No React state per frame; everything lives in refs and the rAF loop.
 * - Handles DPR scaling, resize, visibility, touch devices, reduced motion,
 *   and cleans up every listener/frame on unmount.
 * - Falls back gracefully (static CSS dot texture) if Canvas 2D is missing.
 */

interface Particle {
  x: number; y: number;        // current position
  hx: number; hy: number;      // home position
  vx: number; vy: number;      // velocity (interaction impulses)
  size: number;                // base radius px
  alpha: number;               // base alpha
  phase: number;               // drift phase seed
  speed: number;               // drift speed factor
  glow: boolean;               // faint accent glow on a few particles
}

const TAU = Math.PI * 2;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      // Fallback: keep body background as-is; nothing else to do.
      canvas.remove();
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };
    let lastInteraction = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildParticles = () => {
      const area = width * height;
      // Density tuned for "nano field": ~1 particle per 8k px², capped for perf.
      const maxCount = reduceMotion ? 60 : coarsePointer ? 130 : 240;
      const count = Math.max(50, Math.min(Math.round(area / 8200), maxCount));
      particles = [];
      for (let i = 0; i < count; i++) {
        const hx = rand(0, width);
        const hy = rand(0, height);
        particles.push({
          x: hx,
          y: hy,
          hx,
          hy,
          vx: 0,
          vy: 0,
          size: rand(0.5, 1.7),
          alpha: rand(0.08, 0.4),
          phase: rand(0, TAU),
          speed: rand(0.25, 1),
          glow: Math.random() < 0.06,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    // --- Pointer tracking (window-level so it works over the whole page) ---
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // handled separately below
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      lastInteraction = performance.now();
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointer.x = t.clientX;
      pointer.y = t.clientY;
      pointer.active = true;
      lastInteraction = performance.now();
    };
    const onTouchEnd = () => {
      pointer.active = false;
    };

    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 34;

    let t = 0;

    const step = (now: number) => {
      // Idle fade: stop reacting ~1.2s after the pointer leaves/stops.
      const interacting = pointer.active && now - lastInteraction < 1200;
      t += 0.004;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic drift around home position (two-sine pseudo-noise).
        const driftX = Math.sin(t * p.speed + p.phase) * 14 +
                       Math.sin(t * 0.37 * p.speed + p.phase * 2.3) * 8;
        const driftY = Math.cos(t * 0.8 * p.speed + p.phase * 1.7) * 12 +
                       Math.cos(t * 0.23 * p.speed + p.phase) * 7;
        const targetX = p.hx + driftX;
        const targetY = p.hy + driftY;

        if (interacting) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / REPEL_RADIUS; // 0..1
            const push = falloff * falloff * REPEL_STRENGTH;
            p.vx += (dx / dist) * push * 0.06;
            p.vy += (dy / dist) * push * 0.06 - falloff * 0.12; // slight upward rise
          }
        }

        // Spring back toward home + drift target, with damping.
        p.vx += (targetX - p.x) * 0.012;
        p.vy += (targetY - p.y) * 0.012;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        // Interaction response: proximity brightens & scales briefly.
        let drawAlpha = p.alpha;
        let drawSize = p.size;
        let accent = p.glow;

        if (interacting) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS) {
            const near = 1 - dist / REPEL_RADIUS;
            drawAlpha = Math.min(0.85, p.alpha + near * 0.5);
            drawSize = p.size * (1 + near * 0.9);
            if (near > 0.35) accent = true;
          }
        }

        // Wrap-around so the field always covers the viewport after resize.
        if (p.x < -20) { p.x += width + 40; p.hx = rand(0, width); }
        else if (p.x > width + 20) { p.x -= width + 40; p.hx = rand(0, width); }
        if (p.y < -20) { p.y += height + 40; p.hy = rand(0, height); }
        else if (p.y > height + 20) { p.y -= height + 40; p.hy = rand(0, height); }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, TAU);
        if (accent) {
          ctx.fillStyle = `rgba(62, 214, 232, ${drawAlpha})`;
          ctx.shadowColor = 'rgba(62, 214, 232, 0.55)';
          ctx.shadowBlur = drawSize * 6;
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${drawAlpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (running) rafId = requestAnimationFrame(step);
    };

    const staticRender = () => {
      // Reduced motion: render one calm frame, no animation loop.
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, p.size, 0, TAU);
        ctx.fillStyle = p.glow
          ? `rgba(62, 214, 232, ${p.alpha})`
          : `rgba(226, 232, 240, ${p.alpha})`;
        ctx.fill();
      }
    };

    resize();

    if (reduceMotion) {
      staticRender();
    } else {
      rafId = requestAnimationFrame(step);
    }

    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduceMotion) staticRender();
      }, 150);
    };

    window.addEventListener('resize', onResize);
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      document.addEventListener('touchend', onTouchEnd, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
