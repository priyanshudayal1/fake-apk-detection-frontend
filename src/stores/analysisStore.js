import { create } from "zustand";

const useAnalysisStore = create((set, get) => ({
  // Analysis state
  isAnalyzing: false,
  analysisProgress: 0,
  currentTest: null,
  completedTests: [],
  estimatedTimeRemaining: 0,
  analysisId: null,

  // Test categories and their status
  tests: [
    {
      id: "package-structure",
      name: "Analyzing Package Structure",
      icon: "📱",
      status: "pending", // pending, running, completed, failed
      progress: 0,
      duration: 3000,
      description: "Examining APK file structure and manifest",
    },
    {
      id: "malicious-code",
      name: "Scanning for Malicious Code",
      icon: "🔍",
      status: "pending",
      progress: 0,
      duration: 8000,
      description: "Detecting suspicious code patterns and signatures",
    },
    {
      id: "digital-signatures",
      name: "Checking Digital Signatures",
      icon: "🛡️",
      status: "pending",
      progress: 0,
      duration: 4000,
      description: "Verifying app authenticity and certificate validity",
    },
    {
      id: "banking-protocols",
      name: "Verifying Banking Protocols",
      icon: "🏦",
      status: "pending",
      progress: 0,
      duration: 6000,
      description: "Checking compliance with banking security standards",
    },
    {
      id: "encryption-standards",
      name: "Testing Encryption Standards",
      icon: "🔐",
      status: "pending",
      progress: 0,
      duration: 5000,
      description: "Analyzing data encryption and security measures",
    },
    {
      id: "ml-models",
      name: "Running ML Models",
      icon: "📊",
      status: "pending",
      progress: 0,
      duration: 7000,
      description: "Applying machine learning threat detection models",
    },
    {
      id: "risk-score",
      name: "Generating Risk Score",
      icon: "⚡",
      status: "pending",
      progress: 0,
      duration: 2000,
      description: "Calculating final security assessment score",
    },
  ],

  // Results
  results: null,
  riskScore: 0,
  verdict: null, // 'safe', 'suspicious', 'dangerous'
  confidenceLevel: 0,

  // Actions
  startAnalysis: () => {
    const { tests } = get();
    const analysisId = Date.now().toString();

    set({
      isAnalyzing: true,
      analysisProgress: 0,
      currentTest: tests[0],
      completedTests: [],
      analysisId,
      tests: tests.map((test) => ({ ...test, status: "pending", progress: 0 })),
      results: null,
      riskScore: 0,
      verdict: null,
      confidenceLevel: 0,
    });

    return analysisId;
  },

  updateTestProgress: (testId, progress) => {
    const { tests, currentTest } = get();
    const updatedTests = tests.map((test) =>
      test.id === testId ? { ...test, progress, status: "running" } : test
    );

    set({
      tests: updatedTests,
      currentTest: updatedTests.find((t) => t.id === testId) || currentTest,
    });
  },

  completeTest: (testId) => {
    const { tests, completedTests } = get();
    const test = tests.find((t) => t.id === testId);

    if (test) {
      const updatedTests = tests.map((t) =>
        t.id === testId ? { ...t, status: "completed", progress: 100 } : t
      );

      const newCompletedTests = [...completedTests, test];
      const nextTest = tests.find((t) => t.status === "pending");

      set({
        tests: updatedTests,
        completedTests: newCompletedTests,
        currentTest: nextTest || null,
      });

      // Update overall progress
      const totalTests = tests.length;
      const overallProgress = (newCompletedTests.length / totalTests) * 100;
      set({ analysisProgress: overallProgress });
    }
  },

  failTest: (testId, error) => {
    const { tests } = get();
    const updatedTests = tests.map((test) =>
      test.id === testId ? { ...test, status: "failed", error } : test
    );

    set({ tests: updatedTests });
  },

  setResults: (results, riskScore, verdict, confidenceLevel) => {
    set({
      results,
      riskScore,
      verdict,
      confidenceLevel,
      isAnalyzing: false,
      analysisProgress: 100,
      currentTest: null,
    });
  },

  resetAnalysis: () => {
    const { tests } = get();
    set({
      isAnalyzing: false,
      analysisProgress: 0,
      currentTest: null,
      completedTests: [],
      estimatedTimeRemaining: 0,
      analysisId: null,
      tests: tests.map((test) => ({ ...test, status: "pending", progress: 0 })),
      results: null,
      riskScore: 0,
      verdict: null,
      confidenceLevel: 0,
    });
  },

  // Get analysis summary
  getAnalysisSummary: () => {
    const { tests, riskScore, verdict, confidenceLevel } = get();
    const completedCount = tests.filter((t) => t.status === "completed").length;
    const failedCount = tests.filter((t) => t.status === "failed").length;

    return {
      totalTests: tests.length,
      completedTests: completedCount,
      failedTests: failedCount,
      riskScore,
      verdict,
      confidenceLevel,
      isComplete: completedCount + failedCount === tests.length,
    };
  },
}));

export default useAnalysisStore;
