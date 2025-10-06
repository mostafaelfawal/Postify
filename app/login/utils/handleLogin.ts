// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { FirebaseError } from "firebase/app";

import handleErrors from "./handleErrors";
import { handlesParams } from "../types";
import toast from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function handleLogin(
  router: AppRouterInstance,
  { inLogin, entry, setErrors }: handlesParams
) {
  if (!handleErrors({ inLogin, entry, setErrors })) return; // خطأ في الحقول
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      entry.email,
      entry.password
    ); // تسجيل الدخول
    toast.success(
      `👋 مرحبًا بعودتك، ${
        userCredential.user.displayName || "posti-User"
      }! سعيدون برؤيتك مجددًا على Postify.`
    );

    setTimeout(() => router.push("/home"), 800);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-credential") {
        toast.error("البريد الألكتروني او كلمة المرور خاطئين");
      }
    }
  }
}
