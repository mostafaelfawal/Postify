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
          className="fixed inset-0 z-4 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* الخلفية الشفافة */}
          <motion.div
            className="absolute inset-0 bg-black/30 dark:bg-black/60"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* محتوى المودال */}
          <motion.div
            className="max-h-screen overflow-y-auto relative bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl p-6 w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="border-b pb-2 border-b-gray-300 dark:border-b-gray-600">
              {/* زر الإغلاق */}
              <button
                onClick={closeModal}
                className="absolute left-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="text-gray-600 dark:text-gray-300 text-base" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {head}
              </h2>
            </div>

            {/* المحتوى */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
