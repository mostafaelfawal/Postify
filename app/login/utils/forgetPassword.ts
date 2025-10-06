import { auth } from "@/app/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

export default async function forgetPassword(email: string) {
  
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success(
      "📩 تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يُرجى التحقق أيضًا من مجلد الرسائل غير المرغوب فيها (Spam)."
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("حدث خطأ غير متوقع.");
    }
  }
}
