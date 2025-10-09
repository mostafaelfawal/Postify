import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

export default function Header() {
  return (
    <header className="space-y-20 dark:bg-darkly bg-bg dark:text-bg text-darkly">
      <div className="h-50 relative">
        <Image
          src="/Userbackground.jpg"
          alt="user paner"
          fill
          className="object-cover"
        />
        <div className="absolute -bottom-15 right-10">
          <div className="size-30 rounded-full bg-bg dark:bg-darkly outline-5 outline-main">
            <Image src="/icon.png" alt="Avatar" fill className="object-cover" />
          </div>
          <button className="gap-2 group absolute bottom-0 left-0 rounded-full dark:bg-darkly bg-bg border border-gray-400 p-2 flex justify-center items-center">
            <FaPen />
            <span className="hidden group-hover:block">عدّل الملف</span>
          </button>
        </div>
      </div>
      <div className="px-10 space-y-3">
        <div>
          <div className="bg-clip-text bg-linear-to-br from-main-dark w-fit via-main to-main-light">
            <p className="font-semibold text-3xl text-transparent">
              مصطفى حمدي
            </p>
          </div>
          <p className="text-gray-400">email@example.com</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center gap-4 p-4 rounded-xl border dark:border-main-dark border-main-light">
            <div className="p-3 bg-main/10 rounded-full">
              <AiFillLike className="text-main text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-main/80 text-main-dark">
                123
              </p>
              <p className="text-sm text-lightly">اعجاب</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border dark:border-green-800 border-green-300">
            <div className="p-3 bg-green-500/10 rounded-full">
              <AiFillLike className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800 dark:text-green-500/80">
                10
              </p>
              <p className="text-sm text-lightly">منشور</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-5 rounded-xl h-30 border-green-500">
        <p>مكون المنشور</p>
      </div>
    </header>
  );
}
