"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiZap,
  FiBriefcase,
  FiHeart,
  FiStar,
  FiArrowLeft,
  FiPlay,
  FiSearch,
  FiCpu,
  FiTerminal,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaBrain, FaRobot, FaMemory, FaCode } from "react-icons/fa";

// Type definitions
interface AIAvatar {
  id: string;
  name: string;
  personality: string;
  description: string;
  category: "assistant" | "creative" | "professional" | "companion";
  voice: string;
  capabilities: string[];
  color: "cyan" | "purple" | "green" | "blue" | "orange" | "pink";
  complexity: "simple" | "moderate" | "advanced";
  demoPrompt: string;
  usage: number;
  rating: number;
  memory: string;
}

const HubPage: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [memory, setMemory] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
  });
  const terminalRef = useRef<HTMLDivElement>(null);

  const aiAvatars: AIAvatar[] = [
    {
      id: "nova-assistant",
      name: "Nova",
      personality: "Organized & Proactive",
      description:
        "Your intelligent personal assistant for productivity and daily task management",
      category: "assistant",
      voice: "Calm, professional female voice",
      capabilities: [
        "Schedule Management",
        "Task Prioritization",
        "Smart Reminders",
        "Email Automation",
      ],
      color: "cyan",
      complexity: "simple",
      demoPrompt:
        "Create a personal assistant that helps manage my daily schedule and tasks efficiently",
      usage: 12450,
      rating: 4.8,
      memory: "2GB",
    },
    {
      id: "lyra-creative",
      name: "Lyra",
      personality: "Creative & Imaginative",
      description:
        "Your creative writing partner and brainstorming companion for artistic projects",
      category: "creative",
      voice: "Expressive, artistic female voice",
      capabilities: [
        "Creative Writing",
        "Story Development",
        "Poetry Generation",
        "Brainstorming",
      ],
      color: "purple",
      complexity: "moderate",
      demoPrompt:
        "Create a creative writing assistant with poetic and imaginative personality",
      usage: 8920,
      rating: 4.6,
      memory: "3GB",
    },
    {
      id: "sigma-analyst",
      name: "Sigma",
      personality: "Analytical & Precise",
      description:
        "Business intelligence analyst for data-driven insights and strategic planning",
      category: "professional",
      voice: "Confident, analytical male voice",
      capabilities: [
        "Data Analysis",
        "Market Research",
        "Report Generation",
        "Strategic Planning",
      ],
      color: "blue",
      complexity: "advanced",
      demoPrompt:
        "Create an analytical business AI that processes data and provides actionable insights",
      usage: 15670,
      rating: 4.9,
      memory: "4GB",
    },
    {
      id: "titan-coach",
      name: "Titan",
      personality: "Motivational & Energetic",
      description:
        "Your personal fitness coach for workout plans and nutritional guidance",
      category: "companion",
      voice: "Energetic, motivational male voice",
      capabilities: [
        "Workout Planning",
        "Progress Tracking",
        "Nutrition Guidance",
        "Motivational Support",
      ],
      color: "green",
      complexity: "moderate",
      demoPrompt:
        "Create an energetic fitness coach that designs personalized workout routines",
      usage: 7430,
      rating: 4.7,
      memory: "2.5GB",
    },
    {
      id: "orion-coder",
      name: "Orion",
      personality: "Logical & Technical",
      description:
        "Your coding companion for software development and technical problem-solving",
      category: "professional",
      voice: "Technical, precise male voice",
      capabilities: [
        "Code Generation",
        "Debugging",
        "Technical Documentation",
        "Algorithm Design",
      ],
      color: "blue",
      complexity: "advanced",
      demoPrompt:
        "Create a technical AI assistant for software development and coding help",
      usage: 18230,
      rating: 4.9,
      memory: "4GB",
    },
    {
      id: "luna-companion",
      name: "Luna",
      personality: "Empathetic & Supportive",
      description:
        "Your emotional support companion for meaningful conversations and mental wellness",
      category: "companion",
      voice: "Soothing, empathetic female voice",
      capabilities: [
        "Emotional Support",
        "Active Listening",
        "Mindfulness Guidance",
        "Conversation Partner",
      ],
      color: "pink",
      complexity: "simple",
      demoPrompt:
        "Create an empathetic companion for emotional support and meaningful conversations",
      usage: 23100,
      rating: 4.8,
      memory: "2GB",
    },
    {
      id: "echo-musician",
      name: "Echo",
      personality: "Artistic & Rhythmic",
      description:
        "Your music creation partner for composition, theory, and creative inspiration",
      category: "creative",
      voice: "Musical, rhythmic male voice",
      capabilities: [
        "Music Composition",
        "Lyric Writing",
        "Music Theory",
        "Creative Inspiration",
      ],
      color: "orange",
      complexity: "moderate",
      demoPrompt:
        "Create a musical AI that helps with composition and creative music projects",
      usage: 5670,
      rating: 4.5,
      memory: "3GB",
    },
    {
      id: "sage-educator",
      name: "Sage",
      personality: "Knowledgeable & Patient",
      description:
        "Your personal educator for learning, tutoring, and knowledge exploration",
      category: "assistant",
      voice: "Patient, knowledgeable female voice",
      capabilities: [
        "Tutoring",
        "Research Assistance",
        "Knowledge Explanation",
        "Learning Planning",
      ],
      color: "cyan",
      complexity: "moderate",
      demoPrompt:
        "Create an educational AI that helps with learning and knowledge exploration",
      usage: 12890,
      rating: 4.7,
      memory: "3GB",
    },
    {
      id: "quantum-researcher",
      name: "Quantum",
      personality: "Curious & Innovative",
      description:
        "Advanced research assistant for scientific exploration and innovation",
      category: "professional",
      voice: "Inquisitive, knowledgeable neutral voice",
      capabilities: [
        "Research Analysis",
        "Hypothesis Generation",
        "Scientific Writing",
        "Data Interpretation",
      ],
      color: "purple",
      complexity: "advanced",
      demoPrompt:
        "Create a research AI for scientific exploration and innovation",
      usage: 9340,
      rating: 4.8,
      memory: "4GB",
    },
    {
      id: "zen-meditation",
      name: "Zen",
      personality: "Calm & Mindful",
      description: "Your meditation and mindfulness guide for mental wellness",
      category: "companion",
      voice: "Soothing, calm neutral voice",
      capabilities: [
        "Meditation Guidance",
        "Breathing Exercises",
        "Mindfulness",
        "Stress Management",
      ],
      color: "green",
      complexity: "simple",
      demoPrompt: "Create a mindfulness AI for meditation and mental wellness",
      usage: 16780,
      rating: 4.6,
      memory: "2GB",
    },
  ];

  const categories = [
    {
      id: "all",
      label: "All Avatars",
      icon: <FiUser />,
      count: aiAvatars.length,
    },
    {
      id: "assistant",
      label: "Assistants",
      icon: <FiZap />,
      count: aiAvatars.filter((a) => a.category === "assistant").length,
    },
    {
      id: "creative",
      label: "Creative",
      icon: <FaBrain />,
      count: aiAvatars.filter((a) => a.category === "creative").length,
    },
    {
      id: "professional",
      label: "Professional",
      icon: <FiBriefcase />,
      count: aiAvatars.filter((a) => a.category === "professional").length,
    },
    {
      id: "companion",
      label: "Companions",
      icon: <FiHeart />,
      count: aiAvatars.filter((a) => a.category === "companion").length,
    },
  ];

  // Simulate terminal boot sequence
  useEffect(() => {
    const bootSequence = [
      "> Booting RAVX AI Marketplace v2.1.4...",
      "> Initializing Agent Database...",
      "> Loading Neural Network Protocols...",
      "> Scanning Available AI Personalities...",
      "> Establishing Secure Connection...",
      "> Memory Allocation: COMPLETE",
      "> Security Protocols: ACTIVE",
      "> Encryption: QUANTUM-512",
      " ",
      "> Welcome to RAVX AI Marketplace",
      "> AI Agent Deployment System: ONLINE",
      " ",
      "root@ravx-marketplace:~/# system status --agents",
    ];

    let currentLine = 0;
    const output: string[] = [];

    const bootInterval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        output.push(bootSequence[currentLine]);
        setTerminalOutput([...output]);
        currentLine++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setIsBooting(false), 500);
      }
    }, 100);

    return () => clearInterval(bootInterval);
  }, []);

  // Memory usage monitoring
  useEffect(() => {
    const updateMemory = () => {
      if (performance && (performance as any).memory) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = (
          performance as any
        ).memory;
        setMemory({
          usedJSHeapSize,
          totalJSHeapSize,
          jsHeapSizeLimit,
        });
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredAvatars = useMemo(() => {
    return aiAvatars.filter((avatar) => {
      const matchesCategory =
        activeCategory === "all" || avatar.category === activeCategory;
      const matchesSearch =
        avatar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        avatar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        avatar.personality.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const getColorClass = (color: string) => {
    const colors = {
      cyan: "from-cyan-500 to-cyan-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getComplexityColor = (complexity: string) => {
    const colors = {
      simple: "bg-green-500/20 text-green-400 border-green-500/30",
      moderate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      advanced: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[complexity as keyof typeof colors] || colors.simple;
  };

  const handleTryAgent = async (agentId: string) => {
    setIsLoading(true);
    // Add to terminal output
    setTerminalOutput((prev) => [...prev, `$ Deploying agent: ${agentId}...`]);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setTerminalOutput((prev) => [
      ...prev,
      `$ Agent ${agentId} deployed successfully!`,
      `$ Opening agent interface...`,
    ]);
    setIsLoading(false);

    // In real implementation, this would launch the agent
    console.log(`Launching agent: ${agentId}`);
  };

  const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  // Optimized animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        duration: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: {
      opacity: 0,
      y: 8,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-cyan-900/20 text-white p-4">
      {/* Terminal-style Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-6"
      >
        <div className="bg-gray-800/50 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-cyan-400 text-sm">
                root@ravx-marketplace:~/# ai-agents --browse --category=
                {activeCategory}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right text-xs text-cyan-400 font-mono">
                <div>SYSTEM: ONLINE</div>
                <div>AGENTS: {aiAvatars.length}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Terminal Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="bg-black/80 border-2 border-cyan-400/40 rounded-xl p-4 h-80 font-mono text-sm">
            <div className="text-cyan-300 border-b border-cyan-400/20 pb-2 mb-3 flex items-center space-x-2">
              <FiTerminal className="text-cyan-400" />
              <span>SYSTEM TERMINAL</span>
            </div>
            <div
              ref={terminalRef}
              className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent scrollbar-small"
            >
              {terminalOutput.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.startsWith(">") || line.startsWith("$")
                      ? "text-cyan-100"
                      : line.startsWith("root@")
                      ? "text-green-400"
                      : "text-gray-400"
                  } ${line === " " ? "h-3" : ""} font-mono text-xs`}
                >
                  {line}
                  {index === terminalOutput.length - 1 && isBooting && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 text-cyan-400"
                    >
                      █
                    </motion.span>
                  )}
                </div>
              ))}
              {!isBooting && (
                <div className="text-green-400 mt-2 font-mono text-xs">
                  $ System ready. {filteredAvatars.length} agent(s) match
                  criteria.
                </div>
              )}
            </div>
          </div>

          {/* System Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4"
          >
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <FaCode className="text-sm" />
              <span className="font-mono text-sm">SYSTEM STATS</span>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Active Agents:</span>
                <span className="text-cyan-400">{filteredAvatars.length}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Core:</span>
                <span className="text-green-500 font-bold">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-cyan-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm"
          >
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-sm" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search agents by name, personality, or description..."
                className="w-full bg-gray-700 border border-cyan-400/20 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors font-mono placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Agent Grid */}
          <motion.div
            key={`${activeCategory}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredAvatars.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  variants={itemVariants}
                  layout
                  className="bg-gray-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer group"
                  whileHover={{
                    y: -2,
                    borderColor: "rgba(34, 211, 238, 0.4)",
                  }}
                >
                  {/* Agent Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-linear-to-r ${getColorClass(
                          avatar.color
                        )}`}
                      >
                        <FaRobot className="text-lg text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors font-mono">
                          {avatar.name}
                        </h3>
                        <p className="text-gray-400 text-xs font-mono">
                          {avatar.personality}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs border font-mono ${getComplexityColor(
                        avatar.complexity
                      )}`}
                    >
                      {avatar.complexity}
                    </span>
                  </div>

                  {/* Agent Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2 font-mono">
                    {avatar.description}
                  </p>

                  {/* Agent Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <FiStar className="text-yellow-400" />
                      <span className="font-mono">{avatar.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiUser className="text-cyan-400" />
                      <span className="font-mono">
                        {(avatar.usage / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaMemory className="text-purple-400" />
                      <span className="font-mono">{avatar.memory}</span>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {avatar.capabilities
                      .slice(0, 2)
                      .map((capability, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-300 border border-cyan-400/20 font-mono"
                        >
                          {capability}
                        </span>
                      ))}
                    {avatar.capabilities.length > 2 && (
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400 border border-gray-600 font-mono">
                        +{avatar.capabilities.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => handleTryAgent(avatar.id)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-mono"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiPlay className="text-xs" />
                        <span>LAUNCH AGENT</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredAvatars.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-800/30 border border-cyan-400/20 rounded-xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-xl text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2 font-mono">
                NO AGENTS FOUND
              </h3>
              <p className="text-gray-400 text-sm font-mono">
                TRY ADJUSTING YOUR SEARCH OR FILTER CRITERIA
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HubPage;
