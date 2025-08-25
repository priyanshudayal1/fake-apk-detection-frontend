import React, { useState } from "react";
import { motion } from "motion/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the APK security analysis work?",
      answer:
        "Our system uses advanced machine learning algorithms and signature-based detection to analyze APK files. We examine the package structure, check digital signatures, analyze permissions, scan for malicious code patterns, and verify banking security protocols. The entire process is automated and typically takes 30-60 seconds.",
    },
    {
      question: "Is my APK file stored on your servers?",
      answer:
        "No, we follow a strict zero-data storage policy. Your APK file is processed in memory during the analysis and is immediately discarded afterward. We never store, cache, or retain any APK files or personal data on our servers.",
    },
    {
      question: "What types of threats can you detect?",
      answer:
        "Our system can detect various types of threats including malware signatures, trojans, spyware, suspicious permissions, code obfuscation, fake banking apps, phishing attempts, unauthorized network communications, and certificate fraud. We continuously update our threat database to catch the latest security risks.",
    },
    {
      question: "How accurate is the threat detection?",
      answer:
        "Our system maintains a 99.7% accuracy rate based on extensive testing with known malicious and legitimate APK files. However, no security system is 100% perfect, so we recommend using our analysis as part of a broader security strategy that includes keeping your devices updated and downloading apps from trusted sources.",
    },
    {
      question: "Can I analyze APK files from any source?",
      answer:
        "Yes, you can upload APK files from any source including third-party app stores, direct downloads, or files sent to you. However, we strongly recommend only installing APK files from trusted sources, especially for banking and financial applications.",
    },
    {
      question: "What should I do if an APK is marked as dangerous?",
      answer:
        "If an APK is marked as dangerous, do not install it. Delete the file immediately, run a security scan on your device, and report the threat to relevant authorities if necessary. Consider using official app stores and verify the publisher's authenticity before downloading banking apps.",
    },
    {
      question: "Why is this service free?",
      answer:
        "This service was developed as part of a hackathon project to demonstrate cybersecurity capabilities and help users protect themselves from fake banking apps. Our goal is to contribute to the security community and raise awareness about APK-based threats.",
    },
    {
      question: "Can I use this for commercial purposes?",
      answer:
        "This is currently a demonstration project. For commercial usage, please contact our team to discuss licensing options and enterprise-grade security analysis solutions with additional features and support.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our APK security analysis service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center p-8 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Still have questions?
          </h3>
          <p className="text-primary-700 dark:text-primary-300 mb-4">
            Our security experts are here to help you stay protected
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
