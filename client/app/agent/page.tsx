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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  RAVX AI Assistant
                </h1>
                <p className="text-sm text-gray-400">Powered by RAVX OS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-cyan-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-2xl z-50">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "chat"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/25"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <FaRobot className="text-lg" />
            <span className="font-medium">AI Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("mcp")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "mcp"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <FaCode className="text-lg" />
            <span className="font-medium">MCP Agent</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Chat Container */}
              <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 h-[600px] flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-small">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.sender === "user"
                            ? "bg-cyan-600/20 border border-cyan-500/30 text-white"
                            : "bg-gray-700/50 border border-gray-600/30 text-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              message.sender === "user"
                                ? "bg-cyan-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <FaUser className="text-xs text-white" />
                            ) : (
                              <FaRobot className="text-xs text-white" />
                            )}
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-700/50 border border-gray-600/30 rounded-2xl p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <FaRobot className="text-xs text-white" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-cyan-500/20 p-4">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message... (Press Enter to send)"
                        className="w-full bg-gray-700/50 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                        rows={2}
                        disabled={isLoading}
                      />
                    </div>
                    <motion.button
                      onClick={handleSendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!inputMessage.trim() || isLoading}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                        inputMessage.trim() && !isLoading
                          ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-500 cursor-pointer"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FaPaperPlane className="text-sm" />
                      <span>Send</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "mcp" && (
            <motion.div
              key="mcp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              {/* MCP Agent Container */}
              <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 h-[600px] flex">
                {/* Sidebar - File Explorer */}
                <div className="w-64 border-r border-blue-500/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-blue-400">
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
                  <div className="space-y-1">
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
                          <FaFolder className="text-blue-400" />
                        ) : (
                          <FaFile className="text-cyan-400" />
                        )}
                        <span className="text-sm text-white flex-1">
                          {file.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="w-5 h-5 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col">
                  {selectedFile ? (
                    <>
                      {/* Editor Header */}
                      <div className="border-b border-blue-500/20 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FaFile className="text-cyan-400" />
                            <span className="font-semibold text-white">
                              {selectedFile.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              Last modified:{" "}
                              {selectedFile.lastModified.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={saveFile}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-500 transition-colors cursor-pointer"
                            >
                              <FaSave className="text-sm" />
                              <span>Save</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Editor Content */}
                      <div className="flex-1 p-4">
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
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                      <FaCode className="text-6xl mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2">
                        MCP AI Agent
                      </h3>
                      <p className="text-center max-w-md">
                        Select a file to edit or create a new one to start
                        working with your AI-powered file editor.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* MCP Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-4 text-center"
                >
                  <FaEdit className="text-2xl text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">
                    Smart Editing
                  </h4>
                  <p className="text-sm text-gray-400">
                    AI-powered code suggestions and auto-completion
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-4 text-center"
                >
                  <FaSearch className="text-2xl text-cyan-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">
                    Code Analysis
                  </h4>
                  <p className="text-sm text-gray-400">
                    Real-time error detection and optimization tips
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4 text-center"
                >
                  <FaCog className="text-2xl text-green-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">
                    File Operations
                  </h4>
                  <p className="text-sm text-gray-400">
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
