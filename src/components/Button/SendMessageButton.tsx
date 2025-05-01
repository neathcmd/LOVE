import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { MessageSquare, Heart } from "lucide-react";
import { useState } from "react";
import "../../style/animation.css";

const SendMessageButton = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="sent-messages"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full max-w-[12em] flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
        theme === "dark"
          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
      } shadow-lg hover:shadow-xl active:scale-95 transform transition-all duration-300 overflow-hidden`}
    >
      {/* Enhanced Glowing Effect - More visible on hover */}
      <span
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/40 to-blue-400/40 opacity-0 ${
          isHovered ? "opacity-100" : "opacity-30"
        } transition-opacity duration-500 ${
          isHovered ? "animate-pulse-slow" : ""
        }`}
      ></span>

      {/* Always visible pulsing heart */}
      <div className="absolute -top-3 -right-3">
        <Heart
          size={20}
          className="text-pink-500 animate-constant-pulse fill-pink-500/80"
        />
      </div>

      <span className="relative z-10">Send Message</span>
      <MessageSquare size={18} className="relative z-10" />

      {/* Enhanced Sparkle Effect */}
      <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              opacity: 0,
              animation: `sparkle ${Math.random() * 3 + 2}s infinite ${
                Math.random() * 1
              }s`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </span>

      {/* Subtle Ripple Effect */}
      <span
        className={`absolute inset-0 rounded-lg bg-white/10 ${
          isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
        } transition-all duration-700 ease-in-out`}
      ></span>
    </Link>
  );
};

export default SendMessageButton;
