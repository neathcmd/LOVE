import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import LibaryTogether from "../assets/LibaryTogether.jpg";
import Heart from "../assets/Heart.jpg";
import DinnerTime from "../assets/Dinner.jpg";
import Best from "../assets/Best.jpg";
import { useTheme } from "../context/ThemeContext";

const BestMoment: React.FC = () => {
  const images = [
    {
      src: Heart,
      alt: "Heart shape",
      date: "2025-03-15",
      time: "04:52 PM",
      title: "Nice evening with you",
    },
    {
      src: LibaryTogether,
      alt: "At the Libary Break Time",
      date: "2025-04-22",
      time: "12:18 PM",
      title: "Break Time Together",
    },
    {
      src: DinnerTime,
      alt: "At the restaurant",
      date: "2025-04-29",
      time: "7:10 PM",
      title: "Dinner Time Together",
    },
    {
      src: Best,
      alt: "At the Cafe",
      date: "2025-05-03",
      time: "1:31 PM",
      title: "Rainy Day at the Cafe",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const minSwipeDistance = 50;

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = ""; // Restore scrolling
  };

  const goToPreviousModal = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextModal = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") goToPreviousModal();
        if (e.key === "ArrowRight") goToNextModal();
        return;
      }

      if (!sliderRef.current || document.activeElement !== sliderRef.current)
        return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isTransitioning, modalOpen]);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return dateString; // Return the original string if it can't be formatted
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className="relative h-72 sm:h-96 md:h-120 overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Image carousel"
      >
        <div
          className={`absolute w-full h-full transition-transform duration-300 ease-in-out ${
            isTransitioning ? "opacity-90" : "opacity-100"
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div
            className="flex h-full"
            style={{ width: `${images.length * 100}%` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-full cursor-pointer group"
                style={{ width: `${100 / images.length}%` }}
                role="group"
                aria-label={`Slide ${index + 1} of ${images.length}`}
                onClick={() => openModal(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/70 to-transparent backdrop-blur-md text-white drop-shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm sm:text-base">
                        {formatDate(image.date)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm sm:text-base">{image.time}</span>
                    </div>
                  </div>
                </div>

                {/* View icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <div className="bg-white bg-opacity-75 p-3 rounded-full">
                    <ZoomIn className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-16 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? "bg-white scale-125"
                    : "bg-gray-400 bg-opacity-50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mt-4 text-center ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        <p className="text-sm sm:text-base">
          Our time together is a beautiful journey woven with love and
          unforgettable memories.
          <span className="block mt-1 text-sm text-gray-500">
            Click on any photo to view it in full size.
          </span>
        </p>
      </div>

      {/* Modal for full-size image view */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl max-h-full flex flex-col"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center text-white mb-2">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                {images[modalImageIndex].title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={toggleZoom}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <ZoomOut className="w-5 h-5" />
                  ) : (
                    <ZoomIn className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal image container with navigation */}
            <div className="relative overflow-hidden rounded-lg bg-gray-900 flex-grow">
              <img
                src={images[modalImageIndex].src}
                alt={images[modalImageIndex].alt}
                className={`max-h-[75vh] mx-auto object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={toggleZoom}
              />

              {/* Navigation buttons in modal */}
              <button
                onClick={goToPreviousModal}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 sm:p-3 rounded-full text-white transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNextModal}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 sm:p-3 rounded-full text-white transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal footer with image details */}
            <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-white text-sm">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(images[modalImageIndex].date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{images[modalImageIndex].time}</span>
                </div>
              </div>
              <div className="text-gray-400">
                {modalImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestMoment;
