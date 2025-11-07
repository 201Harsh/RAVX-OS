"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaRobot,
  FaCalendar,
  FaTerminal,
  FaCog,
  FaBolt,
  FaRocketchat,
} from "react-icons/fa";
import { AIAgent } from "@/app/types/Type";

interface DashboardProps {
  aiAgents: AIAgent[];
  onDeleteAgent: (agentId: string) => void;
  onRunAgent: (agentId: string) => void;
  onEditAgent: (agentId: string, updatedData: Partial<AIAgent>) => void;
}

export default function Dashboard({
  aiAgents,
  onDeleteAgent,
  onRunAgent,
  onEditAgent,
}: DashboardProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const formatDate = (date: any) => {
    if (!date) return "Invalid Date";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsedDate);
  };

  const toggleMenu = (agentId: string) => {
    setMenuOpen(menuOpen === agentId ? null : agentId);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono mb-4"
        >
          AI AGENT MANAGEMENT
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-linear-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent font-mono">
          AGENT DASHBOARD
        </h2>
        <p className="text-gray-400 text-sm font-mono">
          Manage and deploy your AI agents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <FaRobot className="text-lg text-cyan-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white font-mono">
                {aiAgents.length}
              </p>
              <p className="text-gray-400 text-xs font-mono">TOTAL AGENTS</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-400/20"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <FaPlay className="text-lg text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white font-mono">
                {aiAgents.length}
              </p>
              <p className="text-gray-400 text-xs font-mono">ACTIVE AGENTS</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <FaCalendar className="text-lg text-purple-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white font-mono">
                {aiAgents.length > 0
                  ? formatDate(aiAgents[0].LastUsed).split(",")[0]
                  : "N/A"}
              </p>
              <p className="text-gray-400 text-xs font-mono">LAST USED</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Agents Grid */}
      {aiAgents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-xl border-2 border-cyan-400/20"
        >
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
            <FaRobot className="text-2xl text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-400 mb-2 font-mono">
            NO AI AGENTS DEPLOYED
          </h3>
          <p className="text-gray-500 text-sm font-mono">
            Initialize your first AI agent to begin
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border-2 border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group relative hover:bg-gray-800/50"
              >
                {/* Three-dot Menu */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleMenu(agent._id)}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 p-1 rounded-lg hover:bg-cyan-500/10"
                  >
                    <FaEllipsisV className="text-sm" />
                  </button>

                  <AnimatePresence>
                    {menuOpen === agent._id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg shadow-2xl z-10 min-w-[140px]"
                      >
                        <button
                          onClick={() => {
                            onRunAgent(agent._id);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-500/10 rounded-t-lg flex items-center space-x-2 font-mono"
                        >
                          <FaPlay className="text-green-400 text-xs" />
                          <span>RUN</span>
                        </button>
                        <button
                          onClick={() => {
                            onEditAgent(agent._id, {});
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-500/10 flex items-center space-x-2 font-mono"
                        >
                          <FaEdit className="text-blue-400 text-xs" />
                          <span>CONFIGURE</span>
                        </button>
                        <button
                          onClick={() => {
                            onDeleteAgent(agent._id);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-b-lg flex items-center space-x-2 font-mono"
                        >
                          <FaTrash className="text-xs" />
                          <span>TERMINATE</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Agent Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-linear-to-br from-cyan-400 to-blue-500 p-2 rounded-lg flex items-center justify-center">
                      <FaRobot className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 font-mono">
                        {agent.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-cyan-400/70 text-xs font-mono">
                        <FaTerminal className="text-xs" />
                        <span>AGENT_ID: {agent._id.slice(-8)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personality and Tone */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-mono">
                    {agent.personality}
                  </span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">
                    {agent.tone}
                  </span>
                </div>

                {/* Created Time */}
                <div className="flex items-center space-x-2 text-gray-400 mb-3 text-xs">
                  <FaCalendar className="text-xs" />
                  <span className="font-mono">
                    Last Used: {formatDate(agent.LastUsed)}
                  </span>
                </div>

                {/* Behaviors and Skills Preview */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs mb-1 font-mono">
                      <FaBolt className="text-xs" />
                      <span>BEHAVIORS</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.behaviors.slice(0, 2).map((behavior) => (
                        <span
                          key={behavior}
                          className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-mono"
                        >
                          {behavior}
                        </span>
                      ))}
                      {agent.behaviors.length > 2 && (
                        <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded text-xs font-mono">
                          +{agent.behaviors.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs mb-1 font-mono">
                      <FaCog className="text-xs" />
                      <span>SKILLS</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      {agent.skills.length > 2 && (
                        <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded text-xs font-mono">
                          +{agent.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRunAgent(agent._id)}
                    className="flex-1 bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white py-2 px-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-xs font-mono"
                  >
                    <FaPlay className="text-xs" />
                    <span>USE</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-cyan-300 py-2 px-3 rounded-lg transition-colors duration-300 font-medium text-xs font-mono border border-cyan-400/20"
                  >
                    <FaRocketchat className="text-xs" /> SHARE AGENT
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* System Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-cyan-400/20"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cyan-400/60 font-mono">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <span>SYSTEM: OPERATIONAL</span>
            <span>AGENTS: {aiAgents.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>MEMORY: 54%</span>
            <span>CPU: 28%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
