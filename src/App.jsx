import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useThemeStore, useAnalysisStore, useFileStore } from "./stores";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Statistics from "./components/layout/Statistics";
import About from "./components/layout/About";
import FAQ from "./components/layout/FAQ";
import FileUpload from "./components/analysis/FileUpload";
import AnalysisInterface from "./components/analysis/AnalysisInterface";
import ResultsDashboard from "./components/analysis/ResultsDashboard";

function App() {
  const { isDark } = useThemeStore();
  const { isAnalyzing, getAnalysisSummary, setResults } = useAnalysisStore();
  const { selectedFile } = useFileStore();
  const [currentPhase, setCurrentPhase] = useState("upload"); // 'upload', 'analyzing', 'results'

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Monitor analysis progress
  useEffect(() => {
    const summary = getAnalysisSummary();

    if (isAnalyzing && currentPhase !== "analyzing") {
      setCurrentPhase("analyzing");
      toast.success(
        "Analysis started! Your APK is being scanned for security threats.",
        {
          duration: 3000,
        }
      );
    }

    if (summary.isComplete && currentPhase === "analyzing") {
      setCurrentPhase("results");

      // Simulate setting results based on completed tests
      const mockResults = {
        codeIntegrity: Math.floor(Math.random() * 30) + 70,
        digitalSignature: Math.floor(Math.random() * 20) + 80,
        permissionAnalysis: Math.floor(Math.random() * 40) + 60,
        networkBehavior: Math.floor(Math.random() * 25) + 75,
        dataEncryption: Math.floor(Math.random() * 15) + 85,
      };

      const avgScore =
        Object.values(mockResults).reduce((a, b) => a + b, 0) /
        Object.values(mockResults).length;
      const riskScore = Math.max(0, 100 - avgScore);
      const verdict =
        riskScore < 15 ? "safe" : riskScore < 40 ? "suspicious" : "dangerous";
      const confidence = Math.floor(Math.random() * 10) + 90;

      setResults(mockResults, riskScore, verdict, confidence);

      // Show completion toast
      toast.success(`Analysis complete! APK is ${verdict.toUpperCase()}.`, {
        duration: 5000,
      });
    }
  }, [isAnalyzing, getAnalysisSummary, currentPhase, setResults]);

  const handleFileAnalyze = (file) => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setCurrentPhase("analyzing");
    toast.loading("Starting comprehensive security analysis...", {
      duration: 2000,
    });
  };

  const handleStartOver = () => {
    setCurrentPhase("upload");
    toast.success("Ready for new analysis");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />

      {/* Main Content */}
      <main className="relative">
        {currentPhase === "upload" && (
          <>
            <Hero />
            <Statistics />

            {/* Upload Section */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Upload Your APK for Analysis
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Get instant security insights with our advanced APK analysis
                    engine. Your file is processed securely and never stored on
                    our servers.
                  </p>
                </div>

                <FileUpload onFileAnalyze={handleFileAnalyze} />
              </div>
            </section>

            <About />
            <FAQ />
          </>
        )}

        {currentPhase === "analyzing" && (
          <section className="min-h-screen flex items-center justify-center py-20 px-4">
            <AnalysisInterface file={selectedFile} />
          </section>
        )}

        {currentPhase === "results" && (
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Security Analysis Complete
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Here are the detailed results of your APK security scan
                </p>
              </div>

              <ResultsDashboard />

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-8">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Analyze Another APK
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Export Report
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? "#374151" : "#ffffff",
            color: isDark ? "#ffffff" : "#1f2937",
            border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
            borderRadius: "0.75rem",
            boxShadow: isDark
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
