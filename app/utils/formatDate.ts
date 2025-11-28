import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp) => {
  return new Date(timestamp?.toDate()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
