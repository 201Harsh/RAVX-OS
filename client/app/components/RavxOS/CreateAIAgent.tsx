"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheck,
  FaVolumeUp,
  FaHeart,
  FaBrain,
  FaGraduationCap,
  FaCode,
  FaSmile,
  FaInfinity,
  FaSearch,
  FaRocket,
  FaArrowRight,
  FaArrowLeft,
  FaUser,
  FaCog,
  FaTerminal,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface CreateAIAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  clearFormData: boolean;
}

const personalityOptions = [
  {
    id: "ultimate-aio",
    label: "🧠 AIO Intelligence",
    description:
      "A fully balanced agent that can assist in creativity, logic, productivity, learning, and emotional support.",
    icon: <FaInfinity className="text-white" />,
    recommended: true,
    badge: "🔥 MOST POPULAR",
  },
  {
    id: "research-analyst",
    label: "🔍 Research Analyst",
    description:
      "Finds, summarizes, compares, and analyzes information for you.",
    icon: <FaSearch className="text-blue-300" />,
  },
  {
    id: "tech-assistant",
    label: "💻 Tech Assistant",
    description:
      "Good at coding help, debugging, and breaking down technical concepts.",
    icon: <FaCode className="text-cyan-400" />,
    recommended: true,
    badge: "📌 Code-Focused",
  },
  {
    id: "emotional-companion",
    label: "💖 Emotional Companion",
    description:
      "Listens, supports emotionally, responds with empathy and care.",
    icon: <FaHeart className="text-pink-400" />,
    recommended: true,
    badge: "💘 Love-Centric",
  },
  {
    id: "friendly-helper",
    label: "🤝 Friendly Helper",
    description:
      "Warm, approachable, and supportive — feels like a helpful friend.",
    icon: <FaSmile className="text-yellow-400" />,
  },
  {
    id: "professional-mentor",
    label: "🎓 Professional Mentor",
    description:
      "Guides users with wisdom, structured advice, and long-term growth focus.",
    icon: <FaGraduationCap className="text-blue-400" />,
  },
];

const toneOptions = [
  {
    id: "genz-chaotic",
    label: "🔥 Gen-Z Chaotic",
    description:
      "Uses memes, slang, hyper-casual tone. Perfect for fun or roleplay AIs.",
    recommended: true,
    badge: "✨ GEN-Z FAVORITE",
  },
  {
    id: "warm-encouraging",
    label: "☀️ Warm & Encouraging",
    description:
      "Positive, gentle, reassuring tone — great for personal growth.",
  },
  {
    id: "robotic-neutral",
    label: "🤖 Robotic & Neutral",
    description: "No emotion, no emojis, pure logic and direct responses.",
    recommended: true,
    badge: "🧊 EMOTIONLESS",
  },
  {
    id: "calm-supportive",
    label: "🌊 Calm & Supportive",
    description: "Gentle, patient, and reassuring — ideal for guidance.",
    recommended: true,
    badge: "🧘 PEACEFUL",
  },
  {
    id: "energetic-motivational",
    label: "⚡ Energetic & Motivational",
    description: "Hype tone, uplifting responses, keeps you moving forward.",
  },
  {
    id: "professional-formal",
    label: "💼 Professional & Formal",
    description: "Clear, structured, corporate-friendly language.",
  },
];

const behaviorOptions = [
  "👋 Greets user by name",
  "🤔 Explains simply",
  "💬 Matches user's communication style",
  "😌 Offers emotional reassurance",
  "🤝 Apologizes when making mistakes",
  "👀 Notices when user is confused",
  "🗣️ Adds personality (jokes, reactions)",
  "🧩 Breaks complex info into steps",
  "🌍 Adds real-world examples",
];

