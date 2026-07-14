'use server';

import api from '@/shared/api/dashboard-api';
import createErrorResponse from '@/shared/lib/error-message';

async function approveClubApplication(applicationId: number) {
  try {
    await api.patch(`admin/club-applications/${applicationId}/approve`);
    return {
      ok: true,
      message: '동아리 생성 신청을 승인했습니다.',
      status: 200,
    };
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export default approveClubApplication;
