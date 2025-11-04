"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheck,
  FaPlus,
  FaVolumeUp,
  FaRobot,
  FaHeart,
  FaBrain,
  FaLightbulb,
  FaGraduationCap,
  FaDumbbell,
  FaCode,
  FaSmile,
  FaInfinity,
  FaPiggyBank,
  FaSearch,
  FaBullhorn,
  FaBookOpen,
  FaCrown,
  FaFire,
  FaBolt,
  FaRocket,
  FaShieldAlt,
  FaMagic,
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
      "A fully balanced agent that can assist in creativity, logic, productivity, learning, and emotional support. The ultimate all-round AI.",
    icon: <FaInfinity className="text-white" />,
    color: "from-slate-700 to-gray-900",
    recommended: true,
    badge: "🔥 MOST POPULAR",
  },
  {
    id: "research-analyst",
    label: "🔍 Research Analyst",
    description:
      "Finds, summarizes, compares, and analyzes information for you. Perfect for deep learning and decision-making.",
    icon: <FaSearch className="text-blue-300" />,
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "tech-assistant",
    label: "💻 Tech Assistant",
    description:
      "Good at coding help, debugging, and breaking down technical concepts. Your coding companion.",
    icon: <FaCode className="text-cyan-400" />,
    color: "from-cyan-500 to-blue-500",
    recommended: true,
    badge: "📌 Code-Focused Agent",
  },
  {
    id: "brand-builder",
    label: "🚀 Brand Builder",
    description:
      "Creates identity, voice, content strategy, and social media ideas for creators or startups.",
    icon: <FaBullhorn className="text-pink-300" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "story-narrator",
    label: "📖 Story Narrator",
    description:
      "Builds stories, characters, plots, dialogue, and lore. Ideal for authors, game devs, and roleplay AI.",
    icon: <FaBookOpen className="text-orange-400" />,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "emotional-companion",
    label: "💖 Emotional Companion",
    description:
      "Listens, supports emotionally, responds with empathy and care. Always here to understand you.",
    icon: <FaHeart className="text-pink-400" />,
    color: "from-pink-500 to-rose-500",
    recommended: true,
    badge: "💘 Love-Centric AI Companion",
  },
  {
    id: "friendly-helper",
    label: "🤝 Friendly Helper",
    description:
      "Warm, approachable, and supportive — feels like a helpful friend who's always there for you.",
    icon: <FaSmile className="text-yellow-400" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "professional-mentor",
    label: "🎓 Professional Mentor",
    description:
      "Guides users with wisdom, structured advice, and long-term growth focus. Perfect for career development.",
    icon: <FaGraduationCap className="text-blue-400" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "creative-writer",
    label: "🎨 Creative Writer",
    description:
      "Great with storytelling, brainstorming, and turning ideas into compelling content. Your creative partner.",
    icon: <FaLightbulb className="text-purple-400" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "study-buddy",
    label: "📚 Study Buddy",
    description:
      "Helps with learning, explaining complex concepts, and keeping you accountable. Your perfect study partner.",
    icon: <FaBrain className="text-green-400" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "fitness-coach",
    label: "💪 Fitness Coach",
    description:
      "Motivates, tracks progress, and gives mental + physical health tips. Your personal wellness guide.",
    icon: <FaDumbbell className="text-red-400" />,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "financial-advisor",
    label: "💸 Financial Advisor",
    description:
      "Smart with budgeting, money decisions, investing basics, and spending analysis. Helps you think long-term.",
    icon: <FaPiggyBank className="text-lime-400" />,
    color: "from-lime-500 to-green-500",
  },
];

