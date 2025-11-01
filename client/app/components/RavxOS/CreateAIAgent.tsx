"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheck, FaPlus, FaMinus } from "react-icons/fa";
import { CreateAIAgentData } from "@/app/types/Type";

interface CreateAIAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateAIAgentData) => void;
}

const personalityOptions = [
  { id: "friendly", label: "Friendly", description: "Warm and approachable" },
  {
    id: "professional",
    label: "Professional",
    description: "Formal and business-like",
  },
  {
    id: "creative",
    label: "Creative",
    description: "Imaginative and innovative",
  },
  {
    id: "analytical",
    label: "Analytical",
    description: "Logical and data-driven",
  },
  {
    id: "supportive",
    label: "Supportive",
    description: "Helpful and encouraging",
  },
  {
    id: "enthusiastic",
    label: "Enthusiastic",
    description: "Energetic and passionate",
  },
];

const toneOptions = [
  { id: "casual", label: "Casual", description: "Relaxed and informal" },
  { id: "formal", label: "Formal", description: "Professional and structured" },
  { id: "humorous", label: "Humorous", description: "Witty and entertaining" },
  {
    id: "empathetic",
    label: "Empathetic",
    description: "Understanding and caring",
  },
  {
    id: "authoritative",
    label: "Authoritative",
    description: "Confident and knowledgeable",
  },
  {
    id: "inspirational",
    label: "Inspirational",
    description: "Motivational and uplifting",
  },
];

const behaviorOptions = [
  "Active Listening",
  "Problem Solving",
  "Critical Thinking",
  "Adaptability",
  "Continuous Learning",
  "Emotional Intelligence",
  "Multitasking",
  "Decision Making",
];

const skillOptions = [
  "Natural Language Processing",
  "Data Analysis",
  "Content Generation",
  "Code Writing",
  "Research Assistance",
  "Translation",
  "Summarization",
  "Sentiment Analysis",
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
          className="fixed inset-0 bg-black backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Create New AI Agent
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* Agent Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  AI Agent Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your AI agent's name"
                  required
                />
              </div>

              {/* Personality */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Personality *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalityOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.personality === option.id
                          ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                          : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          personality: option.id,
                        }))
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">
                          {option.label}
                        </span>
                        {formData.personality === option.id && (
                          <FaCheck className="text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {option.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Tone *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {toneOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.tone === option.id
                          ? "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/25"
                          : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, tone: option.id }))
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">
                          {option.label}
                        </span>
                        {formData.tone === option.id && (
                          <FaCheck className="text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {option.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Behaviors */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Behaviors
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {behaviorOptions.map((behavior) => (
                      <motion.button
                        key={behavior}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          formData.behaviors.includes(behavior)
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
                      placeholder="Add custom behavior..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCustomBehavior}
                      className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors duration-300"
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Additional Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Additional Skills
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <motion.button
                        key={skill}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          formData.additionalSkills.includes(skill)
                            ? "bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
                      placeholder="Add custom skill..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCustomSkill}
                      className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition-colors duration-300"
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Selected Items Display */}
              {(formData.behaviors.length > 0 ||
                formData.additionalSkills.length > 0) && (
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">
                    Selected Features:
                  </h3>
                  <div className="space-y-2">
                    {formData.behaviors.length > 0 && (
                      <div>
                        <span className="text-sm text-purple-400">
                          Behaviors:{" "}
                        </span>
                        <span className="text-sm text-gray-300">
                          {formData.behaviors.join(", ")}
                        </span>
                      </div>
                    )}
                    {formData.additionalSkills.length > 0 && (
                      <div>
                        <span className="text-sm text-orange-400">
                          Skills:{" "}
                        </span>
                        <span className="text-sm text-gray-300">
                          {formData.additionalSkills.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors duration-300 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25"
                >
                  Create AI Agent
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
