import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
  DocumentSnapshot,
} from "firebase/firestore";

export async function fetchPosts(lastDoc: DocumentSnapshot | null = null) {
  const postsRef = collection(db, "posts");
  const q = lastDoc
    ? query(
        postsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(5)
      )
    : query(postsRef, orderBy("createdAt", "desc"), limit(5));

  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

  return { posts, lastVisible };
}
