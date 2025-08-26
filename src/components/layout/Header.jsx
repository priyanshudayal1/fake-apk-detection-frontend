import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX, FiSun, FiMoon, FiShield } from "react-icons/fi";
import { useThemeStore } from "../../stores";
import { APP_CONFIG, NAVIGATION_ITEMS } from "../../constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl ${
        isScrolled
          ? isDark
            ? "bg-gray-900/95 shadow-2xl shadow-black/20"
            : "bg-white/95 shadow-2xl shadow-gray-300/30"
          : isDark
          ? "bg-gray-900/80 shadow-lg shadow-black/10"
          : "bg-white/80 shadow-md shadow-gray-200/20"
      } border-b ${isDark ? "border-gray-700/50" : "border-gray-200/50"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection("#hero")}
          >
            <motion.div
              className={`relative p-2.5 rounded-2xl overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-blue-500 to-teal-600 shadow-lg shadow-blue-500/50"
                  : "bg-gradient-to-br from-blue-500 to-teal-600 shadow-lg shadow-blue-500/40"
              }`}
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
                boxShadow: isDark
                  ? "0 10px 25px rgba(59, 130, 246, 0.6)"
                  : "0 10px 25px rgba(59, 130, 246, 0.5)",
              }}
              transition={{ duration: 0.6 }}
            >
              <FiShield className="w-6 h-6 text-white relative z-10 drop-shadow-sm" />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.div>

            <div className="hidden sm:block min-w-0">
              <motion.h1
                className={`text-lg md:text-xl font-bold font-heading transition-colors duration-300 truncate ${
                  isDark
                    ? "text-white group-hover:text-blue-300"
                    : "text-gray-900 group-hover:text-blue-600"
                }`}
                layoutId="app-title"
              >
                {APP_CONFIG.name}
              </motion.h1>
              <motion.p
                className={`text-xs transition-colors duration-300 truncate ${
                  isDark
                    ? "text-gray-400 group-hover:text-teal-400"
                    : "text-gray-600 group-hover:text-teal-600"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                AI-Powered Security
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70"
                  } backdrop-blur-sm group`}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Active indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                    whileHover={{ width: "80%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: isDark ? 180 : -180,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`relative p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-all duration-500 overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-yellow-400/20 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 text-yellow-400 shadow-lg shadow-yellow-400/30 border border-yellow-400/20"
                  : "bg-gradient-to-br from-indigo-500/20 to-purple-600/20 hover:from-indigo-500/30 hover:to-purple-600/30 text-indigo-600 shadow-lg shadow-indigo-500/30 border border-indigo-500/20"
              } backdrop-blur-sm`}
            >
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: 20, opacity: 0, rotate: 90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isDark ? (
                  <FiSun className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" />
                ) : (
                  <FiMoon className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" />
                )}
              </motion.div>

              {/* Enhanced ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.15 }}
                transition={{ duration: 0.6 }}
                style={{
                  background: isDark
                    ? "radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)",
                }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`md:hidden relative p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden ${
                isDark
                  ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700/50"
                  : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 border border-gray-200/50"
              } backdrop-blur-sm`}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <FiX className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <FiMenu className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`md:hidden overflow-hidden backdrop-blur-xl rounded-2xl mx-4 mt-4 mb-2 border ${
                isDark
                  ? "bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-black/30"
                  : "bg-white/95 border-gray-200/50 shadow-2xl shadow-gray-300/30"
              }`}
            >
              <div className="px-4 py-4 space-y-1">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/50 active:bg-gray-700/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 active:bg-gray-200/50"
                    } backdrop-blur-sm group relative overflow-hidden`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Enhanced hover effect */}
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isDark
                          ? "bg-gradient-to-b from-blue-400 to-teal-500"
                          : "bg-gradient-to-b from-blue-500 to-teal-500"
                      } rounded-full`}
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Background glow on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${
                        isDark
                          ? "bg-gradient-to-r from-blue-500/5 to-teal-500/5"
                          : "bg-gradient-to-r from-blue-100/50 to-teal-100/50"
                      }`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
