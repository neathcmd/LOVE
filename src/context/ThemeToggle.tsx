import React from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  position?: "fixed" | "static";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  position = "static",
}) => {
  // Use the theme context
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Dynamic position class
  const positionClass = position === "fixed" ? "fixed top-4 right-4" : "";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${positionClass} ${className}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-yellow-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
