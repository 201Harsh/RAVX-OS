"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiStar,
  FiUser,
  FiArrowLeft,
  FiCreditCard,
  FiShield,
  FiDatabase,
  FiCpu,
  FiMessageSquare,
  FiGitBranch,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

// Type definitions
interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceDescription?: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    tooltip?: string;
  }[];
  cta: {
    text: string;
    variant: "primary" | "secondary" | "outline";
  };
  limits: {
    avatars: string;
    memory: string;
    voice: string;
    tasks: string;
    support: string;
  };
}

interface FeatureDetail {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const PricingPage: React.FC = () => {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const pricingTiers: PricingTier[] = [
    {
      id: "free",
      name: "Explorer",
      description: "Perfect for getting started with personal AI avatars",
      price: billingPeriod === "yearly" ? "$0" : "$0",
      priceDescription: "Forever free",
      features: [
        { text: "1 AI Avatar", included: true },
        { text: "Basic Neural Booting", included: true },
        { text: "2GB Memory Storage", included: true },
        { text: "Text-only Conversations", included: true },
        { text: "Standard Voice Synthesis", included: true },
        { text: "5 MCP Tasks/Day", included: true },
        { text: "Community Support", included: true },
        { text: "Advanced Personality Customization", included: false },
        { text: "Custom Voice Models", included: false },
        { text: "Priority Task Execution", included: false },
        { text: "API Access", included: false },
        { text: "Multi-Avatar Coordination", included: false },
      ],
      cta: {
        text: "Get Started Free",
        variant: "outline",
      },
      limits: {
        avatars: "1 Avatar",
        memory: "2GB Storage",
        voice: "Standard Voices",
        tasks: "5 Tasks/Day",
        support: "Community Forum",
      },
    },
    {
      id: "pro",
      name: "Creator",
      description:
        "For enthusiasts and content creators building advanced AI companions",
      price: billingPeriod === "yearly" ? "₹229" : "₹369",
      priceDescription:
        billingPeriod === "yearly" ? "per month, billed annually" : "per month",
      popular: true,
      features: [
        { text: "5 AI Avatars", included: true },
        { text: "Advanced Neural Booting", included: true },
        { text: "20GB Memory Storage", included: true },
        { text: "Voice & Text Conversations", included: true },
        { text: "Premium Voice Synthesis", included: true },
        { text: "50 MCP Tasks/Day", included: true },
        { text: "Email Support", included: true },
        { text: "Advanced Personality Customization", included: true },
        { text: "Custom Voice Models", included: true },
        { text: "Priority Task Execution", included: true },
        { text: "Basic API Access", included: true },
        { text: "Multi-Avatar Coordination", included: false },
      ],
      cta: {
        text: "Start Creating",
        variant: "primary",
      },
      limits: {
        avatars: "5 Avatars",
        memory: "20GB Storage",
        voice: "Premium Voices",
        tasks: "50 Tasks/Day",
        support: "Email Support",
      },
    },
    {
      id: "team",
      name: "Premium Plus",
      description: "For teams and businesses requiring scalable AI solutions",
      price: billingPeriod === "yearly" ? "₹379" : "₹599",
      priceDescription:
        billingPeriod === "yearly" ? "per month, billed annually" : "per month",
      features: [
        { text: "Unlimited AI Avatars", included: true },
        { text: "Enterprise Neural Booting", included: true },
        { text: "100GB Memory Storage", included: true },
        { text: "Multi-modal Conversations", included: true },
        { text: "Custom Voice Training", included: true },
        { text: "Unlimited MCP Tasks", included: true },
        { text: "Priority 24/7 Support", included: true },
        { text: "Advanced Personality Customization", included: true },
        { text: "Custom Voice Models", included: true },
        { text: "Priority Task Execution", included: true },
        { text: "Full API Access", included: true },
        { text: "Multi-Avatar Coordination", included: true },
      ],
      cta: {
        text: "Contact Sales",
        variant: "secondary",
      },
      limits: {
        avatars: "Unlimited",
        memory: "100GB Storage",
        voice: "Custom Training",
        tasks: "Unlimited",
        support: "24/7 Priority",
      },
    },
  ];

  const featureDetails: FeatureDetail[] = [
    {
      icon: <FiUser className="text-2xl" />,
      title: "AI Avatars",
      description:
        "Create multiple intelligent AI personas with unique personalities, voices, and capabilities tailored to different use cases.",
    },
    {
      icon: <FiDatabase className="text-2xl" />,
      title: "Memory System",
      description:
        "Persistent memory storage that grows with your interactions, enabling continuous learning and personalized experiences.",
    },
    {
      icon: <FiMessageSquare className="text-2xl" />,
      title: "Voice Synthesis",
      description:
        "Natural, emotional voice generation with multiple languages and custom voice model training capabilities.",
    },
    {
      icon: <FiGitBranch className="text-2xl" />,
      title: "MCP Tasks",
      description:
        "Execute real-world actions through Model Context Protocol integration with Google, email, automation, and custom APIs.",
    },
    {
      icon: <FiCpu className="text-2xl" />,
      title: "Neural Booting",
      description:
        "Instant AI avatar creation through advanced neural network initialization with zero coding required.",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Security & Privacy",
      description:
        "Enterprise-grade security with end-to-end encryption, private processing, and complete data ownership.",
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with pro-rated billing.",
    },
    {
      question: "Is there a limit on conversations?",
      answer:
        "No, all plans include unlimited conversations with your AI avatars. Limits only apply to MCP task executions and memory storage.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "All paid plans include a 14-day free trial. No credit card required to start. Cancel anytime during the trial period.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are secure and encrypted.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
    },
    {
      question: "Do you offer educational discounts?",
      answer:
        "Yes, we offer 50% discounts for students and educators. Contact our support team with valid documentation.",
    },
  ];

  const getCtaVariantClass = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold";
      case "secondary":
        return "bg-purple-500 hover:bg-purple-400 text-white font-semibold";
      case "outline":
        return "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold";
      default:
        return "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold";
    }
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
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
              Simple Pricing
            </h1>
            <p className="text-gray-400 mt-2">
              Choose the perfect plan for your AI journey
            </p>
          </div>

          <div className="w-24"></div>
        </motion.header>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-cyan-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingPeriod === "yearly"
                    ? "bg-cyan-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly <span className="text-green-400 ml-1">Save 20%</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.id}
                variants={itemVariants}
                className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${
                  tier.popular
                    ? "border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105"
                    : "border-gray-700 hover:border-cyan-400/30"
                }`}
                whileHover={{ y: -5 }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <FiStar className="fill-current" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{tier.description}</p>

                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-cyan-400">
                      {tier.price}
                    </span>
                    {tier.priceDescription && (
                      <span className="text-gray-400 ml-2">
                        {tier.priceDescription}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl transition-all duration-300 ${getCtaVariantClass(
                      tier.cta.variant
                    )}`}
                  >
                    {tier.cta.text}
                  </motion.button>
                </div>

                {/* Limits Overview */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-800/30 rounded-xl">
                  {Object.entries(tier.limits).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-cyan-400 font-semibold text-sm">
                        {value}
                      </div>
                      <div className="text-gray-400 text-xs capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <FiCheck className="text-green-400 shrink-0" />
                      ) : (
                        <FiX className="text-red-400 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Feature Details */}
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
            Everything You Need to Build Amazing AI Avatars
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featureDetails.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-12 backdrop-blur-sm max-w-4xl mx-auto">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <FiCreditCard className="text-4xl text-cyan-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators building their own intelligent AI
              avatars. Start free today and upgrade when you're ready for more
              power.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PricingPage;
