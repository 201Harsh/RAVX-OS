import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const ChatContainer = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleKeyPress,
  isLoading,
  messagesEndRef,
  AIAgentData,
  formatTimestamp,
}: any) => {
  return (
    <>
      <motion.div
        key="chat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-full"
      >
        {/* Chat Container */}
        <div className="bg-black backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 h-[calc(100vh-100px)] flex flex-col w-full">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-small">
            {messages.map((message: any) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 relative ${
                    message.sender === "user"
                      ? "bg-cyan-600/20 border border-cyan-500/30 text-white"
                      : "bg-gray-950/50 border border-gray-600/30 text-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-28 h-5 sm:w-28 sm:h-7 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-transparent"
                          : "bg-transparent"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <div className="flex items-center space-x-2">
                          <FaUser className="text-xs text-white" />
                          <span className="text-sm whitespace-nowrap">You</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {AIAgentData.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-cyan-500 whitespace-nowrap">
                              {AIAgentData.name}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word mb-2">
                    {message.content}
                  </p>
                  <span className="text-xs text-gray-400 absolute bottom-1 right-2">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[90%] sm:max-w-[80%] bg-gray-700/50 border border-gray-600/30 rounded-2xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FaRobot className="text-xs text-white" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.4,
                          }}
                        />
                      </div>
                      <motion.p
                        className="text-xs text-cyan-300 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {AIAgentData.name} is thinking...
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    className="mt-3 flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      className="h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-cyan-500/20 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send)"
                  className="w-full bg-gray-700/50 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none scrollbar-small"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  inputMessage.trim() && !isLoading
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-500 cursor-pointer"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaPaperPlane className="text-sm" />
                <span className="hidden sm:inline">Send</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatContainer;
