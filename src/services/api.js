import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:9000",
  timeout: 180000, // 3 minutes timeout for general API calls
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

// APK Analysis Service
export class APKAnalysisService {
  /**
   * Analyze single APK file
   * @param {File} file - The APK file to analyze
   * @param {boolean} quick - Quick mode flag
   * @param {boolean} debug - Debug mode flag
   * @returns {Promise} Analysis result
   */
  static async scanSingle(file, quick = false, debug = false) {
    const formData = new FormData();
    formData.append("file", file);

    const params = new URLSearchParams();
    if (quick) params.append("quick", "true");
    if (debug) params.append("debug", "true");

    const url = `/scan${params.toString() ? "?" + params.toString() : ""}`;

    return api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Analyze multiple APK files
   * @param {FileList|Array} files - The APK files to analyze
   * @param {boolean} quick - Quick mode flag
   * @param {boolean} debug - Debug mode flag
   * @returns {Promise} Analysis results
   */
  static async scanBatch(files, quick = false, debug = false) {
    const formData = new FormData();

    // Handle both FileList and Array
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      formData.append("files", file);
    });

    const params = new URLSearchParams();
    if (quick) params.append("quick", "true");
    if (debug) params.append("debug", "true");

    const url = `/scan-batch${
      params.toString() ? "?" + params.toString() : ""
    }`;

    return api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Generate report for APK
   * @param {File} file - The APK file
   * @returns {Promise} Report data with JSON and HTML
   */
  static async generateReport(file) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/report", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Health check endpoint
   * @returns {Promise} Server status
   */
  static async healthCheck() {
    return api.get("/");
  }
}

export default api;
