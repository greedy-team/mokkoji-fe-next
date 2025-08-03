export interface CommentType {
  id: number;
  content: string;
  rate: number;
  isModified: boolean;
  created_at: string;
  isWriter: boolean;
}
