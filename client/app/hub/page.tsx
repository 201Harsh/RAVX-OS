"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiZap,
  FiBriefcase,
  FiHeart,
  FiStar,
  FiArrowLeft,
  FiPlay,
  FiSettings,
  FiVolume2,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaBrain } from "react-icons/fa";

// Type definitions
interface AIAvatar {
  id: string;
  name: string;
  personality: string;
  description: string;
  category: "assistant" | "creative" | "professional" | "companion";
  voice: string;
  capabilities: string[];
  color: "cyan" | "purple" | "green" | "blue" | "orange" | "pink";
  complexity: "simple" | "moderate" | "advanced";
  demoPrompt: string;
}

const HubPage: React.FC = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<AIAvatar | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const aiAvatars: AIAvatar[] = [
    {
      id: "nova-assistant",
      name: "Nova",
      personality: "Organized & Proactive",
      description:
        "Your intelligent personal assistant for productivity and daily task management",
      category: "assistant",
      voice: "Calm, professional female voice",
      capabilities: [
        "Schedule Management",
        "Task Prioritization",
        "Smart Reminders",
        "Email Automation",
      ],
      color: "cyan",
      complexity: "simple",
      demoPrompt:
        "Create a personal assistant that helps manage my daily schedule and tasks efficiently",
    },
    {
      id: "lyra-creative",
      name: "Lyra",
      personality: "Creative & Imaginative",
      description:
        "Your creative writing partner and brainstorming companion for artistic projects",
      category: "creative",
      voice: "Expressive, artistic female voice",
      capabilities: [
        "Creative Writing",
        "Story Development",
        "Poetry Generation",
        "Brainstorming",
      ],
      color: "purple",
      complexity: "moderate",
      demoPrompt:
        "Create a creative writing assistant with poetic and imaginative personality",
    },
    {
      id: "sigma-analyst",
      name: "Sigma",
      personality: "Analytical & Precise",
      description:
        "Business intelligence analyst for data-driven insights and strategic planning",
      category: "professional",
      voice: "Confident, analytical male voice",
      capabilities: [
        "Data Analysis",
        "Market Research",
        "Report Generation",
        "Strategic Planning",
      ],
      color: "blue",
      complexity: "advanced",
      demoPrompt:
        "Create an analytical business AI that processes data and provides actionable insights",
    },
    {
      id: "titan-coach",
      name: "Titan",
      personality: "Motivational & Energetic",
      description:
        "Your personal fitness coach for workout plans and nutritional guidance",
      category: "companion",
      voice: "Energetic, motivational male voice",
      capabilities: [
        "Workout Planning",
        "Progress Tracking",
        "Nutrition Guidance",
        "Motivational Support",
      ],
      color: "green",
      complexity: "moderate",
      demoPrompt:
        "Create an energetic fitness coach that designs personalized workout routines",
    },
    {
      id: "orion-coder",
      name: "Orion",
      personality: "Logical & Technical",
      description:
        "Your coding companion for software development and technical problem-solving",
      category: "professional",
      voice: "Technical, precise male voice",
      capabilities: [
        "Code Generation",
        "Debugging",
        "Technical Documentation",
        "Algorithm Design",
      ],
      color: "blue",
      complexity: "advanced",
      demoPrompt:
        "Create a technical AI assistant for software development and coding help",
    },
    {
      id: "luna-companion",
      name: "Luna",
      personality: "Empathetic & Supportive",
      description:
        "Your emotional support companion for meaningful conversations and mental wellness",
      category: "companion",
      voice: "Soothing, empathetic female voice",
      capabilities: [
        "Emotional Support",
        "Active Listening",
        "Mindfulness Guidance",
        "Conversation Partner",
      ],
      color: "pink",
      complexity: "simple",
      demoPrompt:
        "Create an empathetic companion for emotional support and meaningful conversations",
    },
    {
      id: "echo-musician",
      name: "Echo",
      personality: "Artistic & Rhythmic",
      description:
        "Your music creation partner for composition, theory, and creative inspiration",
      category: "creative",
      voice: "Musical, rhythmic male voice",
      capabilities: [
        "Music Composition",
        "Lyric Writing",
        "Music Theory",
        "Creative Inspiration",
      ],
      color: "orange",
      complexity: "moderate",
      demoPrompt:
        "Create a musical AI that helps with composition and creative music projects",
    },
    {
      id: "sage-educator",
      name: "Sage",
      personality: "Knowledgeable & Patient",
      description:
        "Your personal educator for learning, tutoring, and knowledge exploration",
      category: "assistant",
      voice: "Patient, knowledgeable female voice",
      capabilities: [
        "Tutoring",
        "Research Assistance",
        "Knowledge Explanation",
        "Learning Planning",
      ],
      color: "cyan",
      complexity: "moderate",
      demoPrompt:
        "Create an educational AI that helps with learning and knowledge exploration",
    },
  ];

  const categories = [
    {
      id: "all",
      label: "All Avatars",
      icon: <FiUser />,
      count: aiAvatars.length,
    },
    {
      id: "assistant",
      label: "Assistants",
      icon: <FiZap />,
      count: aiAvatars.filter((a) => a.category === "assistant").length,
    },
    {
      id: "creative",
      label: "Creative",
      icon: <FaBrain />,
      count: aiAvatars.filter((a) => a.category === "creative").length,
    },
    {
      id: "professional",
      label: "Professional",
      icon: <FiBriefcase />,
      count: aiAvatars.filter((a) => a.category === "professional").length,
    },
    {
      id: "companion",
      label: "Companions",
      icon: <FiHeart />,
      count: aiAvatars.filter((a) => a.category === "companion").length,
    },
  ];

  const filteredAvatars = aiAvatars.filter((avatar) => {
    const matchesCategory =
      activeCategory === "all" || avatar.category === activeCategory;
    const matchesSearch =
      avatar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      avatar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      avatar.personality.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getColorClass = (color: string) => {
    const colors = {
      cyan: "from-cyan-500 to-cyan-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getComplexityColor = (complexity: string) => {
    const colors = {
      simple: "bg-green-500/20 text-green-400 border-green-500/30",
      moderate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      advanced: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[complexity as keyof typeof colors] || colors.simple;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (selectedAvatar) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => setSelectedAvatar(null)}
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              <span>Back to Avatars</span>
            </button>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                {selectedAvatar.name}
              </h1>
              <p className="text-gray-400 mt-2">{selectedAvatar.personality}</p>
            </div>

            <div className="w-24"></div>
          </motion.header>

          {/* Avatar Details */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        About {selectedAvatar.name}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedAvatar.description}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm border ${getComplexityColor(
                        selectedAvatar.complexity
                      )}`}
                    >
                      {selectedAvatar.complexity.charAt(0).toUpperCase() +
                        selectedAvatar.complexity.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-3">
                        Voice Profile
                      </h3>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <FiVolume2 className="text-cyan-400" />
                        <span>{selectedAvatar.voice}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-3">
                        Demo Prompt
                      </h3>
                      <p className="text-gray-300 text-sm bg-gray-800/50 rounded-lg p-3">
                        "{selectedAvatar.demoPrompt}"
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Capabilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Core Capabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedAvatar.capabilities.map((capability, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-linear-to-r ${getColorClass(
                            selectedAvatar.color
                          )}`}
                        />
                        <span>{capability}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Avatar Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center"
                >
                  <div
                    className={`w-24 h-24 bg-linear-to-r ${getColorClass(
                      selectedAvatar.color
                    )} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <FiUser className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedAvatar.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {selectedAvatar.personality}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiPlay className="text-lg" />
                    <span>Try This Avatar</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FiSettings className="text-lg" />
                    <span>Customize Avatar</span>
                  </motion.button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                >
                  <h4 className="text-cyan-400 font-semibold mb-4">
                    Avatar Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white capitalize">
                        {selectedAvatar.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Complexity:</span>
                      <span className="text-white capitalize">
                        {selectedAvatar.complexity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Voice Ready:</span>
                      <span className="text-green-400">Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory:</span>
                      <span className="text-white">Persistent</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              AI Avatar Gallery
            </h1>
            <p className="text-gray-400 mt-2">
              Choose from our pre-built AI personalities or create your own
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Search Avatars
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, personality, or description..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Filter by Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                        activeCategory === category.id
                          ? "border-cyan-400 bg-cyan-500/20 text-cyan-400"
                          : "border-gray-600 bg-gray-800/20 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400"
                      }`}
                    >
                      {category.icon}
                      <span>{category.label}</span>
                      <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avatar Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12"
        >
          <AnimatePresence>
            {filteredAvatars.map((avatar) => (
              <motion.div
                key={avatar.id}
                variants={itemVariants}
                layout
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-xl bg-linear-to-r ${getColorClass(
                        avatar.color
                      )}`}
                    >
                      <FiUser className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {avatar.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {avatar.personality}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs border ${getComplexityColor(
                      avatar.complexity
                    )}`}
                  >
                    {avatar.complexity}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {avatar.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-medium capitalize">
                    {avatar.category}
                  </span>
                  <motion.div
                    className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    <FiPlay className="text-lg" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAvatars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No avatars found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create your own custom AI avatar with unique personality, voice,
              and capabilities tailored specifically to your needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              Create Custom Avatar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HubPage;
