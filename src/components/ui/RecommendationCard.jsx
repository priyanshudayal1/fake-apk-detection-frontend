import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";

const RecommendationCard = ({ type, title, description, actions = [] }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getTypeConfig = () => {
    switch (type) {
      case "info":
        return {
          icon: FiInfo,
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200/50 dark:border-blue-800/50",
          iconColor: "text-blue-600 dark:text-blue-400",
          titleColor: "text-blue-900 dark:text-blue-100",
          badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          glowColor: "shadow-blue-500/20",
          accentColor: "bg-blue-500",
        };
      case "success":
        return {
          icon: FiCheckCircle,
          bgColor: "bg-success-50 dark:bg-success-900/20",
          borderColor: "border-success-200/50 dark:border-success-800/50",
          iconColor: "text-success-600 dark:text-success-400",
          titleColor: "text-success-900 dark:text-success-100",
          badgeColor:
            "bg-gradient-to-r from-success-500 to-success-600 text-white",
          glowColor: "shadow-success-500/20",
          accentColor: "bg-success-500",
        };
      case "warning":
        return {
          icon: FiAlertTriangle,
          bgColor: "bg-warning-50 dark:bg-warning-900/20",
          borderColor: "border-warning-200/50 dark:border-warning-800/50",
          iconColor: "text-warning-600 dark:text-warning-400",
          titleColor: "text-warning-900 dark:text-warning-100",
          badgeColor:
            "bg-gradient-to-r from-warning-500 to-warning-600 text-white",
          glowColor: "shadow-warning-500/20",
          accentColor: "bg-warning-500",
        };
      case "danger":
        return {
          icon: FiXCircle,
          bgColor: "bg-danger-50 dark:bg-danger-900/20",
          borderColor: "border-danger-200/50 dark:border-danger-800/50",
          iconColor: "text-danger-600 dark:text-danger-400",
          titleColor: "text-danger-900 dark:text-danger-100",
          badgeColor:
            "bg-gradient-to-r from-danger-500 to-danger-600 text-white",
          glowColor: "shadow-danger-500/20",
          accentColor: "bg-danger-500",
        };
      default:
        return {
          icon: FiInfo,
          bgColor: "bg-gray-50 dark:bg-gray-800/50",
          borderColor: "border-gray-200/50 dark:border-gray-700/50",
          iconColor: "text-gray-600 dark:text-gray-400",
          titleColor: "text-gray-900 dark:text-gray-100",
          badgeColor: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
          glowColor: "shadow-gray-500/20",
          accentColor: "bg-gray-500",
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      className={`group relative p-6 rounded-2xl border-2 backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30 ${config.bgColor} ${config.borderColor} hover:border-white/40 dark:hover:border-gray-600/50 cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: `0 20px 25px -5px ${config.glowColor}, 0 10px 10px -5px ${config.glowColor}`,
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => actions.length > 0 && setIsExpanded(!isExpanded)}
    >
      {/* Accent stripe */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 ${config.accentColor}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />

      {/* Background glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${config.accentColor}/5 to-transparent`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-start space-x-4">
        <motion.div
          className={`flex-shrink-0 p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-white/20`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: type === "success" ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
        </motion.div>

        <div className="flex-1">
          <motion.h4
            className={`text-lg font-bold ${config.titleColor} mb-2 group-hover:text-opacity-90`}
            layoutId={`title-${title}`}
          >
            {title}
          </motion.h4>

          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {description}
          </motion.p>

          {actions.length > 0 && (
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${config.badgeColor} shadow-lg`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>

              <motion.div
                className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="mr-2">View Actions</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          <AnimatePresence>
            {isExpanded && actions.length > 0 && (
              <motion.div
                className="mt-6 space-y-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h5
                  className={`text-sm font-bold ${config.titleColor} mb-3 flex items-center`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${config.accentColor} mr-2`}
                  />
                  Recommended Actions:
                </h5>
                <div className="space-y-3">
                  {actions.map((action, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 group/action hover:bg-white/70 dark:hover:bg-gray-800/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${config.accentColor} mt-2 flex-shrink-0`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover/action:text-gray-900 dark:group-hover/action:text-gray-100 transition-colors">
                        {action}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hover ripple effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: 1.5,
          opacity: 0.1,
        }}
        transition={{ duration: 0.6 }}
      >
        <div className={`w-full h-full rounded-2xl ${config.accentColor}`} />
      </motion.div>
    </motion.div>
  );
};

export default RecommendationCard;
