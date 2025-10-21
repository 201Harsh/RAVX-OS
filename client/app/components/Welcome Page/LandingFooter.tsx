import React from "react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

const LandingFooter = ({ itemVariants }: any) => {
  return (
    <>
      <motion.footer
        variants={itemVariants}
        className="border-t border-gray-800 pt-12 pb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-lg font-light">RAVX OS</span>
          </motion.div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            {[FiGithub, FiInstagram, FiLinkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Icon className="text-xl" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            © 2024 RAVX OS. The future of personal AI.
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default LandingFooter;
