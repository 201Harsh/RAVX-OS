"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiTerminal,
  FiUser,
  FiShield,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import AxiosProxyInstance from "@/config/AxiosProxy";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loginError, setLoginError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!formData.email) {
      newErrors.email = "EMAIL_REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "INVALID_EMAIL_FORMAT";
    }

    if (!formData.password) {
      newErrors.password = "PASSWORD_REQUIRED";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const res = await AxiosProxyInstance.post("/api/login", formData);

      if (res.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.data.token);
        }
        router.push("/arc");
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error: any) {
      const apiErrors = error.response?.data?.error;

      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((e: { msg: string }) => {
          setLoginError((prev) => (prev ? prev + " " + e.msg : e.msg));
        });
      } else if (typeof apiErrors === "string") {
        setLoginError(apiErrors || "AUTHENTICATION_FAILED");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-black to-cyan-900/20 text-white relative overflow-hidden">
      {/* Terminal Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-8 pt-8"
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
                root@ravx-os:~/# system --login
              </div>
            </div>
            <div className="flex items-center space-x-4 text-cyan-300/60 text-sm">
              <div className="flex items-center space-x-1">
                <FiShield className="text-xs" />
                <span>SECURE_LOGIN</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
        {/* Login Form Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border-2 border-cyan-400/20 rounded-xl p-6">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono mb-4"
              >
                ACCESS_REQUIRED
              </motion.div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">
                SYSTEM_LOGIN
              </h1>
              <p className="text-gray-400 text-sm font-mono">
                AUTHENTICATE TO ACCESS RAVX OS
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-cyan-300 text-sm mb-3 font-mono">
                  <FiMail className="text-lg" />
                  <span>EMAIL_ADDRESS *</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border-2 ${
                      errors.email ? "border-red-500" : "border-cyan-500/30"
                    } rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400 transition-all duration-300`}
                    placeholder="ENTER_EMAIL_ADDRESS"
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiAlertCircle className="text-red-400 text-lg" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center space-x-2 font-mono">
                    <span>ERROR:</span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center space-x-2 text-cyan-300 text-sm font-mono">
                    <FiLock className="text-lg" />
                    <span>PASSWORD *</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors cursor-pointer uppercase"
                  >
                    FORGOT PASSWORd?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border-2 ${
                      errors.password ? "border-red-500" : "border-cyan-500/30"
                    } rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400 transition-all duration-300 pr-12`}
                    placeholder="ENTER_PASSWORD"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-lg" />
                    ) : (
                      <FiEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 flex items-center space-x-2 font-mono">
                    <span>ERROR:</span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Login Error */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 text-red-400 font-mono text-sm">
                    <FiAlertCircle className="text-lg" />
                    <span>AUTH_ERROR: {loginError}</span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full py-4 rounded-lg border-2 font-mono font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isLoading
                    ? "bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed"
                    : "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <FiLock className="text-lg" />
                    <span>EXECUTE_LOGIN</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-8 pt-6 border-t border-cyan-400/20">
              <p className="text-gray-400 text-sm font-mono">
                NO_ACCOUNT?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer font-mono"
                >
                  CREATE ONE
                </button>
              </p>
            </div>
          </div>

          {/* System Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-cyan-400/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cyan-400/70 font-mono">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span>ENCRYPTION: AES-256</span>
                <span>PROTOCOL: HTTPS/2.5</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>SESSION: SECURE</span>
                <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Sidebar - System Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-800/50 border-2 border-cyan-400/20 rounded-xl p-4 backdrop-blur-sm h-full">
            <div className="text-cyan-300 border-b border-cyan-400/20 pb-3 mb-4 font-mono text-sm">
              SYSTEM_STATUS
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 text-sm font-mono">ONLINE</span>
              </div>

              <div className="space-y-3 text-xs text-cyan-400/70 font-mono">
                <div className="flex justify-between">
                  <span>USERS:</span>
                  <span>1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>UPTIME:</span>
                  <span>99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURITY:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>VERSION:</span>
                  <span>v2.2.1</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 pt-4 border-t border-cyan-400/20">
              <div className="space-y-2 text-xs text-cyan-400/70 font-mono">
                <div className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400 text-xs" />
                  <span>AES-256 ENCRYPTION</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUser className="text-cyan-400 text-xs" />
                  <span>2FA READY</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiTerminal className="text-cyan-400 text-xs" />
                  <span>SECURE_SOCKET</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => router.push("/")}
        className="fixed bottom-6 left-6 bg-gray-800/50 border border-cyan-400/30 rounded-lg p-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm cursor-pointer"
      >
        <FiArrowLeft className="text-lg" />
      </motion.button>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {typeof window !== "undefined" &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default LoginPage;
