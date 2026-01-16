import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Database,
  Wrench,
  BarChart,
  Cloud,
  Users,
  MessageCircle,
} from "lucide-react";

/* ================= COLOR THEMES ================= */

const colorThemes = [
  {
    glow: "rgba(239,68,68,0.5)",
    gradient: "from-red-500/20 via-rose-500/10 to-transparent",
    iconBg: "bg-red-500/20 border-red-500/40",
    iconText: "text-red-400",
    badgeBg: "rgba(239,68,68,0.15)",
    badgeBorder: "rgba(239,68,68,0.6)",
  },
  {
    glow: "rgba(59,130,246,0.5)",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-blue-500/20 border-blue-500/40",
    iconText: "text-blue-400",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeBorder: "rgba(59,130,246,0.6)",
  },
  {
    glow: "rgba(16,185,129,0.5)",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    iconBg: "bg-emerald-500/20 border-emerald-500/40",
    iconText: "text-emerald-400",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeBorder: "rgba(16,185,129,0.6)",
  },
  {
    glow: "rgba(139,92,246,0.5)",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    iconBg: "bg-purple-500/20 border-purple-500/40",
    iconText: "text-purple-400",
    badgeBg: "rgba(139,92,246,0.15)",
    badgeBorder: "rgba(139,92,246,0.6)",
  },
  {
    glow: "rgba(250,204,21,0.5)",
    gradient: "from-amber-400/25 via-yellow-400/10 to-transparent",
    iconBg: "bg-amber-400/25 border-amber-400/40",
    iconText: "text-amber-400",
    badgeBg: "rgba(250,204,21,0.18)",
    badgeBorder: "rgba(250,204,21,0.6)",
  },
  {
    glow: "rgba(229,231,235,0.6)",
    gradient: "from-white/30 via-zinc-200/20 to-transparent",
    iconBg: "bg-white/30 border-zinc-300/60",
    iconText: "text-zinc-600",
    badgeBg: "rgba(229,231,235,0.25)",
    badgeBorder: "rgba(161,161,170,0.6)",
  },
];

/* ================= DATA ================= */

const skillCategories = [
  {
    title: "Programming & Core Tech",
    icon: Code,
    skills: ["Python", "JavaScript", "TypeScript", "C", "Java", "SQL"],
  },
  {
    title: "Web Development",
    icon: Cloud,
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "REST APIs"],
  },
  {
    title: "Machine Learning & AI",
    icon: Brain,
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
  },
  {
    title: "Data & Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Pandas", "NumPy"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Linux", "AWS Basics", "Postman"],
  },
  {
    title: "Data Visualization",
    icon: BarChart,
    skills: ["Matplotlib", "Seaborn", "Plotly", "Power BI"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: [
      "Problem Solving",
      "Critical Thinking",
      "Team Collaboration",
      "Adaptability",
      "Time Management",
    ],
  },
  {
    title: "Communication & Growth",
    icon: MessageCircle,
    skills: [
      "Communication",
      "Presentation",
      "Technical Writing",
      "Learning Mindset",
    ],
  },
];

/* ================= COMPONENT ================= */

const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 GLITCH TITLE */}
        <div className="relative mb-16 text-center">
          <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-widest text-red-500">
            <span className="absolute inset-0 text-zinc-50 animate-glitch-1">
              MY SKILLS
            </span>
            <span className="absolute inset-0 text-red-800 animate-glitch-2">
              MY SKILLS
            </span>
            MY SKILLS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            const theme = colorThemes[idx % colorThemes.length];

            return (
              <motion.div
                key={category.title}
                whileHover={{
                  scale: 1.06,
                  boxShadow: `0 0 45px ${theme.glow}`,
                }}
                whileTap={{
                  scale: 1.05,
                  boxShadow: `0 0 45px ${theme.glow}`,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className={`
                  rounded-2xl p-6
                  bg-background/90
                  border border-border
                  backdrop-blur-md
                  bg-gradient-to-br ${theme.gradient}
                `}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  whileTap={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl ${theme.iconBg} border flex items-center justify-center mb-4 mx-auto`}
                >
                  <Icon className={`w-7 h-7 ${theme.iconText}`} />
                </motion.div>

                <h3 className="font-display text-xl text-center mb-6">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-4 justify-center">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        scale: 1.12,
                        backgroundColor: theme.badgeBg,
                        borderColor: theme.badgeBorder,
                      }}
                      whileTap={{
                        scale: 1.12,
                        backgroundColor: theme.badgeBg,
                        borderColor: theme.badgeBorder,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                      }}
                      className="
                        px-6 py-2 text-sm
                        rounded-full
                        bg-secondary/40
                        border border-border
                        whitespace-nowrap
                      "
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ✅ REQUIRED GLITCH ANIMATIONS (THIS WAS MISSING) */}
      <style>{`
        @keyframes glitch1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }

        .animate-glitch-1 {
          animation: glitch1 1.5s infinite;
        }

        .animate-glitch-2 {
          animation: glitch2 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
