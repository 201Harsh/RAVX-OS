"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiCode,
  FiZap,
  FiMessageSquare,
  FiGitBranch,
  FiShield,
  FiCpu,
  FiArrowLeft,
  FiChevronRight,
  FiSearch,
  FiHome,
  FiBookOpen,
  FiSettings,
  FiTerminal,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface DocumentationSection {
  id: string;
  title: string;
  icon: React.ReactElement;
  description: string;
  content: React.ReactElement;
  category: "getting-started" | "core-concepts" | "api-reference" | "advanced";
}

const DocumentationPage: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const documentationSections: DocumentationSection[] = [
    {
      id: "introduction",
      title: "Introduction to RAVX OS",
      icon: <FiHome className="text-xl" />,
      description: "Overview of RAVX OS and its core philosophy",
      category: "getting-started",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              What is RAVX OS?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              RAVX OS is the world's first web-based Personal AI Operating
              System that enables anyone - regardless of technical background -
              to create, customize, and interact with sentient AI avatars. It's
              not just another chatbot platform; it's a complete ecosystem for
              building intelligent digital beings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-cyan-400/20">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                For Everyone
              </h3>
              <p className="text-gray-300">
                Zero coding required. Create powerful AI agents through natural
                language descriptions and intuitive interfaces.
              </p>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-400/20">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                Fully Sentient
              </h3>
              <p className="text-gray-300">
                AI avatars with persistent memory, emotional intelligence, and
                continuous learning capabilities.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Key Differentiators
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>
                  <strong>Web-Based:</strong> No installation required,
                  accessible from any device
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>
                  <strong>Real Memory:</strong> Persistent personality and
                  conversation history
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>
                  <strong>Voice Integration:</strong> Natural, emotional voice
                  synthesis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>
                  <strong>Task Execution:</strong> Real-world actions through
                  MCP integration
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "quick-start",
      title: "Quick Start Guide",
      icon: <FiZap className="text-xl" />,
      description: "Get up and running in 5 minutes",
      category: "getting-started",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Create Your First AI Avatar
            </h2>
            <p className="text-gray-300 mb-6">
              Follow these simple steps to create your first intelligent AI
              companion.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Sign Up & Login",
                description:
                  "Create your RAVX OS account and access the dashboard",
                code: null,
              },
              {
                step: 2,
                title: "Describe Your Avatar",
                description:
                  "Use natural language to describe your AI's personality and capabilities",
                code: `Create a friendly personal assistant named "Nova" who helps with productivity, 
reminder setting, and has a calm, professional demeanor.`,
              },
              {
                step: 3,
                title: "Customize Settings",
                description:
                  "Adjust voice, memory, and interaction preferences",
                code: `Voice: Calm female voice
Memory: 30-day retention
Personality: Professional, helpful`,
              },
              {
                step: 4,
                title: "Activate & Interact",
                description:
                  "Your avatar is ready! Start conversing and watch it learn",
                code: `User: "Hello Nova, can you help me plan my week?"
Nova: "I'd be happy to help you plan your week! Let's start by reviewing your current schedule..."`,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    {item.code && (
                      <div className="relative">
                        <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto">
                          {item.code}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(item.code!)}
                          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {copiedCode === item.code ? <FiCheck /> : <FiCopy />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "neural-architecture",
      title: "Neural Architecture",
      icon: <FiCpu className="text-xl" />,
      description: "Technical foundation of RAVX OS AI systems",
      category: "core-concepts",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Neural Architecture Overview
            </h2>
            <p className="text-gray-300">
              RAVX OS is built on a sophisticated neural architecture that
              enables true sentient behavior and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Transformer Core",
                description:
                  "7B parameter model for natural language understanding and generation",
                specs: [
                  "Multi-head Attention",
                  "512 Context Window",
                  "Real-time Inference",
                ],
              },
              {
                title: "Memory System",
                description:
                  "Vector-based persistent memory with semantic search",
                specs: [
                  "Long-term Retention",
                  "Contextual Recall",
                  "Memory Compression",
                ],
              },
              {
                title: "Voice Engine",
                description:
                  "Neural text-to-speech with emotional intelligence",
                specs: [
                  "Real-time Synthesis",
                  "Emotional Tone",
                  "Multi-language Support",
                ],
              },
              {
                title: "MCP Integration",
                description: "Model Context Protocol for task execution",
                specs: [
                  "API Integration",
                  "Task Decomposition",
                  "Safety Validation",
                ],
              },
            ].map((component, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 border border-cyan-400/20"
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                  {component.title}
                </h3>
                <p className="text-gray-300 mb-4">{component.description}</p>
                <ul className="space-y-2">
                  {component.specs.map((spec, specIndex) => (
                    <li
                      key={specIndex}
                      className="flex items-center space-x-2 text-gray-400 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              System Architecture Flow
            </h3>
            <div className="space-y-4">
              {[
                "User Input → Neural Processing → Memory Storage → Response Generation → Task Execution",
                "Continuous Learning Loop: Interaction → Analysis → Memory Update → Behavior Adaptation",
              ].map((flow, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <div className="w-3 h-3 bg-green-400 rounded-full shrink-0"></div>
                  <span>{flow}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: <FiCode className="text-xl" />,
      description: "Complete API documentation and integration guide",
      category: "api-reference",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              RAVX OS API Reference
            </h2>
            <p className="text-gray-300">
              Integrate RAVX OS capabilities into your applications with our
              comprehensive REST API.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                method: "POST",
                endpoint: "/api/v1/avatars/create",
                description: "Create a new AI avatar",
                parameters: [
                  {
                    name: "name",
                    type: "string",
                    required: true,
                    description: "Avatar display name",
                  },
                  {
                    name: "personality",
                    type: "string",
                    required: true,
                    description: "Personality description",
                  },
                  {
                    name: "voice_model",
                    type: "string",
                    required: false,
                    description: "Voice preference",
                  },
                ],
                example: `fetch('https://api.ravx.os/v1/avatars/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Nova",
    personality: "Helpful assistant for productivity",
    voice_model: "calm-female"
  })
})`,
              },
              {
                method: "POST",
                endpoint: "/api/v1/chat/send",
                description: "Send message to avatar",
                parameters: [
                  {
                    name: "avatar_id",
                    type: "string",
                    required: true,
                    description: "Target avatar ID",
                  },
                  {
                    name: "message",
                    type: "string",
                    required: true,
                    description: "User message content",
                  },
                  {
                    name: "context",
                    type: "object",
                    required: false,
                    description: "Conversation context",
                  },
                ],
                example: `fetch('https://api.ravx.os/v1/chat/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar_id: "avatar_123",
    message: "Hello, how are you?",
    context: { session_id: "session_456" }
  })
})`,
              },
            ].map((endpoint, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      endpoint.method === "POST"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-cyan-400 font-mono">
                    {endpoint.endpoint}
                  </code>
                </div>
                <p className="text-gray-300 mb-4">{endpoint.description}</p>

                <h4 className="text-lg font-semibold text-white mb-3">
                  Parameters
                </h4>
                <div className="space-y-2 mb-4">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div
                      key={paramIndex}
                      className="flex items-center space-x-4 text-sm"
                    >
                      <code className="text-cyan-400 w-24">{param.name}</code>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          param.required
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gray-600 text-gray-400"
                        }`}
                      >
                        {param.required ? "required" : "optional"}
                      </span>
                      <code className="text-cyan-400">{param.type}</code>
                      <span className="text-gray-400 flex-1">
                        {param.description}
                      </span>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-white mb-3">
                  Example
                </h4>
                <div className="relative">
                  <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto">
                    {endpoint.example}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(endpoint.example)}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {copiedCode === endpoint.example ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "mcp-integration",
      title: "MCP Integration",
      icon: <FiGitBranch className="text-xl" />,
      description: "Model Context Protocol for real-world task execution",
      category: "advanced",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              MCP Task Execution
            </h2>
            <p className="text-gray-300">
              Enable your AI avatars to perform real-world actions through Model
              Context Protocol integration.
            </p>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-green-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Available MCP Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  service: "Google Calendar",
                  actions: ["Read events", "Create events", "Update schedule"],
                },
                {
                  service: "Email",
                  actions: ["Send emails", "Read inbox", "Manage folders"],
                },
                {
                  service: "Smart Home",
                  actions: [
                    "Control lights",
                    "Adjust thermostat",
                    "Security systems",
                  ],
                },
                {
                  service: "File System",
                  actions: ["Read files", "Write files", "Organize documents"],
                },
              ].map((service, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                    {service.service}
                  </h4>
                  <ul className="space-y-1">
                    {service.actions.map((action, actionIndex) => (
                      <li
                        key={actionIndex}
                        className="text-gray-300 text-sm flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Security & Permissions
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                All MCP actions require explicit user permission and operate
                within strict security boundaries:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400" />
                  <span>
                    OAuth 2.0 authentication for all external services
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400" />
                  <span>Granular permission controls per avatar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400" />
                  <span>Action confirmation for sensitive operations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400" />
                  <span>End-to-end encryption for all data transmission</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: <FiSettings className="text-xl" />,
      description: "Common issues and solutions",
      category: "advanced",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Common Issues & Solutions
            </h2>
            <p className="text-gray-300">
              Quick solutions for frequently encountered problems.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                problem: "Avatar not responding",
                solution:
                  "Check your internet connection and refresh the page. If the issue persists, try recreating the avatar.",
                cause: "Network issues or temporary service disruption",
              },
              {
                problem: "Voice synthesis not working",
                solution:
                  "Ensure your browser allows audio permissions. Check if you're using a supported browser (Chrome, Firefox, Safari).",
                cause: "Browser permissions or unsupported browser",
              },
              {
                problem: "Memory not persisting",
                solution:
                  "Verify you're logged into the same account. Check avatar memory settings in the configuration panel.",
                cause: "Account session or configuration issues",
              },
              {
                problem: "MCP tasks failing",
                solution:
                  "Review service permissions and OAuth tokens. Check if the target service is available.",
                cause: "Permission issues or service unavailability",
              },
            ].map((issue, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl p-6 border border-yellow-400/20"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                  {issue.problem}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Solution:</h4>
                    <p className="text-gray-300">{issue.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Likely Cause:
                    </h4>
                    <p className="text-gray-300">{issue.cause}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-cyan-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">Getting Help</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                If you're still experiencing issues, here are additional
                resources:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-center space-x-2">
                  <FiBookOpen className="text-cyan-400" />
                  <span>Check our Knowledge Base for detailed guides</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiMessageSquare className="text-cyan-400" />
                  <span>Join our community Discord for real-time support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiTerminal className="text-cyan-400" />
                  <span>Contact support with detailed error logs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const categories = [
    { id: "getting-started", name: "Getting Started", icon: <FiZap /> },
    { id: "core-concepts", name: "Core Concepts", icon: <FiCpu /> },
    { id: "api-reference", name: "API Reference", icon: <FiCode /> },
    { id: "advanced", name: "Advanced", icon: <FiSettings /> },
  ];

  const filteredSections = documentationSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSection = documentationSections.find(
    (section) => section.id === activeSection
  );

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

      <div className="relative z-10 container mx-auto px-4 py-8 mt-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-radial from-cyan-700 via-cyan-200 to-cyan-700">
              Documentation
            </h1>
            <p className="text-gray-400 mt-2">
              Complete guide to RAVX OS features and capabilities
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-8">
              {/* Search */}
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Categories */}
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id}>
                    <h3 className="flex items-center space-x-2 text-cyan-400 font-semibold mb-3">
                      {category.icon}
                      <span>{category.name}</span>
                    </h3>
                    <div className="space-y-2">
                      {documentationSections
                        .filter((section) => section.category === category.id)
                        .map((section) => (
                          <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                              activeSection === section.id
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                            }`}
                          >
                            {section.icon}
                            <div className="flex-1">
                              <div className="font-medium">{section.title}</div>
                              <div className="text-sm opacity-75">
                                {section.description}
                              </div>
                            </div>
                            <FiChevronRight
                              className={`transition-transform ${
                                activeSection === section.id ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentSection?.content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => {
                  const currentIndex = documentationSections.findIndex(
                    (s) => s.id === activeSection
                  );
                  const prevSection = documentationSections[currentIndex - 1];
                  if (prevSection) setActiveSection(prevSection.id);
                }}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  documentationSections.findIndex(
                    (s) => s.id === activeSection
                  ) === 0
                }
              >
                <FiChevronRight className="rotate-180" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => {
                  const currentIndex = documentationSections.findIndex(
                    (s) => s.id === activeSection
                  );
                  const nextSection = documentationSections[currentIndex + 1];
                  if (nextSection) setActiveSection(nextSection.id);
                }}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  documentationSections.findIndex(
                    (s) => s.id === activeSection
                  ) ===
                  documentationSections.length - 1
                }
              >
                <span>Next</span>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
