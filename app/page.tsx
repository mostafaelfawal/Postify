"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/home"); // لو مسجّل دخول
      } else {
        router.push("/login"); // لو مش مسجّل دخول
      }
    }
  }, [user, loading, router]);

  return <Loading />;
}
