"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
  FiLock,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import AxiosProxyInstance from "@/config/AxiosProxy";

interface ForgotPasswordForm {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ForgotPasswordForm>>({});
  const [apiError, setApiError] = useState<string>("");

  const validateStep1 = (): boolean => {
    const newErrors: Partial<ForgotPasswordForm> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<ForgotPasswordForm> = {};

    if (!formData.otp) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    if (errors[name as keyof ForgotPasswordForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep1()) {
      return;
    }

    setIsLoading(true);
    setApiError("");

    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    setApiError("");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setApiError("");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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
            onClick={() => router.push("/login")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Login</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              Reset Password
            </h1>
            <p className="text-gray-400 mt-2">
              {currentStep === 1
                ? "Enter your email to get started"
                : "Enter OTP and new password"}
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "bg-cyan-500 text-black"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {currentStep > 1 ? <FiCheckCircle /> : "1"}
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 1 ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                Verify Email
              </span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-700">
              <div
                className={`h-full transition-all duration-300 ${
                  currentStep >= 2 ? "bg-cyan-500" : "bg-gray-700"
                }`}
              ></div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? "bg-cyan-500 text-black"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm ${
                  currentStep >= 2 ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                Reset Password
              </span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            {currentStep === 1 ? (
              // Step 1: Email Verification
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <FiMail className="text-lg" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${
                      errors.email ? "border-red-400" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <FiAlertCircle className="text-xs" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-400/30 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 text-red-400">
                      <FiAlertCircle className="text-sm" />
                      <span className="text-sm">{apiError}</span>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <FiMail className="text-lg" />
                      <span>Send OTP</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              // Step 2: Reset Password
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <FiMail className="text-lg" />
                    <span>OTP Code</span>
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    maxLength={6}
                    className={`w-full bg-gray-800 border ${
                      errors.otp ? "border-red-400" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                    placeholder="Enter 6-digit OTP"
                  />
                  {errors.otp && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <FiAlertCircle className="text-xs" />
                      <span>{errors.otp}</span>
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-sm">
                      Sent to: {formData.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <FiLock className="text-lg" />
                    <span>New Password</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${
                      errors.newPassword ? "border-red-400" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <FiAlertCircle className="text-xs" />
                      <span>{errors.newPassword}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                    <FiLock className="text-lg" />
                    <span>Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <FiAlertCircle className="text-xs" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>

                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-400/30 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 text-red-400">
                      <FiAlertCircle className="text-sm" />
                      <span className="text-sm">{apiError}</span>
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    disabled={isLoading}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Resetting...</span>
                      </>
                    ) : (
                      <>
                        <FiLock className="text-lg" />
                        <span>Reset Password</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <FiLock className="text-xs" />
              <span>Your data is securely encrypted and protected</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
