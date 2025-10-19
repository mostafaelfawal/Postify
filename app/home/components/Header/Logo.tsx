import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/icon.png"
        alt="logo"
        width={50}
        height={50}
        className="rounded-full cursor-pointer"
        priority
        onClick={() => location.href = "/home"}
      />
      {/* Search */}
      <div className="hidden lg:block relative">
        <FaSearch className="absolute left-2 top-2 text-gray-400" />
        <input
          type="text"
          placeholder="بحث في بوستيفاي..."
          className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 
                       focus:ring-main transition w-44 md:w-60"
        />
      </div>

      {/* Mobile search icon */}
      <button className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
        <FaSearch />
      </button>
    </div>
  );
}
