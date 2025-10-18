"use client";
import Tooltip from "@/app/components/Tooltip";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

export default function Header() {
  return (
    <header className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-lightly/40 dark:border-darkly/30 bg-bg/80 dark:bg-darkly/40 backdrop-blur-sm mb-10">
      {/* ===== Cover Photo ===== */}
      <div className="relative h-56 sm:h-72 w-full">
        <Image
          src="/Userbackground.jpg"
          alt="cover photo"
          fill
          className="object-cover brightness-90"
        />
        {/* ===== Avatar ===== */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative size-28 sm:size-32 rounded-full border-[4px] border-bg dark:border-gray-700 shadow-md overflow-hidden">
            <Image
              src="/7.png"
              alt="avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Edit button on avatar */}
          <Tooltip message="تعديل الملف الشخصي" side="right">
            <button className="absolute bottom-1 right-1 p-2 rounded-full bg-bg dark:bg-darkly border border-lightly/40 dark:border-darkly/30 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
              <FaPen className="text-sm" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* ===== Profile Info ===== */}
      <div className="pt-20 pb-8 px-6 sm:px-10 text-center space-y-4">
        {/* Name */}
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-main via-main-dark to-main-light">
          <h1 className="font-bold text-2xl sm:text-3xl">مصطفى حمدي</h1>
        </div>
        {/* Email */}
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          armostafa982@gmail.com
        </p>

        {/* ===== Stats ===== */}
        <div className="flex justify-center flex-wrap gap-4 mt-4">
          {/* Likes */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-main-light dark:border-main-dark bg-main/5 hover:bg-main/10 transition-colors cursor-default">
            <div className="p-2.5 bg-main/15 rounded-full">
              <AiFillLike className="text-main text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-main-dark dark:text-main/90">
                123
              </p>
              <p className="text-sm text-lightly">إعجاب</p>
            </div>
          </div>

          {/* Posts */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-green-300 dark:border-green-800 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-default">
            <div className="p-2.5 bg-green-500/15 rounded-full">
              <MdArticle className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">
                10
              </p>
              <p className="text-sm text-lightly">منشور</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
