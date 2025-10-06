import { auth } from "@/app/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

export default async function forgetPassword(email: string) {
  const actionCodeSettings = {
    url: "http://localhost:3001/login",
    handleCodeInApp: false,
  };

  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    toast.success(
      "📩 تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("حدث خطأ غير متوقع.");
    }
  }
}
