"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorText from "./ErrorText";

export default function EmailPassword({
  entry,
  setEntry,
  errors,
}: {
  entry: { email: string; password: string };
  setEntry: (value: { email: string; password: string }) => void;
  errors?: { email?: string; password?: string };
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      {/* ===== Email ===== */}
      <div>
        <input
          value={entry.email}
          onChange={(e) => setEntry({ ...entry, email: e.target.value })}
          type="email"
          placeholder="البريد الإلكتروني"
          className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main w-full"
        />
        {errors?.email && <ErrorText error={errors.email} />}
      </div>

      {/* ===== Password ===== */}
      <div className="relative">
        <input
          value={entry.password}
          onChange={(e) => setEntry({ ...entry, password: e.target.value })}
          type={showPassword ? "text" : "password"}
          placeholder="كلمة المرور"
          className="p-3 rounded-lg bg-bg text-darkly placeholder-lightly outline-none border focus:ring-2 focus:ring-main w-full"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute top-4 left-3 text-lightly"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors?.password && <ErrorText error={errors.password} />}
      </div>
    </>
  );
}
