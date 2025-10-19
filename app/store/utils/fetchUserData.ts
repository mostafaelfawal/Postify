import { auth, db } from "@/app/firebase";
import { UserData } from "@/app/home/profile/types/UserData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("لم يتم تسجيل الدخول");
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserData;
      } else {
        toast.error("المستخدم غير موجود");
        return rejectWithValue("المستخدم غير موجود");
      }
    } catch (error: any) {
      toast.error("خطأ اثناء جلب البيانات");
      console.log("Error: " + error);
      return rejectWithValue(error.message);
    }
  }
);
