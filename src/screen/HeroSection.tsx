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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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

  const openModal = useCallback(() => {
    setIsPaused(true);
    setIsModalOpen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsPaused(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(Math.max(prev + delta, 1), 4);
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta);
    },
    [handleZoom]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoomLevel > 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [zoomLevel, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoomLevel > 1) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Constrain panning to image boundaries
        const maxPan = 100 * (zoomLevel - 1);
        setPosition({
          x: Math.max(-maxPan, Math.min(maxPan, newX)),
          y: Math.max(-maxPan, Math.min(maxPan, newY)),
        });
      }
    },
    [isDragging, zoomLevel, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!isPaused) startInterval();
    return clearIntervalRef;
  }, [startInterval, clearIntervalRef, isPaused]);

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
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 cursor-pointer
                  ${index === currentImageIndex ? "opacity-100" : "opacity-0"} 
                  ${isTransitioning ? "transition-all duration-700" : ""}`}
                  onClick={openModal}
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

        {/* Full-screen modal with zoom */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative max-w-4xl w-full h-auto">
              <div className="overflow-hidden">
                <img
                  ref={imageRef}
                  src={images[currentImageIndex]}
                  alt={`${imageAlt} ${currentImageIndex + 1}`}
                  className={`w-full h-auto max-h-[90vh] object-contain transition-transform duration-300 ease-out ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: "center",
                  }}
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                />
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleZoom(0.1)}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Zoom in"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleZoom(-0.1)}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Zoom out"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <button
                  onClick={resetZoom}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Reset zoom"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HeroSection;
