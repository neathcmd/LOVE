import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "../context/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Home, Calendar, MessageCircleMoreIcon } from "lucide-react";

// Interface for navigation item props with clearer naming
interface NavigationItem {
  label: string;
  link: string;
  icon: React.ReactNode;
  hideOnMobile?: boolean;
}

// Props for the Header component for better customization
interface HeaderProps {
  navItems?: NavigationItem[];
  showThemeToggle?: boolean;
  stickyOffset?: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  // Default properties with sensible defaults
  navItems,
  showThemeToggle = true,
  stickyOffset = 10,
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  // Logo Icon
  const LogoIcon = [
    {
      img: "https://emoji.iamrohit.in/img-apple/1f90d.png",
      alt: "White heart",
    },
  ];
  // Default navigation items if none are provided
  const defaultNavItems: NavigationItem[] = [
    {
      label: "Home",
      link: "/",
      icon: <Home size={18} />,
    },
    {
      label: "Date Counter",
      link: "/counter-date",
      icon: <Calendar size={18} />,
    },
    {
      label: "Sent Messages",
      link: "/sent-messages",
      icon: <MessageCircleMoreIcon size={18} />,
    },
  ];

  // Use provided navItems or default ones
  const navigationItems = navItems || defaultNavItems;

  // Handle scroll detection with configurable offset
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > stickyOffset;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, stickyOffset]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to determine if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Derived theme classes to avoid repetition
  const themeClasses = {
    header:
      theme === "dark"
        ? "bg-gray-900 border-t border-gray-600 text-gray-300"
        : "bg-white/90 border-b border-gray-600 text-gray-600",
    link: {
      active:
        theme === "dark"
          ? "text-indigo-300 bg-indigo-900/30"
          : "text-indigo-700 bg-indigo-50",
      inactive:
        theme === "dark"
          ? "text-gray-200 hover:text-indigo-400 hover:bg-gray-800/50"
          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
    },
    mobileMenuButton:
      theme === "dark"
        ? "text-gray-300 hover:text-indigo-400 hover:bg-gray-800/50"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100",
  };

  // Custom focus ring style
  const focusRingClass =
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
  if (theme === "dark") {
    focusRingClass.replace("focus:ring-offset-2", "focus:ring-offset-gray-900");
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md shadow-lg ${themeClasses.header} ${className}`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Go to homepage"
            >
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-all duration-300 transform group-hover:scale-105">
                {LogoIcon.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt={item.alt}
                    className="h-8 w-8 rounded-full"
                  />
                ))}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-6"
            aria-label="Main navigation"
          >
            {navigationItems.map((item, index) => {
              const active = isActive(item.link);
              return (
                <Link
                  key={index}
                  to={item.link}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    active
                      ? `${themeClasses.link.active} transform scale-105`
                      : themeClasses.link.inactive
                  } ${focusRingClass}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="transition-transform duration-300 group-hover:rotate-12">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side items */}
          <div className="hidden md:flex items-center">
            {showThemeToggle && <ThemeToggle />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 z-100 ">
            {showThemeToggle && <ThemeToggle />}
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${focusRingClass} transition-colors duration-300 ${themeClasses.mobileMenuButton}`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              <Menu
                className={`${
                  isMenuOpen ? "hidden" : "block"
                } h-6 w-6 transition-all duration-300`}
                aria-hidden="true"
              />
              <X
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } h-6 w-6 transition-all duration-300`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay for clicking outside to close */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu with slide-in animation from right */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-64 z-40 backdrop-blur-sm pt-16 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className={`px-4 pt-2 pb-4 space-y-2 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
          aria-label="Mobile navigation"
        >
          {navigationItems
            .filter((item) => !item.hideOnMobile)
            .map((item, index) => {
              const active = isActive(item.link);
              return (
                <Link
                  key={index}
                  to={item.link}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                    active
                      ? themeClasses.link.active
                      : themeClasses.link.inactive
                  } ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${focusRingClass}`}
                  aria-current={active ? "page" : undefined}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  <span className="transition-transform duration-300 ease-out group-hover:rotate-12">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
