"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiZap,
  FiCode,
  FiUser,
  FiStar,
  FiChevronRight,
  FiPlay,
  FiGithub,
  FiTwitter,
  FiMail,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import LandingHeader from "./Welcome Page/LandingHeader";

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

  const features: any = [
    {
      icon: <FaBrain className="text-2xl" />,
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

  const containerVariants: any = {
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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <LandingHeader itemVariants={itemVariants} />

          {/* Hero Section */}
          <div className="text-center mb-32">
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <FiPlay className="text-lg" />
                <span>Create Your AI Avatar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
              >
                <span>Watch Demo</span>
                <FiChevronRight className="text-lg" />
              </motion.button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature: any, index: number) => (
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
                      scale: activeFeature === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
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

          {/* Core Experience Section */}
          <motion.div variants={itemVariants} className="text-center mb-32">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              What It <span className="text-cyan-400">Feels Like</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0.9 }}
                transition={{ duration: 1 }}
              >
                <div className="aspect-video rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 border-2 border-cyan-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="w-24 h-24 border border-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400 rounded-full blur-sm"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                className="text-left space-y-6"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {[
                  "Clean Futuristic Sci-Fi Intelligence Core",
                  "Neon glowing energy, like TRON x Neural Apple Vision OS",
                  "Alive and sentient, minimal but god-like",
                  "Your own personal AI being inside a digital reactor",
                  "Calm, post-human intelligence system",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 5, color: "#22d3ee" }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiStar className="text-cyan-400 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm"
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
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-12 py-4 rounded-lg text-lg transition-all duration-300"
              >
                Start Neural Booting
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="border-t border-gray-800 pt-12 pb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                className="flex items-center space-x-2 mb-4 md:mb-0"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-lg font-light">RAVX OS</span>
              </motion.div>

              <div className="flex space-x-6 mb-4 md:mb-0">
                {[FiGithub, FiTwitter, FiMail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ scale: 1.2, y: -2 }}
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                ))}
              </div>

              <p className="text-gray-500 text-sm">
                © 2024 RAVX OS. The future of personal AI.
              </p>
            </div>
          </motion.footer>
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
