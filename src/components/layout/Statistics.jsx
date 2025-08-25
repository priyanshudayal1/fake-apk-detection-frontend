import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FiUpload, FiEye, FiClock, FiShield } from "react-icons/fi";
import { useThemeStore } from "../../stores";
import { STATISTICS } from "../../constants";
import { animateCounter } from "../../utils/helpers";

const STATS_CONFIG = [
  {
    icon: FiUpload,
    value: STATISTICS.apksAnalyzed,
    suffix: "+",
    label: "APKs Analyzed",
    color: "text-primary-500",
    bgColor: "bg-primary-500/10",
    description: "Successfully processed and analyzed",
  },
  {
    icon: FiEye,
    value: STATISTICS.accuracyRate,
    suffix: "%",
    label: "Accuracy Rate",
    color: "text-success-500",
    bgColor: "bg-success-500/10",
    description: "Threat detection accuracy",
  },
  {
    icon: FiClock,
    value: STATISTICS.averageAnalysisTime,
    suffix: "s",
    label: "Average Analysis",
    color: "text-accent-500",
    bgColor: "bg-accent-500/10",
    description: "Lightning-fast processing",
  },
  {
    icon: FiShield,
    value: STATISTICS.threatsDetected,
    suffix: "",
    label: "Threats Blocked",
    color: "text-warning-500",
    bgColor: "bg-warning-500/10",
    description: "Malicious APKs identified",
  },
];

const Statistics = () => {
  const { isDark } = useThemeStore();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate counters
            STATS_CONFIG.forEach((stat, index) => {
              setTimeout(() => {
                const element = document.querySelector(`#counter-${index}`);
                if (element) {
                  animateCounter(element, stat.value, 2000);
                }
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector("#statistics");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="statistics"
      className={`py-20 relative ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold font-heading mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Trusted by Security Professionals
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Our advanced AI-powered analysis engine has processed thousands of
            APKs, helping users stay safe from malicious applications.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_CONFIG.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-6 rounded-2xl glass backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 ${
                isDark ? "bg-gray-900/50" : "bg-white/80"
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-5 ${stat.bgColor.replace(
                  "/10",
                  ""
                )}`}
              ></div>

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${stat.bgColor}`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              {/* Value */}
              <div className="mb-2">
                <span
                  id={`counter-${index}`}
                  className={`text-3xl md:text-4xl font-bold font-heading ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  0
                </span>
                <span
                  className={`text-2xl md:text-3xl font-bold ${stat.color}`}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3
                className={`text-lg font-semibold mb-1 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-white/5 to-white/10"
                    : "bg-gradient-to-br from-gray-50/50 to-gray-100/50"
                }`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div
              className={`flex items-center space-x-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FiShield className="w-4 h-4" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div
              className={`w-1 h-1 rounded-full ${
                isDark ? "bg-gray-600" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FiClock className="w-4 h-4" />
              <span className="text-sm font-medium">Real-time Analysis</span>
            </div>
            <div
              className={`w-1 h-1 rounded-full ${
                isDark ? "bg-gray-600" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FiEye className="w-4 h-4" />
              <span className="text-sm font-medium">Zero Data Storage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
