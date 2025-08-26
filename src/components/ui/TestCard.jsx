import React from "react";
import { motion } from "motion/react";
import { FiCheck, FiX, FiClock, FiLoader } from "react-icons/fi";
import LinearProgress from "./LinearProgress";

const TestCard = ({ test, isActive = false }) => {
  const getStatusIcon = () => {
    switch (test.status) {
      case "completed":
        return (
          <FiCheck className="w-5 h-5 text-success-600 dark:text-success-400" />
        );
      case "failed":
        return <FiX className="w-5 h-5 text-danger-600 dark:text-danger-400" />;
      case "running":
        return (
          <FiLoader className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
        );
      default:
        return <FiClock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (test.status) {
      case "completed":
        return "border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20";
      case "failed":
        return "border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20";
      case "running":
        return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50";
    }
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl border transition-all duration-300 group overflow-hidden
        ${getStatusColor()}
        ${
          isActive
            ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 shadow-xl shadow-blue-500/20"
            : ""
        }
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isActive ? 1 : 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-4">
        {/* Test Icon */}
        <div className="flex-shrink-0 relative">
          <div
            className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-2xl transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/30"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {test.icon}
          </div>
          {isActive && (
            <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur-sm animate-pulse"></div>
          )}
        </div>

        {/* Test Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {test.name}
            </h3>
            <div className="flex items-center space-x-2 ml-2">
              {getStatusIcon()}
              {test.status === "running" && (
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {test.progress}%
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {test.description}
          </p>

          {/* Progress Bar */}
          {(test.status === "running" || test.status === "completed") && (
            <LinearProgress
              progress={test.progress}
              color={test.status === "completed" ? "success" : "primary"}
              height={6}
              isAnimated={test.status === "running"}
            />
          )}
        </div>
      </div>

      {/* Scanning Effect */}
      {isActive && test.status === "running" && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ overflow: "hidden" }}
        />
      )}

      {/* Status Badge */}
      {test.status !== "pending" && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            backgroundColor:
              test.status === "completed"
                ? "#16a34a"
                : test.status === "failed"
                ? "#dc2626"
                : "#3b82f6",
            color: "white",
          }}
        >
          {test.status === "completed" && "✓"}
          {test.status === "failed" && "✗"}
          {test.status === "running" && "⟳"}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TestCard;
