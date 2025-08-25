import React from "react";
import { motion } from "motion/react";

const LoadingAnimation = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const colorClasses = {
    primary: "text-primary-600",
    success: "text-success-600",
    warning: "text-warning-600",
    danger: "text-danger-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  return (
    <div className="flex items-center justify-center">
      {/* Spinning Dots */}
      <motion.div
        className="flex space-x-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`rounded-full ${
              size === "sm"
                ? "w-1.5 h-1.5"
                : size === "md"
                ? "w-2 h-2"
                : size === "lg"
                ? "w-2.5 h-2.5"
                : "w-3 h-3"
            } ${colorClasses[color]}`}
            style={{ backgroundColor: "currentColor" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
