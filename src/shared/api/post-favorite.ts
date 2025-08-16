'use server';

import authApi from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function postFavorite(clubId: number) {
  try {
    const response = await (await authApi()).post(`favorites/${clubId}`).json();
    return response;
  } catch (e) {
    return ErrorHandler(e as Error, [
      { status: 409, message: '이미 즐겨찾기한 동아리입니다.' },
    ]);
  }
}

export default postFavorite;
