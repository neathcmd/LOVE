import React from "react";
import { useTheme } from "../context/ThemeContext";
// Define constants outside component to prevent re-creation
const CURRENT_YEAR = new Date().getFullYear();
const REPO_LINK = "https://github.com/your-repo/our-love-story";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`
        text-center py-8 transition-colors duration-200 border-t border-gray-600
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-300"
            : "bg-white text-gray-600"
        }
      `}
      aria-label="Website footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-base sm:text-lg font-medium">
          Crafted with{" "}
          <span
            className="text-pink-500 dark:text-pink-400 animate-pulse inline-block"
            aria-hidden="true"
          >
            ♥
          </span>{" "}
          for you
        </p>
        <div className="flex justify-center items-center gap-4">
          <p className="text-sm sm:text-base">
            © {CURRENT_YEAR}{" "}
            <a
              href={REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-pink-600 dark:text-pink-400 
                hover:text-pink-700 dark:hover:text-pink-300 
                transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-pink-500
              "
              aria-label="Visit Our Love Story GitHub repository"
            >
              Our Love Story
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
