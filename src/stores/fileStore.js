import { create } from "zustand";

const useFileStore = create((set, get) => ({
  // File upload state
  selectedFile: null,
  isDragging: false,
  uploadProgress: 0,
  fileError: null,

  // Actions
  setSelectedFile: (file) => set({ selectedFile: file, fileError: null }),
  clearSelectedFile: () =>
    set({
      selectedFile: null,
      uploadProgress: 0,
      fileError: null,
    }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setFileError: (error) => set({ fileError: error }),

  // File validation
  validateFile: (file) => {
    const { setFileError } = get();

    if (!file) {
      setFileError("Please select a file");
      return false;
    }

    if (!file.name.endsWith(".apk")) {
      setFileError("Please upload a valid APK file");
      return false;
    }

    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit
      setFileError("File size must be less than 100MB");
      return false;
    }

    return true;
  },

  // Get file info
  getFileInfo: () => {
    const { selectedFile } = get();
    if (!selectedFile) return null;

    return {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    };
  },
}));

export default useFileStore;
