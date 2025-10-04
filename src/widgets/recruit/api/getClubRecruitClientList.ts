// src/shared/api/client/getClubRecruitList.ts
import { ApiResponse, ClubCategory } from '@/shared/model/type';
import ky from 'ky';
import { RecruitmentResponse } from '@/widgets/recruit/model/type';
import { Session } from 'next-auth';

async function getClubRecruitClientList({
  page,
  size,
  category,
  session,
}: {
  page: number;
  size: number;
  category?: ClubCategory;
  session: Session | null;
}) {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('size', String(size));

  if (category) params.set('category', category);

  let res;
  if (!session?.accessToken) {
    res = await ky.get(
      `${process.env.NEXT_PUBLIC_API_URL}/recruitments?${params.toString()}`,
    );
  } else {
    res = await ky.get(
      `${process.env.NEXT_PUBLIC_API_URL}/recruitments?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );
  }

  if (!res.ok) {
    throw new Error('Failed to fetch recruitments');
  }

  const data: ApiResponse<RecruitmentResponse> = await res.json();
  return data.data;
}

export default getClubRecruitClientList;
