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
  const { theme } = useTheme();

  return (
    <section className={`py-12 ${className}`}>
      <h2
        className={`
        text-2xl md:text-3xl 
        font-bold 
        mb-10 
        text-center 
        relative 
        inline-block 
        mx-auto 
        w-full
        ${theme === "dark" ? "text-white" : "text-gray-800"}
      `}
      >
        <span className="relative z-10">{title}</span>
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

  // Determine theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const cardShadow =
    theme === "dark"
      ? "shadow-lg shadow-pink-900/10"
      : "shadow-xl shadow-pink-100/50";
  const counterBg = theme === "dark" ? "bg-pink-900/30" : "bg-pink-50";
  const counterText = theme === "dark" ? "text-pink-300" : "text-pink-600";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <div
      className={`${bgColor} ${textColor} min-h-screen transition-all duration-500 ease-in-out ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* HeroSection */}
        <section className="text-center mb-16 mt-6">
          <HeroSection />
        </section>

        {/* Anniversary Countdown */}
        <Section title="Anniversary Countdown">
          <div className="flex justify-center">
            <div
              className={`
                ${cardBg} 
                ${cardShadow} 
                p-8 
                rounded-2xl 
                text-center 
                max-w-lg 
                w-full
                border
                ${theme === "dark" ? "border-gray-700" : "border-gray-100"}
              `}
            >
              <p className={`text-lg md:text-xl mb-6 ${secondaryText}`}>
                Until our next anniversary:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { value: days, label: "Days" },
                  { value: hours, label: "Hours" },
                  { value: minutes, label: "Minutes" },
                  { value: seconds, label: "Seconds" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`
                      ${counterBg} 
                      p-4 
                      rounded-xl 
                      w-24 
                      flex 
                      flex-col 
                      justify-center 
                      items-center
                      transform 
                      transition-transform 
                      duration-300 
                      hover:scale-105
                    `}
                  >
                    <div className={`text-3xl font-bold ${counterText}`}>
                      {item.value}
                    </div>
                    <div className={`text-sm font-medium ${secondaryText}`}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p
                className={`mt-6 ${secondaryText} flex items-center justify-center gap-2`}
              >
                <span className="text-pink-600 text-xl">❤️</span>
                <span>
                  {new Date(ANNIVERSARY_DATE).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        </Section>

        {/* Memories Timeline */}
        <Section title="Our Memories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        </Section>

        {/* Hidden Love Note */}
        <Section title="A Special Message">
          <div className="max-w-3xl mx-auto">
            <HiddenLoveNote />
          </div>
        </Section>

        {/* Open When Letters */}
        <Section title="Love Letters">
          <div className="max-w-4xl mx-auto">
            <Letters />
          </div>
        </Section>

        {/* Best Moment */}
        <Section title="Best Moment" className="mb-16">
          <div className="flex justify-center">
            <div
              className={`max-w-3xl w-full ${cardBg} ${cardShadow} rounded-2xl p-6`}
            >
              <BestMoment />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Home;
