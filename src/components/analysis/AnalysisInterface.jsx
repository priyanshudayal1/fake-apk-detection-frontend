import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAnalysisStore } from "../../stores";
import CircularProgress from "../ui/CircularProgress";
import TestCard from "../ui/TestCard";
import LoadingAnimation from "../ui/LoadingAnimation";

const AnalysisInterface = ({ file }) => {
  const {
    isAnalyzing,
    analysisProgress,
    currentTest,
    completedTests,
    tests,
    startAnalysis,
    updateTestProgress,
    completeTest,
    resetAnalysis,
  } = useAnalysisStore();

  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    if (file && !isAnalyzing) {
      // Start the analysis process
      startAnalysis();
      simulateAnalysis();
    }

    return () => {
      // Cleanup when component unmounts
      resetAnalysis();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isAnalyzing, startAnalysis, resetAnalysis]);

  const simulateAnalysis = async () => {
    const testSequence = tests;

    for (let i = 0; i < testSequence.length; i++) {
      const test = testSequence[i];

      // Calculate estimated time
      const remainingTests = testSequence.slice(i);
      const totalTimeRemaining = remainingTests.reduce(
        (sum, t) => sum + t.duration,
        0
      );
      setEstimatedTime(totalTimeRemaining);

      // Simulate test progress
      await simulateTestExecution(test);

      // Mark test as completed
      completeTest(test.id);

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const simulateTestExecution = (test) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress increment

        if (progress >= 100) {
          progress = 100;
          updateTestProgress(test.id, 100);
          clearInterval(interval);
          resolve();
        } else {
          updateTestProgress(test.id, Math.floor(progress));
        }
      }, 200);
    });
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.ceil(milliseconds / 1000);
    return `${seconds}s`;
  };

  if (!isAnalyzing && completedTests.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Progress */}
      <div className="text-center space-y-6 mb-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isAnalyzing ? (
            <>
              <span className="block mb-2">Analyzing APK Security...</span>
              <span className="block text-lg font-normal text-blue-600 dark:text-blue-400">
                Deep scanning in progress
              </span>
            </>
          ) : (
            <>
              <span className="block text-success-600 dark:text-success-400">
                Analysis Complete!
              </span>
              <span className="block text-lg font-normal text-gray-600 dark:text-gray-400">
                Security assessment finished
              </span>
            </>
          )}
        </motion.h2>

        {isAnalyzing && (
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-3 backdrop-blur-xl rounded-2xl bg-gray-800/60 dark:bg-gray-800/60 border border-gray-700/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-300">
              Running comprehensive security checks on your APK file
            </span>
            <div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </motion.div>
        )}
      </div>

      {/* Overall Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <CircularProgress
            progress={analysisProgress}
            size={140}
            strokeWidth={8}
            isAnimated={isAnalyzing}
            color="primary"
          />
          {/* Inner glow effect */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 opacity-10 blur-lg animate-pulse"></div>
        </div>
      </div>

      {/* Progress Stats */}
      {isAnalyzing && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center p-6 backdrop-blur-xl rounded-2xl border bg-gray-800/40 dark:bg-gray-800/40 border-gray-700/50">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {completedTests.length} / {tests.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Tests Completed
            </div>
          </div>
          <div className="text-center p-6 backdrop-blur-xl rounded-2xl border bg-gray-800/40 dark:bg-gray-800/40 border-gray-700/50">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {formatTime(estimatedTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Estimated Time
            </div>
          </div>
          <div className="text-center p-6 backdrop-blur-xl rounded-2xl border bg-gray-800/40 dark:bg-gray-800/40 border-gray-700/50">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">
              {Math.round(analysisProgress)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Overall Progress
            </div>
          </div>
        </motion.div>
      )}

      {/* Current Test Highlight */}
      {currentTest && isAnalyzing && (
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 border-2 border-blue-200 dark:border-blue-700/50 rounded-2xl p-6 max-w-md shadow-xl shadow-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {currentTest.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {currentTest.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {currentTest.description}
                </div>
                <div className="flex items-center space-x-2">
                  <LoadingAnimation size="sm" color="primary" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Scanning...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Test List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="transition-all duration-300 hover:scale-105"
          >
            <TestCard test={test} isActive={currentTest?.id === test.id} />
          </motion.div>
        ))}
      </div>

      {/* Scanning Animation Overlay */}
      {isAnalyzing && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalysisInterface;