const skillOptions = [
  "🧾 Resume + portfolio writing",
  "🎥 Script writing for videos",
  "🛠️ Fixing errors",
  "🛍️ Buying recommendations",
  "🛡️ Cybersecurity guidance",
  "🌐 Website copywriting",
  "🏷️ Product evaluation",
  "📝 Copywriting for social media",
];

const maleVoices = [
  {
    id: "male-1",
    label: "🎙️ Deep Command",
    description: "Authoritative and clear - perfect for leadership roles",
  },
  {
    id: "male-2",
    label: "👨‍🏫 Warm Mentor",
    description: "Friendly and guiding - like a trusted teacher",
  },
  {
    id: "male-3",
    label: "💻 Tech Analyst",
    description: "Precise and professional - ideal for technical topics",
  },
];

const femaleVoices = [
  {
    id: "female-1",
    label: "💎 Crystal Clear",
    description: "Warm and articulate - perfect for clear communication",
  },
  {
    id: "female-2",
    label: "🤖 Tech Assistant",
    description: "Efficient and helpful - ideal for productivity tasks",
  },
  {
    id: "female-3",
    label: "🌈 Neon Guide",
    description: "Energetic and friendly - great for creative projects",
  },
];

const aiEngineModels = [
  {
    id: "ravx-neo",
    label: "🚀 RAVX-NEO",
    description: "Fast, efficient model perfect for everyday tasks",
    speed: "⚡ Fast",
    intelligence: "⚡ Neo-Smart",
    recommended: true,
    badge: "🚀 MOST EFFICIENT",
  },
  {
    id: "ravx-pro",
    label: "💎 RAVX-PRO",
    description: "Advanced reasoning with superior problem-solving",
    speed: "🏃‍♂️ Standard",
    intelligence: "🌟 Advanced",
  },
  {
    id: "ravx-ultra",
    label: "🔥 RAVX-ULTRA",
    description: "Maximum intelligence for complex analysis",
    speed: "🐢 Powerful",
    intelligence: "🚀 Maximum",
    recommended: true,
    badge: "🧠 MASTER-LEVEL",
  },
];

