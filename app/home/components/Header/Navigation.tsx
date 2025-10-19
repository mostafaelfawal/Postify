"use client";

import Tooltip from "@/app/components/Tooltip";
import { auth } from "@/app/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { FaHome, FaInfo, FaPills, FaUser } from "react-icons/fa";

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Navigation({
  mobile = false,
  onLinkClick,
}: NavigationProps) {
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
    { name: "عنّا", icon: <FaInfo />, href: "#" },
    { name: "الإشعارات", icon: <FaPills />, href: "#" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        mobile
          ? "flex flex-col items-center gap-4 py-4 text-lg"
          : "flex items-center gap-6 text-lightly dark:text-gray-300"
      }`}
    >
      {navLinks.map((link, i) => (
        <Tooltip key={i} message={link.name} side="bottom">
          <Link
            href={link.href}
            onClick={onLinkClick}
            className={`flex flex-1 text-xl border-b-3 border-b-main items-center gap-2 hover:text-main transition-colors ${
              mobile && "text-gray-700 dark:text-gray-200"
            }`}
          >
            {link.icon}
          </Link>
        </Tooltip>
      ))}
    </motion.nav>
  );
}
