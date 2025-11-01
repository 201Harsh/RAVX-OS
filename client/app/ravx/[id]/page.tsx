"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaRobot, FaTachometerAlt } from "react-icons/fa";
import { AIAgent } from "@/app/types/Type";
import CreateAIAgentModal from "@/app/components/RavxOS/CreateAIAgent";
import Dashboard from "@/app/components/RavxOS/Dashboard";

export default function RavxArcLab() {
  const [activeTab, setActiveTab] = useState<"create" | "dashboard">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);

  const handleCreateAgent = (
    agentData: Omit<AIAgent, "id" | "createdAt" | "url">
  ) => {
    const newAgent: AIAgent = {
      ...agentData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      url: `https://ravx.ai/agent/${Math.random().toString(36).substr(2, 9)}`,
    };

    setAIAgents((prev) => [...prev, newAgent]);
    setIsModalOpen(false);
    toast.success("AI Agent created successfully!");
  };

  const handleDeleteAgent = (agentId: string) => {
    setAIAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    toast.success("AI Agent deleted successfully!");
  };

  const handleRunAgent = (agentId: string) => {
    const agent = aiAgents.find((a) => a.id === agentId);
    toast.info(`Running AI Agent: ${agent?.name}`);
  };

  const handleEditAgent = (agentId: string, updatedData: Partial<AIAgent>) => {
    setAIAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, ...updatedData } : agent
      )
    );
    toast.success("AI Agent updated successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-tl from-gray-950 to-black text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Ravx Arc Lab</h1>
          <p className="text-gray-400 text-center mt-2">
            Create and manage your AI Agents
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bottom Navigation */}
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-2xl z-50">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "create"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <FaRobot className="text-lg" />
              <span className="font-medium">Create AI Agents</span>
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "dashboard"
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <FaTachometerAlt className="text-lg" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="pb-24">
          <AnimatePresence mode="wait">
            {activeTab === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Create Your AI Agent
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Design intelligent agents with unique personalities and
                    capabilities
                  </p>
                </div>

                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-md mx-auto block bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl shadow-blue-500/25 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <FaRobot className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xl">Create New AI Agent</span>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard
                  aiAgents={aiAgents}
                  onDeleteAgent={handleDeleteAgent}
                  onRunAgent={handleRunAgent}
                  onEditAgent={handleEditAgent}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <CreateAIAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateAgent}
      />
    </div>
  );
}
