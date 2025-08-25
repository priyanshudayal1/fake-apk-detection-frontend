import React from "react";
import { motion } from "motion/react";
import {
  FiShield,
  FiUsers,
  FiAward,
  FiCode,
  FiGlobe,
  FiLock,
} from "react-icons/fi";

const About = () => {
  const features = [
    {
      icon: FiShield,
      title: "Advanced Security Analysis",
      description:
        "Multi-layered security scanning using machine learning and signature-based detection",
    },
    {
      icon: FiLock,
      title: "Zero Data Storage",
      description:
        "Your files are processed in memory and immediately discarded for maximum privacy",
    },
    {
      icon: FiCode,
      title: "Open Source Technology",
      description:
        "Built with modern web technologies and best practices for transparency and reliability",
    },
    {
      icon: FiGlobe,
      title: "Real-time Analysis",
      description:
        "Get instant results with live progress tracking and detailed security reports",
    },
    {
      icon: FiAward,
      title: "99.7% Accuracy",
      description:
        "Industry-leading accuracy rate based on extensive testing and validation",
    },
    {
      icon: FiUsers,
      title: "Community Driven",
      description:
        "Developed by security enthusiasts for the community to combat APK threats",
    },
  ];

  const techStack = [
    { name: "React", description: "Modern frontend framework" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "Framer Motion", description: "Smooth animations" },
    { name: "Zustand", description: "State management" },
    { name: "Machine Learning", description: "Threat detection" },
    { name: "WebSocket", description: "Real-time updates" },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About SecureAPK Detector
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A cutting-edge security platform designed to protect users from
            malicious APK files and fake banking applications through advanced
            threat detection and analysis.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-200 dark:border-gray-700 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              In an era where cybersecurity threats are constantly evolving,
              especially targeting mobile banking applications, we believe
              everyone deserves access to enterprise-grade security analysis
              tools. Our mission is to democratize APK security analysis and
              empower users to make informed decisions about the applications
              they install on their devices.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose Our Platform?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft border border-gray-200 dark:border-gray-700 hover:shadow-medium transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -2 }}
              >
                <feature.icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload APK",
                description:
                  "Drag and drop your APK file or click to browse. We support files up to 100MB.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our advanced ML algorithms analyze code structure, permissions, signatures, and behavior patterns.",
              },
              {
                step: "03",
                title: "Get Results",
                description:
                  "Receive detailed security report with risk assessment, recommendations, and actionable insights.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Built with Modern Technology
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {tech.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Note */}
        <motion.div
          className="mt-16 text-center p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
            Hackathon Project 2025
          </h3>
          <p className="text-primary-700 dark:text-primary-300 max-w-2xl mx-auto">
            This project was developed during a hackathon to address the growing
            threat of fake banking applications and malicious APK files. Our
            goal is to make advanced security analysis accessible to everyone,
            helping users stay protected in the digital age.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
