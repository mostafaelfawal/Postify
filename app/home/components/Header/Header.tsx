"use client";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Logo from "./Logo";
import RightSection from "./RightSection";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full px-4 md:px-6 flex items-center justify-between shadow-md sticky top-0 z-2
      bg-bg text-darkly dark:bg-darkly dark:text-white dark:border-b dark:border-b-gray-600 transition-colors duration-300"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Logo />
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden h-[49px] md:flex">
        <Navigation />
      </div>

      {/* Right section */}
      <RightSection />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-12 left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 md:hidden z-2"
        >
          <Navigation mobile onLinkClick={() => setMenuOpen(false)} />
        </motion.div>
      )}
    </header>
  );
}
