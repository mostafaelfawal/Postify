"use client";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUserData } from "../store/utils/fetchUserData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { fetchPosts } from "./utils/fetchPosts";
import Post from "../components/Post";
import NewPost from "./components/NewPost";
import { PostType } from "./types/PostType";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // تحميل المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(fetchUserData());
    });
    return () => unsubscribe();
  }, [dispatch]);

  // تحميل أول دفعة من المنشورات
  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      const { posts, lastVisible } = await fetchPosts();
      setPosts(posts);
      setLastDoc(lastVisible);
      setLoading(false);
    };
    loadInitialPosts();
  }, []);

  // تحميل عند التمرير للأسفل (Infinite Scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loadingMore && lastDoc) {
          setLoadingMore(true);
          const { posts: morePosts, lastVisible } = await fetchPosts(lastDoc);
          setPosts((prev) => [...prev, ...morePosts]);
          setLastDoc(lastVisible);
          setLoadingMore(false);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [lastDoc, loadingMore]);

  return (
    <section className="flex flex-col items-center gap-6 py-8">
      <NewPost />

      {loading ? (
        <div className="mt-10 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            content={post.content}
            imageUrl={post.imageUrl}
            createdAt={
              post.createdAt
                ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                : "الآن"
            }
            likesCount={post.likesCount || 0}
            commentsCount={post.commentsCount || 0}
            sharesCount={post.sharesCount || 0}
          />
        ))
      )}

      {/* تحميل إضافي */}
      {loadingMore && (
        <div className="mt-5 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      )}

      {/* مرجع الـ loader */}
      <div ref={loaderRef} className="h-10"></div>
    </section>
  );
}
