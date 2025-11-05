"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flip, toast, Zoom } from "react-toastify";
import {
  FaBolt,
  FaPlus,
  FaRobot,
  FaTachometerAlt,
  FaUser,
  FaVolumeUp,
} from "react-icons/fa";
import { AIAgent } from "@/app/types/Type";
import CreateAIAgentModal from "@/app/components/RavxOS/CreateAIAgent";
import Dashboard from "@/app/components/RavxOS/Dashboard";
import AxiosInstance from "@/config/Axios";
import { useParams, useRouter } from "next/navigation";

export default function RavxArcLab() {
  const [activeTab, setActiveTab] = useState<"create" | "dashboard">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [clearFormData, setclearFormData] = useState<boolean>(false);

  const parms = useParams();
  const id = parms.id;

  const router = useRouter();

  const handleCreateAgent = async (agentData: Omit<AIAgent, "url">) => {
    try {
      const res = await AxiosInstance.post(`/ai/create/${id}`, agentData);
      if (res.status === 200) {
        handleGetAIAgents();
        setIsModalOpen(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        setActiveTab("dashboard");
        setclearFormData(true);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors.forEach((e: { msg: string }) => {
            toast.error(e.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Zoom,
            });
          }),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        }
      );
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    try {
      const res = await AxiosInstance.delete(`/ai/del/${agentId}`);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
        handleGetAIAgents();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const handleRunAgent = async (agentId: string) => {
    try {
      router.push(`/agent/${agentId}`);
      toast.success("Agent is running");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEditAgent = (agentId: string, updatedData: Partial<AIAgent>) => {
    setAIAgents((prev) =>
      prev.map((agent) =>
        agent._id === agentId ? { ...agent, ...updatedData } : agent
      )
    );
    toast.success("AI Agent updated successfully!");
  };

  const handleGetAIAgents = async () => {
    try {
      const res = await AxiosInstance.get(`/ai/get/${id}`);
      if (res.status === 200) {
        const AIAgents = res.data.AIAgent;
        setAIAgents(AIAgents);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  useEffect(() => {
    handleGetAIAgents();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br bg-black from-black via-black to-cyan-300/10 text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Bottom Navigation */}
        <nav className="fixed bottom-2 left-1/2 transform -translate-x-1/2 backdrop-blur-lg rounded-2xl px-4 py-2 shadow-2xl z-50 w-full max-w-full">
          <div className="flex space-x-2 w-full">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 flex-1 cursor-pointer ${
                activeTab === "create"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50 bg-gray-800"
              }`}
            >
              <FaRobot className="text-lg" />
              <span className="font-medium">Create AI</span>
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 flex-1 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50 bg-gray-800"
              }`}
            >
              <FaTachometerAlt className="text-lg" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="pb-12">
          <AnimatePresence mode="wait">
            {activeTab === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-6 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm mb-6"
                  >
                    POWERED BY RAVX OS
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Create Stunning AI Agents
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Design intelligent agents with unique personalities, voices,
                    and capabilities.
                    <span className="text-cyan-400"> No coding required.</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center p-6"
                  >
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaUser className="text-2xl text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Custom Personalities
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Create unique AI personalities with specific traits and
                      behaviors
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center p-6"
                  >
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaVolumeUp className="text-2xl text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Multiple Voices
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Choose from various male and female voice options
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-6"
                  >
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaBolt className="text-2xl text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Advanced Skills
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Equip your agent with specialized capabilities and
                      behaviors
                    </p>
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => handleOpenModal()}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full max-w-md mx-auto block bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-800 hover:via-blue-800 hover:to-purple-800 text-white font-bold py-8 px-12 rounded-3xl shadow-2xl shadow-cyan-700/25 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-blue-400/10 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:via-blue-400/20 group-hover:to-purple-400/10 transition-all duration-500" />

                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    <div className="relative">
                      <FaRobot className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaPlus className="text-xs text-black" />
                      </motion.div>
                    </div>
                    <span className="text-2xl">Create New AI Agent</span>
                  </div>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-gray-500 mt-6 text-sm"
                >
                  Instant setup • Free to start • No coding required
                </motion.p>
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
        clearFormData={clearFormData}
      />
    </div>
  );
}
