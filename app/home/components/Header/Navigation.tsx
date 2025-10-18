import { auth } from "@/app/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaHome, FaInfo, FaPills, FaPlusCircle, FaUser } from "react-icons/fa";

export default function Navigation() {
  // روابط الناف بار
  const navLinks: {
    name: string;
    icon: ReactElement<IconType>;
    href: string;
  }[] = [
    { name: "الرئيسية", icon: <FaHome />, href: "/home" },
    {
      name: "أنا",
      icon: <FaUser />,
      href: `/home/profile/${auth.currentUser?.uid}`,
    },
    { name: "أضف منشور", icon: <FaPlusCircle />, href: "#" },
    { name: "عنّا", icon: <FaInfo />, href: "#" },
    { name: "الأشعارات", icon: <FaPills />, href: "#" },
  ];
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center gap-6 text-lightly dark:text-gray-300"
    >
      {navLinks.map((link, i) => {
        return (
          <Link
            key={i}
            href={link.href}
            className="flex items-center gap-1 hover:text-main transition-colors"
          >
            {link.icon} {link.name}
          </Link>
        );
      })}
    </motion.nav>
  );
}
