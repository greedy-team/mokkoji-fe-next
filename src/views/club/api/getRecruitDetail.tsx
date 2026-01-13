import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { RecruitmentDetail } from '../model/type';

async function getRecruitDetail(recruitmentId: number) {
  const session = await auth();
  try {
    let response: ApiResponse<RecruitmentDetail>;
    if (session?.accessToken) {
      response = await api.get(`recruitments/${recruitmentId}`).json();
    } else {
      response = await serverApi
        .get(`recruitments/${recruitmentId}`, {
          cache: 'force-cache',
          next: { revalidate: 3600 },
        })
        .json();
    }
    return { ok: true, data: response.data, status: 200 };
  } catch (e) {
    return ErrorHandler(e as Error);
  }
}

export default getRecruitDetail;
