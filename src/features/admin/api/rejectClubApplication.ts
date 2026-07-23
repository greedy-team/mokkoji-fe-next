'use server';

import api from '@/shared/api/dashboard-api';
import createErrorResponse from '@/shared/lib/error-message';

async function rejectClubApplication(
  applicationId: number,
  rejectReason?: string,
) {
  try {
    await api.patch(`admin/club-applications/${applicationId}/reject`, {
      json: { rejectReason },
    });
    return {
      ok: true,
      message: '동아리 생성 신청을 반려했습니다.',
      status: 200,
    };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default rejectClubApplication;
