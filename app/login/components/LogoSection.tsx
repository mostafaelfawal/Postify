"use client";
import { motion } from "framer-motion";
import { FaProductHunt } from "react-icons/fa";

export default function LogoSection({ inLogin }: { inLogin: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:flex flex-col justify-center items-center w-1/2 bg-main text-white p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      >
        <FaProductHunt className="text-9xl text-white opacity-90" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-6 max-w-md"
      >
        {inLogin ? (
          <>
            <h2 className="text-3xl font-bold mb-3">
              مرحبًا بعودتك إلى <span className="text-main-light">Postify</span>
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              سجل دخولك وابدأ التواصل مع أصدقائك في{" "}
              <span className="font-semibold text-main-light">Postify</span> بكل
              سهولة ومتعة!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-3">
              مرحبًا بك في <span className="text-main-light">Postify</span>
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              أنشئ حسابك الآن وابدأ مشاركة أفكارك مع أصدقائك في{" "}
              <span className="font-semibold text-main-light">Postify</span>!
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
