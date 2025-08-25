// Application constants
export const APP_CONFIG = {
  name: "SecureAPK Detector",
  tagline: "Protect Yourself from Fake Banking Apps",
  description: "Advanced AI-powered APK security analysis platform",
  version: "1.0.0",
};

export const FILE_CONFIG = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedExtensions: [".apk"],
  allowedMimeTypes: ["application/vnd.android.package-archive"],
};

export const STATISTICS = {
  apksAnalyzed: 10000,
  accuracyRate: 99.7,
  averageAnalysisTime: 45,
  threatsDetected: 1847,
};

export const RISK_LEVELS = {
  LOW: { min: 0, max: 39, color: "success", label: "Low Risk" },
  MEDIUM: { min: 40, max: 59, color: "accent", label: "Medium Risk" },
  HIGH: { min: 60, max: 79, color: "warning", label: "High Risk" },
  CRITICAL: { min: 80, max: 100, color: "danger", label: "Critical Risk" },
};

export const VERDICTS = {
  SAFE: {
    label: "Safe",
    icon: "✅",
    color: "success",
    description: "This APK appears to be legitimate and safe to install.",
  },
  SUSPICIOUS: {
    label: "Suspicious",
    icon: "⚠️",
    color: "warning",
    description:
      "This APK shows some suspicious characteristics. Proceed with caution.",
  },
  DANGEROUS: {
    label: "Dangerous",
    icon: "❌",
    color: "danger",
    description:
      "This APK appears to be malicious. Do not install this application.",
  },
};

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  ANALYSIS_START: "analysis_start",
  ANALYSIS_PROGRESS: "analysis_progress",
  TEST_UPDATE: "test_update",
  ANALYSIS_COMPLETE: "analysis_complete",
  ERROR: "error",
};

export const ANALYSIS_PHASES = {
  UPLOAD: "upload",
  SCANNING: "scanning",
  ANALYSIS: "analysis",
  RESULTS: "results",
};

export const FAQ_ITEMS = [
  {
    id: 1,
    question: "How does the APK analysis work?",
    answer:
      "Our system uses advanced machine learning algorithms and signature-based detection to analyze APK files for potential threats. We examine code patterns, permissions, certificates, and behavioral characteristics.",
  },
  {
    id: 2,
    question: "Is my APK file stored on your servers?",
    answer:
      "No, we do not store any APK files on our servers. Files are analyzed in real-time and immediately discarded after analysis is complete to ensure your privacy and security.",
  },
  {
    id: 3,
    question: "How accurate is the threat detection?",
    answer:
      "Our system achieves 99.7% accuracy in detecting malicious APKs through continuous learning and updates to our threat intelligence database.",
  },
  {
    id: 4,
    question: "What file size limitations exist?",
    answer:
      "Currently, we support APK files up to 100MB in size. This covers the vast majority of mobile applications while ensuring fast analysis times.",
  },
  {
    id: 5,
    question: "How long does analysis take?",
    answer:
      "Most APK files are analyzed within 30-60 seconds, depending on the file size and complexity. Larger files may take up to 2-3 minutes.",
  },
];

export const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { id: "github", label: "GitHub", icon: "FaGithub", href: "#" },
  { id: "twitter", label: "Twitter", icon: "FaTwitter", href: "#" },
  { id: "linkedin", label: "LinkedIn", icon: "FaLinkedin", href: "#" },
];

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
};
