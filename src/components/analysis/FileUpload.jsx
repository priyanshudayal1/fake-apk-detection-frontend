import React, { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiUpload,
  FiFile,
  FiX,
  FiCheck,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useFileStore } from "../../stores";
import { formatFileSize } from "../../utils/fileUtils";

const FileUpload = ({ onFileAnalyze }) => {
  const fileInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  const {
    selectedFile,
    isDragging,
    uploadProgress,
    fileError,
    setSelectedFile,
    clearSelectedFile,
    setIsDragging,
    validateFile,
    getFileInfo,
  } = useFileStore();

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && validateFile(file)) {
        setSelectedFile(file);
      }
    },
    [setIsDragging, validateFile, setSelectedFile]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file && validateFile(file)) {
        setSelectedFile(file);
      }
    },
    [validateFile, setSelectedFile]
  );

  const handleBrowseClick = (e) => {
    addRipple(e);
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    clearSelectedFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = (e) => {
    if (selectedFile && onFileAnalyze) {
      addRipple(e);
      onFileAnalyze(selectedFile);
    }
  };

  const fileInfo = getFileInfo();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-3xl p-10 transition-all duration-500 overflow-hidden group backdrop-blur-sm
          ${
            isDragging
              ? "border-blue-400 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 shadow-2xl shadow-blue-500/20"
              : selectedFile
              ? "border-green-400 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 shadow-2xl shadow-green-500/20"
              : fileError
              ? "border-red-400 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 shadow-2xl shadow-red-500/20"
              : `border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/10 ${
                  isHovering ? "scale-[1.02]" : ""
                }`
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: selectedFile ? 1 : 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".apk"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-green-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute pointer-events-none rounded-full bg-blue-400/20"
              style={{
                left: ripple.x - 25,
                top: ripple.y - 25,
                width: 50,
                height: 50,
              }}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </AnimatePresence>

        <div className="relative z-10">
          {selectedFile ? (
            /* File Preview */
            <div className="text-center space-y-6">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-full mb-4 shadow-xl shadow-success-500/30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FiCheck className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  File Ready for Analysis
                </h3>

                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <HiOutlineDocumentText className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1 text-left">
                      <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        {fileInfo?.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {formatFileSize(fileInfo?.size || 0)}
                      </p>
                    </div>

                    <motion.button
                      onClick={handleClearFile}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 group"
                      title="Remove file"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiX className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={handleAnalyze}
                className="relative w-full bg-gradient-to-r from-blue-500 via-blue-600 to-teal-600 hover:from-blue-600 hover:via-blue-700 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/40 transform hover:-translate-y-1 overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={uploadProgress > 0 && uploadProgress < 100}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />

                <div className="relative z-10">
                  {uploadProgress > 0 && uploadProgress < 100 ? (
                    <div className="flex items-center justify-center space-x-3">
                      <motion.div
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span className="text-lg">
                        Uploading... {uploadProgress}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <FiShield className="w-6 h-6" />
                      <span className="text-lg">Start Security Analysis</span>
                      <FiZap className="w-5 h-5 group-hover:animate-pulse" />
                    </div>
                  )}
                </div>
              </motion.button>
            </div>
          ) : (
            /* Upload Prompt */
            <div className="text-center space-y-6">
              <motion.div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 transition-all duration-300 ${
                  isDragging
                    ? "bg-gradient-to-br from-primary-400 to-accent-600 shadow-xl shadow-primary-500/50"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg hover:shadow-xl"
                }`}
                animate={
                  isDragging
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                        boxShadow: [
                          "0 10px 25px rgba(59, 130, 246, 0.3)",
                          "0 20px 40px rgba(59, 130, 246, 0.5)",
                          "0 10px 25px rgba(59, 130, 246, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: isDragging ? Infinity : 0,
                }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <FiFile
                  className={`w-10 h-10 transition-all duration-300 ${
                    isDragging
                      ? "text-white"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-primary-500"
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  {isDragging
                    ? "Drop your APK file here"
                    : "Upload APK File for Analysis"}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                  {isDragging
                    ? "Release to upload your APK file"
                    : "Drag and drop your APK file here, or click to browse"}
                </p>
              </motion.div>

              <div className="space-y-6">
                <motion.button
                  onClick={handleBrowseClick}
                  className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-blue-500/40 group overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />

                  <div className="relative z-10 flex items-center space-x-3">
                    <FiUpload className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="text-lg">Browse Files</span>
                  </div>
                </motion.button>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <FiFile className="w-4 h-4 text-primary-500" />
                    <span>APK files only</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <FiZap className="w-4 h-4 text-success-500" />
                    <span>Max 100MB</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                    }}
                  >
                    <FiShield className="w-4 h-4 text-secondary-500" />
                    <span>Secure analysis</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-accent-400/20 to-primary-400/20 backdrop-blur-sm border-2 border-primary-400 border-dashed rounded-3xl flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <FiUpload className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  Drop APK file here
                </p>
                <p className="text-lg text-primary-500 dark:text-primary-500 mt-2">
                  Release to begin upload
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {fileError && (
          <motion.div
            className="mt-6 p-5 bg-gradient-to-r from-danger-50 to-danger-100 dark:from-danger-900/30 dark:to-danger-800/20 border-l-4 border-danger-400 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <FiX className="w-5 h-5 text-danger-600 dark:text-danger-400" />
              <p className="text-danger-700 dark:text-danger-400 font-medium">
                {fileError}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Uploading...
              </span>
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {uploadProgress}%
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Shimmer effect on progress bar */}
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
