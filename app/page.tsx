"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";
import HomePage from "./home/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <HomePage />;
}
