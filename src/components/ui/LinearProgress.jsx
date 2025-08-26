import React from "react";
import { motion } from "motion/react";

const LinearProgress = ({
  progress = 0,
  height = 4,
  color = "primary",
  isAnimated = false,
  showPercentage = false,
}) => {
  const colorClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600",
    success: "bg-gradient-to-r from-green-500 to-green-600",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    danger: "bg-gradient-to-r from-red-500 to-red-600",
    accent: "bg-gradient-to-r from-teal-500 to-teal-600",
  };

  const glowClasses = {
    primary: "shadow-blue-500/50",
    success: "shadow-green-500/50",
    warning: "shadow-yellow-500/50",
    danger: "shadow-red-500/50",
    accent: "shadow-teal-500/50",
  };

  const bgColorClasses = {
    primary: "bg-blue-100 dark:bg-blue-900/20",
    success: "bg-green-100 dark:bg-green-900/20",
    warning: "bg-yellow-100 dark:bg-yellow-900/20",
    danger: "bg-red-100 dark:bg-red-900/20",
    accent: "bg-teal-100 dark:bg-teal-900/20",
  };

  const progressValue = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.div
      className="w-full group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {showPercentage && (
        <motion.div
          className="flex justify-between items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <motion.span
            className="text-sm font-bold text-gray-900 dark:text-white"
            key={progressValue}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(progressValue)}%
          </motion.span>
        </motion.div>
      )}

      <motion.div
        className={`relative w-full rounded-full overflow-hidden backdrop-blur-sm border border-white/20 shadow-inner ${bgColorClasses[color]} group-hover:shadow-lg transition-shadow duration-300`}
        style={{ height: `${height}px` }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`h-full rounded-full relative overflow-hidden ${
            colorClasses[color]
          } ${progressValue >= 90 ? `shadow-lg ${glowClasses[color]}` : ""}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{
            duration: isAnimated ? 0.8 : 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Enhanced shimmer effect */}
          {isAnimated && progressValue > 0 && progressValue < 100 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            />
          )}

          {/* Success pulse effect */}
          {progressValue === 100 && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 1,
              }}
            />
          )}

          {/* Inner highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

        {/* Background highlight effect on hover */}
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LinearProgress;
