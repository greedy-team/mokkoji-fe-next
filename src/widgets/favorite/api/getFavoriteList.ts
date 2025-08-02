import authApi from '@/shared/api/auth-api';
import { ApiResponse, ClubType } from '@/shared/model/type';

async function getFavoriteList() {
  const response: ApiResponse<ClubType[]> = await authApi
    .get('favorites')
    .json();
  return response;
}

export default getFavoriteList;
