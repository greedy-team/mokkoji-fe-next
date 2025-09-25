import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';
import { ApiResponse, FavoriteList } from '@/shared/model/type';

interface GetFavoriteListParams {
  page: number;
  size: number;
}

async function getFavoriteList({ page, size }: GetFavoriteListParams) {
  try {
    const response: ApiResponse<FavoriteList> = await (await authApi())
      .get(`favorites?page=${page}&size=${size}`)
      .json();
    return { ok: true, data: response.data, status: response.status };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export default getFavoriteList;
