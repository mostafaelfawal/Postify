import { auth } from "@/app/firebase";
import { FirebaseError } from "firebase/app";
import { sendSignInLinkToEmail } from "firebase/auth";
import toast from "react-hot-toast";

// إعدادات الرابط المرسل للمستخدم
const actionCodeSettings = {
  url: `${window.location.origin}/reset-password`, // الصفحة اللي المستخدم هيرجع ليها بعد الضغط على الرابط
  handleCodeInApp: true, // لازم تكون true عشان Firebase يعرف إنك هتتعامل مع الرابط داخل التطبيق
};

export default async function forgetPassword(email: string) {
  if (!email) {
    return toast.error("ادخل البريد الإلكتروني أولاً");
  }

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    // خزن البريد في localStorage لتستخدمه لاحقًا أثناء التحقق
    window.localStorage.setItem("emailForSignIn", email);

    toast.success("📩 تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("البريد الإلكتروني غير صالح");
          break;
        case "auth/missing-continue-uri":
          toast.error("إعدادات الرابط غير مكتملة");
          break;
        case "auth/too-many-requests":
          toast.error("تم إرسال العديد من الطلبات، حاول لاحقًا");
          break;
        default:
          toast.error("حدث خطأ ما 😖");
      }
    } else {
      toast.error("حدث خطأ غير متوقع");
    }
  }
}
