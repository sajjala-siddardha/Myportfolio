import { motion } from "framer-motion";
import {
  Github,
  Code,
  ExternalLink,
  Database,
  Terminal,
  Cloud,
  Layout,
  Cpu,
  Server,
  Shield,
  BookOpen,
  Zap,
  Flame,
  Droplet,
  Sparkles,
  Bug,
  Layers,
  Brain,
} from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */

type ResourceType = "link" | "pdf";

interface Resource {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  type: ResourceType;
  url: string;
}

/* ================= COLOR THEMES (NO BLACK, GIT=WHITE, LINUX=RED) ================= */

const themeMap: Record<string, { gradient: string; glow: string }> = {
  Git: {
    gradient: "from-white via-gray-100 to-gray-300",
    glow: "rgba(229,231,235,0.9)",
  },
  Linux: {
    gradient: "from-red-500 via-rose-500 to-red-600",
    glow: "rgba(239,68,68,0.65)",
  },
  Web: {
    gradient: "from-pink-400 via-fuchsia-500 to-purple-500",
    glow: "rgba(236,72,153,0.55)",
  },
  ML: {
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "rgba(59,130,246,0.55)",
  },
  DL: {
    gradient: "from-amber-400 via-orange-500 to-amber-600",
    glow: "rgba(251,146,60,0.55)",
  },
  DevOps: {
    gradient: "from-emerald-400 via-green-500 to-emerald-600",
    glow: "rgba(16,185,129,0.55)",
  },
  Security: {
    gradient: "from-rose-500 via-red-600 to-rose-700",
    glow: "rgba(244,63,94,0.6)",
  },
  Data: {
    gradient: "from-cyan-400 via-teal-500 to-cyan-600",
    glow: "rgba(45,212,191,0.55)",
  },
  Cloud: {
    gradient: "from-indigo-400 via-violet-500 to-indigo-600",
    glow: "rgba(139,92,246,0.55)",
  },
  Default: {
    gradient: "from-neutral-300 via-neutral-200 to-neutral-400",
    glow: "rgba(163,163,163,0.4)",
  },
};

/* ================= 26 RESOURCES ================= */

