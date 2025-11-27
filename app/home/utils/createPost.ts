import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { uploadImageToCloudinary } from "../utils/uploadImage";

export type PostData = {
  content: string;
  authorId: string | undefined;
  imageFile?: File | null;
};

export async function createPost({ content, authorId, imageFile }: PostData) {
  try {
    let imageUrl: string | null = null;

    // 🔹 ارفع الصورة إلى Cloudinary إن وجدت
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    // 🔹 أنشئ المنشور في Firestore
    const postRef = await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      authorId,
      createdAt: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
    });

    // 🔹 زود postsCount للـ user
    if (authorId) {
      const userRef = doc(db, "users", authorId);
      await updateDoc(userRef, {
        postsCount: increment(1),
      });
    }

    return postRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
