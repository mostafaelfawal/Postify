import { db } from "@/app/firebase";
import { formatDate } from "@/app/utils/formatDate";
import { Auth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { CommentType } from "../types/commentType";

interface CommentItemProps {
  postId: string;
  comment: CommentType;
  level?: number;
  auth: Auth;
}

export default function CommentItem({
  postId,
  comment,
  level = 0,
  auth,
}: CommentItemProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = async (parentComment: CommentType) => {
    if (!replyContent.trim() || !auth.currentUser) return;

    try {
      await addDoc(collection(db, "comments"), {
        postId: postId,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "Anonymous",
        userAvatar: auth.currentUser.photoURL || "/default_avatar.png",
        content: replyContent.trim(),
        createdAt: new Date(),
        likesCount: 0,
        parentId: parentComment.id,
      });

      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <div
      className={`${
        level > 0
          ? `mr-2 border-r-2 border-gray-200 dark:border-gray-600 pr-3 ${
              level >= 3 ? "md:mr-1 md:pr-2" : ""
            }`
          : ""
      }`}
    >
      <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
        {/* الصورة - أصغر حجماً */}
        <div className="flex-shrink-0">
          <Image
            src={comment.userAvatar || "/default_avatar.png"}
            alt={comment.userName || "Posti User"}
            width={36}
            height={36}
            className="rounded-full object-cover w-8 h-8 sm:w-9 sm:h-9"
          />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
          {/* معلومات المستخدم */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <h4 className="font-semibold text-darkly dark:text-white text-xs sm:text-sm leading-tight">
              {comment.userName}
            </h4>
            <span className="text-[10px] sm:text-xs text-lightly dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          {/* نص التعليق */}
          <p className="text-darkly dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
            {comment.content}
          </p>

          {/* زر الرد - في نفس السطر على الجوال */}
          <div className="flex items-center justify-between sm:justify-start sm:gap-4 pt-1">
            <button
              onClick={() => {
                setReplyingTo(replyingTo === comment.id ? null : comment.id);
                setReplyContent("");
              }}
              className="text-[10px] sm:text-xs text-main hover:text-main-dark font-medium px-2 py-1 rounded-lg hover:bg-main/10 transition-colors"
            >
              {replyingTo === comment.id ? "إلغاء" : "رد"}
            </button>
          </div>

          {/* حقل الرد - تصميم مضغوط */}
          {replyingTo === comment.id && (
            <div className="mt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="اكتب ردك..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-darkly dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-main"
              />
              <button
                onClick={() => handleReplySubmit(comment)}
                disabled={!replyContent.trim()}
                className="px-3 py-2 bg-main hover:bg-main-dark text-white text-xs sm:text-sm rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[60px]"
              >
                إرسال
              </button>
            </div>
          )}
        </div>
      </div>

      {/* الردود - مسافة أصغر */}
      <div className="space-y-1 sm:space-y-2 mt-1 sm:mt-2">
        {comment.replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            level={level + 1}
            auth={auth}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
}
