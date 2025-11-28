export interface CommentType {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: any;
  likesCount: number;
  parentId: string | null;
  replies?: CommentType[];
}
