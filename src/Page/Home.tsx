import React, { useState, useEffect } from "react";
import { MemoryCard, memories } from "../screen/MemoryCard";
import { useTheme } from "../context/ThemeContext";
import HeroSection from "../screen/HeroSection";
import Letters from "../screen/Letters";
import BestMoment from "../screen/BestMoment";
import HiddenLoveNote from "../screen/HiddenLoveNote";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Constants
const ANNIVERSARY_DATE = "2025-04-06";

// Helper functions
const useAnniversaryCountdown = (): CountdownResult => {
  const calculateTimeLeft = (): CountdownResult => {
    const anniversaryDate = new Date(ANNIVERSARY_DATE);
    const today = new Date();
    const nextAnniversary = new Date(
      today.getFullYear(),
      anniversaryDate.getMonth(),
      anniversaryDate.getDate()
    );

    if (today > nextAnniversary) {
      nextAnniversary.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextAnniversary.getTime() - today.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second ✅

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

// Section Component for consistent styling
const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => {
  return (
    <section className={`mb-16 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
        {title}
      </h2>
      {children}
    </section>
  );
};

// Main App Component
const Home: React.FC = () => {
  const { days, hours, minutes, seconds } = useAnniversaryCountdown();
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  // Theme
  const { theme } = useTheme();

  // Simulate page loading effect
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen text-gray-800 transition-colors duration-300 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      } ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } transition-opacity duration-500`}
    >
      <div className="container mx-auto px-4 py-12">
        {/* HeroSection */}
        <section className="text-center mb-16">
          <HeroSection />
        </section>

        {/* Anniversary Countdown */}
        <Section title="Anniversary Countdown">
          <div className="flex justify-center">
            <div
              className={`p-6 rounded-lg shadow-lg text-center max-w-md w-full ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p
                className={`text-lg md:text-xl mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-600"
                }`}
              >
                Until our next anniversary:
              </p>
              <div
                className={`flex justify-center space-x-4 ${
                  theme === "dark" ? "text-pink-600" : "text-gray-600"
                }`}
              >
                <div
                  className={`p-3 rounded-lg w-24 ${
                    theme === "dark" ? "bg-pink-900/30" : "bg-pink-50"
                  }`}
                >
                  <div className="text-3xl font-bold">{days}</div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Days
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg w-24 ${
                    theme === "dark" ? "bg-pink-900/30" : "bg-pink-50"
                  }`}
                >
                  <div className="text-3xl font-bold">{hours}</div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Hours
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg w-24 ${
                    theme === "dark" ? "bg-pink-900/30" : "bg-pink-50"
                  }`}
                >
                  <div className="text-3xl font-bold">{minutes}</div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Minutes
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg w-24 ${
                    theme === "dark" ? "bg-pink-900/30" : "bg-pink-50"
                  }`}
                >
                  <div className="text-3xl font-bold">{seconds}</div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    seconds
                  </div>
                </div>
              </div>
              <p
                className={`mt-4 ${
                  theme === "dark" ? "text-white" : "text-gray-600"
                }`}
              >
                <span className="text-pink-600">❤️</span>{" "}
                {new Date(ANNIVERSARY_DATE).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </Section>

        {/* Memories Timeline */}
        <Section title="Our Memories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        </Section>

        {/* Hidden Love Note */}
        <Section title="A Special Message">
          <HiddenLoveNote />
        </Section>

        {/* Open When Letters */}
        <Letters />

        {/* Best Moment */}
        <Section title="Best Moment">
          <div className="flex justify-center">
            <BestMoment />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Home;
