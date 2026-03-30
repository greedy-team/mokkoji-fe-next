export interface MyComment {
  commentId: number;
  clubId: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface MyCommentsData {
  comments: MyComment[];
}
