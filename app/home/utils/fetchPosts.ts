import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { PostType } from "../types/PostType";

export const fetchPosts = async (lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
  const postsRef = collection(db, "posts");

  // الاستعلام مع ترتيب زمني وحد أقصى
  let q = query(postsRef, orderBy("createdAt", "desc"), limit(5));

  if (lastDoc) {
    q = query(postsRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(5));
  }

  const snapshot = await getDocs(q);

  // تحويل بيانات Firebase إلى PostType[]
  const posts: PostType[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      authorId: data.authorId || "",
      createdAt: data.createdAt || { seconds: Date.now() / 1000, nanoseconds: 0 },
      likesCount: data.likesCount || 0,
      commentsCount: data.commentsCount || 0,
      sharesCount: data.sharesCount || 0,
    };
  });

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  return { posts, lastVisible };
};
