"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCog,
  FaPalette,
  FaShieldAlt,
  FaBell,
  FaDatabase,
  FaNetworkWired,
  FaUserShield,
  FaLanguage,
  FaMoon,
  FaSun,
  FaSave,
  FaUndo,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaKey,
} from "react-icons/fa";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState({
    // Appearance
    theme: "dark",
    language: "en",
    fontSize: "medium",
    animation: true,

    // Security
    twoFactorAuth: false,
    autoLogout: 30,
    passwordVisibility: false,
    encryption: true,

    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    soundEnabled: true,
    vibration: true,

    // Performance
    cacheEnabled: true,
    cacheSize: 500,
    hardwareAcceleration: true,
    backgroundProcesses: true,

    // Network
    autoSync: true,
    syncInterval: 15,
    dataSaver: false,
    proxyEnabled: false,
  });

  const tabs = [
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "performance", label: "Performance", icon: <FaMicrochip /> },
    { id: "network", label: "Network", icon: <FaNetworkWired /> },
    { id: "storage", label: "Storage", icon: <FaDatabase /> },
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
  };

  const resetSettings = () => {
    // Reset to default settings
    setSettings({
      theme: "dark",
      language: "en",
      fontSize: "medium",
      animation: true,
      twoFactorAuth: false,
      autoLogout: 30,
      passwordVisibility: false,
      encryption: true,
      emailNotifications: true,
      pushNotifications: false,
      soundEnabled: true,
      vibration: true,
      cacheEnabled: true,
      cacheSize: 500,
      hardwareAcceleration: true,
      backgroundProcesses: true,
      autoSync: true,
      syncInterval: 15,
      dataSaver: false,
      proxyEnabled: false,
    });
  };

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
                root@ravx-os:~/# system --settings
              </div>
            </div>
            <div className="flex items-center space-x-4 text-cyan-300/60 text-sm">
              <div className="flex items-center space-x-1">
                <FaCog className="text-xs" />
                <span>SYSTEM_SETTINGS</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-800/50 border-2 border-cyan-400/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-cyan-300 border-b border-cyan-400/20 pb-3 mb-4 font-mono text-sm">
              SETTINGS PANEL
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 font-mono text-sm ${
                    activeTab === tab.id
                      ? "bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400/30"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <div className="text-cyan-400">{tab.icon}</div>
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* System Status */}
            <div className="mt-6 pt-4 border-t border-cyan-400/20">
              <div className="space-y-3 text-xs text-cyan-400/70 font-mono">
                <div className="flex justify-between">
                  <span>SYSTEM:</span>
                  <span className="text-green-400">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span>MEMORY:</span>
                  <span>64%</span>
                </div>
                <div className="flex justify-between">
                  <span>STORAGE:</span>
                  <span>42%</span>
                </div>
                <div className="flex justify-between">
                  <span>UPTIME:</span>
                  <span>12:34:56</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-cyan-400 font-mono">
                  SYSTEM SETTINGS
                </h1>
                <p className="text-gray-400 text-sm mt-1 font-mono">
                  Configure your RAVX-OS environment
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetSettings}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 font-mono text-sm cursor-pointer"
                >
                  <FaUndo className="inline mr-2 text-xs" />
                  RESET
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveSettings}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg border border-cyan-500 hover:bg-cyan-500 transition-all duration-300 font-mono text-sm cursor-pointer"
                >
                  <FaSave className="inline mr-2 text-xs" />
                  SAVE
                </motion.button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Theme */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        <FaPalette className="inline mr-2" />
                        THEME
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "dark", label: "Dark", icon: <FaMoon /> },
                          { value: "light", label: "Light", icon: <FaSun /> },
                        ].map((theme) => (
                          <motion.button
                            key={theme.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleSettingChange(
                                "appearance",
                                "theme",
                                theme.value
                              )
                            }
                            className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                              settings.theme === theme.value
                                ? "border-cyan-500 bg-cyan-500/10"
                                : "border-gray-600 bg-gray-700/50 hover:border-cyan-400/50"
                            }`}
                          >
                            {theme.icon}
                            <span className="text-sm font-mono">
                              {theme.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        <FaLanguage className="inline mr-2" />
                        LANGUAGE
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleSettingChange(
                            "appearance",
                            "language",
                            e.target.value
                          )
                        }
                        className="w-full bg-gray-700 border-2 border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono text-sm"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>

                    {/* Font Size */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        FONT SIZE
                      </label>
                      <div className="space-y-2">
                        {["small", "medium", "large"].map((size) => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleSettingChange(
                                "appearance",
                                "fontSize",
                                size
                              )
                            }
                            className={`w-full p-2 rounded border transition-all duration-300 font-mono text-sm ${
                              settings.fontSize === size
                                ? "bg-cyan-600 text-white border-cyan-500"
                                : "bg-gray-700 text-gray-300 border-gray-600 hover:border-cyan-400"
                            }`}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Animations */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        ANIMATIONS
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Enable animations
                        </span>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "appearance",
                              "animation",
                              !settings.animation
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            settings.animation ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                              settings.animation
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {/* Two-Factor Authentication */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-cyan-300 block font-mono">
                            <FaUserShield className="inline mr-2" />
                            TWO-FACTOR AUTHENTICATION
                          </label>
                          <p className="text-gray-400 text-xs mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "security",
                              "twoFactorAuth",
                              !settings.twoFactorAuth
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            settings.twoFactorAuth
                              ? "bg-green-500"
                              : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                              settings.twoFactorAuth
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Auto Logout */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        <FaKey className="inline mr-2" />
                        AUTO LOGOUT
                      </label>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Timeout duration</span>
                          <span>{settings.autoLogout} minutes</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="60"
                          step="5"
                          value={settings.autoLogout}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "autoLogout",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>5 min</span>
                          <span>60 min</span>
                        </div>
                      </div>
                    </div>

                    {/* Encryption */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-cyan-300 block font-mono">
                            <FaShieldAlt className="inline mr-2" />
                            DATA ENCRYPTION
                          </label>
                          <p className="text-gray-400 text-xs mt-1">
                            Encrypt all stored data for maximum security
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "security",
                              "encryption",
                              !settings.encryption
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            settings.encryption ? "bg-green-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                              settings.encryption
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Performance Settings */}
              {activeTab === "performance" && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cache Settings */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <label className="text-sm font-semibold text-cyan-300 mb-3 block font-mono">
                        <FaMemory className="inline mr-2" />
                        CACHE SETTINGS
                      </label>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">
                            Enable caching
                          </span>
                          <button
                            onClick={() =>
                              handleSettingChange(
                                "performance",
                                "cacheEnabled",
                                !settings.cacheEnabled
                              )
                            }
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              settings.cacheEnabled
                                ? "bg-cyan-500"
                                : "bg-gray-600"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                                settings.cacheEnabled
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>Cache size</span>
                            <span>{settings.cacheSize} MB</span>
                          </div>
                          <input
                            type="range"
                            min="100"
                            max="1000"
                            step="100"
                            value={settings.cacheSize}
                            onChange={(e) =>
                              handleSettingChange(
                                "performance",
                                "cacheSize",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            disabled={!settings.cacheEnabled}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hardware Acceleration */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-cyan-300 block font-mono">
                            <FaMicrochip className="inline mr-2" />
                            HARDWARE ACCELERATION
                          </label>
                          <p className="text-gray-400 text-xs mt-1">
                            Use GPU for better performance
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "performance",
                              "hardwareAcceleration",
                              !settings.hardwareAcceleration
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            settings.hardwareAcceleration
                              ? "bg-green-500"
                              : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                              settings.hardwareAcceleration
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Background Processes */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-cyan-300 block font-mono">
                            BACKGROUND PROCESSES
                          </label>
                          <p className="text-gray-400 text-xs mt-1">
                            Allow processes to run in background
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingChange(
                              "performance",
                              "backgroundProcesses",
                              !settings.backgroundProcesses
                            )
                          }
                          className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            settings.backgroundProcesses
                              ? "bg-cyan-500"
                              : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                              settings.backgroundProcesses
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Add other tabs similarly... */}
            </AnimatePresence>
          </div>

          {/* System Info Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-cyan-400/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-cyan-400/70 font-mono">
              <div className="text-center">
                <FaMicrochip className="text-cyan-400 text-lg mx-auto mb-1" />
                <div>CPU USAGE</div>
                <div className="text-white">28%</div>
              </div>
              <div className="text-center">
                <FaMemory className="text-cyan-400 text-lg mx-auto mb-1" />
                <div>MEMORY</div>
                <div className="text-white">64%</div>
              </div>
              <div className="text-center">
                <FaHdd className="text-cyan-400 text-lg mx-auto mb-1" />
                <div>STORAGE</div>
                <div className="text-white">42%</div>
              </div>
              <div className="text-center">
                <FaNetworkWired className="text-cyan-400 text-lg mx-auto mb-1" />
                <div>NETWORK</div>
                <div className="text-white">12 MB/s</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
