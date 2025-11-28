"use client";
import Tooltip from "@/app/components/Tooltip";
import { auth } from "@/app/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBell, FaHome, FaInfo, FaUser } from "react-icons/fa";

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Navigation({
  mobile = false,
  onLinkClick,
}: NavigationProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: "الرئيسية", icon: <FaHome />, href: "/home" },
    {
      name: "أنا",
      icon: <FaUser />,
      href: `/home/profile/${auth.currentUser?.uid}`,
    },
    {
      name: "عنّا",
      icon: <FaInfo />,
      href: "https://mostafa-hamdi-one.vercel.app/",
    },
    { name: "الإشعارات", icon: <FaBell />, href: "/" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${
        mobile
          ? "flex-col items-center gap-4 py-4 text-lg"
          : "items-center gap-4 text-lightly dark:text-gray-300"
      }`}
    >
      {navLinks.map(({ name, icon, href }) => {
        const isActive = pathname === href;

        return (
          <Tooltip key={href} message={name}>
            <Link
              href={href}
              target={name === "عنّا" ? "_blank" : "_self"}
              onClick={onLinkClick}
              className={`relative h-full flex items-center gap-2 px-5 text-xl transition-colors rounded-lg
                ${
                  isActive
                    ? "text-main"
                    : "hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {icon}

              {/* الخط السفلي للصفحة الحالية */}
              {!mobile && isActive && (
                <span className="absolute bottom-0 left-0 w-full border-b-[3px] border-b-main" />
              )}
            </Link>
          </Tooltip>
        );
      })}
    </motion.nav>
  );
}
