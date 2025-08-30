import React from "react";
import { HiShieldCheck, HiMail, HiGlobeAlt } from "react-icons/hi";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 shadow-lg">
                  <HiShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">
                    SecureAPK
                    <span className="text-primary-400 ml-1">Detector</span>
                  </h1>
                  <p className="text-sm text-gray-400">Digital Rakshak</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Advanced AI-powered security analysis for banking APK files.
                Protecting users from malicious applications with real-time
                threat detection.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label="GitHub"
                >
                  <BsGithub className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label="Twitter"
                >
                  <BsTwitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <BsLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#about" },
                  { name: "FAQ", href: "#faq" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Security Guidelines",
                  "Threat Database",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: "10,000+", label: "APKs Analyzed" },
                { number: "99.7%", label: "Accuracy Rate" },
                { number: "< 2s", label: "Analysis Time" },
                { number: "0", label: "Data Stored" },
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 SecureAPK Detector. Built for Digital Rakshak Hackathon.
                All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-gray-400">
                  <HiGlobeAlt className="w-4 h-4 mr-2" />
                  Made in India
                </div>
                <div className="flex items-center text-gray-400">
                  <HiMail className="w-4 h-4 mr-2" />
                  security@secureapk.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
