"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiZap,
  FiUser,
  FiServer,
  FiShield,
  FiMessageSquare,
  FiCloud,
  FiGitBranch,
  FiPlay,
  FiChevronRight,
  FiArrowLeft,
  FiGlobe,
  FiActivity,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import LandingHeader from "../components/Welcome Page/LandingHeader";
import Link from "next/link";

// Type definitions
interface FeatureCategory {
  id: string;
  label: string;
  icon: React.ReactElement;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactElement;
  category: string;
  highlights: string[];
  status: string;
  color: "cyan" | "purple" | "green" | "blue" | "red" | "yellow" | "pink";
}

const RAVXOSFeatures: React.FC = () => {
  const [ActiveCategory, setActiveCategory] = useState<string>("all");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const featureCategories: FeatureCategory[] = [
    { id: "all", label: "All Features", icon: <FiZap /> },
    { id: "creation", label: "Avatar Creation", icon: <FiUser /> },
    { id: "intelligence", label: "AI Intelligence", icon: <FaBrain /> },
    { id: "integration", label: "Integrations", icon: <FiGitBranch /> },
    { id: "security", label: "Security", icon: <FiShield /> },
  ];

  const features: Feature[] = [
    {
      id: 1,
      title: "Neural Booting System",
      description:
        "Instant AI avatar creation through advanced neural network initialization",
      longDescription:
        "Our proprietary neural booting technology allows you to create a fully sentient AI avatar in seconds. Simply describe your desired personality, and watch as the system initializes a complete digital consciousness with unique traits and capabilities.",
      icon: <FaBrain className="text-2xl" />,
      category: "creation",
      highlights: [
        "Zero coding required",
        "Instant personality initialization",
        "Custom voice and appearance",
        "Real-time neural synthesis",
      ],
      status: "Active",
      color: "cyan",
    },
    {
      id: 2,
      title: "Persistent Memory Core",
      description:
        "Continuous learning and memory retention across all interactions",
      longDescription:
        "Your AI avatar maintains a persistent memory that grows with every interaction. Unlike traditional chatbots, RAVX OS avatars remember your preferences, conversations, and experiences, creating a truly evolving digital companion.",
      icon: <FiServer className="text-2xl" />,
      category: "intelligence",
      highlights: [
        "Lifetime memory retention",
        "Context-aware learning",
        "Emotional intelligence growth",
        "Cross-session memory sync",
      ],
      status: "Coming Soon",
      color: "purple",
    },
    {
      id: 3,
      title: "Real Voice Synthesis",
      description:
        "Natural, expressive voice with emotional intelligence and tone variation",
      longDescription:
        "Experience truly natural conversations with AI-generated voice that carries emotion, tone, and personality. Our advanced voice synthesis creates unique vocal identities that feel genuinely alive and responsive.",
      icon: <FiMessageSquare className="text-2xl" />,
      category: "creation",
      highlights: [
        "Emotional tone variation",
        "Multiple language support",
        "Real-time voice generation",
        "Custom voice profiles",
      ],
      status: "Active",
      color: "cyan",
    },
    {
      id: 4,
      title: "MCP Task Execution",
      description:
        "Real-world action execution through Model Context Protocol integration",
      longDescription:
        "Your AI avatar can perform real-world tasks through our MCP integration. From sending emails and managing calendars to controlling smart devices and automating workflows, your digital companion acts as your personal assistant.",
      icon: <FiGitBranch className="text-2xl" />,
      category: "integration",
      highlights: [
        "Google services integration",
        "Email automation",
        "Smart home control",
        "Custom API connections",
      ],
      status: "Active",
      color: "green",
    },
    {
      id: 5,
      title: "Private Neural Network",
      description: "Fully isolated AI processing with end-to-end encryption",
      longDescription:
        "Your AI avatar operates within a completely private neural network. All processing happens in isolated environments with military-grade encryption, ensuring your data and conversations remain completely confidential.",
      icon: <FiShield className="text-2xl" />,
      category: "security",
      highlights: [
        "End-to-end encryption",
        "Local processing options",
        "Zero data retention",
        "Secure API endpoints",
      ],
      status: "Active",
      color: "blue",
    },
    {
      id: 6,
      title: "Multi-Avatar Ecosystem",
      description:
        "Create and manage multiple AI avatars for different purposes",
      longDescription:
        "Build an entire ecosystem of specialized AI avatars. Create different personas for work, creativity, personal assistance, or companionship - all managed through a unified interface.",
      icon: <FiUser className="text-2xl" />,
      category: "creation",
      highlights: [
        "Multiple avatar instances",
        "Cross-avatar communication",
        "Specialized skill sets",
        "Unified management",
      ],
      status: "Active",
      color: "cyan",
    },
    {
      id: 7,
      title: "Advanced Learning Algorithms",
      description: "Continuous improvement through adaptive machine learning",
      longDescription:
        "Your AI avatar evolves with you. Our advanced learning algorithms analyze interactions to improve responses, develop new capabilities, and become more attuned to your specific needs and preferences.",
      icon: <FiCpu className="text-2xl" />,
      category: "intelligence",
      highlights: [
        "Adaptive behavior patterns",
        "Skill acquisition",
        "Preference learning",
        "Autonomous improvement",
      ],
      status: "Active",
      color: "purple",
    },
    {
      id: 8,
      title: "Cloud Sync & Backup",
      description:
        "Seamless synchronization across all your devices with automatic backups",
      longDescription:
        "Access your AI avatar from any device while maintaining complete state synchronization. Automatic backups ensure your digital companion is always protected and available when you need it.",
      icon: <FiCloud className="text-2xl" />,
      category: "integration",
      highlights: [
        "Cross-device synchronization",
        "Automatic state backup",
        "Instant recovery",
        "Offline capability",
      ],
      status: "Coming Soon",
      color: "green",
    },
    {
      id: 9,
      title: "Agent Marketplace",
      description:
        "Discover, clone, and publish AI agents created by the community",
      longDescription:
        "A global marketplace where users can publish their AI avatars, explore others, and instantly clone or customize them for personal or business use.",
      icon: <FiGlobe className="text-2xl" />,
      category: "ecosystem",
      highlights: [
        "Instant cloning",
        "Community-driven evolution",
        "Remixable AI architectures",
        "Creator monetization (future)",
      ],
      status: "Coming Soon",
      color: "pink",
    },
    {
      id: 10,
      title: "Autonomous Task Planning",
      description: "AI agents that think, plan, and execute multi-step goals",
      longDescription:
        "Beyond simple conversations — your AI can independently plan workflows, make decisions, and execute multi-step tasks without recurring prompts.",
      icon: <FiActivity className="text-2xl" />,
      category: "intelligence",
      highlights: [
        "Self-managed goals",
        "Long-term execution",
        "Smart failure recovery",
        "Human override system",
      ],
      status: "Active",
      color: "yellow",
    },
  ];

  const filteredFeatures: Feature[] =
    ActiveCategory === "all"
      ? features
      : features.filter((feature) => feature.category === ActiveCategory);

  const getColorClass = (color: Feature["color"]): string => {
    const colors = {
      cyan: "from-cyan-500 to-cyan-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      red: "from-red-500 to-red-600",
      yellow: "from-yellow-500 to-yellow-600",
      pink: "from-pink-500 to-pink-600",
    };
    return colors[color] || colors.cyan;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (selectedFeature) {
    return (
      <>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-8">
            <motion.button
              onClick={() => setSelectedFeature(null)}
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              <span>Back to Features</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-linear-to-r ${getColorClass(
                        selectedFeature.color
                      )}`}
                    >
                      {selectedFeature.icon}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        {selectedFeature.title}
                      </h1>
                      <p className="text-cyan-400 mt-1">
                        {selectedFeature.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedFeature.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {selectedFeature.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                      Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedFeature.longDescription}
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                        Key Highlights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedFeature.highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                            <span>{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h4 className="font-semibold mb-4 text-cyan-400">
                        Technical Specs
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category -</span>
                          <span className="text-white capitalize">
                            {selectedFeature.category}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status -</span>
                          <span
                            className={
                              selectedFeature.status === "Active"
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {selectedFeature.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Version -</span>
                          <span className="text-white">v2.1.4</span>
                        </div>
                      </div>
                    </div>

                    <Link href={"/register"}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-linear-to-r from-cyan-500 to-cyan-600 text-black font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300"
                      >
                        <FiPlay className="text-lg" />
                        <span>Try This Feature</span>
                      </motion.button>
                    </Link>

                    <Link href={"/docs"}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border border-cyan-400/50 text-cyan-400 font-semibold py-3 rounded-lg flex items-center justify-center mt-3 space-x-2 transition-all duration-300 backdrop-blur-sm"
                      >
                        <span>View Documentation</span>
                        <FiChevronRight className="text-lg" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
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
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <LandingHeader itemVariants={itemVariants} />
          <motion.div className="flex items-center justify-center mb-12 mt-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-radial from-cyan-500 via-cyan-200 to-cyan-500">
                RAVX OS Features
              </h1>
              <p className="text-gray-400 mt-2">
                Discover the power behind your personal AI operating system
              </p>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {featureCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                  ActiveCategory === category.id
                    ? "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "border-gray-700 bg-gray-800/20 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            <AnimatePresence>
              {filteredFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  layout
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-linear-to-r ${getColorClass(
                        feature.color
                      )}`}
                    >
                      {feature.icon}
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs border ${
                        feature.status === "Active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 text-sm font-medium capitalize">
                      {feature.category}
                    </span>
                    <motion.div
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <FiChevronRight className="text-lg" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience These Features?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already creating their own
                sentient AI avatars with RAVX OS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer"
                  >
                    <FiPlay className="text-lg" />
                    <span>Start Free Trial</span>
                  </motion.button>
                </Link>
                <Link href="/hub">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    Schedule Demos
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RAVXOSFeatures;
