'use client';

import { getSession } from 'next-auth/react';
import ky from 'ky';
import { RecruitmentDetail } from '@/views/club/model/type';
import { ApiResponse } from '@/shared/model/type';

async function getRecruitmentDetail(
  recruitmentId: number,
): Promise<RecruitmentDetail | null> {
  try {
    const session = await getSession();

    const response: ApiResponse<RecruitmentDetail> = await ky
      .get(`${process.env.NEXT_PUBLIC_API_URL}recruitments/${recruitmentId}`, {
        headers: session?.accessToken
          ? { Authorization: `Bearer ${session.accessToken}` }
          : undefined,
      })
      .json();

    return response.data ?? null;
  } catch {
    return null;
  }
}

export default getRecruitmentDetail;
