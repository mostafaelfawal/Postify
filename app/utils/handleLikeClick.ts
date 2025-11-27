import { db } from "@/app/firebase";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

let audio: HTMLAudioElement | null = null;

export async function handleLikeClick(
  postId: string,
  userId: string | undefined,
  isLike: boolean,
  authorId: string | undefined,
  setLike: (v: boolean) => void,
  setLikes: React.Dispatch<React.SetStateAction<number>>
) {
  try {
    if (!userId) return; // تأكيد أن المستخدم مسجل دخول

    const postRef = doc(db, "posts", postId);
    const likeRef = doc(collection(postRef, "likedBy"), userId);

    const userRef = authorId ? doc(db, "users", authorId) : null;

    if (isLike) {
      // 🔹 المستخدم بالفعل عامل لايك → احذف اللايك
      setLike(false);
      setLikes((prev) => Math.max(0, prev - 1));
      await deleteDoc(likeRef);
      await updateDoc(postRef, { likesCount: increment(-1) });

      if (userRef) {
        await updateDoc(userRef, { likesCount: increment(-1) }); // تحديث likesCount للمستخدم
      }
    } else {
      // 🔹 المستخدم مش عامل لايك → أضف لايك جديد
      setLike(true);
      setLikes((prev) => prev + 1);

      // 🔊 تشغيل صوت اللايك
      if (!audio) {
        audio = new Audio("/sounds/like.wav");
      }
      audio.currentTime = 0;
      audio.play();

      await setDoc(likeRef, { likedAt: serverTimestamp() });
      await updateDoc(postRef, { likesCount: increment(1) });

      if (userRef) {
        await updateDoc(userRef, { likesCount: increment(1) }); // تحديث likesCount للمستخدم
      }
    }
  } catch (error) {
    console.error("❌ Error handling like:", error);
  }
}
