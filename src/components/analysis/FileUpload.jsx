import React, { useCallback, useRef } from "react";
import { motion } from "motion/react";
import { FiUpload, FiFile, FiX, FiCheck } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useFileStore } from "../../stores";
import { formatFileSize } from "../../utils/fileUtils";

const FileUpload = ({ onFileAnalyze }) => {
  const fileInputRef = useRef(null);
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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    clearSelectedFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (selectedFile && onFileAnalyze) {
      onFileAnalyze(selectedFile);
    }
  };

  const fileInfo = getFileInfo();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300
          ${
            isDragging
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
              : selectedFile
              ? "border-success-500 bg-success-50 dark:bg-success-900/20"
              : fileError
              ? "border-danger-500 bg-danger-50 dark:bg-danger-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".apk"
          onChange={handleFileSelect}
          className="hidden"
        />

        {selectedFile ? (
          /* File Preview */
          <div className="text-center space-y-4">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FiCheck className="w-8 h-8 text-success-600 dark:text-success-400" />
            </motion.div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                File Ready for Analysis
              </h3>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <HiOutlineDocumentText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {fileInfo?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(fileInfo?.size || 0)}
                    </p>
                  </div>
                  <button
                    onClick={handleClearFile}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <FiX className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              {uploadProgress > 0 && uploadProgress < 100 ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading... {uploadProgress}%</span>
                </div>
              ) : (
                <>
                  <FiUpload className="inline-block w-5 h-5 mr-2" />
                  Start Security Analysis
                </>
              )}
            </motion.button>
          </div>
        ) : (
          /* Upload Prompt */
          <div className="text-center space-y-4">
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDragging
                  ? "bg-primary-100 dark:bg-primary-900/30"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
              animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <FiFile
                className={`w-8 h-8 ${
                  isDragging
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </motion.div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isDragging
                  ? "Drop your APK file here"
                  : "Upload APK File for Analysis"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Drag and drop your APK file here, or click to browse
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={handleBrowseClick}
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUpload className="w-5 h-5 mr-2" />
                Browse Files
              </motion.button>

              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>• Only APK files are accepted</p>
                <p>• Maximum file size: 100MB</p>
                <p>• Your file will be analyzed securely and not stored</p>
              </div>
            </div>
          </div>
        )}

        {/* Drag overlay */}
        {isDragging && (
          <motion.div
            className="absolute inset-0 bg-primary-500/10 border-2 border-primary-500 border-dashed rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <FiUpload className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                Drop APK file here
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Error Message */}
      {fileError && (
        <motion.div
          className="mt-4 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-danger-700 dark:text-danger-400 text-sm font-medium">
            {fileError}
          </p>
        </motion.div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <motion.div
          className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
