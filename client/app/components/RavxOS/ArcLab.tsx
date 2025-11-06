import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiUser,
  FiAlertTriangle,
  FiTerminal,
  FiCpu,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

const ArcLab = ({
  arcLabs,
  setIsCreating,
  handleDeleteLab,
  formatTimeAgo,
  handleopenLab,
  handleLogout,
}: any) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [labToDelete, setLabToDelete] = useState<any>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);


  const handleDeleteClick = (lab: any) => {
    setLabToDelete(lab);
    setDeleteConfirm(lab.id);
  };

  const confirmDelete = () => {
    if (labToDelete) {
      handleDeleteLab(labToDelete.id);
      setDeleteConfirm(null);
      setLabToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setLabToDelete(null);
  };

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
      "> Booting RAVX Web-OS v3.1.4...",
      "> Initializing cybernetic framework...",
      "> Loading neural interface...",
      "> Mounting virtual file systems...",
      "> Starting ARC Lab Management System...",
      "> Security protocols: ACTIVE",
      "> Encryption: AES-256-GCM",
      "> Connection: SECURE",
      " ",
      "> Welcome to RAVX Web Operating System",
      " ",
      "root@ravx-webos:~/# system status --labs",
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
    }, 100);

    return () => clearInterval(bootInterval);
  }, []);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <div className="min-h-screen text-white p-4">
        {/* Terminal-style Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-8 relative z-50"
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
                  root@ravx-os:~/# arc-lab
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
                    <FiUser className="text-white text-sm" />
                  </div>
                  <div className="text-left">
                    <div className="text-cyan-300 text-sm font-mono font-semibold">
                      USER
                    </div>
                    <div className="text-cyan-400/70 text-xs font-mono">
                      admin@ravx
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
                      style={{ zIndex: 100 }}
                      className="absolute right-0 top-12 w-64 bg-gray-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-50 overflow-hidden"
                    >
                      {/* User Info Section */}
                      <div className="p-4 border-b border-cyan-400/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center border border-cyan-400/30">
                            <FiUser className="text-white text-base" />
                          </div>
                          <div>
                            <div className="text-cyan-300 font-mono font-semibold text-sm">
                              ADMIN USER
                            </div>
                            <div className="text-cyan-400/70 font-mono text-xs">
                              admin@ravx-os.com
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
                          onClick={() => setIsCreating(true)}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg text-cyan-300 hover:text-cyan-200 transition-all duration-200 cursor-pointer text-sm font-mono"
                        >
                          <FiPlus className="text-green-400" />
                          <span>Create AI Agent</span>
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
                          <FiLogOut className="text-red-400" />
                          <span>Logout</span>
                        </motion.button>
                      </div>

                      {/* System Status Footer */}
                      <div className="bg-cyan-500/10 border-t border-cyan-400/20 p-3">
                        <div className="flex justify-between items-center text-xs text-cyan-400/70 font-mono">
                          <span>STATUS: ONLINE</span>
                          <span>v3.1.4</span>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Terminal Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-black/80 border-2 border-cyan-400/40 rounded-xl p-4 h-full font-mono text-sm">
              <div className="text-cyan-300 border-b border-cyan-400/20 pb-2 mb-3">
                SYSTEM TERMINAL
              </div>
              <div className="scrollbar-hide">
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
                    $ System ready. {arcLabs.length} lab(s) detected.
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Labs Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-cyan-400 font-mono">
                  ARC LAB MANAGEMENT
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Virtual AI Development Environments
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 cursor-pointer font-mono text-sm"
              >
                <FiPlus className="text-lg" />
                <span>CREATE LAB</span>
              </motion.button>
            </div>

            {/* Labs Grid */}
            {arcLabs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {arcLabs.map((lab: any, index: number) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300 group cursor-pointer hover:bg-gray-800/50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <FiTerminal className="text-cyan-400 text-sm" />
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors font-mono">
                          {lab.name}
                        </h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(lab);
                        }}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="text-sm" />
                      </motion.button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <FiClock className="text-xs" />
                        <span>Created {formatTimeAgo(lab.created)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <FiUser className="text-xs" />
                        <span>Owner: {lab.creator}</span>
                      </div>
                      {lab.aiAgents && (
                        <div className="flex items-center gap-2 text-cyan-400 text-xs">
                          <FiCpu className="text-xs" />
                          <span>
                            {lab.aiAgents.length} AI Agent
                            {lab.aiAgents.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <motion.button
                      onClick={() => handleopenLab(lab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn cursor-pointer text-sm font-mono"
                    >
                      <span>ACCESS LAB</span>
                      <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform text-xs" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center py-16 bg-gray-800/30 border-2 border-cyan-400/20 rounded-xl backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-400/30">
                  <FiTerminal className="text-2xl text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-3 font-mono">
                  NO ACTIVE LABS
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                  Initialize your first virtual AI development environment
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreating(true)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 mx-auto cursor-pointer font-mono text-sm"
                >
                  <FiPlus className="text-lg" />
                  <span>INITIALIZE LAB</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal - Terminal Style */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-gray-900 border-2 border-red-500/40 rounded-xl shadow-2xl shadow-red-500/20 max-w-md w-full"
            >
              {/* Terminal Header */}
              <div className="bg-gray-800 border-b border-red-500/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-red-300 font-mono text-sm">
                    root@ravx-webos:~/# system delete --lab
                  </span>
                </div>
              </div>

              {/* Confirmation Content */}
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                    <FiAlertTriangle className="text-lg text-red-400" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">
                    CONFIRM LAB DELETION
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    Delete lab:{" "}
                    <span className="text-red-300 font-semibold font-mono">
                      "{labToDelete?.name}"
                    </span>
                  </p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-xs font-mono">
                      ⚠️ WARNING: This action is irreversible. All lab data and
                      agents will be permanently erased.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={cancelDelete}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-800 text-gray-300 py-2 px-4 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-700 transition-all duration-300 font-mono text-sm cursor-pointer"
                  >
                    CANCEL
                  </motion.button>
                  <motion.button
                    onClick={confirmDelete}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-linear-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg border border-red-500/50 hover:from-red-500 hover:to-orange-500 transition-all duration-300 font-mono text-sm shadow-lg shadow-red-500/25 cursor-pointer"
                  >
                    CONFIRM DELETE
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArcLab;
