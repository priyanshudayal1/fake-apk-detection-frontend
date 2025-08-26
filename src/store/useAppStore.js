import { create } from "zustand";

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
      icon: "📱",
      status: "pending",
      progress: 0,
    },
    {
      id: 2,
      name: "Scanning for Malicious Code",
      icon: "🔍",
      status: "pending",
      progress: 0,
    },
    {
      id: 3,
      name: "Checking Digital Signatures",
      icon: "🛡️",
      status: "pending",
      progress: 0,
    },
    {
      id: 4,
      name: "Verifying Banking Protocols",
      icon: "🏦",
      status: "pending",
      progress: 0,
    },
    {
      id: 5,
      name: "Testing Encryption Standards",
      icon: "🔐",
      status: "pending",
      progress: 0,
    },
    {
      id: 6,
      name: "Running ML Models",
      icon: "📊",
      status: "pending",
      progress: 0,
    },
    {
      id: 7,
      name: "Generating Risk Score",
      icon: "⚡",
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

  // WebSocket state
  wsConnected: false,
  wsError: null,
  setWSConnected: (connected) =>
    set({ wsConnected: connected, wsError: connected ? null : get().wsError }),
  setWSError: (error) => set({ wsError: error }),

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
  startAnalysis: () => {
    const state = get();
    if (!state.uploadedFile) return;

    set({
      isAnalyzing: true,
      currentView: "analyzing",
      analysisProgress: 0,
      currentTest: null,
      analysisResults: null,
    });

    // Reset all tests
    state.resetAnalysisTests();
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

  // Reset all state for new analysis
  resetApp: () => {
    const state = get();
    set({
      uploadedFile: null,
      isUploading: false,
      uploadError: null,
      isAnalyzing: false,
      analysisProgress: 0,
      currentTest: null,
      analysisResults: null,
      currentView: "upload",
      wsError: null,
    });
    state.resetAnalysisTests();
  },
}));

export default useAppStore;
