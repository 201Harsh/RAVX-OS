"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiStar, FiPlay, FiSearch, FiTerminal } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaBrain, FaRobot, FaMemory, FaCode } from "react-icons/fa";
import { AIAgent } from "../types/Type";
import { toast } from "react-toastify";
import AxiosInstance from "@/config/Axios";

const HubPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [aiAvatars, setaiAvatars] = useState<AIAgent[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);

  const getAIAgents = async () => {
    try {
      const res = await AxiosInstance.get("/ai/get/all/agents");

      if (res.status === 200) {
        const AIAgents = res.data.AIAgent;
        console.log("Fetched AI Agents:", AIAgents); // Debug log
        setaiAvatars(AIAgents);

        // Update terminal with actual agent count
        if (!isBooting) {
          setTerminalOutput((prev) => [
            ...prev,
            `$ Loaded ${AIAgents.length} AI agents from database`,
          ]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching AI agents:", error);
      toast.error(error.response?.data?.message || "Failed to load AI agents");

      // Update terminal with error
      if (!isBooting) {
        setTerminalOutput((prev) => [
          ...prev,
          `$ ERROR: Failed to load agents - ${
            error.response?.data?.message || "Unknown error"
          }`,
        ]);
      }
    }
  };

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
        setTimeout(() => {
          setIsBooting(false);
          // Fetch agents after boot sequence
          getAIAgents();
        }, 1200);
      }
    }, 100);

    return () => clearInterval(bootInterval);
  }, []);

  const filteredAvatars = useMemo(() => {
    if (!aiAvatars || aiAvatars.length === 0) return [];

    return aiAvatars.filter((avatar) => {
      if (!avatar) return false;

      const matchesSearch =
        avatar.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        avatar.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        avatar.personality?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [aiAvatars, searchTerm]);

  const getColorClass = (category: string) => {
    const colors: { [key: string]: string } = {
      ultimateAio: "from-cyan-500 to-cyan-600",
      techAssistant: "from-purple-500 to-purple-600",
      emotionalCompanion: "from-pink-500 to-pink-600",
      friendlyHelper: "from-yellow-500 to-yellow-600",
      professionalMentor: "from-green-500 to-green-600",
      researchAnalyst: "from-red-500 to-red-600",
      default: "from-cyan-500 to-cyan-600",
    };
    return colors[category] || colors.default;
  };

  const getComplexityColor = (complexity: any) => {
    const colors: { [key: string]: string } = {
      male: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      female: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return colors[complexity] || colors.default;
  };

  const handleTryAgent = async (agentId: string, agentName: string) => {
    setIsLoading(true);

    setTerminalOutput((prev) => [
      ...prev,
      `$ Deploying agent: ${agentName}...`,
    ]);

    try {
      router.push(`/agent/${agentId}`);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to deploy agent");
    } finally {
      setIsLoading(false);
    }
  };

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
      y: 8,
      scale: 0.98,
    },
    visible: {
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
                root@ravx-marketplace:~/# ai-agents --browse
                {searchTerm && ` --search="${searchTerm}"`}
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
              className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
            >
              {terminalOutput.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.startsWith(">") || line.startsWith("$")
                      ? "text-cyan-100"
                      : line.startsWith("root@")
                      ? "text-green-400"
                      : line.startsWith("ERROR")
                      ? "text-red-400"
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
                <span>Total Agents:</span>
                <span className="text-cyan-400">{aiAvatars.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Filtered:</span>
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
            key={`${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredAvatars.map((avatar) => (
                <motion.div
                  key={avatar._id}
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
                          avatar.personality || "default"
                        )}`}
                      >
                        <FaRobot className="text-lg text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors font-mono">
                          {avatar.name || "Unnamed Agent"}
                        </h3>
                        <p className="text-gray-400 text-xs font-mono  capitalize">
                          {avatar.personality || "AI Assistant"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs border font-mono uppercase ${getComplexityColor(
                        avatar.gender || "male"
                      )}`}
                    >
                      {avatar.gender || "male"}
                    </span>
                  </div>

                  {/* Agent Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-2 font-mono">
                    {avatar.description || "No description available."}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {avatar.skills &&
                      avatar.skills.slice(0, 2).map((capability, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-300 border border-cyan-400/20 font-mono"
                        >
                          {capability.slice(0, 100)}...
                        </span>
                      ))}
                    {avatar.skills && avatar.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400 border border-gray-600 font-mono">
                        +{avatar.skills.length - 2}
                      </span>
                    )}
                    {(!avatar.skills || avatar.skills.length === 0) && (
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400 border border-gray-600 font-mono">
                        No skills defined
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() =>
                      handleTryAgent(avatar._id, avatar.name || "Unknown Agent")
                    }
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
          {filteredAvatars.length === 0 && !isBooting && (
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
                {aiAvatars.length === 0
                  ? "No AI agents available in the marketplace."
                  : "Try adjusting your search criteria."}
              </p>
            </motion.div>
          )}

          {/* Loading State */}
          {isBooting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-800/30 border border-cyan-400/20 rounded-xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2 font-mono">
                LOADING AGENTS
              </h3>
              <p className="text-gray-400 text-sm font-mono">
                Initializing AI marketplace...
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HubPage;
