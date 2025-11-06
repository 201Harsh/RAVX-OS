import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Createlab = ({
  isCreating,
  setIsCreating,
  handleCreateLab,
  newLabName,
  setNewLabName,
}: any) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const terminalLines = [
    "┌───────────────────────────────────────────────┐",
    "│  ▶  RAVX  - ARC -  LAB  - TERMINAL ",
    "│  ▶  Version 2.4.1  |  Neural Build: v2.4.1.4731  ",
    "│  ▶  Status: SYSTEM ONLINE                        ",
    "└───────────────────────────────────────────────┘",
    " ",
    "> Initializing RAVX-OS Arc Terminal v2.4.1...",
    "> Booting cybernetic interface...",
    "> Loading neural network protocols...",
    "> Establishing secure connection...",
    "> Welcome to ARC LAB Creation Terminal",
    "> Access: AUTHORIZED",
    "> Ready for lab initialization sequence...",
    " ",
    "> Enter lab designation:",
  ];

  useEffect(() => {
    if (isCreating) {
      setTerminalOutput([]);
      setIsTyping(true);
      setShowInput(false);

      // Simulate terminal typing effect
      let currentLine = 0;
      let currentChar = 0;
      const output: string[] = [];

      const typeWriter = setInterval(() => {
        if (currentLine < terminalLines.length) {
          if (currentChar === 0) {
            output.push("");
          }

          if (currentChar < terminalLines[currentLine].length) {
            output[currentLine] = terminalLines[currentLine].substring(
              0,
              currentChar + 1
            );
            setTerminalOutput([...output]);
            currentChar++;
          } else {
            currentLine++;
            currentChar = 0;
          }
        } else {
          clearInterval(typeWriter);
          setIsTyping(false);
          setTimeout(() => setShowInput(true), 300);
          setTimeout(() => inputRef.current?.focus(), 500);
        }
      }, 25);

      return () => clearInterval(typeWriter);
    }
  }, [isCreating]);

  useEffect(() => {
    // Auto-scroll terminal
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newLabName.trim()) {
      handleCreateLab();
    } else if (e.key === "Escape") {
      setIsCreating(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCreating && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
              onClick={() => setIsCreating(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed p-4 md:p-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl "
            >
              {/* Terminal Window */}
              <div className="bg-gray-900 border-2 border-cyan-400/40 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                {/* Terminal Header */}
                <div className="bg-gray-800 border-b border-cyan-400/30 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-cyan-300 font-mono text-sm ml-2">
                      root@ravx-os:~/# arc-lab --create
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm font-mono">
                    TERMINAL v2.4.1
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 font-mono">
                  {/* Terminal Output */}
                  <div
                    ref={terminalRef}
                    className="h-64 bg-black/50 rounded-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-hide"
                  >
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="text-cyan-100 text-sm mb-1">
                        {line}
                        {index === terminalOutput.length - 1 && isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.4, repeat: Infinity }}
                            className="ml-1"
                          >
                            █
                          </motion.span>
                        )}
                      </div>
                    ))}

                    {/* Input Line */}
                    {showInput && (
                      <div className="flex items-center mt-2">
                        <span className="text-green-400 text-sm mr-2">$</span>
                        <div className="flex-1 relative">
                          <input
                            ref={inputRef}
                            type="text"
                            value={newLabName}
                            onChange={(e) => setNewLabName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-transparent text-cyan-100 text-sm border-none outline-none font-mono placeholder-cyan-400/50"
                            placeholder="type_lab_name_here"
                            autoFocus
                          />
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute right-2 top-0 text-cyan-400 text-sm"
                          >
                            █
                          </motion.span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Control Buttons */}
                  <AnimatePresence>
                    {showInput && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-3 mt-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsCreating(false)}
                          className="flex-1 py-3 border border-red-400/30 text-red-400 rounded-lg font-mono text-sm hover:bg-red-400/10 transition-all duration-300"
                        >
                          <span className="text-red-400 mr-2">$</span>
                          abort --exit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCreateLab}
                          disabled={!newLabName.trim()}
                          className={`flex-1 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                            !newLabName.trim()
                              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-400"
                          }`}
                        >
                          <span className="text-black mr-2">#</span>
                          execute --create "{newLabName || "lab_name"}"
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Status Bar */}
                  <div className="mt-4 pt-3 border-t border-cyan-400/20 flex justify-between text-xs text-cyan-400/60">
                    <div className="flex space-x-4">
                      <span>
                        STATUS:{" "}
                        {isTyping
                          ? "INITIALIZING"
                          : showInput
                          ? "AWAITING_INPUT"
                          : "READY"}
                      </span>
                      <span>USER: root</span>
                    </div>
                    <div className="flex space-x-4">
                      <span>ENCRYPTION: AES-256</span>
                      <span>CONNECTION: SECURE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-4 text-cyan-400/60 text-sm font-mono"
              >
                Powered by RAVX-OS v2.4.1
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Createlab;
