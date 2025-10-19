"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import NewPost from "./components/NewPost";
import { fetchUserData } from "../store/utils/fetchUserData";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUserData());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <NewPost />
    </>
  );
}
