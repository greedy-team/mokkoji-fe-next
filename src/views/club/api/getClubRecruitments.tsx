import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse } from '@/shared/model/type';
import api from '@/shared/api/auth-api';
import { auth } from '@/auth';
import serverApi from '@/shared/api/server-api';
import { ClubRecruitmentsResponse } from '../model/type';

async function getClubRecruitments(clubId: number) {
  const session = await auth();
  try {
    let response: ApiResponse<ClubRecruitmentsResponse>;
    if (session?.accessToken) {
      response = await api.get(`recruitments/club/${clubId}`).json();
    } else {
      response = await serverApi
        .get(`recruitments/club/${clubId}`, {
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

export default getClubRecruitments;
