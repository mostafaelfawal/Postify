"use client";
import { Toaster } from "react-hot-toast";
import LoginLayout from "./components/LoginLayout";

export default function LoginPage() {
  return (
    <>
      <LoginLayout />
      <Toaster position="bottom-left" />
    </>
  );
}