export default function CreateAIAgentModal({
  isOpen,
  onClose,
  onCreate,
  clearFormData,
}: CreateAIAgentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    personality: "",
    description: "",
    behaviors: [] as string[],
    skills: [] as string[],
    tone: "",
    voice: "",
    engineModel: "",
  });

  const [customBehavior, setCustomBehavior] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [selectedVoices, setSelectedVoices] = useState(maleVoices);

  const steps = [
    { number: 1, title: "Basic Info", icon: <FaUser /> },
    { number: 2, title: "Personality", icon: <FaBrain /> },
    { number: 3, title: "Voice & Tone", icon: <FaVolumeUp /> },
    { number: 4, title: "AI Engine", icon: <FaCog /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please complete all required fields in all steps.");
      return;
    }

    const newFormData = {
      name: formData.name,
      personality: formData.personality,
      tone: formData.tone,
      gender: formData.gender,
      voice: formData.voice,
      engineModel: formData.engineModel,
      description: formData.description,
      behaviors: formData.behaviors,
      skills: formData.skills,
    };

    onCreate(newFormData);
  };

  useEffect(() => {
    if (clearFormData) {
      setFormData({
        name: "",
        gender: "",
        personality: "",
        description: "",
        behaviors: [],
        skills: [],
        tone: "",
        voice: "",
        engineModel: "",
      });
      setCurrentStep(1);
    }
  }, [clearFormData]);

  useEffect(() => {
    if (formData.gender) {
      setSelectedVoices(
        formData.gender === "female" ? femaleVoices : maleVoices
      );
    }
  }, [formData.gender]);

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
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
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
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, customSkill.trim()],
      }));
      setCustomSkill("");
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.gender;
      case 2:
        return (
          formData.personality &&
          formData.description &&
          formData.behaviors.length > 0 &&
          formData.skills.length > 0
        );
      case 3:
        return formData.tone && formData.voice;
      case 4:
        return formData.engineModel;
      default:
        return false;
    }
  };

  const isFormValid =
    formData.name &&
    formData.personality &&
    formData.tone &&
    formData.gender &&
    formData.voice &&
    formData.engineModel &&
    formData.skills.length > 0 &&
    formData.behaviors.length > 0 &&
    formData.description;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900/90 border-2 border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-small font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 sticky top-0 bg-gray-900 rounded-t-xl z-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <FaTerminal className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-cyan-400 font-mono text-center uppercase">
                    CREATE AI AGENT SetUp Wizard
                  </h2>
                  <p className="text-xs text-cyan-400/70 font-mono">
                    Step {currentStep} of 4 - {steps[currentStep - 1]?.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 hover:scale-110 p-1"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 pt-4">
              <div className="flex justify-between items-center mb-6">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          currentStep >= step.number
                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                            : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <FaCheck className="text-xs" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-xs mt-1 transition-colors duration-300 whitespace-nowrap ${
                          currentStep >= step.number
                            ? "text-cyan-400"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                          currentStep > step.number
                            ? "bg-cyan-500"
                            : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                        AGENT BASIC CONFIGURATION
                      </h3>
                      <p className="text-gray-400 text-sm font-mono">
                        Set up the fundamental identity of your AI agent
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Agent Name */}
                      <div>
                        <label className="text-sm font-semibold text-cyan-300 mb-2 block font-mono">
                          AGENT NAME *
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
                          className="w-full bg-gray-800 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 font-mono text-sm"
                          placeholder="Enter agent name..."
                          required
                        />
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="text-sm font-semibold text-cyan-300 mb-2 block font-mono">
                          GENDER IDENTITY *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              value: "male",
                              label: "♂️ MALE",
                              desc: "Masculine persona",
                            },
                            {
                              value: "female",
                              label: "♀️ FEMALE",
                              desc: "Feminine persona",
                            },
                          ].map((gender) => (
                            <motion.div
                              key={gender.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                formData.gender === gender.value
                                  ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                                  : "border-gray-600 bg-gray-800/50 hover:border-cyan-400/50"
                              }`}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  gender: gender.value,
                                }))
                              }
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-white text-sm">
                                  {gender.label}
                                </span>
                                {formData.gender === gender.value && (
                                  <FaCheck className="text-cyan-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-300 mt-1">
                                {gender.desc}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Personality & Skills */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                        PERSONALITY CONFIGURATION
                      </h3>
                      <p className="text-gray-400 text-sm font-mono">
                        Define core personality, behaviors, and capabilities
                      </p>
                    </div>

                    {/* Personality */}
                    <div>
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        CORE PERSONALITY *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {personalityOptions.map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 relative ${
                              formData.personality === option.id
                                ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                                : "border-gray-600 bg-gray-800/50 hover:border-cyan-400/50"
                            } `}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                personality: option.id,
                              }))
                            }
                          >
                            {option.recommended && (
                              <div className="absolute -top-2 -right-2">
                                <div className="bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  {option.badge}
                                </div>
                              </div>
                            )}
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-white text-sm mb-1">
                                  {option.label}
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                  {option.description}
                                </p>
                              </div>
                              {formData.personality === option.id && (
                                <FaCheck className="text-cyan-400 mt-1" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm font-semibold text-cyan-300 mb-2 block font-mono">
                        AGENT DESCRIPTION *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full h-32 bg-gray-800 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none font-mono text-sm"
                        placeholder="Describe your AI agent's purpose and personality..."
                        required
                      />
                    </div>

                    {/* Behaviors & Skills Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Behaviors Card */}
                      <div className="bg-gray-800/50 border-2 border-cyan-500/20 rounded-xl p-4">
                        <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                          BEHAVIORS * (Select at least one)
                        </label>

                        {/* Selected Behaviors */}
                        {formData.behaviors.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {formData.behaviors.map((behavior, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg text-xs font-mono border border-cyan-500/30 flex items-center gap-2"
                                >
                                  {behavior}
                                  <button
                                    onClick={() => toggleBehavior(behavior)}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                  >
                                    <FaTimes className="text-xs" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Behavior Options Grid */}
                        <div className="grid grid-cols-1 gap-2 mb-4">
                          {behaviorOptions.map((behavior) => (
                            <motion.button
                              key={behavior}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                                formData.behaviors.includes(behavior)
                                  ? "bg-cyan-600 text-white border-cyan-500 shadow-lg shadow-cyan-500/25"
                                  : "bg-gray-700/50 text-gray-300 border-gray-600 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                              }`}
                              onClick={() => toggleBehavior(behavior)}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  formData.behaviors.includes(behavior)
                                    ? "bg-cyan-400 border-cyan-400"
                                    : "border-gray-500"
                                }`}
                              >
                                {formData.behaviors.includes(behavior) && (
                                  <FaCheck className="text-white text-xs" />
                                )}
                              </div>
                              <span className="text-sm flex-1">{behavior}</span>
                            </motion.button>
                          ))}
                        </div>

                        {/* Custom Behavior Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customBehavior}
                            onChange={(e) => setCustomBehavior(e.target.value)}
                            placeholder="Add custom behavior..."
                            className="flex-1 bg-gray-700 border-2 border-cyan-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm font-mono"
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
                            disabled={!customBehavior.trim()}
                            className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-300 ${
                              !customBehavior.trim()
                                ? "bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed"
                                : "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 cursor-pointer"
                            }`}
                          >
                            <FaPlus className="text-sm" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Skills Card */}
                      <div className="bg-gray-800/50 border-2 border-blue-500/20 rounded-xl p-4">
                        <label className="text-sm font-semibold text-blue-300 mb-3 block font-mono">
                          SKILLS * (Select at least one)
                        </label>

                        {/* Selected Skills */}
                        {formData.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {formData.skills.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs font-mono border border-blue-500/30 flex items-center gap-2"
                                >
                                  {skill}
                                  <button
                                    onClick={() => toggleSkill(skill)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                  >
                                    <FaTimes className="text-xs" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skill Options Grid */}
                        <div className="grid grid-cols-1 gap-2 mb-4">
                          {skillOptions.map((skill) => (
                            <motion.button
                              key={skill}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                                formData.skills.includes(skill)
                                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                                  : "bg-gray-700/50 text-gray-300 border-gray-600 hover:border-blue-400/50 hover:bg-blue-500/10"
                              }`}
                              onClick={() => toggleSkill(skill)}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  formData.skills.includes(skill)
                                    ? "bg-blue-400 border-blue-400"
                                    : "border-gray-500"
                                }`}
                              >
                                {formData.skills.includes(skill) && (
                                  <FaCheck className="text-white text-xs" />
                                )}
                              </div>
                              <span className="text-sm flex-1">{skill}</span>
                            </motion.button>
                          ))}
                        </div>

                        {/* Custom Skill Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            placeholder="Add custom skill..."
                            className="flex-1 bg-gray-700 border-2 border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm font-mono"
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
                            disabled={!customSkill.trim()}
                            className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all duration-300 ${
                              !customSkill.trim()
                                ? "bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white border-blue-500 hover:bg-blue-500 cursor-pointer"
                            }`}
                          >
                            <FaPlus className="text-sm" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Voice & Tone */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                        VOICE & COMMUNICATION
                      </h3>
                      <p className="text-gray-400 text-sm font-mono">
                        Configure how your AI agent speaks and communicates
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Tone */}
                      <div>
                        <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                          COMMUNICATION TONE *
                        </label>
                        <div className="space-y-3">
                          {toneOptions.map((option) => (
                            <motion.div
                              key={option.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 relative ${
                                formData.tone === option.id
                                  ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25"
                                  : "border-gray-600 bg-gray-800/50 hover:border-purple-400/50"
                              } `}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  tone: option.id,
                                }))
                              }
                            >
                              {option.recommended && (
                                <div className="absolute -top-2 -right-2">
                                  <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {option.badge}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-semibold text-white text-sm">
                                    {option.label}
                                  </div>
                                  <p className="text-xs text-gray-300 mt-1">
                                    {option.description}
                                  </p>
                                </div>
                                {formData.tone === option.id && (
                                  <FaCheck className="text-purple-400" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Voice */}
                      <div>
                        <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                          VOICE SELECTION *
                        </label>
                        <div className="space-y-3">
                          {selectedVoices.map((voice) => (
                            <motion.div
                              key={voice.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                formData.voice === voice.id
                                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25"
                                  : "border-gray-600 bg-gray-800/50 hover:border-blue-400/50"
                              }`}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  voice: voice.id,
                                }))
                              }
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-semibold text-white text-sm">
                                    {voice.label}
                                  </div>
                                  <p className="text-xs text-gray-300 mt-1">
                                    {voice.description}
                                  </p>
                                </div>
                                {formData.voice === voice.id && (
                                  <FaCheck className="text-blue-400" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: AI Engine */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                        AI ENGINE SELECTION
                      </h3>
                      <p className="text-gray-400 text-sm font-mono">
                        Choose the computational power for your AI agent
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {aiEngineModels.map((model: any) => (
                        <motion.div
                          key={model.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 relative ${
                            formData.engineModel === model.id
                              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/25"
                              : "border-gray-600 bg-gray-800/50 hover:border-emerald-400/50"
                          } ${
                            model.recommended ? "ring-2 ring-emerald-400" : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              engineModel: model.id,
                            }))
                          }
                        >
                          {model.recommended && (
                            <div className="absolute -top-2 -right-2">
                              <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {model.badge}
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl mb-2">{model.icon}</div>
                            <div className="font-bold text-white text-sm mb-2">
                              {model.label}
                            </div>
                            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                              {model.description}
                            </p>
                            <div className="flex justify-between text-xs">
                              <span className="text-cyan-400">
                                {model.speed}
                              </span>
                              <span className="text-yellow-400">
                                {model.intelligence}
                              </span>
                            </div>
                          </div>
                          {formData.engineModel === model.id && (
                            <div className="absolute top-2 right-2">
                              <FaCheck className="text-emerald-400" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/20">
                      <h4 className="font-semibold text-cyan-300 mb-3 font-mono">
                        CONFIGURATION SUMMARY
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Name:</span>
                          <span className="text-white ml-2">
                            {formData.name || "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Gender:</span>
                          <span className="text-white ml-2">
                            {formData.gender || "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Personality:</span>
                          <span className="text-white ml-2">
                            {personalityOptions.find(
                              (p) => p.id === formData.personality
                            )?.label || "Not set"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Tone:</span>
                          <span className="text-white ml-2">
                            {toneOptions.find((t) => t.id === formData.tone)
                              ?.label || "Not set"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-cyan-500/20">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
                      : "bg-gray-800 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10 cursor-pointer"
                  }`}
                >
                  <FaArrowLeft className="text-sm" />
                  <span className="font-mono">BACK</span>
                </motion.button>

                <div className="flex-1" />

                {currentStep < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!isStepValid()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                      !isStepValid()
                        ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
                        : "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 cursor-pointer"
                    }`}
                  >
                    <span className="font-mono">NEXT</span>
                    <FaArrowRight className="text-sm" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                    disabled={!isFormValid}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                      !isFormValid
                        ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
                        : "bg-linear-to-r from-cyan-600 to-emerald-600 text-white border-cyan-500 hover:from-cyan-500 hover:to-emerald-500 cursor-pointer"
                    }`}
                  >
                    <FaRocket className="text-sm" />
                    <span className="font-mono">CREATE AGENT</span>
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
