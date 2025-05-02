import React, { useState } from "react";
import SecondDate from "../assets/FirstDate.jpg";
import FirstDate from "../assets/SecondDate.jpg";
import ThirtDate from "../assets/Thirt.jpg";
import { useTheme } from "../context/ThemeContext";

// Types
interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
}

// Sample Data
const memories: Memory[] = [
  {
    id: "memory1",
    date: "2025-02-16",
    title: "The day we met",
    description: "Our journey began from this photo",
    image: FirstDate,
    tags: ["holiday"],
  },
  {
    id: "memory2",
    date: "2025-03-01",
    title: "First Time Coffee Data",
    description: "A nice afternoon with a cup of coffee.",
    image: SecondDate,
    tags: ["holiday"],
  },
  {
    id: "memory3",
    date: "2025-05-01",
    title: "At a cafe",
    description: "A nice holiday with you at a coffee shop near out school.",
    image: ThirtDate,
    tags: ["holiday"],
  },
];

// Format date function
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Memory Card Component
const MemoryCard: React.FC<{ memory: Memory }> = ({ memory }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
        theme === "dark" ? "bg-gray-800 " : "bg-white"
      }`}
    >
      <div className="relative overflow-hidden rounded-md mb-4">
        <img
          src={memory.image}
          alt={memory.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm text-gray-700 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {formatDate(memory.date)}
        </div>
      </div>

      <h3
        className={`text-xl font-semibold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-600"
        }`}
      >
        {memory.title}
      </h3>

      <p
        className={`text-gray-700 mt-2 flex-grow ${
          isExpanded ? "" : "line-clamp-2"
        } ${theme === "dark" ? "text-white" : "text-gray-600"}`}
      >
        {memory.description}
      </p>

      {memory.description.length > 100 && (
        <button
          onClick={toggleExpand}
          className="text-blue-500 dark:text-blue-400 mt-2 text-sm hover:underline focus:outline-none"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}

      {memory.tags && memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {memory.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Memory Grid Component
const MemoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
};

export { MemoryCard, MemoryGrid, memories };
