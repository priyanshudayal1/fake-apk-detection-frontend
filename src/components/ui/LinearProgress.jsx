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
    primary: "bg-primary-600",
    success: "bg-success-600",
    warning: "bg-warning-600",
    danger: "bg-danger-600",
    accent: "bg-accent-600",
  };

  const bgColorClasses = {
    primary: "bg-primary-100 dark:bg-primary-900/30",
    success: "bg-success-100 dark:bg-success-900/30",
    warning: "bg-warning-100 dark:bg-warning-900/30",
    danger: "bg-danger-100 dark:bg-danger-900/30",
    accent: "bg-accent-100 dark:bg-accent-900/30",
  };

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(progress)}%
          </span>
        </div>
      )}

      <div
        className={`w-full rounded-full overflow-hidden ${bgColorClasses[color]}`}
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]} ${
            isAnimated ? "animate-pulse" : ""
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{
            duration: isAnimated ? 0.3 : 0.5,
            ease: "easeOut",
          }}
        >
          {/* Shimmer effect for active progress */}
          {isAnimated && progress > 0 && progress < 100 && (
            <motion.div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LinearProgress;
