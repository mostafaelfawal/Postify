"use client";
import { ReactNode, useEffect } from "react";
import Header from "./components/Header/Header";

export default function Homelayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const currentTheme: string = window.localStorage.getItem("theme") || "";
    document.documentElement.className = currentTheme;
  }, []);
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
