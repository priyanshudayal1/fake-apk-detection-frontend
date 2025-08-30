import React from "react";
import { HiShieldCheck, HiPlay, HiChip } from "react-icons/hi";
import { BsShieldFillCheck, BsRobot, BsClock } from "react-icons/bs";
import { scrollToSection } from "../../utils/scrollUtils";

const HeroSection = () => {
  const trustIndicators = [
    { icon: BsRobot, text: "Powered by AI", color: "text-accent-500" },
    { icon: BsClock, text: "Real-time Analysis", color: "text-primary-500" },
    {
      icon: BsShieldFillCheck,
      text: "Bank-grade Security",
      color: "text-success-500",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-100/20 to-teal-100/20 dark:from-transparent dark:via-gray-800/10 dark:to-gray-700/10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-success-400/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Hero Content */}
        <div className="animate-fade-up">
          {/* Security Badge */}
          <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-primary-200/50 dark:border-primary-600/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 shadow-lg">
            <HiShieldCheck className="w-4 h-4 mr-2" />
            Trusted by Security Experts
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Protect Yourself from
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-teal-600 to-accent-600 dark:from-primary-400 dark:via-teal-400 dark:to-accent-400">
              Fake Banking Apps
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Advanced AI-powered detection system that analyzes banking APK files
            in real-time to identify malicious applications and protect your
            financial data
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-12">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-sm"
              >
                <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {indicator.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("upload")}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <HiPlay className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Security Analysis
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <HiChip className="w-5 h-5 mr-2" />
              Learn How It Works
            </button>
          </div>

          {/* Security Stats Preview */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { number: "10,000+", label: "APKs Analyzed" },
              { number: "99.7%", label: "Accuracy Rate" },
              { number: "<2s", label: "Analysis Time" },
              { number: "0", label: "Data Stored" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
