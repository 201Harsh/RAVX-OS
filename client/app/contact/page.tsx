"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMessageSquare,
  FiUser,
  FiSend,
  FiArrowLeft,
  FiPhone,
  FiClock,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import LandingHeader from "../components/Welcome Page/LandingHeader";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "general" | "technical" | "billing" | "partnership";
}

interface SupportOption {
  icon: React.ReactElement;
  title: string;
  description: string;
  responseTime: string;
  link?: string;
  action?: string;
}

const ContactPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const supportOptions: SupportOption[] = [
    {
      icon: <FiMessageSquare className="text-2xl" />,
      title: "Community Support",
      description:
        "Get help from our active community of AI enthusiasts and developers",
      responseTime: "Within hours",
      link: "https://discord.gg/ravxos",
      action: "Join Discord",
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email Support",
      description:
        "Direct email support for technical issues and account questions",
      responseTime: "Within 24 hours",
      action: "Send Email",
    },
    {
      icon: <FiGithub className="text-2xl" />,
      title: "GitHub Issues",
      description:
        "Report bugs, request features, or contribute to our open-source projects",
      responseTime: "Within 48 hours",
      link: "https://github.com/ravxos",
      action: "View GitHub",
    },
    {
      icon: <FiTwitter className="text-2xl" />,
      title: "Twitter Support",
      description:
        "Quick questions and updates about new features and announcements",
      responseTime: "Within hours",
      link: "https://twitter.com/ravxos",
      action: "Follow Us",
    },
  ];

  const teamMembers = [
    {
      name: "Harsh Pandey",
      role: "Founder & Lead Developer",
      email: "harsh@ravx.os",
      focus: "Technical Architecture & AI Systems",
    },
    {
      name: "Support Team",
      role: "Customer Success",
      email: "support@ravx.os",
      focus: "Account & Technical Support",
    },
    {
      name: "Partnerships",
      role: "Business Development",
      email: "partnerships@ravx.os",
      focus: "Integrations & Enterprise Solutions",
    },
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer:
        "Typically within 24 hours for email support, and within hours on our community channels.",
    },
    {
      question: "Do you offer enterprise support?",
      answer:
        "Yes, we offer dedicated enterprise support with SLAs. Contact our partnerships team for details.",
    },
    {
      question: "Can I schedule a demo?",
      answer:
        "Absolutely! We'd love to show you RAVX OS in action. Use the contact form to request a demo.",
    },
    {
      question: "Do you provide technical documentation?",
      answer:
        "Yes, we have comprehensive documentation available at docs.ravx.os",
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
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

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
      setIsSubmitted(false);
    }, 5000);
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
        <LandingHeader itemVariants={itemVariants} />
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              Get In Touch
            </h1>
            <p className="text-gray-400 mt-2">
              We're here to help you build amazing AI experiences
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        <div className="max-w-7xl mx-auto">
          {/* Support Options Grid */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Support Channels
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-cyan-400 text-sm mb-4">
                      <FiClock className="text-xs" />
                      <span>{option.responseTime}</span>
                    </div>
                    {option.link ? (
                      <a
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>{option.action}</span>
                        <FiArrowLeft className="rotate-180 text-sm" />
                      </a>
                    ) : (
                      <button className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                        <span>{option.action}</span>
                        <FiArrowLeft className="rotate-180 text-sm" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                    <FiSend className="text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Send us a Message
                  </h2>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-2xl text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <FiAlertCircle className="text-xs" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                          <FiMessageSquare className="text-lg" />
                          <span>Category</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                          <FiMessageSquare className="text-lg" />
                          <span>Subject</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full bg-gray-800 border ${
                            errors.subject
                              ? "border-red-400"
                              : "border-gray-600"
                          } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors`}
                          placeholder="What is this regarding?"
                        />
                        {errors.subject && (
                          <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                            <FiAlertCircle className="text-xs" />
                            <span>{errors.subject}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <FiMessageSquare className="text-lg" />
                        <span>Message</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full bg-gray-800 border ${
                          errors.message ? "border-red-400" : "border-gray-600"
                        } rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <FiAlertCircle className="text-xs" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="text-lg" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiMail className="text-cyan-400 text-lg" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a
                        href="mailto:hello@ravx.os"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        hello@ravx.os
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiPhone className="text-cyan-400 text-lg" />
                    <div>
                      <div className="font-semibold">Support</div>
                      <a
                        href="mailto:support@ravx.os"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        support@ravx.os
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiClock className="text-cyan-400 text-lg" />
                    <div>
                      <div className="font-semibold">Response Time</div>
                      <div>Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Contacts */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Direct Contacts
                </h3>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-600 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="font-semibold text-white">
                        {member.name}
                      </div>
                      <div className="text-cyan-400 text-sm mb-1">
                        {member.role}
                      </div>
                      <div className="text-gray-400 text-sm mb-2">
                        {member.focus}
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => router.push("/docs")}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                  >
                    View all FAQs →
                  </button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Social Links */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Follow Our Journey
            </h3>
            <div className="flex justify-center space-x-6">
              {[
                {
                  icon: <FiGithub />,
                  label: "GitHub",
                  href: "https://github.com/ravxos",
                },
                {
                  icon: <FiTwitter />,
                  label: "Twitter",
                  href: "https://twitter.com/ravxos",
                },
                {
                  icon: <FiLinkedin />,
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/ravxos",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gray-800/50 border border-gray-600 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 rounded-xl transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
