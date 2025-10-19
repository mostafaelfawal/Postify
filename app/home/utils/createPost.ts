import { db, storage } from "@/app/firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type PostData = {
  content: string;
  authorId: string | undefined;
  imageFile?: File | null;
};

export async function createPost({ content, authorId, imageFile }: PostData) {
  try {
    let imageUrl: string | null = null;

    // 🔹 ارفع الصورة إن وجدت
    if (imageFile) {
      const imageRef = ref(
        storage,
        `posts/${authorId}/${Date.now()}_${imageFile.name}`
      );
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    // 🔹 أنشئ مستند المنشور داخل "posts"
    const postRef = await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      authorId,
      createdAt: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
    });

    // 🔹 إضافة مجموعة فرعية "likedBy" فارغة (تُستخدم لاحقاً)
    await addDoc(collection(doc(db, "posts", postRef.id), "likedBy"), {
      initialized: true, // مجرد placeholder حتى تنشأ المجموعة
    });

    return postRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
