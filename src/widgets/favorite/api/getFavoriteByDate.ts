'use server';

import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import ErrorHandler from '@/shared/lib/error-message';
import { FavoriteDateItem } from '@/views/favorite/model/type';

interface GetFavoriteByDateParams {
  yearMonth: string;
}

async function getFavoriteByDate({ yearMonth }: GetFavoriteByDateParams) {
  try {
    const response: ApiResponse<FavoriteDateItem[]> = await (await authApi())
      .get(`favorites/recruit?yearMonth=${yearMonth}`, {})
      .json();
    return {
      ok: true,
      message: '즐겨찾기한 동아리가 없습니다.',
      data: response.data || [],
    };
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}

export default getFavoriteByDate;
