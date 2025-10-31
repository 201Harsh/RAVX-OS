"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiCpu,
  FiPlus,
  FiMessageSquare,
  FiZap,
  FiChevronRight,
  FiTrash2,
  FiPlay,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RAVXOS = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "agents" | "create"
  >("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // Agent Creation Form State
  const [agentForm, setAgentForm] = useState<any>({
    name: "",
    personality: "friendly",
    tone: "professional",
    behavior: "",
    knowledge: "",
    skills: [] as string[],
    memory: "medium",
    voice: "natural",
  });

  const skillOptions = [
    "Writing & Content Creation",
    "Research & Analysis",
    "Code Generation",
    "Data Analysis",
    "Creative Brainstorming",
    "Task Planning",
    "Learning Assistance",
    "Problem Solving",
    "Email Management",
    "Schedule Planning",
  ];

  // Sample agents data
  useEffect(() => {
    setAgents([
      {
        id: 1,
        name: "Nova Assistant",
        type: "Personal AI",
        status: "online",
        personality: "Friendly",
        lastActive: "2 min ago",
        avatar: "👤",
      },
      {
        id: 2,
        name: "Sigma Analyst",
        type: "Data Expert",
        status: "training",
        personality: "Analytical",
        lastActive: "1 hour ago",
        avatar: "📊",
      },
      {
        id: 3,
        name: "Lyra Creative",
        type: "Content Creator",
        status: "online",
        personality: "Creative",
        lastActive: "5 min ago",
        avatar: "🎨",
      },
    ]);
  }, []);

  const handleSkillToggle = (skill: string) => {
    setAgentForm((prev: any) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s: string) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleCreateAgent = () => {
    if (!agentForm.name.trim()) {
      toast.error("Please enter an agent name");
      return;
    }

    const newAgent = {
      id: agents.length + 1,
      name: agentForm.name,
      type: "Custom AI",
      status: "online",
      personality: agentForm.personality,
      lastActive: "Just now",
      avatar: "🤖",
      ...agentForm,
    };

    setAgents((prev) => [newAgent, ...prev]);
    setAgentForm({
      name: "",
      personality: "friendly",
      tone: "professional",
      behavior: "",
      knowledge: "",
      skills: [],
      memory: "medium",
      voice: "natural",
    });
    setActiveSection("agents");
    toast.success(`AI Agent "${agentForm.name}" created successfully!`);
  };

  const handleDeleteAgent = (agentId: number) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    toast.success("AI Agent deleted successfully!");
  };

  const handleLaunchAgent = (agentId: number) => {
    const agent = agents.find((a) => a.id === agentId);
    toast.info(`Launching ${agent?.name}...`);
    // In real app, this would navigate to chat interface
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { id: "agents", label: "AI Agents", icon: <FiCpu /> },
    { id: "create", label: "Create Agent", icon: <FiPlus /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection agents={agents} />;
      case "agents":
        return (
          <AgentsSection
            agents={agents}
            onDelete={handleDeleteAgent}
            onLaunch={handleLaunchAgent}
          />
        );
      case "create":
        return (
          <CreateAgentSection
            form={agentForm}
            onFormChange={setAgentForm}
            onSkillToggle={handleSkillToggle}
            skillOptions={skillOptions}
            onCreate={handleCreateAgent}
          />
        );
      default:
        return <DashboardSection agents={agents} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
        <div className="flex flex-col w-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-purple-500">
              RAVX OS
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              AI Operating System
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* User Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="flex justify-center items-center p-3 rounded-full gap-2 cursor-pointer group">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 shadow-2xl shadow-red-500/30 dark:shadow-red-600/20 relative overflow-hidden">
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-linear-to-r from-red-400/20 to-pink-500/20 blur-sm group-hover:from-red-400/30 group-hover:to-pink-500/30 transition-all duration-300"></div>

                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-xl group-hover:animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <FiLogOut className="text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-white drop-shadow-lg tracking-wide">
                    Logout
                  </span>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 dark:text-gray-400"
        >
          <FiMenu className="text-xl" />
        </button>

        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-purple-500">
          RAVX OS
        </h1>

        <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">{renderSection()}</div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="flex justify-around items-center p-3">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSection(item.id as any)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? "text-cyan-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-purple-500">
                    RAVX OS
                  </h1>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 dark:text-gray-400"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveSection(item.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === item.id
                          ? "bg-cyan-500 text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dashboard Section Component
const DashboardSection = ({ agents }: { agents: any[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome to your AI operating system
      </p>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500 rounded-xl text-white">
            <FiCpu className="text-xl" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {agents.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Active Agents
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500 rounded-xl text-white">
            <FiZap className="text-xl" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {agents.filter((a) => a.status === "online").length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Online Now</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500 rounded-xl text-white">
            <FiMessageSquare className="text-xl" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              12
            </div>
            <div className="text-gray-600 dark:text-gray-400">Tasks Today</div>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Agents */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Recent AI Agents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.slice(0, 3).map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-200 dark:border-gray-600 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">{agent.avatar}</div>
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  {agent.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {agent.type}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  agent.status === "online"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {agent.status}
              </span>
              <span className="text-xs text-gray-500">{agent.lastActive}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Agents Section Component
const AgentsSection = ({ agents, onDelete, onLaunch }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          AI Agents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your AI companions
        </p>
      </div>
    </div>

    {agents.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent: any) => (
          <motion.div
            key={agent.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">{agent.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-800 dark:text-white">
                  {agent.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {agent.type}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Personality
                </span>
                <span className="text-sm text-gray-800 dark:text-white">
                  {agent.personality}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    agent.status === "online"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Last Active
                </span>
                <span className="text-sm text-gray-800 dark:text-white">
                  {agent.lastActive}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLaunch(agent.id)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FiPlay />
                <span>Launch</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(agent.id)}
                className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
              >
                <FiTrash2 />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCpu className="text-3xl text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          No AI Agents
        </h3>
        <p className="text-gray-500">
          Create your first AI agent to get started
        </p>
      </div>
    )}
  </motion.div>
);

// Create Agent Section Component
const CreateAgentSection = ({
  form,
  onFormChange,
  onSkillToggle,
  skillOptions,
  onCreate,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto space-y-6"
  >
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Create AI Agent
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Build your custom AI companion with advanced settings
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agent Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => onFormChange({ ...form, name: e.target.value })}
              placeholder="Enter a unique name for your AI agent..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personality Type
            </label>
            <select
              value={form.personality}
              onChange={(e) =>
                onFormChange({ ...form, personality: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="friendly">Friendly & Helpful</option>
              <option value="professional">Professional & Formal</option>
              <option value="creative">Creative & Expressive</option>
              <option value="analytical">Analytical & Precise</option>
              <option value="empathetic">Empathetic & Supportive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Communication Tone
            </label>
            <select
              value={form.tone}
              onChange={(e) => onFormChange({ ...form, tone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="calm">Calm & Soothing</option>
              <option value="witty">Witty & Humorous</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Memory Capacity
            </label>
            <select
              value={form.memory}
              onChange={(e) =>
                onFormChange({ ...form, memory: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="small">Small (Basic memory)</option>
              <option value="medium">Medium (Recommended)</option>
              <option value="large">Large (Extended memory)</option>
              <option value="unlimited">Unlimited (Maximum capacity)</option>
            </select>
          </div>
        </div>

        {/* Right Column - Advanced Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Behavior & Instructions
            </label>
            <textarea
              value={form.behavior}
              onChange={(e) =>
                onFormChange({ ...form, behavior: e.target.value })
              }
              placeholder="Describe how your AI should behave, any specific rules, or special instructions..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Knowledge
            </label>
            <textarea
              value={form.knowledge}
              onChange={(e) =>
                onFormChange({ ...form, knowledge: e.target.value })
              }
              placeholder="Add specific knowledge, facts, or context you want your AI to know..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Skills & Capabilities
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {skillOptions.map((skill: string) => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onSkillToggle(skill)}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    form.skills.includes(skill)
                      ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                    {form.skills.includes(skill) && (
                      <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                        <FiChevronRight className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreate}
          disabled={!form.name.trim()}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            !form.name.trim()
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 text-white"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiZap />
            <span>Create AI Agent</span>
          </div>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default RAVXOS;