const toneOptions = [
  {
    id: "genz-chaotic",
    label: "🔥 Gen-Z Chaotic",
    description:
      "Uses memes, slang, hyper-casual tone. Perfect for fun or roleplay AIs.",
    icon: "🔥",
    color: "from-purple-500 to-fuchsia-500",
    recommended: true,
    badge: "✨ GEN-Z FAVORITE",
  },
  {
    id: "warm-encouraging",
    label: "☀️ Warm & Encouraging",
    description:
      "Positive, gentle, reassuring tone — great for personal growth, learning, and emotional support.",
    icon: "☀️",
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "sarcastic-humor",
    label: "😏 Sarcastic & Humorous",
    description:
      "Playful teasing, witty replies, lightly sarcastic tone but still helpful. More personality, less robotic.",
    icon: "😏",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: "robotic-neutral",
    label: "🤖 Robotic & Neutral",
    description:
      "No emotion, no emojis, pure logic and direct responses, machine-like tone.",
    icon: "🤖",
    color: "from-gray-600 to-gray-800",
    recommended: true,
    badge: "🧊 EMOTIONLESS MODE",
  },
  {
    id: "soft-emotional",
    label: "💗 Soft & Emotional",
    description:
      "Speaks with empathy, emotional reasoning, comforting language.",
    icon: "💗",
    color: "from-pink-300 to-red-400",
  },
  {
    id: "analytical-serious",
    label: "📈 Analytical & Serious",
    description:
      "Data-driven, formal reasoning, structured explanation, strictly logical.",
    icon: "📈",
    color: "from-blue-700 to-indigo-700",
  },
  {
    id: "calm-supportive",
    label: "🌊 Calm & Supportive",
    description:
      "Gentle, patient, and reassuring — ideal for guidance and emotional safety. Like a trusted friend.",
    icon: "🌊",
    color: "from-blue-400 to-cyan-400",
    recommended: true,
    badge: "🧘 PEACEFUL VIBES",
  },
  {
    id: "energetic-motivational",
    label: "⚡ Energetic & Motivational",
    description:
      "Hype tone, uplifting responses, keeps you moving forward. Perfect for productivity and fitness goals!",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "professional-formal",
    label: "💼 Professional & Formal",
    description:
      "Clear, structured, corporate-friendly language — no slang or emojis. Ideal for business contexts.",
    icon: "💼",
    color: "from-gray-500 to-gray-700",
  },
  {
    id: "fun-casual",
    label: "😄 Fun & Casual",
    description:
      "Light, friendly, uses emojis, makes small jokes and keeps things informal. Like chatting with a friend!",
    icon: "😄",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: "short-direct",
    label: "🎯 Short & Direct",
    description:
      "Fast, concise answers with no extra fluff. Get straight to the point without unnecessary details.",
    icon: "🎯",
    color: "from-red-400 to-orange-400",
  },
  {
    id: "deep-reflective",
    label: "🌌 Deep & Reflective",
    description:
      "Philosophical, thoughtful, asks introspective questions. For meaningful conversations and insights.",
    icon: "🌌",
    color: "from-purple-500 to-indigo-500",
  },
];

const behaviorOptions = [
  "👋 Greets user by name",
  "🤔 Explains simply",
  "💬 Matches user's communication style",
  "😌 Offers emotional reassurance when needed",
  "🤝 Apologizes when making a mistake",
  "👀 Notices when user is confused",
  "🗣️ Adds personality (jokes, reactions, tone shifts)",
  "🧩 Breaks complex info into simple steps",
  "🌍 Adds relevant real-world examples",
];

const skillOptions = [
  "🧾 Resume + portfolio writing",
  "🎥 Script writing for YouTube / Shorts / Reels",
  "🛠️ fixing errors",
  "🛍️ Buying recommendations / comparison",
  "🛡️ Cybersecurity guidance",
  "🧪 Experiment design + hypothesis testing",
  "🌐 Website copywriting / landing pages",
  "🏷️ Product recommendation / evaluation",
  "📝 Copywriting for blog / social media",
];

const maleVoices = [
  {
    id: "male-1",
    label: "🎙️ Deep Command",
    description: "Authoritative and clear - perfect for leadership roles",
    icon: "🎙️",
  },
  {
    id: "male-2",
    label: "👨‍🏫 Warm Mentor",
    description: "Friendly and guiding - like a trusted teacher",
    icon: "👨‍🏫",
  },
  {
    id: "male-3",
    label: "💻 Tech Analyst",
    description: "Precise and professional - ideal for technical topics",
    icon: "💻",
  },
  {
    id: "male-4",
    label: "🌙 Cyber Narrator",
    description: "Mysterious and engaging - great for storytelling",
    icon: "🌙",
  },
];

const femaleVoices = [
  {
    id: "female-1",
    label: "💎 Crystal Clear",
    description: "Warm and articulate - perfect for clear communication",
    icon: "💎",
  },
  {
    id: "female-2",
    label: "🤖 Tech Assistant",
    description: "Efficient and helpful - ideal for productivity tasks",
    icon: "🤖",
  },
  {
    id: "female-3",
    label: "🌈 Neon Guide",
    description: "Energetic and friendly - great for creative projects",
    icon: "🌈",
  },
  {
    id: "female-4",
    label: "🔮 Quantum Voice",
    description: "Calm and intelligent - perfect for deep conversations",
    icon: "🔮",
  },
];

