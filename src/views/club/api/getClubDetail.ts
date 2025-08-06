import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/type';
import { ClubDetailType } from '../model/type';

async function getClubDetail(id: string) {
  const response: ApiResponse<ClubDetailType> = await serverApi
    .get(`clubs/${id}`)
    .json();

  return response.data;
}

export default getClubDetail;
