"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";

export default function Login() {
  const [inLogin, setInLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg"
      >
        {/* الجانب الأيمن (اللوجو) */}
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
                  مرحبًا بعودتك إلى{" "}
                  <span className="text-main-light">Postify</span> 💬
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  سجل دخولك وابدأ التواصل مع أصدقائك في{" "}
                  <span className="font-semibold text-main-light">Postify</span>{" "}
                  بكل سهولة ومتعة!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-3">
                  مرحبًا بك في <span className="text-main-light">Postify</span>{" "}
                  🌟
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  أنشئ حسابك الآن وابدأ مشاركة أفكارك ولحظاتك مع أصدقائك في{" "}
                  <span className="font-semibold text-main-light">Postify</span>
                  !
                </p>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* الجانب الأيسر (النموذج) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white relative">
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
              ? "سجل دخولك وابدأ التواصل مع أصدقائك عبر Postify، حيث يجتمع الإبداع والتواصل!"
              : "املأ البيانات التالية لإنشاء حسابك الجديد وابدأ رحلتك معنا في Postify!"}
          </motion.p>

          <AnimatePresence mode="wait">
            {inLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full max-w-sm space-y-4"
              >
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main"
                />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main"
                />

                <button
                  type="submit"
                  className="mt-2 p-3 bg-main rounded-lg hover:bg-main-dark duration-200 transition-colors text-white font-semibold"
                >
                  تسجيل الدخول
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full max-w-sm space-y-4"
              >
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main w-full"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute top-4 left-3 text-lightly"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-2 p-3 bg-main rounded-lg hover:bg-main-dark duration-200 transition-colors text-white font-semibold"
                >
                  إنشاء حساب
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="flex justify-between text-sm mt-4 w-full text-lightly">
            <button
              onClick={() => setInLogin(!inLogin)}
              type="button"
              className="hover:underline text-main font-bold"
            >
              {inLogin ? "إنشاء حساب جديد" : "العودة لتسجيل الدخول"}
            </button>
            {inLogin && (
              <button
                type="button"
                className="hover:underline text-main font-bold"
              >
                نسيت كلمة المرور؟
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-6 text-lightly">
            <div className="h-px w-24 bg-lightly" />
            <span className="text-darkly">أو</span>
            <div className="h-px w-24 bg-lightly" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="mt-4 flex items-center justify-center gap-2 border border-lightly text-darkly p-3 rounded-lg hover:bg-bg transition-colors shadow-sm"
          >
            <FaGoogle className="text-lg" />
            {inLogin
              ? "تسجيل الدخول بواسطة Google"
              : "إنشاء حساب باستخدام Google"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
