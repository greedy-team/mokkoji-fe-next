import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetailType } from '@/views/club/model/type';

async function getClubDetail(id: string) {
  const response: ApiResponse<ClubDetailType> = await (
    await authApi()
  )
    .get(`clubs/${id}`, {
      next: { revalidate: 3600, tags: ['clubs', id] },
    })
    .json();

  return response.data;
}

export default getClubDetail;
