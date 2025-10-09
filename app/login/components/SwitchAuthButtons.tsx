"use client";

import { useState, useEffect } from "react";
import forgetPassword from "../utils/forgetPassword";
import toast from "react-hot-toast";

export default function SwitchAuthButtons({
  inLogin,
  setInLogin,
  email,
}: {
  inLogin: boolean;
  setInLogin: (v: boolean) => void;
  email: string;
}) {
  const [cooldown, setCooldown] = useState(0);

  // تقليل العداد كل ثانية
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleForgetPassword = () => {
    if (!email) {
      toast.error("من فضلك أدخل البريد الإلكتروني أولاً");
      return;
    }
    forgetPassword(email).then(() => setCooldown(59));
  };

  return (
    <div className="flex w-full max-w-sm justify-between text-sm mt-4">
      <button
        onClick={() => setInLogin(!inLogin)}
        className="hover:underline text-main font-bold"
      >
        {inLogin ? "إنشاء حساب جديد" : "العودة لتسجيل الدخول"}
      </button>

      {inLogin && (
        <div className="flex flex-col items-end">
          <button
            onClick={handleForgetPassword}
            disabled={cooldown > 0} // يمنع الضغط أثناء فترة التهدئة
            className={`font-bold transition-all ${
              cooldown > 0
                ? "text-lightly cursor-default!"
                : "text-main hover:underline"
            }`}
          >
            {cooldown > 0
              ? `إعادة الإرسال بعد ${cooldown} ثانية`
              : "نسيت كلمة المرور؟"}
          </button>
        </div>
      )}
    </div>
  );
}
