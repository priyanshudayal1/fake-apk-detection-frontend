import React from "react";
import { motion } from "motion/react";
import { FiShield, FiZap, FiLock, FiEye } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useThemeStore } from "../../stores";
import { APP_CONFIG } from "../../constants";

const Hero = () => {
  const { isDark } = useThemeStore();

  const trustBadges = [
    { icon: FiZap, text: "Powered by AI", color: "text-accent-500" },
    { icon: FiEye, text: "Real-time Analysis", color: "text-primary-500" },
    { icon: FiLock, text: "Bank-grade Security", color: "text-success-500" },
  ];

  return (
    <section
      id="home"
      className={`min-h-screen pt-16 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-30"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-500/10 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent-500/10 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-success-500/10 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
          >
            <HiSparkles className="w-4 h-4 text-accent-500" />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              AI-Powered APK Security Analysis
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Protect Yourself from{" "}
            <span className="text-transparent bg-clip-text gradient-primary bg-gradient-to-r from-primary-600 to-accent-500">
              Fake Banking Apps
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Advanced machine learning technology to detect malicious APK files
            before they compromise your financial security. Upload your banking
            app and get instant security analysis.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 px-4 py-3 glass rounded-xl"
              >
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <FiShield className="w-5 h-5" />
              <span>Analyze APK Now</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-200 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Security Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 relative"
          >
            <div
              className={`inline-block p-8 rounded-3xl glass shadow-2xl ${
                isDark ? "shadow-primary-500/20" : "shadow-primary-600/30"
              }`}
            >
              <div className="relative">
                <FiShield
                  className={`w-24 h-24 mx-auto mb-4 ${
                    isDark ? "text-primary-400" : "text-primary-600"
                  }`}
                />

                {/* Animated scanning effect */}
                <div className="absolute inset-0 rounded-full border-2 border-accent-500/30 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-2 border-primary-500/50 animate-pulse"></div>
              </div>

              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                99.7% Accuracy Rate
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? "border-gray-600" : "border-gray-400"
          }`}
        >
          <div
            className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
              isDark ? "bg-gray-600" : "bg-gray-400"
            }`}
          ></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
