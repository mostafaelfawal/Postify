import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("تم تسجيل الخروج بنجاح");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("يوجد بعض المشاكل 😖");
    }
  }
};
