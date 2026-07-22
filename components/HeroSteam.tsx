"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  life: number;
  maxLife: number;
};

// Steam wisps rising from the hero bowl. Particles drift upward and curl
// gently away from the cursor, like real steam being disturbed by a hand
// passing near it. Falls back to a static glow under reduced motion.
export default function HeroSteam({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): Particle => ({
      x: width * 0.5 + (Math.random() - 0.5) * width * 0.32,
      y: height * 0.82 + Math.random() * height * 0.08,
      r: 18 + Math.random() * 26,
      speed: 0.28 + Math.random() * 0.32,
      drift: (Math.random() - 0.5) * 0.4,
      life: 0,
      maxLife: 220 + Math.random() * 140,
    });

    resize();
    particles = Array.from({ length: 14 }, spawn);

    const onResize = () => resize();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.life++;
        p.y -= p.speed;
        p.x += Math.sin((p.life + frame * 0) * 0.02) * p.drift;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const push = (90 - dist) / 90;
          p.x += (dx / (dist || 1)) * push * 6;
        }

        const t = p.life / p.maxLife;
        const fadeIn = Math.min(t / 0.15, 1);
        const fadeOut = Math.max(0, 1 - (t - 0.6) / 0.4);
        const alpha = Math.min(fadeIn, fadeOut) * 0.16;

        if (alpha > 0.003) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grad.addColorStop(0, `rgba(245, 237, 225, ${alpha})`);
          grad.addColorStop(1, "rgba(245, 237, 225, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.y < -p.r) {
          Object.assign(p, spawn(), { life: 0 });
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full motion-reduce:hidden ${className}`}
    />
  );
}
