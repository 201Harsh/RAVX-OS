"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaPlus,
  FaFile,
  FaEdit,
  FaCode,
  FaSearch,
  FaTrash,
  FaSave,
  FaFolder,
  FaCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import ChatContainer from "../components/Agent/ChatContainer";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  content?: string;
  lastModified: Date;
}

export default function AIChatBotPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "mcp">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Welcome.md",
      type: "file",
      content: "# Welcome to RAVX OS\n\nThis is your first file.",
      lastModified: new Date(),
    },
    {
      id: "2",
      name: "Projects",
      type: "folder",
      lastModified: new Date(),
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileContentRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI response
  const simulateAIResponse = async (userMessage: string) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const responses = [
      "I understand what you're asking. Let me help you with that.",
      "That's an interesting question! Here's what I think about it...",
      "Based on your query, I'd recommend the following approach:",
      "I've analyzed your request and here's my response:",
      "Great question! Let me break this down for you:",
      "I can help you with that. Here are my thoughts:",
      "Thanks for asking! Here's what I found:",
      "I understand your concern. Let me provide some insights:",
      "That's a common question. Here's the information you need:",
      "I've processed your request. Here's the result:",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return `${randomResponse}\n\nRegarding "${userMessage}", I can assist you further if you provide more details.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    const aiResponse = await simulateAIResponse(inputMessage);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // MCP File Operations
  const createNewFile = () => {
    if (!newFileName.trim()) {
      toast.error("Please enter a file name");
      return;
    }

    const newFile: FileItem = {
      id: Date.now().toString(),
      name: newFileName,
      type: "file",
      content: "# New File\n\nStart writing your content here...",
      lastModified: new Date(),
    };

    setFiles((prev) => [...prev, newFile]);
    setNewFileName("");
    setIsCreatingFile(false);
    setSelectedFile(newFile);
    setFileContent(newFile.content || "");
    toast.success("File created successfully!");
  };

  const saveFile = () => {
    if (!selectedFile) return;

    setFiles((prev) =>
      prev.map((file) =>
        file.id === selectedFile.id
          ? { ...file, content: fileContent, lastModified: new Date() }
          : file
      )
    );

    toast.success("File saved successfully!");
  };

  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
      setFileContent("");
    }
    toast.success("File deleted successfully!");
  };

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "folder") {
      toast.info("Folder operations coming soon!");
      return;
    }

    setSelectedFile(file);
    setFileContent(file.content || "");
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
      {/* Top Navigation */}
      <nav className="w-full backdrop-blur-lg p-4 shadow-2xl z-50 border-b border-gray-700/50 fixed">
        <div className="flex space-x-2 w-full justify-between max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("chat")}
            className={`w-1/2 cursor-pointer flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "chat"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/25"
                : "text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700/50"
            }`}
          >
            <FaRobot className="text-lg" />
            <span className="font-medium">AI Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("mcp")}
            className={`w-1/2 cursor-pointer flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "mcp"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700/50"
            }`}
          >
            <FaCode className="text-lg" />
            <span className="font-medium">MCP Agent</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full min-h-screen pt-24 px-2 sm:px-4">
        <AnimatePresence mode="wait">
          {activeTab === "chat" && (
            <>
              <ChatContainer
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
              />
            </>
          )}

          {activeTab === "mcp" && (
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
                    {files.map((file) => (
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
                        Select a file to edit or create a new one to start
                        working with your AI-powered file editor.
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
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
