import { auth, db } from "@/app/firebase";
import { UserData } from "@/app/home/profile/types/UserData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const fetchUserData = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("لم يتم تسجيل الدخول");

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
