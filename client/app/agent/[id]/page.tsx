"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FaRobot, FaCode, FaCopy, FaDownload } from "react-icons/fa";
import { Flip, toast } from "react-toastify";
import AxiosInstance from "@/config/Axios";
import { useParams, useRouter } from "next/navigation";
import ChatContainer from "@/app/components/Agent/ChatContainer";
import MCPAgent from "@/app/components/Agent/MCPAgent";
import { AIAgent } from "@/app/types/Type";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../../utils/PrismLang";

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

// Component to render formatted message content with Prism.js
const FormattedMessage = ({ content }: { content: string }) => {
  const [copiedCodeBlocks, setCopiedCodeBlocks] = useState<Set<string>>(
    new Set()
  );

  const copyToClipboard = async (text: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCodeBlocks((prev) => new Set(prev).add(blockId));
      toast.success("Code copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        setCopiedCodeBlocks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(blockId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy code", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const downloadCode = (code: string, language: string = "txt") => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Code downloaded!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      try {
        Prism.highlightAll();
      } catch (err) {
        console.warn("Prism highlight error:", err);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [content]);

  const formatContent = (text: string) => {
    if (!text || typeof text !== "string") {
      return <div className="text-gray-400 italic">No content</div>;
    }
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const codeMatch = part.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          const [, language = "text", code] = codeMatch;
          const blockId = `code-${index}-${Date.now()}`;
          const cleanCode = code.trim();

          return (
            <div key={index} className="my-4 group relative">
              {/* Code header with language and buttons */}
              <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-600">
                <span className="text-xs uppercase tracking-wide">
                  {language}
                </span>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => copyToClipboard(cleanCode, blockId)}
                    className={`p-1 rounded transition-colors duration-200 ${
                      copiedCodeBlocks.has(blockId)
                        ? "text-green-400 hover:text-green-300"
                        : "text-gray-400 hover:text-white"
                    }`}
                    title="Copy code"
                  >
                    <FaCopy size={14} />
                  </button>
                  <button
                    onClick={() => downloadCode(cleanCode, language)}
                    className="text-gray-400 hover:text-white p-1 rounded transition-colors duration-200"
                    title="Download code"
                  >
                    <FaDownload size={14} />
                  </button>
                </div>
              </div>

              {/* Code block */}
              <pre
                className={`bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm font-mono m-0`}
              >
                <code className={`language-${language}`}>{cleanCode}</code>
              </pre>

              {/* Copy feedback */}
              {copiedCodeBlocks.has(blockId) && (
                <div className="absolute top-2 right-12 bg-green-600 text-white px-2 py-1 rounded text-xs animate-pulse">
                  Copied!
                </div>
              )}
            </div>
          );
        }
      }

      const formattedText = part
        // Bold text with ** **
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-bold text-cyan-400">$1</strong>'
        )
        // Italic text with * *
        .replace(/\*(.*?)\*/g, '<em class="italic text-pink-300">$1</em>')
        // Bold text with __ __
        .replace(
          /__(.*?)__/g,
          '<strong class="font-bold text-white">$1</strong>'
        )
        // Inline code with ` `
        .replace(
          /`(.*?)`/g,
          '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-cyan-300 border border-gray-700">$1</code>'
        )
        // Headers (###, ##, #)
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-bold text-emerald-400 mt-4 mb-2">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-bold text-purple-400 mt-4 mb-2">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold text-white mt-4 mb-3">$1</h1>'
        )
        // Lists
        .replace(
          /^- (.*$)/gim,
          '<li class="ml-4 list-disc text-gray-300">$1</li>'
        )
        .replace(
          /^\* (.*$)/gim,
          '<li class="ml-4 list-disc text-gray-300">$1</li>'
        )
        // Blockquotes
        .replace(
          /^> (.*$)/gim,
          '<blockquote class="border-l-4 border-cyan-500 pl-4 my-2 text-gray-300 italic">$1</blockquote>'
        )
        // Line breaks
        .replace(/\n/g, "<br />");

      return (
        <div
          key={index}
          className="whitespace-pre-wrap wrap-break-word text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  return <div className="message-content">{formatContent(content)}</div>;
};

export default function AIChatBotPage() {
  const [AIAgentData, setAIAgentData] = useState<AIAgent[]>([]);
  const [activeTab, setActiveTab] = useState<"chat" | "mcp">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Your AI Agent is Ready Made by RAVX-OS.",
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

  const params = useParams();
  const id = params.id;

  const router = useRouter();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const GetAIAgentById = async () => {
    try {
      const res = await AxiosInstance.get(`/ai/get/agent/${id}`);
      if (res.status === 200) {
        setAIAgentData(res.data.AIAgent);
        setTimeout(() => {
          document.title = `${res.data.AIAgent.name} - RAVX OS`;
        }, 100);
        console.log(document.title);
      }
    } catch (error: any) {
      router.push("/arc");
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
    GetAIAgentById();
  }, []);

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const res = await AxiosInstance.post(`/ai/agent/${id}`, {
        prompt: inputMessage,
      });

      if (res.status === 200) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: res.data.response,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
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
    } finally {
      setIsLoading(false);
    }
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
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
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
                AIAgentData={AIAgentData}
                formatTimestamp={formatTimestamp}
                FormattedMessage={FormattedMessage}
              />
            </>
          )}

          {activeTab === "mcp" && (
            <>
              <MCPAgent
                isCreatingFile={isCreatingFile}
                setIsCreatingFile={setIsCreatingFile}
                newFileName={newFileName}
                setNewFileName={setNewFileName}
                createNewFile={createNewFile}
                files={files}
                selectedFile={selectedFile}
                fileContent={fileContent}
                setFileContent={setFileContent}
                saveFile={saveFile}
                deleteFile={deleteFile}
                handleFileSelect={handleFileSelect}
                fileContentRef={fileContentRef}
              />
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
