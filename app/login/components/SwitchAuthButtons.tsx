"use client";

export default function SwitchAuthButtons({
  inLogin,
  setInLogin,
}: {
  inLogin: boolean;
  setInLogin: (v: boolean) => void;
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
        <button className="hover:underline text-main font-bold">
          نسيت كلمة المرور؟
        </button>
      )}
    </div>
  );
}
