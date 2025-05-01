import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const HiddenLoveNote: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState<boolean>(false);
  const { theme } = useTheme();

  const handleReveal = () => {
    setIsVisible(!isVisible);
    if (!hasBeenRevealed && !isVisible) {
      setHasBeenRevealed(true);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleReveal}
        className={`px-6 py-3 rounded-full transition-all duration-300 ${
          isVisible
            ? "bg-pink-600 hover:bg-pink-700"
            : "bg-pink-500 hover:bg-pink-600"
        } text-white shadow-md hover:shadow-lg transform hover:-translate-y-1`}
      >
        {isVisible ? "Hide Love Note" : "Reveal Love Note"}
      </button>

      <div
        className={`mt-6 transition-all duration-500 ${
          isVisible
            ? "opacity-100 max-h-96"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div
          className={`p-6 rounded-lg shadow-lg border-2 ${
            theme === "dark"
              ? "bg-gray-800 border-pink-800"
              : "bg-white  border-pink-300"
          }`}
        >
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            អរគុណណាដែរចូលមកក្នុងជីវិត្តបង{" "}
            អរគុណណាដែរអូនមើលថែបងបានល្អដល់ថ្នាក់នេះមានតែអូនទេដែរយល់ពីបងជាងគេ។{" "}
            បងសង្ឃឹមថាអូននឹងបន្តដំណើរទៅជាមួយបងរហូតតរទៅ <br />{" "}
            អូនជិតដល់ពេលដែរត្រូវចេញហើយមើលថែខ្លួនណា អូនរស្មី <br />{" "}
            បងស្រឡាញ់អូន🤍
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiddenLoveNote;
