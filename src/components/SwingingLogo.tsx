import venomLogo from "@/assets/venom-logo.png";

const SwingingLogo = () => {
  return (
    <div className="fixed top-0 left-4 z-50 pointer-events-none">

      {/* CONTINUOUS SWING — NO CENTER PAUSE */}
      <style>{`
        @keyframes continuousSwing {
          0%   { transform: rotate(-10deg); }
          50%  { transform: rotate(10deg); }
          100% { transform: rotate(-10deg); }
        }

        .continuous-swing {
          transform-origin: top center;
          animation: continuousSwing 2.2s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* WHOLE HANGING OBJECT */}
      <div className="continuous-swing pt-8">
        <div className="relative flex justify-center">
          <img
            src={venomLogo}
            alt="Venom"
            className="w-16 h-auto object-contain"
            style={{
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SwingingLogo;
