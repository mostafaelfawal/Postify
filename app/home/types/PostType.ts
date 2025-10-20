export interface PostType {
  id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  createdAt?: { seconds: number; nanoseconds: number };
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
}
