"use client";
import { motion } from "framer-motion";

export default function ErrorText({ error }: { error: string }) {
  return (
    <motion.p
      initial={{ x: -5, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="text-red-500 text-sm mt-1"
    >
      {error}
    </motion.p>
  );
}
