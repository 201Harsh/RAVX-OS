import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaStop,
  FaVolumeUp,
  FaCopy,
  FaRedo,
  FaCheck,
  FaRobot,
} from "react-icons/fa";
import { SiOpenai, SiGoogle, SiHuggingface } from "react-icons/si";

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
  audioList,
  handleRetryMessage,
}: any) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Resize textarea automatically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputMessage]);

  // Initialize single audio player instance
  useEffect(() => {
    audioRef.current = new Audio();

    const handleAudioEnd = () => setCurrentlyPlaying(null);
    const handleAudioError = () => {
      setCurrentlyPlaying(null);
    };

    audioRef.current.addEventListener("ended", handleAudioEnd);
    audioRef.current.addEventListener("error", handleAudioError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleAudioEnd);
        audioRef.current.removeEventListener("error", handleAudioError);
        audioRef.current = null;
      }
    };
  }, []);

  // Function to play or stop audio per message
  const handlePlayAudio = (messageId: string) => {
    if (!audioRef.current) return;

    const audioItem = audioList?.find((item: any) => item.id === messageId);
    if (!audioItem) {
      return;
    }

    // If same message clicked again, toggle play/pause
    if (currentlyPlaying === messageId) {
      handleStopAudio();
      return;
    }

    // Stop any playing audio
    handleStopAudio();

    // Play new one
    audioRef.current.src = audioItem.url;
    audioRef.current
      .play()
      .then(() => setCurrentlyPlaying(messageId))
      .catch(() => {
        setCurrentlyPlaying(null);
      });
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentlyPlaying(null);
    }
  };

  // Copy message to clipboard
  const handleCopyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Stop audio when loading a new AI response
  useEffect(() => {
    if (isLoading) handleStopAudio();
  }, [isLoading]);

  const getAIModelIcon = () => {
    return <FaRobot className="text-cyan-400" />;
  };

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
        <div className="backdrop-blur-xs shadow-2xl shadow-cyan-500/20 h-screen flex flex-col w-full">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center space-y-6 p-8">
              {/* Animated AI Avatar Container */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Pulsing Glow Effect */}
                <motion.div
                  className="absolute inset-0 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* AI Avatar Icon */}
                <motion.div
                  className="relative w-20 h-20 bg-linear-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border border-cyan-400/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUser className="text-2xl text-white" />

                  {/* Active Indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              {/* AI Identity */}
              <motion.div
                className="text-center space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {AIAgentData.name}
                </h2>

                <motion.p
                  className="text-lg text-gray-300 max-w-md leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Made With ❤️ by{" "}
                  <span className="text-cyan-400 font-bold">
                    <a
                      href="https://www.linkedin.com/in/201harsh"
                      target="_blank"
                    >
                      RAVX-OS
                    </a>
                  </span>
                </motion.p>
              </motion.div>

              {/* Waiting Indicator */}
              <motion.div
                className="flex flex-col items-center space-y-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {/* Typing Animation */}
                <motion.div
                  className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-3 border border-cyan-500/20"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.1)",
                      "0 0 30px rgba(34, 211, 238, 0.2)",
                      "0 0 20px rgba(34, 211, 238, 0.1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </motion.div>

                {/* Status Message */}
                <motion.p
                  className="text-cyan-400/70 text-sm font-mono tracking-wider"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AWAITING_USER_INPUT
                </motion.p>
              </motion.div>

              {/* Interactive Prompt */}
              <motion.div
                className="text-center space-y-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-gray-200 text-sm">
                  Ready to assist with tasks, answer questions, or generate
                  content
                </p>
                <motion.p className="text-cyan-500 text-sm font-mono animate-pulse">
                  Type a message to begin interaction...
                </motion.p>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-small">
                {messages.map((message: any) => (
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
                      className={`max-w-full sm:max-w-full rounded-2xl p-4 sm:p-5 relative group ${
                        message.sender === "user"
                          ? "bg-cyan-600/20 border border-cyan-500/30 text-white"
                          : "bg-gray-800/50 border border-gray-600/30 text-white"
                      }`}
                    >
                      {/* Header (user or AI name) */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {message.sender === "user" ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <FaUser className="text-xs text-white" />
                              </div>
                              <span className="text-sm font-semibold whitespace-nowrap">
                                You
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                                  {getAIModelIcon()}
                                </div>
                                <div>
                                  <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">
                                    {AIAgentData.name}
                                  </span>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-400">
                                      Online
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className={`flex items-center space-x-1 ml-4`}>
                          {/* Copy Button */}
                          <motion.button
                            onClick={() =>
                              handleCopyMessage(message.content, message.id)
                            }
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              copiedMessageId === message.id
                                ? "text-green-400 bg-green-400/10"
                                : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                            }`}
                            title="Copy response"
                          >
                            {copiedMessageId === message.id ? (
                              <FaCheck className="text-xs" />
                            ) : (
                              <FaCopy className="text-xs" />
                            )}
                          </motion.button>

                          {/* Retry Button - Only for user messages */}
                          {message.sender === "user" && (
                            <motion.button
                              onClick={() =>
                                handleRetryMessage(message.content)
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200"
                              title="Regenerate response"
                            >
                              <FaRedo className="text-xs" />
                            </motion.button>
                          )}

                          {/* Voice Button - Only for AI messages */}
                          {message.sender !== "user" &&
                            audioList?.some(
                              (a: any) => a.id === message.id
                            ) && (
                              <motion.button
                                onClick={() =>
                                  currentlyPlaying === message.id
                                    ? handleStopAudio()
                                    : handlePlayAudio(message.id)
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                  currentlyPlaying === message.id
                                    ? "text-red-400 bg-red-400/10"
                                    : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                                }`}
                                title={
                                  currentlyPlaying === message.id
                                    ? "Stop audio"
                                    : "Play audio"
                                }
                              >
                                {currentlyPlaying === message.id ? (
                                  <FaStop className="text-xs" />
                                ) : (
                                  <FaVolumeUp className="text-xs" />
                                )}
                              </motion.button>
                            )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="text-sm leading-relaxed wrap-break-word mb-3">
                        <FormattedMessage
                          content={message.content}
                          toolResponse={message.toolResponse}
                        />
                      </div>

                      {/* Timestamp + Status */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600/30">
                        <span className="text-xs text-gray-400">
                          {formatTimestamp(message.timestamp)}
                        </span>

                        {/* Audio Playing Indicator */}
                        {message.sender !== "user" &&
                          currentlyPlaying === message.id && (
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                <div
                                  className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                                <div
                                  className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.4s" }}
                                ></div>
                              </div>
                              <span className="text-xs text-cyan-400 font-mono">
                                Playing
                              </span>
                            </div>
                          )}

                        {/* Copy Success Indicator */}
                        {copiedMessageId === message.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center space-x-1 text-green-400"
                          >
                            <FaCheck className="text-xs" />
                            <span className="text-xs font-mono">Copied!</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* AI Typing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[90%] min-w-[70%] sm:max-w-[80%] bg-gray-800/50 border border-gray-600/30 rounded-2xl p-5">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                          <FaRobot className="text-white text-sm" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-cyan-400">
                            {AIAgentData.name}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-400">
                              Thinking...
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="h-3 bg-gray-700 rounded-full animate-pulse"></div>
                        <div className="h-3 bg-gray-700 rounded-full w-5/6 animate-pulse"></div>
                        <div className="h-3 bg-gray-700 rounded-full w-4/6 animate-pulse"></div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                        <p className="text-xs text-cyan-300 font-medium font-mono">
                          Generating response...
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}

          {/* Input Area */}
          <div className="p-4 sm:p-5 border-t border-gray-700/50">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message RAVX OS..."
                  className={`w-full bg-gray-800/50 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 min-h-[65px] transition-all duration-300 resize-none scrollbar-small pr-12 ${
                    isLoading
                      ? "cursor-not-allowed hidden"
                      : "cursor-text block"
                  }`}
                  style={{
                    maxHeight: "120px",
                  }}
                />
              </div>

              {/* Send Button */}
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 min-w-16 min-h-[70px] ${
                  inputMessage.trim() && !isLoading
                    ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-500 hover:to-blue-500 cursor-pointer"
                    : "hidden cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatContainer;
