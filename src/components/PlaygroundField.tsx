import { useEffect, useRef } from 'react';

/**
 * PlaygroundField
 * ---------------
 * A compact generative experiment rendered on its own canvas: a constellation
 * of points connected by distance-based edges, drifting and reacting to the
 * pointer (or a slow autonomous attractor when idle / reduced motion).
 * Self-contained rAF loop with full cleanup; no React state per frame.
 */

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
}

const TAU = Math.PI * 2;

export default function PlaygroundField() {
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
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let rafId = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };
    let lastMove = 0;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(36, Math.min(Math.round((width * height) / 7000), 110));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const LINK_DIST = 84;

    const step = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Autonomous attractor wanders slowly when the pointer is idle.
      const interacting = pointer.active && now - lastMove < 2000;
      const ax = interacting
        ? pointer.x
        : width / 2 + Math.sin(now * 0.00035) * width * 0.32;
      const ay = interacting
        ? pointer.y
        : height / 2 + Math.cos(now * 0.00028) * height * 0.3;

      for (const d of dots) {
        // Gentle attraction toward the attractor + random jitter.
        const dx = ax - d.x;
        const dy = ay - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = interacting ? 0.00018 : 0.00008;
        d.vx += (dx / dist) * dist * pull + (Math.random() - 0.5) * 0.02;
        d.vy += (dy / dist) * dist * pull + (Math.random() - 0.5) * 0.02;

        // Repel very close to the attractor so it feels like displacement.
        if (dist < 60) {
          d.vx -= (dx / dist) * 0.05;
          d.vy -= (dy / dist) * 0.05;
        }

        d.vx *= 0.985;
        d.vy *= 0.985;
        d.x += d.vx;
        d.y += d.vy;

        // Soft wrap
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;
        if (d.y < -10) d.y = height + 10;
        if (d.y > height + 10) d.y = -10;
      }

      // Links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(distSq) / LINK_DIST) * 0.28;
            ctx.strokeStyle = `rgba(148, 190, 220, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const d of dots) {
        const dx = d.x - ax;
        const dy = d.y - ay;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 140);
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1 + near * 1.4, 0, TAU);
        ctx.fillStyle = near > 0.4
          ? `rgba(62, 214, 232, ${0.35 + near * 0.55})`
          : `rgba(226, 232, 240, ${0.25 + near * 0.3})`;
        ctx.fill();
      }

      if (running) rafId = requestAnimationFrame(step);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      lastMove = performance.now();
    };
    const onPointerLeave = () => { pointer.active = false; };

    init();
    if (reduceMotion) {
      // One static frame: links only, calm composition.
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(distSq) / LINK_DIST) * 0.28;
            ctx.strokeStyle = `rgba(148, 190, 220, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, TAU);
        ctx.fillStyle = 'rgba(226, 232, 240, 0.3)';
        ctx.fill();
      }
    } else {
      canvas.addEventListener('pointermove', onPointerMove, { passive: true });
      canvas.addEventListener('pointerleave', onPointerLeave);
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
    document.addEventListener('visibilitychange', onVisibility);

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(init, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="playground-canvas" aria-hidden="true" />;
}
