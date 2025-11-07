"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

interface LandingHeaderProps {
  itemVariants: any;
}

const LandingHeader = ({ itemVariants }: LandingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = [
    {
      name: "Features",
      link: "/features",
    },
    {
      name: "Demo",
      link: "/demo",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Documentation",
      link: "/docs",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        variants={itemVariants}
        className="flex justify-between items-center mb-20 fixed top-0 left-0 right-0 z-50 md:px-20 px-10 py-12 backdrop-blur-xl bg-black/10"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Image src="/img/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-light tracking-widest">RAVX OS</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex space-x-8"
          variants={itemVariants}
        >
          {NavLinks.map(({ name, link }, index: number) => (
            <Link
              key={index}
              href={link}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
            >
              {name}
            </Link>
          ))}
        </motion.nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/register">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 px-6 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              Launch OS
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
        >
          <FiMenu className="text-2xl" />
        </motion.button>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop Blur */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/"
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-cyan-400 text-xs font-bold">
                          RX
                        </span>
                      </div>
                    </div>
                    <span className="text-xl font-light tracking-widest">
                      RAVX OS
                    </span>
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  <FiX className="text-2xl" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-6 space-y-8">
                {NavLinks.map(({ name, link }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link}
                      className="flex items-center justify-between text-2xl font-light text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-4 border-b border-gray-700/50"
                      onClick={closeMobileMenu}
                    >
                      <span>{name}</span>
                      <FiArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <motion.div
                className="p-6 border-t border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="space-y-4">
                  <Link href="/register" onClick={closeMobileMenu}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
                    >
                      <span>Launch RAVX OS</span>
                      <FiArrowRight className="text-lg" />
                    </motion.button>
                  </Link>

                  <Link href="/demo" onClick={closeMobileMenu}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>View Demo</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Additional Info */}
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-gray-400 text-sm">
                    Create your AI avatar in seconds
                  </p>
                  <p className="text-cyan-400 text-xs mt-1">
                    No coding required • Free to start
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingHeader;
