"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";

export default function Post() {
  const [isLike, setLike] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <article className="space-y-5 rounded-2xl border border-lightly bg-bg/80 dark:bg-darkly/40 shadow-sm backdrop-blur-sm w-full sm:w-[70%] sm:max-w-2xl p-5 transition-all duration-300 hover:shadow-md">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
        <div className="size-10 rounded-full overflow-hidden">
          <Image src="/7.png" alt="avatar" width={100} height={100} />
        </div>
        <div>
          <p className="font-semibold hover:underline">مصطفى حمدي</p>
          <p className="text-lightly flex items-center gap-2 text-sm">
            19/10/2025 • <FaEarthAsia className="text-xs" />
          </p>
        </div>
      </div>

      {/* ===== Post Text ===== */}
      <div className="flex flex-col">
        <p
          className={`${
            !showMore && "line-clamp-2"
          } text-darkly dark:text-white font-medium leading-relaxed`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          distinctio numquam perspiciatis, assumenda aperiam natus vel inventore
          dignissimos quidem repellendus, impedit, illum nam odit incidunt
          dolorum excepturi necessitatibus voluptatem culpa.
        </p>

        <button
          onClick={() => setShowMore(!showMore)}
          className="self-start text-lightly text-sm hover:underline hover:text-main mt-1"
        >
          {showMore ? "عرض أقل" : "عرض المزيد"}
        </button>
      </div>

      {/* ===== Post Image ===== */}
      <div className="rounded-lg relative h-60 overflow-hidden">
        <Image
          src="/Userbackground.jpg"
          alt="post image"
          fill
          className="object-cover"
        />
      </div>

      {/* ===== Stats ===== */}
      <div className="space-y-3 text-lightly text-sm">
        <div className="flex justify-between items-center border-b border-lightly pb-2">
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-main" /> <span>12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              12 <FaComment />
            </span>
            •
            <span className="flex items-center gap-2">
              0 <FaShare />
            </span>
          </div>
        </div>

        {/* ===== Actions ===== */}
        <div className="flex justify-between gap-3 pt-1">
          {/* Like */}
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.03, ease: "easeOut" },
            }}
            onClick={() => setLike(!isLike)}
            className={`${
              isLike
                ? "text-main font-semibold"
                : "text-darkly dark:text-lightly"
            } w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20`}
          >
            <FaThumbsUp />
            أعجبني
          </motion.button>

          {/* Comment */}
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.03, ease: "easeOut" },
            }}
            className="text-darkly dark:text-lightly w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20"
          >
            <FaComment />
            تعليق
          </motion.button>

          {/* Share */}
          <motion.button
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.03, ease: "easeOut" },
            }}
            className="text-darkly dark:text-lightly w-full flex items-center justify-center gap-2 py-2 rounded-md transition-all duration-150 hover:bg-gray-100 dark:hover:bg-lightly/20"
          >
            <FaShare />
            مشاركة
          </motion.button>
        </div>
      </div>
    </article>
  );
}
