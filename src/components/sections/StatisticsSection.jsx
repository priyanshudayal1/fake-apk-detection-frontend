import React from "react";
import {
  HiUpload,
  HiCheckCircle,
  HiClock,
  HiShieldCheck,
} from "react-icons/hi";
import { BsShieldFillCheck } from "react-icons/bs";

const StatisticsSection = () => {
  const stats = [
    {
      icon: HiUpload,
      number: "10,000+",
      label: "APKs Analyzed",
      description: "Comprehensive analysis of banking applications",
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      iconColor: "text-primary-600 dark:text-primary-400",
    },
    {
      icon: HiCheckCircle,
      number: "99.7%",
      label: "Accuracy Rate",
      description: "Precision in malware detection and analysis",
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-50 dark:bg-success-900/20",
      iconColor: "text-success-600 dark:text-success-400",
    },
    {
      icon: HiClock,
      number: "< 2s",
      label: "Real-time Detection",
      description: "Lightning-fast security analysis",
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50 dark:bg-accent-900/20",
      iconColor: "text-accent-600 dark:text-accent-400",
    },
    {
      icon: BsShieldFillCheck,
      number: "Zero",
      label: "Data Stored",
      description: "Your privacy is completely protected",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-2">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 dark:from-primary-400 dark:to-teal-400">
              Powered by Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our advanced AI-driven security platform has analyzed thousands of
            applications, providing unparalleled protection against malicious
            banking apps
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-800/60 dark:to-gray-800/30 backdrop-blur-sm"></div>

              {/* Gradient Border on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-0.5`}
              >
                <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800"></div>
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-teal-600 dark:group-hover:from-primary-400 dark:group-hover:to-teal-400 transition-all duration-300">
                  {stat.number}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect Glow */}
                <div
                  className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Why This Matters Section */}
        <div className="mt-20 text-center animate-fade-up">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-warning-100 to-danger-100 dark:from-warning-900/30 dark:to-danger-900/30 border border-warning-200/50 dark:border-warning-700/50 mb-8">
            <HiShieldCheck className="w-5 h-5 text-warning-600 dark:text-warning-400 mr-2" />
            <span className="text-warning-700 dark:text-warning-300 font-medium">
              Why APK Security Matters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-danger-500 text-4xl mb-4">⚠️</div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Growing Threat
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Over 2.3 million fake banking apps detected in 2024, targeting
                users worldwide
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-danger-500 text-4xl mb-4">💳</div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Financial Risk
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                $2.1 billion lost globally due to malicious banking applications
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-success-500 text-4xl mb-4">🛡️</div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your Protection
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced detection prevents installation of dangerous
                applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
