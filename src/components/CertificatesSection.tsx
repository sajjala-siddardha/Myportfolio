import { motion } from "framer-motion";
import { useState } from "react";

/* ================= IMAGES ================= */

import AIAdvanceIMG from "@/certificates/AI_Advance.png";
import AIFoundationIMG from "@/certificates/AI_Foundation.png";
import AnalyticsIMG from "@/certificates/analytic_vidya_python.png";
import AWSIMG from "@/certificates/aws.png";
import Ben10IMG from "@/certificates/ben10x.png";
import ChatGPTIMG from "@/certificates/chatgpt.png";
import DataAnalystIMG from "@/certificates/data_anlsts.png";
import GoogleIMG from "@/certificates/google.png";
import GoogleAIMLIMG from "@/certificates/google_certificate_(AIML).png";
import JavaIMG from "@/certificates/java_full_stack.png";
import MLConnectIMG from "@/certificates/mlconnect.png";
import MasterIMG from "@/certificates/sajjala_siddardha_certificate_(1).png";

/* ================= PDFs (?url) ================= */

import AIAdvancePDF from "@/certificates/AI_Advance.pdf?url";
import AIFoundationPDF from "@/certificates/AI_Foundation.pdf?url";
import AnalyticsPDF from "@/certificates/analytic_vidya_python.pdf?url";
import AWSPDF from "@/certificates/aws.pdf?url";
import Ben10PDF from "@/certificates/ben10x.pdf?url";
import ChatGPTPDF from "@/certificates/chatgpt.pdf?url";
import DataAnalystPDF from "@/certificates/data_anlsts.pdf?url";
import GooglePDF from "@/certificates/google.pdf?url";
import GoogleAIMLPDF from "@/certificates/google_certificate_(AIML).pdf?url";
import JavaPDF from "@/certificates/java_full_stack.pdf?url";
import MLConnectPDF from "@/certificates/mlconnect.pdf?url";
import MasterPDF from "@/certificates/sajjala_siddardha_certificate_(1).pdf?url";

/* ================= DATA ================= */

const certificates = [
  { title: "AI Advance", provider: "AI Program", img: AIAdvanceIMG, pdf: AIAdvancePDF, glow: "rgba(239,68,68,0.6)" },
  { title: "AI Foundation", provider: "AI Program", img: AIFoundationIMG, pdf: AIFoundationPDF, glow: "rgba(59,130,246,0.6)" },
  { title: "Analytics Vidhya Python", provider: "Analytics Vidhya", img: AnalyticsIMG, pdf: AnalyticsPDF, glow: "rgba(16,185,129,0.6)" },
  { title: "AWS Certification", provider: "Amazon", img: AWSIMG, pdf: AWSPDF, glow: "rgba(250,204,21,0.6)" },
  { title: "Ben 10X", provider: "Ben 10X", img: Ben10IMG, pdf: Ben10PDF, glow: "rgba(139,92,246,0.6)" },
  { title: "ChatGPT Advanced", provider: "OpenAI", img: ChatGPTIMG, pdf: ChatGPTPDF, glow: "rgba(236,72,153,0.6)" },
  { title: "Data Analyst", provider: "Data Program", img: DataAnalystIMG, pdf: DataAnalystPDF, glow: "rgba(34,197,94,0.6)" },
  { title: "Google Certification", provider: "Google", img: GoogleIMG, pdf: GooglePDF, glow: "rgba(59,130,246,0.6)" },
  { title: "Google AIML", provider: "Google", img: GoogleAIMLIMG, pdf: GoogleAIMLPDF, glow: "rgba(14,165,233,0.6)" },
  { title: "Java Full Stack", provider: "Training Program", img: JavaIMG, pdf: JavaPDF, glow: "rgba(245,158,11,0.6)" },
  { title: "ML Connect", provider: "ML Program", img: MLConnectIMG, pdf: MLConnectPDF, glow: "rgba(168,85,247,0.6)" },
  { title: "Master Certificate", provider: "Sajjala Siddardha", img: MasterIMG, pdf: MasterPDF, glow: "rgba(190,24,93,0.6)" },
];

/* ================= COMPONENT ================= */

const CertificatesSection = () => {
  const [openPDF, setOpenPDF] = useState<string | null>(null);

  return (
    <section id="certificates" className="min-h-screen py-20 px-4">

      {/* 🔥 GLITCH CSS — UNCHANGED */}
      <style>{`
        @keyframes glitch1 {
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(-2px, -2px); opacity: .7; }
          40% { transform: translate(2px, 2px); opacity: .5; }
          60% { transform: translate(-1px, 1px); opacity: .7; }
          80% { transform: translate(1px, -1px); opacity: .5; }
          100% { transform: translate(0); opacity: 1; }
        }
        @keyframes glitch2 {
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(2px, 2px); opacity: .6; }
          40% { transform: translate(-2px, -2px); opacity: .4; }
          60% { transform: translate(1px, -2px); opacity: .6; }
          80% { transform: translate(-1px, 2px); opacity: .4; }
          100% { transform: translate(0); opacity: 1; }
        }
        .glitch-1 { animation: glitch1 1.4s infinite linear; }
        .glitch-2 { animation: glitch2 1.1s infinite linear; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="relative text-center mb-16">
          <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-widest text-red-500">
            <span className="absolute inset-0 text-zinc-300 glitch-1">MY CERTIFICATES</span>
            <span className="absolute inset-0 text-red-800 glitch-2">MY CERTIFICATES</span>
            MY CERTIFICATES
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.title}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenPDF(cert.pdf);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              whileHover={{
                scale: 1.06,
                boxShadow: `0 0 40px ${cert.glow}`,
              }}
              className="cursor-pointer block rounded-xl overflow-hidden bg-black border border-white/10"
            >
              <div className="relative h-48">
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                <p className="text-sm text-zinc-400">{cert.provider}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= PDF MODAL ================= */}
      {openPDF && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setOpenPDF(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            ✕
          </button>

          <iframe
            src={openPDF}
            className="w-[95%] h-[90%] rounded-lg border border-white/20"
          />
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
