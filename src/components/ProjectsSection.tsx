import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

/* ================= PROJECT IMAGES (DIRECT UPLOAD) ================= */

import MyPortfolioIMG from "@/assets/projects/myportfolio.png";
import TraderIMG from "@/assets/projects/trader-sentiment.png";
import JobAIIMG from "@/assets/projects/ai-job-recommendation.png";
import SoloIMG from "@/assets/projects/solo-leveling.png";
import SpamIMG from "@/assets/projects/email-spam.png";
import WatchwaveIMG from "@/assets/projects/watchwave.png";
import JarvisIMG from "@/assets/projects/jarvis-ai.png";

/* ================= PROJECT DATA (ONLY CONTENT CHANGED) ================= */

const projects = [
  {
    title: "MyPortfolio · Developer Showcase",
    category: "Frontend / Branding",
    description:
      "Personal developer portfolio built using React, TypeScript, TailwindCSS and Vite.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: MyPortfolioIMG,
    glow: "rgba(255,255,255,0.65)", // 🤍 WHITE
    github: "https://github.com/your-username/Myportfolio",
    live: "https://your-portfolio-link.com",
  },
  {
    title: "TraderPulse · Market Sentiment Analysis",
    category: "Data Science / Finance",
    description:
      "Trader behavior and market sentiment analysis using historical trading data and Jupyter notebooks.",
    tags: ["Python", "Data Science", "Jupyter"],
    image: TraderIMG,
    glow: "rgba(59,130,246,0.6)", // BLUE
    github: "https://github.com/sajjala-siddardha/trader-behavior-market-sentiment-analysis/tree/main/ds_sajjala_siddardha",
    live: "https://github.com/sajjala-siddardha/trader-behavior-market-sentiment-analysis/blob/main/ds_sajjala_siddardha/outputs/avg_closed_pnl_by_sentiment.png",
  },
  {
    title: "CareerAI · Job Recommendation System",
    category: "AI / Career Tech",
    description:
      "AI-powered resume analysis and job recommendation system with ML-based matching.",
    tags: ["Python", "AI", "ML"],
    image: JobAIIMG,
    glow: "rgba(34,197,94,0.6)", // GREEN
    github: "https://github.com/sajjala-siddardha/AI-Job-Recommendation-System",
    live: "https://jobs-recommendation-system.streamlit.app/",
  },
  {
    title: "SoloLeveling · Training System",
    category: "AI Training Platform",
    description:
      "Gamified AI training system inspired by Solo Leveling with progression mechanics.",
    tags: ["TypeScript", "AI", "Gamification"],
    image: SoloIMG,
    glow: "rgba(168,85,247,0.6)", // PURPLE
    github: "https://github.com/sajjala-siddardha/Solo-Leveling-Training-System",
    live: "https://solo-leveling-levelup.vercel.app/",
  },
  {
    title: "SpamShield · Email Security AI",
    category: "Cybersecurity / AI",
    description:
      "AI-powered spam & phishing detector using ML, URL analysis and risk scoring dashboard.",
    tags: ["Python", "ML", "Security"],
    image: SpamIMG,
    glow: "rgba(239,68,68,0.6)", // RED
    github: "https://github.com/sajjala-siddardha/email-spam-detector",
    live: "https://email-spam-detector-score.streamlit.app/",
  },
  {
    title: "WatchWave · Streaming Platform",
    category: "OTT / Web Platform",
    description:
      "Netflix-inspired streaming UI with authentication, watchlist and modern UX.",
    tags: ["JavaScript", "Firebase", "UI"],
    image: WatchwaveIMG,
    glow: "rgba(250,204,21,0.6)", // YELLOW
    github: "https://github.com/sajjala-siddardha/watchwave",
    live: "https://watchwave-watch.vercel.app/home.html",
  },
  {
    title: "JARVIS · AI Voice Assistant",
    category: "AI Assistant / Automation",
    description:
      "Voice-controlled AI assistant for automation, system control and intelligent responses.",
    tags: ["Python", "AI", "Speech"],
    image: JarvisIMG,
    glow: "rgba(236,72,153,0.6)", // PINK
    github: "https://github.com/sajjala-siddardha/jarvis-ai",
    live: "https://github.com/sajjala-siddardha/jarvis-ai",
  },
];

/* ================= EXISTING ANIMATIONS (UNCHANGED) ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ================= COMPONENT ================= */

const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 flex items-center">

      {/* 🔥 GLITCH CSS — ONLY FOR THIS PAGE */}
      <style>{`
        @keyframes project-glitch-1 {
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(-2px, -1px); opacity: .7; }
          40% { transform: translate(2px, 1px); opacity: .5; }
          60% { transform: translate(-1px, 2px); opacity: .7; }
          80% { transform: translate(1px, -2px); opacity: .5; }
          100% { transform: translate(0); opacity: 1; }
        }
        @keyframes project-glitch-2 {
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(2px, 1px); opacity: .6; }
          40% { transform: translate(-2px, -1px); opacity: .4; }
          60% { transform: translate(1px, -2px); opacity: .6; }
          80% { transform: translate(-1px, 2px); opacity: .4; }
          100% { transform: translate(0); opacity: 1; }
        }
        .project-glitch-1 { animation: project-glitch-1 1.4s infinite linear; }
        .project-glitch-2 { animation: project-glitch-2 1.1s infinite linear; }
      `}</style>

      <div className="max-w-6xl mx-auto w-full">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center mb-16 text-4xl md:text-5xl font-extrabold tracking-widest text-red-500"
        >
          <span className="absolute inset-0 text-zinc-300 project-glitch-1">
            My Projects
          </span>
          <span className="absolute inset-0 text-red-800 project-glitch-2">
            My Projects
          </span>
          My Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: `0 0 40px ${project.glow}`,
              }}
              className="project-card group"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* HOVER ICONS */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-card/90 border border-accent flex items-center justify-center"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-card/90 border border-accent flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="text-xs text-accent uppercase tracking-wider font-semibold">
                  🕷️ {project.category}
                </span>

                <h3 className="font-display text-2xl mt-2 mb-3 tracking-wide bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 text-xs bg-secondary/50 border border-border rounded-full"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
