import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import SendMessageButton from "../components/Button/SendMessageButton";
import Image1 from "../assets/Dynamic-Image/Image1.jpg";
import Image2 from "../assets/Dynamic-Image/Image2.jpg";
import Image3 from "../assets/Dynamic-Image/Image3.jpg";
import Image4 from "../assets/Dynamic-Image/Image4.jpg";
import Image5 from "../assets/Dynamic-Image/Image5.jpg";

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

const images = [Image1, Image2, Image3, Image4, Image5];

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

  // Carousel navigation
  const startSlideshow = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);
  }, []);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToNextImage = useCallback(() => {
    stopSlideshow();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
      if (!isPaused) startSlideshow();
    }, 300);
  }, [isPaused, startSlideshow, stopSlideshow]);

  const goToPreviousImage = useCallback(() => {
    stopSlideshow();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
      setIsTransitioning(false);
      if (!isPaused) startSlideshow();
    }, 300);
  }, [isPaused, startSlideshow, stopSlideshow]);

  const goToSpecificImage = useCallback(
    (index: number) => {
      stopSlideshow();
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsTransitioning(false);
        if (!isPaused) startSlideshow();
      }, 300);
    },
    [isPaused, startSlideshow, stopSlideshow]
  );

  const handleKeyNavigation = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "ArrowLeft") goToPreviousImage();
    },
    [goToNextImage, goToPreviousImage]
  );

  // Modal and zoom controls
  const openImageModal = useCallback(() => {
    setIsPaused(true);
    setIsModalOpen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const closeImageModal = useCallback(() => {
    setIsModalOpen(false);
    setIsPaused(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoomLevel(Math.min(Math.max(newZoom, 1), 4));
  }, []);

  const handleWheelZoom = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoomChange(zoomLevel + delta);
    },
    [zoomLevel, handleZoomChange]
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (zoomLevel > 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [zoomLevel, position]
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || zoomLevel <= 1) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Calculate boundaries based on image size and zoom
      const image = imageRef.current;
      if (!image) return;

      const maxPanX = (image.offsetWidth * (zoomLevel - 1)) / 2;
      const maxPanY = (image.offsetHeight * (zoomLevel - 1)) / 2;

      setPosition({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
      });
    },
    [isDragging, zoomLevel, dragStart]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetZoomAndPan = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Slideshow lifecycle
  useEffect(() => {
    if (!isPaused) startSlideshow();
    return stopSlideshow;
  }, [isPaused, startSlideshow, stopSlideshow]);

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
            onKeyDown={handleKeyNavigation}
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
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out cursor-pointer
                    ${index === currentImageIndex ? "opacity-100" : "opacity-0"}
                    ${
                      isTransitioning ? "transition-opacity duration-300" : ""
                    }`}
                  onClick={openImageModal}
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Previous image"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Next image"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSpecificImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={index === currentImageIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </article>

        {/* Full-screen modal with enhanced zoom and pan */}
        {/* Note: This is the core of the improved "click to see photo" feature, with smooth animations and modern UX controls */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 transition-opacity duration-300"
            onWheel={handleWheelZoom}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div
              className={`relative max-w-5xl w-full h-auto transition-transform duration-300 ease-out ${
                isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  ref={imageRef}
                  src={images[currentImageIndex]}
                  alt={`${imageAlt} ${currentImageIndex + 1}`}
                  className={`w-full h-auto max-h-[85vh] object-contain transition-transform duration-200 ease-out ${
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
              <div className="absolute bottom-6 right-6 bg-gray-900/80 rounded-lg p-3 flex items-center space-x-3">
                <button
                  onClick={() => handleZoomChange(zoomLevel - 0.1)}
                  className="text-white p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
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
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  aria-label="Zoom level"
                />
                <button
                  onClick={() => handleZoomChange(zoomLevel + 0.1)}
                  className="text-white p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
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
                  onClick={resetZoomAndPan}
                  className="text-white p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
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
                onClick={closeImageModal}
                className="absolute top-4 right-4 bg-gray-900/60 hover:bg-gray-900/80 text-white p-3 rounded-full transition-colors duration-200"
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