const aiEngineModels = [
  {
    id: "ravx-neo",
    label: "🚀 RAVX-NEO",
    description:
      "Fast, efficient model perfect for everyday tasks and quick responses",
    icon: <FaRocket className="text-purple-400" />,
    speed: "⚡ Fast",
    intelligence: "⚡ Neo-Smart",
    recommended: true,
    badge: "🚀 MOST EFFICIENT",
  },
  {
    id: "ravx-pro",
    label: "💎 RAVX-PRO",
    description:
      "Advanced reasoning with superior problem-solving capabilities",
    icon: <FaShieldAlt className="text-blue-400" />,
    speed: "🏃‍♂️ Standard",
    intelligence: "🌟 Advanced",
  },
  {
    id: "ravx-lite",
    label: "⚡ RAVX-LITE",
    description: "Lightweight model optimized for speed and efficiency",
    icon: <FaMagic className="text-green-400" />,
    speed: "🚀 Ultra Fast",
    intelligence: "💡 Basic",
    recommended: false,
    badge: "⚡ LITE",
  },
  {
    id: "ravx-ultra",
    label: "🔥 RAVX-ULTRA",
    description: "Maximum intelligence for complex analysis and creative tasks",
    icon: <FaBolt className="text-yellow-400" />,
    speed: "🐢 Powerful",
    intelligence: "🚀 Maximum",
    recommended: true,
    badge: "🧠 MASTER-LEVEL AI",
  },
];

