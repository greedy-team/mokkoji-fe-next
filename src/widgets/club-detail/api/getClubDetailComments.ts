import serverApi from '@/shared/api/server-api';
import { CommentType } from '../../recruit-detail/model/type';

interface CommentsResponse {
  data: {
    comments: CommentType[];
  };
}

export default async function getClubDetailComments(
  clubId: number,
  accessToken: string,
): Promise<CommentsResponse> {
  const response = await serverApi
    .get(`comments/${clubId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json<CommentsResponse>();

  return response;
}
