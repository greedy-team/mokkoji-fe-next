import serverApi from '@/shared/api/server-api';
import { CommentType } from '../model/type';

export default async function getClubDetailComments(
  clubId: number,
): Promise<{ comments: CommentType[] }> {
  const response = await serverApi
    .get(`comments/${clubId}`)
    .json<{ comments: CommentType[] }>();

  return response;
}
