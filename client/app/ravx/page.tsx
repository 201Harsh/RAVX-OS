"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

const RavxArc = () => {
  const [arcLabs, setArcLabs] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newLabName, setNewLabName] = useState("");

  // Sample initial data
  useEffect(() => {
    setArcLabs([
      {
        id: 1,
        name: "Neural Core Lab",
        created: new Date(Date.now() - 86400000), // 1 day ago
        creator: "User",
      },
      {
        id: 2,
        name: "Quantum AI Space",
        created: new Date(Date.now() - 172800000), // 2 days ago
        creator: "User",
      },
      {
        id: 3,
        name: "Digital Mind Forge",
        created: new Date(Date.now() - 259200000), // 3 days ago
        creator: "User",
      },
    ]);
  }, []);

  const handleCreateLab = () => {
    if (!newLabName.trim()) {
      toast.error("Please enter a lab name");
      return;
    }

    const newLab = {
      id: arcLabs.length + 1,
      name: newLabName,
      created: new Date(),
      creator: "User",
    };

    setArcLabs((prev) => [newLab, ...prev]);
    setNewLabName("");
    setIsCreating(false);
    toast.success(`Arc Lab "${newLabName}" created successfully!`);
  };

  const handleDeleteLab = (labId: number) => {
    setArcLabs((prev) => prev.filter((lab) => lab.id !== labId));
    toast.success("Arc Lab deleted successfully!");
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  return (
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
            RAVX ARC
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create your AI development labs and build intelligent agents
          </p>
        </motion.div>

        {/* Create Lab Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={newLabName}
                  onChange={(e) => setNewLabName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCreateLab()}
                  placeholder="Enter your Arc Lab name..."
                  className="w-full px-6 py-4 bg-gray-800 border border-cyan-400/20 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors text-lg"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateLab}
                disabled={!newLabName.trim()}
                className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  !newLabName.trim()
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-400 text-black"
                }`}
              >
                <FiPlus className="text-xl" />
                <span className="text-lg">Create Arc Lab</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Arc Labs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {arcLabs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {arcLabs.map((lab, index) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {lab.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteLab(lab.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiClock className="text-sm" />
                      <span className="text-sm">
                        Created {formatTimeAgo(lab.created)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiUser className="text-sm" />
                      <span className="text-sm">By {lab.creator}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-400 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                  >
                    <span>Enter Lab</span>
                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiPlus className="text-3xl text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">
                No Arc Labs Yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Create your first Arc Lab to start building AI agents
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300 mx-auto"
              >
                <FiPlus className="text-lg" />
                <span>Create First Lab</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gray-900/30 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">
                  {arcLabs.length}
                </div>
                <div className="text-gray-400">Arc Labs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">0</div>
                <div className="text-gray-400">Active Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">0</div>
                <div className="text-gray-400">Tasks Today</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Lab Modal for Mobile */}
      <AnimatePresence>
        {isCreating && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsCreating(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
            >
              <div className="bg-gray-900 border-t border-cyan-400/30 rounded-t-2xl p-6 m-4">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Create Arc Lab
                  </h3>
                  <p className="text-gray-400">Enter a name for your new lab</p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={newLabName}
                    onChange={(e) => setNewLabName(e.target.value)}
                    placeholder="Lab name..."
                    className="w-full px-4 py-3 bg-gray-800 border border-cyan-400/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    autoFocus
                  />

                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCreating(false)}
                      className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-lg transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateLab}
                      disabled={!newLabName.trim()}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                        !newLabName.trim()
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-cyan-500 text-black"
                      }`}
                    >
                      Create
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RavxArc;
