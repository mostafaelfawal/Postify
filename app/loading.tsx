"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export default function Loading() {
  const [slowInternet, setSlowInternet] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlowInternet(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen bg-gradient-to-br from-bg to-main-light text-darkly">
      {/* اللوجو + الأنيميشن */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center flex-1 gap-8"
      >
        {/* اللوجو */}
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Image
            src="/icon.png"
            alt="Postify Icon"
            width={180}
            height={180}
            className="drop-shadow-lg select-none"
            priority
          />
        </motion.div>

        {/* النقاط المتحركة */}
        <div className="flex gap-3">
          <span className="bg-main animate-bounce w-4 h-4 rounded-full [animation-delay:0s]" />
          <span className="bg-main animate-bounce w-4 h-4 rounded-full [animation-delay:0.2s]" />
          <span className="bg-main animate-bounce w-4 h-4 rounded-full [animation-delay:0.4s]" />
        </div>

        {/* رسالة الانترنت البطيء */}
        {slowInternet && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-darkly font-semibold text-sm"
          >
            هناك بعض المشاكل... لحظة من فضلك ⏳
          </motion.p>
        )}
      </motion.div>

      {/* الفوتر */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-4 text-sm text-center flex justify-center items-center gap-2 text-lightly font-semibold"
      >
        <span>تم بواسطة</span>
        <FaHeart className="text-main animate-bounce" />
        <span className="text-darkly font-bold">مصطفى حمدي</span>
      </motion.footer>
    </div>
  );
}
