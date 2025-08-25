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
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.02, translateY: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <div className="text-xl">{getScoreIcon()}</div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Score
          </span>
          <span
            className={`text-lg font-bold ${
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
          height={8}
          isAnimated={true}
        />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>

      {/* Score indicator badge */}
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-3 ${
          color === "success"
            ? "bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200"
            : color === "warning"
            ? "bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200"
            : "bg-danger-100 dark:bg-danger-900/30 text-danger-800 dark:text-danger-200"
        }`}
      >
        {score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Attention"}
      </div>
    </motion.div>
  );
};

export default SecurityScoreCard;
