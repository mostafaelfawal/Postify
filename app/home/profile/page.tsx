"use client";
import Header from "./components/Header";
import ProfilePosts from "./components/ProfilePosts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);

  if (user.loading) {
    return (
      <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto"></div>
          <p className="mt-4">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">المستخدم غير موجود</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly min-h-screen">
      <Header />
      <ProfilePosts />
    </div>
  );
}
