"use client";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase";
import { FirebaseError } from "firebase/app";
import UserToFirebase from "../utils/userToFirebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function GoogleAuthButton({
  inLogin,
  router,
  loading,
  setLoading,
}: {
  inLogin: boolean;
  router: AppRouterInstance;
  loading: boolean;
  setLoading: (v: boolean) => void;
}) {
  async function handleGoogleLogin() {
    setLoading(true);
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
      UserToFirebase(user, router);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      disabled={loading}
      whileTap={{ scale: 0.97 }}
      onClick={handleGoogleLogin}
      className="disabled:bg-bg mt-6 flex items-center justify-center gap-2 border border-lightly text-darkly p-3 rounded-lg hover:bg-bg transition-colors shadow-sm"
    >
      <FaGoogle className="text-lg" />
      {loading ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="size-6 rounded-full border-3 border-darkly border-b-transparent animate-spin"
        ></motion.span>
      ) : inLogin ? (
        "تسجيل الدخول بواسطة Google"
      ) : (
        "إنشاء حساب باستخدام Google"
      )}
    </motion.button>
  );
}
