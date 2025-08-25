import React, { useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { FiUpload, FiX, FiFile, FiCheck } from 'react-icons/fi';
import { useThemeStore, useFileStore } from '../../stores';
import { formatFileSize, truncateFilename } from '../../utils/helpers';
import { FILE_CONFIG } from '../../constants';
import toast from 'react-hot-toast';

const FileUpload = ({ onFileSelect, onAnalyze }) => {
  const { isDark } = useThemeStore();
  const { 
    selectedFile, 
    isDragging, 
    fileError, 
    setSelectedFile, 
    setIsDragging, 
    clearSelectedFile, 
    setFileError,
    validateFile 
  } = useFileStore();

  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [setIsDragging]);

  const handleFileSelection = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      toast.success('APK file selected successfully!');
      onFileSelect && onFileSelect(file);
    } else {
      toast.error('Invalid APK file. Please select a valid .apk file.');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    clearSelectedFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('File cleared');
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      toast.error('Please select an APK file first');
      return;
    }
    
    if (validateFile(selectedFile)) {
      onAnalyze && onAnalyze(selectedFile);
    }
  };

  return (
    <section id="upload" className={`py-20 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold font-heading mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Upload Your APK File
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Drag and drop your APK file or click to browse. Our AI will analyze it in seconds.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? `border-primary-500 ${
                      isDark ? 'bg-primary-500/10' : 'bg-primary-50'
                    }`
                  : `${
                      isDark 
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-800/50' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
                    }`
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".apk"
                onChange={handleFileChange}
                className="hidden"
              />

              {!selectedFile ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Upload Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDragging ? 'bg-primary-500 text-white' : `${
                      isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`
                  }`}>
                    <FiUpload className="w-8 h-8" />
                  </div>

                  {/* Upload Text */}
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {isDragging ? 'Drop your APK file here' : 'Drag & drop your APK file'}
                    </h3>
                    <p className={`${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      or{' '}
                      <button
                        onClick={handleBrowseClick}
                        className="text-primary-500 hover:text-primary-600 font-medium underline"
                      >
                        browse to choose a file
                      </button>
                    </p>
                  </div>

                  {/* File Requirements */}
                  <div className={`text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    <p>Maximum file size: {formatFileSize(FILE_CONFIG.maxFileSize)}</p>
                    <p>Supported format: .apk files only</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {/* File Info */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? 'bg-success-500/20' : 'bg-success-100'
                  }`}>
                    <FiCheck className="w-8 h-8 text-success-500" />
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {truncateFilename(selectedFile.name)}
                    </h3>
                    <p className={`${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearFile}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FiX className="w-4 h-4 inline mr-2" />
                      Remove
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBrowseClick}
                      className="px-4 py-2 rounded-lg font-medium text-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <FiFile className="w-4 h-4 inline mr-2" />
                      Choose Different
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Error Display */}
            {fileError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg ${
                  isDark ? 'bg-danger-500/20' : 'bg-danger-50'
                } border border-danger-200`}
              >
                <p className="text-danger-600 text-sm font-medium">{fileError}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Analyze Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: selectedFile ? 1.05 : 1 }}
              whileTap={{ scale: selectedFile ? 0.95 : 1 }}
              onClick={handleAnalyze}
              disabled={!selectedFile}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                selectedFile
                  ? 'gradient-primary text-white shadow-lg hover:shadow-xl'
                  : `${
                      isDark 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`
              }`}
            >
              {selectedFile ? 'Start Security Analysis' : 'Select APK File First'}
            </motion.button>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className={`mt-8 p-6 rounded-xl glass ${
              isDark ? 'bg-gray-800/50' : 'bg-white/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <FiCheck className="w-5 h-5 text-success-500 mt-0.5" />
              <div>
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Your Privacy is Protected
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Files are analyzed in real-time and immediately discarded. We never store your APK files or personal data.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;