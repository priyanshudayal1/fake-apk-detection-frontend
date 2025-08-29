import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:9000",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth headers, logging, etc. here
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
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
      timeout: 60000, // 60 seconds for PDF generation
      ...options,
    }),

  // Health check
  healthCheck: () => api.get("/"),
};

export default api;
