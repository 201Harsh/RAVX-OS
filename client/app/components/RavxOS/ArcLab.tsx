import React from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiUser,
} from "react-icons/fi";

const ArcLab = ({
  arcLabs,
  setIsCreating,
  handleDeleteLab,
  formatTimeAgo,
}: any) => {
  return (
    <>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-bl from-pink-400 via-cyan-400 to-purple-400 mb-4">
            RAVX ARC
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create your AI development labs and build intelligent agents
          </p>
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
              {arcLabs.map((lab: any, index: number) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {lab.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteLab(lab.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
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
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-400 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn cursor-pointer"
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
      </div>
    </>
  );
};

export default ArcLab;
