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

  // Analysis state
  isAnalyzing: false,
  analysisProgress: 0,
  currentTest: null,
  analysisTests: [
    {
      id: 1,
      name: "Analyzing Package Structure",
      icon: "HiDocumentMagnifyingGlass",
      status: "pending",
      progress: 0,
    },
    {
      id: 2,
      name: "Scanning for Malicious Code",
      icon: "HiMagnifyingGlass",
      status: "pending",
      progress: 0,
    },
    {
      id: 3,
      name: "Checking Digital Signatures",
      icon: "HiShieldCheck",
      status: "pending",
      progress: 0,
    },
    {
      id: 4,
      name: "Verifying Banking Protocols",
      icon: "HiCreditCard",
      status: "pending",
      progress: 0,
    },
    {
      id: 5,
      name: "Testing Encryption Standards",
      icon: "HiLockClosed",
      status: "pending",
      progress: 0,
    },
    {
      id: 6,
      name: "Running ML Models",
      icon: "HiChartBar",
      status: "pending",
      progress: 0,
    },
    {
      id: 7,
      name: "Generating Risk Score",
      icon: "HiBolt",
      status: "pending",
      progress: 0,
    },
  ],

  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
  setCurrentTest: (testId) => set({ currentTest: testId }),
  updateTestStatus: (testId, status, progress = 100) =>
    set((state) => ({
      analysisTests: state.analysisTests.map((test) =>
        test.id === testId ? { ...test, status, progress } : test
      ),
    })),
  resetAnalysisTests: () =>
    set((state) => ({
      analysisTests: state.analysisTests.map((test) => ({
        ...test,
        status: "pending",
        progress: 0,
      })),
    })),

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

  // App flow state
  currentView: "upload", // 'upload', 'analyzing', 'results'
  setCurrentView: (view) => set({ currentView: view }),

  // Start analysis flow
  startAnalysis: async () => {
    const state = get();
    if (!state.uploadedFile) return;

    set({
      isAnalyzing: true,
      currentView: "analyzing",
      analysisProgress: 0,
      currentTest: null,
      analysisResults: null,
      uploadError: null,
    });

    // Reset all tests
    state.resetAnalysisTests();

    try {
      // Simulate progress updates
      const progressSteps = [
        {
          testId: 1,
          status: "running",
          progress: 30,
          message: "Analyzing Package Structure...",
        },
        {
          testId: 2,
          status: "running",
          progress: 50,
          message: "Scanning for Malicious Code...",
        },
        {
          testId: 3,
          status: "running",
          progress: 70,
          message: "Checking Digital Signatures...",
        },
        {
          testId: 4,
          status: "running",
          progress: 80,
          message: "Verifying Banking Protocols...",
        },
        {
          testId: 5,
          status: "running",
          progress: 85,
          message: "Testing Encryption Standards...",
        },
        {
          testId: 6,
          status: "running",
          progress: 95,
          message: "Running ML Models...",
        },
        {
          testId: 7,
          status: "running",
          progress: 100,
          message: "Generating Risk Score...",
        },
      ];

      // Simulate gradual progress
      for (let i = 0; i < progressSteps.length; i++) {
        const step = progressSteps[i];
        state.updateTestStatus(step.testId, step.status, step.progress);
        set({
          analysisProgress: (i + 1) * 14, // Roughly 100/7
          currentTest: step.testId,
        });

        // Add delay to simulate processing
        await new Promise((resolve) =>
          setTimeout(resolve, 800 + Math.random() * 400)
        );
      }

      // Perform actual API call
      const response = await APKAnalysisService.scanSingle(
        state.uploadedFile.file || state.uploadedFile
      );

      // Mark all tests as completed
      for (let i = 1; i <= 7; i++) {
        state.updateTestStatus(i, "completed", 100);
      }

      // Process the response data to match expected frontend format
      const result = response.data;
      const processedResults = {
        prediction: result.prediction,
        probability: result.probability,
        risk: result.risk,
        riskScore: Math.round(result.probability * 100),
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
        currentView: "upload",
      });
    }
  },

  // Complete analysis
  completeAnalysis: (results) => {
    set({
      isAnalyzing: false,
      analysisResults: results,
      currentView: "results",
      analysisProgress: 100,
    });
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
      analysisProgress: 0,
      currentTest: null,
      analysisResults: null,
      currentView: "upload",
      reportError: null,
      isGeneratingReport: false,
    });
    get().resetAnalysisTests();
  },
}));

export default useAppStore;
