"use client";
import { useRouter } from "next/navigation";
import { logout } from "./utils/logout";

export default function Home() {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="p-2 duration-300 transition-colors rounded border border-red-500 hover:bg-red-500 text-black shadow shadow-blue-400"
      >
        Logout
      </button>
    </div>
  );
}
