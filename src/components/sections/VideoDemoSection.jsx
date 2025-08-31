import React from "react";
import { HiPlay, HiEye } from "react-icons/hi";
import { BsPlayCircle, BsShieldCheck } from "react-icons/bs";

const VideoDemoSection = () => {
  return (
    <section id="demo" className="relative overflow-hidden">
      {/* Navy Header Section */}
      <div
        className="bg-primary-600 text-white py-16 md:py-20"
        style={{ backgroundColor: "#3c4e66" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <BsPlayCircle className="w-4 h-4 mr-2" />
              Live Demo
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              See Our System in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-yellow-300">
                Action
              </span>
            </h2>

            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Watch how our AI-powered fake APK detection system analyzes
              banking applications and identifies security threats in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Teal Video Section */}
      <div
        className="bg-secondary-500 py-16"
        style={{ backgroundColor: "#7fb3a6" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video Container */}
          <div
            className="max-w-5xl mx-auto animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative">
              {/* Video Frame with Enhanced Styling */}
              <div className="relative rounded-2xl overflow-hidden bg-white p-2 shadow-2xl border border-white/20">
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/ZK-rNEhJIDs?si=Xy6bcJtfgbVdy2Y4"
                    title="Fake APK Detection System Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full aspect-video"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sky Blue Features Section */}
      <div className="bg-blue-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {[
              {
                icon: HiPlay,
                title: "Real-time Analysis",
                description: "Watch live APK scanning process",
                color: "from-slate-700 to-slate-800",
                bgColor: "#3c4e66",
              },
              {
                icon: BsShieldCheck,
                title: "Security Insights",
                description: "Detailed threat detection breakdown",
                color: "from-teal-600 to-teal-700",
                bgColor: "#659085",
              },
              {
                icon: HiEye,
                title: "User Interface",
                description: "Intuitive dashboard walkthrough",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "#d19c5a",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg mb-4`}
                  style={{
                    background: `linear-gradient(135deg, ${feature.bgColor}, ${feature.bgColor}dd)`,
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beige CTA Section */}
      <div className="py-16" style={{ backgroundColor: "#e8d7c9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            <p className="text-lg text-gray-800 mb-6">
              Ready to secure your banking applications?
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: "#3c4e66" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#334157")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3c4e66")}
            >
              <BsShieldCheck className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Your Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
