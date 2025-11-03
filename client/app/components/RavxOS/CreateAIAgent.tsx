"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheck, FaPlus, FaUser, FaVolumeUp } from "react-icons/fa";
import { toast } from "react-toastify";

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

const maleVoices = [
  {
    id: "male-1",
    label: "Deep Command",
    description: "Authoritative and clear",
  },
  { id: "male-2", label: "Warm Mentor", description: "Friendly and guiding" },
  {
    id: "male-3",
    label: "Tech Analyst",
    description: "Precise and professional",
  },
  {
    id: "male-4",
    label: "Cyber Narrator",
    description: "Mysterious and engaging",
  },
];

const femaleVoices = [
  {
    id: "female-1",
    label: "Crystal Clear",
    description: "Warm and articulate",
  },
  {
    id: "female-2",
    label: "Tech Assistant",
    description: "Efficient and helpful",
  },
  {
    id: "female-3",
    label: "Neon Guide",
    description: "Energetic and friendly",
  },
  {
    id: "female-4",
    label: "Quantum Voice",
    description: "Calm and intelligent",
  },
];

const aiAvatars = [
  {
    id: "avatar-1",
    label: "Cyber Male",
    image: "/api/placeholder/80/80",
    gender: "male",
  },
  {
    id: "avatar-2",
    label: "Neon Female",
    image: "/api/placeholder/80/80",
    gender: "female",
  },
  {
    id: "avatar-3",
    label: "Quantum Analyst",
    image: "/api/placeholder/80/80",
    gender: "male",
  },
  {
    id: "avatar-4",
    label: "Synth Operator",
    image: "/api/placeholder/80/80",
    gender: "female",
  },
  {
    id: "avatar-5",
    label: "Data Explorer",
    image: "/api/placeholder/80/80",
    gender: "male",
  },
  {
    id: "avatar-6",
    label: "Binary Assistant",
    image: "/api/placeholder/80/80",
    gender: "female",
  },
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
    gender: "male",
    voice: "",
    avatar: "",
    description: "",
    behaviors: [] as string[],
    additionalSkills: [] as string[],
  });

  const [customBehavior, setCustomBehavior] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [selectedVoices, setSelectedVoices] = useState(maleVoices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: "",
      personality: "",
      tone: "",
      gender: "male",
      voice: "",
      avatar: "",
      description: "",
      behaviors: [],
      additionalSkills: [],
    });
    if (
      !formData.name ||
      !formData.personality ||
      !formData.tone ||
      !formData.gender ||
      !formData.voice ||
      !formData.avatar ||
      !formData.description ||
      formData.behaviors.length === 0 ||
      formData.additionalSkills.length === 0
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const newFormData = {
      name: formData.name,
      personality: formData.personality,
      tone: formData.tone,
      gender: formData.gender,
      voice: formData.voice,
      avatar: formData.avatar,
      description: formData.description,
      behaviors: formData.behaviors,
      skills: formData.additionalSkills,
    };

    onCreate(newFormData);
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

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
      voice: "", // Reset voice when gender changes
    }));
    setSelectedVoices(gender === "female" ? femaleVoices : maleVoices);
  };

  const handleAvatarSelect = (avatarId: string, gender: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: avatarId,
      gender: gender, // Auto-set gender based on avatar selection
    }));
    setSelectedVoices(gender === "female" ? femaleVoices : maleVoices);
  };

  const isFormValid =
    formData.name &&
    formData.personality &&
    formData.tone &&
    formData.gender &&
    formData.voice &&
    formData.additionalSkills &&
    formData.behaviors &&
    formData.description &&
    formData.avatar;

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
            className="bg-gray-900 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-full max-w-7xl max-h-[95vh] overflow-y-auto scrollbar-small"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 sticky top-0 bg-gray-900 rounded-t-2xl">
              <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Create New AI Agent
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110"
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
                    <label className="block text-sm font-medium text-white mb-2">
                      AI Agent Name *
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
                      className="w-full bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                      placeholder="Enter your AI agent's name"
                      required
                    />
                  </div>

                  {/* AI Gender */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      AI Gender *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.gender === "male"
                            ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                            : "border-cyan-500/30 bg-gray-800/50 hover:border-cyan-400/50"
                        }`}
                        onClick={() => handleGenderChange("male")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">Male</span>
                          {formData.gender === "male" && (
                            <FaCheck className="text-cyan-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          Masculine voice and persona
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.gender === "female"
                            ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25"
                            : "border-purple-500/30 bg-gray-800/50 hover:border-purple-400/50"
                        }`}
                        onClick={() => handleGenderChange("female")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">
                            Female
                          </span>
                          {formData.gender === "female" && (
                            <FaCheck className="text-purple-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          Feminine voice and persona
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Voice Selection */}
                  {formData.gender && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">
                        Voice Selection *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedVoices.map((voice) => (
                          <motion.div
                            key={voice.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              formData.voice === voice.id
                                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25"
                                : "border-blue-500/30 bg-gray-800/50 hover:border-blue-400/50"
                            }`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                voice: voice.id,
                              }))
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <FaVolumeUp
                                  className={`text-sm ${
                                    formData.voice === voice.id
                                      ? "text-blue-400"
                                      : "text-gray-400"
                                  }`}
                                />
                                <span className="font-semibold text-white">
                                  {voice.label}
                                </span>
                              </div>
                              {formData.voice === voice.id && (
                                <FaCheck className="text-blue-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400">
                              {voice.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Personality */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
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
                            <span className="font-semibold text-white">
                              {option.label}
                            </span>
                            {formData.personality === option.id && (
                              <FaCheck className="text-cyan-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            {option.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* AI Avatar Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      AI Avatar Appearance
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {aiAvatars.map((avatar) => (
                        <motion.div
                          key={avatar.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.avatar === avatar.id
                              ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/25"
                              : "border-gray-600 bg-gray-800/50 hover:border-green-400/50"
                          }`}
                          onClick={() =>
                            handleAvatarSelect(avatar.id, avatar.gender)
                          }
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-2">
                              <FaUser className="text-white text-lg" />
                            </div>
                            <span className="text-xs font-medium text-white text-center">
                              {avatar.label}
                            </span>
                            <span
                              className={`text-xs ${
                                avatar.gender === "male"
                                  ? "text-cyan-400"
                                  : "text-purple-400"
                              }`}
                            >
                              {avatar.gender}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                      placeholder="Describe your AI agent's purpose, characteristics, and how it should interact..."
                      rows={4}
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
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
                            <span className="font-semibold text-white">
                              {option.label}
                            </span>
                            {formData.tone === option.id && (
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
                </div>
              </div>

              {/* Full Width Sections */}
              <div className="mt-8 space-y-6">
                {/* Behaviors */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
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
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            formData.behaviors.includes(behavior)
                              ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                              : "bg-gray-800 text-gray-300 hover:bg-cyan-500/20 border border-cyan-500/30"
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
                        className="flex-1 bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
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
                  <label className="block text-sm font-medium text-white mb-3">
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
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            formData.additionalSkills.includes(skill)
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                              : "bg-gray-800 text-gray-300 hover:bg-blue-500/20 border border-blue-500/30"
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
                        className="flex-1 bg-gray-800 border-2 border-blue-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
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
                    <h3 className="font-semibold text-white mb-2">
                      Selected Features:
                    </h3>
                    <div className="space-y-2">
                      {formData.behaviors.length > 0 && (
                        <div>
                          <span className="text-sm text-cyan-400">
                            Behaviors:{" "}
                          </span>
                          <span className="text-sm text-gray-300">
                            {formData.behaviors.join(", ")}
                          </span>
                        </div>
                      )}
                      {formData.additionalSkills.length > 0 && (
                        <div>
                          <span className="text-sm text-blue-400">
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
              </div>

              {/* Actions - Full Width */}
              <div className="flex gap-3 pt-8 mt-6 border-t border-cyan-500/20">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  disabled={!isFormValid}
                  className={`flex-1 py-3 px-6 rounded-xl border-2 font-medium shadow-lg transition-all duration-300 ${
                    isFormValid
                      ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/50 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/25 cursor-pointer"
                      : "bg-gray-700 text-gray-400 border-gray-600/50 cursor-not-allowed"
                  }`}
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
