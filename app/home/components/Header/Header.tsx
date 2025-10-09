"use client";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Logo from "./Logo";
import RightSection from "./RightSection";

export default function Header() {

  return (
    <header
      className={`w-full px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-2 
      bg-bg text-darkly dark:bg-darkly dark:text-white transition-colors duration-300`}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Logo /> {/* عدم استخدام motion داخل Logo بسبب الSEO */}
      </motion.div>

      <Navigation />

      {/* Right section */}
      <RightSection />
    </header>
  );
}
