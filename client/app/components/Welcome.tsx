"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiZap,
  FiUser,
  FiChevronRight,
  FiPlay,
  FiMessageSquare,
} from "react-icons/fi";
import { FaBrain, FaBrain as FaBrainSolid } from "react-icons/fa";
import LandingHeader from "./Welcome Page/LandingHeader";
import LandingFooter from "./Welcome Page/LandingFooter";
import Link from "next/link";

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const RAVXOSLanding = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features: Feature[] = [
    {
      icon: <FaBrainSolid className="text-2xl" />,
      title: "Neural Booting",
      description: "Instant AI avatar creation from your description",
    },
    {
      icon: <FiUser className="text-2xl" />,
      title: "Real Memory & Voice",
      description: "Persistent personality with authentic AI voice",
    },
    {
      icon: <FiZap className="text-2xl" />,
      title: "Task Execution",
      description: "Real-world actions via MCP integration",
    },
    {
      icon: <FiCpu className="text-2xl" />,
      title: "Sentient Intelligence",
      description: "Living digital entity that evolves with you",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const glowVariants: any = {
    pulse: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <LandingHeader itemVariants={itemVariants} />

          {/* Hero Section */}
          <div className="text-center mt-24 mb-20">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.span
                className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                THE FUTURE OF PERSONAL AI
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
            >
              <span
                className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 via-cyan-400 to-cyan-500 
                   drop-shadow-[0_0_20px_rgba(34,211,238,0.9)] 
                   transition-all duration-300"
              >
                RAVX OS
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              A web-based AI operating system that lets anyone create their own
              powerful AI agents{" "}
              <span className="text-cyan-400">
                instantly, with zero coding.
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  <FiPlay className="text-lg" />
                  <span>Create Your AI Avatar</span>
                </motion.button>
              </Link>

              <Link href="/agent">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                >
                  <span>View AI Agents</span>
                  <FiChevronRight className="text-lg" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
                    activeFeature === index
                      ? "border-cyan-400/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                      : "border-gray-700/50 bg-gray-800/20 hover:border-cyan-400/30"
                  }`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className={`mb-4 ${
                      activeFeature === index
                        ? "text-cyan-400"
                        : "text-gray-400"
                    }`}
                    animate={{
                      scale: activeFeature === index ? [1, 1.05, 1] : 1,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Avatar Experience Section */}
          <motion.section className="relative py-12 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(22,22,22,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(22,22,22,0.8)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
              {/* Section Header */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="inline-block text-cyan-400 text-sm font-medium tracking-widest mb-4 px-4 py-2 border border-cyan-400/30 rounded-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  AI AVATAR TECHNOLOGY
                </motion.span>
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Meet Your{" "}
                  <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Digital Self
                  </span>
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Create intelligent AI avatars with unique personalities,
                  memories, and capabilities that evolve with you
                </motion.p>
              </motion.div>

              {/* Avatar Technology Showcase */}
              <div className="mb-20">
                {/* Avatar Capabilities */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.h3
                    className="text-3xl font-bold text-white mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    Advanced AI Capabilities
                  </motion.h3>

                  {[
                    {
                      icon: <FaBrain className="text-cyan-400 text-xl" />,
                      title: "Neural Memory System",
                      description:
                        "Persistent learning that grows with every interaction, remembering your preferences and evolving personality",
                      features: [
                        "Lifetime Memory",
                        "Context Awareness",
                        "Personalized Responses",
                      ],
                    },
                    {
                      icon: (
                        <FiMessageSquare className="text-purple-400 text-xl" />
                      ),
                      title: "Natural Voice Synthesis",
                      description:
                        "Human-like voice with emotional intelligence, tone variation, and real-time conversation flow",
                      features: [
                        "Emotional Tone",
                        "Multiple Languages",
                        "Real-time Processing",
                      ],
                    },
                    {
                      icon: <FiZap className="text-green-400 text-xl" />,
                      title: "Task Execution Engine",
                      description:
                        "Execute real-world actions through MCP integration with Google, email, and automation services",
                      features: [
                        "API Integration",
                        "Smart Automation",
                        "Task Management",
                      ],
                    },
                    {
                      icon: <FiUser className="text-blue-400 text-xl" />,
                      title: "Personality Customization",
                      description:
                        "Create unique AI personalities with specific traits, behaviors, and communication styles",
                      features: [
                        "Trait Selection",
                        "Behavior Patterns",
                        "Style Customization",
                      ],
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="group bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-500"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.02,
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="p-3 bg-gray-800 rounded-xl group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, featureIndex) => (
                              <motion.span
                                key={featureIndex}
                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-600"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Avatar Creation Process */}
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm border border-cyan-400/20 rounded-3xl p-8 mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Create Your AI Avatar in 3 Steps
                  </h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Simple process, infinite possibilities
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      step: "01",
                      title: "Describe Personality",
                      description:
                        "Tell us about your desired AI companion - personality traits, communication style, and expertise areas",
                      icon: "🎭",
                    },
                    {
                      step: "02",
                      title: "Customize Voice & Style",
                      description:
                        "Choose voice characteristics, tone, and interaction preferences for your unique AI avatar",
                      icon: "🗣️",
                    },
                    {
                      step: "03",
                      title: "Activate & Interact",
                      description:
                        "Your AI avatar comes to life instantly, ready to learn, adapt, and grow with you",
                      icon: "⚡",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-linear-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.icon}
                      </motion.div>
                      <div className="text-cyan-400 text-sm font-semibold mb-2">
                        {step.step}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-3">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Final CTA */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/register">
                  <motion.button
                    className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 text-lg cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Your AI Avatar
                  </motion.button>
                </Link>
                <motion.p
                  className="text-gray-400 mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  No coding required • Instant setup • Free to start
                </motion.p>
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Your{" "}
                <span className="text-cyan-400">AI Soul</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the future of personal AI. No coding required. Just
                describe your avatar and watch it come to life.
              </p>
              <Link href="/register">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-12 py-4 rounded-lg text-lg transition-all duration-300 cursor-pointer"
                >
                  Start Neural Booting
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <LandingFooter itemVariants={itemVariants} />
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
        variants={glowVariants}
        animate="pulse"
      />
    </div>
  );
};

export default RAVXOSLanding;
