"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import AxiosInstance from "@/config/Axios";
import { Bounce, Slide, toast, Zoom } from "react-toastify";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface OTPPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email: string;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  isOpen,
  onClose,
  onVerify,
  email,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onVerify(otpString);
  };

  const handleResendOTP = () => {
    // Simulate resend OTP
    alert("OTP has been resent to your email!");
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-2xl text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Verify Your Email
              </h3>
              <p className="text-gray-400">
                We sent a 6-digit code to{" "}
                <span className="text-cyan-400 font-semibold">{email}</span>
              </p>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-3 block">
                Enter verification code
              </label>
              <div className="flex space-x-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-lg transition-all duration-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={isLoading || otp.join("").length !== 6}
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="text-lg" />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleResendOTP}
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Didn't receive code? Resend OTP
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
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

    // Clear error when user starts typing
    if (errors[name as keyof RegisterForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await AxiosInstance.post("/users/register", formData);

      if (res.status === 201) {
        console.log(res.data);
        setShowOTP(true);
      } else if (res.status === 202) {
        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => {
          setShowOTP(true);
        }, 4300);
      }
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors;
      const main_errors = error.response.data.message;

      if (error.response.status === 400) {
        toast.error(main_errors, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }

      if (main_errors) {
        toast.error(main_errors, {
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

      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((elem: { msg: string }) => {
          toast.error(elem.msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
      } else if (typeof apiErrors === "object" && apiErrors?.message) {
        toast.error(apiErrors.message, {
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

      setErrors(apiErrors || {});
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = (otp: string) => {
    try {
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors;
      const main_errors = error.response.data.message;

      if (main_errors) {
        toast.error(main_errors, {
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

      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((elem: { msg: string }) => {
          toast.error(elem.msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
      } else if (typeof apiErrors === "object" && apiErrors?.message) {
        toast.error(apiErrors.message, {
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
    }
  };

  const handleOTPClose = () => {
    setShowOTP(false);
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
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              Join RAVX OS
            </h1>
            <p className="text-gray-400 mt-2">
              Create your account and start building AI avatars
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        {/* Register Form */}
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                  <FiUser className="text-lg" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800 border ${
                    errors.name ? "border-red-400" : "border-gray-600"
                  } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <FiX className="text-xs" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
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
                    <FiX className="text-xs" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                  <FiLock className="text-lg" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${
                      errors.password ? "border-red-400" : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors pr-12`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <FiX className="text-xs" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                  <FiLock className="text-lg" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-600"
                    } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors pr-12`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <FiX className="text-xs" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <FiUser className="text-lg" />
                    <span>Create Account</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  LogIn
                </button>
              </p>
            </div>
          </motion.div>

          {/* Terms Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm text-center mt-6"
          >
            By creating an account, you agree to our{" "}
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Privacy Policy
            </button>
          </motion.p>
        </div>
      </div>

      {/* OTP Popup */}
      <OTPPopup
        isOpen={showOTP}
        onClose={handleOTPClose}
        onVerify={handleOTPVerify}
        email={formData.email}
      />
    </div>
  );
};

export default RegisterPage;
