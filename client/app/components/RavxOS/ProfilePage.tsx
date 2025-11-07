"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaRobot,
  FaFlask,
  FaCrown,
} from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { AIAgent } from "@/app/types/Type";

interface UserDataType {
  id: string;
  name: string;
  email: string;
  password: string;
  LabTokens: number;
  AIAgentTokens: number;
  createdAt: string;
}

interface PropsType {
  aiAgents: AIAgent[];
  userData: UserDataType[];
}

export default function ProfileSettings({ userData, aiAgents }: PropsType) {
  const AccountAge =
    userData.createdAt &&
    Math.floor(
      (new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24)
    );

  const stats = [
    {
      icon: <FaFlask className="text-2xl text-cyan-400" />,
      label: "LABS CREATED",
      value: userData.LabTokens + 1,
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FaRobot className="text-2xl text-green-400" />,
      label: "AGENTS CREATED",
      value: aiAgents.length,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const profileDetails = [
    {
      icon: <FaUser className="text-cyan-400" />,
      label: "FULL NAME",
      value: userData.name,
    },
    {
      icon: <FaEnvelope className="text-blue-400" />,
      label: "EMAIL ADDRESS",
      value: userData.email,
    },
    {
      icon: <FaCalendar className="text-green-400" />,
      label: "MEMBER SINCE",
      value: new Date(userData.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: <FaCrown className="text-yellow-400" />,
      label: "MEMBERSHIP TIER",
      value: userData.membership || "FREE",
    },
    {
      icon: <FaShield className="text-purple-400" />,
      label: "LAST ACTIVE",
      value: new Date(Date.now()).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-cyan-900/20 text-white p-4">
      {/* Terminal-style Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-6"
      >
        <div className="bg-gray-800/50 border border-cyan-400/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-cyan-400 text-sm">
                root@ravx-os:~/# profile --status
              </div>
            </div>
            <div className="flex items-center space-x-4 text-cyan-300/60 text-sm">
              <div className="flex items-center space-x-1">
                <FaUser className="text-xs" />
                <span>USER_PROFILE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - User Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-800/50 border-2 border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm">
            {/* User Avatar */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-cyan-400/30">
                <FaUser className="text-white text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-cyan-400 font-mono">
                {userData.name}
              </h2>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-mono mt-2 border border-yellow-500/30">
                <FaCrown className="text-xs" />
                {userData.membership || "FREE"}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm overflow-hidden">
                <span className="text-gray-400 font-mono">USER_ID: </span>
                <span className="text-cyan-300 font-mono text-center">
                  {userData._id}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">STATUS:</span>
                <span className="text-green-400 font-mono">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">ACCESS:</span>
                <span className="text-cyan-300 font-mono">FULL</span>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 pt-4 border-t border-cyan-400/20">
              <div className="space-y-3 text-xs text-cyan-400/70 font-mono">
                <div className="flex justify-between">
                  <span>PROFILE_COMPLETE:</span>
                  <span className="text-green-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>ACCOUNT_AGE:</span>
                  <span>{AccountAge} Days</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURITY_SCORE:</span>
                  <span className="text-green-400">A+</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          {/* Header */}
          <div className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-cyan-400 font-mono">
                  PROFILE OVERVIEW
                </h1>
                <p className="text-gray-400 text-sm mt-1 font-mono">
                  View your account details and system statistics
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-cyan-300 font-mono">
                  LAST ACTIVE
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {new Date(Date.now()).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border-2 border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-linear-to-r ${stat.color} bg-opacity-20`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-cyan-300 font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile Details */}
          <div className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono">
              ACCOUNT INFORMATION
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {detail.icon}
                    <span className="text-sm font-semibold text-cyan-300 font-mono">
                      {detail.label}
                    </span>
                  </div>
                  <div className="text-white font-mono text-sm pl-8">
                    {detail.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Lab Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-cyan-400 mb-4 font-mono flex items-center gap-2">
                <FaFlask className="text-cyan-400" />
                LAB STATISTICS
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    Total Labs:
                  </span>
                  <span className="text-cyan-300 font-mono">
                    {userData.LabTokens + 1}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    Active Labs:
                  </span>
                  <span className="text-green-400 font-mono">
                    {userData.LabTokens + 1}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Agent Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800/30 backdrop-blur-sm border-2 border-green-400/20 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-green-400 mb-4 font-mono flex items-center gap-2">
                <FaRobot className="text-green-400" />
                AGENT STATISTICS
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    Total Agents:
                  </span>
                  <span className="text-green-300 font-mono">
                    {aiAgents.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-mono">
                    Active Agents:
                  </span>
                  <span className="text-green-400 font-mono">
                    {aiAgents.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* System Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-cyan-400/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cyan-400/70 font-mono">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span>PROFILE_VIEW: READ-ONLY</span>
                <span>ACCESS_LEVEL: ADMIN</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>DATA_UPDATED: REAL_TIME</span>
                <span>SESSION: SECURE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
