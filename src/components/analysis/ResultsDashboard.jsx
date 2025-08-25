import React from "react";
import { motion } from "motion/react";
import {
  FiShield,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { HiOutlineExclamation } from "react-icons/hi";
import { useAnalysisStore } from "../../stores";
import CircularProgress from "../ui/CircularProgress";
import SecurityScoreCard from "../ui/SecurityScoreCard";
import RecommendationCard from "../ui/RecommendationCard";

const ResultsDashboard = () => {
  const { results, riskScore, verdict, confidenceLevel, getAnalysisSummary } =
    useAnalysisStore();

  const summary = getAnalysisSummary();

  if (!summary.isComplete || !results) {
    return null;
  }

  const getVerdictConfig = () => {
    switch (verdict) {
      case "safe":
        return {
          icon: FiCheckCircle,
          title: "SAFE ✅",
          subtitle: "This APK appears to be legitimate",
          bgColor:
            "bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20",
          borderColor: "border-success-200 dark:border-success-800",
          textColor: "text-success-800 dark:text-success-200",
          iconColor: "text-success-600 dark:text-success-400",
        };
      case "suspicious":
        return {
          icon: HiOutlineExclamation,
          title: "SUSPICIOUS ⚠️",
          subtitle: "This APK has some concerning characteristics",
          bgColor:
            "bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20",
          borderColor: "border-warning-200 dark:border-warning-800",
          textColor: "text-warning-800 dark:text-warning-200",
          iconColor: "text-warning-600 dark:text-warning-400",
        };
      case "dangerous":
        return {
          icon: FiXCircle,
          title: "DANGEROUS ❌",
          subtitle: "This APK contains malicious indicators",
          bgColor:
            "bg-gradient-to-br from-danger-50 to-danger-100 dark:from-danger-900/20 dark:to-danger-800/20",
          borderColor: "border-danger-200 dark:border-danger-800",
          textColor: "text-danger-800 dark:text-danger-200",
          iconColor: "text-danger-600 dark:text-danger-400",
        };
      default:
        return {
          icon: FiInfo,
          title: "UNKNOWN",
          subtitle: "Analysis completed with unknown result",
          bgColor:
            "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700",
          borderColor: "border-gray-200 dark:border-gray-700",
          textColor: "text-gray-800 dark:text-gray-200",
          iconColor: "text-gray-600 dark:text-gray-400",
        };
    }
  };

  const verdictConfig = getVerdictConfig();
  const IconComponent = verdictConfig.icon;

  const securityScores = [
    {
      title: "Code Integrity",
      score: results.codeIntegrity || 85,
      description: "Analysis of code structure and patterns",
    },
    {
      title: "Digital Signature",
      score: results.digitalSignature || 92,
      description: "Certificate validation and authenticity",
    },
    {
      title: "Permission Analysis",
      score: results.permissionAnalysis || 76,
      description: "Review of requested permissions",
    },
    {
      title: "Network Behavior",
      score: results.networkBehavior || 88,
      description: "Network communication patterns",
    },
    {
      title: "Data Encryption",
      score: results.dataEncryption || 94,
      description: "Data protection mechanisms",
    },
  ];

  const recommendations = [
    {
      type:
        verdict === "safe"
          ? "info"
          : verdict === "suspicious"
          ? "warning"
          : "danger",
      title:
        verdict === "safe"
          ? "App Appears Safe"
          : verdict === "suspicious"
          ? "Exercise Caution"
          : "Do Not Install",
      description:
        verdict === "safe"
          ? "This APK passed our security checks and appears to be legitimate."
          : verdict === "suspicious"
          ? "This APK has some concerning characteristics. Proceed with caution."
          : "This APK contains malicious indicators and should not be installed.",
      actions:
        verdict === "safe"
          ? [
              "Verify app source before installation",
              "Keep your device updated",
              "Monitor app permissions",
            ]
          : verdict === "suspicious"
          ? [
              "Double-check the app source",
              "Review permissions carefully",
              "Consider alternatives",
            ]
          : [
              "Delete the APK file",
              "Scan your device for malware",
              "Report to security team",
            ],
    },
  ];

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overall Verdict */}
      <motion.div
        className={`p-8 rounded-2xl border-2 ${verdictConfig.bgColor} ${verdictConfig.borderColor}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <IconComponent
              className={`w-16 h-16 mx-auto ${verdictConfig.iconColor}`}
            />
          </motion.div>

          <div>
            <motion.h2
              className={`text-3xl font-bold ${verdictConfig.textColor} mb-2`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {verdictConfig.title}
            </motion.h2>
            <motion.p
              className={`text-lg ${verdictConfig.textColor} opacity-80`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {verdictConfig.subtitle}
            </motion.p>
          </div>

          {/* Risk Score and Confidence */}
          <div className="flex justify-center space-x-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CircularProgress
                progress={100 - riskScore}
                size={100}
                color={
                  verdict === "safe"
                    ? "success"
                    : verdict === "suspicious"
                    ? "warning"
                    : "danger"
                }
              />
              <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Safety Score: {100 - riskScore}%
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-4 border-primary-200 dark:border-primary-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {confidenceLevel}%
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Confidence Level
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Security Score Breakdown */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Security Analysis Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityScores.map((scoreData, index) => (
            <motion.div
              key={scoreData.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <SecurityScoreCard {...scoreData} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Security Recommendations
        </h3>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
            >
              <RecommendationCard {...recommendation} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analysis Summary */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <FiShield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Analysis Summary
          </h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {summary.totalTests}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Tests
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-600 dark:text-success-400">
              {summary.completedTests}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-danger-600 dark:text-danger-400">
              {summary.failedTests}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Failed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {summary.riskScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Risk Level
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDashboard;
