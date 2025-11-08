import React, { useEffect, useRef } from "react";
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
  FormattedMessage,
}: any) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputMessage]);

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

                  {/* Use FormattedMessage component here */}
                  <div className="text-sm leading-relaxed wrap-break-word mb-2">
                    <FormattedMessage content={message.content} />
                  </div>

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
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">
            {AIAgentData.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-bold text-cyan-500">
          {AIAgentData.name}
        </span>
      </div>
      
      {/* Simple text skeleton */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="h-3 bg-gray-600 rounded-full w-5/6 animate-pulse"></div>
        <div className="h-3 bg-gray-600 rounded-full w-4/6 animate-pulse"></div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
        <p className="text-xs text-cyan-300 font-medium">
          {AIAgentData.name} is thinking...
        </p>
      </div>
    </div>
  </motion.div>
)}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4">
            <div className="flex items-end space-x-3">
              {/* Textarea Container */}
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full bg-gray-700/50 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none scrollbar-small"
                  rows={2}
                  disabled={isLoading}
                  style={{
                    minHeight: "50px",
                    maxHeight: "200px",
                  }}
                />
              </div>

              {/* Send Button - Fixed Height */}
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 h-18 min-h-18 ${
                  inputMessage.trim() && !isLoading
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-500 cursor-pointer"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
                style={{ height: "50px" }}
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
