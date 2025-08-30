import { create } from "zustand";
import api from "../services/api";

const useAppStore = create((set, get) => ({
  // API Methods
  // Get WebSocket URL
  getWebSocketUrl: () => api.get("/ws-url"),

  // Traditional REST endpoints (fallback)
  scanApk: (formData, options = {}) =>
    api.post("/scan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...options,
    }),

  scanBatch: (formData, options = {}) =>
    api.post("/scan-batch", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...options,
    }),

  // Generate PDF report
  generatePdfReport: (formData, options = {}) =>
    api.post("/report-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000, // 5 minutes for PDF generation (matches backend timeout)
      ...options,
    }),

  // Health check
  healthCheck: () => api.get("/"),
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

  // WebSocket state
  wsConnected: false,
  wsError: null,
  websocket: null,
  websocketUrl: null,
  wsInitializing: false,
  setWSConnected: (connected) =>
    set({ wsConnected: connected, wsError: connected ? null : get().wsError }),
  setWSError: (error) => set({ wsError: error }),

  // Initialize WebSocket connection
  initWebSocket: async () => {
    const state = get();

    // Prevent multiple simultaneous initialization attempts
    if (state.wsInitializing || state.wsConnected) {
      return;
    }

    set({ wsInitializing: true });

    try {
      // Get WebSocket URL from backend
      const response = await state.getWebSocketUrl();
      console.log("ws res : ", response.data);
      const wsUrl = response.data.websocket_url;

      set({ websocketUrl: wsUrl });

      // Create WebSocket connection
      const ws = new WebSocket(wsUrl);

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("WebSocket connection timeout"));
        }, 5000);

        ws.onopen = () => {
          clearTimeout(timeout);
          console.log("WebSocket connected");
          set({
            wsConnected: true,
            wsError: null,
            websocket: ws,
            wsInitializing: false,
          });
          resolve();
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          get().handleWebSocketMessage(data);
        };

        ws.onclose = () => {
          clearTimeout(timeout);
          console.log("WebSocket disconnected");
          set({ wsConnected: false, websocket: null, wsInitializing: false });
        };

        ws.onerror = (error) => {
          clearTimeout(timeout);
          console.error("WebSocket error:", error);
          set({
            wsError: "WebSocket connection failed",
            wsConnected: false,
            wsInitializing: false,
          });
          reject(error);
        };
      });
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
      set({
        wsError: "Failed to get WebSocket URL",
        wsConnected: false,
        wsInitializing: false,
      });
      throw error;
    }
  },

  // Close WebSocket connection
  closeWebSocket: () => {
    const state = get();
    if (state.websocket) {
      state.websocket.close();
      set({ websocket: null, wsConnected: false });
    }
  },

  // Handle incoming WebSocket messages
  handleWebSocketMessage: (data) => {
    const state = get();

    switch (data.type) {
      case "progress":
        set({
          analysisProgress: data.progress || 0,
          currentTest: data.stage,
        });

        // Update test status based on stage
        if (data.stage === "parsing") {
          state.updateTestStatus(1, "running", data.progress || 30);
        } else if (data.stage === "analysis") {
          state.updateTestStatus(1, "completed", 100);
          state.updateTestStatus(6, "running", data.progress || 70);
        }
        break;

      case "result":
        if (data.result) {
          state.completeAnalysis(data.result);
        }
        break;

      case "file_result":
        // Handle batch processing individual file results
        console.log("File completed:", data.result);
        break;

      case "batch_result":
        if (data.results) {
          state.completeAnalysis({ results: data.results, batch: true });
        }
        break;

      case "error":
        set({
          uploadError: data.message,
          isAnalyzing: false,
          currentView: "upload",
        });
        break;

      case "pong":
        // Handle ping/pong for connection health
        break;

      default:
        console.log("Unknown WebSocket message type:", data.type);
    }
  },

  // Send file via WebSocket for analysis
  analyzeFileViaWebSocket: (file, quick = false, debug = false) => {
    return new Promise((resolve, reject) => {
      const state = get();

      if (!state.websocket || !state.wsConnected) {
        reject(new Error("WebSocket not connected"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = btoa(
          new Uint8Array(reader.result).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        const message = {
          type: "scan_single",
          filename: file.name,
          file_data: base64Data,
          quick,
          debug,
        };

        try {
          state.websocket.send(JSON.stringify(message));
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  },

  // Send multiple files via WebSocket for batch analysis
  analyzeBatchViaWebSocket: (files, quick = false, debug = false) => {
    return new Promise((resolve, reject) => {
      const state = get();

      if (!state.websocket || !state.wsConnected) {
        reject(new Error("WebSocket not connected"));
        return;
      }

      const filePromises = Array.from(files).map((file) => {
        return new Promise((fileResolve, fileReject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Data = btoa(
              new Uint8Array(reader.result).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            fileResolve({
              filename: file.name,
              file_data: base64Data,
            });
          };
          reader.onerror = () =>
            fileReject(new Error(`Failed to read file: ${file.name}`));
          reader.readAsArrayBuffer(file);
        });
      });

      Promise.all(filePromises)
        .then((filesData) => {
          const message = {
            type: "scan_batch",
            files: filesData,
            quick,
            debug,
          };

          try {
            state.websocket.send(JSON.stringify(message));
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .catch(reject);
    });
  },

  // PDF report state
  isGeneratingPdf: false,
  pdfError: null,
  setGeneratingPdf: (generating) => set({ isGeneratingPdf: generating }),
  setPdfError: (error) => set({ pdfError: error }),

  // Generate and download PDF report
  generatePdfReportDownload: async () => {
    const state = get();
    if (!state.uploadedFile) {
      set({ pdfError: "No file uploaded for report generation" });
      return false;
    }

    set({ isGeneratingPdf: true, pdfError: null });

    try {
      const formData = new FormData();
      formData.append("file", state.uploadedFile.file || state.uploadedFile);

      const response = await state.generatePdfReport(formData);

      if (response.data.success) {
        // Convert base64 to blob and download
        const pdfData = response.data.pdf_data;
        const filename = response.data.filename;

        // Create blob from base64
        const byteCharacters = atob(pdfData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        set({ isGeneratingPdf: false });
        return true;
      } else {
        throw new Error(response.data.error || "PDF generation failed");
      }
    } catch (error) {
      console.error("PDF generation failed:", error);

      let errorMessage;
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        errorMessage =
          "PDF generation timed out. The APK file may be too complex to analyze. Please try again or contact support.";
      } else if (error.response?.status === 408) {
        errorMessage = error.response.data?.error || "PDF generation timed out";
      } else if (error.response?.status === 422) {
        errorMessage = error.response.data?.details || "APK analysis failed";
      } else if (error.response?.status >= 500) {
        errorMessage =
          "Server error during PDF generation. Please try again later.";
      } else {
        errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Unknown error occurred";
      }

      set({
        pdfError: `PDF generation failed: ${errorMessage}`,
        isGeneratingPdf: false,
      });
      return false;
    }
  },

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
      // Initialize WebSocket if not connected
      if (!state.wsConnected) {
        await state.initWebSocket();

        // Wait a bit for connection to establish
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Re-get state after waiting
        const newState = get();
        if (!newState.wsConnected) {
          console.warn(
            "WebSocket not available after init, using REST API fallback"
          );
          newState.analyzeFileViaREST();
          return;
        }
      }

      if (get().wsConnected) {
        // Use WebSocket for real-time updates
        await state.analyzeFileViaWebSocket(
          state.uploadedFile.file || state.uploadedFile
        );
      } else {
        // Fallback to REST API
        console.warn("WebSocket not available, using REST API fallback");
        state.analyzeFileViaREST();
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      set({
        uploadError: `Analysis failed: ${error.message}`,
        isAnalyzing: false,
        currentView: "upload",
      });
    }
  },

  // Fallback REST API analysis
  analyzeFileViaREST: async () => {
    const state = get();

    try {
      const formData = new FormData();
      formData.append("file", state.uploadedFile.file || state.uploadedFile);

      // Simulate progress updates for REST API
      const progressSteps = [
        { test: 1, status: "running", message: "Parsing APK..." },
        { test: 2, status: "running", message: "Scanning code..." },
        { test: 3, status: "running", message: "Checking signatures..." },
        { test: 6, status: "running", message: "Running ML analysis..." },
      ];

      for (let i = 0; i < progressSteps.length; i++) {
        const step = progressSteps[i];
        state.updateTestStatus(step.test, step.status, 50);
        set({ analysisProgress: (i + 1) * 20 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const response = await state.scanApk(formData);

      // Mark all tests as completed
      for (let i = 1; i <= 7; i++) {
        state.updateTestStatus(i, "completed", 100);
      }

      state.completeAnalysis(response.data);
    } catch (error) {
      console.error("REST API analysis failed:", error);
      set({
        uploadError: `Analysis failed: ${
          error.response?.data?.message || error.message
        }`,
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

  // Reset all state for new analysis
  resetApp: () => {
    const state = get();

    // Close WebSocket connection
    state.closeWebSocket();

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
      websocket: null,
      websocketUrl: null,
      wsInitializing: false,
    });
    state.resetAnalysisTests();
  },
}));

export default useAppStore;
