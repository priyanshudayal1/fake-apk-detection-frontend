import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { HiExclamation, HiDocument } from "react-icons/hi";
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
  const { isDarkMode, currentView, reportError, setReportError } =
    useAppStore();

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Auto-scroll to analysis section when analyzing starts
  useEffect(() => {
    if (currentView === "analyzing") {
      // Wait for the component to render before scrolling
      setTimeout(() => {
        const analysisSection = document.getElementById("analysis-section");
        if (analysisSection) {
          analysisSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [currentView]);

  // Show report error notifications
  useEffect(() => {
    if (reportError) {
      toast.error(reportError, {
        icon: <HiDocument className="w-5 h-5 text-danger-500" />,
        duration: 5000,
      });
      // Clear the error after showing it
      setReportError(null);
    }
  }, [reportError, setReportError]);

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