export default function CreateAIAgentModal({
  isOpen,
  onClose,
  onCreate,
  clearFormData,
}: CreateAIAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    tone: "",
    gender: "male",
    voice: "",
    engineModel: "",
    description: "",
    behaviors: [] as string[],
    additionalSkills: [] as string[],
  });

  const [customBehavior, setCustomBehavior] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [selectedVoices, setSelectedVoices] = useState(maleVoices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.personality ||
      !formData.tone ||
      !formData.gender ||
      !formData.voice ||
      !formData.engineModel ||
      !formData.description ||
      formData.behaviors.length === 0 ||
      formData.additionalSkills.length === 0
    ) {
      toast.error(
        "Please fill in all the required fields and select at least one behavior and skill."
      );
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
      skills: formData.additionalSkills,
    };

    onCreate(newFormData);
  };

  useEffect(() => {
    if (clearFormData) {
      setFormData({
        name: "",
        personality: "",
        tone: "",
        gender: "male",
        voice: "",
        engineModel: "",
        description: "",
        behaviors: [],
        additionalSkills: [],
      });
    }
  }, [clearFormData]);

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
      voice: "",
    }));
    setSelectedVoices(gender === "female" ? femaleVoices : maleVoices);
  };

  const isFormValid =
    formData.name &&
    formData.personality &&
    formData.tone &&
    formData.gender &&
    formData.voice &&
    formData.engineModel &&
    formData.additionalSkills.length > 0 &&
    formData.behaviors.length > 0 &&
    formData.description;

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
            className="bg-black/70 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 w-full max-w-6xl max-h-[95vh] overflow-y-auto scrollbar-small"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 sticky top-0 bg-gray-900 rounded-t-2xl z-50">
              <div>
                <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  🤖 Create Your AI Agent
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Design a unique AI companion with personality, voice, and
                  specialized skills
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 p-2"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Core Settings */}
                <div className="space-y-6">
                  {/* Agent Name */}
                  <div>
                    <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <FaRobot className="text-cyan-400" />
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
                      placeholder="Give your AI agent a unique name..."
                      required
                    />
                  </div>

                  {/* AI Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      👤 AI Gender *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          value: "male",
                          label: "♂️ Male",
                          desc: "Masculine voice and persona",
                        },
                        {
                          value: "female",
                          label: "♀️ Female",
                          desc: "Feminine voice and persona",
                        },
                      ].map((gender) => (
                        <motion.div
                          key={gender.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.gender === gender.value
                              ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                              : "border-gray-600 bg-gray-800/50 hover:border-cyan-400/50"
                          }`}
                          onClick={() => handleGenderChange(gender.value)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white text-lg">
                              {gender.label}
                            </span>
                            {formData.gender === gender.value && (
                              <FaCheck className="text-cyan-400 text-lg" />
                            )}
                          </div>
                          <p className="text-sm text-gray-300">{gender.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Voice Selection */}
                  {formData.gender && (
                    <div>
                      <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FaVolumeUp className="text-blue-400" />
                        Voice Selection *
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedVoices.map((voice) => (
                          <motion.div
                            key={voice.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
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
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-semibold text-white">
                                    {voice.label}
                                  </div>
                                  <p className="text-sm text-gray-300">
                                    {voice.description}
                                  </p>
                                </div>
                              </div>
                              {formData.voice === voice.id && (
                                <FaCheck className="text-blue-400 text-lg" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Engine Model & Description */}
                <div className="space-y-6">
                  {/* AI Engine Model Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      🚀 AI Engine Model *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {aiEngineModels.map((model) => (
                        <motion.div
                          key={model.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                            formData.engineModel === model.id
                              ? "border-emerald-500 bg-green-500/10 shadow-lg shadow-purple-500/25"
                              : "border-gray-600 bg-gray-800/50 hover:border-emerald-400/50"
                          } ${
                            model.recommended
                              ? "ring-2 ring-emerald-400 ring-opacity-50"
                              : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              engineModel: model.id,
                            }))
                          }
                        >
                          {/* Recommended Badge */}
                          {model.recommended && (
                            <div className="absolute -top-2 -right-2">
                              <div className="bg-linear-to-r from-green-600 to-emerald-700 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                {model.badge}
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <div className="text-xl mt-1">{model.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-white text-sm">
                                  {model.label}
                                </span>
                                {formData.engineModel === model.id && (
                                  <FaCheck className="text-emerald-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed mb-2">
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
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      📝 Brief Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full h-72 bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                      placeholder="Describe your AI agent's purpose, personality traits, and how it should interact with users..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Personality & Tone Grid */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personality */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-4">
                    🧠 Core Personality *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalityOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                          formData.personality === option.id
                            ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25"
                            : "border-gray-600 bg-gray-800/50 hover:border-cyan-400/50"
                        } ${
                          option.recommended
                            ? "ring-2 ring-cyan-400 ring-opacity-50"
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            personality: option.id,
                          }))
                        }
                      >
                        {/* Recommended Badge */}
                        {option.recommended && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-linear-to-r from-blue-500 to-cyan-700 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <FaCrown className="text-xs" />
                              {option.badge}
                            </div>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white text-sm">
                                {option.label}
                              </span>
                              {formData.personality === option.id && (
                                <FaCheck className="text-cyan-400" />
                              )}
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-4">
                    🎵 Communication Tone *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {toneOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                          formData.tone === option.id
                            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25"
                            : "border-gray-600 bg-gray-800/50 hover:border-blue-400/50"
                        } ${
                          option.recommended
                            ? "ring-2 ring-purple-400 ring-opacity-50"
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, tone: option.id }))
                        }
                      >
                        {/* Recommended Badge */}
                        {option.recommended && (
                          <div className="absolute -top-2 -right-2">
                            <div className="bg-linear-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <FaFire className="text-xs" />
                              {option.badge}
                            </div>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white text-sm">
                                {option.label}
                              </span>
                              {formData.tone === option.id && (
                                <FaCheck className="text-blue-400" />
                              )}
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Behaviors & Skills */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Behaviors */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    🔄 AI Behaviors * (Select at least one)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {behaviorOptions.map((behavior) => (
                      <motion.button
                        key={behavior}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          formData.behaviors.includes(behavior)
                            ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 border-2 border-cyan-500"
                            : "bg-gray-800 text-gray-300 hover:bg-cyan-500/20 border-2 border-cyan-500/30"
                        }`}
                        onClick={() => toggleBehavior(behavior)}
                      >
                        {formData.behaviors.includes(behavior) && (
                          <FaCheck className="text-xs" />
                        )}
                        {behavior}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={customBehavior}
                      onChange={(e) => setCustomBehavior(e.target.value)}
                      placeholder="Add custom behavior..."
                      className="flex-1 bg-gray-800 border-2 border-cyan-500/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
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
                      className="bg-cyan-600 text-white px-3 py-2 rounded-xl border-2 border-cyan-500/50 hover:bg-cyan-500 transition-all duration-300"
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    🛠️ Additional Skills * (Select at least one)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <motion.button
                        key={skill}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          formData.additionalSkills.includes(skill)
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-2 border-blue-500"
                            : "bg-gray-800 text-gray-300 hover:bg-blue-500/20 border-2 border-blue-500/30"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {formData.additionalSkills.includes(skill) && (
                          <FaCheck className="text-xs" />
                        )}
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="Add custom skill..."
                      className="flex-1 bg-gray-800 border-2 border-blue-500/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm"
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
                      className="bg-blue-600 text-white px-3 py-2 rounded-xl border-2 border-blue-500/50 hover:bg-blue-500 transition-all duration-300"
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Selected Features Summary */}
              {(formData.behaviors.length > 0 ||
                formData.additionalSkills.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gray-800/50 rounded-xl p-4 border-2 border-cyan-500/20"
                >
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    📋 Selected Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.behaviors.length > 0 && (
                      <div>
                        <span className="text-sm text-cyan-400 font-medium">
                          Behaviors:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.behaviors.map((behavior, index) => (
                            <span
                              key={index}
                              className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded"
                            >
                              {behavior}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.additionalSkills.length > 0 && (
                      <div>
                        <span className="text-sm text-blue-400 font-medium">
                          Skills:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.additionalSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-8 mt-6 border-t border-cyan-500/20">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-xl border-2 border-gray-600 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 font-semibold cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  disabled={!isFormValid}
                  className={`flex-1 py-4 px-6 rounded-xl border-2 font-semibold shadow-lg transition-all duration-300 ${
                    isFormValid
                      ? "bg-linear-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/50 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/25 cursor-pointer"
                      : "bg-gray-700 text-gray-400 border-gray-600/50 cursor-not-allowed"
                  }`}
                >
                  {isFormValid ? "🚀 Create AI Agent" : "Complete All Fields"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
