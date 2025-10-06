"use client";

import forgetPassword from "../utils/forgetPassword";

export default function SwitchAuthButtons({
  inLogin,
  setInLogin,
  email,
}: {
  inLogin: boolean;
  setInLogin: (v: boolean) => void;
  email: string;
}) {
  return (
    <div className="flex w-full max-w-sm justify-between text-sm mt-4">
      <button
        onClick={() => setInLogin(!inLogin)}
        className="hover:underline text-main font-bold"
      >
        {inLogin ? "إنشاء حساب جديد" : "العودة لتسجيل الدخول"}
      </button>
      {inLogin && (
        <button
          onClick={() => forgetPassword(email)}
          className="hover:underline text-main font-bold"
        >
          نسيت كلمة المرور؟
        </button>
      )}
    </div>
  );
}
