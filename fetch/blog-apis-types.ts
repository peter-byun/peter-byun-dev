export type Post = {
  id: number;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  lastModefiedAt: Date | null;
};

export type Comment = {
  id: number;
  content: string;
  name: string;
  email: string;
  likes: number;
  postId: number;
  parentCommentId?: number;
};

export type CommentCreateInput = {
  content: string;
  name: string;
  email: string;
  postId: number;
  parentCommentId?: number;
  childCommentId?: number;
};
