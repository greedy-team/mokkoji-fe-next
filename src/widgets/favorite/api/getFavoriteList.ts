import authApi from '@/shared/api/auth-api';
import { ApiResponse, FavoriteList } from '@/shared/model/type';

interface GetFavoriteListParams {
  page: number;
  size: number;
}

async function getFavoriteList({ page, size }: GetFavoriteListParams) {
  const response: ApiResponse<FavoriteList> = await (await authApi())
    .get(`favorites?page=${page}&size=${size}`)
    .json();
  return response.data;
}

export default getFavoriteList;
