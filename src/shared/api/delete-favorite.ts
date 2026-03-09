'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';

async function deleteFavorite(clubId: number) {
  try {
    await api.delete(`favorites/${clubId}`);
    return { ok: true, message: '즐겨찾기가 삭제되었습니다.' };
  } catch (error) {
    return createErrorResponse(error as Error, [
      { status: 404, message: '즐겨찾기한 동아리가 없습니다.' },
    ]);
  }
}

export default deleteFavorite;
