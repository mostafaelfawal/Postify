import { EntryType, handlesParams } from "../types";

export default function handleErrors({inLogin, entry, setErrors}: handlesParams) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const newErrors: EntryType = { email: "", password: "", name: "" };

  if (!inLogin && !entry.name) {
    newErrors.name = "ادخل اسمك أولًا";
  }

  if (!entry.email) {
    newErrors.email = "ادخل بريدك الإلكتروني أولًا";
  } else if (!regex.test(entry.email)) {
    newErrors.email = "البريد الإلكتروني غير صالح";
  }

  if (!entry.password) {
    newErrors.password = "ادخل كلمة المرور أولًا";
  } else if (entry.password.trim().length < 6) {
    newErrors.password = "كلمة المرور أقل من 6 أحرف";
  }

  setErrors(newErrors);
  return !newErrors.email && !newErrors.password && !newErrors.name;
}
