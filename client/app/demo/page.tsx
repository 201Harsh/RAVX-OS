import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiDatabase,
  FiCode,
  FiZap,
  FiServer,
  FiGitBranch,
  FiShield,
  FiArrowLeft,
  FiBookOpen,
  FiLayers,
  FiCloud,
  FiMessageSquare,
  FiUser,
  FiAward,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaBrain } from "react-icons/fa";

// Type definitions
interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  components: string[];
  icon: React.ReactElement;
  color: "cyan" | "purple" | "green" | "blue";
}

interface TrainingPhase {
  phase: string;
  title: string;
  description: string;
  duration: string;
  dataUsed: string;
  outcome: string;
}

interface ModelSpec {
  name: string;
  parameters: string;
  trainingData: string;
  capabilities: string[];
  limitations: string[];
}

const DemoPage: React.FC = () => {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<string>("neural-core");

  const architectureLayers: ArchitectureLayer[] = [
    {
      id: "neural-core",
      name: "Neural Core Engine",
      description:
        "The foundational neural network that powers all AI avatar intelligence and learning capabilities",
      components: [
        "Transformer-based Architecture",
        "Multi-modal Learning Systems",
        "Attention Mechanisms",
        "Neural Weight Optimization",
      ],
      icon: <FaBrain className="text-2xl" />,
      color: "cyan",
    },
    {
      id: "memory-system",
      name: "Persistent Memory System",
      description:
        "Long-term memory storage and retrieval system that enables continuous learning",
      components: [
        "Vector Database Storage",
        "Semantic Search Index",
        "Memory Compression",
        "Contextual Recall",
      ],
      icon: <FiDatabase className="text-2xl" />,
      color: "purple",
    },
    {
      id: "voice-engine",
      name: "Voice Synthesis Engine",
      description:
        "Real-time neural voice generation with emotional intelligence and tone variation",
      components: [
        "Neural Text-to-Speech",
        "Emotional Tone Modeling",
        "Real-time Processing",
        "Voice Cloning Technology",
      ],
      icon: <FiMessageSquare className="text-2xl" />,
      color: "green",
    },
    {
      id: "mcp-integration",
      name: "MCP Task Execution",
      description:
        "Model Context Protocol integration for real-world task execution and automation",
      components: [
        "API Integration Layer",
        "Task Decomposition",
        "Safety Validators",
        "Execution Monitoring",
      ],
      icon: <FiGitBranch className="text-2xl" />,
      color: "blue",
    },
  ];

  const trainingPhases: TrainingPhase[] = [
    {
      phase: "Phase 1",
      title: "Foundation Pre-training",
      description:
        "Initial training on massive diverse datasets to build general intelligence capabilities",
      duration: "4-6 weeks",
      dataUsed: "10TB+ of text, code, and conversational data",
      outcome: "Base language understanding and reasoning capabilities",
    },
    {
      phase: "Phase 2",
      title: "Specialized Fine-tuning",
      description:
        "Targeted training on specific domains and personality traits",
      duration: "2-3 weeks",
      dataUsed: "Curated datasets for specific avatar types",
      outcome: "Domain-specific expertise and personality development",
    },
    {
      phase: "Phase 3",
      title: "Reinforcement Learning",
      description:
        "Interactive learning through human feedback and preference optimization",
      duration: "1-2 weeks",
      dataUsed: "Human preference data and interaction logs",
      outcome: "Improved conversation quality and user alignment",
    },
    {
      phase: "Phase 4",
      title: "Real-time Adaptation",
      description: "Continuous learning from user interactions and feedback",
      duration: "Ongoing",
      dataUsed: "User conversations and explicit feedback",
      outcome: "Personalized adaptation and memory formation",
    },
  ];

  const modelSpecs: ModelSpec[] = [
    {
      name: "RAVX-Core-7B",
      parameters: "7 Billion",
      trainingData: "Multimodal (Text, Code, Conversations)",
      capabilities: [
        "Natural Language Understanding",
        "Code Generation",
        "Logical Reasoning",
        "Emotional Intelligence",
      ],
      limitations: [
        "Requires fine-tuning for specific domains",
        "Limited to trained knowledge cutoff",
        "Computationally intensive for real-time",
      ],
    },
    {
      name: "RAVX-Voice-2B",
      parameters: "2 Billion",
      trainingData: "Speech & Emotional Data",
      capabilities: [
        "Real-time Voice Synthesis",
        "Emotional Tone Variation",
        "Multiple Language Support",
        "Voice Style Transfer",
      ],
      limitations: [
        "Requires quality audio data",
        "Limited voice customization without samples",
        "Processing latency on low-end devices",
      ],
    },
    {
      name: "RAVX-Memory-1B",
      parameters: "1 Billion",
      trainingData: "Structured & Unstructured Data",
      capabilities: [
        "Long-term Memory Storage",
        "Semantic Search",
        "Context Recall",
        "Knowledge Compression",
      ],
      limitations: [
        "Memory capacity constraints",
        "Recall accuracy decreases with scale",
        "Requires vector database infrastructure",
      ],
    },
  ];

  const selectedLayer = architectureLayers.find(
    (layer) => layer.id === activeLayer
  );

  const getColorClass = (color: string): string => {
    const colors = {
      cyan: "from-cyan-500 to-cyan-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getBorderColorClass = (color: string): string => {
    const colors = {
      cyan: "border-cyan-400",
      purple: "border-purple-400",
      green: "border-green-400",
      blue: "border-blue-400",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getBackgroundColorClass = (color: string): string => {
    const colors = {
      cyan: "bg-cyan-500/20",
      purple: "bg-purple-500/20",
      green: "bg-green-500/20",
      blue: "bg-blue-500/20",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getShadowColorClass = (color: string): string => {
    const colors = {
      cyan: "shadow-cyan-500/20",
      purple: "shadow-purple-500/20",
      green: "shadow-green-500/20",
      blue: "shadow-blue-500/20",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
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

  const itemVariants : any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              AI Architecture
            </h1>
            <p className="text-gray-400 mt-2">
              How RAVX OS Creates Intelligent AI Avatars
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        {/* Architecture Overview */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
          >
            System Architecture
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {architectureLayers.map((layer) => (
              <motion.button
                key={layer.id}
                variants={itemVariants}
                onClick={() => setActiveLayer(layer.id)}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left ${
                  activeLayer === layer.id
                    ? `${getBorderColorClass(
                        layer.color
                      )} ${getBackgroundColorClass(
                        layer.color
                      )} shadow-lg ${getShadowColorClass(layer.color)}`
                    : "border-gray-700 bg-gray-800/20 hover:border-cyan-400/30"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`p-3 rounded-xl bg-linear-to-r ${getColorClass(
                    layer.color
                  )} mb-4 inline-block`}
                >
                  {layer.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {layer.name}
                </h3>
                <p className="text-gray-400 text-sm">{layer.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Layer Details */}
          {selectedLayer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {selectedLayer.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedLayer.description}
                  </p>

                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                    Key Components
                  </h4>
                  <div className="space-y-3">
                    {selectedLayer.components.map((component, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span>{component}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                    Technical Specifications
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-gray-400">Layer Type:</span>
                      <p className="text-white">Neural Network Module</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Processing:</span>
                      <p className="text-white">Real-time Inference</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Integration:</span>
                      <p className="text-white">API-based Communication</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Scalability:</span>
                      <p className="text-white">Horizontal Scaling Supported</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Training Process */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
          >
            Model Training Process
          </motion.h2>

          <div className="max-w-6xl mx-auto">
            {trainingPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                variants={itemVariants}
                className="flex flex-col md:flex-row mb-8 last:mb-0"
              >
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
                      <FiAward className="text-xl" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-cyan-400 block">
                        {phase.phase}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{phase.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Data Used:</span>
                        <p className="text-cyan-400">{phase.dataUsed}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Outcome:</span>
                        <p className="text-green-400">{phase.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Model Specifications */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
          >
            Model Specifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {modelSpecs.map((model, index) => (
              <motion.div
                key={model.name}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                    <FiCpu className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {model.name}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-gray-400 text-sm">Parameters:</span>
                    <p className="text-cyan-400 font-semibold">
                      {model.parameters}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      Training Data:
                    </span>
                    <p className="text-gray-300 text-sm">
                      {model.trainingData}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 text-sm font-semibold mb-2">
                      Capabilities
                    </h4>
                    <div className="space-y-1">
                      {model.capabilities.map((capability, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-gray-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-red-400 text-sm font-semibold mb-2">
                      Limitations
                    </h4>
                    <div className="space-y-1">
                      {model.limitations.map((limitation, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-gray-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Infrastructure */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm max-w-4xl mx-auto">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <FiServer className="text-4xl text-cyan-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
              Infrastructure & Scaling
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              RAVX OS runs on distributed cloud infrastructure with automatic
              scaling, ensuring reliable performance for millions of
              simultaneous AI avatars. Our architecture supports real-time
              inference, continuous learning, and seamless integration with
              external services.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { label: "GPU Clusters", value: "100+" },
                { label: "Inference Speed", value: "<200ms" },
                { label: "Uptime", value: "99.9%" },
                { label: "Global Regions", value: "12" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-gray-600"
                >
                  <div className="text-cyan-400 font-bold text-lg">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DemoPage;
