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
                className="bg-clip-text text-transparent bg-radial from-cyan-700 via-cyan-200 to-cyan-700 
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
                  <span className="bg-radial from-cyan-700 via-cyan-200 to-cyan-800 bg-clip-text text-transparent">
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
                        <FiMessageSquare className="text-pink-400 text-xl" />
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

              {/* AI Avatar Creation Journey */}
              <motion.div
                className="relative bg-linear-to-br from-gray-900/40 via-black to-cyan-900/20 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 lg:p-12 mb-16 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10">
                  {/* Section Header */}
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="text-cyan-400 text-sm font-mono tracking-wider">
                        AVATAR CREATION ENGINE
                      </span>
                    </motion.div>

                    <h3 className="text-4xl lg:text-5xl font-bold mb-2 bg-radial from-cyan-700 via-cyan-200 to-cyan-700 bg-clip-text text-transparent leading-16">
                      Forge Your Digital Companion
                    </h3>
                    <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto">
                      Transform your vision into a fully functional AI avatar
                      with our intuitive creation pipeline. No code
                      required—just your imagination and our advanced neural
                      framework.
                    </p>
                  </motion.div>

                  {/* Creation Process Timeline */}
                  <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500/20 via-cyan-400/40 to-cyan-500/20 transform -translate-x-1/2 hidden lg:block" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                      {[
                        {
                          phase: "CONCEPTION",
                          title: "Define Neural Identity",
                          description:
                            "Shape your avatar's core personality, expertise domains, and behavioral patterns through natural language. Our AI interprets your vision and constructs a unique digital consciousness.",
                          features: [
                            "Personality Matrix",
                            "Knowledge Domains",
                            "Communication Style",
                            "Behavioral Patterns",
                          ],
                          icon: "🧠",
                          gradient: "from-purple-500/20 to-cyan-500/20",
                          delay: 0.2,
                        },
                        {
                          phase: "CUSTOMIZATION",
                          title: "Craft Interaction Layer",
                          description:
                            "Fine-tune voice characteristics, response patterns, and specialized capabilities. Integrate with tools and APIs to empower your avatar with real-world functionality.",
                          features: [
                            "Voice Synthesis",
                            "MCP Integration",
                            "API Endpoints",
                            "Response Calibration",
                          ],
                          icon: "⚙️",
                          gradient: "from-cyan-500/20 to-blue-500/20",
                          delay: 0.4,
                        },
                        {
                          phase: "ACTIVATION",
                          title: "Deploy & Evolve",
                          description:
                            "Launch your AI avatar into the RAVX ecosystem. Watch as it learns from interactions, adapts to your needs, and grows more intelligent with every conversation.",
                          features: [
                            "Live Deployment",
                            "Continuous Learning",
                            "Memory Integration",
                            "Performance Analytics",
                          ],
                          icon: "🚀",
                          gradient: "from-blue-500/20 to-green-500/20",
                          delay: 0.6,
                        },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className={`relative bg-gray-900/40 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-8 lg:p-8 hover:border-cyan-400/40 transition-all duration-500 group ${
                            index === 1 ? "lg:transform lg:translate-y-8" : ""
                          }`}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{
                            y: -5,
                            borderColor: "rgba(34, 211, 238, 0.4)",
                            boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)",
                          }}
                          transition={{ duration: 0.6, delay: step.delay }}
                          viewport={{ once: true }}
                        >
                          {/* Step Indicator */}
                          <div className="flex items-center justify-between mb-6">
                            <motion.div
                              className={`inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r ${step.gradient} border border-cyan-400/30 rounded-full`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-cyan-400 text-xs font-mono font-semibold tracking-wider">
                                {step.phase}
                              </span>
                            </motion.div>

                            <motion.div
                              className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              {step.icon}
                            </motion.div>
                          </div>

                          {/* Content */}
                          <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                            {step.title}
                          </h4>

                          <p className="text-gray-300 leading-relaxed mb-6">
                            {step.description}
                          </p>

                          {/* Features List */}
                          <div className="space-y-3">
                            {step.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-center gap-3 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: step.delay + featureIndex * 0.1,
                                }}
                                viewport={{ once: true }}
                              >
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                                <span className="text-cyan-100 font-medium">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    className="text-center mt-16 pt-8 border-t border-cyan-400/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-gray-300 mb-6 text-lg">
                      Ready to bring your AI companion to life?
                    </p>
                    <Link href="/register">
                      <motion.button
                        className="group relative bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 30px rgba(34, 211, 238, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">
                          Start Creating Your Avatar
                        </span>

                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                          whileHover={{ opacity: 1 }}
                        />

                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                          whileHover={{ translateX: "100%" }}
                        />
                      </motion.button>
                    </Link>

                    <p className="text-cyan-400/60 text-sm mt-4 font-mono">
                      No technical expertise required • Instant deployment •
                      Continuous AI evolution
                    </p>
                  </motion.div>
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
                    className="bg-linear-to-tr from-cyan-400 via-cyan-800 to-cyan-200 hover:to-cyan-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 text-lg cursor-pointer"
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
              className="bg-linear-to-r from-cyan-500/10 to-sky-300/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm"
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
