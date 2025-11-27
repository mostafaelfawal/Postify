"use client";

import { motion } from "framer-motion";
import { FaDove, FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import toggleTheme from "../../utils/toggleTheme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../utils/logout";
import Modal from "@/app/components/Modal";
import Tooltip from "@/app/components/Tooltip";

export default function RightSection() {
  const [theme, setTheme] = useState(false);
  const [showModal, setModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setModal(false);
    router.replace("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 md:gap-3"
    >
      {/* Zaajel Chat app */}
      <Tooltip message="زاجل">
        <a
          href="https://zaajel.vercel.app/"
          target="_blank"
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <FaDove size={18} />
        </a>
      </Tooltip>
      {/* Theme Toggle */}
      <Tooltip message="تبديل السمه">
        <motion.button
          onClick={() => toggleTheme(theme, setTheme)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          whileTap={{ rotate: 180, scale: 0.8 }}
        >
          {theme ? <FaSun /> : <FaMoon />}
        </motion.button>
      </Tooltip>
      {/* Logout */}
      <Tooltip message="تسجيل الخروج">
        <button
          onClick={() => setModal(true)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-red-400 dark:hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <FaSignOutAlt size={18} />
        </button>
      </Tooltip>
      {showModal && (
        <Modal
          head="تأكيد الخروج"
          isOpen={showModal}
          closeModal={() => setModal(false)}
        >
          <div className="text-center">
            {/* الأيقونة */}
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-red-300 to-red-800 rounded-full flex items-center justify-center shadow-md">
              <FaSignOutAlt className="text-white text-xl" />
            </div>

            {/* النص */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed">
              هل أنت متأكد أنك تريد تسجيل الخروج؟
            </p>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                إلغاء
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors duration-150"
              >
                تأكيد
              </button>
            </div>

            {/* نص مساعد */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              يمكنك العودة في أي وقت بتسجيل الدخول
            </p>
          </div>
        </Modal>
      )}
    </motion.div>
  );
}
