import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const handleShareClick = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    toast.promise(updateDoc(postRef, { sharesCount: increment(1) }), {
      loading: "جاري المشاركة...",
      error: "حدث خطأ أثناء المشاركة.",
      success: "تمت المشاركة بنجاح!",
    });
  } catch (error) {
    console.error("Error sharing post:", error);
  }
};
