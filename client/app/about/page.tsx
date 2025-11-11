"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiZap,
  FiHeart,
  FiTarget,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiBookOpen,
  FiInstagram,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaRocket } from "react-icons/fa";
import Image from "next/image";
import LandingHeader from "../components/Welcome Page/LandingHeader";
import Link from "next/link";

// Type definitions
interface TechStack {
  category: string;
  items: string[];
  icon: React.ReactElement;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

const AboutRAVXOS: React.FC = () => {
  const navigate = useRouter();

  const techStack: TechStack[] = [
    {
      category: "Frontend & Mobile",
      items: [
        "React" + " + Tailwind CSS",
        "Next.js" + " + Tailwind CSS",
        "React Native" + " + Nativewind",
        "TypeScript",
        "Framer Motion",
        "Three.js",
        "GSAP Animations",
      ],
      icon: <FiCode className="text-xl" />,
    },
    {
      category: "Backend & AI",
      items: [
        "Node.js",
        "Python",
        "TensorFlow",
        "PyTorch",
        "FastAPI",
        "OpenAI",
        "Google AI Studio",
      ],
      icon: <FiCpu className="text-xl" />,
    },
    {
      category: "Full Stack",
      items: ["MERN Stack", "PostgreSQL", "MongoDB", "Redis", "Docker"],
      icon: <FiZap className="text-xl" />,
    },
  ];

  const timeline: TimelineEvent[] = [
    {
      year: "2025",
      title: "The Spark of Inspiration",
      description:
        "Harsh began exploring AI personalization and noticed the gap between advanced AI capabilities and accessibility for non-technical users.",
      icon: <FiBookOpen className="text-lg" />,
    },
    {
      year: "2025 Q1",
      title: "Concept Development",
      description:
        "The vision for RAVX OS took shape - a web-based OS where anyone could create sentient AI avatars without writing code.",
      icon: <FiTarget className="text-lg" />,
    },
    {
      year: "2025 Q2",
      title: "Core Development",
      description:
        "Built the foundational architecture integrating neural networks, voice synthesis, and MCP for real-world task execution.",
      icon: <FiCode className="text-lg" />,
    },
    {
      year: "2025 Q3",
      title: "RAVX OS Launch",
      description:
        "Launched the first version, enabling users to create their own AI beings with memory, voice, and autonomous capabilities.",
      icon: <FaRocket className="text-lg" />,
    },
  ];

  const visionPoints = [
    "Every person owns their personal AI intelligence unit",
    "AI adapts to humans — not humans adapting to AI",
    "Automation, creation, and intelligence become as easy as speaking a thought",
    "Democratizing AI creation for billions, not just millions of developers",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Record<string, any> = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <LandingHeader itemVariants={itemVariants} />
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mt-32 mb-12"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              About RAVX OS
            </h1>
            <p className="text-gray-400 mt-2">
              The Story Behind the World&apos;s First Personal AI Operating System
            </p>
          </div>
          <div className="w-24"></div>
        </motion.header>

        {/* Creator Section */}
        <motion.section
          variants={containerVariants}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-1 flex justify-center"
                >
                  <div className="relative">
                    <div className="w-52 h-52 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src="/img/dev2.jpg"
                        alt="Harsh Pandey"
                        className="h-full w-full object-cover rounded-full"
                        width={100}
                        height={100}
                        layout="responsive"
                      />
                    </div>
                    <motion.div
                      className="absolute -inset-4 border-2 border-cyan-400 rounded-full"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                      Harsh Pandey
                    </h2>
                    <p className="text-xl text-gray-300 mb-4">
                      Full Stack Developer & AI Enthusiast
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      The sole developer and visionary behind RAVX OS. A
                      passionate technologist with expertise in MERN stack,
                      React Native, Python, and machine learning. Believes in
                      making advanced technology accessible to everyone,
                      regardless of their technical background.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    {[
                      {
                        icon: FiGithub,
                        href: "https://github.com/201Harsh",
                        label: "GitHub",
                      },
                      {
                        icon: FiInstagram,
                        href: "https://www.instagram.com/harsh.devx",
                        label: "Instagram",
                      },
                      {
                        icon: FiLinkedin,
                        href: "https://www.linkedin.com/in/201harsh/",
                        label: "LinkedIn",
                      },
                      {
                        icon: FiMail,
                        href: "mailto:gamerpandeyharsh@gmail.com",
                        label: "Email",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-3 border border-cyan-400/30 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
                      >
                        <social.icon className="text-lg" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
          >
            Technical Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                    {stack.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {stack.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {stack.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Story Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400"
            >
              The Vision Behind RAVX OS
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8 text-left"
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                <span className="text-cyan-400 font-semibold">
                  Technology kept evolving — but only for developers.
                </span>
                <br />
                AI became more powerful every day — but remained locked behind
                APIs, code, and complex systems.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We asked a bold question:
                <br />
                <span className="text-cyan-400 text-xl font-semibold">
                  &quot;What if anyone — even without a single line of code — could
                  create their own intelligent AI agent, as easily as creating a
                  playlist?&quot;
                </span>
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Not a chatbot. Not a template.
                <br />
                <span className="text-pink-400 font-semibold">
                  A living personal AI being — with memory, voice, identity, and
                  the power to execute real tasks.
                </span>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-linear-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-400/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                Our Vision
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                To make personal AI ownership real.
                <br />
                <span className="text-cyan-400">
                  Not AI as a service — but AI as an extension of your mind.
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {visionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-gray-300"
                  >
                    <FiTarget className="text-cyan-400 mt-1 shrink-0" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
          >
            The Journey So Far
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row mb-8 last:mb-0"
              >
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                      {event.icon}
                    </div>
                    <span className="text-2xl font-bold text-cyan-400">
                      {event.year}
                    </span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm max-w-4xl mx-auto">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <FiHeart className="text-4xl text-cyan-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
              The Mission Continues
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <span className="text-cyan-400 font-semibold">
                RAVX OS is not just a product.
              </span>
              <br />
              It is the beginning of a personal AI era — where billions will
              build their own intelligence, where creativity meets technology,
              and where every person can have their own digital companion that
              grows with them.
            </p>
            <Link href="/features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate.push("/features")}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 mx-auto cursor-pointer"
              >
                <FaRocket className="text-lg" />
                <span>Explore RAVX OS Features</span>
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12 pb-8 mt-16 text-center"
        >
          <p className="text-gray-500">
            Built with 🩵 passion by Harsh Pandey • RAVX OS ©{" "}
            {new Date().getFullYear()}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            The future of personal AI is here, and it&apos;s for everyone.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default AboutRAVXOS;
