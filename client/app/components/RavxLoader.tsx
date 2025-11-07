"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RavxLoaderProps {
  duration?: number;
  onLoadingComplete?: () => void;
}

export default function RavxLoader({
  duration = 4000,
  onLoadingComplete,
}: RavxLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const bootSequence = [
    { text: "INITIALIZING RAVX AI OPERATING SYSTEM", delay: 200 },
    { text: "BOOTING NEURAL NETWORK CORE", delay: 600 },
    { text: "LOADING CYBERNETIC FRAMEWORK", delay: 1000 },
    { text: "MOUNTING VIRTUAL FILE SYSTEMS", delay: 1400 },
    { text: "STARTING AI AGENT MANAGEMENT", delay: 1800 },
    { text: "ESTABLISHING SECURE CONNECTION", delay: 2200 },
    { text: "CALIBRATING SENSOR ARRAYS", delay: 2600 },
    { text: "SYSTEM READY", delay: 3000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + 100 / (duration / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete]);

  useEffect(() => {
    const steps = bootSequence.map((step, index) =>
      setTimeout(() => setCurrentStep(index), step.delay)
    );

    return () => steps.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        {/* Main Container */}
        <div className="w-full max-w-2xl mx-4">
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-cyan-500/30 rounded-t-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-cyan-400 text-sm">
                root@ravx-os:~/# system --boot
              </div>
            </div>
          </motion.div>

          {/* Terminal Body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black border border-cyan-500/30 border-t-0 rounded-b-xl p-6 font-mono"
          >
            {/* Boot Sequence */}
            <div className="space-y-3 mb-6">
              {bootSequence.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: currentStep >= index ? 1 : 0.3,
                    x: currentStep >= index ? 0 : -20,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center space-x-3 ${
                    currentStep >= index ? "text-cyan-100" : "text-gray-600"
                  }`}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full shrink-0">
                    {currentStep > index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    )}
                  </div>
                  <span className="text-sm">$ {step.text}</span>
                  {currentStep === index && (
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2 h-4 bg-cyan-400 ml-2"
                    />
                  )}
                  {currentStep > index && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-sm ml-2"
                    >
                      [OK]
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-cyan-400">
                <span>BOOT_PROGRESS</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="h-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full relative overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-200/30 to-transparent transform -skew-x-12"
                  />
                </motion.div>
              </div>
            </div>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-cyan-500/20"
            >
              <div className="grid grid-cols-2 gap-4 text-xs text-cyan-400/70">
                <div className="flex justify-between">
                  <span>VERSION:</span>
                  <span className="text-cyan-300">RAVX-OS v2.2.1</span>
                </div>
                <div className="flex justify-between">
                  <span>BUILD:</span>
                  <span className="text-cyan-300">#7842A</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-green-400">BOOTING</span>
                </div>
                <div className="flex justify-between">
                  <span>MEMORY:</span>
                  <span className="text-cyan-300">4.2GB/16GB</span>
                </div>
              </div>
            </motion.div>

            {/* Animated AI Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
            >
              <div className="relative">
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-cyan-500/30 rounded-full"
                >
                  {/* Inner Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-24 h-24 border-2 border-cyan-400/50 rounded-full absolute top-4 left-4"
                  >
                    {/* Core */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="w-16 h-16 bg-cyan-500/20 rounded-full absolute top-4 left-4 border border-cyan-400/30"
                    >
                      {/* Center Dot */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          backgroundColor: ["#22d3ee", "#06b6d4", "#22d3ee"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="w-6 h-6 bg-cyan-400 rounded-full absolute top-5 left-5"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Orbiting Dots */}
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      rotate: 360,
                      x: [0, 48, 0, -48, 0],
                      y: [-48, 0, 48, 0, -48],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3,
                    }}
                    className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1 -translate-y-1"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-6"
          >
            <p className="text-cyan-400/50 text-xs font-mono">
              RAVX AI OPERATING SYSTEM • SECURE BOOT ENABLED
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
