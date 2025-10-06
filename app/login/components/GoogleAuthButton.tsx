"use client";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase";
import { FirebaseError } from "firebase/app";
import UserToFirebase from "../utils/userToFirebase";

export default function GoogleAuthButton({ inLogin }: { inLogin: boolean }) {
  async function handleGoogleLogin() {
    try {
      const googleAuth = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleAuth);
      const user = result.user;
      toast.success(
        inLogin
          ? `👋 مرحبًا بعودتك، ${
              user.displayName || "posti-User"
            }! سعيدون برؤيتك مجددًا على Postify.`
          : "🎉 أهلًا بك في Postify! انضم إلى المحادثات وشارك لحظاتك الأولى معنا."
      );
      UserToFirebase(user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  }
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleGoogleLogin}
      className="mt-6 flex items-center justify-center gap-2 border border-lightly text-darkly p-3 rounded-lg hover:bg-bg transition-colors shadow-sm"
    >
      <FaGoogle className="text-lg" />
      {inLogin ? "تسجيل الدخول بواسطة Google" : "إنشاء حساب باستخدام Google"}
    </motion.button>
  );
}
