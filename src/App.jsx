import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import useAppStore from "./store/useAppStore";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Section Components
import HeroSection from "./components/sections/HeroSection";
import StatisticsSection from "./components/sections/StatisticsSection";
import UploadSection from "./components/sections/UploadSection";
import AnalysisSection from "./components/sections/AnalysisSection";
import ResultsSection from "./components/sections/ResultsSection";
import FAQSection from "./components/sections/FAQSection";
import AboutSection from "./components/sections/AboutSection";

const App = () => {
  const {
    isDarkMode,
    currentView,
    wsConnected,
    wsError,
    pdfError,
    setPdfError,
    initWebSocket,
    closeWebSocket,
  } = useAppStore();

  const wsInitialized = useRef(false);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Initialize WebSocket connection when app starts
  useEffect(() => {
    if (wsInitialized.current) return;
    wsInitialized.current = true;

    let mounted = true;

    const initializeWebSocket = async () => {
      try {
        await initWebSocket();
        if (mounted) {
          console.log("WebSocket initialization completed");
        }
      } catch (err) {
        console.log(
          "WebSocket initialization failed, using REST API fallback:",
          err.message
        );
        // Don't show error toast as fallback is available
      }
    };

    initializeWebSocket();

    // Cleanup function
    return () => {
      mounted = false;
      closeWebSocket();
      wsInitialized.current = false;
    };
  }, []); // Empty deps array to run only once

  // Separate effect to show success toast when connected
  useEffect(() => {
    if (wsConnected) {
      toast.success("Real-time analysis ready!", {
        icon: "🔗",
        duration: 3000,
      });
    }
  }, [wsConnected]);

  // Show WebSocket error notifications
  useEffect(() => {
    if (wsError) {
      toast.error("Connection issue detected. Using standard analysis mode.", {
        icon: "⚠️",
        duration: 5000,
      });
    }
  }, [wsError]);

  // Show PDF error notifications
  useEffect(() => {
    if (pdfError) {
      toast.error(pdfError, {
        icon: "📄",
        duration: 5000,
      });
      // Clear the error after showing it
      setPdfError(null);
    }
  }, [pdfError, setPdfError]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? "#1e293b" : "#ffffff",
            color: isDarkMode ? "#f8fafc" : "#1e293b",
            border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: isDarkMode ? "#1e293b" : "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: isDarkMode ? "#1e293b" : "#ffffff",
            },
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Connection Status (only show when there's an issue) */}
      {wsError && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
          <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                Standard Analysis Mode
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {/* Always show Hero and Stats sections */}
        <HeroSection />
        <StatisticsSection />

        {/* Conditional Sections based on current view */}
        {currentView === "upload" && <UploadSection />}
        {currentView === "analyzing" && <AnalysisSection />}
        {currentView === "results" && <ResultsSection />}

        {/* Always show FAQ and About sections */}
        <FAQSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
