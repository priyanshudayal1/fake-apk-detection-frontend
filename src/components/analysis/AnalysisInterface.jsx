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
      <div className="text-center space-y-4">
        <motion.h2
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isAnalyzing ? "Analyzing APK Security..." : "Analysis Complete!"}
        </motion.h2>

        {isAnalyzing && (
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Running comprehensive security checks on your APK file
          </motion.p>
        )}
      </div>

      {/* Overall Progress */}
      <div className="flex justify-center">
        <CircularProgress
          progress={analysisProgress}
          size={120}
          strokeWidth={6}
          isAnimated={isAnalyzing}
        />
      </div>

      {/* Progress Stats */}
      {isAnalyzing && (
        <motion.div
          className="flex justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              {completedTests.length} / {tests.length}
            </div>
            <div>Tests Completed</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              {formatTime(estimatedTime)}
            </div>
            <div>Estimated Time</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(analysisProgress)}%
            </div>
            <div>Overall Progress</div>
          </div>
        </motion.div>
      )}

      {/* Current Test Highlight */}
      {currentTest && isAnalyzing && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 max-w-md">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{currentTest.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {currentTest.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTest.description}
                </div>
              </div>
              <LoadingAnimation />
            </div>
          </div>
        </motion.div>
      )}

      {/* Test List */}
      <div className="space-y-3">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent animate-scan" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalysisInterface;
