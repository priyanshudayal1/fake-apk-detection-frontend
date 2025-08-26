import React from "react";
import { motion } from "motion/react";

const LoadingAnimation = ({
  size = "md",
  color = "primary",
  type = "dots",
  text = null,
}) => {
  const sizeClasses = {
    sm: { container: "w-8 h-8", dot: "w-1.5 h-1.5", spinner: "w-4 h-4" },
    md: { container: "w-12 h-12", dot: "w-2 h-2", spinner: "w-6 h-6" },
    lg: { container: "w-16 h-16", dot: "w-2.5 h-2.5", spinner: "w-8 h-8" },
    xl: { container: "w-20 h-20", dot: "w-3 h-3", spinner: "w-10 h-10" },
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    accent: "text-teal-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  const glowClasses = {
    primary: "drop-shadow-[0_0_8px_rgb(59,130,246,0.5)]",
    secondary: "drop-shadow-[0_0_8px_rgb(168,85,247,0.5)]",
    success: "drop-shadow-[0_0_8px_rgb(34,197,94,0.5)]",
    warning: "drop-shadow-[0_0_8px_rgb(251,191,36,0.5)]",
    danger: "drop-shadow-[0_0_8px_rgb(239,68,68,0.5)]",
    accent: "drop-shadow-[0_0_8px_rgb(6,182,212,0.5)]",
    white: "drop-shadow-[0_0_8px_rgb(255,255,255,0.5)]",
    gray: "drop-shadow-[0_0_8px_rgb(107,114,128,0.5)]",
  };

  const DotsLoader = () => (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`rounded-full ${sizeClasses[size].dot} ${colorClasses[color]} ${glowClasses[color]}`}
          style={{ backgroundColor: "currentColor" }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const SpinnerLoader = () => (
    <motion.div
      className={`${sizeClasses[size].spinner} rounded-full border-2 border-gray-200 dark:border-gray-700`}
      style={{
        borderTopColor: "currentColor",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );

  const PulseLoader = () => (
    <motion.div
      className={`${sizeClasses[size].container} rounded-full ${colorClasses[color]} ${glowClasses[color]}`}
      style={{ backgroundColor: "currentColor" }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  const WaveLoader = () => (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`w-1 bg-current ${colorClasses[color]} ${glowClasses[color]} rounded-full`}
          animate={{
            height: [16, 32, 16],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const OrbitLoader = () => (
    <div className={`relative ${sizeClasses[size].container}`}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`absolute top-0 left-1/2 w-2 h-2 rounded-full ${colorClasses[color]} ${glowClasses[color]} -translate-x-1/2`}
          style={{ backgroundColor: "currentColor" }}
        />
        <div
          className={`absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full ${colorClasses[color]} opacity-60 -translate-x-1/2`}
          style={{ backgroundColor: "currentColor" }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={`absolute top-0 right-0 w-1 h-1 rounded-full ${colorClasses[color]} opacity-40`}
          style={{ backgroundColor: "currentColor" }}
        />
      </motion.div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return <SpinnerLoader />;
      case "pulse":
        return <PulseLoader />;
      case "wave":
        return <WaveLoader />;
      case "orbit":
        return <OrbitLoader />;
      default:
        return <DotsLoader />;
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={colorClasses[color]}>{renderLoader()}</div>

      {text && (
        <motion.p
          className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
};

export default LoadingAnimation;
