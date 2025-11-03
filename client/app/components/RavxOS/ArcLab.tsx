import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiUser,
  FiAlertTriangle,
} from "react-icons/fi";

const ArcLab = ({
  arcLabs,
  setIsCreating,
  handleDeleteLab,
  formatTimeAgo,
  handleopenLab,
}: any) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [labToDelete, setLabToDelete] = useState<any>(null);

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
                      onClick={() => handleDeleteClick(lab)}
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
                    {lab.aiAgents && (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <FiPlus className="text-sm" />
                        <span className="text-sm">
                          {lab.aiAgents.length} AI Agent
                          {lab.aiAgents.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={() => {
                      handleopenLab(lab.id);
                    }}
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
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300 mx-auto cursor-pointer"
              >
                <FiPlus className="text-lg" />
                <span>Create First Lab</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 border-2 border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/20 max-w-md w-full p-6"
            >
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <FiAlertTriangle className="text-2xl text-red-400" />
                </div>
              </div>

              {/* Confirmation Text */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Arc Lab?
                </h3>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to delete{" "}
                  <span className="text-white font-semibold">
                    "{labToDelete?.name}"
                  </span>
                  ?
                </p>
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <strong>Warning:</strong> This will permanently delete the lab
                  and all associated AI agents. This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={cancelDelete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-xl border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 transition-all duration-300 font-medium cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={confirmDelete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-linear-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-xl border-2 border-red-500/50 hover:from-red-500 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg shadow-red-500/25 cursor-pointer"
                >
                  Delete Lab
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArcLab;
