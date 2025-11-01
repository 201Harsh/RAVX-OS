import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Createlab = ({
  isCreating,
  setIsCreating,
  handleCreateLab,
  newLabName,
  setNewLabName,
}: any) => {
  return (
    <>
      <AnimatePresence>
        {isCreating && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 "
              onClick={() => setIsCreating(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-1/3 left-0 right-0 z-50 "
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
    </>
  );
};

export default Createlab;
