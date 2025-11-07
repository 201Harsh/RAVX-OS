"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaArrowLeft,
  FaTerminal,
  FaExclamationTriangle,
  FaSearch,
  FaCog,
} from "react-icons/fa";

export default function NotFoundPage() {
  const router = useRouter();

  const errorMessages = [
    "SYSTEM_ERR: PAGE_NOT_FOUND",
    "ERROR_404: PATH_DOES_NOT_EXIST",
    "NETWORK_ERROR: DESTINATION_UNREACHABLE",
    "NAVIGATION_FAILED: INVALID_COORDINATES",
    "ACCESS_DENIED: PATH_TERMINATED",
  ];

  const suggestions = [
    {
      icon: <FaHome />,
      text: "Return to Dashboard",
      action: () => router.push("/"),
    },
    { icon: <FaArrowLeft />, text: "Go Back", action: () => router.back() },
    {
      icon: <FaSearch />,
      text: "Search System",
      action: () => router.push("/"),
    },
    {
      icon: <FaCog />,
      text: "System Settings",
      action: () => router.push("/"),
    },
  ];

  const systemInfo = [
    { label: "STATUS", value: "ERROR_404", color: "text-red-400" },
    { label: "SYSTEM", value: "RAVX-OS v2.2.1", color: "text-cyan-400" },
    {
      label: "TIMESTAMP",
      value: new Date().toLocaleTimeString(),
      color: "text-green-400",
    },
    { label: "SECURITY", value: "ACTIVE", color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-cyan-900/20 text-white p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 border border-cyan-400/30 rounded-t-xl p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-cyan-400 text-sm">
                root@ravx-os:~/# navigation --status
              </div>
            </div>
            <div className="flex items-center space-x-4 text-cyan-300/60 text-sm">
              <div className="flex items-center space-x-1">
                <FaExclamationTriangle className="text-xs" />
                <span>ERROR_CONSOLE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terminal Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black border border-cyan-400/30 border-t-0 rounded-b-xl p-6 font-mono relative overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-32 h-32 border border-cyan-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 border border-cyan-400/20 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Error Code Display */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-8xl font-bold mb-4"
            >
              <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                404
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FaExclamationTriangle className="text-red-400 text-xl" />
                <h1 className="text-2xl font-bold text-cyan-400 font-mono">
                  PAGE NOT FOUND
                </h1>
              </div>
            </motion.div>
          </div>

          {/* Error Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/50 rounded-lg p-4 border border-red-500/30 mb-6"
          >
            <div className="space-y-2">
              {errorMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 text-sm"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full shrink-0"></div>
                  <span
                    className={`${
                      index === 0
                        ? "text-red-400 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {message}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {systemInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-3 text-center border border-cyan-400/20"
              >
                <div className="text-xs text-cyan-400/70 mb-1">
                  {info.label}
                </div>
                <div className={`text-sm font-semibold ${info.color}`}>
                  {info.value}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-20"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.text}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={suggestion.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg border border-cyan-400/30 transition-all duration-300 flex items-center justify-center space-x-2 font-mono text-sm"
              >
                {suggestion.icon}
                <span>{suggestion.text}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Debug Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gray-900/30 rounded-lg p-4 border border-cyan-400/20"
          >
            <div className="flex items-center space-x-2 mb-3">
              <FaTerminal className="text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm">
                DEBUG_CONSOLE
              </span>
            </div>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>REQUEST_URI:</span>
                <span className="text-cyan-300">/undefined-route</span>
              </div>
              <div className="flex justify-between">
                <span>RESPONSE_CODE:</span>
                <span className="text-red-400">404_NOT_FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>PROTOCOL:</span>
                <span className="text-green-400">HTTPS/3.1</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY:</span>
                <span className="text-yellow-400">ENCRYPTED</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mt-6"
        >
          <p className="text-cyan-400/50 text-xs font-mono">
            RAVX AI OPERATING SYSTEM • SECURITY PROTOCOL ACTIVE •{" "}
            {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
