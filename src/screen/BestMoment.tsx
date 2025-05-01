import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import LibaryTogether from "../assets/LibaryTogether.jpg";
import Heart from "../assets/Heart.jpg";
import DinnerTime from "../assets/Dinner.jpg";
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
      src: "LibaryTogether",
      alt: "Loading...",
      date: "Loading...",
      time: "Loading...",
      title: "Coming Soon...",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sliderRef.current || document.activeElement !== sliderRef.current)
        return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className="relative h-120 overflow-hidden rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="relative h-full"
                style={{ width: `${100 / images.length}%` }}
                role="group"
                aria-label={`Slide ${index + 1} of ${images.length}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/70 to-transparent backdrop-blur-md text-white drop-shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(image.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{image.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
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
                onClick={() => goToSlide(index)}
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
        <p>
          Our time together is a beautiful journey woven with love and
          unforgettable memories.
        </p>
      </div>
    </div>
  );
};

export default BestMoment;
