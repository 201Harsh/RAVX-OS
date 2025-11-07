"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flip, Slide, toast, Zoom } from "react-toastify";
import {
  FaBolt,
  FaRobot,
  FaTachometerAlt,
  FaUser,
  FaVolumeUp,
  FaTerminal,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { AIAgent } from "@/app/types/Type";
import CreateAIAgentModal from "@/app/components/RavxOS/CreateAIAgent";
import Dashboard from "@/app/components/RavxOS/Dashboard";
import AxiosInstance from "@/config/Axios";
import { useParams, useRouter } from "next/navigation";
import AxiosProxyInstance from "@/config/AxiosProxy";
import SystemSettings from "@/app/components/RavxOS/SytemSettings";
import ProfileSettings from "@/app/components/RavxOS/ProfilePage";

interface UserDataType {
  id: string;
  name: string;
  email: string;
  password: string;
  LabTokens: number;
  AIAgentTokens: number;
  createdAt: string;
}

interface MemoryUsage {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export default function RavxArcLab() {
  const [activeTab, setActiveTab] = useState<
    "create" | "dashboard" | "settings" | "profile"
  >("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [clearFormData, setclearFormData] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [UserData, setUserData] = useState<UserDataType[]>([]);
  const [memory, setMemory] = useState<MemoryUsage>({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
  });

  const userMenuRef = useRef<HTMLDivElement>(null);

  const parms = useParams();
  const id = parms.id;

  const router = useRouter();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simulate terminal boot sequence
  useEffect(() => {
    const bootSequence = [
      "> Booting RAVX Web-OS v4.2.1...",
      "> Initializing AI Core Framework...",
      "> Loading Neural Network Protocols...",
      "> Mounting Virtual AI Environments...",
      "> Starting ARC Lab Interface...",
      "> Security Protocols: ACTIVE",
      "> Encryption: QUANTUM-512",
      "> Connection: SECURE",
      " ",
      "> Welcome to RAVX AI Operating System",
      "> AI Agent Management System: ONLINE",
      " ",
      "root@ravx-aios:~/# system status --agents",
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
        setTimeout(() => setIsBooting(false), 1000);
      }
    }, 80);

    return () => clearInterval(bootInterval);
  }, []);

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
      window.open(`/agent/${agentId}`, "_blank");
      toast.success("Agent is running");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to run agent");
    }
  };

  const handleEditAgent = (agentId: string, updatedData: Partial<AIAgent>) => {
    toast.info("Edit agent feature coming soon!");
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

  const fetchUserData = async () => {
    try {
      const res = await AxiosInstance.get("/users/profile");
      if (res.status === 200) {
        setUserData(res.data.User);
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
        transition: Flip,
      });
    }
  };

  const GetLabDetails = async () => {
    try {
      const res = await AxiosInstance.get(`/arc/get/${id}`);

      if (res.status === 200) {
        const LabData = res.data.ArcLab;
        setTimeout(() => {
          document.title = `${LabData.name}- Arc Lab`;
        }, 120);
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
        transition: Flip,
      });
    }
  };

  useEffect(() => {
    handleGetAIAgents();
    fetchUserData();
    GetLabDetails();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMenuItemClick = (action: string) => {
    if (action === "agents") {
      setActiveTab("dashboard");
      setIsUserMenuOpen(false);
    } else if (action === "settings") {
      setActiveTab("settings");
      setIsUserMenuOpen(false);
    } else if (action === "profile") {
      setActiveTab("profile");
      setIsUserMenuOpen(false);
    } else if (action === "back") {
      router.push("/arc");
      setIsUserMenuOpen(false);
    } else {
      setActiveTab("create");
      setIsUserMenuOpen(false);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await AxiosProxyInstance.post("/api/logout");
      if (res.status === 200) {
        router.push("/");
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setIsUserMenuOpen(false);
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
        transition: Slide,
      });
    }
  };

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
    const interval = setInterval(updateMemory, 5000);

    return () => clearInterval(interval);
  }, []);

  const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-cyan-900/20 text-white p-4">
      {/* Terminal-style Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-6 relative z-50"
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
                root@ravx-aios:~/# ai-agent --management
              </div>
            </div>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUserMenuToggle}
                className="flex items-center space-x-3 p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <FaUser className="text-white text-sm" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-cyan-300 text-sm font-mono font-semibold">
                    {UserData.name}
                  </div>
                  <div className="text-cyan-400/70 text-xs font-mono">
                    {UserData.email}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-cyan-400/60 group-hover:text-cyan-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-64 bg-gray-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-50 overflow-hidden"
                  >
                    {/* User Info Section */}
                    <div className="p-4 border-b border-cyan-400/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border border-cyan-400/30">
                          <FaUser className="text-white text-base" />
                        </div>
                        <div>
                          <div className="text-cyan-300 font-mono font-semibold text-sm">
                            {UserData.name}
                          </div>
                          <div className="text-cyan-400/70 font-mono text-xs">
                            {UserData.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                        }}
                        onClick={() => handleMenuItemClick("back")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all duration-200 cursor-pointer text-sm font-mono"
                      >
                        <FaArrowLeft className="text-cyan-400 text-sm" />
                        <span>Back to Arc</span>
                      </motion.button>

                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                        }}
                        onClick={() => handleMenuItemClick("profile")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all duration-200 cursor-pointer text-sm font-mono"
                      >
                        <FaUser className="text-cyan-400 text-sm" />
                        <span>Profile Settings</span>
                      </motion.button>

                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                        }}
                        onClick={() => handleMenuItemClick("agents")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all duration-200 cursor-pointer text-sm font-mono"
                      >
                        <FaRobot className="text-green-400 text-sm" />
                        <span>My AI Agents</span>
                      </motion.button>

                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                        }}
                        onClick={() => handleMenuItemClick("settings")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all duration-200 cursor-pointer text-sm font-mono"
                      >
                        <FaCog className="text-yellow-400 text-sm" />
                        <span>System Settings</span>
                      </motion.button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-cyan-400/20"></div>

                    {/* Bottom Actions */}
                    <div className="p-2">
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                        }}
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:text-red-300 transition-all duration-200 cursor-pointer text-sm font-mono"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </motion.button>
                    </div>

                    {/* System Status Footer */}
                    <div className="bg-cyan-500/10 border-t border-cyan-400/20 p-3">
                      <div className="flex justify-between items-center text-xs text-cyan-400/70 font-mono">
                        <span>STATUS: ONLINE</span>
                        <span>v2.2.1</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl 2xl:max-w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Terminal Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-black/80 border-2 border-cyan-400/40 rounded-xl p-4 h-96 font-mono text-sm">
            <div className="text-cyan-300 border-b border-cyan-400/20 pb-2 mb-3">
              SYSTEM TERMINAL
            </div>
            <div className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-hide">
              {terminalOutput.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.startsWith(">") ? "text-cyan-100" : "text-gray-400"
                  } ${line === " " ? "h-3" : ""}`}
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
                <div className="text-green-400 mt-2">
                  $ System ready. {aiAgents.length} AI agent(s) deployed.
                </div>
              )}
            </div>
          </div>

          {/* System Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4 mt-4"
          >
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <FaTerminal className="text-sm" />
              <span className="font-mono text-sm">SYSTEM STATS - RAVX-OS</span>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Active Agents:</span>
                <span className="text-cyan-400">{aiAgents.length}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Core:</span>
                <span className="text-cyan-400">ONLINE</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Memory Usage:</span>
                <span className="text-green-400">
                  {mb(memory.usedJSHeapSize)} MB
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Memory Used:</span>
                <span className="text-cyan-400">
                  {mb(memory.totalJSHeapSize)} MB
                </span>
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
          {/* Navigation Tabs */}
          <div className="bg-gray-800/50 border border-cyan-400/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("create")}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 cursor-pointer font-mono text-sm ${
                  activeTab === "create"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50 bg-gray-800"
                }`}
              >
                <FaRobot className="text-sm" />
                <span>CREATE AI</span>
              </button>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 cursor-pointer font-mono text-sm ${
                  activeTab === "dashboard"
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50 bg-gray-800"
                }`}
              >
                <FaTachometerAlt className="text-sm" />
                <span>DASHBOARD</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "create" && (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono mb-4"
                    >
                      RAVX AI OPERATING SYSTEM
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-mono">
                      CREATE AI AGENTS
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-sm">
                      Design intelligent agents with unique personalities and
                      capabilities.
                      <span className="text-cyan-400 font-mono">
                        {" "}
                        No coding required.
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center p-4 bg-gray-700/30 rounded-lg border border-cyan-400/10"
                    >
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FaUser className="text-lg text-cyan-400" />
                      </div>
                      <h3 className="text-md font-semibold text-white mb-2 font-mono">
                        PERSONALITIES
                      </h3>
                      <p className="text-gray-400 text-xs">
                        Create unique AI personalities with specific traits
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center p-4 bg-gray-700/30 rounded-lg border border-cyan-400/10"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FaVolumeUp className="text-lg text-blue-400" />
                      </div>
                      <h3 className="text-md font-semibold text-white mb-2 font-mono">
                        VOICES
                      </h3>
                      <p className="text-gray-400 text-xs">
                        Multiple voice options available
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-center p-4 bg-gray-700/30 rounded-lg border border-cyan-400/10"
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FaBolt className="text-lg text-purple-400" />
                      </div>
                      <h3 className="text-md font-semibold text-white mb-2 font-mono">
                        SKILLS
                      </h3>
                      <p className="text-gray-400 text-xs">
                        Advanced capabilities and behaviors
                      </p>
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={handleOpenModal}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-md mx-auto block bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 group relative overflow-hidden cursor-pointer font-mono"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-blue-400/10 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:via-blue-400/20 group-hover:to-purple-400/10 transition-all duration-500" />
                    <div className="relative z-10 flex items-center justify-center space-x-3 uppercase">
                      <FaRobot className="text-xl group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-lg">CREte AI AGENT</span>
                    </div>
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-gray-500 mt-4 text-xs font-mono"
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
                    memory={memory}
                  />
                </motion.div>
              )}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SystemSettings />
                </motion.div>
              )}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileSettings userData={UserData} aiAgents={aiAgents} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

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
