import { useTheme } from "../context/ThemeContext";
import { Heart } from "lucide-react";
import StoriesEN from "../screen/StoriesEN";

const OurStories = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* StoriesEN */}
      <div className="w-full text-center pt-16 pb-8 transition-all duration-700">
        <Heart
          className={`mx-auto mb-4 ${
            theme === "dark" ? "text-pink-400" : "text-pink-500"
          }`}
          size={48}
          fill="currentColor"
        />
        <h1
          className={`text-5xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Love Across the Building
        </h1>
        <p
          className={`mt-4 text-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Our journey from strangers to soulmates
        </p>
      </div>
      {/* detail */}
      <div>
        <StoriesEN />
      </div>

      {/* StoriesKH */}
      <div className="w-full text-center pb-8 transition-all duration-700">
        <Heart
          className={`mx-auto mb-4 ${
            theme === "dark" ? "text-pink-400" : "text-pink-500"
          }`}
          size={48}
          fill="currentColor"
        />
        <h1
          className={`text-5xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          ស្នេហាឆ្លងអគារ
        </h1>
        <p
          className={`mt-4 text-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Our journey from strangers to soulmates
        </p>
      </div>
      {/* StoriesKH */}
      {/* <div>
        <StoriesKH />
      </div> */}
    </div>
  );
};

export default OurStories;
