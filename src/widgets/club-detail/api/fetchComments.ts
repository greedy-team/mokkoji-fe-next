import clientApi from '@/shared/api/client-api';
import { ClubComment } from '@/entities/club-detail/model/type';

export default async function fetchComments(
  clubId: number,
): Promise<ClubComment[]> {
  try {
    const json = await clientApi
      .get(`comments/${clubId}`)
      .json<{ data?: { comments?: ClubComment[] } }>();
    return json.data?.comments ?? [];
  } catch {
    return [];
  }
}
