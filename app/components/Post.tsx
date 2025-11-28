"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { handleLikeClick } from "../utils/handleLikeClick";
import { auth } from "../firebase";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleShareClick } from "../utils/handleShareClick";

type PostType = {
  postId: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
};

export default function Post({
  postId,
  content,
  imageUrl,
  createdAt,
  likesCount,
  commentsCount,
  sharesCount,
  authorId,
  authorName,
  authorAvatar,
}: PostType) {
  const [isLike, setLike] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState<number>(likesCount);
  const [showImage, setShowImage] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!auth.currentUser?.uid) return;

      const likeRef = doc(db, "posts", postId, "likedBy", auth.currentUser.uid);
      const likeSnap = await getDoc(likeRef);

      if (likeSnap.exists()) {
        setLike(true);
      } else {
        setLike(false);
      }
    };

    checkIfLiked();
  }, [postId, auth.currentUser?.uid]);

  return (
    <article className="space-y-5 rounded-2xl border border-lightly bg-bg/80 dark:bg-darkly/40 shadow-sm w-full sm:w-[70%] sm:max-w-2xl p-5 transition-all duration-300 hover:shadow-md">
      {/* ===== Header ===== */}
      <Link
        href={`/home/profile/${authorId}`}
        className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
      >
        <div className="size-10 rounded-full overflow-hidden">
          <Image
            src={authorAvatar || "/default_avatar.png"}
            alt="avatar"
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="font-semibold hover:underline text-main">
            {authorName}
          </p>
          <p className="text-lightly flex items-center gap-2 text-sm">
            {createdAt} • <FaEarthAsia className="text-xs" />
          </p>
        </div>
      </Link>

      {/* ===== Post Text ===== */}
      <div className="flex flex-col">
        <p
          className={`${
            !showMore && "line-clamp-2"
          } text-darkly dark:text-white font-medium leading-relaxed`}
        >
          {content}
        </p>

        {content.length > 120 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="self-start text-lightly text-sm hover:underline hover:text-main mt-1"
          >
            {showMore ? "عرض أقل" : "عرض المزيد"}
          </button>
        )}
      </div>

      {/* ===== Post Image ===== */}
      {imageUrl && (
        <div
          onClick={() => setShowImage(true)}
          className="rounded-lg relative w-full overflow-hidden cursor-pointer"
        >
          <Image
            src={imageUrl}
            alt="post image"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* ===== Stats ===== */}
      <div className="space-y-3 text-lightly text-sm">
        <div className="flex justify-between items-center border-b border-lightly pb-2">
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-main" /> <span>{likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              {commentsCount} <FaComment />
            </span>
            •
            <span className="flex items-center gap-2">
              {sharesCount} <FaShare />
            </span>
          </div>
        </div>

        {/* ===== Actions ===== */}
        <div className="flex justify-between gap-3 pt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              handleLikeClick(
                postId,
                auth.currentUser?.uid,
                isLike,
                authorId,
                setLike,
                setLikes
              );
            }}
            className={`${
              isLike
                ? "text-main font-semibold"
                : "text-darkly dark:text-lightly"
            } w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20`}
          >
            <FaThumbsUp />
            أعجبني
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push(`/home/post/${postId}`)}
            className="text-darkly dark:text-lightly w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20"
          >
            <FaComment />
            تعليق
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShareClick(postId)}
            className="text-darkly dark:text-lightly w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20"
          >
            <FaShare />
            مشاركة
          </motion.button>
        </div>
      </div>
      {showImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          {/* زر الإغلاق */}
          <button
            onClick={() => setShowImage(false)}
            className="z-5 absolute top-4 right-4 text-white text-2xl bg-black/40 rounded-full p-2 min-w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
            aria-label="إغلاق"
          >
            ✕
          </button>

          {/* الصورة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-h-screen overflow-y-auto relative max-w-4xl w-full mx-3"
          >
            <Image
              src={imageUrl!}
              alt="post image"
              width={1200}
              height={800}
              className="object-contain rounded-lg w-full h-auto"
            />
          </motion.div>
        </div>
      )}
    </article>
  );
}
