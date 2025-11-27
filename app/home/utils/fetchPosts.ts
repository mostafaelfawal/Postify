import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
  limit,
  query,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { PostType } from "../types/PostType";

export const fetchPosts = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  const postsRef = collection(db, "posts");
  let q = query(postsRef, orderBy("createdAt", "desc"), limit(5));

  if (lastDoc) {
    q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(5)
    );
  }

  const snapshot = await getDocs(q);

  const posts: PostType[] = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();

      // جلب بيانات المستخدم من users/{authorId}
      let authorName = "مستخدم غير معروف";
      let authorAvatar = "/default_avatar.png";

      if (data.authorId) {
        const userRef = doc(db, "users", data.authorId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          authorName = userData.userName || authorName;
          authorAvatar = userData.avatar || authorAvatar;
        }
      }

      return {
        id: docSnap.id,
        content: data.content || "",
        imageUrl: data.imageUrl || "",
        authorId: data.authorId || "",
        createdAt: data.createdAt || {
          seconds: Date.now() / 1000,
          nanoseconds: 0,
        },
        likesCount: data.likesCount || 0,
        commentsCount: data.commentsCount || 0,
        sharesCount: data.sharesCount || 0,
        authorName,
        authorAvatar,
      };
    })
  );

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  return { posts, lastVisible };
};
