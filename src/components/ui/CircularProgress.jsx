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
    primary: "stroke-blue-600",
    success: "stroke-green-600",
    warning: "stroke-yellow-600",
    danger: "stroke-red-600",
  };

  const bgColorClasses = {
    primary: "stroke-blue-200 dark:stroke-blue-800/50",
    success: "stroke-green-200 dark:stroke-green-800/50",
    warning: "stroke-yellow-200 dark:stroke-yellow-800/50",
    danger: "stroke-red-200 dark:stroke-red-800/50",
  };

  const glowClasses = {
    primary: "drop-shadow-xl",
    success: "drop-shadow-xl",
    warning: "drop-shadow-xl",
    danger: "drop-shadow-xl",
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
          className={`${colorClasses[color]} ${
            progress > 80 ? glowClasses[color] : ""
          }`}
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
          <div
            className={`text-2xl font-bold ${
              color === "primary"
                ? "text-blue-600 dark:text-blue-400"
                : color === "success"
                ? "text-green-600 dark:text-green-400"
                : color === "warning"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Subtle glow effect for high scores */}
      {progress > 80 && (
        <div
          className={`absolute inset-2 rounded-full blur-md opacity-20 animate-pulse ${
            color === "primary"
              ? "bg-blue-500"
              : color === "success"
              ? "bg-green-500"
              : color === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        />
      )}
    </div>
  );
};

export default CircularProgress;
