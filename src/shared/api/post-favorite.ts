'use server';

import api from '@/shared/api/auth-api';
import ErrorHandler from '@/shared/lib/error-message';

async function postFavorite(clubId: number) {
  try {
    await api.post(`favorites/${clubId}`);
    return { ok: true, message: '즐겨찾기가 등록되었습니다.' };
  } catch (e) {
    return ErrorHandler(e as Error, [
      { status: 409, message: '이미 즐겨찾기한 동아리입니다.' },
    ]);
  }
}

export default postFavorite;
