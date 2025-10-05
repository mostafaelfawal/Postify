"use client";

import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary via-secondary-dark to-primary-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row-reverse w-full max-w-4xl backdrop-blur-lg bg-white/20 rounded-2xl overflow-hidden shadow-lg"
      >
        {/* الجانب الأيمن (اللوجو) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark p-8 text-center relative overflow-hidden"
        >
          {/* خلفية زخرفية */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

          {/* أيقونة الشعار */}
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="z-10"
          >
            <FaProductHunt className="text-9xl text-secondary drop-shadow-[0_0_15px_rgba(249,168,212,0.8)]" />
          </motion.div>

          {/* النصوص */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="z-10 mt-6 max-w-md"
          >
            <h2 className="text-white text-3xl font-bold mb-3">
              مرحبًا بعودتك إلى <span className="text-secondary">Postify</span>{" "}
              💬
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              انضم إلى عالم من التفاعل والمشاركة! في{" "}
              <span className="text-secondary font-semibold">Postify</span>{" "}
              يمكنك نشر أفكارك، مشاركة لحظاتك، والتفاعل مع الآخرين بكل سهولة
              ومتعة.
            </p>
          </motion.div>
        </motion.div>

        {/* الجانب الأيسر (النموذج) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white/10 backdrop-blur-md relative overflow-hidden">
          {/* دوائر خلفية متوهجة */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/40 rounded-full blur-3xl animate-pulse" />

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-3 tracking-wide text-center"
          >
            👋 مرحبًا بعودتك!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/80 mb-8 text-center max-w-xs"
          >
            سجل دخولك وابدأ التواصل مع أصدقائك عبر{" "}
            <span className="text-primary-dark font-semibold">Postify</span>،
            حيث يجتمع الإبداع والتواصل!
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col w-full max-w-sm space-y-4 z-10"
          >
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="p-3 rounded-lg bg-white/40 text-darkly placeholder-lightly outline-none focus:ring-2 focus:ring-secondary transition-all text-right"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="p-3 rounded-lg bg-white/40 text-darkly placeholder-lightly outline-none focus:ring-2 focus:ring-secondary transition-all text-right"
            />

            <button
              type="submit"
              className="mt-2 p-3 rounded-lg bg-gradient-to-r from-primary-dark to-secondary hover:brightness-110 text-white font-semibold transition-all shadow-lg shadow-primary/30"
            >
              تسجيل الدخول
            </button>

            <div className="flex justify-between text-sm mt-2 w-full text-white/80">
              <button className="hover:underline transition-all">
                إنشاء حساب جديد
              </button>
              <button className="hover:underline transition-all">
                نسيت كلمة المرور؟
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-white/70">
              <div className="h-px w-1/4 bg-white/30" />
              <span>أو</span>
              <div className="h-px w-1/4 bg-white/30" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 flex items-center justify-center gap-2 border border-white/50 text-white p-3 rounded-lg hover:bg-white/20 transition-colors shadow-md"
            >
              <FaGoogle className="text-lg" />
              تسجيل الدخول بواسطة Google
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
