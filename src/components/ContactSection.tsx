import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

/* ================= EMAILJS CONFIG (SAFE) ================= */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATE_REPLY = import.meta.env.VITE_EMAILJS_AUTOREPLY_ID;
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const OWNER_EMAIL = "siddardhagaming@gmail.com";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  /* 🛡️ SPAM PROTECTION */
  const [honeypot, setHoneypot] = useState("");
  const lastSentRef = useRef<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    /* 🤖 BOT CHECK (HONEYPOT) */
    if (honeypot) {
      console.warn("Bot detected");
      return;
    }

    /* ⏱ RATE LIMIT (20 SECONDS) */
    const now = Date.now();
    if (now - lastSentRef.current < 20000) {
      alert("Please wait before sending another message.");
      return;
    }

    /* ✉️ MESSAGE QUALITY CHECK */
    if (formData.message.trim().length < 10) {
      alert("Message is too short.");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ SEND MESSAGE TO YOU */
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_CONTACT,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      /* 2️⃣ AUTO-REPLY (DON’T SEND TO YOURSELF) */
      if (formData.email !== OWNER_EMAIL) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_REPLY,
          {
            from_name: formData.name,
            from_email: formData.email,
          },
          PUBLIC_KEY
        );
      }

      lastSentRef.current = Date.now();
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);

    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("❌ Message not sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* 🔥 GLITCH TITLE */}
        <div className="relative mb-16 text-center">
          <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-widest text-red-500">
            <span className="absolute inset-0 text-zinc-50 animate-glitch-1">
              GET IN TOUCH
            </span>
            <span className="absolute inset-0 text-red-800 animate-glitch-2">
              GET IN TOUCH
            </span>
            GET IN TOUCH
          </h2>
        </div>

        {/* ✅ SUCCESS MESSAGE */}
        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
              mb-6 text-center
              text-green-400
              border border-green-500/30
              bg-green-500/10
              rounded-xl
              py-3
            "
          >
            ✅ Thanks! I’ll contact you shortly.
          </motion.div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 🤖 HONEYPOT (HIDDEN FIELD) */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-6 py-4 bg-card/50 border border-border rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-6 py-4 bg-card/50 border border-border rounded-xl"
            required
          />

          <textarea
            placeholder="Message"
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-6 py-4 bg-card/50 border border-border rounded-xl resize-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="ghost-button w-full flex items-center justify-center gap-2"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm uppercase tracking-wider">
            Or Connect Via
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* 🔗 SOCIAL LINKS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-14"
        >
          <motion.a
            href="mailto:siddardhagaming@gmail.com"
            whileHover={{ y: -6, scale: 1.15, backgroundColor: "#ef4444" }}
            className="w-14 h-14 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:text-white"
          >
            <Mail className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://github.com/sajjala-siddardha"
            target="_blank"
            whileHover={{ y: -6, scale: 1.15, backgroundColor: "#ef4444" }}
            className="w-14 h-14 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:text-white"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/sajjala-siddardha-84685928b/"
            target="_blank"
            whileHover={{ y: -6, scale: 1.15, backgroundColor: "#ef4444" }}
            className="w-14 h-14 rounded-full border border-red-500 flex items-center justify-center text-red-500 hover:text-white"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* 🔥 GLITCH KEYFRAMES */}
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
          animation: glitch1 1.4s infinite;
        }

        .animate-glitch-2 {
          animation: glitch2 1.4s infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
