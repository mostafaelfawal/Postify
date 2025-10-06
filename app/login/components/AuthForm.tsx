"use client";
import { AnimatePresence, motion } from "framer-motion";
// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import EmailPassword from "./EmailPassword";
import SwitchAuthButtons from "./SwitchAuthButtons";
import GoogleAuthButton from "./GoogleAuthButton";
import FormHeader from "./FormHeader";
import OR from "./OR";
import ErrorText from "./ErrorText";

import { EntryType } from "../types";
// utils
import handleLogin from "../utils/handleLogin";
import handleSignup from "../utils/handleSignup";

export default function AuthForm({
  inLogin,
  setInLogin,
}: {
  inLogin: boolean;
  setInLogin: (v: boolean) => void;
}) {
  const router = useRouter();

  const [entry, setEntry] = useState<EntryType>({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<EntryType>({
    email: "",
    password: "",
    name: "",
  });

  const handleClickSignLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (inLogin) {
      handleLogin(router, { inLogin, entry, setErrors });
    } else {
      handleSignup(entry, router);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white relative">
      <FormHeader inLogin={inLogin} />
      <AnimatePresence mode="wait">
        {inLogin ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col w-full max-w-sm space-y-4"
          >
            <EmailPassword entry={entry} setEntry={setEntry} errors={errors} />
            <button
              onClick={(e) => handleClickSignLogIn(e)}
              className="mt-2 p-3 bg-main rounded-lg hover:bg-main-dark duration-200 text-white font-semibold"
            >
              تسجيل الدخول
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="signup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col w-full max-w-sm space-y-4"
          >
            <div>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => setEntry({ ...entry, name: e.target.value })}
                placeholder="اسم المستخدم"
                className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main w-full"
              />
              {errors.name && <ErrorText error={errors.name} />}
            </div>

            <EmailPassword entry={entry} setEntry={setEntry} errors={errors} />

            <button
              onClick={(e) => handleClickSignLogIn(e)}
              className="mt-2 p-3 bg-main rounded-lg hover:bg-main-dark duration-200 text-white font-semibold"
            >
              إنشاء حساب
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <SwitchAuthButtons inLogin={inLogin} setInLogin={setInLogin} />
      <OR />
      <GoogleAuthButton inLogin={inLogin} />
    </div>
  );
}
