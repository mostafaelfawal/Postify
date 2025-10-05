"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-12 h-12 rounded-full border-4 border-t-primary border-b-secondary border-r-secondary-dark border-l-primary-dark"
      ></motion.span>
    </motion.div>
  );
}
