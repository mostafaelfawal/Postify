"use client";
import Tooltip from "@/app/components/Tooltip";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { UserData } from "../types/UserData";

export default function Header({ id }: { id: string }) {
  const [user, setUser] = useState<UserData>({
    userName: "PostiUser",
    email: "example",
    avatar: "",
    coverImage: "",
    postsCount: 0,
    likesCount: 0,
  });
  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data() as UserData);
      }
    };
    getUserData();
  }, [id]);

  return (
    <header className="relative w-full rounded-b-2xl overflow-hidden shadow-sm border-b border-lightly/40 dark:border-lightly bg-bg/80 dark:bg-darkly/40 mb-10">
      {/* ===== Cover Photo ===== */}
      <div className="relative h-40 sm:h-72 w-full">
        <Image
          src={user.coverImage || "/default-cover.jpg"}
          alt="cover photo"
          fill
          className="object-cover brightness-90 rounded-b-xl"
        />
        {/* ===== Avatar ===== */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative size-28 sm:size-32 rounded-full border-[4px] border-bg dark:border-gray-700 shadow-md overflow-hidden">
            <Image
              src={user.avatar || "/default_avatar.png"}
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
          <h1 className="font-bold text-2xl sm:text-3xl">{user.userName}</h1>
        </div>
        {/* Email */}
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          {user.email}
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
                {user.likesCount}
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
                {user.postsCount}
              </p>
              <p className="text-sm text-lightly">منشور</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
