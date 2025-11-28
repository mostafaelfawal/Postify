"use client";

import { FormEvent, use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShare,
  FaComment,
  FaCalendar,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { UserData } from "@/app/home/profile/[id]/types/UserData";
import { PostType } from "@/app/home/types/PostType";
import { handleLikeClick } from "@/app/utils/handleLikeClick";
import { handleShareClick } from "@/app/utils/handleShareClick";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";
import CommentItem from "./components/CommentItem";
import { CommentType } from "./types/commentType";

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<PostType | null>(null);
  const [author, setAuthor] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !auth.currentUser) return;

    setCommentLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        postId: id,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        userAvatar: auth.currentUser.photoURL || "/default_avatar.png",
        content: comment.trim(),
        createdAt: new Date(),
        likesCount: 0,
        parentId: null, // تعليق رئيسي
      });

      setComment("");
      // تحديث عدد التعليقات في البوست
      await updateDoc(doc(db, "posts", id), {
        commentsCount: (post?.commentsCount || 0) + 1,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data() as PostType;
          setPost(postData);
          setLikes(postData.likesCount || 0);
          setShares(postData.sharesCount || 0);

          // Fetch author data
          const authorDoc = await getDoc(doc(db, "users", postData.authorId));
          if (authorDoc.exists()) {
            setAuthor(authorDoc.data() as UserData);
          }

          // check is liked by current user
          if (auth.currentUser?.uid) {
            const postDoc = doc(db, "posts", id);
            const likeRef = doc(
              collection(postDoc, "likedBy"),
              auth.currentUser.uid
            );
            const like = await getDoc(likeRef);
            setIsLike(like.exists());
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  useEffect(() => {
    const commentsQuery = query(
      collection(db, "comments"),
      where("postId", "==", id),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentType[];

      // إنشاء خريطة للتعليقات باستخدام الـ id كمفتاح
      const commentMap = new Map();
      commentsData.forEach((comment) => {
        commentMap.set(comment.id, { ...comment, replies: [] });
      });

      // تنظيم التعليقات في هيكل شجري
      const organizedComments: CommentType[] = [];

      commentsData.forEach((comment) => {
        const commentWithReplies = commentMap.get(comment.id);

        if (comment.parentId) {
          // إذا كان تعليقاً فرعياً، أضفه إلى الردود الخاصة بالتعليق الأصلي
          const parentComment = commentMap.get(comment.parentId);
          if (parentComment) {
            parentComment.replies.push(commentWithReplies);
          }
        } else {
          // إذا كان تعليقاً رئيسياً، أضفه إلى القائمة الرئيسية
          organizedComments.push(commentWithReplies);
        }
      });

      setComments(organizedComments);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg dark:bg-darkly flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-main border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg dark:bg-darkly flex items-center justify-center">
        <h1 className="text-2xl text-darkly dark:text-lightly">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-darkly transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-darkly dark:text-white mb-4">
            تفاصيل المنشور
          </h1>
          <div className="w-20 h-1 bg-main rounded-full" />
        </motion.header>

        {/* Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Post Image */}
          {post.imageUrl && (
            <div className="relative overflow-hidden h-64 md:h-96">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-6">
            {/* Author Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Link
                href={`/home/profile/${post.authorId}`}
                className="relative"
              >
                <Image
                  src={author?.avatar || "/default_avatar.png"}
                  alt={author?.userName || "Posti User"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-main"
                />
              </Link>
              <div className="flex-1">
                <h3 className="font-semibold text-darkly dark:text-white text-base md:text-lg">
                  {author?.userName || "Unknown User"}
                </h3>
                <p className="text-lightly dark:text-gray-400 text-xs sm:text-sm">
                  {author?.email}
                </p>
              </div>
              <div className="flex items-center gap-2 text-lightly dark:text-gray-400 mt-2 sm:mt-0">
                <FaCalendar className="text-main" />
                <span className="text-sm">{formatDate(post.createdAt as Timestamp)}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-6">
              <p className="text-darkly dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6 gap-4 md:gap-0">
              <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                {/* Likes */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-lightly dark:text-gray-400 group"
                >
                  <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <FaHeart className="text-red-500 group-hover:text-red-600" />
                  </div>
                  <span className="font-medium">{likes}</span>
                </motion.div>

                {/* Comments */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-lightly dark:text-gray-400 group"
                >
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <FaComment className="text-main group-hover:text-main-dark" />
                  </div>
                  <span className="font-medium">{post.commentsCount}</span>
                </motion.div>

                {/* Shares */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-lightly dark:text-gray-400 group"
                >
                  <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                    <FaShare className="text-green-500 group-hover:text-green-600" />
                  </div>
                  <span className="font-medium">{shares}</span>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleLikeClick(
                      id,
                      auth.currentUser?.uid,
                      isLike,
                      post.authorId,
                      setIsLike,
                      setLikes
                    )
                  }
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 ${
                    isLike ? "bg-main" : "bg-transparent"
                  } hover:bg-main-dark hover:text-white dark:text-white rounded-full font-medium transition-colors duration-200 flex items-center gap-2`}
                >
                  <FaHeart />
                  اعجبني
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleShareClick(id);
                    setShares(shares + 1);
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-main text-main hover:bg-main hover:text-white rounded-full font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <FaShare />
                  مشاركة
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-darkly dark:text-white mb-4">
            التعليقات ({post?.commentsCount || 0})
          </h3>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب تعليقا..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-darkly dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200"
                  disabled={commentLoading}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!comment.trim() || commentLoading}
                className="w-full sm:w-auto px-5 py-3 bg-main hover:bg-main-dark text-white rounded-2xl font-medium transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="text-sm" />
                {commentLoading ? "جاري الأرسال..." : "ارسل"}
              </motion.button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  auth={auth}
                  postId={id}
                />
              ))
            ) : (
              <div className="text-center py-8 text-lightly dark:text-gray-400">
                <FaComment className="text-4xl mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Author Stats Card */}
        {author && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-main-light dark:bg-main-dark/30 rounded-full">
                <FaUser className="text-main dark:text-main-light text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-darkly dark:text-white text-lg">
                  احصائيات الناشر
                </h3>
                <p className="text-lightly dark:text-gray-400 text-sm">
                  {author.userName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-main dark:text-main-light">
                  {author.postsCount}
                </div>
                <div className="text-lightly dark:text-gray-400 text-sm">
                  منشورات
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-main dark:text-main-light">
                  {author.likesCount}
                </div>
                <div className="text-lightly dark:text-gray-400 text-sm">
                  اعجابات
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-main dark:text-main-light">
                  {post.likesCount}
                </div>
                <div className="text-lightly dark:text-gray-400 text-sm">
                  اعجابات على هذا المنشور
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
