'use server';

import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function deleteFavorite(clubId: number) {
  try {
    const response = await (await authApi())
      .delete(`favorites/${clubId}`)
      .json();
    return response;
  } catch (e) {
    return ErrorHandler(e as Error, [
      { status: 404, message: '즐겨찾기한 동아리가 없습니다.' },
    ]);
  }
}

export default deleteFavorite;
