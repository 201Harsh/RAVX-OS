import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaCog,
  FaEdit,
  FaFile,
  FaFolder,
  FaPlus,
  FaSave,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

const MCPAgent = ({
  isCreatingFile,
  setIsCreatingFile,
  newFileName,
  setNewFileName,
  createNewFile,
  files,
  selectedFile,
  fileContent,
  setFileContent,
  saveFile,
  deleteFile,
  handleFileSelect,
  fileContentRef,
}: any) => {
  return (
    <>
      <motion.div
        key="mcp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl mx-auto"
      >
        {/* MCP Agent Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 h-[calc(100vh-180px)] sm:h-[600px] flex flex-col lg:flex-row">
          {/* Sidebar - File Explorer */}
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-blue-500/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-400 text-sm sm:text-base">
                File Explorer
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreatingFile(true)}
                className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <FaPlus className="text-sm text-white" />
              </motion.button>
            </div>

            {/* Create File Input */}
            {isCreatingFile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-4"
              >
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="File name..."
                  className="w-full bg-gray-700 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm mb-2 focus:outline-none focus:border-blue-400"
                  onKeyPress={(e) => e.key === "Enter" && createNewFile()}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createNewFile}
                    className="flex-1 bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-500 transition-colors cursor-pointer"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreatingFile(false)}
                    className="flex-1 bg-gray-600 text-white py-1 rounded text-sm hover:bg-gray-500 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* Files List */}
            <div className="space-y-1 max-h-48 lg:max-h-[400px] overflow-y-auto scrollbar-small">
              {files.map((file: any) => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-2 ${
                    selectedFile?.id === file.id
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "hover:bg-gray-700/50"
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  {file.type === "folder" ? (
                    <FaFolder className="text-blue-400 text-sm" />
                  ) : (
                    <FaFile className="text-cyan-400 text-sm" />
                  )}
                  <span className="text-sm text-white flex-1 truncate">
                    {file.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.id);
                    }}
                    className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors cursor-pointer shrink-0"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {selectedFile ? (
              <>
                {/* Editor Header */}
                <div className="border-b border-blue-500/20 p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <FaFile className="text-cyan-400 text-sm" />
                      <span className="font-semibold text-white text-sm sm:text-base truncate">
                        {selectedFile.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end">
                      <span className="text-xs text-gray-400 sm:mr-4">
                        {selectedFile.lastModified.toLocaleDateString()}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveFile}
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-500 transition-colors cursor-pointer text-sm"
                      >
                        <FaSave className="text-sm" />
                        <span>Save</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-3 sm:p-4 min-h-0">
                  <textarea
                    ref={fileContentRef}
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="w-full h-full bg-gray-900 border-2 border-blue-500/30 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-blue-400 resize-none scrollbar-small"
                    placeholder="Start writing your code or content here..."
                  />
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                <FaCode className="text-4xl sm:text-6xl mb-4 text-blue-400" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  MCP AI Agent
                </h3>
                <p className="text-sm sm:text-base max-w-md">
                  Select a file to edit or create a new one to start working
                  with your AI-powered file editor.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* MCP Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-3 sm:p-4 text-center"
          >
            <FaEdit className="text-xl sm:text-2xl text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
              Smart Editing
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              AI-powered code suggestions and auto-completion
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-3 sm:p-4 text-center"
          >
            <FaSearch className="text-xl sm:text-2xl text-cyan-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
              Code Analysis
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Real-time error detection and optimization tips
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 border border-green-500/30 rounded-xl p-3 sm:p-4 text-center"
          >
            <FaCog className="text-xl sm:text-2xl text-green-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
              File Operations
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">
              Create, edit, and manage files with AI assistance
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default MCPAgent;
