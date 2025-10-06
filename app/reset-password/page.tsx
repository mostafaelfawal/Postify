"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // تحقق هل الرابط صحيح من Firebase
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      toast.error("الرابط غير صالح أو منتهي الصلاحية");
      router.push("/login");
      return;
    }

    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      toast.error("لم يتم العثور على البريد الإلكتروني");
      router.push("/login");
    }
  }, [router, searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      toast.error("حدث خطأ أثناء التحقق من البريد الإلكتروني");
      setLoading(false);
      return;
    }

    try {
      // تسجيل الدخول باستخدام الرابط
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (!result.user) throw new Error("تعذر تسجيل الدخول بالرابط");

      // تحديث كلمة المرور الجديدة
      await updatePassword(result.user, password);

      toast.success("✅ تم تغيير كلمة المرور بنجاح");
      window.localStorage.removeItem("emailForSignIn");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء إعادة التعيين");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleResetPassword}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          إعادة تعيين كلمة المرور
        </h2>

        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 duration-200 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-block size-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "تحديث كلمة المرور"
          )}
        </button>
      </form>
    </div>
  );
}
