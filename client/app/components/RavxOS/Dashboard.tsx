"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaRobot,
  FaGlobe,
  FaCalendar,
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleMenu = (agentId: string) => {
    setMenuOpen(menuOpen === agentId ? null : agentId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-6 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm mb-6"
        >
          POWERED BY RAVX OS
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          AI Agents Dashboard
        </h2>
        <p className="text-gray-400 text-lg">
          Manage and interact with your AI Agents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <FaRobot className="text-2xl text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{aiAgents.length}</p>
              <p className="text-gray-400">Total Agents</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-500/20 p-3 rounded-xl">
              <FaPlay className="text-2xl text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{aiAgents.length}</p>
              <p className="text-gray-400">Active Agents</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <FaCalendar className="text-2xl text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {aiAgents.length > 0
                  ? formatDate(aiAgents[0].createdAt).split(",")[0]
                  : "N/A"}
              </p>
              <p className="text-gray-400">Last Created</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Agents Grid */}
      {aiAgents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-gray-800/30 rounded-2xl border border-gray-700"
        >
          <FaRobot className="text-6xl text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-2">
            No AI Agents Created
          </h3>
          <p className="text-gray-500">
            Create your first AI Agent to get started
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group relative"
              >
                {/* Three-dot Menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleMenu(agent.id)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700/50"
                  >
                    <FaEllipsisV />
                  </button>

                  <AnimatePresence>
                    {menuOpen === agent.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-0 top-10 bg-gray-700 border border-gray-600 rounded-xl shadow-2xl z-10 min-w-[150px]"
                      >
                        <button
                          onClick={() => {
                            onRunAgent(agent.id);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-gray-600 rounded-t-xl flex items-center space-x-2"
                        >
                          <FaPlay className="text-green-400" />
                          <span>Run</span>
                        </button>
                        <button
                          onClick={() => {
                            // Implement edit functionality
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-gray-600 flex items-center space-x-2"
                        >
                          <FaEdit className="text-blue-400" />
                          <span>Edit/Customize</span>
                        </button>
                        <button
                          onClick={() => {
                            onDeleteAgent(agent.id);
                            setMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-600 rounded-b-xl flex items-center space-x-2"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Agent Icon */}
                <div className="bg-linear-to-br from-blue-500 to-purple-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <FaRobot className="text-white text-lg" />
                </div>

                {/* Agent Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {agent.name}
                </h3>

                {/* Personality and Tone */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                    {agent.personality}
                  </span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    {agent.tone}
                  </span>
                </div>

                {/* URL */}
                <div className="flex items-center space-x-2 text-gray-400 mb-3">
                  <FaGlobe className="text-sm" />
                  <span className="text-sm truncate">{agent.url}</span>
                </div>

                {/* Created Time */}
                <div className="flex items-center space-x-2 text-gray-400 mb-4">
                  <FaCalendar className="text-sm" />
                  <span className="text-sm">{formatDate(agent.createdAt)}</span>
                </div>

                {/* Behaviors and Skills Preview */}
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {agent.behaviors.slice(0, 2).map((behavior) => (
                      <span
                        key={behavior}
                        className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs"
                      >
                        {behavior}
                      </span>
                    ))}
                    {agent.behaviors.length > 2 && (
                      <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-full text-xs">
                        +{agent.behaviors.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.additionalSkills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {agent.additionalSkills.length > 2 && (
                      <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-full text-xs">
                        +{agent.additionalSkills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRunAgent(agent.id)}
                    className="flex-1 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                  >
                    <FaPlay className="text-sm" />
                    <span>Run</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl transition-colors duration-300 font-medium"
                  >
                    Customize
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
