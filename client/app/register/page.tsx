"use client";
import React, { useState, useEffect, useRef } from "react";
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
  FiTerminal,
  FiShield,
  FiClock,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import AxiosInstance from "@/config/Axios";
import { Bounce, Slide, toast, Zoom } from "react-toastify";
import AxiosProxyInstance from "@/config/AxiosProxy";

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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-close after 5 minutes
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          toast.error("OTP expired. Please request a new one.", {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  // Handle OTP paste from clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus the last input
      setTimeout(() => {
        inputRefs.current[5]?.focus();
      }, 0);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Enter a 6 digit Valid OTP", {
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
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onVerify(otpString);
  };

  const handleResendOTP = () => {
    // Simulate resend OTP
    toast.success("New OTP has been sent to your email!", {
      position: "top-right",
      autoClose: 4000,
      theme: "dark",
    });
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(300);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900/90 border-2 border-cyan-400/30 rounded-xl p-6 max-w-md w-full font-mono"
          >
            {/* Terminal Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-cyan-400 text-sm">VERIFICATION_CONSOLE</div>
            </div>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                <FiMail className="text-xl text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">
                VERIFY_IDENTITY
              </h3>
              <p className="text-cyan-400/70 text-sm font-mono">
                OTP sent to: <span className="text-cyan-300">{email}</span>
              </p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center space-x-2 mb-4 text-cyan-400/70 text-sm font-mono">
              <FiClock className="text-cyan-400" />
              <span>EXPIRES: {formatTime(timeLeft)}</span>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <label className="text-cyan-300 text-sm mb-3 block font-mono">
                ENTER_6_DIGIT_CODE
              </label>
              <div
                className="flex space-x-2 justify-center"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 bg-gray-800 border-2 border-cyan-500/30 rounded-lg text-white text-center text-xl font-semibold focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                    placeholder="0"
                  />
                ))}
              </div>
              <p className="text-cyan-400/50 text-xs text-center mt-2 font-mono">
                Paste 6-digit code or type manually
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 border-2 border-gray-600 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/50 rounded-lg transition-all duration-300 font-mono text-sm disabled:opacity-50"
              >
                ABORT
              </button>
              <button
                onClick={handleVerify}
                disabled={isLoading || otp.join("").length !== 6}
                className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg border-2 border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-mono text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>VERIFYING...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="text-lg" />
                    <span>VERIFY</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleResendOTP}
                className="text-cyan-400 hover:text-cyan-300 text-xs transition-colors font-mono"
              >
                RESEND_OTP
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
      newErrors.name = "NAME_REQUIRED";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "NAME_TOO_SHORT";
    }

    if (!formData.email) {
      newErrors.email = "EMAIL_REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "INVALID_EMAIL_FORMAT";
    }

    if (!formData.password) {
      newErrors.password = "PASSWORD_REQUIRED";
    } else if (formData.password.length < 6) {
      newErrors.password = "PASSWORD_TOO_SHORT";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "CONFIRM_PASSWORD_REQUIRED";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "PASSWORDS_DONT_MATCH";
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
        setShowOTP(true);
        setErrors({});
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
        setErrors({});
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

  const handleOTPVerify = async (otp: string) => {
    try {
      const res = await AxiosProxyInstance.post("/api/verify", {
        email: formData.email,
        otp,
      });

      if (res.status === 200) {
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
        router.push("/arc");
        setShowOTP(false);
      }
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors;
      const main_errors = error.response.data.error;

      if (error.response.status === 404) {
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
        setShowOTP(false);
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
    }
  };

  const handleOTPClose = () => {
    setShowOTP(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-cyan-900/20 text-white relative overflow-hidden">
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
                root@ravx-os:~/# system --register
              </div>
            </div>
            <div className="flex items-center space-x-4 text-cyan-300/60 text-sm">
              <div className="flex items-center space-x-1">
                <FiShield className="text-xs" />
                <span>SECURE_REGISTRATION</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
        {/* Registration Form Area */}
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
                NEW_ACCOUNT_INITIALIZATION
              </motion.div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">
                SYSTEM_REGISTRATION
              </h1>
              <p className="text-gray-400 text-sm font-mono">
                CREATE_NEW_RAVX_OS_ACCOUNT
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-cyan-300 text-sm mb-3 font-mono">
                  <FiUser className="text-lg" />
                  <span>FULL_NAME *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/50 border-2 ${
                    errors.name ? "border-red-500" : "border-cyan-500/30"
                  } rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400 transition-all duration-300`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center space-x-2 font-mono">
                    <FiX className="text-lg" />
                    <span>ERROR: {errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-cyan-300 text-sm mb-3 font-mono">
                  <FiMail className="text-lg" />
                  <span>EMAIL_ADDRESS *</span>
                </label>
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
                  <p className="text-red-400 text-sm mt-2 flex items-center space-x-2 font-mono">
                    <FiX className="text-lg" />
                    <span>ERROR: {errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center space-x-2 text-cyan-300 text-sm mb-3 font-mono">
                  <FiLock className="text-lg" />
                  <span>PASSWORD *</span>
                </label>
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
                    <FiX className="text-lg" />
                    <span>ERROR: {errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="flex items-center space-x-2 text-cyan-300 text-sm mb-3 font-mono">
                  <FiLock className="text-lg" />
                  <span>CONFIRM_PASSWORD *</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/50 border-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-cyan-500/30"
                    } rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-400 transition-all duration-300 pr-12`}
                    placeholder="CONFIRM_PASSWORD"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-lg" />
                    ) : (
                      <FiEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2 flex items-center space-x-2 font-mono">
                    <FiX className="text-lg" />
                    <span>ERROR: {errors.confirmPassword}</span>
                  </p>
                )}
              </div>

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
                    <span>INITIALIZING_ACCOUNT...</span>
                  </>
                ) : (
                  <>
                    <FiUser className="text-lg" />
                    <span>CREATE_SYSTEM_ACCOUNT</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-cyan-400/20">
              <p className="text-gray-400 text-sm font-mono">
                EXISTING_USER?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer font-mono"
                >
                  ACCESS_SYSTEM_LOGIN
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
                <span>PROTOCOL: HTTPS/2</span>
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
              SYSTEM_REQUIREMENTS
            </div>

            <div className="space-y-4">
              <div className="space-y-3 text-xs text-cyan-400/70 font-mono">
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-400 text-xs" />
                  <span>MIN_3_CHAR_NAME</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-400 text-xs" />
                  <span>VALID_EMAIL_FORMAT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-400 text-xs" />
                  <span>MIN_6_CHAR_PASSWORD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCheck className="text-green-400 text-xs" />
                  <span>PASSWORD_MATCH</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 pt-4 border-t border-cyan-400/20">
              <div className="space-y-2 text-xs text-cyan-400/70 font-mono">
                <div className="flex items-center space-x-2">
                  <FiShield className="text-cyan-400 text-xs" />
                  <span>OTP_VERIFICATION</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiTerminal className="text-cyan-400 text-xs" />
                  <span>ENCRYPTED_STORAGE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUser className="text-cyan-400 text-xs" />
                  <span>SECURE_SESSION</span>
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

      {/* OTP Popup */}
      <OTPPopup
        isOpen={showOTP}
        onClose={handleOTPClose}
        onVerify={handleOTPVerify}
        email={formData.email}
      />

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

export default RegisterPage;
