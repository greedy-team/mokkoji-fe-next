import { ClubComment } from '@/entities/club-detail/model/type';

export default async function fetchComments(
  clubId: number,
  accessToken?: string,
): Promise<ClubComment[]> {
  const headers: HeadersInit = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const commentsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${clubId}`,
    { headers },
  );
  if (!commentsResponse.ok) return [];

  const json = await commentsResponse.json();
  return json.data?.comments ?? [];
}
