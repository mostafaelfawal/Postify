import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import UserToFirebase from "./userToFirebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { handlesParams } from "../types";
import { auth } from "@/app/firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import handleErrors from "./handleErrors";

export default async function handleSignup(
  { inLogin, entry, setErrors }: handlesParams,
  router: AppRouterInstance
) {
  if (!handleErrors({ inLogin, entry, setErrors })) return; // خطأ في الحقول
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      entry.email,
      entry.password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: entry.name?.trim() });
    UserToFirebase(user, router);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("البريد الألكتروني مستخدم بالفعل");
      }
    }
  }
}
