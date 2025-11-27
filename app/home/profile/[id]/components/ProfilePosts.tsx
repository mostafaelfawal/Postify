"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "@/app/firebase";
import Post from "@/app/components/Post";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

type PostData = {
  id: string;
  authorId: string;

  content: string;
  imageUrl?: string | null;
  createdAt?: { seconds: number; nanoseconds: number };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
};

export default function ProfilePosts({ id }: { id: string }) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId] = useState(id);
  const user = useSelector((state: RootState) => state.user);

  // ✅ تحميل المنشورات الخاصة بالمستخدم
  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("authorId", "==", userId),
          orderBy("createdAt", "desc") // الأحدث أولاً
        );

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostData[];

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (loading)
    return <p className="text-center text-gray-400">⏳ جاري التحميل...</p>;

  if (posts.length === 0)
    return <p className="text-center text-gray-400">🚫 لا توجد منشورات بعد.</p>;

  return (
    <div className="flex flex-col items-center gap-3 py-3">
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          content={post.content}
          imageUrl={post.imageUrl}
          createdAt={
            post.createdAt
              ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
              : ""
          }
          authorId={post.authorId}
          authorAvatar={user.avatar}
          authorName={user.userName}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          sharesCount={post.sharesCount}
        />
      ))}
    </div>
  );
}
