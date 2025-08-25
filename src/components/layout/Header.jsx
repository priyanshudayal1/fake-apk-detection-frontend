import React, { useState } from "react";
import { motion } from "motion/react";
import { FiMenu, FiX, FiSun, FiMoon, FiShield } from "react-icons/fi";
import { useThemeStore } from "../../stores";
import { APP_CONFIG, NAVIGATION_ITEMS } from "../../constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? "bg-gray-900/90" : "bg-white/90"
      } backdrop-blur-md border-b ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div
              className={`p-2 rounded-xl gradient-primary shadow-lg ${
                isDark ? "shadow-primary-500/20" : "shadow-primary-600/30"
              }`}
            >
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-xl font-bold font-heading ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {APP_CONFIG.name}
              </h1>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                AI-Powered Security
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {isDark ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden ${
            isDark ? "bg-gray-800/50" : "bg-white/50"
          } backdrop-blur-sm rounded-xl mt-2 mb-4`}
        >
          <div className="px-4 py-4 space-y-3">
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
