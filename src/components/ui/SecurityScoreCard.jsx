import React from "react";
import { motion } from "motion/react";
import LinearProgress from "./LinearProgress";

const SecurityScoreCard = ({ title, score, description }) => {
  const getScoreColor = () => {
    if (score >= 85) return "success";
    if (score >= 70) return "warning";
    return "danger";
  };

  const getScoreIcon = () => {
    if (score >= 85) return "🛡️";
    if (score >= 70) return "⚠️";
    return "⛔";
  };

  const color = getScoreColor();

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
      whileHover={{ scale: 1.02, translateY: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white">
            {title}
          </h4>
          <div className="text-2xl p-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl group-hover:scale-110 transition-transform duration-200">
            {getScoreIcon()}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Security Score
            </span>
            <span
              className={`text-2xl font-bold ${
                color === "success"
                  ? "text-success-600 dark:text-success-400"
                  : color === "warning"
                  ? "text-warning-600 dark:text-warning-400"
                  : "text-danger-600 dark:text-danger-400"
              }`}
            >
              {score}%
            </span>
          </div>
          <LinearProgress
            progress={score}
            color={color}
            height={10}
            isAnimated={true}
          />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Enhanced score indicator badge */}
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex items-center px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide ${
              color === "success"
                ? "bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200"
                : color === "warning"
                ? "bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200"
                : "bg-danger-100 dark:bg-danger-900/30 text-danger-800 dark:text-danger-200"
            }`}
          >
            {score >= 85
              ? "Excellent"
              : score >= 70
              ? "Good"
              : "Needs Attention"}
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              color === "success"
                ? "bg-success-500"
                : color === "warning"
                ? "bg-warning-500"
                : "bg-danger-500"
            } animate-pulse`}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityScoreCard;
