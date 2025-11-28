import { Timestamp } from "firebase/firestore";

export interface CommentType {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Timestamp;
  likesCount: number;
  parentId: string | null;
  replies?: CommentType[];
}
