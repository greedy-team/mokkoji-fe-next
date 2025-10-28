import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import { RecruitmentDetail } from '@/views/recruit/model/type';
import api from '@/shared/api/auth-api';

async function getRecruitDetail(id: number) {
  try {
    const response: ApiResponse<RecruitmentDetail> = await api
      .get(`recruitments/${id}`)
      .json();
    return { ok: true, data: response.data, status: 200 };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getRecruitDetail;
