import { Home, Code, Award, Wrench, BookOpen, Mail } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

interface SideNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "projects", icon: Code, label: "Projects" },
  { id: "certificates", icon: Award, label: "Certificates" },
  { id: "skills", icon: Wrench, label: "Skills" },
  { id: "resources", icon: BookOpen, label: "Resources" },
  { id: "contact", icon: Mail, label: "Contact" },
];

/* ================= ICON ANIMATIONS ================= */

const iconVariants: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.15,
    transition: { duration: 0.25 },
  },
  active: {
    scale: [1, 1.12, 1],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const SideNav = ({ activeSection, onSectionChange }: SideNavProps) => {
  const [splash, setSplash] = useState(false);

  const handleClick = (id: string) => {
    setSplash(true);
    setTimeout(() => setSplash(false), 450);
    onSectionChange(id);
  };

  return (
    <>
      {/* ===== VENOM SPLASH (UNCHANGED) ===== */}
      {splash && <div className="venom-splash-circle" />}

      {/* ================= DESKTOP ================= */}
      <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <ul className="flex flex-col items-center gap-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              // 🔧 ADDED group
              <li key={item.id} className="relative group">
                <motion.button
                  onClick={() => handleClick(item.id)}
                  variants={iconVariants}
                  initial="idle"
                  animate={isActive ? "active" : "idle"}
                  whileHover="hover"
                  className="
                    bg-transparent
                    p-0
                    border-0
                    outline-none
                    shadow-none
                    appearance-none
                  "
                >
                  <div
                    className={`
                      relative w-14 h-14 rounded-full
                      flex items-center justify-center
                      overflow-hidden
                      border
                      ${
                        isActive
                          ? "border-red-500 shadow-[0_0_22px_rgba(239,68,68,0.75)]"
                          : "border-white/30"
                      }
                    `}
                  >
                    <span className="venom-bubble" />
                    <span className="venom-bubble delay" />

                    {isActive && <span className="web-ring-red" />}

                    <Icon
                      className={`relative z-10 w-6 h-6 ${
                        isActive ? "text-red-500" : "text-white/70"
                      }`}
                    />
                  </div>
                </motion.button>

                {/* 🔧 FIXED LABEL */}
                <span
                  className="
                    absolute right-full mr-4 top-1/2 -translate-y-1/2
                    px-3 py-1.5 rounded-md text-xs font-semibold
                    bg-black/90 text-white/80
                    border border-white/20
                    opacity-0 group-hover:opacity-100
                    transition-opacity
                    pointer-events-none whitespace-nowrap
                  "
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ================= MOBILE (UNCHANGED) ================= */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <ul className="flex items-center justify-center gap-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleClick(item.id)}
                variants={iconVariants}
                initial="idle"
                animate={isActive ? "active" : "idle"}
                className="
                  bg-transparent
                  p-0
                  border-0
                  outline-none
                  shadow-none
                  appearance-none
                "
              >
                <div
                  className={`
                    relative w-12 h-12 rounded-full
                    flex items-center justify-center
                    overflow-hidden
                    border
                    ${
                      isActive
                        ? "border-red-500 shadow-[0_0_18px_rgba(239,68,68,0.7)]"
                        : "border-white/30"
                    }
                  `}
                >
                  <span className="venom-bubble" />
                  {isActive && <span className="web-ring-red" />}
                  <Icon
                    className={`relative z-10 w-5 h-5 ${
                      isActive ? "text-red-500" : "text-white/70"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </ul>
      </nav>

      {/* ================= CSS (UNCHANGED) ================= */}
      <style>{`
        .venom-splash-circle {
          position: fixed;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(239,68,68,0.25),
            rgba(0,0,0,0.95) 65%
          );
          animation: splashFade 0.45s ease-out;
          z-index: 40;
          pointer-events: none;
        }

        @keyframes splashFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .venom-bubble {
          position: absolute;
          width: 140%;
          height: 140%;
          background: radial-gradient(
            circle,
            rgba(239,68,68,0.2),
            transparent 60%
          );
          animation: bubble 4s infinite ease-in-out;
        }

        .venom-bubble.delay {
          animation-delay: 2s;
        }

        @keyframes bubble {
          0% { transform: scale(0.9); opacity: 0.25; }
          50% { transform: scale(1.2); opacity: 0.45; }
          100% { transform: scale(0.9); opacity: 0.25; }
        }

        .web-ring-red {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          border: 1px dashed rgba(239,68,68,0.9);
          animation: webSpin 6s linear infinite;
        }

        @keyframes webSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default SideNav;
