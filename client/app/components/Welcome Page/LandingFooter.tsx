import React from "react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const LandingFooter = ({ itemVariants }: any) => {
  const socials = [
    {
      icon: FiGithub,
      link: "https://github.com/201Harsh",
    },
    {
      icon: FiInstagram,
      link: "https://www.instagram.com/harsh.devx/",
    },
    {
      icon: FiLinkedin,
      link: "https://www.linkedin.com/in/201harsh/",
    },
  ];
  return (
    <>
      <motion.footer
        variants={itemVariants}
        className="border-t border-gray-800 pt-12 pb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Image src="/img/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-light tracking-widest">
                RAVX OS
              </span>
            </Link>
          </motion.div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            {socials.map(({ icon: Icon, link }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Icon className="text-xl" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-300 text-sm">
            © 2024 <span className="font-semibold text-cyan-400">RAVX OS</span>.
            The future of personal AI
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default LandingFooter;
