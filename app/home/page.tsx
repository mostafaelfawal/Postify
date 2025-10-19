"use client"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import NewPost from "./components/NewPost";
import { fetchUserData } from "../store/utils/fetchUserData";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <NewPost />
    </>
  );
}
