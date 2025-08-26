import { io } from "socket.io-client";
import useAppStore from "../store/useAppStore";

class WebSocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second
  }

  connect(url = "ws://localhost:8000") {
    try {
      // For Django Channels, you might need to adjust the URL format
      // This is a placeholder - adjust based on your Django Channels setup
      const wsUrl = url
        .replace("ws://", "http://")
        .replace("wss://", "https://");

      this.socket = io(wsUrl, {
        transports: ["websocket", "polling"],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        path: "/ws/socket.io/", // Adjust path based on your Django Channels routing
      });

      this.setupEventListeners();
    } catch (error) {
      console.error("WebSocket connection error:", error);
      useAppStore.getState().setWSError("Failed to establish connection");
    }
  }

  setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", () => {
      console.log("WebSocket connected");
      this.isConnected = true;
      this.reconnectAttempts = 0;
      useAppStore.getState().setWSConnected(true);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
      this.isConnected = false;
      useAppStore.getState().setWSConnected(false);

      if (reason === "io server disconnect") {
        // Server disconnected, need to reconnect manually
        this.reconnect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      useAppStore.getState().setWSError("Connection failed");
      this.handleReconnection();
    });

    // Analysis progress events
    this.socket.on("analysis_started", (data) => {
      console.log("Analysis started:", data);
      const store = useAppStore.getState();
      store.setAnalyzing(true);
      store.setCurrentView("analyzing");
    });

    this.socket.on("test_update", (data) => {
      console.log("Test update:", data);
      const store = useAppStore.getState();

      if (data.testId) {
        store.setCurrentTest(data.testId);
        store.updateTestStatus(data.testId, data.status, data.progress || 100);
      }

      if (data.overallProgress !== undefined) {
        store.setAnalysisProgress(data.overallProgress);
      }
    });

    this.socket.on("analysis_complete", (data) => {
      console.log("Analysis complete:", data);
      const store = useAppStore.getState();
      store.completeAnalysis(data.results);
    });

    this.socket.on("analysis_error", (data) => {
      console.error("Analysis error:", data);
      useAppStore.getState().setWSError(data.message || "Analysis failed");
    });
  }

  handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
        30000
      );

      setTimeout(() => {
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
        this.socket?.connect();
      }, delay);
    } else {
      useAppStore
        .getState()
        .setWSError("Unable to connect after multiple attempts");
    }
  }

  reconnect() {
    if (this.socket) {
      this.socket.connect();
    }
  }

  startAnalysis(fileData) {
    if (!this.isConnected || !this.socket) {
      console.error("WebSocket not connected");
      useAppStore.getState().setWSError("Not connected to server");
      return;
    }

    try {
      // Send file data to Django backend for analysis
      this.socket.emit("start_analysis", {
        fileName: fileData.name,
        fileSize: fileData.size,
        fileId: fileData.id,
        // Note: Don't send actual file content through WebSocket
        // File should be uploaded via HTTP POST, then reference by ID
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error starting analysis:", error);
      useAppStore.getState().setWSError("Failed to start analysis");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      useAppStore.getState().setWSConnected(false);
    }
  }

  // Method to upload file via HTTP (separate from WebSocket)
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("apk_file", file);
      formData.append("timestamp", new Date().toISOString());

      const response = await fetch("/api/upload-apk/", {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type header for FormData
          "X-CSRFToken": this.getCSRFToken(),
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  }

  getCSRFToken() {
    // Get CSRF token for Django
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return null;
  }
}

// Create singleton instance
const wsManager = new WebSocketManager();

export default wsManager;

// Hook for React components
export const useWebSocket = () => {
  const { wsConnected, wsError } = useAppStore();

  const connect = (url) => wsManager.connect(url);
  const disconnect = () => wsManager.disconnect();
  const startAnalysis = (fileData) => wsManager.startAnalysis(fileData);
  const uploadFile = (file) => wsManager.uploadFile(file);

  return {
    isConnected: wsConnected,
    error: wsError,
    connect,
    disconnect,
    startAnalysis,
    uploadFile,
  };
};
