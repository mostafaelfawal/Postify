import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import UserToFirebase from "./userToFirebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { EntryType } from "../types";
import { auth } from "@/app/firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function handleSignup(
  entry: EntryType,
  router: AppRouterInstance
) {
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
