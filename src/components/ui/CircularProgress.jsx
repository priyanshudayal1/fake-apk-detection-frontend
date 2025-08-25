import React from "react";
import { motion } from "motion/react";

const CircularProgress = ({
  progress = 0,
  size = 120,
  strokeWidth = 6,
  isAnimated = false,
  color = "primary",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    primary: "stroke-primary-600",
    success: "stroke-success-600",
    warning: "stroke-warning-600",
    danger: "stroke-danger-600",
  };

  const bgColorClasses = {
    primary: "stroke-primary-200 dark:stroke-primary-800",
    success: "stroke-success-200 dark:stroke-success-800",
    warning: "stroke-warning-200 dark:stroke-warning-800",
    danger: "stroke-danger-200 dark:stroke-danger-800",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={bgColorClasses[color]}
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className={colorClasses[color]}
          style={{
            strokeDashoffset,
            transition: isAnimated
              ? "stroke-dashoffset 0.5s ease-in-out"
              : "none",
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Progress Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Complete
          </div>
        </div>
      </div>

      {/* Animated Ring for Active State */}
      {isAnimated && progress < 100 && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${
              color === "primary" ? "#3b82f6" : "#16a34a"
            }20, transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
};

export default CircularProgress;
