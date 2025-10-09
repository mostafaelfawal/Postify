"use client";

import { motion } from "framer-motion";
import { FaMoon, FaSearch, FaSignOutAlt, FaSun } from "react-icons/fa";
import toggleTheme from "../../utils/toggleTheme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../utils/logout";

export default function RightSection() {
  const [theme, setTheme] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-2 top-2 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث عن مستخدم..."
          className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 
                       focus:ring-main transition"
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={() => toggleTheme(theme, setTheme)}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        whileTap={{ rotate: 180, scale: 0.8 }}
      >
        {theme ? <FaSun /> : <FaMoon />}
      </motion.button>

      {/* Logout */}
      <motion.button
        onClick={handleLogout}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-red-400 dark:hover:bg-red-600 transition-colors flex items-center justify-center"
      >
        <FaSignOutAlt size={18} />
      </motion.button>
    </motion.div>
  );
}
