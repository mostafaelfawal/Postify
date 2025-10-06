import { db } from "@/app/firebase";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function UserToFirebase(user: User) {
  const router = useRouter();
  try {
    const userRef = doc(db, "users", user.uid);
    setDoc(userRef, {
      userName: user.displayName,
      email: user.email,
      avatar:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${user.displayName}&background=0D8ABC&color=fff`,
    });
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => router.push("/home"), 800);
}
