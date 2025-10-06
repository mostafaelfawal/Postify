import { db } from "@/app/firebase";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function UserToFirebase(user: User, router: AppRouterInstance) {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      userName: user.displayName,
      email: user.email,
      avatar:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${user.displayName}&background=0D8ABC&color=fff`,
    });

    // بعد الحفظ بنجاح
    router.replace("./home")
  } catch (error) {
    console.error("Error adding user:", error);
  }
}
