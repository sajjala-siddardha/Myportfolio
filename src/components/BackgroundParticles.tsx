import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  depth: number;
  seed: number;
};

interface Props {
  activeSection: string;
}

const SECTION_BASE_HUES: Record<string, number> = {
  home: 0,
  projects: 210,
  certificates: 120,
  skills: 45,
  resources: 280,
  contact: 180,
};

const BackgroundParticles = ({ activeSection }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const isMobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const COUNT = isMobile ? 70 : 140;
    const LINK_DIST = isMobile ? 120 : 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* 🎯 CREATE PARTICLES */
    const particles: Particle[] = Array.from({ length: COUNT }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const depth = Math.random() * 0.7 + 0.3;
      const speed = depth * (0.12 + Math.random() * 0.25);

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        hue:
          (SECTION_BASE_HUES[activeSection] ?? 0) +
          Math.random() * 30 -
          15,
        depth,
        seed: Math.random() * 1000,
      };
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      const baseHue = SECTION_BASE_HUES[activeSection] ?? 0;

      /* UPDATE PARTICLES */
      particles.forEach((p) => {
        // Flow field (gives crazy organic motion)
        const angle =
          Math.sin(t + p.seed) * Math.PI +
          Math.cos((p.y + t * 100) * 0.002);

        p.vx += Math.cos(angle) * 0.002 * p.depth;
        p.vy += Math.sin(angle) * 0.002 * p.depth;

        // Mouse magnetic distortion
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 240) {
          p.vx += dx * 0.000015 * p.depth;
          p.vy += dy * 0.000015 * p.depth;
        }

        // Soft damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Infinite loop edges
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.y < -10) p.y = canvas.height + 10;

        // Smooth color drift
        p.hue += (baseHue - p.hue) * 0.01;
      });

      /* 🕸️ WEB CONNECTIONS */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DIST) {
            const strength = 1 - dist / LINK_DIST;
            const alpha = strength * 0.18;

            const cx = (a.x + b.x) / 2 + dy * 0.1;
            const cy = (a.y + b.y) / 2 - dx * 0.1;

            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${alpha})`;
            ctx.lineWidth = 1.4 * a.depth;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(cx, cy, b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* ✨ DRAW PARTICLES */
      particles.forEach((p) => {
        ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${
          0.55 + p.depth * 0.4
        })`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + p.depth, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [activeSection]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default BackgroundParticles;
