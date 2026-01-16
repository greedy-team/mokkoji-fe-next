'use server';

import api from '@/shared/api/auth-api';
import { RecruitmentDetail } from '@/views/club/model/type';
import { ApiResponse } from '@/shared/model/type';

async function getRecruitmentDetail(
  recruitmentId: number,
): Promise<RecruitmentDetail | null> {
  try {
    const response: ApiResponse<RecruitmentDetail> = await api
      .get(`recruitments/${recruitmentId}`)
      .json();

    return response.data ?? null;
  } catch {
    return null;
  }
}

export default getRecruitmentDetail;
