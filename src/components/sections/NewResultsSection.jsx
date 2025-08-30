import React from "react";
import {
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
  HiShieldCheck,
  HiRefresh,
  HiDownload,
  HiClock,
  HiGlobe,
  HiCog,
  HiCode,
  HiCreditCard,
} from "react-icons/hi";
import {
  HiExclamationTriangle,
} from "react-icons/hi2";
import {
  BsShieldFillCheck,
  BsShieldFillExclamation,
  BsShieldFillX,
} from "react-icons/bs";
import useAppStore from "../../store/useAppStore";

const NewResultsSection = () => {
  const {
    analysisResults,
    uploadedFile,
    resetApp,
    generateHTMLReport,
    isGeneratingReport,
  } = useAppStore();

  const handleDownloadReport = async () => {
    const success = await generateHTMLReport();
    if (success) {
      console.log("HTML report downloaded successfully");
    }
  };

  if (!analysisResults) {
    return null;
  }

  const {
    prediction,
    probability,
    risk,
    riskColor,
    riskLevel,
    featureVector,
    recommendations,
    warnings,
  } = analysisResults;

  const getVerdictConfig = () => {
    // Use the risk level from backend response for better accuracy
    const currentRiskColor = riskColor || (prediction === "fake" ? "danger" : "success");
    const currentRiskLevel = riskLevel || (prediction === "fake" ? "High Risk" : "Low Risk");

    switch (currentRiskColor) {
      case "success":
        return {
          icon: BsShieldFillCheck,
          title: "SAFE",
          subtitle: `${currentRiskLevel} - Application appears legitimate`,
          color: "success",
          bgColor: "from-success-500 to-success-600",
          textColor: "text-success-600",
          borderColor: "border-success-200 dark:border-success-700/50",
          bgLight: "bg-success-50 dark:bg-success-900/20",
        };
      case "warning":
        return {
          icon: BsShieldFillExclamation,
          title: "CAUTION",
          subtitle: `${currentRiskLevel} - Review carefully before installation`,
          color: "warning",
          bgColor: "from-warning-500 to-warning-600",
          textColor: "text-warning-600",
          borderColor: "border-warning-200 dark:border-warning-700/50",
          bgLight: "bg-warning-50 dark:bg-warning-900/20",
        };
      case "danger":
        return {
          icon: BsShieldFillX,
          title: "MALICIOUS",
          subtitle: `${currentRiskLevel} - DO NOT INSTALL`,
          color: "danger",
          bgColor: "from-danger-500 to-danger-600",
          textColor: "text-danger-600",
          borderColor: "border-danger-200 dark:border-danger-700/50",
          bgLight: "bg-danger-50 dark:bg-danger-900/20",
        };
      default:
        return {
          icon: BsShieldFillCheck,
          title: "ANALYSIS COMPLETE",
          subtitle: "Review results below",
          color: "primary",
          bgColor: "from-primary-500 to-primary-600",
          textColor: "text-primary-600",
          borderColor: "border-primary-200 dark:border-primary-700/50",
          bgLight: "bg-primary-50 dark:bg-primary-900/20",
        };
    }
  };

  const verdictConfig = getVerdictConfig();

  const getRiskBarColor = (currentRiskColor) => {
    switch (currentRiskColor) {
      case "success": return "from-success-500 to-success-600";
      case "warning": return "from-warning-500 to-warning-600";
      case "danger": return "from-danger-500 to-danger-600";
      default: return prediction === "fake" ? "from-danger-500 to-danger-600" : "from-success-500 to-success-600";
    }
  };

  const getRiskTextColor = (currentRiskColor) => {
    switch (currentRiskColor) {
      case "success": return "text-success-600 dark:text-success-400";
      case "warning": return "text-warning-600 dark:text-warning-400";
      case "danger": return "text-danger-600 dark:text-danger-400";
      default: return prediction === "fake" ? "text-danger-600 dark:text-danger-400" : "text-success-600 dark:text-success-400";
    }
  };

  const getWarningIcon = (iconName) => {
    switch (iconName) {
      case 'HiExclamationTriangle':
        return HiExclamationTriangle;
      case 'HiCode':
        return HiCode;
      case 'HiCreditCard':
        return HiCreditCard;
      case 'HiShieldExclamation':
        return HiExclamation;
      default:
        return HiExclamation;
    }
  };

  const getWarningColors = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-danger-50 dark:bg-danger-900/20',
          border: 'border-danger-200 dark:border-danger-700/50',
          text: 'text-danger-700 dark:text-danger-300',
          icon: 'text-danger-600 dark:text-danger-400'
        };
      case 'high':
        return {
          bg: 'bg-warning-50 dark:bg-warning-900/20',
          border: 'border-warning-200 dark:border-warning-700/50',
          text: 'text-warning-700 dark:text-warning-300',
          icon: 'text-warning-600 dark:text-warning-400'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-700/50',
          text: 'text-yellow-700 dark:text-yellow-300',
          icon: 'text-yellow-600 dark:text-yellow-400'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800/50',
          border: 'border-gray-200 dark:border-gray-700/50',
          text: 'text-gray-700 dark:text-gray-300',
          icon: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  // Convert confidence percentage for display
  const confidenceScore = Math.round(probability * 100);

  return (
    <section
      id="results"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-2">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Analysis
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 dark:from-primary-400 dark:to-teal-400">
              Complete
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Analysis results for:{" "}
            <span className="font-medium">{uploadedFile?.name}</span>
          </p>
        </div>

        {/* Main Verdict Card */}
        <div
          className="mb-12 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <div
            className={`p-8 md:p-12 rounded-2xl border-2 ${verdictConfig.borderColor} ${verdictConfig.bgLight} text-center relative overflow-hidden`}
          >
            <div className="relative z-10">
              <verdictConfig.icon
                className={`w-20 h-20 mx-auto mb-6 ${verdictConfig.textColor}`}
              />

              <h3
                className={`text-4xl md:text-5xl font-bold mb-2 ${verdictConfig.textColor}`}
              >
                {verdictConfig.title}
              </h3>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {verdictConfig.subtitle}
              </p>

              {/* Risk Score */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Risk Level: {risk}
                  </span>
                  <span
                    className={`text-2xl font-bold ${getRiskTextColor(riskColor)}`}
                  >
                    {confidenceScore}% Confidence
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${getRiskBarColor(riskColor)} rounded-full transition-all duration-1000`}
                    style={{ width: `${confidenceScore}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <HiShieldCheck className="w-4 h-4 mr-2" />
                  Prediction: {prediction}
                </div>
                <div className="flex items-center">
                  <HiCheckCircle className="w-4 h-4 mr-2" />
                  Analysis Complete
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warnings Section */}
        {warnings && warnings.length > 0 && (
          <div
            className="mb-12 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <HiExclamationTriangle className="w-6 h-6 text-warning-600 dark:text-warning-400 mr-3" />
                Security Warnings
              </h3>
              
              {warnings.map((warning, index) => {
                const WarningIcon = getWarningIcon(warning.icon);
                const colors = getWarningColors(warning.type);
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}
                  >
                    <div className="flex items-start space-x-3">
                      <WarningIcon className={`w-6 h-6 ${colors.icon} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className={`font-bold ${colors.text} mb-2`}>
                          {warning.title}
                        </h4>
                        <p className={`${colors.text.replace('700', '600').replace('300', '400')}`}>
                          {warning.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Feature Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Permissions & Security */}
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div className="h-full p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <HiShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                Permissions & Security
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Permissions Count
                  </span>
                  <span
                    className={`font-bold ${
                      (featureVector?.num_permissions || 0) > 15
                        ? "text-warning-600"
                        : "text-success-600"
                    }`}
                  >
                    {featureVector?.num_permissions || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Suspicious APIs
                  </span>
                  <span
                    className={`font-bold ${
                      (featureVector?.count_suspicious || 0) > 0
                        ? "text-danger-600"
                        : "text-success-600"
                    }`}
                  >
                    {featureVector?.count_suspicious || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Certificate Present
                  </span>
                  <div className="flex items-center">
                    {featureVector?.cert_present === 1 ? (
                      <>
                        <HiCheckCircle className="w-4 h-4 text-success-500 mr-1" />
                        <span className="text-success-600 dark:text-success-400 font-medium">
                          Yes
                        </span>
                      </>
                    ) : (
                      <>
                        <HiXCircle className="w-4 h-4 text-danger-500 mr-1" />
                        <span className="text-danger-600 dark:text-danger-400 font-medium">
                          No
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Official Package
                  </span>
                  <div className="flex items-center">
                    {featureVector?.pkg_official === 1 ? (
                      <>
                        <HiCheckCircle className="w-4 h-4 text-success-500 mr-1" />
                        <span className="text-success-600 dark:text-success-400 font-medium">
                          Yes
                        </span>
                      </>
                    ) : (
                      <>
                        <HiXCircle className="w-4 h-4 text-warning-500 mr-1" />
                        <span className="text-warning-600 dark:text-warning-400 font-medium">
                          No
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Information */}
          <div className="animate-fade-up" style={{ animationDelay: "600ms" }}>
            <div className="h-full p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <HiCog className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3" />
                App Information
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Min SDK Version
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.min_sdk || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Target SDK Version
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.target_sdk || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Activities Count
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.num_activities || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Services Count
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.num_services || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Receivers Count
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.num_receivers || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    DEX Files Count
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.num_dex || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Network Domains
                  </span>
                  <span
                    className={`font-bold ${
                      (featureVector?.num_domains || 0) > 10
                        ? "text-warning-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {featureVector?.num_domains || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banking & Impersonation Analysis */}
        {(featureVector?.impersonation_score > 0 ||
          featureVector?.label_contains_bank === 1) && (
          <div
            className="mb-12 animate-fade-up"
            style={{ animationDelay: "800ms" }}
          >
            <div className="p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <HiExclamation className="w-6 h-6 text-warning-600 dark:text-warning-400 mr-3" />
                Banking & Impersonation Analysis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Impersonation Score
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      (featureVector?.impersonation_score || 0) > 50
                        ? "text-danger-600 dark:text-danger-400"
                        : "text-success-600 dark:text-success-400"
                    }`}
                  >
                    {featureVector?.impersonation_score || 0}/100
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Banking Related
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      featureVector?.label_contains_bank === 1 ||
                      featureVector?.package_contains_bank === 1
                        ? "text-warning-600 dark:text-warning-400"
                        : "text-success-600 dark:text-success-400"
                    }`}
                  >
                    {featureVector?.label_contains_bank === 1 ||
                    featureVector?.package_contains_bank === 1
                      ? "Yes"
                      : "No"}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Package Length
                  </div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {featureVector?.package_len || 0} chars
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div
          className="mb-12 animate-fade-up"
          style={{ animationDelay: "1000ms" }}
        >
          <div className="p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <HiShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
              Security Recommendations
            </h3>

            <div className="space-y-4">
              {prediction === "fake" ? (
                <div className="p-4 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-700/50">
                  <div className="flex items-start space-x-3">
                    <HiXCircle className="w-6 h-6 text-danger-600 dark:text-danger-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-danger-700 dark:text-danger-300 mb-2">
                        HIGH RISK - DO NOT INSTALL
                      </h4>
                      <p className="text-danger-600 dark:text-danger-400">
                        This application has been identified as potentially
                        malicious. Installing it could compromise your device
                        security and personal data.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700/50">
                  <div className="flex items-start space-x-3">
                    <HiCheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-success-700 dark:text-success-300 mb-2">
                        Application Appears Safe
                      </h4>
                      <p className="text-success-600 dark:text-success-400">
                        The analysis indicates this application is likely safe
                        to install, but always exercise caution with any APK
                        files.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {recommendations &&
                recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {recommendation}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "1200ms" }}
        >
          <button
            onClick={resetApp}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <HiRefresh className="w-5 h-5 mr-2" />
            Analyze Another APK
          </button>

          <button
            onClick={handleDownloadReport}
            disabled={isGeneratingReport}
            className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingReport ? (
              <>
                <div className="w-5 h-5 mr-2 animate-spin border-2 border-gray-400 border-t-gray-700 rounded-full" />
                Generating Report...
              </>
            ) : (
              <>
                <HiDownload className="w-5 h-5 mr-2" />
                Download HTML Report
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewResultsSection;
