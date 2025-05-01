import React, { useState, useEffect, useCallback, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../context/ThemeContext";
import SendMessageButton from "../components/Button/SendMessageButton";
import Image1 from "../assets/Dynamic-Image/Image1.jpg";
import Image2 from "../assets/Dynamic-Image/Image2.jpg";
import Image3 from "../assets/Dynamic-Image/Image3.jpg";
import Image4 from "../assets/Dynamic-Image/Image4.jpg";

interface HeroSectionProps {
  title?: string;
  description?: string;
  imageAlt?: string;
}

const defaultData: HeroSectionProps = {
  title: "Our memories together",
  description:
    "A place to cherish our memories together — every smile, every moment, every heartbeat we've shared is a part of this story.",
  imageAlt: "A beautiful memory",
};

const images = [Image1, Image2, Image3, Image4];

const HeroSection: React.FC<HeroSectionProps> = ({
  title = defaultData.title,
  description = defaultData.description,
  imageAlt = defaultData.imageAlt,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 650);
    }, 4000);
  }, []);

  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    clearIntervalRef();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => {
        setIsTransitioning(false);
        if (!isPaused) startInterval();
      }, 50);
    }, 650);
  }, [clearIntervalRef, isPaused, startInterval]);

  const goToPrevious = useCallback(() => {
    clearIntervalRef();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => {
        setIsTransitioning(false);
        if (!isPaused) startInterval();
      }, 50);
    }, 650);
  }, [clearIntervalRef, isPaused, startInterval]);

  const goToImage = useCallback(
    (index: number) => {
      clearIntervalRef();
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
          if (!isPaused) startInterval();
        }, 50);
      }, 650);
    },
    [clearIntervalRef, isPaused, startInterval]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "ArrowLeft") goToPrevious();
    },
    [goToNext, goToPrevious]
  );

  useEffect(() => {
    if (!isPaused) startInterval();
    return clearIntervalRef;
  }, [startInterval, clearIntervalRef, isPaused]);

  // aos animation
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="w-full min-h-auto py-4 sm:py-8 md:py-12 lg:py-20 flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <article className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Text content */}
          <div
            className={`w-full lg:w-2/5 order-2 lg:order-1 text-center lg:text-left ${
              theme === "dark" ? "text-white" : "text-gray-800"
            } pb-6 lg:pb-0`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight">
              {title}
            </h1>
            <p
              className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {description}
            </p>
            <div className="w-full sm:w-2/3 md:w-3/4 lg:w-auto flex items-center justify-center lg:justify-start mx-auto lg:mx-0">
              <SendMessageButton />
            </div>
          </div>

          {/* Image carousel */}
          <div
            className="w-full lg:w-3/5 order-1 lg:order-2 relative overflow-hidden rounded-xl shadow-2xl group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Image carousel"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${imageAlt} ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 
                  ${index === currentImageIndex ? "opacity-100" : "opacity-0"} 
                  ${isTransitioning ? "transition-all duration-700" : ""}`}
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full opacity-70 sm:opacity-50 group-hover:opacity-90 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full opacity-70 sm:opacity-50 group-hover:opacity-90 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Navigation dots */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300 
                  ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-80"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={index === currentImageIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default HeroSection;
