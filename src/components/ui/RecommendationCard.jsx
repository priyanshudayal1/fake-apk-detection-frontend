import React from "react";
import { motion } from "motion/react";
import {
  FiInfo,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";

const RecommendationCard = ({ type, title, description, actions = [] }) => {
  const getTypeConfig = () => {
    switch (type) {
      case "info":
        return {
          icon: FiInfo,
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          iconColor: "text-blue-600 dark:text-blue-400",
          titleColor: "text-blue-900 dark:text-blue-100",
          badgeColor:
            "bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200",
        };
      case "success":
        return {
          icon: FiCheckCircle,
          bgColor: "bg-success-50 dark:bg-success-900/20",
          borderColor: "border-success-200 dark:border-success-800",
          iconColor: "text-success-600 dark:text-success-400",
          titleColor: "text-success-900 dark:text-success-100",
          badgeColor:
            "bg-success-100 dark:bg-success-800/50 text-success-800 dark:text-success-200",
        };
      case "warning":
        return {
          icon: FiAlertTriangle,
          bgColor: "bg-warning-50 dark:bg-warning-900/20",
          borderColor: "border-warning-200 dark:border-warning-800",
          iconColor: "text-warning-600 dark:text-warning-400",
          titleColor: "text-warning-900 dark:text-warning-100",
          badgeColor:
            "bg-warning-100 dark:bg-warning-800/50 text-warning-800 dark:text-warning-200",
        };
      case "danger":
        return {
          icon: FiXCircle,
          bgColor: "bg-danger-50 dark:bg-danger-900/20",
          borderColor: "border-danger-200 dark:border-danger-800",
          iconColor: "text-danger-600 dark:text-danger-400",
          titleColor: "text-danger-900 dark:text-danger-100",
          badgeColor:
            "bg-danger-100 dark:bg-danger-800/50 text-danger-800 dark:text-danger-200",
        };
      default:
        return {
          icon: FiInfo,
          bgColor: "bg-gray-50 dark:bg-gray-800",
          borderColor: "border-gray-200 dark:border-gray-700",
          iconColor: "text-gray-600 dark:text-gray-400",
          titleColor: "text-gray-900 dark:text-gray-100",
          badgeColor:
            "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      className={`p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          className={`flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
        </motion.div>

        <div className="flex-1">
          <h4 className={`text-lg font-semibold ${config.titleColor} mb-2`}>
            {title}
          </h4>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>

          {actions.length > 0 && (
            <div className="space-y-2">
              <h5 className={`text-sm font-medium ${config.titleColor} mb-2`}>
                Recommended Actions:
              </h5>
              <ul className="space-y-2">
                {actions.map((action, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${config.iconColor}`}
                      style={{ backgroundColor: "currentColor" }}
                    />
                    <span>{action}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Type Badge */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badgeColor}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
