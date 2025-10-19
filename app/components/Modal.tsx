"use client";
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  children: ReactNode;
  closeModal: VoidFunction;
  isOpen: boolean;
  head: string;
};

export default function Modal({
  children,
  closeModal,
  isOpen,
  head,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* الخلفية الشفافة */}
          <motion.div
            className="absolute inset-0 bg-black/40 dark:bg-black/70"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* محتوى المودال */}
          <motion.div
            className="
              relative bg-white dark:bg-[#1e1e1e]
              rounded-2xl shadow-2xl p-4 sm:p-6
              max-w-[95%] w-screen sm:max-w-md md:max-w-lg lg:max-w-xl
              max-h-[90vh] overflow-y-auto
              transition-all duration-300
            "
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* رأس المودال */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                {head}
              </h2>

              {/* زر الإغلاق */}
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="text-gray-600 dark:text-gray-300 text-base sm:text-lg" />
              </button>
            </div>

            {/* المحتوى */}
            <div className="text-gray-800 dark:text-gray-200">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
