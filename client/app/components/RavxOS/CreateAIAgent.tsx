"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheck, FaPlus, FaBolt } from "react-icons/fa";

interface CreateAIAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

const personalityOptions = [
  {
    id: "cyber-sentinel",
    label: "Cyber Sentinel",
    description: "Vigilant and analytical",
  },
  {
    id: "neon-adept",
    label: "Neon Adept",
    description: "Creative and adaptive",
  },
  {
    id: "quantum-analyst",
    label: "Quantum Analyst",
    description: "Precise and logical",
  },
  {
    id: "synth-operator",
    label: "Synth Operator",
    description: "Efficient and systematic",
  },
  {
    id: "data-nomad",
    label: "Data Nomad",
    description: "Explorative and curious",
  },
  {
    id: "binary-bard",
    label: "Binary Bard",
    description: "Expressive and engaging",
  },
];

const toneOptions = [
  { id: "cyber-punk", label: "Cyber Punk", description: "Edgy and futuristic" },
  {
    id: "neon-noir",
    label: "Neon Noir",
    description: "Mysterious and atmospheric",
  },
  {
    id: "quantum-cool",
    label: "Quantum Cool",
    description: "Calm and calculated",
  },
  {
    id: "synth-wave",
    label: "Synth Wave",
    description: "Rhythmic and energetic",
  },
  {
    id: "tech-savvy",
    label: "Tech Savvy",
    description: "Knowledgeable and sharp",
  },
  {
    id: "future-forward",
    label: "Future Forward",
    description: "Visionary and bold",
  },
];

const behaviorOptions = [
  "Neural Processing",
  "Data Stream Analysis",
  "Pattern Recognition",
  "Quantum Computation",
  "Cyber Intuition",
  "Binary Reasoning",
  "Signal Processing",
  "Algorithm Optimization",
];

const skillOptions = [
  "Quantum Encryption",
  "Neural Network Training",
  "Data Stream Mining",
  "Cyber Security Protocols",
  "AI Model Fine-tuning",
  "Blockchain Analysis",
  "Predictive Analytics",
  "Virtual Reality Integration",
];

export default function CreateAIAgentModal({
  isOpen,
  onClose,
  onCreate,
}: CreateAIAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    tone: "",
    behaviors: [] as string[],
    additionalSkills: [] as string[],
  });

  const [customBehavior, setCustomBehavior] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.personality || !formData.tone) {
      alert("Please fill in all required fields");
      return;
    }
    onCreate(formData);
    setFormData({
      name: "",
      personality: "",
      tone: "",
      behaviors: [],
      additionalSkills: [],
    });
  };

  const toggleBehavior = (behavior: string) => {
    setFormData((prev) => ({
      ...prev,
      behaviors: prev.behaviors.includes(behavior)
        ? prev.behaviors.filter((b) => b !== behavior)
        : [...prev.behaviors, behavior],
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalSkills: prev.additionalSkills.includes(skill)
        ? prev.additionalSkills.filter((s) => s !== skill)
        : [...prev.additionalSkills, skill],
    }));
  };

  const addCustomBehavior = () => {
    if (
      customBehavior.trim() &&
      !formData.behaviors.includes(customBehavior.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        behaviors: [...prev.behaviors, customBehavior.trim()],
      }));
      setCustomBehavior("");
    }
  };

  const addCustomSkill = () => {
    if (
      customSkill.trim() &&
      !formData.additionalSkills.includes(customSkill.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        additionalSkills: [...prev.additionalSkills, customSkill.trim()],
      }));
      setCustomSkill("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-full max-w-7xl max-h-[95vh] overflow-y-auto neon-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 sticky top-0 bg-gray-900 rounded-t-2xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Forge New AI Agent
              </h2>
              <button
                onClick={onClose}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:scale-110"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Grid Layout for Desktop */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Agent Name */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Agent Designation *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-cyan-800 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                      placeholder="Enter agent designation..."
                      required
                    />
                  </div>

                  {/* Personality */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-3">
                      Core Personality Matrix *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {personalityOptions.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.personality === option.id
                              ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                              : "border-cyan-500/30 bg-gray-800/50 hover:border-cyan-400/50"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              personality: option.id,
                            }))
                          }
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-cyan-300">
                              {option.label}
                            </span>
                            {formData.personality === option.id && (
                              <FaBolt className="text-cyan-400 animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-cyan-600">
                            {option.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-3">
                      Communication Protocol *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {toneOptions.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.tone === option.id
                              ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25"
                              : "border-blue-500/30 bg-gray-800/50 hover:border-blue-400/50"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              tone: option.id,
                            }))
                          }
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-blue-300">
                              {option.label}
                            </span>
                            {formData.tone === option.id && (
                              <FaBolt className="text-blue-400 animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-blue-600">
                            {option.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Behaviors */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-3">
                      Behavioral Algorithms
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {behaviorOptions.map((behavior) => (
                          <motion.button
                            key={behavior}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              formData.behaviors.includes(behavior)
                                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                                : "bg-gray-800 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
                            }`}
                            onClick={() => toggleBehavior(behavior)}
                          >
                            {behavior}
                          </motion.button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customBehavior}
                          onChange={(e) => setCustomBehavior(e.target.value)}
                          placeholder="Add custom algorithm..."
                          className="flex-1 bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-cyan-800 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addCustomBehavior())
                          }
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addCustomBehavior}
                          className="bg-cyan-600 text-white px-4 py-2 rounded-xl border-2 border-cyan-500/50 hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                        >
                          <FaPlus />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Skills */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-3">
                      Specialized Modules
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => (
                          <motion.button
                            key={skill}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              formData.additionalSkills.includes(skill)
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                : "bg-gray-800 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                            }`}
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </motion.button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          placeholder="Add custom module..."
                          className="flex-1 bg-gray-800 border-2 border-blue-500/30 rounded-xl px-4 py-2 text-white placeholder-blue-800 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addCustomSkill())
                          }
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addCustomSkill}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl border-2 border-blue-500/50 hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/25"
                        >
                          <FaPlus />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Selected Items Display */}
                  {(formData.behaviors.length > 0 ||
                    formData.additionalSkills.length > 0) && (
                    <div className="bg-gray-800/50 rounded-xl p-4 border-2 border-cyan-500/20">
                      <h3 className="font-semibold text-cyan-300 mb-2">
                        Active Systems:
                      </h3>
                      <div className="space-y-2">
                        {formData.behaviors.length > 0 && (
                          <div>
                            <span className="text-sm text-cyan-400">
                              Algorithms:{" "}
                            </span>
                            <span className="text-sm text-cyan-600">
                              {formData.behaviors.join(", ")}
                            </span>
                          </div>
                        )}
                        {formData.additionalSkills.length > 0 && (
                          <div>
                            <span className="text-sm text-blue-400">
                              Modules:{" "}
                            </span>
                            <span className="text-sm text-blue-600">
                              {formData.additionalSkills.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions - Full Width */}
              <div className="flex gap-3 pt-8 mt-6 border-t border-cyan-500/20">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-800 text-cyan-400 py-3 px-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 font-medium"
                >
                  Abort Sequence
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-xl border-2 border-cyan-400/50 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/25"
                >
                  Initialize Agent
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
