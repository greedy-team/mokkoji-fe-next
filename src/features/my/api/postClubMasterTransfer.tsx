'use server';

import api from '@/shared/api/auth-api';
import createErrorResponse from '@/shared/lib/error-message';

async function postClubMasterTransfer(
  clubId: number,
  nextClubMasterUserCode: string,
) {
  try {
    await api.post('club-master-transfers', {
      json: { clubId, nextClubMasterUserCode },
    });
    return {
      ok: true,
      message: '동아리장 권한 위임을 완료했습니다.',
      status: 201,
    };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default postClubMasterTransfer;
