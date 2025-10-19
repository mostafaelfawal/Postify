"use client";
import Modal from "@/app/components/Modal";
import Tooltip from "@/app/components/Tooltip";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiImage, FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function NewPost() {
  const [modal, setModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0d0d0d] py-8 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-3 items-center p-5 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
      >
        {/* صورة المستخدم */}
        <Tooltip message="الملف الشخصي">
          <Link
            href="/home/profile"
            className="hover:opacity-90 transition-opacity min-w-11 h-11 relative overflow-hidden rounded-full border-2 border-main"
          >
            <Image
              src={user.avatar || "/default_avatar.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </Link>
        </Tooltip>

        {/* زر فتح المودال */}
        <Tooltip message="انشأ منشور">
          <button
            onClick={() => setModal(true)}
            className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-full rounded-full text-right p-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            بم تفكر يا{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {user.userName.split(" ")[0]}؟
            </span>
          </button>
        </Tooltip>

        {/* المودال */}
        {modal && (
          <Modal
            head="إنشاء منشور"
            isOpen={modal}
            closeModal={() => setModal(false)}
          >
            {/* المحتوى */}
            <div className="p-6 space-y-6">
              {/* مربع النص */}
              <motion.textarea
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                placeholder="ما الذي تريد مشاركته اليوم؟"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all duration-200 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              />

              {/* مكان الصورة */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 bg-gray-50 dark:bg-gray-800 transition-all duration-300"
              >
                <p className="text-gray-400 dark:text-gray-500">
                  سيظهر معاينة الصورة هنا
                </p>
              </motion.div>

              {/* الأزرار */}
              <div className="flex justify-between items-center pt-4">
                {/* زر إضافة صورة */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FiImage className="w-5 h-5" />
                  إضافة صورة
                </motion.button>

                {/* زر النشر */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm"
                >
                  <FiSend className="w-4 h-4" />
                  نشر
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </motion.div>
    </section>
  );
}
