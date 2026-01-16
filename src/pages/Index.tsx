import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import background from "@/assets/background.png";
import SwingingLogo from "@/components/SwingingLogo";
import SideNav from "@/components/SideNav";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import SkillsSection from "@/components/SkillsSection";
import ResourcesSection from "@/components/ResourcesSection";
import ContactSection from "@/components/ContactSection";

const sectionComponents: Record<string, React.ComponentType> = {
  home: HeroSection,
  projects: ProjectsSection,
  certificates: CertificatesSection,
  skills: SkillsSection,
  resources: ResourcesSection,
  contact: ContactSection,
};

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔹 BACKGROUND IMAGE (BASE LAYER) */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Venom spread (home only) */}
        {activeSection === "home" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 venom-spread"
          />
        )}

        {/* Dark overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            activeSection === "home"
              ? "bg-background/40"
              : "bg-background/60"
          }`}
        />

        {/* Gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        {/* Red glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
      </div>

      {/* 🔹 FOREGROUND UI */}
      <SwingingLogo />
      <SideNav activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="min-h-screen"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 🔹 TENTACLE DECORATION */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-30 opacity-40">
        <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,100 Q100,60 200,80 T400,70 T600,85 T800,65 T1000,80 T1200,70 L1200,100 Z"
            fill="hsl(0 0% 3%)"
          />
          <path
            d="M0,100 Q150,70 300,90 T600,75 T900,88 T1200,75 L1200,100 Z"
            fill="hsl(0 100% 20% / 0.3)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Index;
