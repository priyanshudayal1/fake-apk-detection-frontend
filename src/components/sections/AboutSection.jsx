import React from "react";
import {
  HiCube,
  HiPlay,
  HiShieldCheck,
  HiChip,
  HiCode,
  HiGlobeAlt,
} from "react-icons/hi";
import { BsRobot, BsShieldFillCheck } from "react-icons/bs";

const AboutSection = () => {
  const techStack = [
    {
      name: "React + Vite",
      description: "Modern frontend framework",
      icon: HiCode,
    },
    {
      name: "AI/ML Models",
      description: "Advanced threat detection",
      icon: BsRobot,
    },
    {
      name: "Real-time Analysis",
      description: "WebSocket communication",
      icon: HiPlay,
    },
    {
      name: "Security Algorithms",
      description: "Multi-layered validation",
      icon: HiShieldCheck,
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Upload APK",
      description:
        "Securely upload your banking APK file through our encrypted interface",
      icon: HiCube,
      color: "from-primary-500 to-primary-600",
    },
    {
      step: 2,
      title: "AI Analysis",
      description:
        "Advanced machine learning models analyze code patterns and behavior",
      icon: BsRobot,
      color: "from-accent-500 to-accent-600",
    },
    {
      step: 3,
      title: "Security Scan",
      description:
        "Comprehensive security checks including signatures and permissions",
      icon: BsShieldFillCheck,
      color: "from-teal-500 to-teal-600",
    },
    {
      step: 4,
      title: "Results",
      description:
        "Get detailed security report with recommendations and risk assessment",
      icon: HiPlay,
      color: "from-success-500 to-success-600",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-2">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-teal-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent-400/10 to-success-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <HiGlobeAlt className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-primary-700 dark:text-primary-300 font-medium">
              About SecureAPK Detector
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Advanced Security
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 dark:from-primary-400 dark:to-teal-400">
              Technology
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge platform combines artificial intelligence, machine
            learning, and cybersecurity expertise to protect users from
            malicious banking applications
          </p>
        </div>

        {/* Mission Statement */}
        <div
          className="mb-20 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center">
            <BsShieldFillCheck className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              In an era where mobile banking threats are increasing
              exponentially, we provide real-time, AI-powered security analysis
              to help users identify potentially dangerous APK files before
              installation. Our goal is to create a safer digital financial
              ecosystem for everyone.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div
            className="text-center mb-12 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Four simple steps to comprehensive security analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg mb-4`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <div
            className="text-center mb-12 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built with modern, secure, and scalable technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <tech.icon className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4" />
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div
          className="mb-20 animate-fade-up"
          style={{ animationDelay: "700ms" }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Security Features
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive protection through multiple analysis layers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Code Integrity Analysis",
                description:
                  "Deep inspection of application code structure and patterns",
                icon: HiCode,
              },
              {
                title: "Digital Signature Verification",
                description: "Validates authenticity and publisher identity",
                icon: HiShieldCheck,
              },
              {
                title: "Permission Analysis",
                description:
                  "Examines requested permissions for suspicious behavior",
                icon: BsShieldFillCheck,
              },
              {
                title: "Malware Detection",
                description:
                  "Scans against known malware signatures and patterns",
                icon: HiPlay,
              },
              {
                title: "Behavioral Analysis",
                description:
                  "AI-powered analysis of application behavior patterns",
                icon: BsRobot,
              },
              {
                title: "Real-time Processing",
                description: "Instant analysis with live progress updates",
                icon: HiChip,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              >
                <feature.icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team/Contact */}
        <div
          className="text-center animate-fade-up"
          style={{ animationDelay: "800ms" }}
        >
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20 border border-primary-200/50 dark:border-primary-700/50">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built by Security Experts
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Developed as part of the Digital Rakshak hackathon to address the
              growing threat of malicious banking applications. Our team
              combines expertise in cybersecurity, machine learning, and user
              experience design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <HiGlobeAlt className="w-5 h-5 mr-2" />
                Learn More
              </button>
              <button className="inline-flex items-center px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <HiShieldCheck className="w-5 h-5 mr-2" />
                Contact Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
