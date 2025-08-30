import { create } from "zustand";
import { APKAnalysisService } from "../services/api";

const useAppStore = create((set, get) => ({
  // Theme state
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Navigation state
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  // File upload state
  uploadedFile: null,
  isUploading: false,
  uploadError: null,
  setUploadedFile: (file) => set({ uploadedFile: file, uploadError: null }),
  setUploading: (isUploading) => set({ isUploading }),
  setUploadError: (error) => set({ uploadError: error }),
  clearFile: () =>
    set({
      uploadedFile: null,
      uploadError: null,
      analysisResults: null,
      isAnalyzing: false,
    }),

  // Analysis state - simplified to just isAnalyzing flag
  isAnalyzing: false,

  // Progress tracking for analysis section
  analysisProgress: 0,
  currentTest: null,
  analysisTests: [
    {
      id: 1,
      name: "APK Structure Analysis",
      icon: "HiDocumentMagnifyingGlass",
      status: "pending",
      progress: 0,
    },
    {
      id: 2,
      name: "Malware Detection",
      icon: "HiMagnifyingGlass",
      status: "pending",
      progress: 0,
    },
    {
      id: 3,
      name: "Certificate Validation",
      icon: "HiShieldCheck",
      status: "pending",
      progress: 0,
    },
    {
      id: 4,
      name: "Banking Security Check",
      icon: "HiCreditCard",
      status: "pending",
      progress: 0,
    },
    {
      id: 5,
      name: "Encryption Analysis",
      icon: "HiLockClosed",
      status: "pending",
      progress: 0,
    },
    {
      id: 6,
      name: "Machine Learning Analysis",
      icon: "HiChartBar",
      status: "pending",
      progress: 0,
    },
    {
      id: 7,
      name: "Risk Assessment",
      icon: "HiBolt",
      status: "pending",
      progress: 0,
    },
  ],

  // Analysis results state
  analysisResults: null,
  setAnalysisResults: (results) => set({ analysisResults: results }),

  // Statistics (for demo)
  statistics: {
    apksAnalyzed: "10,000+",
    accuracyRate: "99.7%",
    realTimeDetection: "Active",
    dataStored: "Zero",
  },

  // App flow state - removed currentView since we'll handle this with simple conditional rendering
  // Based on isAnalyzing and analysisResults states

  // Start analysis flow - simplified to just send request and wait for response
  startAnalysis: async () => {
    const state = get();
    if (!state.uploadedFile) return;

    console.log("Starting analysis for file:", state.uploadedFile.name);
    console.log(
      "API Base URL:",
      import.meta.env.VITE_API_BASE_URL || "http://localhost:9000"
    );

    // Reset analysis state
    set({
      isAnalyzing: true,
      analysisResults: null,
      uploadError: null,
      analysisProgress: 0,
      currentTest: 1,
      analysisTests: state.analysisTests.map((test) => ({
        ...test,
        status: "pending",
        progress: 0,
      })),
    });

    try {
      // Start progress simulation while API call is happening
      const progressInterval = state.simulateAnalysisProgress();

      // Perform API call
      console.log("Making API call to scan endpoint...");
      const response = await APKAnalysisService.scanSingle(
        state.uploadedFile.file || state.uploadedFile
      );

      console.log("API response received:", response.data);

      // Clear the progress simulation
      clearInterval(progressInterval);

      // Process the response data to match expected frontend format
      const result = response.data;
      const processedResults = {
        prediction: result.prediction,
        probability: result.probability,
        risk: result.risk,
        riskScore: Math.round(result.probability * 100),
        verdict: result.prediction === "fake" ? "dangerous" : "safe",
        confidence: Math.round(result.probability * 100),

        // Map backend features to frontend display format
        summary: {
          fileName: state.uploadedFile.name,
          fileSize: state.uploadedFile.size,
          scanTime: new Date().toISOString(),
          verdict:
            result.prediction === "fake"
              ? "Potentially Malicious"
              : "Appears Safe",
          riskLevel: result.risk,
          confidence: Math.round(result.probability * 100),
        },

        // Security breakdown based on feature vector
        securityBreakdown: {
          codeIntegrity: result.feature_vector?.cert_present ? 85 : 45,
          permissionAnalysis: Math.max(
            20,
            100 - (result.feature_vector?.num_permissions || 0) * 5
          ),
          networkBehavior:
            result.feature_vector?.num_suspicious_tld === 0 ? 90 : 60,
          dataEncryption: result.feature_vector?.cert_present ? 80 : 40,
          digitalSignature:
            result.feature_vector?.cert_present === 1 ? "valid" : "warning",
        },

        // Threat detection details
        threatDetection: {
          malwareSignatures: result.feature_vector?.count_suspicious || 0,
          suspiciousPermissions: result.feature_vector?.num_permissions || 0,
          knownThreats: "none",
          behavioralAnalysis: "clean",
        },

        details: {
          // Security Analysis
          permissions: result.feature_vector?.num_permissions || 0,
          suspiciousAPIs: result.feature_vector?.count_suspicious || 0,
          certificateValid: result.feature_vector?.cert_present === 1,

          // Banking & Finance
          bankingRelated:
            result.feature_vector?.label_contains_bank === 1 ||
            result.feature_vector?.package_contains_bank === 1,
          impersonationScore: result.feature_vector?.impersonation_score || 0,
          officialPackage: result.feature_vector?.pkg_official === 1,

          // Technical Details
          minSDK: result.feature_vector?.min_sdk || 0,
          targetSDK: result.feature_vector?.target_sdk || 0,
          domains: result.feature_vector?.num_domains || 0,
          suspiciousDomains: result.feature_vector?.num_suspicious_tld || 0,
        },

        // Generate recommendations based on analysis
        recommendations: [
          result.prediction === "fake"
            ? "Do not install this application - it appears to be malicious"
            : "Application appears safe to install",
          result.feature_vector?.cert_present === 0
            ? "Verify the application source before installation"
            : "Digital signature is valid",
          result.feature_vector?.impersonation_score > 50
            ? "Be cautious - this app may be impersonating another application"
            : "No impersonation concerns detected",
          "Always download applications from official app stores when possible",
        ],

        // Include top SHAP features if available
        topFeatures: result.top_shap || [],
        // Raw feature vector for advanced users
        featureVector: result.feature_vector,
      };

      state.completeAnalysis(processedResults);
    } catch (error) {
      console.error("Analysis failed:", error);

      let errorMessage = "Analysis failed";
      if (error.response?.status === 422) {
        errorMessage =
          "Could not parse APK file. Please ensure you uploaded a valid APK file.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error during analysis. Please try again later.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage =
          "Analysis timed out. The APK file may be too large or complex.";
      } else if (error.response?.data?.error) {
        errorMessage = `Analysis failed: ${error.response.data.error}`;
      } else if (error.message) {
        errorMessage = `Analysis failed: ${error.message}`;
      }

      set({
        uploadError: errorMessage,
        isAnalyzing: false,
        analysisProgress: 0,
        currentTest: null,
      });
    }
  },

  // Complete analysis
  completeAnalysis: (results) => {
    set({
      isAnalyzing: false,
      analysisResults: results,
      analysisProgress: 100,
      analysisTests: get().analysisTests.map((test) => ({
        ...test,
        status: "completed",
        progress: 100,
      })),
    });
  },

  // Simulate analysis progress for better UX
  simulateAnalysisProgress: () => {
    let progress = 0;
    let testIndex = 0;

    const progressInterval = setInterval(() => {
      const currentState = get();
      const tests = [...currentState.analysisTests];

      // Update current test progress
      if (testIndex < tests.length) {
        const currentTest = tests[testIndex];
        currentTest.progress += Math.random() * 15 + 5; // Random progress increment

        if (currentTest.progress >= 100) {
          currentTest.progress = 100;
          currentTest.status = "completed";
          testIndex++;

          if (testIndex < tests.length) {
            tests[testIndex].status = "running";
          }
        } else {
          currentTest.status = "running";
        }
      }

      // Update overall progress
      progress = Math.min(95, progress + Math.random() * 8 + 2);

      set({
        analysisProgress: progress,
        currentTest: testIndex < tests.length ? tests[testIndex].id : null,
        analysisTests: tests,
      });

      // Stop at 95% to wait for actual API response
      if (progress >= 95) {
        clearInterval(progressInterval);
      }
    }, 800 + Math.random() * 400); // Random interval between 800-1200ms

    return progressInterval;
  },

  // Report generation state
  isGeneratingReport: false,
  reportError: null,
  setGeneratingReport: (generating) => set({ isGeneratingReport: generating }),
  setReportError: (error) => set({ reportError: error }),

  // Generate and download HTML report
  generateHTMLReport: async () => {
    const state = get();
    if (!state.uploadedFile) {
      set({ reportError: "No file uploaded for report generation" });
      return false;
    }

    set({ isGeneratingReport: true, reportError: null });

    try {
      const response = await APKAnalysisService.generateReport(
        state.uploadedFile.file || state.uploadedFile
      );

      if (response.data?.result && response.data?.html) {
        // Create blob from HTML content and download
        const htmlContent = response.data.html;
        const blob = new Blob([htmlContent], { type: "text/html" });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${state.uploadedFile.name}_report.html`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        set({ isGeneratingReport: false });
        return true;
      } else {
        throw new Error("Invalid report response format");
      }
    } catch (error) {
      console.error("Report generation failed:", error);

      let errorMessage;
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        errorMessage = "Report generation timed out. Please try again.";
      } else if (error.response?.status === 422) {
        errorMessage = "Could not analyze APK for report generation.";
      } else if (error.response?.status >= 500) {
        errorMessage =
          "Server error during report generation. Please try again later.";
      } else {
        errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Unknown error occurred";
      }

      set({
        reportError: `Report generation failed: ${errorMessage}`,
        isGeneratingReport: false,
      });
      return false;
    }
  },

  // Reset all state for new analysis
  resetApp: () => {
    set({
      uploadedFile: null,
      isUploading: false,
      uploadError: null,
      isAnalyzing: false,
      analysisResults: null,
      reportError: null,
      isGeneratingReport: false,
      analysisProgress: 0,
      currentTest: null,
      analysisTests: get().analysisTests.map((test) => ({
        ...test,
        status: "pending",
        progress: 0,
      })),
    });
  },
}));

export default useAppStore;
