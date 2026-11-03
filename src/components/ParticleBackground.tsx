import { useEffect, useRef } from 'react';

/**
 * ParticleBackground
 * ------------------
 * Full-viewport canvas layer rendered behind all content.
 * High-density dark technical texture: crisp, ultra-low-opacity dark/black particles
 * (#111827 and #000000) at 1.75x density (75% more particles).
 *
 * - Micro-opacity (0.10 - 0.15) to maintain an understated, sophisticated atmosphere
 *   without distracting from typography or content.
 * - Fluid organic drift with smooth pointer interaction (gentle repulsion + spring return).
 * - High-efficiency canvas loop with no React state re-renders per frame.
 * - Respects prefers-reduced-motion and pointer: coarse.
 */

interface Particle {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
  tone: 'charcoal' | 'black';
}

const TAU = Math.PI * 2;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
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
      // 1.75x particle density (75% more particles):
      // Divisor updated from 6200 -> 3540, and maxCount scaled by 1.75.
      const maxCount = reduceMotion ? 160 : coarsePointer ? 260 : 600;
      const count = Math.max(105, Math.min(Math.round(area / 3540), maxCount));

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
          size: rand(0.45, 1.25),
          alpha: rand(0.10, 0.15), // Kept strictly between 0.10 and 0.15
          phase: rand(0, TAU),
          speed: rand(0.2, 0.75),
          tone: Math.random() < 0.65 ? 'charcoal' : 'black', // #111827 or #000000
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

    // --- Pointer tracking ---
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
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

    const REPEL_RADIUS = 140;
    const REPEL_STRENGTH = 10;
    let t = 0;

    const step = (now: number) => {
      const interacting = pointer.active && now - lastInteraction < 1200;
      t += 0.0035;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth pseudo-noise organic drift
        const driftX = Math.sin(t * p.speed + p.phase) * 12 +
                       Math.sin(t * 0.35 * p.speed + p.phase * 2.1) * 7;
        const driftY = Math.cos(t * 0.75 * p.speed + p.phase * 1.6) * 11 +
                       Math.cos(t * 0.22 * p.speed + p.phase) * 6;
        const targetX = p.hx + driftX;
        const targetY = p.hy + driftY;

        if (interacting) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / REPEL_RADIUS;
            const push = falloff * falloff * REPEL_STRENGTH;
            p.vx += (dx / dist) * push * 0.06;
            p.vy += (dy / dist) * push * 0.06 - falloff * 0.03;
          }
        }

        // Spring back toward home + drift target
        p.vx += (targetX - p.x) * 0.012;
        p.vy += (targetY - p.y) * 0.012;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        let drawAlpha = p.alpha;
        let drawSize = p.size;

        if (interacting) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS) {
            const near = 1 - dist / REPEL_RADIUS;
            drawAlpha = Math.min(0.18, p.alpha + near * 0.04);
            drawSize = p.size * (1 + near * 0.35);
          }
        }

        // Wrap-around screen bounds
        if (p.x < -20) { p.x += width + 40; p.hx = rand(0, width); }
        else if (p.x > width + 20) { p.x -= width + 40; p.hx = rand(0, width); }
        if (p.y < -20) { p.y += height + 40; p.hy = rand(0, height); }
        else if (p.y > height + 20) { p.y -= height + 40; p.hy = rand(0, height); }

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, TAU);

        // Dark/black technical texture: #111827 or #000000
        if (p.tone === 'black') {
          ctx.fillStyle = `rgba(0, 0, 0, ${drawAlpha})`;
        } else {
          ctx.fillStyle = `rgba(17, 24, 39, ${drawAlpha})`;
        }
        ctx.fill();
      }

      if (running) rafId = requestAnimationFrame(step);
    };

    const staticRender = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.hx, p.hy, p.size, 0, TAU);
        ctx.fillStyle = p.tone === 'black'
          ? `rgba(0, 0, 0, ${p.alpha})`
          : `rgba(17, 24, 39, ${p.alpha})`;
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
