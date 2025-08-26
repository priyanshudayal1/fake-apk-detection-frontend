import React, { useEffect, useState } from "react";
import {
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
} from "react-icons/hi";
import { BsShieldFillCheck } from "react-icons/bs";
import useAppStore from "../../store/useAppStore";

const AnalysisSection = () => {
  const {
    isAnalyzing,
    analysisProgress,
    currentTest,
    analysisTests,
    uploadedFile,
    setCurrentTest,
    updateTestStatus,
    setAnalysisProgress,
    completeAnalysis,
  } = useAppStore();

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate analysis progress
  useEffect(() => {
    if (!isAnalyzing) return;

    let timer;
    const testDurations = [3000, 4000, 3500, 5000, 4500, 6000, 3000]; // Duration for each test in ms

    const runTest = (index) => {
      if (index >= analysisTests.length) {
        // Analysis complete
        const mockResults = generateMockResults();
        completeAnalysis(mockResults);
        return;
      }

      const test = analysisTests[index];
      setCurrentTest(test.id);
      updateTestStatus(test.id, "running", 0);

      let progress = 0;
      const duration = testDurations[index];
      const interval = duration / 100;

      const progressTimer = setInterval(() => {
        progress += 1;
        updateTestStatus(test.id, "running", progress);

        const overallProgress =
          ((index * 100 + progress) / (analysisTests.length * 100)) * 100;
        setAnalysisProgress(overallProgress);

        if (progress >= 100) {
          clearInterval(progressTimer);
          updateTestStatus(
            test.id,
            Math.random() > 0.1 ? "completed" : "warning",
            100
          );

          setTimeout(() => {
            runTest(index + 1);
          }, 500);
        }
      }, interval);
    };

    // Start the first test after a short delay
    timer = setTimeout(() => {
      runTest(0);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    isAnalyzing,
    analysisTests,
    completeAnalysis,
    setAnalysisProgress,
    setCurrentTest,
    updateTestStatus,
  ]);

  // Time tracking
  useEffect(() => {
    if (!isAnalyzing) {
      setTimeElapsed(0);
      return;
    }

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnalyzing]);

  const generateMockResults = () => {
    const riskScore = Math.floor(Math.random() * 30) + 10; // Low risk score (10-40)
    const verdict = riskScore > 30 ? "suspicious" : "safe";

    return {
      verdict,
      riskScore,
      confidence: 96,
      securityBreakdown: {
        codeIntegrity: Math.floor(Math.random() * 20) + 80,
        digitalSignature: Math.random() > 0.3 ? "valid" : "warning",
        permissionAnalysis: Math.floor(Math.random() * 30) + 70,
        networkBehavior: Math.floor(Math.random() * 25) + 75,
        dataEncryption: Math.floor(Math.random() * 20) + 80,
      },
      threatDetection: {
        malwareSignatures: 0,
        suspiciousPermissions: Math.floor(Math.random() * 3),
        knownThreats: "clean",
        behavioralAnalysis: "normal",
      },
      recommendations: [
        "Application appears to be legitimate",
        "Always download banking apps from official app stores",
        "Verify app publisher before installation",
        "Keep your device security updated",
      ],
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <HiCheckCircle className="w-5 h-5 text-success-500" />;
      case "warning":
        return <HiExclamation className="w-5 h-5 text-warning-500" />;
      case "failed":
        return <HiXCircle className="w-5 h-5 text-danger-500" />;
      case "running":
        return (
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        );
      default:
        return <HiClock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "border-success-200 dark:border-success-700/50 bg-success-50 dark:bg-success-900/20";
      case "warning":
        return "border-warning-200 dark:border-warning-700/50 bg-warning-50 dark:bg-warning-900/20";
      case "failed":
        return "border-danger-200 dark:border-danger-700/50 bg-danger-50 dark:bg-danger-900/20";
      case "running":
        return "border-primary-200 dark:border-primary-700/50 bg-primary-50 dark:bg-primary-900/20 animate-pulse";
      default:
        return "border-gray-200 dark:border-dark-700/50 bg-white dark:bg-dark-800";
    }
  };

  if (!isAnalyzing) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5 dark:opacity-2">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
        <div
          className="absolute top-32 right-20 w-3 h-3 bg-accent-400/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-32 w-2 h-2 bg-teal-400/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 border border-primary-200/50 dark:border-primary-700/50 mb-6">
            <BsShieldFillCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-primary-700 dark:text-primary-300 font-medium">
              Security Analysis in Progress
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Analyzing:{" "}
            <span className="text-primary-600 dark:text-primary-400">
              {uploadedFile?.name}
            </span>
          </h2>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <HiClock className="w-4 h-4 mr-2" />
              Time Elapsed: {Math.floor(timeElapsed / 60)}:
              {(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
            <div className="flex items-center">
              <BsShieldFillCheck className="w-4 h-4 mr-2" />
              ETA: {estimatedTime}s remaining
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div
          className="mb-12 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="text-center mb-6">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {Math.round(analysisProgress)}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Analysis Complete
            </p>
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${analysisProgress}%` }}
            >
              {/* Scanning animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan"></div>
            </div>
          </div>
        </div>

        {/* Test Progress Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          {analysisTests.map((test) => (
            <div
              key={test.id}
              className={`p-6 rounded-xl border-2 transition-all duration-500 ${getStatusColor(
                test.status
              )}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{test.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {test.status === "running" ? "In Progress" : test.status}
                    </p>
                  </div>
                </div>
                {getStatusIcon(test.status)}
              </div>

              {/* Individual Progress Bar */}
              <div className="w-full bg-gray-200/50 dark:bg-dark-600/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    test.status === "completed"
                      ? "bg-success-500"
                      : test.status === "warning"
                      ? "bg-warning-500"
                      : test.status === "running"
                      ? "bg-gradient-to-r from-primary-500 to-accent-500"
                      : "bg-gray-300 dark:bg-dark-600"
                  }`}
                  style={{ width: `${test.progress}%` }}
                />
              </div>

              {/* Test Details */}
              {test.status === "running" && currentTest === test.id && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span>Scanning for security vulnerabilities...</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Activity */}
        <div
          className="mt-12 text-center animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-dark-700/50 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {currentTest
                ? `${analysisTests.find((t) => t.id === currentTest)?.name}...`
                : "Initializing security analysis..."}
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-teal-50 to-primary-50 dark:from-teal-900/20 dark:to-primary-900/20 border border-teal-200/50 dark:border-teal-700/50 animate-fade-up"
          style={{ animationDelay: "800ms" }}
        >
          <div className="flex items-center justify-center mb-4">
            <BsShieldFillCheck className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
            Your Privacy is Protected
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400">
            This analysis is performed locally and securely. No sensitive data
            is stored or transmitted to external servers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
