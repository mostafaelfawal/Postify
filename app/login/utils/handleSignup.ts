import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import UserToFirebase from "./userToFirebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { EntryType } from "../types";
import { auth } from "@/app/firebase";

export default async function handleSignup(entry: EntryType) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      entry.email,
      entry.password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: entry.name?.trim() });
    UserToFirebase(user);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("البريد الألكتروني مستخدم بالفعل");
      }
    }
  }
}
