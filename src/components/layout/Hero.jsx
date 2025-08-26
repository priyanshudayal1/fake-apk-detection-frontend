import React from "react";
import { motion } from "motion/react";
import { FiShield, FiZap, FiLock, FiEye } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useThemeStore } from "../../stores";
import { APP_CONFIG } from "../../constants";

const Hero = () => {
  const { isDark } = useThemeStore();

  const trustBadges = [
    { icon: FiZap, text: "Powered by AI", color: "text-teal-500" },
    { icon: FiEye, text: "Real-time Analysis", color: "text-blue-500" },
    { icon: FiLock, text: "Bank-grade Security", color: "text-green-500" },
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
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-20 animate-bounce blur-sm"></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 opacity-20 animate-pulse blur-sm"></div>
      <div
        className="absolute bottom-40 left-20 w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 opacity-20 animate-bounce blur-sm"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 opacity-10 animate-spin blur-lg"
        style={{ animationDuration: "8s" }}
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl backdrop-blur-xl mb-8 border ${
              isDark
                ? "bg-gray-800/60 border-gray-700/50 shadow-2xl"
                : "bg-white/60 border-gray-200/50 shadow-lg"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse"></div>
            <HiSparkles className="w-5 h-5 text-teal-500 animate-bounce" />
            <span
              className={`text-sm font-semibold tracking-wide ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              AI-Powered APK Security Analysis
            </span>
            <div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-5xl md:text-6xl lg:text-8xl font-bold font-heading mb-8 leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="block mb-2">Protect Yourself from</span>
            <span className="block bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent">
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
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl backdrop-blur-md ${
                  isDark
                    ? "bg-gray-800/40 border border-gray-700/50"
                    : "bg-white/40 border border-gray-200/50"
                }`}
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
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <FiShield className="w-5 h-5" />
                <span>Analyze APK Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`px-8 py-4 backdrop-blur-xl font-semibold text-lg rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 border ${
                isDark
                  ? "border-gray-600 text-gray-200 hover:border-gray-500 hover:bg-white/10 bg-gray-800/40 focus:ring-gray-500/50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-black/5 bg-white/40 focus:ring-gray-300/50"
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
            className="mt-16 relative group"
          >
            <div
              className={`inline-block p-10 rounded-3xl backdrop-blur-xl shadow-2xl border-2 relative overflow-hidden ${
                isDark
                  ? "bg-gray-800/60 border-blue-500/30 shadow-blue-500/20"
                  : "bg-white/60 border-blue-500/20 shadow-blue-600/30"
              }`}
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <FiShield
                  className={`w-28 h-28 mx-auto mb-6 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  } group-hover:scale-110 transition-transform duration-300`}
                />

                {/* Enhanced scanning effects */}
                <div className="absolute inset-4 rounded-full border-2 border-teal-500/30 animate-ping"></div>
                <div className="absolute inset-6 rounded-full border-2 border-blue-500/50 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full border border-green-500/40 animate-bounce"></div>

                <div className="flex justify-center space-x-2 mb-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <p
                  className={`text-sm font-bold ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  99.7% Accuracy Rate
                </p>
              </div>
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
