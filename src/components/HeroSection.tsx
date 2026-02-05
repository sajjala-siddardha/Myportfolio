import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import avatarImg from "../assets/logo.jpg";

/* ------------------ TYPING EFFECT ------------------ */
const titles = [
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Enthusiast",
  "Full Stack Developer",
];

function useTypingEffect(words: string[], speed = 90, delay = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timer: number;

    if (!deleting && text.length < current.length) {
      timer = window.setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        speed
      );
    } else if (deleting && text.length > 0) {
      timer = window.setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        speed / 1.6
      );
    } else if (!deleting && text.length === current.length) {
      timer = window.setTimeout(() => setDeleting(true), delay);
    } else {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, delay]);

  return text;
}

/* ------------------ HERO SECTION ------------------ */
const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const typingText = useTypingEffect(titles);

  /* 🔥 CLICK GLOW COLORS */
  const glowColors = [
    "rgba(239,68,68,0.35)",
    "rgba(59,130,246,0.35)",
    "rgba(34,197,94,0.35)",
    "rgba(168,85,247,0.35)",
    "rgba(255,255,255,0.35)",
  ];
  const [glowIndex, setGlowIndex] = useState(0);

  /* ------------------ PARTICLES ------------------ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const POINTS = Array.from({ length: 90 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * 0.35,
        vy: Math.sin(angle) * 0.35,
        baseVX: Math.cos(angle) * 0.15,
        baseVY: Math.sin(angle) * 0.15,
      };
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      POINTS.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 220) {
          p.vx += dx * 0.00012;
          p.vy += dy * 0.00012;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      for (let i = 0; i < POINTS.length; i++) {
        for (let j = i + 1; j < POINTS.length; j++) {
          const dx = POINTS[i].x - POINTS[j].x;
          const dy = POINTS[i].y - POINTS[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = "rgba(255,255,255,0.05)";
            ctx.beginPath();
            ctx.moveTo(POINTS[i].x, POINTS[i].y);
            ctx.lineTo(POINTS[j].x, POINTS[j].y);
            ctx.stroke();
          }
        }
      }

      POINTS.forEach((p) => {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
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
  }, []);

  return (
    <section className="relative py-20 px-4">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* HERO CARD */}
      <motion.div
        onClick={() =>
          setGlowIndex((prev) => (prev + 1) % glowColors.length)
        }
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35 }}
        style={{
          boxShadow: `0 0 45px ${glowColors[glowIndex]}`,
        }}
        className="
          relative z-10
          max-w-5xl mx-auto
          p-6 sm:p-8 md:p-12
          rounded-2xl
          bg-black/50
          backdrop-blur
          border border-white/10
          cursor-pointer
        "
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* AVATAR */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-4 border-red-500 overflow-hidden">
            <img
              src={avatarImg}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">
              Hi, I’m{" "}
              <span className="text-red-700 font-extrabold">
                Sajjala Siddardha
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6">
              {typingText}
              <span className="animate-pulse ml-1">|</span>
            </h2>

            <div className="text-gray-300 max-w-xl space-y-2 mb-8 mx-auto md:mx-0">
              <p>I design and build intelligent systems.</p>
              <p>I work with AI, ML, and modern full-stack technologies.</p>
              <p>I enjoy solving real-world problems with code.</p>
            </div>

            {/* ✅ FIXED DOWNLOAD LINK (PRODUCTION SAFE) */}
            <a
              href="/siddardha.pdf"
              download
              className="
                inline-flex items-center gap-2
                px-5 py-2.5
                rounded-md
                border border-red-500
                text-red-500
                hover:bg-red-500 hover:text-white
                transition
              "
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>

            <div className="flex gap-4 mt-10 justify-center md:justify-start">
              {[Mail, Github, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href={
                    i === 0
                      ? "mailto:siddardhagaming@gmail.com"
                      : i === 1
                      ? "https://github.com/sajjala-siddardha"
                      : "https://www.linkedin.com/in/sajjala-siddardha-84685928b/"
                  }
                  target="_blank"
                  whileHover={{
                    y: -6,
                    scale: 1.15,
                    backgroundColor: "#d70505ff",
                  }}
                  className="w-11 h-11 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:text-white"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
