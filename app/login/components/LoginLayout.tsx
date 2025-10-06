"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import LogoSection from "./LogoSection";
import AuthForm from "./AuthForm";

export default function LoginLayout() {
  const [inLogin, setInLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-bg to-main-light p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg"
      >
        <LogoSection inLogin={inLogin} />
        <AuthForm inLogin={inLogin} setInLogin={setInLogin} />
      </motion.div>
    </div>
  );
}