const resources: Resource[] = [
  { title: "Git Commands", category: "Git", description: "Git workflows & commands.", icon: Github, type: "link", url: "https://git-scm.com/docs" },
  { title: "Linux Command Line", category: "Linux", description: "Linux terminal essentials.", icon: Terminal, type: "link", url: "https://linuxcommand.org/" },

  { title: "Frontend Roadmap", category: "Web", description: "Modern frontend path.", icon: Layout, type: "link", url: "https://roadmap.sh/frontend" },
  { title: "MDN Web Docs", category: "Web", description: "HTML, CSS, JS docs.", icon: Code, type: "link", url: "https://developer.mozilla.org/" },
  { title: "JavaScript Info", category: "Web", description: "Deep JS tutorials.", icon: Code, type: "link", url: "https://javascript.info/" },

  { title: "Machine Learning Roadmap", category: "ML", description: "ML learning path.", icon: Brain, type: "link", url: "https://roadmap.sh/ai-engineer" },
  { title: "Scikit-Learn Docs", category: "ML", description: "ML library guide.", icon: Cpu, type: "link", url: "https://scikit-learn.org/stable/" },

  { title: "Deep Learning Specialization", category: "DL", description: "Andrew Ng DL course.", icon: Brain, type: "link", url: "https://www.coursera.org/specializations/deep-learning" },
  { title: "PyTorch Tutorials", category: "DL", description: "Deep learning with PyTorch.", icon: Cpu, type: "link", url: "https://pytorch.org/tutorials/" },

  { title: "Pandas Documentation", category: "Data", description: "Data manipulation docs.", icon: Database, type: "link", url: "https://pandas.pydata.org/docs/" },
  { title: "SQL Reference", category: "Data", description: "SQL manual.", icon: Database, type: "pdf", url: "https://cdncontribute.geeksforgeeks.org/wp-content/uploads/SQL-Manual.pdf" },

  { title: "DevOps Roadmap", category: "DevOps", description: "DevOps learning path.", icon: Cloud, type: "link", url: "https://roadmap.sh/devops" },
  { title: "Docker Docs", category: "DevOps", description: "Docker containers.", icon: Zap, type: "link", url: "https://docs.docker.com/" },
  { title: "Kubernetes Docs", category: "DevOps", description: "K8s orchestration.", icon: Cloud, type: "link", url: "https://kubernetes.io/docs/" },

  { title: "Cloud Computing Basics", category: "Cloud", description: "Intro to cloud.", icon: Cloud, type: "link", url: "https://aws.amazon.com/what-is-cloud-computing/" },
  { title: "AWS Well-Architected", category: "Cloud", description: "Cloud best practices.", icon: Cloud, type: "link", url: "https://aws.amazon.com/architecture/well-architected/" },

  { title: "System Design Primer", category: "Security", description: "System design guide.", icon: Layers, type: "link", url: "https://github.com/donnemartin/system-design-primer" },
  { title: "OWASP Top 10", category: "Security", description: "Web security risks.", icon: Shield, type: "link", url: "https://owasp.org/www-project-top-ten/" },

  { title: "Regex Interactive", category: "Web", description: "Learn regex interactively.", icon: Bug, type: "link", url: "https://pycon2016.regex.training/regex-intro" },
  { title: "API Design Best Practices", category: "Web", description: "REST API design.", icon: Droplet, type: "link", url: "https://swagger.io/resources/articles/best-practices-in-api-design/" },

  { title: "CI/CD Pipelines", category: "DevOps", description: "CI/CD concepts.", icon: Sparkles, type: "link", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" },
  { title: "Awesome AI & ML", category: "ML", description: "Curated AI/ML repo.", icon: Github, type: "link", url: "https://github.com/armankhondker/awesome-ai-ml-resources" },

  { title: "Data Science Roadmap", category: "Data", description: "DS learning path.", icon: BookOpen, type: "link", url: "https://roadmap.sh/data-science" },
  { title: "AI Ethics", category: "Security", description: "Responsible AI.", icon: Flame, type: "link", url: "https://www.ibm.com/topics/ai-ethics" },
];

/* ================= COMPONENT ================= */

const ResourcesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="resources" className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 GLITCH TITLE */}
<div className="relative mb-16 text-center">
  <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-widest text-red-500">
    {/* WHITE / ZINC GLITCH LAYER */}
    <span className="absolute inset-0 text-zinc-50 animate-glitch-1">
      MY RESOURCES
    </span>

    {/* SOFT RED GLITCH LAYER */}
    <span className="absolute inset-0 text-red-800 animate-glitch-2">
      MY RESOURCES
    </span>

    {/* MAIN TEXT */}
    MY RESOURCES
  </h2>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => {
            const Icon = r.icon;
            const theme = themeMap[r.category] || themeMap.Default;

            return (
              <motion.div
                key={r.title}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                onTapStart={() => setActiveIndex(i)}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-2xl p-[1px]"
                style={{
                  boxShadow:
                    activeIndex === i ? `0 0 40px ${theme.glow}` : "none",
                }}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${theme.gradient}`}
                  style={{
                    filter: "blur(6px)",
                    opacity: 0.85,
                  }}
                />

                <div className="relative z-10 rounded-2xl bg-background/90 backdrop-blur-md p-5 text-center border border-border">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4 mx-auto`}
                    style={{ boxShadow: `0 0 20px ${theme.glow}` }}
                  >
                    <Icon className="w-7 h-7 text-black" />
                  </div>

                  <h3 className="font-display text-lg mb-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    {r.description}
                  </p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
                  >
                    View Resource
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🔧 GLITCH KEYFRAMES */}
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
        .animate-glitch-1 { animation: glitch1 1.5s infinite; }
        .animate-glitch-2 { animation: glitch2 1.5s infinite; }
      `}</style>
    </section>
  );
};

export default ResourcesSection;
