import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const LandingHeader = ({ itemVariants }: any) => {
  return (
    <>
      <motion.header
        variants={itemVariants}
        className="flex justify-between items-center mb-20"
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Image src="/img/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-light tracking-widest">RAVX OS</span>
          </Link>
        </motion.div>

        <motion.nav
          className="hidden md:flex space-x-8"
          variants={itemVariants}
        >
          {["Features", "Demo", "Pricing", "About"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 px-6 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
        >
          Launch OS
        </motion.button>
      </motion.header>
    </>
  );
};

export default LandingHeader;
