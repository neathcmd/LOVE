import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Letter {
  id: number;
  title: string;
  content: string;
  emoji: string;
}

// Letter Component
const Letter: React.FC<{ letter: Letter }> = ({ letter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      } p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <button
        className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`letter-content-${letter.id}`}
      >
        <h3 className="text-xl font-semibold pr-4">{letter.title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-2xl"
        >
          {letter.emoji}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`letter-content-${letter.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {letter.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="py-12 px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
    {children}
  </section>
);

const Letters: React.FC = () => {
  const { theme } = useTheme();

  const letters: Letter[] = [
    {
      id: 1,
      title: "Coming Soon...",
      content: "Loading...",
      emoji: "",
    },
    {
      id: 2,
      title: "Coming Soon...",
      content: "Loading...",
      emoji: "",
    },
    {
      id: 3,
      title: "Coming Soon...",
      content: "Loading...",
      emoji: "",
    },
    {
      id: 4,
      title: "Coming Soon...",
      content: "Loading....",
      emoji: "",
    },
  ];

  return (
    <Section title="Open When...">
      <div className="max-w-4xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          } p-6 rounded-xl`}
        >
          {letters.length > 0 ? (
            letters.map((letter) => <Letter key={letter.id} letter={letter} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No letters available.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Letters;
