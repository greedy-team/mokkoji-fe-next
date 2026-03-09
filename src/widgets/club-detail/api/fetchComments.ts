import { CommentType } from '@/entities/club-detail/model/type';

export default async function fetchComments(
  clubId: number,
  accessToken?: string,
): Promise<CommentType[]> {
  const headers: HeadersInit = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${clubId}`,
    { headers },
  );
  if (!res.ok) return [];

  const json = await res.json();
  return json.data?.comments ?? [];
}
