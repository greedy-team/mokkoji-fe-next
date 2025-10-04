import api from '@/shared/api/auth-api';
import { CommentType } from '../../recruit-detail/model/type';

interface CommentsResponse {
  data: {
    comments: CommentType[];
  };
}

export default async function getClubDetailComments(
  clubId: number,
): Promise<CommentsResponse> {
  const response = await api.get(`comments/${clubId}`).json<CommentsResponse>();

  return response;
}
