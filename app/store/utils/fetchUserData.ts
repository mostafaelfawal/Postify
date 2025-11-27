import { db } from "@/app/firebase";
import { UserData } from "@/app/home/profile/[id]/types/UserData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const fetchUserData = createAsyncThunk<
  UserData,
  string, // الآن يأخذ uid كباراميتر
  { rejectValue: string }
>("user/fetchUserData", async (uid, { rejectWithValue }) => {
  try {
    if (!uid) throw new Error("لم يتم تقديم معرف المستخدم");

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    } else {
      const msg = "المستخدم غير موجود";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "حدث خطأ غير متوقع";

    toast.error("خطأ أثناء جلب البيانات");
    console.error("Error fetching user data:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});
