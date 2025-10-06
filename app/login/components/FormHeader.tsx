"use client";
import { motion } from "framer-motion";

export default function FormHeader({ inLogin }: { inLogin: boolean }) {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-darkly mb-3 tracking-wide text-center"
      >
        {inLogin ? "👋 مرحبًا بعودتك!" : "✨ أنشئ حسابك الآن!"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-lightly mb-8 text-center max-w-xs"
      >
        {inLogin
          ? "سجل دخولك وابدأ التواصل مع أصدقائك عبر Postify!"
          : "املأ البيانات لإنشاء حسابك الجديد وابدأ رحلتك معنا!"}
      </motion.p>
    </>
  );
}
